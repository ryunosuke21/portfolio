import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface TechItemProps {
  name: string;
  description: string;
  icon?: IconName;
}

export function TechItem({ name, description, icon }: TechItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50">
      <div className="mt-1 text-primary">
        <DynamicIcon name={icon ?? "code"} className="h-6 w-6" />
      </div>
      <div>
        <h4 className="mb-1 font-semibold">{name}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
