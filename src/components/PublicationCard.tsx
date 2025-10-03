import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Users } from "lucide-react";

interface PublicationCardProps {
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  tags: string[];
  relevance?: string;
}

export const PublicationCard = ({ title, authors, date, abstract, tags, relevance }: PublicationCardProps) => {
  return (
    <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground mb-2 leading-tight">{title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {authors.join(", ")}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
            </CardDescription>
          </div>
          <FileText className="h-6 w-6 text-primary flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 line-clamp-3">{abstract}</p>
        {relevance && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-accent mb-1">Mars/Moon Relevance:</p>
            <p className="text-sm text-foreground/90">{relevance}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
