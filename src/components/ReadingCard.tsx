import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface ReadingCardProps {
  title: string;
  description: string;
  level: string;
  premium?: boolean;
}

export const ReadingCard = ({ title, description, level, premium = false }: ReadingCardProps) => {
  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    console.log(`Downloading PDF for: ${title}`);
  };

  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
          {premium && (
            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-md shrink-0">
              Premium
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">View</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">PDF</span>
        </Button>
      </CardContent>
    </Card>
  );
};
