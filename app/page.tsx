"use client"

import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaseCard } from "@/components/case-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-section">
          <div className="container px-4 md:px-6 hero-content">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold tracking-wide sm:text-5xl xl:text-6xl/none font-serif">
                    "<span className="font-serif italic text-[#74B9FF]">Together</span> <span className="font-serif">we</span> <span className="font-serif italic text-[#74B9FF]">bring</span> <span className="font-serif">them</span> <span className="font-serif italic text-[#74B9FF]">home</span>"
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A decentralized platform to report, search, and help locate missing individuals. Powered by
                    blockchain for security and transparency.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/report">
                    <Button className="gap-1 bg-[#2D3436] hover:bg-[#636E72] dark:bg-[#DFE6E9] dark:hover:bg-[#B2BEC3] dark:text-[#2D3436]">
                      Report Missing Person
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/cases">
                    <Button variant="outline">View Cases</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl border shadow-sm p-6">
                  <div className="space-y-2 mb-4">
                    <h2 className="text-xl font-bold">Search Missing Persons</h2>
                    <p className="text-sm text-muted-foreground">
                      Enter name, age, or location to find missing individuals
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Name, age, or location..." className="flex-1" />
                      <Button variant="secondary" size="icon">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Recent Cases
                      </Button>
                      <Button variant="outline" size="sm">
                        Near Me
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Recent Cases</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  These individuals were recently reported missing. Please help by sharing information.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <CaseCard
                name="Jane Doe"
                age={24}
                location="New York, NY"
                lastSeen="2023-03-15"
                imageUrl="/placeholder.svg?height=400&width=300"
                status="unverified"
              />
              <CaseCard
                name="John Smith"
                age={32}
                location="Los Angeles, CA"
                lastSeen="2023-03-18"
                imageUrl="/placeholder.svg?height=400&width=300"
                status="verified"
              />
              <CaseCard
                name="Emily Johnson"
                age={17}
                location="Chicago, IL"
                lastSeen="2023-03-20"
                imageUrl="/placeholder.svg?height=400&width=300"
                status="unverified"
              />
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/cases">
                <Button variant="outline">View All Cases</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform uses blockchain technology to ensure data integrity and security.
                </p>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Report a Missing Person</h3>
                      <p className="text-sm text-muted-foreground">
                        Fill out a detailed form with information about the missing individual.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Verification Process</h3>
                      <p className="text-sm text-muted-foreground">
                        Reports are verified by authorized organizations to ensure accuracy.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Community Engagement</h3>
                      <p className="text-sm text-muted-foreground">
                        Share cases, provide information, and help locate missing individuals.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Mission</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Help us create a global network for finding missing persons. Every share, every tip, and every
                    report matters.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/about">
                    <Button variant="secondary">Learn More</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Register as Verifier</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="font-bold text-xl">HopeNet</div>
            <p className="text-sm text-muted-foreground">A decentralized platform to help find missing persons.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/cases" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cases
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="text-muted-foreground hover:text-foreground transition-colors">
                    Report
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HopeNet. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const hero = document.querySelector('.hero-section');
              if (!hero) return;

              let mouseX = 50;
              let mouseY = 50;
              let targetX = 50;
              let targetY = 50;

              // Smooth animation function
              function animate() {
                const dx = targetX - mouseX;
                const dy = targetY - mouseY;
                
                mouseX += dx * 0.1;
                mouseY += dy * 0.1;

                const xOffset = (mouseX - 50) * 0.2;
                const yOffset = (mouseY - 50) * 0.2;

                hero.style.setProperty('--mouse-x', \`\${mouseX}%\`);
                hero.style.setProperty('--mouse-y', \`\${mouseY}%\`);
                hero.style.setProperty('--mouse-x-offset', \`\${xOffset}px\`);
                hero.style.setProperty('--mouse-y-offset', \`\${yOffset}px\`);

                requestAnimationFrame(animate);
              }

              // Start animation
              animate();

              // Update target position on mouse move
              hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                targetX = ((e.clientX - rect.left) / rect.width) * 100;
                targetY = ((e.clientY - rect.top) / rect.height) * 100;
              });

              // Reset position when mouse leaves
              hero.addEventListener('mouseleave', () => {
                targetX = 50;
                targetY = 50;
              });

              // Add touch support
              hero.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = hero.getBoundingClientRect();
                targetX = ((touch.clientX - rect.left) / rect.width) * 100;
                targetY = ((touch.clientY - rect.top) / rect.height) * 100;
              });
            });
          `,
        }}
      />
    </div>
  )
}

