import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { ReadingViewer } from "./ReadingViewer";
import jsPDF from "jspdf";
import { Question } from "@/data/readings";

interface ReadingCardProps {
  title: string;
  description: string;
  level: string;
  content: string;
  questions: Question[];
}

export const ReadingCard = ({ title, description, level, content, questions }: ReadingCardProps) => {
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
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
        <CardHeader>
          <Badge variant="outline" className="border-primary text-primary mb-2 w-fit">{level}</Badge>
          <CardTitle className="text-xl text-card-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 pt-0">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => setIsViewerOpen(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4" />
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
        questions={questions}
      />
    </>
  );
};
