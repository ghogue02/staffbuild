'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function signIn(formData: FormData) {
  try {
    console.log('Server: Creating Supabase client...')
    const supabase = await createClient()

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    console.log('Server: Attempting sign in...')
    const { data: signInData, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.error('Server: Sign in error:', error)
      return { error: error.message }
    }

    console.log('Server: Sign in successful:', signInData)
    revalidatePath('/', 'layout')
    return { error: null }
  } catch (error) {
    console.error('Server: Unexpected error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signUp(formData: FormData) {
  try {
    const supabase = await createClient()

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    console.log('Server: Attempting sign up...')
    const { data: signUpData, error } = await supabase.auth.signUp(data)

    if (error) {
      console.error('Server: Sign up error:', error)
      return { error: error.message }
    }

    console.log('Server: Sign up successful:', signUpData)
    revalidatePath('/', 'layout')
    return { error: null }
  } catch (error) {
    console.error('Server: Unexpected error:', error)
    return { error: 'An unexpected error occurred' }
  }
}