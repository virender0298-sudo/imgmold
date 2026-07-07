import { useState } from 'react';

export interface ProcessOptions {
  targetWidth?: number;
  targetHeight?: number;
  targetSizeKb?: number; // Target maximum file size in KB
  signatureFilter?: boolean; // Yellow shadow removal & scanner effect
  burnTextBanner?: boolean; // Burn name and date banner at bottom
  bannerText?: string; // Text to display in banner
}

export interface ProcessResult {
  blob: Blob;
  dataUrl: string;
  sizeKb: number;
  width: number;
  height: number;
}

export function useImageProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = async (file: File, options: ProcessOptions): Promise<ProcessResult> => {
    setIsProcessing(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = async () => {
          try {
            // Step 1: Calculate Target Dimensions
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            
            if (options.targetWidth && options.targetHeight) {
              width = options.targetWidth;
              height = options.targetHeight;
            } else if (options.targetWidth) {
              // Maintain aspect ratio based on width
              const ratio = options.targetWidth / img.naturalWidth;
              width = options.targetWidth;
              height = Math.round(img.naturalHeight * ratio);
            } else if (options.targetHeight) {
              // Maintain aspect ratio based on height
              const ratio = options.targetHeight / img.naturalHeight;
              width = Math.round(img.naturalWidth * ratio);
              height = options.targetHeight;
            }

            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            if (!ctx) {
              throw new Error("Could not get canvas 2D context");
            }

            // Draw image scaled to target dimensions
            // [Optimization] Drawing it scaled first reduces pixel manipulation overhead!
            ctx.drawImage(img, 0, 0, width, height);

            // Step 2: Apply Signature Filter if selected
            if (options.signatureFilter) {
              const imageData = ctx.getImageData(0, 0, width, height);
              const data = imageData.data;
              
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Grayscale luminance
                const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                
                // Yellow shadow detector: yellow has high R and G, but low B.
                // Subtracting blue from average of red and green captures the "yellow-ness".
                const yellowFactor = ((r + g) / 2) - b;
                
                // Boost brightness of yellow/soft shadows so they threshold to white.
                // If yellowFactor > 15, we artificially increase gray level.
                const shadowRemovalGray = gray + (yellowFactor > 15 ? yellowFactor * 1.5 : 0);
                
                // Thresholding filter to mimic flatbed scanner:
                // Threshold of 135 separates light background from ink.
                if (shadowRemovalGray > 135) {
                  data[i] = 255;     // Red
                  data[i + 1] = 255; // Green
                  data[i + 2] = 255; // Blue
                } else {
                  data[i] = 0;       // Red
                  data[i + 1] = 0;   // Green
                  data[i + 2] = 0;   // Blue
                }
              }
              
              ctx.putImageData(imageData, 0, 0);
            }

            // Step 3: Burn Text Banner at the bottom if requested
            if (options.burnTextBanner && options.bannerText) {
              // Banner height is 12% of total height, clamped between 35px and 70px
              const bannerHeight = Math.max(35, Math.min(70, Math.round(height * 0.12)));
              
              // Draw white rectangle for banner background
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, height - bannerHeight, width, bannerHeight);
              
              // Draw border for banner separator (subtle hairline)
              ctx.strokeStyle = "#e0e0e0";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, height - bannerHeight);
              ctx.lineTo(width, height - bannerHeight);
              ctx.stroke();

              // Text styling
              ctx.fillStyle = "#1d1d1f"; // Apple ink color
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              
              // Dynamic font size
              const fontSize = Math.max(10, Math.min(18, Math.round(bannerHeight * 0.35)));
              ctx.font = `600 ${fontSize}px SF Pro Text, Inter, sans-serif`;
              
              // Render text
              ctx.fillText(options.bannerText, width / 2, height - (bannerHeight / 2));
            }

            // Helper function to extract blob with quality configuration
            const getBlobAtQuality = (quality: number): Promise<Blob> => {
              return new Promise((resolveBlob, rejectBlob) => {
                canvas.toBlob((blob) => {
                  if (blob) {
                    resolveBlob(blob);
                  } else {
                    rejectBlob(new Error("Canvas blob conversion failed"));
                  }
                }, 'image/jpeg', quality);
              });
            };

            // Step 4: Quality Modulator via Binary Search
            let finalBlob: Blob;
            
            if (options.targetSizeKb) {
              let low = 0.01;
              let high = 1.00;
              let bestQuality = 0.85;
              let bestBlob: Blob | null = null;
              
              // 8 iterations gives fine precision (quality step resolution ~ 0.004)
              for (let iter = 0; iter < 8; iter++) {
                const mid = (low + high) / 2;
                const blob = await getBlobAtQuality(mid);
                const sizeKb = blob.size / 1024;
                
                if (sizeKb <= options.targetSizeKb) {
                  // Fits in budget, try to increase quality to see if we can get better fidelity
                  bestQuality = mid;
                  bestBlob = blob;
                  low = mid;
                } else {
                  // Too large, restrict quality
                  high = mid;
                }
              }
              
              if (bestBlob) {
                finalBlob = bestBlob;
              } else {
                // If it couldn't fit even at 0.01 quality, use the minimum quality blob
                finalBlob = await getBlobAtQuality(0.01);
              }
            } else {
              // Default to 90% quality if no target size specified
              finalBlob = await getBlobAtQuality(0.90);
            }

            // Create final URL and resolve
            const dataUrl = URL.createObjectURL(finalBlob);
            const sizeKb = parseFloat((finalBlob.size / 1024).toFixed(2));
            
            resolve({
              blob: finalBlob,
              dataUrl,
              sizeKb,
              width,
              height
            });
            
          } catch (err: any) {
            setError(err.message || "Failed to process image");
            reject(err);
          } finally {
            setIsProcessing(false);
          }
        };

        img.onerror = () => {
          setError("Failed to load image file");
          setIsProcessing(false);
          reject(new Error("Failed to load image file"));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        setError("Failed to read file");
        setIsProcessing(false);
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  return {
    processImage,
    isProcessing,
    error
  };
}
