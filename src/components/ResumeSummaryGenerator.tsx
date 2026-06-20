"use client";

import { useState } from "react";
import { Copy, Trash2, BookOpen, Check } from "lucide-react";

export default function ResumeSummaryGenerator() {
  const [skills, setSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry Level");
  const [careerGoal, setCareerGoal] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ summary: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills || !careerGoal) return;

    setIsGenerating(true);
    
    // Call our mock API route
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "summary",
          skills,
          experienceLevel,
          careerGoal,
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setSkills("");
    setExperienceLevel("Entry Level");
    setCareerGoal("");
    setResult(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* Form Section */}
      <div className="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/30">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Resume Summary Generator
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Craft a compelling professional summary that highlights your goals and skills.
          </p>
        </div>
        
        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Entry Level">Entry Level (0-2 years)</option>
              <option value="Mid Level">Mid Level (3-5 years)</option>
              <option value="Senior Level">Senior Level (5+ years)</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">Core Skills</label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Project Management, Data Analysis, Python, Team Leadership"
              required
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="careerGoal" className="text-sm font-medium">Career Goal / Target Role</label>
            <input
              id="careerGoal"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Seeking a Frontend Developer position..."
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isGenerating || !skills || !careerGoal}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full flex-1"
            >
              {isGenerating ? "Generating..." : "Generate Summary"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Generated Summary</h2>
          {result && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
            >
              {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          {result ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Professional Summary</h3>
                <p className="text-[15px] leading-relaxed p-4 bg-muted/50 rounded-lg border border-border/50">
                  {result.summary}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12 text-center">
              <BookOpen className="h-12 w-12 opacity-20" />
              <p>Fill out the form and click generate to create your professional resume summary.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
