import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function SignInPage() {
  const session = await auth()
  
  // If the user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard')
  }

  // Redirect to Google OAuth
  redirect('/api/auth/signin/google')
} 