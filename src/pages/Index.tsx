import { LevelSection } from "@/components/LevelSection";
import { readingsData } from "@/data/readings";
import { BookOpen, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-reading.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  English Reading
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                English texts for beginners to practice reading and comprehension online and for free. 
                Practicing your comprehension of written English will both improve your vocabulary and 
                understanding of grammar and word order.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">42 free texts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Premium: 234 texts</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={heroImage} 
                alt="English learning illustration" 
                className="rounded-2xl shadow-[var(--shadow-card)] w-full h-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Prepared by experienced English teachers, the texts, articles and conversations are brief and 
            appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and 
            you'll get the results immediately. You will feel both challenged and accomplished! You can even 
            download (as PDF) and print the texts and exercises. It's enjoyable, fun and free. Good luck!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex gap-3 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            all texts
          </button>
          <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            new texts
          </button>
          <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            coming soon
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
      <footer className="border-t border-border mt-20 py-8 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 English Reading Hub. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
