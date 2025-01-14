import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function savePhaseData(phase: string, formData: any) {
  const supabase = createClientComponentClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    throw new Error('You must be logged in to save data');
  }

  const { error: saveError } = await supabase
    .from('workbook_responses')
    .upsert(
      {
        user_id: authData.user.id,
        phase: phase,
        data: formData,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,phase'
      }
    );

  if (saveError) {
    console.error('Save error:', saveError);
    throw new Error('Failed to save your responses');
  }

  return { success: true };
}