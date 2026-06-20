import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiDownload, FiCheck, FiPlay } from "react-icons/fi";
import { generateResumeBullets } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";
import { jsPDF } from "jspdf";

export function BulletGenerator() {
  const [projectName, setProjectName] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !description) return;
    setIsGenerating(true);
    try {
      const data = await generateResumeBullets(projectName, technologies, description);
      setResult(data);
      addToast("Resume bullets generated successfully!");
    } catch (err) {
      addToast("Failed to generate bullets");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setProjectName("");
    setTechnologies("");
    setDescription("");
    setResult(null);
    addToast("Form cleared");
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${type} copied to clipboard!`);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resume Bullets & Summary", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Project Summary:", 20, 35);
    const splitSummary = doc.splitTextToSize(result.summary, 170);
    doc.text(splitSummary, 20, 45);
    
    let y = 45 + splitSummary.length * 7 + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Impact Statements:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    result.impactStatements.forEach((stmt: string) => {
      doc.text(`• ${stmt}`, 25, y);
      y += 7;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Resume Bullets:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    result.bullets.forEach((bullet: string) => {
      const splitBullet = doc.splitTextToSize(`• ${bullet}`, 165);
      doc.text(splitBullet, 25, y);
      y += splitBullet.length * 7;
    });

    doc.save("resume-bullets.pdf");
    addToast("PDF Downloaded!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Input Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm p-6 flex flex-col"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Resume Bullet Generator</h2>
          <p className="text-sm text-muted-foreground mt-1">Generate ATS-friendly bullets and summaries.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name <span className="text-red-500">*</span></label>
            <input 
              value={projectName} onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. E-Commerce Platform" required
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Technologies Used</label>
            <input 
              value={technologies} onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project Description <span className="text-red-500">*</span></label>
            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you built and the problems you solved..." required rows={5}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !projectName || !description}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Generate
            </button>
            <button
              type="button" onClick={handleClear}
              className="px-4 py-2.5 border rounded-lg text-foreground font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <FiTrash2 /> Clear
            </button>
          </div>
        </form>
      </motion.div>

      {/* Output Dashboard */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
          <h2 className="font-semibold">Results Dashboard</h2>
          {result && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleCopy(JSON.stringify(result, null, 2), "All Results")}
                className="p-2 border rounded-md hover:bg-muted text-foreground transition-colors tooltip"
                aria-label="Copy All"
              >
                <FiCopy className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="p-2 border rounded-md hover:bg-muted text-foreground transition-colors bg-blue-500/10 text-blue-600 border-blue-500/20"
                aria-label="Download PDF"
              >
                <FiDownload className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-muted/10">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="h-8 w-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Crafting perfect bullets...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => handleCopy(result.summary, "Project Summary")}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                >
                  <FiCopy />
                </button>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Project Summary</h3>
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </div>

              {/* Impact Card */}
              <div className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => handleCopy(result.impactStatements.join("\n"), "Impact Statements")}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                >
                  <FiCopy />
                </button>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Quantified Impact</h3>
                <ul className="space-y-2">
                  {result.impactStatements.map((stmt: string, i: number) => (
                    <li key={i} className="flex items-start text-sm"><FiCheck className="mt-1 mr-2 text-green-500 shrink-0" /> {stmt}</li>
                  ))}
                </ul>
              </div>

              {/* Bullets Card */}
              <div className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => handleCopy(result.bullets.join("\n"), "Resume Bullets")}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                >
                  <FiCopy />
                </button>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">ATS-Optimized Bullets</h3>
                <ul className="space-y-3">
                  {result.bullets.map((b: string, i: number) => (
                    <li key={i} className="flex items-start text-sm"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0" /> {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your generated content will appear here.</p>
              <p className="text-sm mt-2 opacity-60">Fill out the form to get started.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
