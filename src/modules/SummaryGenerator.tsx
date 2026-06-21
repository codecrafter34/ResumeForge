import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiPlay, FiCheck } from "react-icons/fi";
import { generateSummary } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";

export function SummaryGenerator() {
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState("Mid Level");
  const [goal, setGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills || !goal) return;
    setIsGenerating(true);
    try {
      const data = await generateSummary(skills, level, goal);
      setResult(data);
      addToast("Summaries generated successfully!");
    } catch (err) {
      addToast("Failed to generate summaries");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${type} copied to clipboard!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm p-6 flex flex-col"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Resume Summary Generator</h2>
          <p className="text-sm text-muted-foreground mt-1">Craft a compelling professional summary that highlights your goals and skills.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <select 
              value={level} onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Fresher">Fresher (0-1 years)</option>
              <option value="Entry Level">Entry Level (1-3 years)</option>
              <option value="Mid Level">Mid Level (3-5 years)</option>
              <option value="Senior Level">Senior Level (5+ years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Core Skills <span className="text-red-500">*</span></label>
            <textarea 
              value={skills} onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Project Management" required rows={3}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Career Goal <span className="text-red-500">*</span></label>
            <input 
              value={goal} onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Seeking a Senior Frontend Developer role" required
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !skills || !goal}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Generate
            </button>
            <button
              type="button" onClick={() => { setSkills(""); setGoal(""); setResult(null); }}
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
          <h2 className="font-semibold">Results Dashboard</h2>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-muted/10">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="h-8 w-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Writing professional summaries...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {Object.entries(result).map(([type, summary]: [string, any]) => (
                <div key={type} className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                  <button 
                    onClick={() => handleCopy(summary, `${type} summary`)}
                    className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                  >
                    <FiCopy />
                  </button>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{type} Summary</h3>
                  <p className="text-sm leading-relaxed p-4 bg-muted/50 rounded-lg border border-border/50">
                    {summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your generated summaries will appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
