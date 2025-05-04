import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Debug logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth Configuration:')
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set')
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set')
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set')
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set')
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set')
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set')
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return true
      }
      return false
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('Sign in event:', { user, account, profile })
    },
    async signOut() {
      console.log('Sign out event')
    }
  },
  trustHost: true
}) 