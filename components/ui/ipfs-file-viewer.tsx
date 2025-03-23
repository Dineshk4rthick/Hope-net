"use client";

import { useState, useEffect } from 'react';
import { getIpfsUrl, getFileDetails } from '@/lib/lighthouse';
import { Card, CardContent } from './card';

interface IpfsFileViewerProps {
  cid: string;
  className?: string;
}

export function IpfsFileViewer({ cid, className }: IpfsFileViewerProps) {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cid) return;

    const loadFileDetails = async () => {
      try {
        setIsLoading(true);
        const details = await getFileDetails(cid);
        setFileType(details.mimeType || '');
        setFileUrl(getIpfsUrl(cid));
        setError(null);
      } catch (err) {
        setError('Failed to load file details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFileDetails();
  }, [cid]);

  if (isLoading) {
    return <div className={className}>Loading file from IPFS...</div>;
  }

  if (error) {
    return <div className={className}>Error: {error}</div>;
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        {fileType.startsWith('image/') ? (
          <img src={fileUrl} alt="IPFS content" className="max-w-full h-auto" />
        ) : fileType.startsWith('video/') ? (
          <video controls className="max-w-full">
            <source src={fileUrl} type={fileType} />
            Your browser does not support the video tag.
          </video>
        ) : fileType.startsWith('audio/') ? (
          <audio controls className="w-full">
            <source src={fileUrl} type={fileType} />
            Your browser does not support the audio tag.
          </audio>
        ) : (
          <div>
            <p>File type: {fileType || 'Unknown'}</p>
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View or download file
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}