"use client";

import { useState, useEffect } from 'react';
import { getFiles, deleteFile, StoredFile } from '@/lib/storage-service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function FileBrowser() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadFiles();
  }, []);
  
  const loadFiles = () => {
    setIsLoading(true);
    try {
      const storedFiles = getFiles();
      setFiles(storedFiles);
    } catch (error) {
      console.error('Failed to load files:', error);
      toast.error('Failed to load files');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = (cid: string) => {
    try {
      const deleted = deleteFile(cid);
      if (deleted) {
        setFiles(files.filter(file => file.cid !== cid));
        toast.success('File removed from registry');
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast.error('Failed to remove file');
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Files</h2>
        <Button variant="outline" onClick={loadFiles} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {isLoading ? 'Loading files...' : 'No files uploaded yet'}
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map(file => (
            <div key={file.cid} className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)} • Uploaded {formatDate(file.dateUploaded)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 break-all">
                    CID: {file.cid}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    View
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(file.cid)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-4">
        <p>
          <span className="font-medium">Note:</span> Files stored on IPFS are permanent and public. 
          Removing a file from this list only removes it from your local registry, not from IPFS.
        </p>
      </div>
    </div>
  );
}