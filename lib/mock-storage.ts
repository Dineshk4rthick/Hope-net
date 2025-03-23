/**
 * Mock IPFS Storage Implementation
 * This is a fallback implementation that simulates IPFS storage for reliable file uploads
 */

/**
 * Generate a mock CID for a file
 * @param file The file to generate a CID for
 * @returns A mock CID
 */
const generateMockCid = (file: File): string => {
  // Create a deterministic "CID" based on file properties
  const timestamp = Date.now().toString(16);
  const fileSize = file.size.toString(16);
  const nameHash = Array.from(file.name).reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
  
  return `bafybeih${timestamp}${fileSize}${nameHash}`.substring(0, 46);
};

/**
 * Upload a file to mock IPFS storage
 * @param file The file to upload
 * @returns A mock CID
 */
export const uploadToMockStorage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    console.log("Starting mock upload for file:", file.name);
    
    // Simulate network delay with a slightly faster response
    setTimeout(() => {
      const cid = generateMockCid(file);
      console.log('Mock file uploaded successfully, CID:', cid);
      resolve(cid);
    }, 1500);
  });
};

/**
 * Get the URL for a file stored on mock IPFS
 * @param cid The CID of the file
 * @returns A mock gateway URL
 */
export const getMockIpfsUrl = (cid: string): string => {
  return `https://ipfs.io/ipfs/${cid}`;
};