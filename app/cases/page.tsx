"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { CaseCard } from "@/components/case-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CasesPage() {
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100])

  // Mock data for cases
  const cases = [
    {
      name: "Priya Sharma",
      age: 24,
      location: "Mumbai, Maharashtra",
      lastSeen: "2023-03-15",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "unverified" as const,
    },
    {
      name: "Arjun Patel",
      age: 32,
      location: "Delhi, NCR",
      lastSeen: "2023-03-18",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "verified" as const,
    },
    {
      name: "Ananya Reddy",
      age: 17,
      location: "Bangalore, Karnataka",
      lastSeen: "2023-03-20",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "unverified" as const,
    },
    {
      name: "Rahul Verma",
      age: 45,
      location: "Chennai, Tamil Nadu",
      lastSeen: "2023-03-12",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "verified" as const,
    },
    {
      name: "Meera Singh",
      age: 29,
      location: "Kolkata, West Bengal",
      lastSeen: "2023-03-19",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "found" as const,
    },
    {
      name: "Aditya Kumar",
      age: 21,
      location: "Hyderabad, Telangana",
      lastSeen: "2023-03-17",
      imageUrl: "/placeholder.svg?height=400&width=300",
      status: "unverified" as const,
    },
  ]

  // Filter cases based on age range
  const filteredCases = cases.filter(
    (caseItem) => caseItem.age >= ageRange[0] && caseItem.age <= ageRange[1]
  )

  const handleAgeRangeChange = (value: number[]) => {
    setAgeRange([value[0], value[1]])
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Missing Persons Cases</h1>
          <p className="text-muted-foreground mt-1">Browse and search for missing persons cases</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/report">
            <Button>Report Missing Person</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <div className="hidden md:block sticky top-20 space-y-6">
            <div className="space-y-4">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h3 className="font-medium">Filters</h3>
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="search" type="search" placeholder="Name or location..." className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified" />
                    <label
                      htmlFor="verified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Verified
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="unverified" />
                    <label
                      htmlFor="unverified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Unverified
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Age Range</Label>
                <Slider
                  value={ageRange}
                  onValueChange={handleAgeRangeChange}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{ageRange[0]} years</span>
                  <span className="text-xs text-muted-foreground">{ageRange[1]} years</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select defaultValue="recent">
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Locations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="near" id="near" />
                    <Label htmlFor="near">Near Me</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter and sort missing persons cases</SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-4">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Home className="h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                  <div className="space-y-2">
                    <Label htmlFor="search-mobile">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="search-mobile" type="search" placeholder="Name or location..." className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified-mobile" />
                        <label
                          htmlFor="verified-mobile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Verified
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="unverified-mobile" />
                        <label
                          htmlFor="unverified-mobile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Unverified
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <Slider
                      value={ageRange}
                      onValueChange={handleAgeRangeChange}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{ageRange[0]} years</span>
                      <span className="text-xs text-muted-foreground">{ageRange[1]} years</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort-mobile">Sort By</Label>
                    <Select defaultValue="recent">
                      <SelectTrigger id="sort-mobile">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">Showing {filteredCases.length} results</p>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCases.map((caseItem) => (
              <motion.div
                key={caseItem.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CaseCard {...caseItem} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

