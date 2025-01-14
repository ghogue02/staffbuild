import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function savePhaseData(phase: string, formData: any) {
  try {
    // 1. Get current user's ID
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      throw new Error('Error fetching session: ' + sessionError.message)
    }

    if (!session?.user) {
      throw new Error('Please sign in to save your progress')
    }

    // 2. Upsert to workbook_responses
    const { error: upsertError } = await supabase
      .from('workbook_responses')
      .upsert(
        {
          user_id: session.user.id,
          phase: phase,
          data: formData,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'user_id,phase'
        }
      )

    if (upsertError) {
      console.error('Upsert error:', upsertError)
      throw new Error('Failed to save your responses: ' + upsertError.message)
    }

    return { success: true }
  } catch (error) {
    console.error('SavePhaseData error:', error)
    throw error
  }
}