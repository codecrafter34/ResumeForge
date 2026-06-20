"use client";

import { useState } from "react";
import { Copy, Trash2, Sparkles, Check } from "lucide-react";

export default function ResumeBulletGenerator() {
  const [projectName, setProjectName] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [description, setDescription] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    bullets: string[];
    keywords: string[];
    summary: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !description) return;

    setIsGenerating(true);
    
    // Call our mock API route
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bullet",
          projectName,
          technologies,
          description,
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating bullets:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setProjectName("");
    setTechnologies("");
    setDescription("");
    setResult(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `Project Summary:\n${result.summary}\n\nKey Achievements & Bullets:\n${result.bullets.map(b => "• " + b).join("\n")}\n\nATS Keywords:\n${result.keywords.join(", ")}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* Form Section */}
      <div className="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/30">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Resume Bullet Generator
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Turn your project description into ATS-friendly resume bullets.
          </p>
        </div>
        
        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="projectName" className="text-sm font-medium">Project Name</label>
            <input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. E-Commerce Platform"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="technologies" className="text-sm font-medium">Technologies Used</label>
            <input
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Project Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you built, problems you solved, and impact made..."
              required
              rows={5}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isGenerating || !projectName || !description}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full flex-1"
            >
              {isGenerating ? "Generating..." : "Generate Content"}
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
          <h2 className="text-xl font-semibold">Generated Content</h2>
          {result && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
            >
              {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy All"}
            </button>
          )}
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          {result ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Project Summary</h3>
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Resume Bullets</h3>
                <ul className="space-y-2">
                  {result.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm leading-relaxed flex items-start">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">ATS Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12 text-center">
              <Sparkles className="h-12 w-12 opacity-20" />
              <p>Fill out the form and click generate to see your ATS-friendly resume content here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
