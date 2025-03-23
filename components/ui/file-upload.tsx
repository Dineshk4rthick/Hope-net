"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { uploadToPinata, getIpfsUrl } from '@/lib/pinata';
import { Progress } from './progress';
import { toast } from 'sonner';

interface FileUploadProps {
  onUploadComplete?: (cid: string, url: string) => void;
  className?: string;
}

export function FileUpload({ onUploadComplete, className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCid, setUploadedCid] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Reset state
      setIsUploading(true);
      setUploadProgress(0);
      setErrorMessage(null);
      setUploadedCid(null);
      setUploadedUrl(null);
      
      console.log("Starting upload for file:", file.name, "size:", file.size);
      
      // Set a manual progress update to show activity
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        setUploadProgress(prev => {
          return prev < 90 ? prev + 5 : prev;
        });
      }, 1000);
      
      // Add metadata to the file
      const metadata = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString(),
      };
      
      // Upload to Pinata with metadata
      const cid = await uploadToPinata(file, metadata);
      
      // Clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Force progress to 100% when complete
      setUploadProgress(100);
      
      // Generate multiple gateway URLs for better availability
      const url = getIpfsUrl(cid);
      const backupUrl = `https://ipfs.io/ipfs/${cid}`;
      const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${cid}`;
      
      setUploadedCid(cid);
      setUploadedUrl(url);
      
      console.log("Upload complete, CID:", cid, "URL:", url);
      
      toast.success('File uploaded successfully to IPFS');
      
      if (onUploadComplete) {
        // Pass the CID and URL to the parent component
        onUploadComplete(cid, url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(message);
      toast.error(`Failed to upload file: ${message}`);
    } finally {
      // Clear any running interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Small delay to ensure UI updates
      setTimeout(() => {
        setIsUploading(false);
      }, 500);
    }
  };
  
  // Function to copy CID to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy to clipboard');
      });
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Select File'}
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        
        {(isUploading || uploadProgress === 100) && (
          <div className="w-full">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {uploadProgress < 100 ? `Uploading: ${uploadProgress}%` : 'Upload complete!'}
            </p>
          </div>
        )}
        
        {uploadedCid && (
          <div className="mt-2 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium">File uploaded successfully</p>
            <div className="flex items-center mt-1">
              <p className="text-xs text-muted-foreground break-all flex-1">
                CID: {uploadedCid}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2"
                onClick={() => copyToClipboard(uploadedCid)}
              >
                Copy
              </Button>
            </div>
            {uploadedUrl && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium">Try these IPFS gateways:</p>
                <p className="text-xs text-muted-foreground">
                  <a 
                    href={uploadedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Pinata Gateway
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">
                  <a 
                    href={`https://ipfs.io/ipfs/${uploadedCid}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    IPFS.io Gateway
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">
                  <a 
                    href={`https://cloudflare-ipfs.com/ipfs/${uploadedCid}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Cloudflare Gateway
                  </a>
                </p>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-yellow-500">Note:</span> It may take a few minutes for the file to be available on IPFS gateways.
            </p>
          </div>
        )}
        
        {errorMessage && (
          <p className="text-sm text-red-500 mt-1">
            Error: {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}