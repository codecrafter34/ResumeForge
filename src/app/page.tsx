"use client";

import { useState } from "react";
import ResumeBulletGenerator from "@/components/ResumeBulletGenerator";
import ResumeSummaryGenerator from "@/components/ResumeSummaryGenerator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"bullet" | "summary">("bullet");

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
      <div className="text-center max-w-3xl mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Build Your <span className="text-blue-600">Perfect Resume</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Generate ATS-friendly resume bullets and professional summaries in seconds to land your dream job.
        </p>
      </div>

      <div className="w-full max-w-md mb-8 p-1 bg-muted rounded-lg flex shadow-sm border border-border/50">
        <button
          onClick={() => setActiveTab("bullet")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
            activeTab === "bullet"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Bullet Generator
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
            activeTab === "summary"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Summary Generator
        </button>
      </div>

      <div className="w-full">
        {activeTab === "bullet" ? (
          <ResumeBulletGenerator />
        ) : (
          <ResumeSummaryGenerator />
        )}
      </div>
    </div>
  );
}
