"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1A1A1A] dark:bg-[#0A0A0A] backdrop-blur supports-[backdrop-filter]:bg-[#1A1A1A]/95 dark:supports-[backdrop-filter]:bg-[#0A0A0A]/95">
      <div className="container flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="text-[#DFE6E9] dark:text-[#FFFFFF]">HopeNet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/cases" className="text-lg font-medium text-[#DFE6E9] hover:text-[#74B9FF] dark:text-[#FFFFFF] dark:hover:text-[#74B9FF] transition-colors">
            Cases
          </Link>
          <Link href="/report" className="text-lg font-medium text-[#DFE6E9] hover:text-[#74B9FF] dark:text-[#FFFFFF] dark:hover:text-[#74B9FF] transition-colors">
            Report
          </Link>
          <Link href="/dashboard" className="text-lg font-medium text-[#DFE6E9] hover:text-[#74B9FF] dark:text-[#FFFFFF] dark:hover:text-[#74B9FF] transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-lg font-medium text-[#DFE6E9] hover:text-[#74B9FF] dark:text-[#FFFFFF] dark:hover:text-[#74B9FF] transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden text-[#DFE6E9] hover:text-[#74B9FF] dark:text-[#FFFFFF] dark:hover:text-[#74B9FF]">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <ThemeToggle />
          <SignInButton mode="modal">
            <Button variant="outline" size="lg" className="text-[#DFE6E9] border-[#DFE6E9] hover:bg-[#74B9FF] hover:text-[#1A1A1A] dark:text-[#FFFFFF] dark:border-[#FFFFFF] dark:hover:bg-[#74B9FF] dark:hover:text-[#0A0A0A] bg-[#2D3436] dark:bg-[#0A0A0A]">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-[#74B9FF] hover:bg-[#0984E3] text-[#1A1A1A] dark:text-[#0A0A0A]">
              Get Started
            </Button>
          </SignUpButton>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
} 