interface Props { headers: string[]; rows: string[][] }

export function TableBlock({ headers, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-default)]" style={{ boxShadow: "var(--shadow-1)" }}>
      <table className="w-full font-body text-sm">
        <thead>
          <tr style={{ backgroundColor: "var(--color-surface-alt)" }}>
            {headers.map((h, i) => (
              <th key={i} className={`px-4 py-3 text-left font-display font-extrabold text-xs uppercase tracking-wider text-[var(--color-text-secondary)] ${i > 0 ? 'border-l border-[var(--color-border-default)]' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-default)]">
          {rows.map((row, ri) => (
            <tr key={ri} className={`${ri % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-alt)]"} hover:bg-[var(--color-primary-subtle)] transition-colors`}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-[var(--color-text-primary)] ${ci > 0 ? 'border-l border-[var(--color-border-default)]' : ''} ${ci === 0 ? 'font-bold text-[var(--color-text-primary)]' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
