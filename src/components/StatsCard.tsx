import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
}

export const StatsCard = ({ icon: Icon, label, value, trend }: StatsCardProps) => {
  return (
    <Card className="glass-effect border-border/50 hover:glow-primary transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && <p className="text-xs text-primary">{trend}</p>}
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
