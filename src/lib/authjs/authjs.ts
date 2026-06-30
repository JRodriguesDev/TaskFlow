import nextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const {handlers, signIn, signOut, auth} = nextAuth({
  providers: [Google]
})