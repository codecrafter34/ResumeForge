import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiPlay, FiCheck, FiArrowRight } from "react-icons/fi";
import { enhanceBullet } from "../utils/mockApi";
import { useToast } from "../components/ui/ToastProvider";

export function BulletEnhancer() {
  const [bullet, setBullet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bullet) return;
    setIsGenerating(true);
    try {
      const data = await enhanceBullet(bullet);
      setResult(data);
      addToast("Bullet enhanced successfully!");
    } catch (err) {
      addToast("Failed to enhance bullet");
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
          <h2 className="text-xl font-bold text-foreground">Resume Bullet Enhancer</h2>
          <p className="text-sm text-muted-foreground mt-1">Transform basic bullets into ATS-optimized power statements.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Basic Bullet Point <span className="text-red-500">*</span></label>
            <textarea 
              value={bullet} onChange={(e) => setBullet(e.target.value)}
              placeholder="e.g. Made a website." required rows={4}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 mt-auto">
            <button
              type="submit" disabled={isGenerating || !bullet}
              className="flex-1 bg-foreground text-background font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isGenerating ? <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <FiPlay />}
              Enhance
            </button>
            <button
              type="button" onClick={() => { setBullet(""); setResult(null); }}
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
              <div className="h-8 w-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm animate-pulse">Analyzing and enhancing...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="bg-muted border rounded-xl p-4 text-muted-foreground line-through opacity-70">
                  {bullet}
                </div>
                <div className="flex justify-center">
                  <div className="bg-background border rounded-full p-2 shadow-sm text-blue-500">
                    <FiArrowRight />
                  </div>
                </div>
                <div className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      addToast("Enhanced bullet copied!");
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                  >
                    <FiCopy />
                  </button>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Enhanced Output</h3>
                  <p className="text-sm leading-relaxed flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-3 shrink-0" /> {result}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 opacity-20" />
              </div>
              <p>Your enhanced bullet will appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
