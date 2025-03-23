"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src="/assets/logo-transparent-svg.svg"
            alt="Missing Persons Platform Logo"
            className="object-contain p-8 w-full h-full"
          />
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
          {/* Logo for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src="/assets/logo-transparent-svg.svg"
              alt="Missing Persons Platform Logo"
              className="w-48 h-24 object-contain"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 font-montserrat">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-space-grotesk">
              Join our community to help find missing persons
            </p>
          </div>

          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "font-space-grotesk",
                formButtonPrimary: "font-space-grotesk bg-brand hover:bg-brand/90",
                formFieldLabel: "font-space-grotesk",
                formFieldInput: "font-space-grotesk",
                footerActionLink: "font-space-grotesk text-brand hover:text-brand/90",
              }
            }}
            afterSignUpUrl="/cases"
            signInUrl="/signin"
          />
        </div>
      </div>
    </div>
  )
} 