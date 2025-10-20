import { ReadingCard } from "./ReadingCard";

interface Reading {
  title: string;
  description: string;
  content: string;
  premium?: boolean;
}

interface LevelSectionProps {
  level: string;
  levelName: string;
  readings: Reading[];
  totalTexts: number;
}

export const LevelSection = ({ level, levelName, readings, totalTexts }: LevelSectionProps) => {
  const visibleCount = readings.length;
  const premiumCount = totalTexts - visibleCount;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Level {level}</h2>
        <p className="text-sm text-muted-foreground">
          {visibleCount} free texts • {premiumCount} premium texts
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {readings.map((reading, index) => (
          <ReadingCard
            key={index}
            title={reading.title}
            description={reading.description}
            content={reading.content}
            level={level}
            premium={reading.premium}
          />
        ))}
      </div>
      {premiumCount > 0 && (
        <div className="mt-4">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            Premium: {premiumCount} more texts
          </button>
        </div>
      )}
    </section>
  );
};
