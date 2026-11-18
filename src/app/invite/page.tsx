"use client";

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Copy, Download, Eye, EyeOff, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { InvitationRequestForm } from '@/components/session/InvitationRequestForm';
import { EntryHeader } from '@/components/session/EntryHeader';
import { BrandMark } from '@/components/brand/BrandMark';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { PageLoading } from '@/components/ui/PageLoading';
import { useCloudProgress } from '@/components/session/CloudProgressProvider';
import { useSessionProfile } from '@/components/session/SessionProvider';
import './entry.css';

type View = 'signin' | 'join' | 'request';

function destination() {
  try {
    const url = new URL(new URLSearchParams(location.search).get('next') || '/dashboard', location.origin);
    if (url.origin !== location.origin || url.pathname === '/invite' || /^\/(admin|api|_next)(\/|$)/.test(url.pathname)) return '/dashboard';
    return url.pathname === '/' ? '/learning-home' : url.pathname + url.search + url.hash;
  } catch {
    return '/dashboard';
  }
}

function AccessIllustration({ request }: { request: boolean }) {
  return (
    <aside className="camp-access-art">
      <div className="camp-access-postmark" aria-hidden="true">
        <div className="camp-access-orbit" />
        <span className="camp-access-art-star camp-access-star-a" />
        <span className="camp-access-art-star camp-access-star-b" />
        <BrandMark size={216} />
      </div>
      <div className="camp-access-art-copy">
        {request ? (
          <>
            <h2>How invitations work</h2>
            <ol className="camp-access-steps">
              <li>Send your name and email.</li>
              <li>We review your request.</li>
              <li>If approved, use the emailed code to join.</li>
            </ol>
          </>
        ) : (
          <>
            <h2>Pick up where<br />you left off.</h2>
            <p>Your lessons, progress and notes follow you to any device when you sign in.</p>
            <div className="camp-access-art-note"><ShieldCheck size={18} aria-hidden="true" /> Keep your recovery code private.</div>
          </>
        )}
      </div>
    </aside>
  );
}

export default function InvitePage() {
  const router = useRouter();
  const cloud = useCloudProgress();
  const session = useSessionProfile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const focusTitle = useRef(false);

  const [view, setView] = useState<View | null>(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dismissed, setDismissed] = useState('');
  const [trialDays, setTrialDays] = useState<number | null>(null);
  const [granted, setGranted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [requestBusy, setRequestBusy] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const fragment = new URLSearchParams(location.hash.slice(1));
    const invitation = fragment.get('invite');
    const requestedView = query.get('view');
    if (invitation) {
      setView('join');
      setCode(invitation.slice(0, 80));
      setEmail((fragment.get('email') || '').slice(0, 254));
      setName((fragment.get('name') || '').slice(0, 40));
      query.set('view', 'join');
      history.replaceState(null, '', location.pathname + '?' + query);
    } else {
      setView(requestedView === 'join' || requestedView === 'request' ? requestedView : 'signin');
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    void fetch('/api/access/session', { cache: 'no-store', signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (controller.signal.aborted) return;
        setGranted(data?.granted === true);
        setTrialDays(data?.trialDays || null);
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (session.profile?.cloudId && !cloud.recoveryCode) setName(session.profile.name);
  }, [session.profile?.cloudId, session.profile?.name, cloud.recoveryCode]);

  useEffect(() => {
    if (granted && session.profile?.cloudId && !cloud.recoveryCode) router.replace(destination());
  }, [granted, session.profile?.cloudId, cloud.recoveryCode, router]);

  const saving = !!cloud.recoveryCode;
  const title = saving ? 'Save your recovery code' : requestSent ? 'Request received'
    : view === 'request' ? 'Request an invitation'
    : view === 'join' ? 'Create your account' : 'Welcome back.';
  useEffect(() => {
    document.title = title + ' · EnglishCamp';
    if (focusTitle.current || saving) {
      titleRef.current?.focus();
      focusTitle.current = false;
    }
  }, [title, saving]);

  const localName = !session.profile?.cloudId ? session.profile?.name : undefined;
  const hasError = !!cloud.message && !cloud.busy
    && ['offline', 'unavailable'].includes(cloud.status) && cloud.message !== dismissed;
  const signInError = failed || hasError;

  function change(next: View) {
    if (next === view || cloud.busy || requestBusy) return;
    focusTitle.current = true;
    setRequestSent(false);
    setView(next);
    setCode('');
    setVisible(false);
    setFailed(false);
    setDismissed(cloud.message);
    const query = new URLSearchParams(location.search);
    query.set('view', next);
    history.replaceState(null, '', location.pathname + '?' + query);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cloud.busy) return;
    setFailed(false);
    setDismissed('');
    if (view === 'signin') {
      if (await cloud.restore(name.trim(), code.trim())) router.replace(destination());
      else setFailed(true);
    } else if (!await cloud.create(localName || name.trim(), code.trim(), email.trim())) {
      setFailed(true);
    }
  }

  function download() {
    const content = [
      'EnglishCamp sign-in details',
      'Name: ' + (session.profile?.name || name),
      'Recovery code: ' + cloud.recoveryCode,
      'Sign in: ' + location.origin + '/invite',
      'Keep this file private. These details open your learning profile.',
    ].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'englishcamp-sign-in.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copy() {
    if (!cloud.recoveryCode) return;
    try {
      await navigator.clipboard.writeText(cloud.recoveryCode);
      setCopied(true);
      setCopyError('');
    } catch {
      setCopyError('Copy is unavailable. Download your sign-in details instead.');
    }
  }

  if (granted && session.profile?.cloudId && !saving) return <PageLoading full label="Opening your saved learning space" />;

  return (
    <div className="camp-entry-auth camp-learner-entry">
      <EntryHeader />
      <div className="camp-access-stage">
        <Link href="/" className="camp-access-home" aria-label="Home"><ArrowLeft size={18} aria-hidden="true" /><span>Home</span></Link>
        <div className="camp-access-shell">
          <section className="camp-access-content" aria-labelledby={view ? 'access-title' : undefined} aria-busy={!view}>
            {!view ? <div className="camp-access-preview" role="status"><span className="sr-only">Opening account access…</span><i /><i /><i /></div> : (
              <>
                {!saving && view !== 'request' && (
                  <div className="camp-access-switch" role="group" aria-label="Account access">
                    <button type="button" aria-pressed={view === 'signin'} disabled={cloud.busy} onClick={() => change('signin')}>Sign in</button>
                    <button type="button" aria-pressed={view === 'join'} disabled={cloud.busy} onClick={() => change('join')}>Create account</button>
                  </div>
                )}
                {!saving && view === 'request' && (
                  <button type="button" className="camp-access-text-action camp-access-back" disabled={requestBusy} onClick={() => change('signin')}>
                    <ArrowLeft size={16} aria-hidden="true" /> Back to sign in
                  </button>
                )}
                <header className="camp-access-heading">
                  {view === 'request' && <span className="camp-access-emblem">{requestSent ? <Check size={22} /> : <Mail size={22} />}</span>}
                  <h1 id="access-title" ref={titleRef} tabIndex={-1}>{title}</h1>
                  <p>{saving ? 'You’ll need this code and your name to sign in again.'
                    : requestSent ? 'We’ll review your request and email you if it’s approved.'
                    : view === 'request' ? 'Tell us where to send your code if your request is approved.'
                    : view === 'join' ? 'Use your invitation code to set up your learning profile.'
                    : 'Enter your name and recovery code to continue learning.'}</p>
                </header>

                {saving ? (
                  <section className="camp-recovery-ready" aria-label="Save your sign-in details">
                    <p><span>Your name</span><strong dir="auto">{session.profile?.name || name}</strong></p>
                    <div className="camp-recovery-secret">
                      <code dir="ltr">{cloud.recoveryCode}</code>
                      <button type="button" onClick={() => void copy()} aria-label={copied ? 'Code copied' : 'Copy recovery code'}>
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    {(copied || copyError) && <p role="status">{copyError || 'Recovery code copied. Keep it private.'}</p>}
                    <Button variant="outline" onClick={download}><Download size={17} aria-hidden="true" /> Download sign-in details</Button>
                    <Button className="camp-access-submit" onClick={() => { cloud.clearRecoveryCode(); router.replace(destination()); }}>
                      I saved my code · continue <ArrowRight size={17} aria-hidden="true" />
                    </Button>
                  </section>
                ) : view === 'request' ? (
                  <InvitationRequestForm
                    onBusy={setRequestBusy}
                    onSent={() => { focusTitle.current = true; setRequestSent(true); }}
                    onBack={() => change('join')}
                  />
                ) : (
                  <>
                    <form className="camp-entry-form" onSubmit={submit} aria-busy={cloud.busy}>
                      <div className="camp-entry-field">
                        <label htmlFor="invite-name">Your name</label>
                        <Input id="invite-name" value={view === 'join' && localName ? localName : name}
                          readOnly={view === 'join' && !!localName} onChange={event => setName(event.target.value)}
                          dir="auto" autoComplete={view === 'signin' ? 'username' : 'name'} required maxLength={40} disabled={cloud.busy} />
                        {view === 'join' && localName && <button type="button" className="camp-access-text-action" disabled={cloud.busy} onClick={() => session.signOut()}>Use a different name</button>}
                      </div>
                      {view === 'join' && <div className="camp-entry-field">
                        <label htmlFor="invite-email">Invitation email</label>
                        <Input id="invite-email" type="email" dir="ltr" autoComplete="email" value={email}
                          onChange={event => setEmail(event.target.value)} maxLength={254} disabled={cloud.busy} aria-describedby="invite-email-help" />
                        <small id="invite-email-help">Only needed if your invitation arrived by email.</small>
                      </div>}
                      <div className="camp-entry-field">
                        <label htmlFor="invite-code">{view === 'join' ? 'Invitation code' : 'Recovery code'}</label>
                        <div className="camp-entry-secret">
                          <KeyRound className="camp-entry-key" size={18} aria-hidden="true" />
                          <Input id="invite-code" type={visible ? 'text' : 'password'} value={code}
                            onChange={event => { setCode(event.target.value); setFailed(false); }} dir="ltr"
                            autoComplete={view === 'signin' ? 'current-password' : 'one-time-code'}
                            autoCapitalize="none" spellCheck={false} required maxLength={80} disabled={cloud.busy}
                            aria-describedby={failed && cloud.message ? 'entry-code-help entry-auth-error' : 'entry-code-help'} aria-invalid={failed} />
                          <button type="button" aria-label={visible ? 'Hide code' : 'Show code'} onClick={() => setVisible(!visible)} disabled={cloud.busy}>
                            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
                          </button>
                        </div>
                        <small id="entry-code-help">{view === 'join' ? 'Paste the single-use code you received.' : 'Use the code you saved when you created your account.'}</small>
                      </div>
                      {signInError && cloud.message && <p role="alert" className="camp-access-error" id="entry-auth-error">{cloud.message}</p>}
                      <Button type="submit" className="camp-access-submit" disabled={cloud.busy || !session.ready}>
                        {cloud.busy ? 'Opening your account…' : view === 'join' ? 'Create my account' : 'Sign in'}
                        <ArrowRight size={17} aria-hidden="true" />
                      </Button>
                    </form>
                    {trialDays === 7 && view === 'join' && <p className="camp-entry-trial-note">7 days free, then $2 USD per month. No payment details needed to start.</p>}
                    <div className="camp-access-support">
                      <div><span>Need an invitation?</span><button className="camp-access-text-action" type="button" disabled={cloud.busy} onClick={() => change('request')}>Request access <ArrowRight size={14} aria-hidden="true" /></button></div>
                      {view === 'signin' && <details>
                        <summary>Can’t find your recovery code?</summary>
                        <p>Look for your saved EnglishCamp sign-in file. If you’re signed in on another device, open your profile there and choose “Connect with QR code”.</p>
                      </details>}
                    </div>
                  </>
                )}
                {session.storageNotice && <p role="alert" className="camp-access-error">{session.storageNotice}</p>}
              </>
            )}
          </section>
          <AccessIllustration request={view === 'request' || requestSent} />
        </div>
      </div>
    </div>
  );
}
