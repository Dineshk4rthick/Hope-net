"use client";

import { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { IpfsFileViewer } from '@/components/ui/ipfs-file-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IpfsDemo() {
  const [uploadedCid, setUploadedCid] = useState<string>('');
  
  const handleUploadComplete = (cid: string) => {
    setUploadedCid(cid);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">IPFS Storage Demo</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload to IPFS</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload onUploadComplete={handleUploadComplete} />
          </CardContent>
        </Card>
        
        {uploadedCid && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded File</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">
                CID: {uploadedCid}
              </p>
              <IpfsFileViewer cid={uploadedCid} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}