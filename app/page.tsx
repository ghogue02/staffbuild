'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function RootPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/homepage')
      } else {
        router.push('/login')
      }
    }

    checkSession()
  }, [router, supabase])

  // Show loading state while checking session
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    </div>
  )
}