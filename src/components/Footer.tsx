export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-semibold text-lg">John Doe</span>
          <a href="mailto:john@example.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            john@example.com
          </a>
        </div>
        
        <div>
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-4 py-2"
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>
    </footer>
  );
}
