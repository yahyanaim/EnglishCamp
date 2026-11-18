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
          <p className="camp-welcome-label">English practice for real life</p>
          <h1 id="welcome-heading">Find your voice <span>in English.</span></h1>
          <p>Build confidence with short lessons, everyday conversations and practice from A1 to B2.</p>
          <div className="camp-welcome-ctas">
            <Button asChild><Link href="/invite?view=request">Request access <ArrowRight aria-hidden="true" size={18}/></Link></Button>
            <Button asChild variant="outline"><Link href="/invite?view=signin&next=/learning-home">Let’s do it</Link></Button>
          </div>
          <p className="camp-welcome-hint">Already have an invitation or a recovery code? Choose “Let’s do it”.</p>
        </div>
      </section>
    </div>
  );
}
