'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Attempting sign in with:', { email: data.email })

  const { data: signInData, error } = await supabase.auth.signInWithPassword(data)

  console.log('Sign in response:', { data: signInData, error })

  if (error) {
    console.error('Sign in error:', error)
    return {
      error: error.message
    }
  }

  revalidatePath('/', 'layout')
  return { error: null }
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Attempting sign up with:', { email: data.email })

  const { data: signUpData, error } = await supabase.auth.signUp(data)

  console.log('Sign up response:', { data: signUpData, error })

  if (error) {
    console.error('Sign up error:', error)
    return {
      error: error.message
    }
  }

  revalidatePath('/', 'layout')
  return { error: null }
}