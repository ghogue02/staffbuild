// utils/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface AuthHook {
  session: Session | null;
  loading: boolean;
  fetchData: (phase: string, setDataCallback: (data: any) => void) => Promise<void>; // Add fetchData
}

export function useAuth(): AuthHook {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const fetchData = useCallback(async (phase: string, setDataCallback: (data: any) => void) => {
    if (!session) {
      console.log('No session found in fetchData');
      return;
    }

    const { data, error } = await supabase
      .from('workbook_responses')
      .select('data')
      .eq('phase', phase)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately, e.g., set an error state
      return;
    }

    if (data && data.length > 0) {
      setDataCallback(data[0].data);
    } else {
      console.log('No existing data found for this phase.');
    }
  }, [session, supabase]);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        router.push('/login');
      }
    }

    getSession();
  }, [supabase, router]);

  return { session, loading, fetchData };
}