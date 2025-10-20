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
        <h2 className="mb-1 font-bold text-foreground text-2xl">## Level {level} - {visibleCount} free texts</h2>
      </div>
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
};
