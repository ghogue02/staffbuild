// app/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import '../styles/globals.css' // Or your global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createClientComponentClient());
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return <Component {...pageProps} session={session} />;
}

export default MyApp;