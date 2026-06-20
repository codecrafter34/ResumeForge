import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiPlay, FiCheck } from "react-icons/fi";
import { generateActionVerbs } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";

export function ActionVerbGenerator() {
  const [word, setWord] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word) return;
    setIsGenerating(true);
    try {
      const data = await generateActionVerbs(word);
      setResult(data);
      addToast("Action verbs generated!");
    } catch (err) {
      addToast("Failed to generate action verbs");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-card border rounded-2xl shadow-sm p-6 flex flex-col"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Action Verb Generator</h2>
          <p className="text-sm text-muted-foreground mt-1">Replace weak words with powerful action verbs.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Basic Word <span className="text-red-500">*</span></label>
            <input 
              value={word} onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. Created" required
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !word}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Generate
            </button>
            <button
              type="button" onClick={() => { setWord(""); setResult(null); }}
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
              <div className="h-8 w-8 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Finding strong synonyms...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Powerful Alternatives</h3>
                <div className="grid grid-cols-2 gap-3">
                  {result.map((verb, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigator.clipboard.writeText(verb);
                        addToast(`"${verb}" copied!`);
                      }}
                      className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted hover:border-border transition-all text-sm font-medium group/btn"
                    >
                      {verb}
                      <FiCopy className="opacity-0 group-hover/btn:opacity-100 transition-opacity text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your strong action verbs will appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
