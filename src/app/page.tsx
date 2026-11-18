import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EntryHeader } from '@/components/session/EntryHeader';
import { Button } from '@/components/ui/shadcn/button';
import { WelcomeWorld } from '@/components/brand/WelcomeWorld';
import './welcome.css';

export default function WelcomePage() {
  return (
    <div className="camp-entry-auth camp-public-welcome">
      <EntryHeader />
      <section className="camp-welcome-layout" aria-labelledby="welcome-heading">
        <WelcomeWorld />
        <div className="camp-welcome-copy">
          <h1 id="welcome-heading">Find your voice <span>in English.</span></h1>
          <p className="camp-welcome-description">Practise real conversations and build your English, one short lesson at a time.</p>
          <div className="camp-welcome-ctas">
            <Button asChild>
              <Link className="camp-welcome-primary" href="/invite?view=request">
                Request access
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link className="camp-welcome-secondary" href="/invite?view=signin&next=/learning-home" aria-describedby="welcome-code-note">
                Let’s do it
              </Link>
            </Button>
          </div>
          <p className="camp-welcome-hint" id="welcome-code-note">Use your invitation or recovery code.</p>
        </div>
      </section>
    </div>
  );
}
