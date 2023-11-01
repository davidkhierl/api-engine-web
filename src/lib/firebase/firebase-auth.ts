import { auth } from '@/lib/firebase/firebase'
import { FirebaseAuthError } from '@/lib/firebase/firebase-auth-error'
import {
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  User,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export function onAuthStateChanged(
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined
) {
  return _onAuthStateChanged(auth, nextOrObserver, error, completed)
}

export interface SignInCredentials {
  email: string
  password: string
}

export async function signInWithCredentials(credentials: SignInCredentials) {
  try {
    return await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
  } catch (error: any) {
    throw new FirebaseAuthError(error.code, error.message, error.customData)
  }
}

export async function signOut() {
  try {
    return auth.signOut()
  } catch (error) {
    console.error('Error signing out with Google', error)
  }
}

// export async function signInWithGoogle() {
//   const provider = new GoogleAuthProvider()
//
//   try {
//     await signInWithPopup(auth, provider)
//   } catch (error) {
//     console.error('Error signing in with Google', error)
//   }
// }
