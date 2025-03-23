"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { uploadToLighthouse, getIpfsUrl } from '@/lib/lighthouse';
import { Progress } from './progress';
import { toast } from 'sonner';

interface FileUploadProps {
  onUploadComplete?: (cid: string, url: string) => void;
  className?: string;
}

export function FileUpload({ onUploadComplete, className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setShowProgress(true);
      
      console.log("Starting upload for file:", file.name);
      
      // Set a manual progress update to show activity
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      // Use a faster interval for smoother progress updates
      intervalRef.current = setInterval(() => {
        setUploadProgress(prev => {
          // Increase by smaller increments for smoother progress
          const increment = Math.max(1, Math.floor(95 - prev) / 10);
          return prev < 95 ? Math.min(95, prev + increment) : prev;
        });
      }, 500);
      
      const cid = await uploadToLighthouse(file, (progressData: any) => {
        console.log("Progress update:", progressData);
        
        if (progressData && progressData.total && progressData.uploaded) {
          // Cap at 90% from real progress updates to ensure we can show completion
          const percentageDone = Math.min(90, Math.round((progressData.uploaded / progressData.total) * 100));
          console.log(`Upload progress: ${percentageDone}% (${progressData.uploaded}/${progressData.total})`);
          setUploadProgress(percentageDone);
        }
      });
      
      // Clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Explicitly show completion with a sequence of updates
      setUploadProgress(95);
      
      // Short delay then jump to 100%
      setTimeout(() => {
        setUploadProgress(100);
        
        const url = getIpfsUrl(cid);
        console.log("Upload complete, CID:", cid);
        
        toast.success('File uploaded successfully to IPFS');
        
        if (onUploadComplete) {
          onUploadComplete(cid, url);
        }
        
        // Keep showing the progress bar for a moment after completion
        setTimeout(() => {
          setIsUploading(false);
          // Keep showing progress for 2 more seconds after upload completes
          setTimeout(() => {
            setShowProgress(false);
          }, 2000);
        }, 500);
      }, 800);
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload file');
      
      // Clear any running interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      setIsUploading(false);
      setShowProgress(false);
    }
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
        
        {showProgress && (
          <div className="w-full">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {uploadProgress < 100 ? `Uploading: ${uploadProgress}%` : 'Upload complete!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}