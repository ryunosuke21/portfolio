interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export function TimelineItem({
  title,
  organization,
  period,
  description,
}: TimelineItemProps) {
  return (
    <div className="relative border-border border-l-2 pb-8 pl-8 last:pb-0">
      <div className="absolute top-0 left-0 h-4 w-4 -translate-x-[9px] rounded-full bg-primary" />
      <div className="mb-1">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-muted-foreground text-sm">{organization}</p>
      </div>
      <p className="mb-2 text-muted-foreground text-xs">{period}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}
