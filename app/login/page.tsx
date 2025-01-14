import Link from "next/link"
import { SubmitButton } from "./submit-button"
import { signIn, signUp } from "./actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter()

  async function handleSignIn(formData: FormData) {
    try {
      const result = await signIn(formData)
      if (result?.error) {
        throw new Error(result.error)
      }
      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.error('Sign in error:', error)
      // Error will be shown via searchParams.message
    }
  }

  async function handleSignUp(formData: FormData) {
    try {
      const result = await signUp(formData)
      if (result?.error) {
        throw new Error(result.error)
      }
      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.error('Sign up error:', error)
      // Error will be shown via searchParams.message
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

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
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
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={handleSignUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
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