import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { AuthUserProvider } from 'context/AuthContext'
import { usePreserveScroll } from 'hooks/usePreserveScroll'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import '../public/font/fonts.css'
import '../styles/globals.css'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
	const [queryClient] = useState(() => new QueryClient())
	const getLayout = Component.getLayout ?? (page => page)
	usePreserveScroll()
	// const { addTour, tours } = useDraftStore()
	// console.log(tours)
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<AuthUserProvider>
					{getLayout(<Component {...pageProps} />)}
				</AuthUserProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}

export default appWithTranslation(App)
