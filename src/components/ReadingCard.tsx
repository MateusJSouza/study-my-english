import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useState } from "react";
import { ReadingViewer } from "./ReadingViewer";
import jsPDF from "jspdf";

interface ReadingCardProps {
  title: string;
  description: string;
  level: string;
  content: string;
  premium?: boolean;
}

export const ReadingCard = ({ title, description, level, content, premium = false }: ReadingCardProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, margin + 10);
    
    // Level
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Level: ${level}`, margin, margin + 20);
    
    // Description
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    const descLines = doc.splitTextToSize(description, maxWidth);
    doc.text(descLines, margin, margin + 30);
    
    // Content
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(content, maxWidth);
    
    let yPosition = margin + 45;
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    
    doc.save(`${title.replace(/\s+/g, '_')}_Level_${level}.pdf`);
  };

  return (
    <>
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
            onClick={() => setIsViewerOpen(true)}
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
      
      <ReadingViewer
        open={isViewerOpen}
        onOpenChange={setIsViewerOpen}
        title={title}
        description={description}
        content={content}
        level={level}
      />
    </>
  );
};
