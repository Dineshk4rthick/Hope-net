import lighthouse from '@lighthouse-web3/sdk';

// Your Lighthouse API key
const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || '';

/**
 * Upload a file to Lighthouse/IPFS
 * @param file The file to upload
 * @param onProgress Optional callback for upload progress
 * @returns The CID of the uploaded file
 */
export const uploadToLighthouse = async (
  file: File,
  onProgress?: (progressData: any) => void
): Promise<string> => {
  try {
    // For debugging
    console.log("Starting upload with API key:", apiKey.substring(0, 5) + "...");
    
    // Create a FormData object as required by the Lighthouse SDK
    const formData = new FormData();
    formData.append('file', file);
    
    // Modify the progress callback to properly handle the progress data
    const progressCallback = (progressData: any) => {
      console.log("Progress data received:", progressData);
      if (onProgress && progressData && typeof progressData.total === 'number' && typeof progressData.uploaded === 'number') {
        onProgress(progressData);
      }
    };
    
    const output = await lighthouse.upload(
      formData,
      apiKey,
      progressCallback
    );
    
    console.log('File uploaded successfully:', output);
    return output.data.Hash;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Get the URL for a file stored on IPFS
 * @param cid The CID of the file
 * @returns The gateway URL to access the file
 */
export const getIpfsUrl = (cid: string): string => {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
};

/**
 * Retrieve file details from Lighthouse
 * @param cid The CID of the file
 * @returns File details
 */
export const getFileDetails = async (cid: string) => {
  try {
    const fileInfo = await lighthouse.getFileInfo(cid, apiKey);
    return fileInfo;
  } catch (error) {
    console.error('Error getting file details:', error);
    throw error;
  }
};