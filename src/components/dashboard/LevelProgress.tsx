import { Progress } from "@/components/ui/Progress";

interface Props { levels: { id: string; title: string; accent: string; progress: number; subtitle: string }[]; }

export function LevelProgress({ levels }: Props) {
  return (
    <div className="space-y-4">
      {levels.map((lv) => (
        <div key={lv.id} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 border-2 border-[var(--color-border-default)] transition-all duration-200"
          style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-extrabold" style={{ color: lv.accent }}>{lv.title}</span>
            <span className="inline-flex items-center rounded-[var(--radius-pill)] px-2 py-0.5 text-xs font-body font-semibold"
              style={{ backgroundColor: "var(--color-surface-alt)", color: "var(--color-text-secondary)" }}
            >{lv.progress}%</span>
          </div>
          <Progress value={lv.progress} color={lv.accent} size="sm" />
        </div>
      ))}
    </div>
  );
}
