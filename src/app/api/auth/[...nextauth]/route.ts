import { GET as authGet, POST as authPost } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    return await authGet(request)
  } catch (error) {
    console.error('Auth GET error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    return await authPost(request)
  } catch (error) {
    console.error('Auth POST error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
} 