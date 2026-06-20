import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - ResumeForge",
  description: "Learn more about ResumeForge, the ATS-friendly resume content generator.",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <FileText className="h-10 w-10 text-blue-600" />
        <h1 className="text-4xl font-extrabold tracking-tight">About ResumeForge</h1>
      </div>
      
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-muted-foreground">
          ResumeForge is a free online tool designed specifically to help students and job seekers create 
          ATS-friendly resume content quickly and effortlessly. 
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
        <p className="text-base leading-relaxed text-muted-foreground mb-6">
          Writing a resume is hard, especially when you have to tailor it to pass through Applicant Tracking Systems (ATS). 
          Our goal is to simplify this process by generating professional, impactful resume bullets and summaries that 
          highlight your actual skills and achievements.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">How It Works</h2>
        <ul className="space-y-4 text-base text-muted-foreground list-disc pl-6 mb-8">
          <li>
            <strong className="text-foreground">Resume Bullet Generator:</strong> Simply input your project details, 
            and we&apos;ll format them into strong, action-oriented bullet points loaded with relevant keywords.
          </li>
          <li>
            <strong className="text-foreground">Resume Summary Generator:</strong> Enter your skills, experience level, 
            and career goal to instantly receive a compelling professional summary that sets the right tone for your resume.
          </li>
        </ul>
        
        <div className="bg-muted/50 border rounded-xl p-8 mt-12 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to level up your resume?</h3>
          <p className="text-muted-foreground mb-6">Start generating content for free today.</p>
          <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-8 py-2">
            Go to Generator
          </Link>
        </div>
      </div>
    </div>
  );
}
