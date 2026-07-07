import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Check, Image as ImageIcon, Crop, FileText, 
  Sparkles, ShieldCheck, Download, Moon, Sun, 
  RefreshCw, Sliders, User, Info, CheckCircle2, AlertCircle,
  ChevronDown, ChevronRight, Search
} from 'lucide-react';
import JSZip from 'jszip';
import { useImageProcessor, type ProcessResult } from '../hooks/useImageProcessor';

interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  maxSizeKb: number;
  aspectRatio: string;
  description: string;
  overlayType: 'face' | 'signature' | 'document' | 'none';
}

const PRESETS: Preset[] = [
  {
    id: 'custom',
    name: 'Custom Dimensions',
    width: 600,
    height: 600,
    maxSizeKb: 200,
    aspectRatio: '1:1',
    description: 'Manually specify custom width, height, and target file size constraints.',
    overlayType: 'none'
  },
  {
    id: 'upsc_photo',
    name: 'UPSC Photograph',
    width: 350,
    height: 350,
    maxSizeKb: 300,
    aspectRatio: '1:1',
    description: 'UPSC Exam (IAS, IPS, CDS) photograph (min 350x350 px). Max size 300 KB.',
    overlayType: 'face'
  },
  {
    id: 'upsc_signature',
    name: 'UPSC Signature',
    width: 350,
    height: 150,
    maxSizeKb: 300,
    aspectRatio: '3.5:1.5',
    description: 'UPSC Exam signature (min 350x150 px). Max size 300 KB.',
    overlayType: 'signature'
  },
  {
    id: 'ssc_photo',
    name: 'SSC Photograph',
    width: 275,
    height: 354,
    maxSizeKb: 50,
    aspectRatio: '3.5:4.5',
    description: 'SSC Exam (CGL, CHSL, MTS) photograph (3.5cm x 4.5cm). Max size 50 KB.',
    overlayType: 'face'
  },
  {
    id: 'ssc_signature',
    name: 'SSC Signature',
    width: 140,
    height: 60,
    maxSizeKb: 20,
    aspectRatio: '4:2',
    description: 'SSC Exam signature (4.0cm x 2.0cm). Max size 20 KB. Must be black ink.',
    overlayType: 'signature'
  },
  {
    id: 'ibps_photo',
    name: 'IBPS / SBI Photograph',
    width: 200,
    height: 230,
    maxSizeKb: 50,
    aspectRatio: '200:230',
    description: 'Banking exams (PO, Clerk) photograph (200x230 px). Max size 50 KB.',
    overlayType: 'face'
  },
  {
    id: 'ibps_signature',
    name: 'IBPS / SBI Signature',
    width: 140,
    height: 60,
    maxSizeKb: 20,
    aspectRatio: '140:60',
    description: 'Banking exams signature (140x60 px). Max size 20 KB. Must be black ink.',
    overlayType: 'signature'
  },
  {
    id: 'ibps_thumb',
    name: 'IBPS Left Thumb Impression',
    width: 240,
    height: 240,
    maxSizeKb: 50,
    aspectRatio: '1:1',
    description: 'Banking exams thumb impression (240x240 px). Max size 50 KB.',
    overlayType: 'document'
  },
  {
    id: 'nta_passport',
    name: 'NTA NEET / JEE Passport Photo',
    width: 275,
    height: 354,
    maxSizeKb: 200,
    aspectRatio: '3.5:4.5',
    description: 'NTA exams (NEET, JEE) passport size photo. Max size 200 KB.',
    overlayType: 'face'
  },
  {
    id: 'nta_postcard',
    name: 'NTA NEET Postcard Photo',
    width: 400,
    height: 600,
    maxSizeKb: 200,
    aspectRatio: '4:6',
    description: 'NEET specific Postcard size photo (4" x 6"). Max size 200 KB.',
    overlayType: 'face'
  },
  {
    id: 'us_visa',
    name: 'US Visa / Green Card Lottery',
    width: 600,
    height: 600,
    maxSizeKb: 240,
    aspectRatio: '1:1',
    description: 'US Passport, DS-160, and Diversity Visa. 600x600 px min. Max size 240 KB.',
    overlayType: 'face'
  },
  {
    id: 'uk_visa',
    name: 'UK Visa / Passport',
    width: 600,
    height: 750,
    maxSizeKb: 2048,
    aspectRatio: '4:5',
    description: 'UK digital visa/passport photo (600x750 px). Max size 2 MB.',
    overlayType: 'face'
  },
  {
    id: 'schengen_visa',
    name: 'Schengen Visa (Europe)',
    width: 240,
    height: 320,
    maxSizeKb: 120,
    aspectRatio: '3:4',
    description: 'Generic Schengen visa spec (VFS Global). 240x320 px. Max size 120 KB.',
    overlayType: 'face'
  },
  {
    id: 'gre_toefl',
    name: 'GRE / TOEFL Registration',
    width: 480,
    height: 600,
    maxSizeKb: 1024,
    aspectRatio: '4:5',
    description: 'ETS standardized tests photo (480x600 px). Max size 1 MB.',
    overlayType: 'face'
  }
];

export interface ImageSetting {
  preset: Preset;
  customWidth: string;
  customHeight: string;
  customSizeKb: string;
  signatureFilter: boolean;
  burnTextBanner: boolean;
  bannerText: string;
}

export default function ImageResizerWorkspace() {
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [originalUrls, setOriginalUrls] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageSettings, setImageSettings] = useState<ImageSetting[]>([]);
  
  // Processing results
  const { processImage, isProcessing, error } = useImageProcessor();
  const [results, setResults] = useState<(ProcessResult | null)[]>([]);

  // UI state
  const [darkMode, setDarkMode] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExamGroupOpen, setIsExamGroupOpen] = useState(false);
  const [isVisaGroupOpen, setIsVisaGroupOpen] = useState(false);
  const [presetSearch, setPresetSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync Dark Mode state to document root
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Keyboard shortcut listener ('D' for Dark Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === 'd' || e.key === 'D') {
        toggleDarkMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [darkMode]);

  const updateActiveSetting = (updates: Partial<ImageSetting>) => {
    setImageSettings(prev => {
      const newSettings = [...prev];
      if (newSettings[activeIndex]) {
        newSettings[activeIndex] = { ...newSettings[activeIndex], ...updates };
      }
      return newSettings;
    });
  };

  // Trigger processing when active image settings change
  useEffect(() => {
    if (originalFiles.length > 0 && imageSettings[activeIndex]) {
      triggerProcessing(activeIndex);
    }
  }, [imageSettings[activeIndex], activeIndex, originalFiles]);

  const triggerProcessing = async (indexToProcess: number) => {
    if (originalFiles.length === 0 || !imageSettings[indexToProcess]) return;
    
    const file = originalFiles[indexToProcess];
    const settings = imageSettings[indexToProcess];
    
    let width = settings.preset.id === 'custom' ? parseInt(settings.customWidth) || 600 : settings.preset.width;
    let height = settings.preset.id === 'custom' ? parseInt(settings.customHeight) || 600 : settings.preset.height;
    let maxKb = settings.preset.id === 'custom' ? parseInt(settings.customSizeKb) || 200 : settings.preset.maxSizeKb;

    // Safety checks
    width = Math.max(50, Math.min(4000, width));
    height = Math.max(50, Math.min(4000, height));
    maxKb = Math.max(5, Math.min(10000, maxKb));

    try {
      const res = await processImage(file, {
        targetWidth: width,
        targetHeight: height,
        targetSizeKb: maxKb,
        signatureFilter: settings.signatureFilter,
        burnTextBanner: settings.burnTextBanner,
        bannerText: settings.burnTextBanner ? settings.bannerText : undefined
      });
      
      setResults(prev => {
        const newResults = [...prev];
        newResults[indexToProcess] = res;
        return newResults;
      });
    } catch (err) {
      console.error("Processing error:", err);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        setFiles(files);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        setFiles(files);
      }
    }
  };

  const setFiles = async (files: File[]) => {
    setOriginalFiles(files);
    
    const newSettings = files.map(() => ({
      preset: PRESETS[0],
      customWidth: '600',
      customHeight: '600',
      customSizeKb: '200',
      signatureFilter: false,
      burnTextBanner: false,
      bannerText: ''
    }));
    setImageSettings(newSettings);
    setResults(new Array(files.length).fill(null));
    setActiveIndex(0);

    if (originalUrls.length > 0) {
      originalUrls.forEach(url => URL.revokeObjectURL(url));
    }
    const newUrls = files.map(file => URL.createObjectURL(file));
    setOriginalUrls(newUrls);

    // Initial batch processing
    try {
      const resArray = await Promise.all(
        files.map((file, idx) => {
          const settings = newSettings[idx];
          return processImage(file, {
            targetWidth: settings.preset.id === 'custom' ? parseInt(settings.customWidth) : settings.preset.width,
            targetHeight: settings.preset.id === 'custom' ? parseInt(settings.customHeight) : settings.preset.height,
            targetSizeKb: settings.preset.id === 'custom' ? parseInt(settings.customSizeKb) : settings.preset.maxSizeKb,
            signatureFilter: settings.signatureFilter,
            burnTextBanner: settings.burnTextBanner,
            bannerText: undefined
          });
        })
      );
      setResults(resArray);
    } catch(err) {
      console.error(err);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async () => {
    if (results.length === 0) return;
    
    if (results.length === 1) {
      const res = results[0];
      if (!res) return;
      const link = document.createElement('a');
      link.href = res.dataUrl;
      const file = originalFiles[0];
      const originalNameWithoutExt = file?.name.substring(0, file.name.lastIndexOf('.')) || `image_1`;
      const presetId = imageSettings[0]?.preset.id || 'custom';
      link.download = `${originalNameWithoutExt}_resizer_${presetId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Use JSZip for multiple files to avoid browser multi-download blocking
    try {
      const zip = new JSZip();
      
      results.forEach((res, idx) => {
        if (!res) return;
        const file = originalFiles[idx];
        const originalNameWithoutExt = file?.name.substring(0, file.name.lastIndexOf('.')) || `image_${idx + 1}`;
        const presetId = imageSettings[idx]?.preset.id || 'custom';
        const fileName = `${originalNameWithoutExt}_resizer_${presetId}.jpg`;
        
        zip.file(fileName, res.blob);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'processed_images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Failed to generate zip", err);
    }
  };

  const resetWorkspace = () => {
    setOriginalFiles([]);
    setResults([]);
    setImageSettings([]);
    setActiveIndex(0);
    if (originalUrls.length > 0) {
      originalUrls.forEach(url => URL.revokeObjectURL(url));
      setOriginalUrls([]);
    }
  };

  const activeSetting = imageSettings[activeIndex];

  // Checklist Validation Statuses
  const getValidationStatus = () => {
    if (results.length === 0 || !activeSetting) return { sizeOk: false, dimsOk: false };
    
    const targetWidth = activeSetting.preset.id === 'custom' ? parseInt(activeSetting.customWidth) || 600 : activeSetting.preset.width;
    const targetHeight = activeSetting.preset.id === 'custom' ? parseInt(activeSetting.customHeight) || 600 : activeSetting.preset.height;
    const targetSizeKb = activeSetting.preset.id === 'custom' ? parseInt(activeSetting.customSizeKb) || 200 : activeSetting.preset.maxSizeKb;
    
    const activeResult = results[activeIndex];
    if (!activeResult) return { sizeOk: false, dimsOk: false };

    return {
      sizeOk: activeResult.sizeKb <= targetSizeKb,
      dimsOk: activeResult.width === targetWidth && activeResult.height === targetHeight
    };
  };

  const { sizeOk, dimsOk } = getValidationStatus();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header controls (Apple Minimalist style) */}
      <div className="flex justify-between items-center mb-10 border-b border-[#e0e0e0] dark:border-[#333333] pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#7a7a7a] dark:text-[#cccccc] font-semibold">Image Utility</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mt-1">Local Resizer Studio</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-[#f5f5f7] dark:bg-[#272729] hover:bg-[#e0e0e0] dark:hover:bg-[#333333] transition-colors duration-200 text-[#1d1d1f] dark:text-white flex items-center justify-center cursor-pointer"
            title="Toggle Dark Mode (D)"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {originalFiles.length === 0 ? (
          /* Step 1: Drag & Drop Zone */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerUpload}
              className={`relative overflow-hidden w-full min-h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 ${
                dragActive 
                  ? 'border-[#0066cc] bg-[#0066cc]/5 dark:border-[#2997ff] dark:bg-[#2997ff]/5' 
                  : 'border-[#d2d2d7] hover:border-[#7a7a7a] dark:border-[#333333] dark:hover:border-[#cccccc] bg-white dark:bg-[#1a1a1c]'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleFileInput}
              />
              
              <div className="p-5 rounded-full bg-[#f5f5f7] dark:bg-[#272729] text-[#7a7a7a] dark:text-[#cccccc] mb-6">
                <Upload size={36} className="animate-pulse" />
              </div>
              
              <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mb-2">
                Drag and drop your photos or signatures
              </h3>
              <p className="text-sm text-[#7a7a7a] dark:text-[#cccccc] max-w-md mb-8">
                Works for JPG, PNG, and WebP. Select one or multiple images to batch process them directly in your browser. No data leaves your device.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <span className="px-5 py-2.5 rounded-full bg-[#0066cc] dark:bg-[#2997ff] text-white font-medium text-sm hover:opacity-90 shadow-sm transition-opacity">
                  Browse Files
                </span>
                
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  <ShieldCheck size={14} />
                  Processed Locally: 100% Secure
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Step 2: Interactive Resizer Workspace */
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Image Viewport */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-[#fafafc] dark:bg-[#1a1a1c] border border-[#e0e0e0] dark:border-[#333333] rounded-3xl p-6 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                
                {/* Visual Header of Viewport */}
                <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-10">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#e0e0e0]/60 dark:bg-[#333333]/60 text-[#1d1d1f] dark:text-white backdrop-blur-sm">
                    Live Canvas Viewport
                  </span>
                  
                  {isProcessing && (
                    <span className="text-xs flex items-center gap-1 text-[#0066cc] dark:text-[#2997ff] font-medium bg-[#0066cc]/10 px-3 py-1 rounded-full animate-pulse">
                      <RefreshCw size={12} className="animate-spin" /> Processing
                    </span>
                  )}
                </div>

                {/* Viewport content */}
                <div className="relative max-w-full max-h-[400px] flex items-center justify-center border border-[#e0e0e0] dark:border-[#333333] rounded-xl bg-chess-pattern overflow-hidden">
                  {results[activeIndex] ? (
                    <img 
                      src={results[activeIndex]!.dataUrl} 
                      alt="Processed result" 
                      className="max-h-[380px] object-contain transition-all duration-300"
                    />
                  ) : originalUrls[activeIndex] ? (
                    <img 
                      src={originalUrls[activeIndex]} 
                      alt="Original source" 
                      className="max-h-[380px] object-contain blur-sm"
                    />
                  ) : null}

                  {/* Overlays for Crop Guides */}
                  {activeSetting?.preset.overlayType === 'face' && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      {/* Bounding box guide */}
                      <div className="w-[70%] h-[85%] border-2 border-dashed border-[#0066cc]/60 dark:border-[#2997ff]/60 rounded-lg flex flex-col items-center justify-start pt-6">
                        {/* Apple face silhouette guide */}
                        <svg className="w-24 h-24 text-[#0066cc]/40 dark:text-[#2997ff]/40 mt-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          {/* Face outline */}
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="text-[10px] text-[#0066cc]/60 dark:text-[#2997ff]/60 uppercase tracking-widest font-semibold mt-4">Align Head & Shoulders</span>
                      </div>
                    </div>
                  )}

                  {activeSetting?.preset.overlayType === 'signature' && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      {/* Signature guides */}
                      <div className="w-[85%] h-[55%] border-2 border-dashed border-[#0066cc]/60 dark:border-[#2997ff]/60 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-[#0066cc]/60 dark:text-[#2997ff]/60 uppercase tracking-widest font-semibold">Align Signature inside Box</span>
                      </div>
                    </div>
                  )}

                  {activeSetting?.preset.overlayType === 'document' && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      {/* Document frame border */}
                      <div className="w-[90%] h-[90%] border-2 border-dashed border-[#0066cc]/50 dark:border-[#2997ff]/50 rounded-sm">
                        <div className="absolute bottom-2 left-2 text-[9px] text-[#0066cc]/60 dark:text-[#2997ff]/60 font-mono">DOCUMENT FRAME BOUNDS</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dimensions readout */}
                {results[activeIndex] && (
                  <div className="w-full max-w-sm flex flex-col gap-4 mt-6">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white dark:bg-[#272729] rounded-xl p-3 border border-[#e0e0e0]/60 dark:border-[#333333]/60 shadow-sm">
                        <span className="text-[10px] uppercase text-[#7a7a7a] dark:text-[#cccccc] block">Width</span>
                        <span className="font-semibold text-sm text-[#1d1d1f] dark:text-white">{results[activeIndex]!.width} px</span>
                      </div>
                      <div className="bg-white dark:bg-[#272729] rounded-xl p-3 border border-[#e0e0e0]/60 dark:border-[#333333]/60 shadow-sm">
                        <span className="text-[10px] uppercase text-[#7a7a7a] dark:text-[#cccccc] block">Height</span>
                        <span className="font-semibold text-sm text-[#1d1d1f] dark:text-white">{results[activeIndex]!.height} px</span>
                      </div>
                      <div className="bg-white dark:bg-[#272729] rounded-xl p-3 border border-[#e0e0e0]/60 dark:border-[#333333]/60 shadow-sm">
                        <span className="text-[10px] uppercase text-[#7a7a7a] dark:text-[#cccccc] block">File Size</span>
                        <span className={`font-semibold text-sm ${sizeOk ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 font-bold'}`}>
                          {results[activeIndex]!.sizeKb} KB
                        </span>
                      </div>
                    </div>
                    {results.length > 1 && (
                      <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
                        {results.map((res, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setActiveIndex(idx)}
                            className={`shrink-0 w-12 h-12 rounded-lg border-[3px] overflow-hidden cursor-pointer transition-all ${
                              idx === activeIndex 
                                ? 'border-[#0066cc] dark:border-[#2997ff] scale-110 shadow-md' 
                                : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                          >
                            {res ? (
                              <img src={res.dataUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 dark:bg-[#333333] animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Reset trigger */}
              <button 
                onClick={resetWorkspace}
                className="w-full py-3.5 rounded-2xl bg-[#f5f5f7] hover:bg-[#e0e0e0]/80 dark:bg-[#272729] dark:hover:bg-[#333333] text-sm font-semibold transition-colors duration-200 cursor-pointer text-[#1d1d1f] dark:text-white flex items-center justify-center gap-2"
              >
                Upload a Different Image
              </button>
            </div>

            {/* Right Column: Control Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Panel Container */}
              <div className="bg-white dark:bg-[#1a1a1c] border border-[#e0e0e0] dark:border-[#333333] rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Sliders size={20} className="text-[#0066cc] dark:text-[#2997ff]" />
                  <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Workspace Controls</h3>
                </div>

                {activeSetting && (
                  <>
                    {/* Preset Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="presetSelect" className="text-xs font-semibold text-[#7a7a7a] dark:text-[#cccccc] uppercase tracking-wider">
                        Form Preset
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5f7] dark:bg-[#272729] rounded-xl border-none text-sm text-[#1d1d1f] dark:text-white hover:bg-[#e0e0e0]/80 dark:hover:bg-[#333333] transition-colors cursor-pointer outline-none font-medium text-left"
                        >
                          <span>{activeSetting.preset.name}</span>
                          <ChevronDown size={16} className={`text-[#7a7a7a] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-[#272729] border border-[#e0e0e0] dark:border-[#333333] rounded-xl shadow-xl overflow-hidden max-h-[300px] overflow-y-auto"
                            >
                              <div className="px-3 pb-2 pt-1 sticky top-0 bg-white dark:bg-[#272729] z-10 border-b border-[#e0e0e0] dark:border-[#333333]">
                                <div className="relative">
                                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]" />
                                  <input
                                    type="text"
                                    placeholder="Search presets..."
                                    value={presetSearch}
                                    onChange={(e) => setPresetSearch(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full pl-9 pr-3 py-2 bg-[#f5f5f7] dark:bg-[#1a1a1c] border-none rounded-lg text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#a0a0a0] focus:ring-1 focus:ring-[#0066cc] outline-none"
                                  />
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  updateActiveSetting({ preset: PRESETS.find(p => p.id === 'custom')! });
                                  setIsDropdownOpen(false);
                                  setPresetSearch('');
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors mt-1 ${
                                  activeSetting.preset.id === 'custom' 
                                    ? 'bg-[#0066cc]/10 text-[#0066cc] dark:text-[#2997ff] font-semibold' 
                                    : 'text-[#1d1d1f] dark:text-white hover:bg-[#f5f5f7] dark:hover:bg-[#333333]'
                                }`}
                              >
                                Custom Dimensions
                              </button>
                              
                              <div className="mt-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExamGroupOpen(!isExamGroupOpen);
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#1a1a1c] text-xs font-bold text-[#7a7a7a] dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors tracking-wider"
                                >
                                  <span>EXAM PRESETS</span>
                                  <ChevronRight size={14} className={`transition-transform duration-200 ${isExamGroupOpen ? 'rotate-90' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                  {(isExamGroupOpen || presetSearch.trim().length > 0) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      {PRESETS.filter(p => p.id !== 'custom' && !['us_visa', 'uk_visa', 'schengen_visa', 'gre_toefl'].includes(p.id) && p.name.toLowerCase().includes(presetSearch.toLowerCase())).map((p) => (
                                        <button
                                          key={p.id}
                                          type="button"
                                          onClick={() => {
                                            updateActiveSetting({ preset: p });
                                            setIsDropdownOpen(false);
                                            setPresetSearch('');
                                          }}
                                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                            activeSetting.preset.id === p.id 
                                              ? 'bg-[#0066cc]/10 text-[#0066cc] dark:text-[#2997ff] font-semibold' 
                                              : 'text-[#1d1d1f] dark:text-white hover:bg-[#f5f5f7] dark:hover:bg-[#333333]'
                                          }`}
                                        >
                                          {p.name}
                                        </button>
                                      ))}
                                      {PRESETS.filter(p => p.id !== 'custom' && !['us_visa', 'uk_visa', 'schengen_visa', 'gre_toefl'].includes(p.id) && p.name.toLowerCase().includes(presetSearch.toLowerCase())).length === 0 && (
                                        <div className="px-4 py-3 text-xs text-[#7a7a7a] text-center italic">No matching exam presets found.</div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              <div className="mt-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsVisaGroupOpen(!isVisaGroupOpen);
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#1a1a1c] text-xs font-bold text-[#7a7a7a] dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors tracking-wider border-t border-[#e0e0e0] dark:border-[#333333]"
                                >
                                  <span>INTERNATIONAL & VISA PRESETS</span>
                                  <ChevronRight size={14} className={`transition-transform duration-200 ${isVisaGroupOpen ? 'rotate-90' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                  {(isVisaGroupOpen || presetSearch.trim().length > 0) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      {PRESETS.filter(p => ['us_visa', 'uk_visa', 'schengen_visa', 'gre_toefl'].includes(p.id) && p.name.toLowerCase().includes(presetSearch.toLowerCase())).map((p) => (
                                        <button
                                          key={p.id}
                                          type="button"
                                          onClick={() => {
                                            updateActiveSetting({ preset: p });
                                            setIsDropdownOpen(false);
                                            setPresetSearch('');
                                          }}
                                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                            activeSetting.preset.id === p.id 
                                              ? 'bg-[#0066cc]/10 text-[#0066cc] dark:text-[#2997ff] font-semibold' 
                                              : 'text-[#1d1d1f] dark:text-white hover:bg-[#f5f5f7] dark:hover:bg-[#333333]'
                                          }`}
                                        >
                                          {p.name}
                                        </button>
                                      ))}
                                      {PRESETS.filter(p => ['us_visa', 'uk_visa', 'schengen_visa', 'gre_toefl'].includes(p.id) && p.name.toLowerCase().includes(presetSearch.toLowerCase())).length === 0 && (
                                        <div className="px-4 py-3 text-xs text-[#7a7a7a] text-center italic">No matching visa presets found.</div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-xs text-[#7a7a7a] dark:text-[#cccccc] leading-relaxed mt-1">
                        {activeSetting.preset.description}
                      </p>
                    </div>

                    {/* Custom Dimensions Input */}
                    {activeSetting.preset.id === 'custom' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="widthInput" className="text-[10px] font-semibold text-[#7a7a7a] uppercase tracking-wider">Width (px)</label>
                          <input 
                            id="widthInput"
                            type="number"
                            value={activeSetting.customWidth}
                            onChange={(e) => updateActiveSetting({ customWidth: e.target.value })}
                            className="px-3.5 py-2.5 bg-[#f5f5f7] dark:bg-[#272729] text-sm text-[#1d1d1f] dark:text-white rounded-lg border-none focus:ring-1 focus:ring-[#0066cc] outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="heightInput" className="text-[10px] font-semibold text-[#7a7a7a] uppercase tracking-wider">Height (px)</label>
                          <input 
                            id="heightInput"
                            type="number"
                            value={activeSetting.customHeight}
                            onChange={(e) => updateActiveSetting({ customHeight: e.target.value })}
                            className="px-3.5 py-2.5 bg-[#f5f5f7] dark:bg-[#272729] text-sm text-[#1d1d1f] dark:text-white rounded-lg border-none focus:ring-1 focus:ring-[#0066cc] outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="maxSizeInput" className="text-[10px] font-semibold text-[#7a7a7a] uppercase tracking-wider">Max Size (KB)</label>
                          <input 
                            id="maxSizeInput"
                            type="number"
                            value={activeSetting.customSizeKb}
                            onChange={(e) => updateActiveSetting({ customSizeKb: e.target.value })}
                            className="px-3.5 py-2.5 bg-[#f5f5f7] dark:bg-[#272729] text-sm text-[#1d1d1f] dark:text-white rounded-lg border-none focus:ring-1 focus:ring-[#0066cc] outline-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Filters configuration */}
                    <div className="border-t border-[#e0e0e0] dark:border-[#333333] pt-5 flex flex-col gap-4">
                      <h4 className="text-xs font-semibold text-[#7a7a7a] dark:text-[#cccccc] uppercase tracking-wider">Filters & Enhancements</h4>
                      
                      {/* Signature Filter toggle */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <label htmlFor="sigFilterCheck" className="text-sm font-semibold text-[#1d1d1f] dark:text-white cursor-pointer select-none">
                            Signature Scanner Clean
                          </label>
                          <p className="text-xs text-[#7a7a7a] dark:text-[#cccccc] leading-relaxed mt-0.5">
                            Strips yellow shadows and soft gray backdrops, producing professional flatbed contrast (Pure White & Black).
                          </p>
                        </div>
                        <input 
                          id="sigFilterCheck"
                          type="checkbox"
                          checked={activeSetting.signatureFilter}
                          onChange={(e) => updateActiveSetting({ signatureFilter: e.target.checked })}
                          className="w-5 h-5 rounded border-[#d2d2d7] dark:border-[#333333] text-[#0066cc] focus:ring-[#0066cc] cursor-pointer mt-0.5"
                        />
                      </div>

                      {/* Name/Date Burner toggle */}
                      <div className="flex flex-col gap-3 border-t border-[#e0e0e0]/60 dark:border-[#333333]/60 pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <label htmlFor="burnTextCheck" className="text-sm font-semibold text-[#1d1d1f] dark:text-white cursor-pointer select-none">
                              Burn Date / Name Banner
                            </label>
                            <p className="text-xs text-[#7a7a7a] dark:text-[#cccccc] leading-relaxed mt-0.5">
                              Overlay a compliant white banner at the bottom containing names, dates, or other mandatory labels.
                            </p>
                          </div>
                          <input 
                            id="burnTextCheck"
                            type="checkbox"
                            checked={activeSetting.burnTextBanner}
                            onChange={(e) => updateActiveSetting({ burnTextBanner: e.target.checked })}
                            className="w-5 h-5 rounded border-[#d2d2d7] dark:border-[#333333] text-[#0066cc] focus:ring-[#0066cc] cursor-pointer mt-0.5"
                          />
                        </div>

                        {activeSetting.burnTextBanner && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-col gap-1.5 mt-1"
                          >
                            <input 
                              type="text"
                              placeholder="e.g. AMIT KUMAR 07/07/2026"
                              value={activeSetting.bannerText}
                              onChange={(e) => updateActiveSetting({ bannerText: e.target.value })}
                              className="px-4 py-2.5 bg-[#f5f5f7] dark:bg-[#272729] text-sm text-[#1d1d1f] dark:text-white rounded-xl border-none focus:ring-1 focus:ring-[#0066cc] outline-none font-medium"
                            />
                            <span className="text-[10px] text-[#7a7a7a]">Required for official UPSC/SSC applications.</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Pre-flight Compliance Checklist */}
                <div className="border-t border-[#e0e0e0] dark:border-[#333333] pt-5">
                  <h4 className="text-xs font-semibold text-[#7a7a7a] dark:text-[#cccccc] uppercase tracking-wider mb-3">Pre-flight Checklist</h4>
                  
                  <div className="flex flex-col gap-2.5">
                    {/* Size budget rule */}
                    <div className="flex items-center gap-2.5 text-sm">
                      {sizeOk ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-rose-500 shrink-0 animate-bounce" />
                      )}
                      <span className={sizeOk ? 'text-[#1d1d1f] dark:text-white' : 'text-rose-500 font-medium'}>
                        File Size is below budget limit ({activeSetting?.preset.id === 'custom' ? activeSetting.customSizeKb : activeSetting?.preset.maxSizeKb} KB)
                      </span>
                    </div>

                    {/* Dimensions rule */}
                    <div className="flex items-center gap-2.5 text-sm">
                      {dimsOk ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-rose-500 shrink-0" />
                      )}
                      <span className={dimsOk ? 'text-[#1d1d1f] dark:text-white' : 'text-rose-500 font-medium'}>
                        Dimensions match preset requirements ({activeSetting?.preset.id === 'custom' ? `${activeSetting.customWidth}x${activeSetting.customHeight}` : `${activeSetting?.preset.width}x${activeSetting?.preset.height}`} px)
                      </span>
                    </div>

                    {/* Privacy rule */}
                    <div className="flex items-center gap-2.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>Local Sandbox: 100% Client-Side Private</span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-3">
                  <button 
                    onClick={handleDownload}
                    disabled={results.length === 0 || isProcessing}
                    className="w-full py-4 rounded-2xl bg-[#0066cc] dark:bg-[#2997ff] text-white hover:opacity-95 disabled:opacity-50 font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <Download size={18} />
                    {results.length > 1 ? `Download All ${results.length} JPGs` : 'Download Compliant JPG'}
                  </button>
                  <p className="text-[10px] text-center text-[#7a7a7a] mt-2 leading-relaxed">
                    Auto-configured with metadata stripped for your security and privacy.
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
