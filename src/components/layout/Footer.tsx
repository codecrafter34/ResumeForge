import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full border-t border-border/40 bg-background py-8 mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-semibold text-lg text-foreground">[YOUR FULL NAME]</span>
          <a href="mailto:[YOUR EMAIL]" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            [YOUR EMAIL]
          </a>
        </div>
        
        <div>
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 shadow-sm"
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
