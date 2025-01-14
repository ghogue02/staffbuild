import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export async function savePhaseData(phase: string, formData: any) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData?.user) {
    // Redirect to login instead of throwing an error
    router.push('/login'); 
    return; // Stop execution
  }

  const { error: saveError } = await supabase
    .from('workbook_responses')
    .upsert(
      {
        user_id: authData.user.id,
        phase: phase,
        data: formData,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'user_id,phase'
      }
    )

  if (saveError) {
    console.error('Save error:', saveError)
    throw new Error('Failed to save your responses')
  }

  return { success: true }
}