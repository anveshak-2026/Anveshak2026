export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  navDashboard: string;
  navCases: string;
  navEvidence: string;
  navRecovery: string;
  navTimeline: string;
  navConflicts: string;
  navChainOfCustody: string;
  navReports: string;
  navActivity: string;
  navHelp: string;

  // Header & Brand
  brandSubtitle: string;
  brandTagline: string;
  activeCase: string;
  role: string;
  demoMode: string;
  resetDemo: string;
  guidedTourBtn: string;
  logout: string;
  login: string;
  signUp: string;

  // Dashboard
  welcomeTitle: string;
  welcomeSubtitle: string;
  caseOverview: string;
  status: string;
  evidenceSources: string;
  camerasDetected: string;
  recoveredFiles: string;
  evidenceIntegrity: string;
  timelineConflicts: string;
  footageGaps: string;
  workflowTitle: string;
  stepAcquire: string;
  stepVerify: string;
  stepRecover: string;
  stepAnalyze: string;
  stepReconstruct: string;
  stepReport: string;

  // Explanations
  howItWorks: string;
  whatIsThis: string;
  nextStep: string;
  evidencePrincipleTitle: string;
  evidencePrincipleTagline: string;
  confirmed: string;
  inference: string;
  unknown: string;

  // Acquisition
  acquisitionTitle: string;
  acquisitionExplanation: string;
  workingCopyNotice: string;
  selectSource: string;
  selectVendor: string;
  importEvidence: string;
  generateHash: string;
  verifyStatus: string;
  createWorkingCopy: string;

  // Recovery
  recoveryTitle: string;
  recoveryExplanation: string;
  recoverySimulationNotice: string;
  runRecoveryScan: string;

  // Timeline
  timelineTitle: string;
  timelineExplanation: string;
  correlatedNotice: string;

  // Conflicts & Gaps
  conflictsGapsTitle: string;
  conflictsTab: string;
  gapsTab: string;
  conflictsExplanation: string;
  gapsExplanation: string;
  gapTamperingNotice: string;

  // Reports
  reportsTitle: string;
  reportsExplanation: string;
  generateReport: string;
  previewReport: string;
  exportPdf: string;

  // Chain of custody
  chainTitle: string;
  chainExplanation: string;
  exportChain: string;

  // Help page
  helpTitle: string;
  helpWhatIsAnveshak: string;
  helpWhatDoes: string;
  helpWhatDoesNot: string;
  responsibleAiTitle: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    navDashboard: 'Dashboard',
    navCases: 'Cases',
    navEvidence: 'Evidence Acquisition',
    navRecovery: 'Evidence Recovery',
    navTimeline: 'Timeline Reconstruction',
    navConflicts: 'Conflicts & Gaps',
    navChainOfCustody: 'Chain of Custody',
    navReports: 'Forensic Reports',
    navActivity: 'Activity Log',
    navHelp: 'Help / How It Works',

    brandSubtitle: 'Multi-Vendor DVR/NVR Forensic Analysis & Evidence Reconstruction Platform',
    brandTagline: 'Preserve. Recover. Reconstruct. Prove.',
    activeCase: 'Active Case',
    role: 'Role',
    demoMode: 'Demo Mode',
    resetDemo: 'Reset Demo',
    guidedTourBtn: 'Guided Tour',
    logout: 'Logout',
    login: 'Login',
    signUp: 'Create Account',

    welcomeTitle: 'Welcome to ANVESHAK',
    welcomeSubtitle: 'From fragmented surveillance data to structured, traceable forensic evidence.',
    caseOverview: 'Case Overview',
    status: 'Status',
    evidenceSources: 'Evidence Sources',
    camerasDetected: 'Cameras Detected',
    recoveredFiles: 'Recovered Files',
    evidenceIntegrity: 'Integrity',
    timelineConflicts: 'Timeline Conflicts',
    footageGaps: 'Evidence Gaps',
    workflowTitle: 'Investigation Workflow Pipeline',
    stepAcquire: '1. Acquire',
    stepVerify: '2. Verify',
    stepRecover: '3. Recover',
    stepAnalyze: '4. Analyze',
    stepReconstruct: '5. Reconstruct',
    stepReport: '6. Report',

    howItWorks: 'How it works?',
    whatIsThis: 'What is this?',
    nextStep: 'Next Step',
    evidencePrincipleTitle: 'Forensic Principle: Evidence ≠ Inference ≠ Unknown',
    evidencePrincipleTagline: 'Clearly separates verified physical evidence, analytical hypotheses, and unknown variables.',
    confirmed: 'CONFIRMED',
    inference: 'INFERENCE',
    unknown: 'UNKNOWN',

    acquisitionTitle: 'Evidence Acquisition',
    acquisitionExplanation: 'Import surveillance evidence obtained from DVR/NVR devices or exported storage. The original evidence is preserved and analysis is performed on a working copy.',
    workingCopyNotice: 'Original evidence is preserved. Analysis is performed on a working copy.',
    selectSource: 'Step 1: Select Source Type',
    selectVendor: 'Step 2: Select Vendor Hardware',
    importEvidence: 'Step 3: Ingest Evidence',
    generateHash: 'Step 4: Generate SHA-256',
    verifyStatus: 'Step 5: Verify Bitstream Integrity',
    createWorkingCopy: 'Step 6: Mount Isolated Working Copy',

    recoveryTitle: 'Evidence Recovery',
    recoveryExplanation: 'Identify potentially recoverable, fragmented or unavailable surveillance files from the imported evidence source.',
    recoverySimulationNotice: 'Prototype Recovery Simulation — Demonstrates partition carve and NAL byte framing workflow without direct drive writing.',
    runRecoveryScan: 'Run Recovery Scan',

    timelineTitle: 'Unified Surveillance Timeline',
    timelineExplanation: 'Combine events from multiple cameras into a common timeline to help investigators understand the sequence of recorded events.',
    correlatedNotice: 'Temporally correlated event — investigator verification required.',

    conflictsGapsTitle: 'Conflicts & Evidence Gaps',
    conflictsTab: 'Timestamp Conflicts',
    gapsTab: 'Evidence Gaps',
    conflictsExplanation: 'Detect inconsistencies between surveillance sources without automatically presuming which clock is true.',
    gapsExplanation: 'Identify missing or unavailable surveillance intervals with objective technical classifications.',
    gapTamperingNotice: 'Missing footage detected — reason unknown and requires investigation. Never assume deliberate tampering without corroboration.',

    reportsTitle: 'Forensic Reports',
    reportsExplanation: 'Generate a structured report containing evidence sources, integrity information, timeline observations, conflicts, gaps, notes and chain-of-custody information.',
    generateReport: 'Generate Report',
    previewReport: 'Preview Report',
    exportPdf: 'Export Demo PDF',

    chainTitle: 'Chain of Custody',
    chainExplanation: 'Track important actions performed on evidence so investigators can review how the evidence was handled.',
    exportChain: 'Export Chain of Custody',

    helpTitle: 'Help & How ANVESHAK Works',
    helpWhatIsAnveshak: 'What is ANVESHAK?',
    helpWhatDoes: 'What ANVESHAK DOES',
    helpWhatDoesNot: 'What ANVESHAK DOES NOT DO',
    responsibleAiTitle: 'Responsible AI & Governance Principle',
  },

  hi: {
    navDashboard: 'डैशबोर्ड',
    navCases: 'केस प्रबंधन',
    navEvidence: 'साक्ष्य अधिग्रहण',
    navRecovery: 'डेटा पुनर्प्राप्ति',
    navTimeline: 'टाइमलाइन पुनर्निर्माण',
    navConflicts: 'विरोधाभास एवं अंतराल',
    navChainOfCustody: 'कस्टडी श्रृंखला (CoC)',
    navReports: 'फोरेंसिक रिपोर्ट',
    navActivity: 'गतिविधि लॉग',
    navHelp: 'सहायता एवं कार्यप्रणाली',

    brandSubtitle: 'मल्टी-वेंडर DVR/NVR फोरेंसिक विश्लेषण एवं साक्ष्य पुनर्निर्माण मंच',
    brandTagline: 'संरक्षित करें. पुनर्प्राप्त करें. पुनर्निर्माण करें. प्रमाणित करें.',
    activeCase: 'सक्रिय केस',
    role: 'पद / भूमिका',
    demoMode: 'डेमो मोड',
    resetDemo: 'डेमो रीसेट',
    guidedTourBtn: 'मार्गदर्शन टूर',
    logout: 'लॉगआउट',
    login: 'लॉग इन करें',
    signUp: 'खाता बनाएं',

    welcomeTitle: 'ANVESHAK में आपका स्वागत है',
    welcomeSubtitle: 'असंगठित निगरानी डेटा से संरचित और अदालत में मान्य डिजिटल साक्ष्य तक।',
    caseOverview: 'केस का संक्षिप्त विवरण',
    status: 'स्थिति',
    evidenceSources: 'साक्ष्य स्रोत',
    camerasDetected: 'पहचाने गए कैमरे',
    recoveredFiles: 'पुनर्प्राप्त फ़ाइलें',
    evidenceIntegrity: 'अखंडता (Integrity)',
    timelineConflicts: 'टाइमलाइन विरोधाभास',
    footageGaps: 'फुटेज अंतराल (Gaps)',
    workflowTitle: 'फोरेंसिक कार्यप्रणाली पाइपलाइन',
    stepAcquire: '1. अधिग्रहण',
    stepVerify: '2. सत्यापन',
    stepRecover: '3. पुनर्प्राप्ति',
    stepAnalyze: '4. विश्लेषण',
    stepReconstruct: '5. पुनर्निर्माण',
    stepReport: '6. रिपोर्ट',

    howItWorks: 'यह कैसे काम करता है?',
    whatIsThis: 'यह क्या है?',
    nextStep: 'अगला चरण',
    evidencePrincipleTitle: 'फोरेंसिक सिद्धांत: साक्ष्य ≠ अनुमान ≠ अज्ञात',
    evidencePrincipleTagline: 'सत्यापित भौतिक साक्ष्य, विश्लेषणात्मक अनुमान और अज्ञात जानकारी को स्पष्ट रूप से अलग रखता है।',
    confirmed: 'पुष्टीकृत (CONFIRMED)',
    inference: 'अनुमान (INFERENCE)',
    unknown: 'अज्ञात (UNKNOWN)',

    acquisitionTitle: 'साक्ष्य अधिग्रहण (Evidence Acquisition)',
    acquisitionExplanation: 'DVR/NVR उपकरणों या निर्यातित ड्राइव से निगरानी साक्ष्य आयात करें। मूल साक्ष्य को अपरिवर्तित सुरक्षित रखा जाता है और विश्लेषण केवल वर्किंग कॉपी पर किया जाता है।',
    workingCopyNotice: 'मूल साक्ष्य संरक्षित है। विश्लेषण केवल वर्किंग कॉपी पर किया जाता है।',
    selectSource: 'चरण 1: स्रोत का प्रकार चुनें',
    selectVendor: 'चरण 2: हार्डवेयर वेंडर चुनें',
    importEvidence: 'चरण 3: साक्ष्य आयात करें',
    generateHash: 'चरण 4: SHA-256 हैश बनाएं',
    verifyStatus: 'चरण 5: अखंडता सत्यापित करें',
    createWorkingCopy: 'चरण 6: वर्किंग कॉपी तैयार करें',

    recoveryTitle: 'साक्ष्य पुनर्प्राप्ति (Evidence Recovery)',
    recoveryExplanation: 'आयातित साक्ष्य स्रोत से संभावित रूप से पुनर्प्राप्त करने योग्य, खंडित या अनुपलब्ध निगरानी वीडियो को पहचानें।',
    recoverySimulationNotice: 'प्रोटोटाइप रिकवरी सिमुलेशन — बिना हार्डवेयर पर प्रत्यक्ष लेखन के DVR विभाजन और NAL बाइट फ्रेमिंग का प्रदर्शन करता है।',
    runRecoveryScan: 'रिकवरी स्कैन चलाएं',

    timelineTitle: 'एकीकृत निगरानी टाइमलाइन',
    timelineExplanation: 'विभिन्न कैमरों की घटनाओं को एक सामान्य टाइमलाइन में संयोजित करें ताकि जांचकर्ता घटनाओं के सही क्रम को समझ सकें।',
    correlatedNotice: 'समय के आधार पर सहसंबद्ध घटना — जांचकर्ता द्वारा सत्यापन अनिवार्य है।',

    conflictsGapsTitle: 'विरोधाभास एवं साक्ष्य अंतराल',
    conflictsTab: 'टाइमस्टैम्प विरोधाभास',
    gapsTab: 'साक्ष्य अंतराल (Gaps)',
    conflictsExplanation: 'निगरानी स्रोतों के बीच समय और मेटाडेटा की विसंगतियों का पता लगाएं बिना यह स्वतः निर्णय लिए कि कौन सा समय सही है।',
    gapsExplanation: 'अनुपलब्ध निगरानी अंतरालों को वस्तुनिष्ठ तकनीकी श्रेणियों के साथ पहचानें।',
    gapTamperingNotice: 'अनुपलब्ध फुटेज का पता चला — कारण अज्ञात है और जांच की आवश्यकता है। बिना साक्ष्य के कभी भी जानबूझकर छेड़छाड़ न मानें।',

    reportsTitle: 'फोरेंसिक रिपोर्ट केंद्र',
    reportsExplanation: 'साक्ष्य स्रोत, अखंडता जानकारी, टाइमलाइन टिप्पणियों, विरोधाभासों, अंतरालों और कस्टडी श्रृंखला युक्त संरचित रिपोर्ट तैयार करें।',
    generateReport: 'रिपोर्ट तैयार करें',
    previewReport: 'पूर्वावलोकन देखें',
    exportPdf: 'डेमो PDF निर्यात करें',

    chainTitle: 'कस्टडी श्रृंखला (Chain of Custody)',
    chainExplanation: 'साक्ष्य पर की गई महत्वपूर्ण कार्रवाइयों को रिकॉर्ड करें ताकि अदालत और जांचकर्ता साक्ष्य की हैंडलिंग की समीक्षा कर सकें।',
    exportChain: 'कस्टडी श्रृंखला निर्यात करें',

    helpTitle: 'सहायता एवं ANVESHAK की कार्यप्रणाली',
    helpWhatIsAnveshak: 'ANVESHAK क्या है?',
    helpWhatDoes: 'ANVESHAK क्या करता है',
    helpWhatDoesNot: 'ANVESHAK क्या नहीं करता है',
    responsibleAiTitle: 'जिम्मेदार AI एवं फोरेंसिक नियंत्रण सिद्धांत',
  },
};
