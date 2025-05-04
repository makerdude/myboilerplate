import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // TODO: Replace this with your actual authentication logic
  // This is just a placeholder
  const isValidUser = email === 'admin@example.com' && password === 'password'

  if (!isValidUser) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Set the auth cookie
  const response = NextResponse.json({ success: true })
  response.cookies.set('auth', 'your_token_here', {
    httpOnly: true,
    path: '/',
    // secure: true, // Uncomment this in production
    // sameSite: 'strict', // Optional, for extra security
  })

  return response
} 