import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ModuleType } from "../../types";
import { BulletGenerator } from "../../modules/BulletGenerator";
import { KeywordGenerator } from "../../modules/KeywordGenerator";
import { SummaryGenerator } from "../../modules/SummaryGenerator";
import { BulletEnhancer } from "../../modules/BulletEnhancer";
import { ActionVerbGenerator } from "../../modules/ActionVerbGenerator";
import { AtsScoreAnalyzer } from "../../modules/AtsScoreAnalyzer";
import { QuickTemplates } from "../../modules/QuickTemplates";
import { 
  FiList, FiKey, FiFileText, FiTrendingUp, 
  FiType, FiTarget, FiGrid 
} from "react-icons/fi";

const MODULES: { id: ModuleType; label: string; icon: any }[] = [
  { id: "atsScore", label: "ATS Analyzer", icon: FiTarget },
  { id: "bullet", label: "Bullet Generator", icon: FiList },
  { id: "enhancer", label: "Bullet Enhancer", icon: FiTrendingUp },
  { id: "summary", label: "Summary Generator", icon: FiFileText },
  { id: "keyword", label: "Keywords", icon: FiKey },
  { id: "actionVerb", label: "Action Verbs", icon: FiType },
  { id: "templates", label: "Templates", icon: FiGrid },
];

export function Workspace() {
  const [activeModule, setActiveModule] = useState<ModuleType>("atsScore");

  const renderModule = () => {
    switch (activeModule) {
      case "bullet": return <BulletGenerator />;
      case "keyword": return <KeywordGenerator />;
      case "summary": return <SummaryGenerator />;
      case "enhancer": return <BulletEnhancer />;
      case "actionVerb": return <ActionVerbGenerator />;
      case "atsScore": return <AtsScoreAnalyzer />;
      case "templates": return <QuickTemplates />;
      default: return <AtsScoreAnalyzer />;
    }
  };

  return (
    <section id="workspace" className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workspace</h2>
          <p className="text-muted-foreground mt-1">Select a tool below to start optimizing your resume.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Sidebar / Topbar for Modules */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar shrink-0">
          {MODULES.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap lg:whitespace-normal text-left ${
                  isActive 
                    ? "bg-foreground text-background shadow-md shadow-foreground/10" 
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-border"
                }`}
              >
                <Icon className={isActive ? "text-background" : "text-blue-500"} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 min-w-0 bg-background/50 rounded-3xl lg:p-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
