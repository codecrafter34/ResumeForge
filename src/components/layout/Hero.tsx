import { motion } from "framer-motion";

export function Hero() {
  const scrollToWorkspace = () => {
    document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32 flex flex-col items-center text-center px-4">
      {/* Background gradients */}
      <div className="absolute top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-blue-500/10 opacity-50 blur-[80px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
          Build ATS-Friendly <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Resume Content in Seconds
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Generate professional resume bullets, summaries, ATS keywords, and resume improvements instantly.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={scrollToWorkspace}
            className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-foreground text-background hover:bg-foreground/90 h-14 px-8 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
