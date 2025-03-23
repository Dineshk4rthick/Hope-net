/**
 * Helper functions for handling file details
 */

/**
 * Get file details from IPFS CID
 */
export const getFileDetails = async (cid: string, fileName?: string) => {
  try {
    // Try to fetch file details from gateway
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`, {
      method: 'HEAD',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file details: ${response.status}`);
    }
    
    // Get content type from headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length') || '0';
    
    return {
      cid,
      name: fileName || `File-${cid.substring(0, 8)}`,
      contentType,
      size: parseInt(contentLength, 10),
      url: `https://gateway.pinata.cloud/ipfs/${cid}`,
      dateUploaded: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('Could not fetch file details:', error);
    
    // Return error to be handled by the caller
    throw new Error('Failed to load file details');
  }
};

/**
 * Determine file type from CID or filename
 */
export const getFileType = (fileName: string, contentType: string = 'application/octet-stream') => {
  // Extract extension from filename
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  // Image types
  if (/^image\//.test(contentType) || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    return 'image';
  }
  
  // Video types
  if (/^video\//.test(contentType) || ['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
    return 'video';
  }
  
  // Audio types
  if (/^audio\//.test(contentType) || ['mp3', 'wav', 'ogg', 'flac'].includes(extension)) {
    return 'audio';
  }
  
  // Document types
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'md'].includes(extension)) {
    return 'document';
  }
  
  // Default
  return 'file';
};