export interface FAQ {
  question: string;
  answer: string;
}

export const faqsByLocale: Record<string, FAQ[]> = {
  en: [
    { question: "Is my data secure?", answer: "Yes. Everything happens entirely in your browser. No images or personal data are ever uploaded to any server." },
    { question: "Why 'Document Resizer' if it only accepts images?", answer: "We specialize in compressing image-based paperwork (like scanned ID cards, marksheets, and FIRs) which are required to be in JPG/PNG format for most official form uploads. We do not process PDFs or Word files." },
    { question: "What file sizes does it support?", answer: "You can compress photos to any exact size you need (e.g., under 50KB or 20KB). It's perfect for official forms or just freeing up space." },
    { question: "Will I lose image quality?", answer: "Our tool finds the perfect balance, giving you the best possible quality while strictly staying under your requested file size limit." },
    { question: "Does it remove tracking data?", answer: "Yes. Hidden location data and camera info (EXIF) are automatically removed to protect your privacy." },
    { question: "Does it work on phones?", answer: "Absolutely. You can use it directly in your mobile browser, no app installation required." },
    { question: "What image formats can I upload?", answer: "You can upload almost any standard image format including JPG, PNG, WebP, AVIF, and HEIC (on supported devices). The final output will always be a compliant JPG." },
    { question: "Can I resize multiple images at once?", answer: "Yes, you can batch process multiple images at once. Simply select or drag-and-drop multiple files into the workspace. The active preset dimensions and size limits will be applied to all uploaded files automatically." },
    { question: "Do I need to create an account?", answer: "No account is required. You can use all the features of the resizer immediately, without signing up or providing any personal details." },
    { question: "Is it completely free to use?", answer: "Yes! The core resizing and signature enhancement tools are 100% free for everyone to use directly from their browser." }
  ],
  hi: [
    { question: "क्या मेरा डेटा सुरक्षित है?", answer: "हाँ। सब कुछ पूरी तरह से आपके ब्राउज़र में होता है। कोई भी छवि या व्यक्तिगत डेटा कभी भी किसी सर्वर पर अपलोड नहीं किया जाता है।" },
    { question: "अगर यह केवल चित्र स्वीकार करता है तो 'दस्तावेज़ रिसाइज़र' क्यों?", answer: "हम छवि-आधारित कागजी कार्रवाई (जैसे स्कैन किए गए आईडी कार्ड, मार्कशीट और एफआईआर) को संपीड़ित करने में विशेषज्ञ हैं, जिन्हें अधिकांश आधिकारिक फॉर्म अपलोड के लिए JPG/PNG प्रारूप में होना आवश्यक है। हम PDF या Word फ़ाइलों को संसाधित नहीं करते हैं।" },
    { question: "यह किस फ़ाइल आकार का समर्थन करता है?", answer: "आप फ़ोटो को अपनी ज़रूरत के किसी भी सटीक आकार (जैसे, 50KB या 20KB से कम) में संपीड़ित कर सकते हैं। यह आधिकारिक फॉर्म या बस जगह खाली करने के लिए एकदम सही है।" },
    { question: "क्या मेरी छवि की गुणवत्ता कम हो जाएगी?", answer: "हमारा टूल सही संतुलन खोजता है, जिससे आपको आपके अनुरोधित फ़ाइल आकार की सीमा के अंतर्गत सख्ती से रहते हुए सर्वोत्तम संभव गुणवत्ता मिलती है।" },
    { question: "क्या यह ट्रैकिंग डेटा हटा देता है?", answer: "हाँ। आपकी गोपनीयता की रक्षा के लिए छिपे हुए स्थान डेटा और कैमरा जानकारी (EXIF) को स्वचालित रूप से हटा दिया जाता है।" },
    { question: "क्या यह फोन पर काम करता है?", answer: "बिल्कुल। आप इसे सीधे अपने मोबाइल ब्राउज़र में उपयोग कर सकते हैं, किसी ऐप इंस्टॉलेशन की आवश्यकता नहीं है।" },
    { question: "मैं कौन से छवि प्रारूप अपलोड कर सकता हूँ?", answer: "आप JPG, PNG, WebP, AVIF और HEIC (समर्थित उपकरणों पर) सहित लगभग कोई भी मानक छवि प्रारूप अपलोड कर सकते हैं। अंतिम आउटपुट हमेशा एक अनुपालन JPG होगा।" },
    { question: "क्या मैं एक साथ कई छवियों का आकार बदल सकता हूँ?", answer: "हाँ, आप एक साथ कई छवियों को बैच प्रोसेस कर सकते हैं। बस कार्यक्षेत्र में कई फ़ाइलों का चयन करें या खींचें और छोड़ें। सक्रिय प्रीसेट आयाम और आकार सीमाएं स्वचालित रूप से सभी अपलोड की गई फ़ाइलों पर लागू की जाएंगी।" },
    { question: "क्या मुझे खाता बनाने की आवश्यकता है?", answer: "किसी खाते की आवश्यकता नहीं है। आप साइन अप किए या कोई व्यक्तिगत विवरण दिए बिना तुरंत रिसाइज़र की सभी सुविधाओं का उपयोग कर सकते हैं।" },
    { question: "क्या यह उपयोग करने के लिए पूरी तरह से मुफ़्त है?", answer: "हाँ! मुख्य आकार बदलने और हस्ताक्षर बढ़ाने वाले उपकरण हर किसी के लिए सीधे उनके ब्राउज़र से उपयोग करने के लिए 100% मुफ़्त हैं।" }
  ],
  es: [
    { question: "¿Están seguros mis datos?", answer: "Sí. Todo ocurre completamente en su navegador. No se cargan imágenes ni datos personales a ningún servidor." },
    { question: "¿Por qué 'Redimensionador de documentos' si solo acepta imágenes?", answer: "Nos especializamos en comprimir papeleo basado en imágenes (como tarjetas de identificación escaneadas, hojas de calificaciones y denuncias) que deben estar en formato JPG/PNG para la mayoría de las cargas de formularios oficiales. No procesamos archivos PDF o Word." },
    { question: "¿Qué tamaños de archivo admite?", answer: "Puede comprimir fotos a cualquier tamaño exacto que necesite (por ejemplo, menos de 50 KB o 20 KB). Es perfecto para formularios oficiales o simplemente para liberar espacio." },
    { question: "¿Perderé calidad de imagen?", answer: "Nuestra herramienta encuentra el equilibrio perfecto, ofreciéndole la mejor calidad posible mientras se mantiene estrictamente por debajo del límite de tamaño de archivo solicitado." },
    { question: "¿Elimina los datos de seguimiento?", answer: "Sí. Los datos de ubicación ocultos y la información de la cámara (EXIF) se eliminan automáticamente para proteger su privacidad." },
    { question: "¿Funciona en teléfonos?", answer: "Absolutamente. Puede usarlo directamente en su navegador móvil, no requiere instalación de aplicación." },
    { question: "¿Qué formatos de imagen puedo subir?", answer: "Puede subir casi cualquier formato de imagen estándar, incluidos JPG, PNG, WebP, AVIF y HEIC (en dispositivos compatibles). El resultado final siempre será un JPG compatible." },
    { question: "¿Puedo redimensionar varias imágenes a la vez?", answer: "Sí, puede procesar por lotes varias imágenes a la vez. Simplemente seleccione o arrastre y suelte varios archivos en el espacio de trabajo. Las dimensiones preestablecidas activas y los límites de tamaño se aplicarán automáticamente a todos los archivos cargados." },
    { question: "¿Necesito crear una cuenta?", answer: "No se requiere cuenta. Puede usar todas las funciones del redimensionador de inmediato, sin registrarse ni proporcionar ningún detalle personal." },
    { question: "¿Es completamente gratis?", answer: "¡Sí! Las herramientas principales de redimensionamiento y mejora de firma son 100% gratuitas para que todos las usen directamente desde su navegador." }
  ],
  fr: [
    { question: "Mes données sont-elles sécurisées ?", answer: "Oui. Tout se passe entièrement dans votre navigateur. Aucune image ni donnée personnelle n'est jamais téléchargée sur un serveur." },
    { question: "Pourquoi 'Redimensionneur de documents' s'il n'accepte que des images ?", answer: "Nous sommes spécialisés dans la compression de documents basés sur des images (comme les cartes d'identité numérisées, les relevés de notes et les plaintes) qui doivent être au format JPG/PNG pour la plupart des formulaires officiels. Nous ne traitons pas les fichiers PDF ou Word." },
    { question: "Quelles tailles de fichiers prend-il en charge ?", answer: "Vous pouvez compresser les photos à la taille exacte dont vous avez besoin (par exemple, moins de 50 Ko ou 20 Ko). C'est parfait pour les formulaires officiels ou simplement pour libérer de l'espace." },
    { question: "Vais-je perdre en qualité d'image ?", answer: "Notre outil trouve l'équilibre parfait, vous offrant la meilleure qualité possible tout en restant strictement sous la limite de taille de fichier demandée." },
    { question: "Supprime-t-il les données de suivi ?", answer: "Oui. Les données de localisation cachées et les informations de l'appareil photo (EXIF) sont automatiquement supprimées pour protéger votre vie privée." },
    { question: "Est-ce que ça marche sur les téléphones ?", answer: "Absolument. Vous pouvez l'utiliser directement dans votre navigateur mobile, aucune installation d'application n'est requise." },
    { question: "Quels formats d'image puis-je télécharger ?", answer: "Vous pouvez télécharger presque n'importe quel format d'image standard, y compris JPG, PNG, WebP, AVIF et HEIC (sur les appareils pris en charge). Le résultat final sera toujours un JPG conforme." },
    { question: "Puis-je redimensionner plusieurs images à la fois ?", answer: "Oui, vous pouvez traiter par lots plusieurs images à la fois. Sélectionnez simplement ou glissez-déposez plusieurs fichiers dans l'espace de travail. Les dimensions prédéfinies actives et les limites de taille seront appliquées automatiquement à tous les fichiers téléchargés." },
    { question: "Dois-je créer un compte ?", answer: "Aucun compte n'est requis. Vous pouvez utiliser toutes les fonctionnalités du redimensionneur immédiatement, sans vous inscrire ni fournir de détails personnels." },
    { question: "Est-ce complètement gratuit à utiliser ?", answer: "Oui ! Les outils de base de redimensionnement et d'amélioration de signature sont 100 % gratuits pour que tout le monde puisse les utiliser directement depuis son navigateur." }
  ],
  de: [
    { question: "Sind meine Daten sicher?", answer: "Ja. Alles geschieht vollständig in Ihrem Browser. Es werden niemals Bilder oder persönliche Daten auf einen Server hochgeladen." },
    { question: "Warum 'Dokumenten-Größenanpasser', wenn nur Bilder akzeptiert werden?", answer: "Wir sind auf die Komprimierung von bildbasierten Dokumenten (wie gescannten Ausweisen, Zeugnissen und Anzeigen) spezialisiert, die für die meisten offiziellen Formular-Uploads im JPG/PNG-Format vorliegen müssen. Wir verarbeiten keine PDF- oder Word-Dateien." },
    { question: "Welche Dateigrößen werden unterstützt?", answer: "Sie können Fotos auf jede gewünschte exakte Größe komprimieren (z. B. unter 50 KB oder 20 KB). Es ist perfekt für offizielle Formulare oder einfach nur, um Platz zu schaffen." },
    { question: "Verliere ich an Bildqualität?", answer: "Unser Tool findet die perfekte Balance und bietet Ihnen die bestmögliche Qualität, während die von Ihnen angeforderte Dateigrößenbeschränkung strikt eingehalten wird." },
    { question: "Werden Tracking-Daten entfernt?", answer: "Ja. Versteckte Standortdaten und Kamerainformationen (EXIF) werden automatisch entfernt, um Ihre Privatsphäre zu schützen." },
    { question: "Funktioniert es auf Handys?", answer: "Absolut. Sie können es direkt in Ihrem mobilen Browser verwenden, es ist keine App-Installation erforderlich." },
    { question: "Welche Bildformate kann ich hochladen?", answer: "Sie können fast alle Standard-Bildformate hochladen, einschließlich JPG, PNG, WebP, AVIF und HEIC (auf unterstützten Geräten). Die endgültige Ausgabe ist immer ein konformes JPG." },
    { question: "Kann ich die Größe mehrerer Bilder gleichzeitig ändern?", answer: "Ja, Sie können mehrere Bilder gleichzeitig im Stapel verarbeiten. Wählen Sie einfach mehrere Dateien aus oder ziehen Sie sie per Drag-and-Drop in den Arbeitsbereich. Die aktiven voreingestellten Abmessungen und Größenbeschränkungen werden automatisch auf alle hochgeladenen Dateien angewendet." },
    { question: "Muss ich ein Konto erstellen?", answer: "Es ist kein Konto erforderlich. Sie können alle Funktionen des Größenanpassers sofort nutzen, ohne sich anzumelden oder persönliche Daten anzugeben." },
    { question: "Ist die Nutzung völlig kostenlos?", answer: "Ja! Die wichtigsten Werkzeuge zur Größenanpassung und Unterschriftenverbesserung sind für jeden direkt über seinen Browser 100 % kostenlos nutzbar." }
  ],
  pt: [
    { question: "Meus dados estão seguros?", answer: "Sim. Tudo acontece inteiramente no seu navegador. Nenhuma imagem ou dado pessoal é carregado em nenhum servidor." },
    { question: "Por que 'Redimensionador de documentos' se ele só aceita imagens?", answer: "Somos especialistas em comprimir papéis baseados em imagens (como identidades digitalizadas, boletins e boletins de ocorrência) que precisam estar no formato JPG/PNG para a maioria dos envios de formulários oficiais. Não processamos arquivos PDF ou Word." },
    { question: "Quais tamanhos de arquivo ele suporta?", answer: "Você pode comprimir fotos para qualquer tamanho exato que precisar (por exemplo, menos de 50 KB ou 20 KB). É perfeito para formulários oficiais ou apenas para liberar espaço." },
    { question: "Vou perder qualidade de imagem?", answer: "Nossa ferramenta encontra o equilíbrio perfeito, oferecendo a melhor qualidade possível, mantendo-se estritamente abaixo do limite de tamanho de arquivo solicitado." },
    { question: "Ele remove dados de rastreamento?", answer: "Sim. Dados de localização ocultos e informações da câmera (EXIF) são removidos automaticamente para proteger sua privacidade." },
    { question: "Funciona em telefones?", answer: "Com certeza. Você pode usá-lo diretamente no navegador do seu celular, sem precisar instalar nenhum aplicativo." },
    { question: "Quais formatos de imagem posso enviar?", answer: "Você pode enviar quase todos os formatos de imagem padrão, incluindo JPG, PNG, WebP, AVIF e HEIC (em dispositivos suportados). O resultado final sempre será um JPG compatível." },
    { question: "Posso redimensionar várias imagens de uma vez?", answer: "Sim, você pode processar em lote várias imagens de uma vez. Basta selecionar ou arrastar e soltar vários arquivos no espaço de trabalho. As dimensões predefinidas ativas e os limites de tamanho serão aplicados automaticamente a todos os arquivos carregados." },
    { question: "Preciso criar uma conta?", answer: "Não é necessária nenhuma conta. Você pode usar todos os recursos do redimensionador imediatamente, sem se inscrever ou fornecer detalhes pessoais." },
    { question: "É totalmente gratuito para usar?", answer: "Sim! As ferramentas principais de redimensionamento e aprimoramento de assinatura são 100% gratuitas para todos usarem diretamente do navegador." }
  ],
  ja: [
    { question: "データは安全ですか？", answer: "はい。すべてがブラウザ内で完結します。画像や個人データがサーバーにアップロードされることはありません。" },
    { question: "画像しか受け付けないのに、なぜ「ドキュメントリサイザー」なのですか？", answer: "私たちは、公式フォームのアップロードでJPG/PNG形式であることが求められる画像ベースの書類（スキャンしたIDカード、成績証明書、被害届など）の圧縮に特化しています。PDFやWordファイルは処理しません。" },
    { question: "どのファイルサイズに対応していますか？", answer: "写真をご希望の正確なサイズ（例：50KB未満や20KB未満）に圧縮できます。公式フォームやスペースの節約に最適です。" },
    { question: "画質は落ちますか？", answer: "私たちのツールは完璧なバランスを見つけ、要求されたファイルサイズ制限内に厳密に収めながら、可能な限り最高の画質を提供します。" },
    { question: "追跡データは削除されますか？", answer: "はい。プライバシー保護のため、非表示の位置データやカメラ情報（EXIF）は自動的に削除されます。" },
    { question: "スマートフォンで使えますか？", answer: "もちろんです。アプリをインストールすることなく、モバイルブラウザで直接使用できます。" },
    { question: "どの画像形式をアップロードできますか？", answer: "JPG、PNG、WebP、AVIF、HEIC（対応デバイス）など、ほぼすべての標準的な画像形式をアップロードできます。最終的な出力は常に準拠したJPGになります。" },
    { question: "一度に複数の画像のサイズを変更できますか？", answer: "はい、一度に複数の画像をバッチ処理できます。複数のファイルをワークスペースに選択またはドラッグアンドドロップするだけです。アクティブなプリセットの寸法とサイズ制限が、アップロードされたすべてのファイルに自動的に適用されます。" },
    { question: "アカウントを作成する必要がありますか？", answer: "アカウントは不要です。サインアップや個人情報の提供なしに、リサイザーのすべての機能をすぐに使用できます。" },
    { question: "完全に無料で使用できますか？", answer: "はい！コアとなるサイズ変更ツールと署名強化ツールは、誰もがブラウザから直接、100％無料で使用できます。" }
  ],
  ko: [
    { question: "내 데이터는 안전한가요?", answer: "네. 모든 과정은 전적으로 귀하의 브라우저에서 진행됩니다. 어떠한 이미지나 개인 데이터도 서버에 업로드되지 않습니다." },
    { question: "이미지만 허용되는데 왜 '문서 리사이저'인가요?", answer: "저희는 대부분의 공식 양식 업로드에 JPG/PNG 형식이 요구되는 이미지 기반 서류(스캔한 신분증, 성적 증명서, 고소장 등) 압축에 특화되어 있습니다. PDF나 Word 파일은 처리하지 않습니다." },
    { question: "어떤 파일 크기를 지원하나요?", answer: "사진을 필요한 정확한 크기(예: 50KB 또는 20KB 미만)로 압축할 수 있습니다. 공식 양식이나 단순히 공간을 확보하는 데 완벽합니다." },
    { question: "이미지 품질이 저하되나요?", answer: "저희 도구는 완벽한 균형을 찾아, 요청하신 파일 크기 제한을 엄격하게 준수하면서 가능한 최고의 품질을 제공합니다." },
    { question: "추적 데이터를 제거하나요?", answer: "네. 귀하의 개인정보 보호를 위해 숨겨진 위치 데이터와 카메라 정보(EXIF)는 자동으로 제거됩니다." },
    { question: "스마트폰에서 작동하나요?", answer: "물론입니다. 앱 설치 없이 모바일 브라우저에서 직접 사용할 수 있습니다." },
    { question: "어떤 이미지 형식을 업로드할 수 있나요?", answer: "JPG, PNG, WebP, AVIF, HEIC(지원 기기 한정) 등 거의 모든 표준 이미지 형식을 업로드할 수 있습니다. 최종 결과물은 항상 호환되는 JPG입니다." },
    { question: "한 번에 여러 이미지의 크기를 조정할 수 있나요?", answer: "네, 한 번에 여러 이미지를 일괄 처리할 수 있습니다. 단순히 여러 파일을 작업 공간에 선택하거나 드래그 앤 드롭하면 됩니다. 활성 사전 설정 치수와 크기 제한이 업로드된 모든 파일에 자동으로 적용됩니다." },
    { question: "계정을 만들어야 하나요?", answer: "계정이 필요하지 않습니다. 가입하거나 개인 정보를 제공할 필요 없이 리사이저의 모든 기능을 즉시 사용할 수 있습니다." },
    { question: "완전히 무료로 사용할 수 있나요?", answer: "네! 핵심 크기 조정 및 서명 강화 도구는 누구나 브라우저에서 직접 100% 무료로 사용할 수 있습니다." }
  ],
  zh: [
    { question: "我的数据安全吗？", answer: "是的。一切都完全在您的浏览器中进行。没有任何图片或个人数据会被上传到任何服务器。" },
    { question: "如果只接受图片，为什么叫'文档调整器'？", answer: "我们专门压缩基于图像的文书工作（如扫描的身份证、成绩单和报警记录），大多数官方表格上传要求这些文件必须是JPG/PNG格式。我们不处理PDF或Word文件。" },
    { question: "它支持什么文件大小？", answer: "您可以将照片压缩到您需要的任何确切大小（例如，50KB或20KB以下）。它非常适合官方表格或仅仅是为了释放空间。" },
    { question: "我的图片质量会下降吗？", answer: "我们的工具找到了完美的平衡，为您提供尽可能好的质量，同时严格保持在您要求的文件大小限制之下。" },
    { question: "它会删除跟踪数据吗？", answer: "是的。为了保护您的隐私，隐藏的位置数据和相机信息（EXIF）会被自动删除。" },
    { question: "它能在手机上使用吗？", answer: "绝对可以。您可以直接在手机浏览器中使用，无需安装应用程序。" },
    { question: "我可以上传哪些图片格式？", answer: "您可以上传几乎任何标准的图片格式，包括JPG、PNG、WebP、AVIF和HEIC（在支持的设备上）。最终的输出结果将始终是符合要求的JPG文件。" },
    { question: "我可以一次调整多张图片的大小吗？", answer: "是的，您可以一次批量处理多张图片。只需在工作区中选择或拖放多个文件。活动的预设尺寸和大小限制将自动应用于所有上传的文件。" },
    { question: "我需要创建一个帐户吗？", answer: "不需要帐户。您可以立即使用调整器的所有功能，无需注册或提供任何个人详细信息。" },
    { question: "它是完全免费的吗？", answer: "是的！核心的调整大小和签名增强工具百分之百免费，任何人都可以直接通过浏览器使用。" }
  ],
  ar: [
    { question: "هل بياناتي آمنة؟", answer: "نعم. كل شيء يحدث بالكامل في متصفحك. لا يتم أبداً تحميل أي صور أو بيانات شخصية إلى أي خادم." },
    { question: "لماذا 'مغيّر حجم المستندات' إذا كان يقبل الصور فقط؟", answer: "نحن متخصصون في ضغط الأعمال الورقية القائمة على الصور (مثل بطاقات الهوية الممسوحة ضوئياً، وكشوف الدرجات، ومحاضر الشرطة) والتي يجب أن تكون بتنسيق JPG/PNG لمعظم عمليات تحميل النماذج الرسمية. نحن لا نعالج ملفات PDF أو Word." },
    { question: "ما هي أحجام الملفات التي يدعمها؟", answer: "يمكنك ضغط الصور إلى أي حجم دقيق تحتاجه (على سبيل المثال، أقل من 50 كيلوبايت أو 20 كيلوبايت). إنه مثالي للنماذج الرسمية أو ببساطة لتوفير مساحة." },
    { question: "هل سأفقد جودة الصورة؟", answer: "تجد أداتنا التوازن المثالي، حيث تمنحك أفضل جودة ممكنة مع البقاء بدقة تحت حد حجم الملف الذي طلبته." },
    { question: "هل يزيل بيانات التتبع؟", answer: "نعم. يتم تلقائياً إزالة بيانات الموقع المخفية ومعلومات الكاميرا (EXIF) لحماية خصوصيتك." },
    { question: "هل يعمل على الهواتف؟", answer: "بالتأكيد. يمكنك استخدامه مباشرة في متصفح هاتفك المحمول، ولا يتطلب تثبيت أي تطبيق." },
    { question: "ما هي تنسيقات الصور التي يمكنني تحميلها؟", answer: "يمكنك تحميل أي تنسيق صور قياسي تقريباً، بما في ذلك JPG وPNG وWebP وAVIF وHEIC (على الأجهزة المدعومة). سيكون الإخراج النهائي دائماً بتنسيق JPG متوافق." },
    { question: "هل يمكنني تغيير حجم عدة صور في وقت واحد؟", answer: "نعم، يمكنك معالجة عدة صور دفعة واحدة. ما عليك سوى تحديد ملفات متعددة أو سحبها وإفلاتها في مساحة العمل. سيتم تطبيق الأبعاد المحددة مسبقاً النشطة وحدود الحجم تلقائياً على جميع الملفات المحملة." },
    { question: "هل أحتاج إلى إنشاء حساب؟", answer: "لا يشترط وجود حساب. يمكنك استخدام جميع ميزات مغيّر الحجم على الفور، دون التسجيل أو تقديم أي تفاصيل شخصية." },
    { question: "هل استخدامه مجاني تماماً؟", answer: "نعم! أدوات تغيير الحجم وتحسين التوقيع الأساسية مجانية 100% ليستخدمها الجميع مباشرة من متصفحهم." }
  ]
};

export const faqs = faqsByLocale['en']; // Default for legacy imports
