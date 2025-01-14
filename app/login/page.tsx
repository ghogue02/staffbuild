"use client"
import Link from "next/link"
import { SubmitButton } from "./submit-button"
import { signIn, signUp } from "./actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Starting sign in process...')
      const result = await signIn(formData)
      console.log('Sign in result:', result)
      
      if (result?.error) {
        console.log('Error during sign in:', result.error)
        setError(result.error)
        return
      }
      
      console.log('Sign in successful, redirecting...')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.error('Unexpected error during sign in:', error)
      setError(error?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    try {
      const result = await signUp(formData)
      if (result?.error) {
        setError(result.error)
        return
      }
      router.push('/')
      router.refresh()
    } catch (error: any) {
      setError(error?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
          autoComplete="email"
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          minLength={6}
        />
        <SubmitButton
          formAction={handleSignIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </SubmitButton>
        <SubmitButton
          formAction={handleSignUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}