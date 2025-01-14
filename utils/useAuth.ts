// utils/useAuth.ts
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)

      if (!session) {
        router.push('/login')
      }
    }

    getSession()
  }, [supabase, router])

  return { session, loading }
}