import { uploadToPinata, getIpfsUrl } from './pinata';

export interface StoredFile {
  cid: string;
  name: string;
  type: string;
  size: number;
  url: string;
  dateUploaded: string;
  metadata?: Record<string, any>;
}

// Add this at the top of the file to ensure we have the right interface
export interface MissingPersonReport {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastSeen: string;
  description: string;
  contactInfo: string;
  photoCid?: string;
  photoUrl?: string;
  dateReported: string;
  status: 'active' | 'found' | 'closed';
}

// In-memory storage for demo purposes
// In a real app, you'd use a database or localStorage
let fileRegistry: StoredFile[] = [];

// Make sure we have an array to store the reports
let missingPersonReports: MissingPersonReport[] = [];

/**
 * Upload a file to IPFS via Pinata
 */
export const uploadFile = async (file: File, metadata?: Record<string, any>): Promise<StoredFile> => {
  const cid = await uploadToPinata(file, metadata);
  const url = getIpfsUrl(cid);
  
  const storedFile: StoredFile = {
    cid,
    name: file.name,
    type: file.type,
    size: file.size,
    url,
    dateUploaded: new Date().toISOString(),
    metadata
  };
  
  // Add to registry
  fileRegistry.push(storedFile);
  
  // Save to localStorage for persistence
  saveRegistry();
  
  return storedFile;
};

/**
 * Get all stored files
 */
export const getFiles = (): StoredFile[] => {
  // Load from localStorage if registry is empty
  if (fileRegistry.length === 0) {
    loadRegistry();
  }
  return fileRegistry;
};

/**
 * Get a file by CID
 */
export const getFileByCid = (cid: string): StoredFile | undefined => {
  // Load from localStorage if registry is empty
  if (fileRegistry.length === 0) {
    loadRegistry();
  }
  return fileRegistry.find(file => file.cid === cid);
};

/**
 * Delete a file from the registry
 * Note: This doesn't delete from IPFS, just from our registry
 */
export const deleteFile = (cid: string): boolean => {
  const initialLength = fileRegistry.length;
  fileRegistry = fileRegistry.filter(file => file.cid !== cid);
  
  // Save to localStorage
  saveRegistry();
  
  return fileRegistry.length < initialLength;
};

/**
 * Save registry to localStorage
 */
const saveRegistry = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ipfs-file-registry', JSON.stringify(fileRegistry));
  }
};

/**
 * Load registry from localStorage
 */
const loadRegistry = (): void => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ipfs-file-registry');
    if (saved) {
      try {
        fileRegistry = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse file registry from localStorage', e);
      }
    }
  }
};

/**
 * Create a missing person report with optional photo
 */
export const createMissingPersonReport = async (
  reportData: Omit<MissingPersonReport, 'id' | 'photoCid' | 'photoUrl' | 'dateReported' | 'status'>, 
  photo?: File
): Promise<MissingPersonReport> => {
  // Upload photo if provided
  let photoCid: string | undefined;
  let photoUrl: string | undefined;
  
  if (photo) {
    const metadata = {
      reportType: 'missingPerson',
      personName: reportData.name,
      dateUploaded: new Date().toISOString()
    };
    
    const uploadedFile = await uploadFile(photo, metadata);
    photoCid = uploadedFile.cid;
    photoUrl = uploadedFile.url;
  }
  
  // Create report with unique ID
  const report: MissingPersonReport = {
    id: generateId(),
    ...reportData,
    photoCid,
    photoUrl,
    dateReported: new Date().toISOString(),
    status: 'active'
  };
  
  // Add to registry
  missingPersonReports.push(report);
  
  // Save to localStorage
  saveMissingPersonReports();
  
  return report;
};

/**
 * Get all missing person reports
 */
export const getMissingPersonReports = (): MissingPersonReport[] => {
  // Load from localStorage if registry is empty
  if (missingPersonReports.length === 0) {
    loadMissingPersonReports();
  }
  return missingPersonReports;
};

/**
 * Get a missing person report by ID
 */
export const getMissingPersonReportById = (id: string): MissingPersonReport | undefined => {
  // Load from localStorage if registry is empty
  if (missingPersonReports.length === 0) {
    loadMissingPersonReports();
  }
  return missingPersonReports.find(report => report.id === id);
};

/**
 * Update a missing person report
 */
export const updateMissingPersonReport = (
  id: string, 
  updates: Partial<Omit<MissingPersonReport, 'id' | 'dateReported'>>
): MissingPersonReport | undefined => {
  const index = missingPersonReports.findIndex(report => report.id === id);
  
  if (index === -1) return undefined;
  
  missingPersonReports[index] = {
    ...missingPersonReports[index],
    ...updates
  };
  
  // Save to localStorage
  saveMissingPersonReports();
  
  return missingPersonReports[index];
};

/**
 * Save missing person reports to localStorage
 */
const saveMissingPersonReports = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('missing-person-reports', JSON.stringify(missingPersonReports));
  }
};

/**
 * Load missing person reports from localStorage
 */
const loadMissingPersonReports = (): void => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('missing-person-reports');
    if (saved) {
      try {
        missingPersonReports = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse missing person reports from localStorage', e);
      }
    }
  }
};

// Remove the duplicate function and keep only one implementation
/**
 * Create a missing person report
 */
export const createMissingPersonReport = async (
  reportData: Omit<MissingPersonReport, 'id' | 'dateReported' | 'status'>
): Promise<MissingPersonReport> => {
  console.log("Creating missing person report with data:", reportData);
  
  // Create report with unique ID
  const report: MissingPersonReport = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    ...reportData,
    dateReported: new Date().toISOString(),
    status: 'active'
  };
  
  console.log("Created report object:", report);
  
  // Add to registry
  missingPersonReports.push(report);
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('missing-person-reports', JSON.stringify(missingPersonReports));
      console.log("Saved reports to localStorage");
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }
  
  return report;
};

/**
 * Generate a unique ID
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};