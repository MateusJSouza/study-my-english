import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

interface ReadingViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  content: string;
  level: string;
}

export const ReadingViewer = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  content,
  level 
}: ReadingViewerProps) => {
  
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="mb-2 text-2xl">{title}</DialogTitle>
              <DialogDescription className="text-base">
                {description}
              </DialogDescription>
              <span className="inline-block bg-primary/10 mt-2 px-2 py-1 rounded-md font-medium text-primary text-xs">
                Level {level}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="shrink-0"
            >
              <Download className="mr-2 w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="pr-4 h-[60vh]">
          <div className="max-w-none prose prose-sm">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
