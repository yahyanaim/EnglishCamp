/** A numbered learning marker, styled like a verification seal. */
export function NumberSeal({ value, label, completed = false }: { value: number | string; label: string; completed?: boolean }) {
  return <span className={`camp-number-seal${completed ? ' is-complete' : ''}`} role="img" aria-label={label}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.77 4 4 0 0 1 0 6.76 4 4 0 0 1-4.78 4.77 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/></svg>
    <strong>{value}</strong>
  </span>;
}
