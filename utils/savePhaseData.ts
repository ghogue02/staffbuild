// lib/savePhaseData.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// We'll define a typed supabase client if you have generated types.
// If not, you can omit the <Database> stuff below.
const supabase = createClientComponentClient()

export async function savePhaseData(phase: string, formData: any) {
  // 1. Get current user's ID
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    throw new Error('No user session found')
  }

  // 2. Upsert to workbook_responses
  const { error } = await supabase
    .from('workbook_responses')
    .upsert({
      user_id: session.user.id,
      phase: phase,
      data: formData,
    }, {
      onConflict: 'user_id,phase'
    })

  if (error) {
    throw error
  }
}