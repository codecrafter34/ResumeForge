import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/layout/Hero";
import { Workspace } from "./components/layout/Workspace";
import { Footer } from "./components/layout/Footer";
import { ToastProvider } from "./components/ui/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
        <Navbar />
        <main>
          <Hero />
          <Workspace />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
