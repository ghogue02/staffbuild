import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function checkAuth() {
  const supabase = createClientComponentClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}