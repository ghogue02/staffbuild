import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function savePhaseData(phase: string, formData: any) {
  const supabase = createClientComponentClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData?.user) {
    window.location.href = '/login'
    throw new Error('Please sign in to save your progress')
  }

  const { error: saveError } = await supabase
    .from('workbook_responses')
    .upsert({
      user_id: authData.user.id,
      phase: phase,
      data: formData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,phase'
    })

  if (saveError) {
    console.error('Save error:', saveError)
    throw new Error('Failed to save your responses')
  }

  return { success: true }
}