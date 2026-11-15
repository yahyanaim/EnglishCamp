"use client";
import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/shadcn/button';
import '@/app/invitations.css';

export const isEntryPage = (path: string) => ['/invite', '/admin/invitations'].includes(path.replace(/\/$/, ''));

/** Protect client navigation too; all actual authorization still runs in the Worker. */
export function InvitationBoundary({ children }: { children: ReactNode }) {
  const path = usePathname(), entry = isEntryPage(path) || path.replace(/\/$/, '') === '/connect-device';
  const [allowed, setAllowed] = useState(''), [error, setError] = useState(''), [retry, setRetry] = useState(0);
  useEffect(() => {
    if (entry) return;
    let disposed = false; const controller = new AbortController();
    async function check() {
      setError(''); const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch('/api/access/session', { cache: 'no-store', credentials: 'same-origin', signal: controller.signal });
        if (process.env.NODE_ENV === 'development' && response.status === 404) { if (!disposed) setAllowed(path); return; }
        const data = await response.json(); if (!response.ok) throw new Error('Please try again. Your learning records are kept.');
        if (disposed) return;
        if (data.granted === true) setAllowed(path);
        else { setAllowed(''); window.location.replace('/invite?next=' + encodeURIComponent(window.location.pathname + window.location.search)); }
      } catch { if (!disposed) { setAllowed(''); setError('We could not check your access. Your saved progress is kept.'); } }
      finally { clearTimeout(timeout); }
    }
    void check(); const refresh = () => { if (document.visibilityState === 'visible') void check(); };
    window.addEventListener('focus', refresh); window.addEventListener('online', refresh);
    return () => { disposed = true; controller.abort(); window.removeEventListener('focus', refresh); window.removeEventListener('online', refresh); };
  }, [path, entry, retry]);
  if (entry || allowed === path) return <>{children}</>;
  return <main className="camp-entry"><div className="camp-access-status" role={error ? 'alert' : 'status'}>
    <p>{error || 'Opening your learning space…'}</p>{error && <Button onClick={() => setRetry(v => v + 1)}>Try again</Button>}
  </div></main>;
}
