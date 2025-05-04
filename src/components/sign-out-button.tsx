"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignOutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignOut() {
    try {
      setIsLoading(true)
      await signOut({ callbackUrl: "/login" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  )
} 