import { motion } from "framer-motion";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { useToast } from "../components/ui/ToastProvider";

const TEMPLATES = [
  {
    title: "Portfolio Website",
    desc: "Designed and developed a responsive portfolio website using React and Tailwind CSS, showcasing projects and improving online presence.",
  },
  {
    title: "E-Commerce Project",
    desc: "Architected a full-stack e-commerce application utilizing Node.js, Express, and MongoDB, resulting in a 20% increase in sales conversions.",
  },
  {
    title: "Chat Application",
    desc: "Implemented real-time messaging using Socket.io and React, supporting 500+ concurrent users with sub-second latency.",
  },
  {
    title: "Resume Builder",
    desc: "Built an AI-powered resume builder leveraging OpenAI API to generate ATS-friendly content, serving 10,000+ users.",
  },
  {
    title: "AI Image Generator",
    desc: "Integrated Stable Diffusion models into a Next.js application, enabling users to generate high-quality images from text prompts.",
  },
  {
    title: "Full Stack Dashboard",
    desc: "Developed an admin dashboard using Next.js and PostgreSQL, providing real-time analytics and reducing reporting time by 40%.",
  }
];

export function QuickTemplates() {
  const { addToast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("Template copied to clipboard!");
  };

  return (
    <div className="h-full bg-card border rounded-2xl shadow-sm p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Quick Templates</h2>
        <p className="text-sm text-muted-foreground mt-1">Ready-to-use, ATS-optimized descriptions for common projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-4">
        {TEMPLATES.map((tmpl, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-background border rounded-xl p-5 shadow-sm hover:shadow-md transition-all group flex flex-col relative"
          >
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-green-500 shrink-0" /> {tmpl.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {tmpl.desc}
            </p>
            <button 
              onClick={() => handleCopy(tmpl.desc)}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-muted hover:bg-foreground hover:text-background rounded-lg transition-colors text-sm font-medium"
            >
              <FiCopy /> Copy Template
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
