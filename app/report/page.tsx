"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Upload, MapPin, Calendar, User, Phone, Mail, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type FormData = {
  // Personal Information
  name: string
  age: string
  gender: string
  height: string
  weight: string
  complexion: string
  lastSeen: string
  lastSeenTime: string
  location: string
  city: string
  state: string
  pincode: string

  // Contact Information
  reporterName: string
  relationship: string
  phone: string
  email: string
  alternatePhone: string

  // Physical Description
  build: string
  hairColor: string
  eyeColor: string
  identifyingMarks: string
  clothing: string
  accessories: string

  // Additional Information
  circumstances: string
  lastKnownActivity: string
  medicalConditions: string
  medications: string
  additionalNotes: string

  // Images
  photos: File[]
}

export default function ReportPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    complexion: "",
    lastSeen: "",
    lastSeenTime: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    reporterName: "",
    relationship: "",
    phone: "",
    email: "",
    alternatePhone: "",
    build: "",
    hairColor: "",
    eyeColor: "",
    identifyingMarks: "",
    clothing: "",
    accessories: "",
    circumstances: "",
    lastKnownActivity: "",
    medicalConditions: "",
    medications: "",
    additionalNotes: "",
    photos: [],
  })

  const steps = [
    {
      title: "Personal Information",
      description: "Basic details about the missing person",
      icon: User,
    },
    {
      title: "Contact Information",
      description: "Details about the person reporting",
      icon: Phone,
    },
    {
      title: "Physical Description",
      description: "Detailed physical characteristics",
      icon: User,
    },
    {
      title: "Location Details",
      description: "Where the person was last seen",
      icon: MapPin,
    },
    {
      title: "Additional Information",
      description: "Other relevant details",
      icon: AlertCircle,
    },
    {
      title: "Upload Photos",
      description: "Add recent photographs",
      icon: Upload,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)],
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const validateForm = () => {
    // Required fields validation
    const requiredFields = {
      name: "Full Name",
      age: "Age",
      gender: "Gender",
      reporterName: "Your Name",
      phone: "Phone Number",
      email: "Email Address",
      lastSeen: "Last Seen Date",
      location: "Last Seen Location",
      city: "City",
      state: "State",
      pincode: "Pincode",
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Validation Error",
          description: `${label} is required`,
          variant: "destructive",
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      })
      return false
    }

    // Photo validation
    if (formData.photos.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please upload at least one photo",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData object for file upload
      const submitData = new FormData()
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photos") {
          // Append each photo file
          formData.photos.forEach((photo) => {
            submitData.append("photos", photo)
          })
        } else {
          // Convert value to string for FormData
          submitData.append(key, String(value))
        }
      })

      // Make API call to submit the form
      const response = await fetch("/api/report", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit report")
      }

      // Show success message
      toast({
        title: "Success",
        description: "Your report has been submitted successfully",
      })

      // Redirect to cases page
      router.push("/cases")
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complexion">Complexion</Label>
                <Select value={formData.complexion} onValueChange={(value) => setFormData((prev) => ({ ...prev, complexion: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="wheatish">Wheatish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">Your Name</Label>
                <Input id="reporterName" name="reporterName" value={formData.reporterName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input id="relationship" name="relationship" value={formData.relationship} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input id="alternatePhone" name="alternatePhone" type="tel" value={formData.alternatePhone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="build">Build</Label>
                <Select value={formData.build} onValueChange={(value) => setFormData((prev) => ({ ...prev, build: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select build" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                    <SelectItem value="heavy">Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hairColor">Hair Color</Label>
                <Input id="hairColor" name="hairColor" value={formData.hairColor} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eyeColor">Eye Color</Label>
              <Input id="eyeColor" name="eyeColor" value={formData.eyeColor} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifyingMarks">Identifying Marks</Label>
              <Textarea
                id="identifyingMarks"
                name="identifyingMarks"
                value={formData.identifyingMarks}
                onChange={handleInputChange}
                placeholder="Scars, tattoos, birthmarks, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clothing">Last Seen Wearing</Label>
              <Textarea
                id="clothing"
                name="clothing"
                value={formData.clothing}
                onChange={handleInputChange}
                placeholder="Describe the clothing in detail"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessories">Accessories</Label>
              <Textarea
                id="accessories"
                name="accessories"
                value={formData.accessories}
                onChange={handleInputChange}
                placeholder="Jewelry, glasses, watch, etc."
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastSeen">Last Seen Date</Label>
                <Input id="lastSeen" name="lastSeen" type="date" value={formData.lastSeen} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastSeenTime">Last Seen Time</Label>
                <Input id="lastSeenTime" name="lastSeenTime" type="time" value={formData.lastSeenTime} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Last Seen Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="circumstances">Circumstances of Disappearance</Label>
              <Textarea
                id="circumstances"
                name="circumstances"
                value={formData.circumstances}
                onChange={handleInputChange}
                placeholder="Describe what happened before the person went missing"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastKnownActivity">Last Known Activity</Label>
              <Textarea
                id="lastKnownActivity"
                name="lastKnownActivity"
                value={formData.lastKnownActivity}
                onChange={handleInputChange}
                placeholder="What was the person doing before going missing?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                placeholder="Any medical conditions or disabilities"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Medications</Label>
              <Textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                placeholder="Any medications the person needs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any other relevant information"
              />
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Photos</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      className="object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          photos: prev.photos.filter((_, i) => i !== index),
                        }))
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <label
                  htmlFor="photo-upload"
                  className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Photo</span>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const CurrentIcon = steps[currentStep - 1].icon

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Report Missing Person</h1>
          <p className="text-muted-foreground mt-2">Help us find your loved one by providing accurate information</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CurrentIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {currentStep === steps.length ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

