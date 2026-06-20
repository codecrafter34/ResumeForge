import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiPlay, FiCheck, FiAlertCircle } from "react-icons/fi";
import { analyzeATS } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";

export function AtsScoreAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText) return;
    setIsGenerating(true);
    try {
      const data = await analyzeATS(resumeText);
      setResult(data);
      addToast("Resume analyzed successfully!");
    } catch (err) {
      addToast("Failed to analyze resume");
    } finally {
      setIsGenerating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm p-6 flex flex-col"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">ATS Score Analyzer</h2>
          <p className="text-sm text-muted-foreground mt-1">Paste your resume content to see how well it passes ATS filters.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2 h-[60%]">
            <label className="text-sm font-medium">Resume Content <span className="text-red-500">*</span></label>
            <textarea 
              value={resumeText} onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your entire resume text here..." required
              className="w-full h-[250px] rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !resumeText}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Analyze Resume
            </button>
            <button
              type="button" onClick={() => { setResumeText(""); setResult(null); }}
              className="px-4 py-2.5 border rounded-lg text-foreground font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <FiTrash2 /> Clear
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
          <h2 className="font-semibold">Analysis Results</h2>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-muted/10">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="h-8 w-8 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Running ATS algorithms...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              
              {/* Score Card */}
              <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Overall ATS Score</h3>
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-muted">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle 
                      cx="60" cy="60" r="56" fill="transparent" 
                      stroke="currentColor" strokeWidth="8"
                      className={`${getScoreColor(result.score)} opacity-20`}
                    />
                    <circle 
                      cx="60" cy="60" r="56" fill="transparent" 
                      stroke="currentColor" strokeWidth="8"
                      strokeDasharray={351} strokeDashoffset={351 - (351 * result.score) / 100}
                      className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <div className="text-4xl font-extrabold">{result.score}</div>
                </div>
                <p className="mt-4 font-medium">Strength: <span className={getScoreColor(result.score)}>{result.strength}</span></p>
                
                {/* Progress Bar Alternative */}
                <div className="w-full max-w-xs mt-6">
                  <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
                    <span>Needs Work</span>
                    <span>Excellent</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${getScoreBg(result.score)}`}
                    />
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-background border rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <FiAlertCircle className="text-blue-500" /> Actionable Suggestions
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((s: string, i: number) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords & Weak Verbs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-600 text-xs font-semibold rounded-md border border-red-500/20">{kw}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-background border rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Weak Verbs</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.weakVerbs.map((v: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-orange-500/10 text-orange-600 text-xs font-semibold rounded-md border border-orange-500/20">{v}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your ATS analysis will appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
