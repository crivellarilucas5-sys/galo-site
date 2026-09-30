import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ value, label, icon: Icon, className }: StatCardProps) {
  return (
    <Card className={cn("border-border bg-surface text-center", className)}>
      <CardContent className="flex flex-col items-center gap-2 py-6">
        {Icon ? <Icon aria-hidden="true" className="size-6 text-primary" /> : null}
        <p className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
