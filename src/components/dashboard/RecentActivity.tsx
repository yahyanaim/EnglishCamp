interface Props { lessonsDone: number; exercisesDone: number; quizzesTaken: number; }

const items = [
  { label: "Lessons completed", key: "lessons" as const, color: "var(--color-primary)", textColor: "var(--color-text-link)" },
  { label: "Exercises done", key: "exercises" as const, color: "var(--color-info)", textColor: "var(--color-text-info)" },
  { label: "Quizzes taken", key: "quizzes" as const, color: "var(--color-warning)", textColor: "var(--color-text-warning)" },
];

const bgMap: Record<string, string> = {
  "var(--color-primary)": "var(--color-primary-subtle)",
  "var(--color-info)": "var(--color-info-bg)",
  "var(--color-warning)": "var(--color-warning-bg)",
};

export function RecentActivity({ lessonsDone, exercisesDone, quizzesTaken }: Props) {
  const values = { lessons: lessonsDone, exercises: exercisesDone, quizzes: quizzesTaken };

  return (
    <div
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <h3 className="font-display font-bold text-[var(--color-text-primary)] mb-4" style={{ fontSize: "15px", letterSpacing: "0.5px" }}>
        Recent Activity
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-2.5 px-3 rounded-[var(--radius-md)] bg-[var(--color-neutral-50)]"
          >
            <span className="font-body text-sm text-[var(--color-text-secondary)]">{item.label}</span>
            <span
              className="font-display font-bold text-sm px-3 py-0.5 rounded-[var(--radius-pill)]"
              style={{
                color: item.textColor,
                backgroundColor: bgMap[item.color],
              }}
            >
              {values[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
