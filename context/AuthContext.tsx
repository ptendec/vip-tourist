import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { createContext, useContext, Context, ReactNode } from 'react'
import { AuthContext } from 'utilities/interfaces'

interface Props {
	children: ReactNode
}

const AuthUserContext = createContext<AuthContext>({
	user: null,
	loading: true,
})

export const AuthUserProvider = ({ children }: Props) => {
	const auth = useFirebaseAuth()

	return (
		<AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
	)
}
export const useAuth = () => useContext(AuthUserContext)
