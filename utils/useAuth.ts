// utils/useAuth.ts
import { useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSessionContext } from './SessionContext'; // Import useSessionContext

interface AuthHook {
  isLoading: boolean;
  fetchData: (phase: string, setDataCallback: (data: any) => void) => Promise<void>;
}

export function useAuth(): AuthHook {
  const { session, isLoading } = useSessionContext(); // Get session from context
  const supabase = createClientComponentClient();

  const fetchData = useCallback(
    async (phase: string, setDataCallback: (data: any) => void) => {
      // No need to check for session here, it's guaranteed by the context
      const { data, error } = await supabase
        .from('workbook_responses')
        .select('data')
        .eq('phase', phase)
        .eq('user_id', session!.user.id); // We can safely use ! here

      if (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
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

  return { isLoading, fetchData };
}