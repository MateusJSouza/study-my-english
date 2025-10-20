import { LevelSection } from "@/components/LevelSection";
import { readingsData } from "@/data/readings";
import { BookOpen, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-background py-12 border-b border-border">
        <div className="mx-auto px-4 container">
          <div className="text-center">
            <h1 className="mb-4 font-extrabold text-foreground text-5xl md:text-6xl">
              The English Club Reading Practice
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl leading-relaxed">
              Improve your English reading comprehension with texts organized by proficiency levels A1 to C1. 
              Practice online and download PDFs for free.
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2 font-medium text-primary">
                <BookOpen className="w-5 h-5" />
                <span>42 free texts</span>
              </div>
              
            </div>
          </div>
        </div>
        <div className="top-4 right-4 absolute">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 py-12 container">
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Prepared by experienced English teachers, the texts, articles and conversations are brief and 
            appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and 
            you'll get the results immediately. You will feel both challenged and accomplished! You can even 
            download (as PDF) and print the texts and exercises. It's enjoyable, fun and free. Good luck!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 bg-muted mx-auto mb-10 p-1 rounded-lg w-fit">
          <button className="bg-primary hover:bg-primary/90 shadow px-4 py-2 rounded-md font-medium text-primary-foreground text-sm transition-colors">
            All Texts
          </button>
          <button className="hover:bg-muted-foreground/10 px-4 py-2 rounded-md font-medium text-muted-foreground text-sm transition-colors">
            New Texts
          </button>
          <button className="hover:bg-muted-foreground/10 px-4 py-2 rounded-md font-medium text-muted-foreground text-sm transition-colors">
            Coming Soon
          </button>
        </div>

        {/* Reading Sections by Level */}
        <div className="space-y-12">
          {Object.entries(readingsData).map(([level, data]) => (
            <LevelSection
              key={level}
              level={level}
              levelName={data.levelName}
              readings={data.readings}
              totalTexts={data.totalTexts}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary mt-20 py-8 border-t border-border">
        <div className="mx-auto px-4 text-muted-foreground text-sm text-center container">
          <p>© 2025 The English Club. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
