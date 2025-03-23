// Update your existing pinata.ts file to include metadata support

/**
 * Upload a file to Pinata
 */
export const uploadToPinata = async (file: File, metadata?: Record<string, any>): Promise<string> => {
  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  
  // Add metadata if provided
  if (metadata) {
    const metadataJSON = JSON.stringify({
      name: file.name,
      keyvalues: metadata
    });
    formData.append('pinataMetadata', metadataJSON);
  }
  
  // Add pinata options
  const pinataOptions = JSON.stringify({
    cidVersion: 1,
    wrapWithDirectory: false
  });
  formData.append('pinataOptions', pinataOptions);
  
  // Get API key and secret from environment variables
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error('Pinata API credentials not configured');
  }
  
  // Make request to Pinata API
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'pinata_api_key': apiKey,
      'pinata_secret_api_key': apiSecret,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Failed to upload to Pinata: ${error.error || response.statusText}`);
  }
  
  const data = await response.json();
  return data.IpfsHash;
};

/**
 * Get IPFS URL from CID
 */
export const getIpfsUrl = (cid: string): string => {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};

/**
 * Get list of files pinned to Pinata
 */
export const getPinnedFiles = async (): Promise<any[]> => {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error('Pinata API credentials not configured');
  }
  
  const response = await fetch('https://api.pinata.cloud/data/pinList?status=pinned', {
    method: 'GET',
    headers: {
      'pinata_api_key': apiKey,
      'pinata_secret_api_key': apiSecret,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get pinned files: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.rows || [];
};