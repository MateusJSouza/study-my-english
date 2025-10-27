import { ReadingCard } from "./ReadingCard";
import { Badge } from "@/components/ui/badge";
import { Reading } from "@/data/readings";

interface LevelSectionProps {
  level: string;
  levelName: string;
  readings: Reading[];
  totalTexts: number;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "A1": return "from-accent/20 to-accent/5";
    case "A2": return "from-secondary/20 to-secondary/5";
    case "B1": return "from-primary/20 to-primary/5";
    case "B2": return "from-secondary/30 to-secondary/10";
    case "C1": return "from-primary/30 to-primary/10";
    default: return "from-muted to-background";
  }
};

export const LevelSection = ({ level, levelName, readings, totalTexts }: LevelSectionProps) => {
  const visibleCount = readings.length;
  
  return (
    <section className="mb-16">
      <div className={`bg-gradient-to-r ${getLevelColor(level)} rounded-2xl p-8 mb-8 border border-border`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">{level}</h2>
            <p className="text-muted-foreground">
              {level === "A1" && "Beginner - Start your journey"}
              {level === "A2" && "Elementary - Build foundations"}
              {level === "B1" && "Intermediate - Gain confidence"}
              {level === "B2" && "Upper Intermediate - Master complexity"}
              {level === "C1" && "Advanced - Perfect your skills"}
            </p>
          </div>
          <Badge variant="secondary" className="text-base px-4 py-2 w-fit">
            {visibleCount} texts
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {readings.map((reading, index) => (
          <ReadingCard
            key={index}
            title={reading.title}
            description={reading.description}
            content={reading.content}
            level={level}
            questions={reading.questions}
          />
        ))}
      </div>
    </section>
  );
};
