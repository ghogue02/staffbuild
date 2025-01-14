// utils/SessionContext.tsx
import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
  } from 'react';
  import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
  import { useRouter } from 'next/navigation';
  
  interface SessionContextType {
    session: Session | null;
    isLoading: boolean; // Indicates if the session is still loading
    setSession: Dispatch<SetStateAction<Session | null>>;
  }
  
  const SessionContext = createContext<SessionContextType | undefined>(undefined);
  
  export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const supabase = createClientComponentClient();
    const router = useRouter();
  
    useEffect(() => {
      async function initializeSession() {
        setIsLoading(true);
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          setSession(session);
  
          if (!session) {
            router.push('/login');
          }
        } catch (error) {
          console.error('Error initializing session:', error);
          // Handle error appropriately (e.g., redirect to error page)
        } finally {
          setIsLoading(false);
        }
      }
  
      initializeSession();
    }, [supabase, router]);
  
    return (
      <SessionContext.Provider value={{ session, isLoading, setSession }}>
        {children}
      </SessionContext.Provider>
    );
  };
  
  // Custom hook to use the session context
  export const useSessionContext = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
      throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
  };