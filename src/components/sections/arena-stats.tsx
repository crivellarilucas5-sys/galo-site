import { Calendar, MapPin, ShieldCheck, Users } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { StatCard } from "@/components/shared/stat-card";
import type { ArenaStat } from "@/types/content";

interface ArenaStatsProps {
  stats: ArenaStat[];
}

const iconMap = {
  capacity: Users,
  calendar: Calendar,
  location: MapPin,
  match: ShieldCheck,
} as const;

export function ArenaStats({ stats }: ArenaStatsProps) {
  return (
    <RevealGroup as="div" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <RevealItem as="div" key={stat.label}>
          <StatCard
            value={stat.value}
            label={stat.label}
            icon={stat.icon ? iconMap[stat.icon] : undefined}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
