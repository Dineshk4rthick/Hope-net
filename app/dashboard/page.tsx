"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, XCircle, Search, Filter, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null)

  // Mock data for cases
  const pendingCases = [
    {
      id: 1,
      name: "Jane Doe",
      age: 24,
      location: "New York, NY",
      reportDate: "2023-03-16",
      lastSeen: "2023-03-15",
      reportedBy: "Family Member",
      status: "pending",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "John Smith",
      age: 32,
      location: "Los Angeles, CA",
      reportDate: "2023-03-19",
      lastSeen: "2023-03-18",
      reportedBy: "Friend",
      status: "pending",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Johnson",
      age: 17,
      location: "Chicago, IL",
      reportDate: "2023-03-21",
      lastSeen: "2023-03-20",
      reportedBy: "School Official",
      status: "pending",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const verifiedCases = [
    {
      id: 4,
      name: "Michael Brown",
      age: 45,
      location: "Houston, TX",
      reportDate: "2023-03-13",
      lastSeen: "2023-03-12",
      reportedBy: "Coworker",
      status: "verified",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Lee",
      age: 21,
      location: "Seattle, WA",
      reportDate: "2023-03-18",
      lastSeen: "2023-03-17",
      reportedBy: "Roommate",
      status: "verified",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const rejectedCases = [
    {
      id: 6,
      name: "Sarah Wilson",
      age: 29,
      location: "Miami, FL",
      reportDate: "2023-03-20",
      lastSeen: "2023-03-19",
      reportedBy: "Anonymous",
      status: "rejected",
      rejectionReason: "Insufficient information provided",
      imageUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const handleCaseView = (caseItem: any) => {
    setSelectedCase(caseItem)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and verify missing persons cases</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/report">
            <Button>Report New Case</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cases..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by: Recent
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              Pending
              <Badge className="ml-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 absolute -top-2 -right-2">
                {pendingCases.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="pt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Report Date</TableHead>
                    <TableHead className="hidden md:table-cell">Reported By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={caseItem.imageUrl || "/placeholder.svg"}
                              alt={caseItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{caseItem.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{caseItem.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{caseItem.age}</TableCell>
                      <TableCell className="hidden md:table-cell">{caseItem.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(caseItem.reportDate)}</TableCell>
                      <TableCell className="hidden md:table-cell">{caseItem.reportedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleCaseView(caseItem)}>
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Case Details</DialogTitle>
                                <DialogDescription>
                                  Review the case details before making a verification decision.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedCase && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                  <div className="space-y-4">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                      <Image
                                        src="/placeholder.svg?height=400&width=400"
                                        alt={selectedCase.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-medium">{selectedCase.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Age</p>
                                        <p className="font-medium">{selectedCase.age}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium">{selectedCase.location}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Last Seen</p>
                                        <p className="font-medium">{formatDate(selectedCase.lastSeen)}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-lg font-medium">Case Information</h3>
                                      <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                          <p className="text-sm text-muted-foreground">Report Date</p>
                                          <p className="font-medium">{formatDate(selectedCase.reportDate)}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">Reported By</p>
                                          <p className="font-medium">{selectedCase.reportedBy}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-medium">Description</h3>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
                                        ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-medium">Verification Notes</h3>
                                      <Textarea
                                        placeholder="Add notes about this case verification..."
                                        className="mt-2"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter className="flex justify-between sm:justify-between">
                                <Button variant="destructive" className="gap-1">
                                  <XCircle className="h-4 w-4" />
                                  Reject
                                </Button>
                                <Button className="gap-1">
                                  <CheckCircle className="h-4 w-4" />
                                  Verify
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Request More Info</DropdownMenuItem>
                              <DropdownMenuItem>Contact Reporter</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Flag as Suspicious</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="verified" className="pt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Report Date</TableHead>
                    <TableHead className="hidden md:table-cell">Reported By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifiedCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={caseItem.imageUrl || "/placeholder.svg"}
                              alt={caseItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{caseItem.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{caseItem.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{caseItem.age}</TableCell>
                      <TableCell className="hidden md:table-cell">{caseItem.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(caseItem.reportDate)}</TableCell>
                      <TableCell className="hidden md:table-cell">{caseItem.reportedBy}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit Case</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Found</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Revoke Verification</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="pt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Report Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={caseItem.imageUrl || "/placeholder.svg"}
                              alt={caseItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{caseItem.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{caseItem.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{caseItem.age}</TableCell>
                      <TableCell className="hidden md:table-cell">{caseItem.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(caseItem.reportDate)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-destructive border-destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{caseItem.rejectionReason}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Reconsider</DropdownMenuItem>
                              <DropdownMenuItem>Request More Info</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete Permanently</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {pendingCases.length + verifiedCases.length + rejectedCases.length} cases
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

