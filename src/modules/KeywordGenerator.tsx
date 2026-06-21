import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiPlay, FiCheck } from "react-icons/fi";
import { generateKeywords } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";

export function KeywordGenerator() {
  const [role, setRole] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setIsGenerating(true);
    try {
      const data = await generateKeywords(role);
      setResult(data);
      addToast("Keywords generated successfully!");
    } catch (err) {
      addToast("Failed to generate keywords");
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
          <h2 className="text-xl font-bold text-foreground">ATS Keyword Generator</h2>
          <p className="text-sm text-muted-foreground mt-1">Discover the top skills and tools for your target role.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Role <span className="text-red-500">*</span></label>
            <input 
              value={role} onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer" required
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-muted/40 rounded-lg p-4 text-sm text-muted-foreground border border-dashed">
            <strong>Pro Tip:</strong> Copy these keywords exactly as they are and scatter them naturally throughout your summary, skills section, and bullet points to bypass ATS filters.
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !role}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Generate
            </button>
            <button
              type="button" onClick={() => { setRole(""); setResult(null); }}
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
              <div className="h-8 w-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Extracting industry keywords...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {Object.entries(result).map(([category, items]: [string, any]) => (
                <div key={category} className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                  <button 
                    onClick={() => handleCopy(items.join(", "), category)}
                    className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                  >
                    <FiCopy />
                  </button>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full border">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your generated keywords will appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
