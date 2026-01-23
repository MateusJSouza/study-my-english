import { useState } from "react";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { readings } from "@/data/readings";
import { LevelSection } from "@/components/LevelSection";
import heroImage from "@/assets/hero-reading.jpg";

const Index = () => {
  const [filter, setFilter] = useState<"all" | "new" | "coming">("all");

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section - Redesigned */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90 dark:opacity-95" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">Master English Through Reading</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              English Reading
              <span className="block text-accent">Practice</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Progressive learning from A1 to C1 with engaging texts and instant PDF downloads
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Start Learning Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                Browse Levels
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-white/80 font-medium">Reading Texts</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-white">5</span>
              </div>
              <p className="text-white/80 font-medium">Proficiency Levels</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-white">PDF</span>
              </div>
              <p className="text-white/80 font-medium">Downloads Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-card-foreground hover:bg-muted border border-border"
            }`}
          >
            All Texts
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "new"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-card-foreground hover:bg-muted border border-border"
            }`}
          >
            New Texts
          </button>
          <button
            onClick={() => setFilter("coming")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "coming"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-card-foreground hover:bg-muted border border-border"
            }`}
          >
            Coming Soon
          </button>
        </div>

        {/* Level Sections */}
        <div className="space-y-20">
          {Object.entries(readings).map(([level, levelReadings]) => (
            <LevelSection
              key={level}
              level={level}
              levelName={level}
              readings={levelReadings}
              totalTexts={levelReadings.length}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-32 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">English Reading Practice</h3>
            <p className="text-muted-foreground mb-6">Improve your English, one text at a time</p>
            <p className="text-sm text-muted-foreground">&copy; 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
