"use client";

import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, Ticket } from 'lucide-react';
import { Input } from '@/components/ui/shadcn/input';
import { Button } from '@/components/ui/shadcn/button';

export function InvitationRequestForm({ onUseCode, onSignIn, onSent, onBusy }: {
  onUseCode: () => void;
  onSignIn: () => void;
  onSent: () => void;
  onBusy: (busy: boolean) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !consent) return;
    setBusy(true);
    onBusy(true);
    setError('');
    try {
      const response = await fetch('/api/invitations/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), consent }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save your request. Please try again.');
      setSent(true);
      onSent();
    } catch (error) {
      setError(error instanceof Error && error.name !== 'TimeoutError'
        ? error.message : 'The request timed out. Please try again.');
    } finally {
      setBusy(false);
      onBusy(false);
    }
  }

  if (sent) return (
    <section className="camp-access-request-result" aria-label="Invitation delivery">
      <div className="camp-access-recipient"><Mail size={18} aria-hidden="true" /><div><span>Email address</span><strong dir="ltr">{email.trim()}</strong></div></div>
      <p>Check your inbox and spam folder for the invitation after approval.</p>
      <Button variant="outline" onClick={onUseCode}><Ticket size={18} aria-hidden="true" /> Use an invitation code</Button>
      <button className="camp-access-text-action justify-self-start" type="button" onClick={onSignIn}>Back to sign in</button>
    </section>
  );

  return (
    <>
      <form className="camp-entry-form camp-entry-form-paired" onSubmit={submit} aria-busy={busy}>
        <div className="camp-entry-field">
          <label htmlFor="request-name">Your name</label>
          <Input id="request-name" dir="auto" value={name} onChange={event => setName(event.target.value)}
            autoComplete="name" maxLength={40} required disabled={busy} />
        </div>
        <div className="camp-entry-field">
          <label htmlFor="request-email">Email address</label>
          <Input id="request-email" type="email" dir="ltr" value={email} onChange={event => setEmail(event.target.value)}
            autoComplete="email" maxLength={254} required disabled={busy} />
        </div>
        <label className="camp-access-consent">
          <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required disabled={busy} />
          <span>I agree to share my name and email with the EnglishCamp owner to review my request and send my invitation if approved.</span>
        </label>
        {error && <p className="camp-access-error" role="alert">{error}</p>}
        <Button type="submit" className="camp-access-submit" disabled={!consent || busy}>
          {busy ? 'Sending your request…' : 'Request an invitation'}
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </form>
      <div className="camp-access-support camp-access-request-links">
        <button className="camp-access-text-action" type="button" disabled={busy} onClick={onSignIn}>Back to sign in</button>
        <button className="camp-access-text-action" type="button" disabled={busy} onClick={onUseCode}>Use my code <ArrowRight size={14} aria-hidden="true" /></button>
      </div>
    </>
  );
}
