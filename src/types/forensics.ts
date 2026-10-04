export type UserRole = 'Investigator' | 'Forensic Analyst' | 'Reviewer' | 'Administrator';

export type EvidenceClassification = 
  | 'CONFIRMED' 
  | 'SUPPORTED' 
  | 'CONFLICTED' 
  | 'MISSING' 
  | 'UNKNOWN' 
  | 'INFERENCE';

export type IntegrityStatus = 'VERIFIED' | 'WARNING' | 'FAILED' | 'PENDING';

export type VendorType = 'Hikvision' | 'Dahua' | 'CP Plus' | 'Axis' | 'Generic DVR/NVR' | 'Other';

export type SourceType = 
  | 'DVR Export' 
  | 'NVR Export' 
  | 'HDD Image' 
  | 'Video File' 
  | 'USB Evidence' 
  | 'Network Camera Export';

export interface EvidenceSource {
  id: string;
  sourceType: SourceType;
  vendor: VendorType;
  deviceOrFileName: string;
  acquisitionTime: string;
  fileSize: string;
  format: string;
  originalSha256: string;
  workingCopySha256: string;
  integrityStatus: IntegrityStatus;
  lastVerifiedAt: string;
  channelCount: number;
  filesystem: string;
  notes?: string;
  metadataStatus: 'Available' | 'Partial' | 'Corrupted';
}

export interface Camera {
  id: string;
  code: string; // e.g. CAM-01
  name: string; // e.g. North Gate Entry
  location: string;
  evidenceSourceId: string;
  resolution: string;
  frameRate: number;
  reportedClockOffsetSec: number; // e.g. +137s
  status: 'Active' | 'Gaps Detected' | 'Clock Drift';
}

export interface TimelineEvent {
  id: string;
  cameraId: string;
  cameraCode: string;
  timestamp: string; // e.g. '18:02:11'
  displayTime: string;
  date: string;
  eventType: 'Motion' | 'Object' | 'Door State' | 'System' | 'Gap' | 'Vehicle';
  eventDescription: string;
  classification: EvidenceClassification;
  neutralObjectTerm?: string; // e.g. "person-like movement", "possible vehicle detected"
  confidenceLevel: 'High' | 'Medium' | 'Low' | 'Requires Verification';
  verifiedByInvestigator: boolean;
  notes?: string;
}

export interface ConflictItem {
  id: string;
  conflictType: 'Timestamp Mismatch' | 'Frame Rate Discrepancy' | 'Timezone/DST Offset' | 'Channel Sequence Anomaly' | string;
  severity: 'High' | 'Medium' | 'Low';
  affectedSources: string[]; // e.g. ['CAM 01', 'CAM 02']
  detectedAt: string;
  description: string;
  suggestedAction: string;
  status: 'Requires Review' | 'Investigator Verified' | 'Flagged Disputed';
  investigatorNotes?: string;
}

export interface EvidenceGap {
  id: string;
  cameraCode: string;
  startTime: string; // '17:35:00'
  endTime: string;   // '17:52:00'
  durationMinutes: number; // 17
  date: string;
  possibleReasonCategory: 
    | 'No recording detected' 
    | 'Export incomplete' 
    | 'Storage unavailable' 
    | 'Device offline' 
    | 'Format unreadable' 
    | 'Requires investigation'
    | string;
  status: 'Flagged for Review' | 'Assessed' | 'Hardware Fault Logged';
  technicalNotes: string;
  technicalNote?: string;
  crossCheckVerification?: string;
  investigatorVerified?: boolean;
  recordedInLog?: string;
}

export interface RecoveryFragment {
  id: string;
  sourceId: string;
  partitionId: string;
  fragmentName: string;
  fileName?: string;
  estimatedStartTime: string;
  estimatedEndTime: string;
  estimatedTimestamp?: string;
  sizeBytes: string;
  size?: string;
  sectorRange?: string;
  status: 'Recovered' | 'Unrecoverable' | 'Partial Carve' | 'Partial' | 'Corrupted' | string;
  codec: string;
  confidence: string;
}

export interface StoragePartition {
  id: string;
  name: string;
  filesystem: string;
  size: string;
  status: 'Healthy' | 'Fragmented' | 'Raw Unallocated' | string;
  recoverableCount: number;
}

export interface ChainOfCustodyEntry {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  evidenceId: string;
  sha256Hash: string;
  status: 'Recorded' | 'Verified' | 'Sealed' | string;
  details: string;
}

export interface InvestigatorNote {
  id: string;
  evidenceId: string;
  investigator: string;
  author?: string;
  timestamp: string;
  category: 'Observation' | 'Integrity Check' | 'Hypothesis' | 'Discrepancy' | 'Formal Notation';
  note: string;
  classificationTag: EvidenceClassification;
}

export interface CaseRecord {
  id: string; // e.g. ANV-2026-0042
  name: string;
  investigator: string;
  organization: string;
  dateCreated: string;
  description: string;
  status: 'Acquisition' | 'Analysis in Progress' | 'Evidence Review' | 'Report Generated' | 'Archived' | string;
  evidenceSourceCount: number;
  cameraCount: number;
  recoveredFileCount: number;
  integrityVerified: boolean;
  conflictCount: number;
  gapCount: number;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  caseId: string;
  evidenceId: string;
  result: 'Success' | 'Verified' | 'Complete' | 'Flagged' | string;
  hashVerified?: string;
}

export interface UserProfile {
  name: string;
  id: string;
  email: string;
  organization: string;
  role: UserRole;
  badgeNumber?: string;
}
