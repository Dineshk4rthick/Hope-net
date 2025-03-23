"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMissingPersonReportById } from '@/lib/storage-service';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('id');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (reportId) {
      const report = getMissingPersonReportById(reportId);
      setReportData(report);
    }
    setLoading(false);
  }, [reportId]);
  
  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }
  
  if (!reportData) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Report Not Found</h1>
        <p>The report you're looking for could not be found.</p>
        <Link href="/report/missing-person" className="text-primary hover:underline mt-4 inline-block">
          Submit a new report
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Report Submitted Successfully</h1>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
        <p className="text-green-800">
          Your missing person report has been submitted successfully. Please keep the reference ID for your records.
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Report Details</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Reference ID</p>
            <p>{reportData.id}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p>{reportData.name}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date Reported</p>
            <p>{new Date(reportData.dateReported).toLocaleString()}</p>
          </div>
          
          {reportData.photoUrl && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Photo</p>
              <div className="mt-2">
                <img 
                  src={reportData.photoUrl} 
                  alt={`Photo of ${reportData.name}`} 
                  className="max-w-xs rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-person.jpg';
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}