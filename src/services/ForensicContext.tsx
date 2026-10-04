import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CaseRecord,
  EvidenceSource,
  Camera,
  TimelineEvent,
  ConflictItem,
  EvidenceGap,
  StoragePartition,
  RecoveryFragment,
  ChainOfCustodyEntry,
  InvestigatorNote,
  ActivityLogEntry,
  UserProfile,
  UserRole,
  SourceType,
  VendorType,
} from '../types/forensics';
import {
  INITIAL_USER,
  INITIAL_CASES,
  INITIAL_EVIDENCE_SOURCES,
  INITIAL_CAMERAS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_CONFLICTS,
  INITIAL_GAPS,
  INITIAL_STORAGE_PARTITIONS,
  INITIAL_RECOVERY_FRAGMENTS,
  INITIAL_CHAIN_OF_CUSTODY,
  INITIAL_INVESTIGATOR_NOTES,
  INITIAL_ACTIVITY_LOG,
} from '../data/mockForensicData';
import { Language, translations, AppTranslations } from '../translations';

interface ExplainerContent {
  title: string;
  subtitle?: string;
  whatItIs: string;
  whatInvestigatorDoes: string;
  whatHappensNext: string;
  nextStepTab?: string;
  nextStepLabel?: string;
}

interface ForensicContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: AppTranslations;

  // Guided Tour
  isTourOpen: boolean;
  setIsTourOpen: (open: boolean) => void;
  tourStep: number;
  setTourStep: (step: number) => void;

  // Explainer Modal
  activeExplainer: ExplainerContent | null;
  openExplainer: (content: ExplainerContent) => void;
  closeExplainer: () => void;

  // Auth & Session
  isAuthenticated: boolean;
  login: (investigatorId?: string) => void;
  logout: () => void;
  signUp: (user: Partial<UserProfile>) => boolean;
  signUpSuccessMessage: string | null;
  clearSignUpMessage: () => void;
  currentUser: UserProfile;
  setUserRole: (role: UserRole) => void;
  isDemoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  resetToDemoCase: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Cases
  cases: CaseRecord[];
  currentCase: CaseRecord;
  setCurrentCaseById: (caseId: string) => void;
  createCase: (newCase: Partial<CaseRecord>) => void;

  // Evidence Sources & Acquisition
  evidenceSources: EvidenceSource[];
  importEvidenceSource: (source: {
    sourceType: SourceType;
    vendor: VendorType;
    deviceOrFileName: string;
    fileSize: string;
    format: string;
    channelCount: number;
    notes?: string;
  }) => EvidenceSource;
  verifyEvidenceIntegrity: (evidenceId: string) => Promise<{ success: boolean; hash: string; status: 'VERIFIED' | 'WARNING' }>;
  verifyAllEvidence: () => Promise<void>;

  // Cameras
  cameras: Camera[];

  // Timeline
  timelineEvents: TimelineEvent[];
  selectedTimelineTime: string;
  setSelectedTimelineTime: (time: string) => void;
  applyClockCorrection: boolean;
  setApplyClockCorrection: (apply: boolean) => void;

  // Conflicts & Gaps
  conflicts: ConflictItem[];
  resolveConflict: (conflictId: string, notes: string) => void;
  gaps: EvidenceGap[];

  // Recovery
  partitions: StoragePartition[];
  recoveryFragments: RecoveryFragment[];
  isScanningRecovery: boolean;
  recoveryScanProgress: number;
  runRecoveryScan: () => Promise<void>;

  // Chain of Custody & Notes
  chainOfCustody: ChainOfCustodyEntry[];
  addChainOfCustodyEntry: (action: string, evidenceId: string, details: string) => void;
  investigatorNotes: InvestigatorNote[];
  addInvestigatorNote: (note: Omit<InvestigatorNote, 'id' | 'timestamp' | 'investigator'>) => void;

  // Activity Log
  activityLog: ActivityLogEntry[];
}

const ForensicContext = createContext<ForensicContextType | null>(null);

function generateSimulatedHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export const ForensicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read saved language from localStorage if available
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('anveshak_lang');
      return saved === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('anveshak_lang', lang);
    } catch {
      // storage blocked fallback
    }
  };

  const t = translations[language];

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // start in demo session for seamless inspection
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState<string | null>(null);

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);
  const [activeExplainer, setActiveExplainer] = useState<ExplainerContent | null>(null);

  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [cases, setCases] = useState<CaseRecord[]>(INITIAL_CASES);
  const [currentCaseId, setCurrentCaseId] = useState<string>('ANV-2026-0042');

  const [evidenceSources, setEvidenceSources] = useState<EvidenceSource[]>(INITIAL_EVIDENCE_SOURCES);
  const [cameras] = useState<Camera[]>(INITIAL_CAMERAS);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [selectedTimelineTime, setSelectedTimelineTime] = useState<string>('18:02:15');
  const [applyClockCorrection, setApplyClockCorrection] = useState<boolean>(true);

  const [conflicts, setConflicts] = useState<ConflictItem[]>(INITIAL_CONFLICTS);
  const [gaps] = useState<EvidenceGap[]>(INITIAL_GAPS);

  const [partitions] = useState<StoragePartition[]>(INITIAL_STORAGE_PARTITIONS);
  const [recoveryFragments, setRecoveryFragments] = useState<RecoveryFragment[]>(INITIAL_RECOVERY_FRAGMENTS);
  const [isScanningRecovery, setIsScanningRecovery] = useState<boolean>(false);
  const [recoveryScanProgress, setRecoveryScanProgress] = useState<number>(100);

  const [chainOfCustody, setChainOfCustody] = useState<ChainOfCustodyEntry[]>(INITIAL_CHAIN_OF_CUSTODY);
  const [investigatorNotes, setInvestigatorNotes] = useState<InvestigatorNote[]>(INITIAL_INVESTIGATOR_NOTES);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(INITIAL_ACTIVITY_LOG);

  const currentCase = cases.find((c) => c.id === currentCaseId) || cases[0];

  const login = (investigatorId?: string) => {
    setIsAuthenticated(true);
    if (investigatorId) {
      setCurrentUser((prev: UserProfile) => ({ ...prev, id: investigatorId }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const signUp = (newUser: Partial<UserProfile>): boolean => {
    if (newUser.name) {
      setCurrentUser({
        name: newUser.name || 'Investigator',
        id: newUser.id || `INV-IND-${Math.floor(1000 + Math.random() * 9000)}`,
        email: newUser.email || 'investigator@anveshak.gov.in',
        organization: newUser.organization || (language === 'hi' ? 'राज्य साइबर फोरेंसिक प्रभाग' : 'State Cyber Forensic Division'),
        role: newUser.role || 'Investigator',
        badgeNumber: `CFD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      });
      setSignUpSuccessMessage(t.signUpSuccess);
      return true;
    }
    return false;
  };

  const clearSignUpMessage = () => setSignUpSuccessMessage(null);

  const openExplainer = (content: ExplainerContent) => setActiveExplainer(content);
  const closeExplainer = () => setActiveExplainer(null);

  const setUserRole = (role: UserRole) => {
    setCurrentUser((prev: UserProfile) => ({ ...prev, role }));
    logActivity('Role Permissions Switched', currentCaseId, 'System', 'Success');
  };

  const setCurrentCaseById = (id: string) => {
    setCurrentCaseId(id);
    logActivity(`Loaded Case Workspace ${id}`, id, 'All', 'Success');
  };

  const logActivity = (action: string, caseId: string, evidenceId: string, result: 'Success' | 'Verified' | 'Flagged' | 'Complete' | 'Warning') => {
    const newEntry: ActivityLogEntry = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUser.name,
      action,
      caseId,
      evidenceId,
      result,
    };
    setActivityLog((prev) => [newEntry, ...prev]);
  };

  const resetToDemoCase = () => {
    setCases(INITIAL_CASES);
    setCurrentCaseId('ANV-2026-0042');
    setEvidenceSources(INITIAL_EVIDENCE_SOURCES);
    setTimelineEvents(INITIAL_TIMELINE_EVENTS);
    setConflicts(INITIAL_CONFLICTS);
    setRecoveryFragments(INITIAL_RECOVERY_FRAGMENTS);
    setChainOfCustody(INITIAL_CHAIN_OF_CUSTODY);
    setInvestigatorNotes(INITIAL_INVESTIGATOR_NOTES);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setIsDemoMode(true);
    setSelectedTimelineTime('18:02:15');
    setApplyClockCorrection(true);
    logActivity('Reset Workspace to Demo Case ANV-2026-0042', 'ANV-2026-0042', 'All', 'Complete');
  };

  const createCase = (newCaseData: Partial<CaseRecord>) => {
    const newId = `ANV-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newRecord: CaseRecord = {
      id: newId,
      name: newCaseData.name || (language === 'hi' ? 'शीर्षकहीन फोरेंसिक मामला' : 'Untitled Forensic Inquiry'),
      investigator: currentUser.name,
      organization: currentUser.organization,
      dateCreated: new Date().toISOString().split('T')[0],
      description: newCaseData.description || (language === 'hi' ? 'मानकीकृत डिजिटल निगरानी फोरेंसिक अधिग्रहण परियोजना।' : 'Standard digital surveillance forensic acquisition project.'),
      status: 'Acquisition',
      evidenceSourceCount: 1,
      cameraCount: 2,
      recoveredFileCount: 0,
      integrityVerified: true,
      conflictCount: 0,
      gapCount: 0,
    };

    setCases((prev) => [newRecord, ...prev]);
    setCurrentCaseId(newId);
    logActivity(`Created Forensic Case ${newId}`, newId, 'None', 'Success');
  };

  const importEvidenceSource = (source: {
    sourceType: SourceType;
    vendor: VendorType;
    deviceOrFileName: string;
    fileSize: string;
    format: string;
    channelCount: number;
    notes?: string;
  }): EvidenceSource => {
    const generatedHash = generateSimulatedHash();
    const newId = `EV-${String(evidenceSources.length + 1).padStart(3, '0')}`;
    const newSource: EvidenceSource = {
      id: newId,
      sourceType: source.sourceType,
      vendor: source.vendor,
      deviceOrFileName: source.deviceOrFileName,
      acquisitionTime: `${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST`,
      fileSize: source.fileSize,
      format: source.format,
      originalSha256: generatedHash,
      workingCopySha256: generatedHash,
      integrityStatus: 'VERIFIED',
      lastVerifiedAt: `${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST`,
      channelCount: source.channelCount,
      filesystem: `${source.vendor} Intermediate Container`,
      metadataStatus: 'Available',
      notes: source.notes || 'Imported into read-only working copy workspace with cryptographic write-blocking.',
    };

    setEvidenceSources((prev) => [newSource, ...prev]);

    setCases((prev) =>
      prev.map((c) =>
        c.id === currentCaseId ? { ...c, evidenceSourceCount: c.evidenceSourceCount + 1 } : c
      )
    );

    addChainOfCustodyEntry(
      language === 'hi' ? 'साक्ष्य आयात किया गया' : 'Evidence Imported',
      newId,
      `Acquired from ${source.vendor} (${source.sourceType}) into read-only working copy.`
    );

    logActivity(`Imported Evidence Source ${newId}`, currentCaseId, newId, 'Success');

    return newSource;
  };

  const verifyEvidenceIntegrity = async (evidenceId: string): Promise<{ success: boolean; hash: string; status: 'VERIFIED' | 'WARNING' }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const source = evidenceSources.find((s) => s.id === evidenceId);
        const hash = source?.originalSha256 || generateSimulatedHash();

        setEvidenceSources((prev) =>
          prev.map((s) =>
            s.id === evidenceId
              ? {
                  ...s,
                  integrityStatus: 'VERIFIED',
                  lastVerifiedAt: `${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST`,
                }
              : s
          )
        );

        addChainOfCustodyEntry(
          language === 'hi' ? 'अखंडता सत्यापित की गई' : 'Integrity Verified',
          evidenceId,
          `SHA-256 verified against acquisition hash. Working copy unaltered.`
        );

        logActivity(`Verified Cryptographic Hash for ${evidenceId}`, currentCaseId, evidenceId, 'Verified');

        resolve({ success: true, hash, status: 'VERIFIED' });
      }, 700);
    });
  };

  const verifyAllEvidence = async () => {
    for (const source of evidenceSources) {
      await verifyEvidenceIntegrity(source.id);
    }
  };

  const resolveConflict = (conflictId: string, notes: string) => {
    setConflicts((prev) =>
      prev.map((item) =>
        item.id === conflictId
          ? {
              ...item,
              status: 'Investigator Verified',
              investigatorNotes: notes,
            }
          : item
      )
    );
    logActivity(`Investigator Reviewed Conflict ${conflictId}`, currentCaseId, conflictId, 'Complete');
  };

  const runRecoveryScan = async () => {
    setIsScanningRecovery(true);
    setRecoveryScanProgress(15);

    const steps = [35, 60, 85, 95, 100];
    for (const p of steps) {
      await new Promise((r) => setTimeout(r, 400));
      setRecoveryScanProgress(p);
    }

    setIsScanningRecovery(false);

    const extraFrag: RecoveryFragment = {
      id: `FRAG-00${recoveryFragments.length + 1}`,
      sourceId: 'EV-003',
      partitionId: 'part-04',
      fragmentName: `carved_nal_stream_blk_${Math.floor(1000 + Math.random() * 9000)}.h264`,
      estimatedStartTime: '2026-09-27 17:48:10',
      estimatedEndTime: '2026-09-27 17:51:55',
      sizeBytes: '184 MB',
      status: 'Recovered',
      codec: 'H.264 / AVC (SPS parsed)',
      confidence: '92% (Keyframes re-indexed)',
    };

    setRecoveryFragments((prev) => [extraFrag, ...prev]);

    addChainOfCustodyEntry(
      language === 'hi' ? 'पुनर्प्राप्ति स्कैन पूरा हुआ' : 'Recovery Scan Completed',
      'EV-003',
      'Carved 1 additional fragmented NAL video stream from unallocated DVR slack.'
    );

    logActivity('Executed Deep Partition Recovery Scan', currentCaseId, 'EV-003', 'Complete');
  };

  const addChainOfCustodyEntry = (action: string, evidenceId: string, details: string) => {
    const entry: ChainOfCustodyEntry = {
      id: `COC-${String(chainOfCustody.length + 1).padStart(3, '0')}`,
      action,
      user: currentUser.name,
      role: currentUser.role,
      timestamp: `${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST`,
      evidenceId,
      sha256Hash: generateSimulatedHash(),
      status: 'Recorded',
      details,
    };
    setChainOfCustody((prev) => [entry, ...prev]);
  };

  const addInvestigatorNote = (newNoteData: Omit<InvestigatorNote, 'id' | 'timestamp' | 'investigator'>) => {
    const note: InvestigatorNote = {
      id: `NOTE-${String(investigatorNotes.length + 1).padStart(3, '0')}`,
      evidenceId: newNoteData.evidenceId,
      investigator: currentUser.name,
      timestamp: `${new Date().toISOString().replace('T', ' ').substring(0, 16)} IST`,
      category: newNoteData.category,
      note: newNoteData.note,
      classificationTag: newNoteData.classificationTag,
    };
    setInvestigatorNotes((prev) => [note, ...prev]);
    logActivity(`Added Investigator Note on ${newNoteData.evidenceId}`, currentCaseId, newNoteData.evidenceId, 'Success');
  };

  return (
    <ForensicContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isTourOpen,
        setIsTourOpen,
        tourStep,
        setTourStep,
        activeExplainer,
        openExplainer,
        closeExplainer,
        isAuthenticated,
        login,
        logout,
        signUp,
        signUpSuccessMessage,
        clearSignUpMessage,
        currentUser,
        setUserRole,
        isDemoMode,
        setDemoMode: setIsDemoMode,
        resetToDemoCase,
        activeTab,
        setActiveTab,
        cases,
        currentCase,
        setCurrentCaseById,
        createCase,
        evidenceSources,
        importEvidenceSource,
        verifyEvidenceIntegrity,
        verifyAllEvidence,
        cameras,
        timelineEvents,
        selectedTimelineTime,
        setSelectedTimelineTime,
        applyClockCorrection,
        setApplyClockCorrection,
        conflicts,
        resolveConflict,
        gaps,
        partitions,
        recoveryFragments,
        isScanningRecovery,
        recoveryScanProgress,
        runRecoveryScan,
        chainOfCustody,
        addChainOfCustodyEntry,
        investigatorNotes,
        addInvestigatorNote,
        activityLog,
      }}
    >
      {children}
    </ForensicContext.Provider>
  );
};

export const useForensicStore = () => {
  const context = useContext(ForensicContext);
  if (!context) {
    throw new Error('useForensicStore must be used within a ForensicProvider');
  }
  return context;
};
