"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Edit, Save, User, Shield, Wallet, Bell, LogOut, ChevronRight, Search, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CaseCard } from "@/components/case-card"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Verified Reporter",
    joinDate: "January 15, 2023",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Mock submitted cases
  const submittedCases = [
    {
      name: "Jane Doe",
      age: 24,
      location: "New York, NY",
      lastSeen: "2023-03-15",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "verified" as const,
    },
    {
      name: "John Smith",
      age: 32,
      location: "Los Angeles, CA",
      lastSeen: "2023-03-18",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "unverified" as const,
    },
  ]

  // Mock saved cases
  const savedCases = [
    {
      name: "Emily Johnson",
      age: 17,
      location: "Chicago, IL",
      lastSeen: "2023-03-20",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "unverified" as const,
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="gap-1">
                  <Shield className="h-3 w-3" />
                  {userData.role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Member since {userData.joinDate}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t pt-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Wallet</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {userData.walletAddress.substring(0, 6)}...
                    {userData.walletAddress.substring(userData.walletAddress.length - 4)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Notifications</span>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="w-full mt-2 gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 space-y-2">
            <h3 className="font-medium text-sm">Quick Links</h3>
            <nav className="space-y-1">
              <Link href="/report" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span>Report Missing Person</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>Verification Dashboard</span>
              </Link>
              <Link href="/cases" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-4 w-4 text-primary" />
                </div>
                <span>Browse Cases</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="submitted">Submitted Cases</TabsTrigger>
              <TabsTrigger value="saved">Saved Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information and account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State, Country" disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter your current password"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <span className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </span>
                    </div>
                    <Switch id="two-factor" disabled={!isEditing} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Security</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Web3 Integration</CardTitle>
                  <CardDescription>Manage your blockchain wallet and Web3 settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Connected Wallet</Label>
                      <p className="text-sm text-muted-foreground">{userData.walletAddress}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="notifications">Transaction Notifications</Label>
                      <span className="text-xs text-muted-foreground">
                        Receive notifications for blockchain transactions
                      </span>
                    </div>
                    <Switch id="notifications" disabled={!isEditing} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Connect Different Wallet</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="submitted" className="pt-6">
              <h2 className="text-xl font-bold mb-4">Your Submitted Cases</h2>
              {submittedCases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {submittedCases.map((caseItem) => (
                    <motion.div
                      key={caseItem.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CaseCard {...caseItem} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No cases submitted yet</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    You haven't submitted any missing person reports
                  </p>
                  <Link href="/report">
                    <Button>Report Missing Person</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="pt-6">
              <h2 className="text-xl font-bold mb-4">Your Saved Cases</h2>
              {savedCases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCases.map((caseItem) => (
                    <motion.div
                      key={caseItem.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CaseCard {...caseItem} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bookmark className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No saved cases</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    You haven't saved any cases for later reference
                  </p>
                  <Link href="/cases">
                    <Button>Browse Cases</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

