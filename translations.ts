import { AppLanguage } from '../types';

export const translations: Record<AppLanguage, Record<string, string>> = {
  en: {
    // App Brand
    appTitle: 'AI FORM ASSISTANT',
    tagline: 'Simple, accessible form completion for seniors',
    welcomeHeading: 'Welcome! Let\'s complete your form together.',
    welcomeSubheading: 'A simple assistant designed to help you complete forms with ease and confidence.',
    
    // Auth & Access
    logIn: 'LOG IN',
    createAccount: 'CREATE ACCOUNT',
    continueAsGuest: 'CONTINUE AS GUEST',
    exit: 'EXIT',
    logOut: 'LOG OUT',
    back: 'BACK',
    next: 'NEXT',
    continue: 'CONTINUE',
    cancel: 'CANCEL',
    start: 'START',
    save: 'SAVE',
    submit: 'SUBMIT',
    
    // Accessibility Toolbar
    smallerText: 'A-',
    defaultText: 'A',
    largerText: 'A+',
    contrast: 'Contrast',
    highContrast: 'High Contrast',
    readAloud: 'Read Aloud',
    stopAudio: 'Stop Audio',
    help: 'Help',
    privacy: 'Privacy',
    myApplications: 'My Applications',
    guestMode: 'Guest Mode',
    welcomeUser: 'Welcome',
    
    // Login Screen
    welcomeBack: 'Welcome back!',
    emailOrPhone: 'Email or Phone Number',
    password: 'Password',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    forgotPassword: 'Forgot password?',
    loginError: 'We couldn\'t log you in. Please check your email or phone number and password.',
    demoLoginHint: 'Tip: Use Demo Account (ramesh@example.com / password123)',
    
    // Register Screen
    createAccountTitle: 'Let\'s create your account.',
    fullName: 'Full Name',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',
    termsConsent: 'I understand that my information will be used to save my progress.',
    accountCreatedSuccess: 'Account created successfully!',
    accountCreatedDesc: 'Your account can now safely save your application progress.',
    passwordMismatch: 'Passwords do not match. Please re-enter your password carefully.',
    consentRequired: 'Please confirm that your information may be used to save your progress.',
    
    // Guest Screen
    guestTitle: 'GUEST MODE',
    guestDesc: 'You can use the form assistant without creating an account.',
    guestPerk1: 'Upload forms easily',
    guestPerk2: 'Use Auto-Fill mode with smart document reading',
    guestPerk3: 'Use Guide Me mode with step-by-step assistance',
    guestPerk4: 'Use OCR & voice speech assistance',
    guestPerk5: 'Validate answers in plain language',
    guestPerk6: 'Review and print your completed form',
    
    // Exit Dialog
    exitTitle: 'EXIT APPLICATION',
    exitConfirm: 'Are you sure you want to exit?',
    exitAppBtn: 'EXIT APPLICATION',
    browserCloseNotice: 'You can close this browser tab to exit the application.',
    
    // Logout Dialog
    logoutTitle: 'LOG OUT',
    logoutConfirm: 'Are you sure you want to log out? Your saved applications will remain safely stored when you log in again.',
    
    // Dashboard
    whatToDo: 'What would you like to do?',
    autoFillTitle: 'AUTO-FILL',
    autoFillDesc: 'Upload your documents and let AI find the information needed for your form.',
    guideMeTitle: 'GUIDE ME',
    guideMeDesc: 'Answer simple questions and complete your form step by step with voice help.',
    continuePrevious: 'CONTINUE PREVIOUS APPLICATION',
    startNewApp: 'START A NEW FORM',
    
    // Form Upload
    uploadTitle: 'Upload Your Form',
    uploadInstruction: 'Please upload the form you want help completing, or choose one of our sample demonstration forms.',
    chooseFile: 'CHOOSE FILE',
    chooseFromDemo: 'Or choose a sample form to test:',
    supportedFormats: 'Supports PDF, JPG, JPEG, and PNG files',
    
    // Form Understanding
    understandingTitle: 'FORM UNDERSTANDING',
    understandingLoading: 'I\'m understanding your form... Finding sections, questions, and required documents.',
    detectedSections: 'Sections detected:',
    detectedFields: 'Fields detected:',
    requiredDocsCount: 'Required documents:',
    purpose: 'Form Purpose:',
    
    // Documents
    documentsRequired: 'DOCUMENTS REQUIRED',
    documentsDesc: 'Here are the supporting documents needed for this specific form.',
    whyNeeded: 'Why is this needed?',
    explainBtn: 'Explain',
    uploadedStatus: 'Uploaded',
    notUploadedStatus: 'Not Uploaded Yet',
    uploadDocBtn: 'Upload Document',
    useSampleDocBtn: 'Use Sample Document',
    
    // OCR
    ocrTitle: 'READING YOUR DOCUMENT',
    readingDoc: 'Reading your document...',
    ocrHighConfidence: 'High confidence',
    ocrMediumConfidence: 'Medium confidence — Please verify',
    ocrWarning: 'I found this information, but I\'m not completely sure. Please check it.',
    accept: 'ACCEPT',
    edit: 'EDIT',
    reject: 'REJECT',
    informationFound: 'Information found:',
    
    // Field Mapping
    mappingTitle: 'FIELD MAPPING',
    mappingSubtitle: 'Document Information ➔ Form Field',
    mappingDesc: 'Here is how your document details match the questions in your form. Please confirm each match.',
    confirmMatch: 'CONFIRM',
    confirmed: 'Confirmed ✓',
    
    // Guide Me
    stepXofY: 'STEP',
    of: 'OF',
    speak: 'Speak',
    listening: 'Listening... Please speak clearly',
    hearQuestion: 'Hear Question',
    explainThis: 'Explain This',
    yes: 'YES',
    no: 'NO',
    change: 'CHANGE',
    isCorrectConfirm: 'I understood your answer as:',
    isThatCorrect: 'Is that correct?',
    
    // Validation
    validationTitle: 'CHECKING YOUR ANSWERS',
    validationDesc: 'Let\'s make sure all required details are complete and easy to read.',
    noIssues: 'Everything looks great! All required questions are answered properly.',
    dateError: 'This date doesn\'t seem correct. Please check the day and month.',
    phoneError: 'Please enter a valid 10-digit phone number.',
    requiredMissing: 'We still need this information before you can continue.',
    contradictionWarning: 'I found different information in two places. Please check which information is correct.',
    
    // Final Review
    finalReviewTitle: 'FINAL REVIEW',
    finalReviewSubtitle: 'Please review your completed answers before generating your form.',
    aiCheckTitle: 'AI VERIFICATION CHECK',
    checkRequiredCompleted: 'Required fields completed',
    checkDatesValid: 'Dates appear valid',
    checkDocsUploaded: 'Required documents uploaded',
    checkContradictions: 'No contradictory data found',
    pleaseVerifyNotice: 'Please verify your details below carefully.',
    editInfo: 'EDIT INFORMATION',
    reviewAgain: 'REVIEW AGAIN',
    exportForm: 'EXPORT FORM',
    
    // Export
    formReadyTitle: 'FORM READY',
    formReadyDesc: 'Your completed form is ready to review and print.',
    exportPdf: 'EXPORT PDF',
    printForm: 'PRINT FORM',
    saveApplication: 'SAVE APPLICATION',
    backToDashboard: 'BACK TO DASHBOARD',
    prototypeDisclaimer: 'PROTOTYPE DEMONSTRATION: This form is a client-side prototype and has NOT been submitted to any government office.',
    
    // My Applications
    savedApplications: 'MY APPLICATIONS',
    noApplicationsYet: 'You have no saved applications yet.',
    progressLabel: 'Progress:',
    lastSavedLabel: 'Last saved:',
    deleteApp: 'Delete',
    
    // Plain Language Got It
    gotIt: 'GOT IT'
  },
  
  ta: {
    // App Brand
    appTitle: 'செயற்கை நுண்ணறிவு படிவ உதவியாளர்',
    tagline: 'முதியவர்களுக்கான எளிய படிவப் பூர்த்தி உதவியாளர்',
    welcomeHeading: 'வணக்கம்! உங்கள் படிவத்தை ஒன்றாகப் பூர்த்தி செய்வோம்.',
    welcomeSubheading: 'எளிமையாகவும் நம்பிக்கையுடனும் படிவங்களை நிரப்ப உதவும் எளிய உதவியாளர்.',
    
    // Auth & Access
    logIn: 'உள்நுழையவும்',
    createAccount: 'புதிய கணக்கு தொடங்க',
    continueAsGuest: 'விருந்தினராக தொடரவும்',
    exit: 'வெளியேறு',
    logOut: 'வெளியேறு',
    back: 'பின்னால்',
    next: 'அடுத்து',
    continue: 'தொடரவும்',
    cancel: 'ரத்து செய்',
    start: 'தொடங்கு',
    save: 'சேமிக்க',
    submit: 'சமர்ப்பிக்க',
    
    // Accessibility Toolbar
    smallerText: 'A-',
    defaultText: 'A',
    largerText: 'A+',
    contrast: 'மாறுபாடு',
    highContrast: 'உயர் மாறுபாடு',
    readAloud: 'வாசித்துக் காட்டு',
    stopAudio: 'நிறுத்து',
    help: 'உதவி',
    privacy: 'தனியுரிமை',
    myApplications: 'என் விண்ணப்பங்கள்',
    guestMode: 'விருந்தினர் முறை',
    welcomeUser: 'வணக்கம்',
    
    // Login Screen
    welcomeBack: 'மீண்டும் நல்வரவு!',
    emailOrPhone: 'மின்னஞ்சல் அல்லது தொலைபேசி எண்',
    password: 'கடவுச்சொல்',
    showPassword: 'கடவுச்சொல்லைக் காட்டு',
    hidePassword: 'கடவுச்சொல்லை மறை',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    loginError: 'உங்களை உள்நுழைக்க முடியவில்லை. உங்கள் விவரங்களைச் சரிபார்க்கவும்.',
    demoLoginHint: 'குறிப்பு: மாதிரி கணக்கைப் பயன்படுத்தவும் (ramesh@example.com / password123)',
    
    // Register Screen
    createAccountTitle: 'உங்கள் கணக்கை உருவாக்குவோம்.',
    fullName: 'முழு பெயர்',
    createPassword: 'புதிய கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல்லை உறுதி செய்',
    termsConsent: 'என் முன்னேற்றத்தை சேமிக்க என் தகவல்களைப் பயன்படுத்த ஒப்புக்கொள்கிறேன்.',
    accountCreatedSuccess: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
    accountCreatedDesc: 'உங்கள் கணக்கு இப்போது உங்கள் விண்ணப்ப விவரங்களை பாதுகாப்பாக சேமிக்கும்.',
    passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை. மீண்டும் கவனமாக உள்ளிடவும்.',
    consentRequired: 'உங்கள் தகவல்களை சேமிக்க ஒப்புதல் அளிக்கவும்.',
    
    // Guest Screen
    guestTitle: 'விருந்தினர் முறை',
    guestDesc: 'கணக்கு உருவாக்காமலேயே இந்த உதவியாளரை முழுமையாகப் பயன்படுத்தலாம்.',
    guestPerk1: 'படிவங்களை எளிதாகப் பதிவேற்றலாம்',
    guestPerk2: 'தானியங்கி பூர்த்தி முறையைப் பயன்படுத்தலாம்',
    guestPerk3: 'படிப்படியாக வழிகாட்டும் முறையைப் பெறலாம்',
    guestPerk4: 'ஆவண வாசிப்பு மற்றும் குரல் உதவியைப் பெறலாம்',
    guestPerk5: 'எளிய மொழியில் தகவல்களைச் சரிபார்க்கலாம்',
    guestPerk6: 'பூர்த்தி செய்த படிவத்தை அச்சிடலாம்',
    
    // Exit Dialog
    exitTitle: 'பயன்பாட்டிலிருந்து வெளியேறு',
    exitConfirm: 'நிச்சயமாக வெளியேற விரும்புகிறீர்களா?',
    exitAppBtn: 'வெளியேறு',
    browserCloseNotice: 'வெளியேற இந்த உலாவிப் பக்கத்தை மூடலாம்.',
    
    // Logout Dialog
    logoutTitle: 'வெளியேறு',
    logoutConfirm: 'நிச்சயமாக வெளியேற விரும்புகிறீர்களா? உங்கள் சேமிக்கப்பட்ட படிவங்கள் பாதுகாப்பாக இருக்கும்.',
    
    // Dashboard
    whatToDo: 'நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
    autoFillTitle: 'தானியங்கி நிரப்புதல் (Auto-Fill)',
    autoFillDesc: 'உங்கள் ஆவணங்களைப் பதிவேற்றுங்கள்; AI தேவையான தகவல்களைக் கண்டறியும்.',
    guideMeTitle: 'எனக்கு வழிகாட்டு (Guide Me)',
    guideMeDesc: 'எளிய கேள்விகளுக்குப் பதிலளித்து படிப்படியாகப் படிவத்தைப் பூர்த்தி செய்யுங்கள்.',
    continuePrevious: 'முந்தைய விண்ணப்பத்தைத் தொடரவும்',
    startNewApp: 'புதிய படிவத்தைத் தொடங்கு',
    
    // Form Upload
    uploadTitle: 'உங்கள் படிவத்தைப் பதிவேற்றவும்',
    uploadInstruction: 'நீங்கள் பூர்த்தி செய்ய வேண்டிய படிவத்தைப் பதிவேற்றவும் அல்லது எங்கள் மாதிரிப் படிவத்தைத் தேர்ந்தெடுக்கவும்.',
    chooseFile: 'கோப்பைத் தேர்ந்தெடு',
    chooseFromDemo: 'அல்லது மாதிரி படிவத்தைத் தேர்ந்தெடுக்கவும்:',
    supportedFormats: 'PDF, JPG, JPEG மற்றும் PNG கோப்புகளை ஆதரிக்கிறது',
    
    // Form Understanding
    understandingTitle: 'படிவத்தைப் புரிந்துகொள்ளுதல்',
    understandingLoading: 'உங்கள் படிவத்தைப் புரிந்துகொள்கிறேன்... கேள்விகளையும் ஆவணங்களையும் கண்டறிகிறேன்.',
    detectedSections: 'கண்டறியப்பட்ட பிரிவுகள்:',
    detectedFields: 'கண்டறியப்பட்ட கேள்விகள்:',
    requiredDocsCount: 'தேவையான ஆவணங்கள்:',
    purpose: 'படிவத்தின் நோக்கம்:',
    
    // Documents
    documentsRequired: 'தேவையான ஆவணங்கள்',
    documentsDesc: 'இந்தப் படிவத்திற்குத் தேவையான ஆவணங்கள் கீழே கொடுக்கப்பட்டுள்ளன.',
    whyNeeded: 'இது ஏன் தேவை?',
    explainBtn: 'விளக்கம்',
    uploadedStatus: 'பதிவேற்றப்பட்டது',
    notUploadedStatus: 'இன்னும் பதிவேற்றப்படவில்லை',
    uploadDocBtn: 'ஆவணத்தைப் பதிவேற்று',
    useSampleDocBtn: 'மாதிரி ஆவணத்தைப் பயன்படுத்து',
    
    // OCR
    ocrTitle: 'ஆவணத்தை வாசித்தல்',
    readingDoc: 'உங்கள் ஆவணத்தை வாசிக்கிறேன்...',
    ocrHighConfidence: 'உயர் துல்லியம்',
    ocrMediumConfidence: 'நடுத்தர துல்லியம் — சரிபார்க்கவும்',
    ocrWarning: 'இந்தத் தகவலைக் கண்டறிந்துள்ளேன், ஆனால் சரிபார்க்கவும்.',
    accept: 'ஏற்றுக்கொள்',
    edit: 'திருத்து',
    reject: 'நிராகரி',
    informationFound: 'கண்டறியப்பட்ட தகவல்கள்:',
    
    // Field Mapping
    mappingTitle: 'புலப் பொருத்தம் (Field Mapping)',
    mappingSubtitle: 'ஆவணத் தகவல் ➔ படிவக் கேள்வி',
    mappingDesc: 'ஆவணத்திலிருந்து எடுக்கப்பட்ட தகவல்கள் படிவத்துடன் எவ்வாறு பொருந்துகிறது என்பதை உறுதிப்படுத்தவும்.',
    confirmMatch: 'உறுதி செய்',
    confirmed: 'உறுதி செய்யப்பட்டது ✓',
    
    // Guide Me
    stepXofY: 'படிநிலை',
    of: 'இல்',
    speak: 'பேசவும்',
    listening: 'கேட்கிறேன்... தெளிவாகப் பேசவும்',
    hearQuestion: 'கேள்வியைக் கேட்க',
    explainThis: 'இதன் விளக்கம்',
    yes: 'ஆம்',
    no: 'இல்லை',
    change: 'மாற்று',
    isCorrectConfirm: 'உங்கள் பதில்:',
    isThatCorrect: 'இது சரியானதா?',
    
    // Validation
    validationTitle: 'பதில்களைச் சரிபார்க்கிறது',
    validationDesc: 'அனைத்து விவரங்களும் சரியாக உள்ளதா எனப் பார்ப்போம்.',
    noIssues: 'அனைத்தும் சரியாக உள்ளது! தேவையான அனைத்து கேள்விகளுக்கும் பதிலளிக்கப்பட்டது.',
    dateError: 'இந்த தேதி சரியாகத் தெரியவில்லை. நாள் மற்றும் மாதத்தைச் சரிபார்க்கவும்.',
    phoneError: 'சரியான 10 இலக்கத் தொலைபேசி எண்ணை உள்ளிடவும்.',
    requiredMissing: 'தொடர்வதற்கு முன் இந்த விவரம் தேவைப்படுகிறது.',
    contradictionWarning: 'இரண்டு இடங்களில் மாறுபட்ட தகவல்கள் உள்ளன. எது சரியானது என்பதைச் சரிபார்க்கவும்.',
    
    // Final Review
    finalReviewTitle: 'இறுதி மதிப்பாய்வு',
    finalReviewSubtitle: 'படிவத்தை உருவாக்குவதற்கு முன் உங்கள் பதில்களைச் சரிபார்க்கவும்.',
    aiCheckTitle: 'AI சரிபார்ப்பு பட்டியல்',
    checkRequiredCompleted: 'தேவையான கேள்விகள் பூர்த்தி செய்யப்பட்டன',
    checkDatesValid: 'தேதிகள் சரியாக உள்ளன',
    checkDocsUploaded: 'தேவையான ஆவணங்கள் சேர்க்கப்பட்டன',
    checkContradictions: 'முரண்பாடான தகவல்கள் இல்லை',
    pleaseVerifyNotice: 'உங்கள் விவரங்களைக் கவனமாகச் சரிபார்க்கவும்.',
    editInfo: 'தகவலைத் திருத்து',
    reviewAgain: 'மீண்டும் பார்க்கவும்',
    exportForm: 'படிவத்தைப் பெறுக',
    
    // Export
    formReadyTitle: 'படிவம் தயார்',
    formReadyDesc: 'உங்கள் பூர்த்தி செய்யப்பட்ட படிவம் அச்சிடத் தயாராக உள்ளது.',
    exportPdf: 'PDF ஆகப் பதிவிறக்கு',
    printForm: 'படிவத்தை அச்சிடு',
    saveApplication: 'படிவத்தை சேமிக்க',
    backToDashboard: 'முகப்புப் பக்கத்திற்குச் செல்',
    prototypeDisclaimer: 'மாதிரி வடிவம்: இது ஒரு மாதிரிப் படிவம் மட்டுமே. இது அரசு அலுவலகத்தில் சமர்ப்பிக்கப்படவில்லை.',
    
    // My Applications
    savedApplications: 'என் விண்ணப்பங்கள்',
    noApplicationsYet: 'சேமிக்கப்பட்ட விண்ணப்பங்கள் எதுவும் இல்லை.',
    progressLabel: 'முன்னேற்றம்:',
    lastSavedLabel: 'கடைசியாக சேமிக்கப்பட்டது:',
    deleteApp: 'நீக்கு',
    
    // Plain Language Got It
    gotIt: 'புரிந்தது'
  },
  
  hi: {
    // App Brand
    appTitle: 'एआई फॉर्म सहायक',
    tagline: 'वरिष्ठ नागरिकों के लिए आसान और सुलभ फॉर्म सहायक',
    welcomeHeading: 'नमस्ते! आइए मिलकर आपका फॉर्म पूरा करें।',
    welcomeSubheading: 'एक सरल सहायक जिसे फॉर्म भरने में आपकी मदद करने के लिए बनाया गया है।',
    
    // Auth & Access
    logIn: 'लॉग इन करें',
    createAccount: 'नया खाता बनाएं',
    continueAsGuest: 'अतिथि के रूप में जारी रखें',
    exit: 'बाहर निकलें',
    logOut: 'लॉग आउट',
    back: 'पीछे जाएं',
    next: 'आगे बढ़ें',
    continue: 'जारी रखें',
    cancel: 'रद्द करें',
    start: 'शुरू करें',
    save: 'सहेजें',
    submit: 'जमा करें',
    
    // Accessibility Toolbar
    smallerText: 'A-',
    defaultText: 'A',
    largerText: 'A+',
    contrast: 'कंट्रास्ट',
    highContrast: 'हाई कंट्रास्ट',
    readAloud: 'बोलकर सुनाएं',
    stopAudio: 'आवाज रोकें',
    help: 'मदद',
    privacy: 'गोपनीयता',
    myApplications: 'मेरे आवेदन',
    guestMode: 'अतिथि मोड',
    welcomeUser: 'स्वागत है',
    
    // Login Screen
    welcomeBack: 'वापसी पर स्वागत है!',
    emailOrPhone: 'ईमेल या फोन नंबर',
    password: 'पासवर्ड',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छिपाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginError: 'लॉग इन नहीं हो सका। कृपया अपना ईमेल/फोन नंबर और पासवर्ड जांचें।',
    demoLoginHint: 'सुझाव: डेमो खाते का उपयोग करें (ramesh@example.com / password123)',
    
    // Register Screen
    createAccountTitle: 'आइए आपका खाता बनाएं।',
    fullName: 'पूरा नाम',
    createPassword: 'नया पासवर्ड बनाएं',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    termsConsent: 'मैं समझता/समझती हूँ कि मेरी प्रगति को सहेजने के लिए मेरी जानकारी का उपयोग किया जाएगा।',
    accountCreatedSuccess: 'खाता सफलतापूर्वक बन गया!',
    accountCreatedDesc: 'अब आपका खाता आपके आवेदन की प्रगति को सुरक्षित रूप से सहेज सकता है।',
    passwordMismatch: 'पासवर्ड मेल नहीं खा रहे हैं। कृपया ध्यान से पुनः दर्ज करें।',
    consentRequired: 'कृपया प्रगति सहेजने की सहमति दें।',
    
    // Guest Screen
    guestTitle: 'अतिथि मोड',
    guestDesc: 'आप बिना खाता बनाए भी फॉर्म सहायक का पूरा उपयोग कर सकते हैं।',
    guestPerk1: 'फॉर्म आसानी से अपलोड करें',
    guestPerk2: 'ऑटो-फिल मोड का उपयोग करें',
    guestPerk3: 'गाइड मी मोड के साथ कदम-दर-कदम मदद पाएं',
    guestPerk4: 'दस्तावेज पढ़ने और आवाज की सहायता लें',
    guestPerk5: 'सरल भाषा में जानकारी सत्यापित करें',
    guestPerk6: 'पूरा किया गया फॉर्म देखें और प्रिंट करें',
    
    // Exit Dialog
    exitTitle: 'एप्लिकेशन से बाहर निकलें',
    exitConfirm: 'क्या आप निश्चित रूप से बाहर निकलना चाहते हैं?',
    exitAppBtn: 'बाहर निकलें',
    browserCloseNotice: 'बाहर निकलने के लिए आप इस ब्राउज़र टैब को बंद कर सकते हैं।',
    
    // Logout Dialog
    logoutTitle: 'लॉग आउट',
    logoutConfirm: 'क्या आप लॉग आउट करना चाहते हैं? अगली बार लॉग इन करने पर आपके सहेजे गए आवेदन सुरक्षित मिलेंगे।',
    
    // Dashboard
    whatToDo: 'आप क्या करना चाहते हैं?',
    autoFillTitle: 'ऑटो-फिल (Auto-Fill)',
    autoFillDesc: 'अपने दस्तावेज अपलोड करें और एआई को फॉर्म के लिए आवश्यक जानकारी खोजने दें।',
    guideMeTitle: 'गाइड मी (Guide Me)',
    guideMeDesc: 'सरल सवालों के जवाब दें और आवाज की मदद से कदम-दर-कदम फॉर्म पूरा करें।',
    continuePrevious: 'पिछला आवेदन जारी रखें',
    startNewApp: 'नया फॉर्म शुरू करें',
    
    // Form Upload
    uploadTitle: 'अपना फॉर्म अपलोड करें',
    uploadInstruction: 'कृपया वह फॉर्म अपलोड करें जिसे आप भरना चाहते हैं, या हमारे नमूना फॉर्मों में से चुनें।',
    chooseFile: 'फ़ाइल चुनें',
    chooseFromDemo: 'या परीक्षण के लिए नमूना फॉर्म चुनें:',
    supportedFormats: 'PDF, JPG, JPEG और PNG फ़ाइलें समर्थित हैं',
    
    // Form Understanding
    understandingTitle: 'फॉर्म की समझ',
    understandingLoading: 'मैं आपका फॉर्म समझ रहा हूँ... अनुभाग, प्रश्न और आवश्यक दस्तावेज खोज रहा हूँ।',
    detectedSections: 'पहचाने गए अनुभाग:',
    detectedFields: 'पहचाने गए प्रश्न:',
    requiredDocsCount: 'आवश्यक दस्तावेज:',
    purpose: 'फॉर्म का उद्देश्य:',
    
    // Documents
    documentsRequired: 'आवश्यक दस्तावेज',
    documentsDesc: 'इस विशिष्ट फॉर्म के लिए आवश्यक दस्तावेज नीचे दिए गए हैं।',
    whyNeeded: 'इसकी आवश्यकता क्यों है?',
    explainBtn: 'समझाएं',
    uploadedStatus: 'अपलोड किया गया',
    notUploadedStatus: 'अभी अपलोड नहीं हुआ',
    uploadDocBtn: 'दस्तावेज अपलोड करें',
    useSampleDocBtn: 'नमूना दस्तावेज का उपयोग करें',
    
    // OCR
    ocrTitle: 'दस्तावेज पढ़ा जा रहा है',
    readingDoc: 'आपका दस्तावेज पढ़ा जा रहा है...',
    ocrHighConfidence: 'उच्च सटीकता',
    ocrMediumConfidence: 'मध्यम सटीकता — कृपया जांचें',
    ocrWarning: 'मुझे यह जानकारी मिली है, लेकिन कृपया इसे एक बार जांच लें।',
    accept: 'स्वीकार करें',
    edit: 'संपादित करें',
    reject: 'अस्वीकार करें',
    informationFound: 'मिली जानकारी:',
    
    // Field Mapping
    mappingTitle: 'फील्ड मिलान (Field Mapping)',
    mappingSubtitle: 'दस्तावेज की जानकारी ➔ फॉर्म का प्रश्न',
    mappingDesc: 'यहां बताया गया है कि आपके दस्तावेज की जानकारी फॉर्म के प्रश्नों से कैसे मेल खाती है।',
    confirmMatch: 'पुष्टि करें',
    confirmed: 'पुष्ट किया गया ✓',
    
    // Guide Me
    stepXofY: 'चरण',
    of: 'का',
    speak: 'बोलें',
    listening: 'सुन रहा हूँ... कृपया स्पष्ट बोलें',
    hearQuestion: 'प्रश्न सुनें',
    explainThis: 'यह समझाएं',
    yes: 'हाँ',
    no: 'नहीं',
    change: 'बदलें',
    isCorrectConfirm: 'आपका उत्तर:',
    isThatCorrect: 'क्या यह सही है?',
    
    // Validation
    validationTitle: 'उत्तरों की जांच',
    validationDesc: 'आइए सुनिश्चित करें कि सभी आवश्यक विवरण पूरे और सही हैं।',
    noIssues: 'सब कुछ सही लग रहा है! सभी आवश्यक प्रश्नों के उत्तर दिए गए हैं।',
    dateError: 'यह तारीख सही नहीं लग रही है। कृपया दिन और महीना जांचें।',
    phoneError: 'कृपया 10 अंकों का मान्य फोन नंबर दर्ज करें।',
    requiredMissing: 'आगे बढ़ने से पहले यह जानकारी आवश्यक है।',
    contradictionWarning: 'मुझे दो जगहों पर अलग-अलग जानकारी मिली है। कृपया सही जानकारी की पुष्टि करें।',
    
    // Final Review
    finalReviewTitle: 'अंतिम समीक्षा',
    finalReviewSubtitle: 'फॉर्म बनाने से पहले कृपया अपने भरे हुए उत्तरों की समीक्षा करें।',
    aiCheckTitle: 'एआई सत्यापन जांच',
    checkRequiredCompleted: 'आवश्यक प्रश्न पूरे किए गए',
    checkDatesValid: 'तारीखें मान्य हैं',
    checkDocsUploaded: 'आवश्यक दस्तावेज अपलोड किए गए',
    checkContradictions: 'कोई विरोधाभासी डेटा नहीं मिला',
    pleaseVerifyNotice: 'कृपया नीचे अपने विवरण ध्यानपूर्वक सत्यापित करें।',
    editInfo: 'जानकारी बदलें',
    reviewAgain: 'फिर से समीक्षा करें',
    exportForm: 'फॉर्म तैयार करें',
    
    // Export
    formReadyTitle: 'फॉर्म तैयार है',
    formReadyDesc: 'आपका भरा हुआ फॉर्म समीक्षा और प्रिंट के लिए तैयार है।',
    exportPdf: 'PDF डाउनलोड करें',
    printForm: 'फॉर्म प्रिंट करें',
    saveApplication: 'आवेदन सहेजें',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    prototypeDisclaimer: 'प्रोटोटाइप प्रदर्शन: यह एक नमूना फॉर्म है और किसी सरकारी कार्यालय में जमा नहीं किया गया है।',
    
    // My Applications
    savedApplications: 'मेरे आवेदन',
    noApplicationsYet: 'अभी कोई सहेजा गया आवेदन नहीं है।',
    progressLabel: 'प्रगति:',
    lastSavedLabel: 'अंतिम सहेजा गया:',
    deleteApp: 'हटाएं',
    
    // Plain Language Got It
    gotIt: 'समझ गया'
  }
};
