// utils/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface AuthHook {
  session: Session | null;
  isLoading: boolean; // Rename loading to isLoading for clarity
  fetchData: (phase: string, setDataCallback: (data: any) => void) => Promise<void>;
}

export function useAuth(): AuthHook {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const fetchData = useCallback(
    async (phase: string, setDataCallback: (data: any) => void) => {
      // Wait for the session to be available
      if (!session) {
        console.log('No session found in fetchData. Waiting...');
        return;
      }

      const { data, error } = await supabase
        .from('workbook_responses')
        .select('data')
        .eq('phase', phase)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately (e.g., set an error state)
        return;
      }

      if (data && data.length > 0) {
        setDataCallback(data[0].data);
      } else {
        console.log('No existing data found for this phase.');
      }
    },
    [session, supabase]
  );

  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true); // Ensure isLoading is true initially
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);

        if (!session) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Handle error (e.g., redirect to an error page)
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, [supabase, router]);

  return { session, isLoading, fetchData };
}