/** Keep page content visible in the server-rendered document. */
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="learning-page camp-page-stack">{children}</div>;
}
