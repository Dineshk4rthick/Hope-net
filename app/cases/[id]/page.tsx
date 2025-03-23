"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, MapPin, Calendar, Clock, Share2, Flag, ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details")
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [upvotes, setUpvotes] = useState(24)
  const [downvotes, setDownvotes] = useState(3)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I think I saw this person at Central Park yesterday around 5pm. They were wearing a red jacket.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 101,
          author: "Officer Mike",
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "Thank you for the information. Could you provide more details about the exact location in Central Park?",
          timestamp: "1 hour ago",
        },
      ],
    },
    {
      id: 2,
      author: "David Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I'm pretty sure I went to school with this person. I'll reach out to some mutual friends to see if anyone has heard from them.",
      timestamp: "5 hours ago",
      replies: [],
    },
  ])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  // Mock case data
  const caseData = {
    id: params.id,
    name: "Jane Doe",
    age: 24,
    gender: "Female",
    height: "5'6\"",
    weight: "130 lbs",
    hairColor: "Brown",
    eyeColor: "Blue",
    lastSeen: "March 15, 2023",
    lastSeenTime: "7:30 PM",
    location: "Central Park, New York, NY",
    description:
      "Jane was last seen leaving her workplace at 7:30 PM. She was wearing a black jacket, blue jeans, and white sneakers. She has a small tattoo of a star on her right wrist.",
    circumstances:
      "Jane did not return home after work and has not been in contact with family or friends. Her phone is turned off and there has been no activity on her social media accounts.",
    contactInfo:
      "If you have any information, please contact NYPD at (555) 123-4567 or submit a tip through this platform.",
    reportedBy: "Family Member",
    reportDate: "March 16, 2023",
    status: "unverified",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  }

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1)
      setIsUpvoted(false)
    } else {
      setUpvotes(upvotes + 1)
      setIsUpvoted(true)
      if (isDownvoted) {
        setDownvotes(downvotes - 1)
        setIsDownvoted(false)
      }
    }
  }

  const handleDownvote = () => {
    if (isDownvoted) {
      setDownvotes(downvotes - 1)
      setIsDownvoted(false)
    } else {
      setDownvotes(downvotes + 1)
      setIsDownvoted(true)
      if (isUpvoted) {
        setUpvotes(upvotes - 1)
        setIsUpvoted(false)
      }
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        timestamp: "Just now",
        replies: [],
      }
      setComments([newCommentObj, ...comments])
      setNewComment("")
    }
  }

  const handleReplySubmit = (e: React.FormEvent, commentId: number) => {
    e.preventDefault()
    if (replyContent.trim() && replyingTo !== null) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                author: "Current User",
                avatar: "/placeholder.svg?height=40&width=40",
                content: replyContent,
                timestamp: "Just now",
              },
            ],
          }
        }
        return comment
      })
      setComments(updatedComments)
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  return (
    <div className="container py-8">
      <Link href="/cases" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Cases
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
                <Image
                  src={caseData.images[0] || "/placeholder.svg"}
                  alt={caseData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {caseData.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square w-full overflow-hidden rounded-md border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${caseData.name} ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 100px"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{caseData.name}</h1>
                {caseData.status === "verified" ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    Unverified
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{caseData.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{caseData.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="font-medium">{caseData.height}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{caseData.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hair Color</p>
                  <p className="font-medium">{caseData.hairColor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eye Color</p>
                  <p className="font-medium">{caseData.eyeColor}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last seen: {caseData.lastSeen}</span>
                <Clock className="h-4 w-4 ml-3 mr-1" />
                <span>{caseData.lastSeenTime}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{caseData.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report Case</DialogTitle>
                      <DialogDescription>
                        Report false information or inappropriate content related to this case.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea placeholder="Please describe the issue with this case..." />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Submit Report</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" className="gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Found
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Mark as Found</DialogTitle>
                      <DialogDescription>
                        Do you have information confirming this person has been found?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground">
                        Please provide details about how you know this person has been found. This information will be
                        reviewed by our team.
                      </p>
                      <Textarea placeholder="Provide details about how you know this person has been found..." />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{caseData.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Circumstances</h3>
                <p className="text-muted-foreground">{caseData.circumstances}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <p className="text-muted-foreground">{caseData.contactInfo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="font-medium">{caseData.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Report Date</p>
                  <p className="font-medium">{caseData.reportDate}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="updates" className="pt-4">
              <div className="border rounded-lg p-6 text-center">
                <p className="text-muted-foreground">No updates available for this case yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Updates will be posted here as they become available.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Discussion</h3>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share information or ask questions about this case..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!newComment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-4 pt-1">
                          <button
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>

                    {comment.replies.length > 0 && (
                      <div className="pl-10 space-y-4 border-l">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={reply.avatar} alt={reply.author} />
                              <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{reply.author}</p>
                                <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {replyingTo === comment.id && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pl-10 space-y-2"
                        onSubmit={(e) => handleReplySubmit(e, comment.id)}
                      >
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                          <Button type="submit" size="sm" disabled={!replyContent.trim()}>
                            Reply
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="font-medium">Case Verification</h3>
            <p className="text-sm text-muted-foreground">
              Help verify this case by voting if you believe the information is accurate.
            </p>
            <div className="flex items-center justify-between">
              <Button variant={isUpvoted ? "default" : "outline"} size="sm" className="gap-1" onClick={handleUpvote}>
                <ThumbsUp className="h-4 w-4" />
                <span>{upvotes}</span>
              </Button>
              <Button
                variant={isDownvoted ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={handleDownvote}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{downvotes}</span>
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="font-medium">Similar Cases</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Similar case" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm">John Smith</p>
                  <p className="text-xs text-muted-foreground">Last seen: March 18, 2023</p>
                  <p className="text-xs text-muted-foreground">Los Angeles, CA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Similar case" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm">Emily Johnson</p>
                  <p className="text-xs text-muted-foreground">Last seen: March 20, 2023</p>
                  <p className="text-xs text-muted-foreground">Chicago, IL</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View More Similar Cases
            </Button>
          </div>

          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-primary hover:underline">
                  National Center for Missing & Exploited Children
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  FBI Missing Persons
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Local Police Department
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary hover:underline">
                  Missing Persons Support Groups
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

