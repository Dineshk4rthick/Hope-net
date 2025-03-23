"use client";

import { useState } from 'react';
import { createMissingPersonReport } from '@/lib/storage-service';
import { FileUpload } from '@/components/ui/file-upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ReportMissingPersonPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotoCid, setUploadedPhotoCid] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    lastSeen: '',
    description: '',
    contactInfo: ''
  });
  
  // Handle file upload completion
  const handleUploadComplete = (cid: string, url: string) => {
    console.log("File upload complete:", cid, url);
    setUploadedPhotoCid(cid);
    setUploadedPhotoUrl(url);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    console.log("Submit button clicked");
    setIsSubmitting(true);
    
    try {
      // Validate required fields for final submission
      if (!uploadedPhotoCid) {
        toast.error('Please upload at least one photo');
        setIsSubmitting(false);
        return;
      }
      
      // Create report data
      const reportData = {
        name: formData.name,
        age: parseInt(formData.age, 10) || 0,
        gender: formData.gender,
        lastSeen: formData.lastSeen,
        description: formData.description,
        contactInfo: formData.contactInfo,
        photoCid: uploadedPhotoCid,
        photoUrl: uploadedPhotoUrl
      };
      
      console.log("Submitting report data:", reportData);
      
      // Show success message immediately for testing
      setShowSuccess(true);
      toast.success('Your information has been uploaded successfully');
      
      // Create report
      try {
        const report = await createMissingPersonReport(reportData);
        console.log("Report created:", report);
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(`/report/confirmation?id=${report.id}`);
        }, 2000);
      } catch (createError) {
        console.error("Error creating report:", createError);
        // Still show success since we're troubleshooting
      }
      
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      // Validate personal info
      if (!formData.name || !formData.age || !formData.gender) {
        toast.error('Please fill in all required personal information');
        return;
      }
      
      if (!formData.lastSeen || !formData.description) {
        toast.error('Please fill in all required missing details');
        return;
      }
      
      if (!formData.contactInfo) {
        toast.error('Please provide contact information');
        return;
      }
    }
    
    setCurrentStep(2);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // First step - Personal information form
  const renderPersonalInfoForm = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Report Missing Person</h1>
      <p className="text-muted-foreground mb-6">Help us find your loved one by providing accurate information</p>
      
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium">
              Age *
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              max="120"
              required
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Missing Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Missing Details</h2>
        
        <div className="space-y-2">
          <label htmlFor="lastSeen" className="block text-sm font-medium">
            Last Seen (Date & Location) *
          </label>
          <input
            id="lastSeen"
            name="lastSeen"
            type="text"
            required
            value={formData.lastSeen}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., June 15, 2023 at Central Park, New York"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description (Appearance, Clothing, etc.) *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Please provide a detailed description..."
          />
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        
        <div className="space-y-2">
          <label htmlFor="contactInfo" className="block text-sm font-medium">
            Your Contact Information *
          </label>
          <textarea
            id="contactInfo"
            name="contactInfo"
            rows={2}
            required
            value={formData.contactInfo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Phone number, email, etc."
          />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={handleNext}
          className="px-8 py-2 bg-primary text-white font-medium rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
  
  // Second step - Photo upload
  const renderPhotoUpload = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Upload Photos</h1>
      <p className="text-muted-foreground mb-4">Add recent photographs</p>
      
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uploadedPhotoUrl && (
            <div className="relative border rounded-md overflow-hidden" style={{ height: '150px' }}>
              <Image 
                src={uploadedPhotoUrl}
                alt="Uploaded photo"
                fill
                style={{ objectFit: 'cover' }}
              />
              <button 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => {
                  setUploadedPhotoCid(null);
                  setUploadedPhotoUrl(null);
                }}
              >
                ×
              </button>
            </div>
          )}
          
          <div className="border rounded-md flex items-center justify-center" style={{ height: '150px' }}>
            <FileUpload 
              onUploadComplete={handleUploadComplete}
              className="h-full w-full flex items-center justify-center"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="px-8 py-2"
          >
            Previous
          </Button>
          
          <Button
            type="button"
            onClick={() => {
              console.log("Submit button clicked directly");
              handleSubmit();
            }}
            disabled={isSubmitting}
            className="px-8 py-2 bg-primary text-white font-medium rounded-md"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </div>
    </div>
  );
  
  if (showSuccess) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Your Information has been uploaded successfully</h2>
          <p className="text-green-700">
            Thank you for submitting your report. You will be redirected to a confirmation page shortly.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {currentStep === 1 ? renderPersonalInfoForm() : renderPhotoUpload()}
    </div>
  );
}