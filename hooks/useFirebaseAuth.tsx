import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { User } from 'utilities/interfaces'
import { auth } from '../config/firebase'

export const useFirebaseAuth = () => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authState => {
			if (!authState) {
				setUser(null)
				setLoading(false)
				return
			}

			setLoading(true)
			setUser({ uid: authState.uid, email: authState.email as string })
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	return {
		user,
		loading,
	}
}
