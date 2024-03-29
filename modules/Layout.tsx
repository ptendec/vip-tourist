import { Header } from '@/components/Layout/Header'
import { Panel } from '@/components/Layout/Mobile/Panel'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	children: ReactNode
}

export function Layout({ children }: Props) {
	return (
		<>
			<Head>
				<link
					rel='apple-touch-icon'
					sizes='152x152'
					href='/favicon/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon/favicon-16x16.png'
				/>
				<link rel='manifest' href='/favicon/site.webmanifest' />
				<link
					rel='mask-icon'
					href='/favicon/safari-pinned-tab.svg'
					color='#5bbad5'
				/>
				<link rel='shortcut icon' href='/favicon/favicon.ico' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta
					name='msapplication-config'
					content='/favicon/browserconfig.xml'
				/>
				<meta name='theme-color' content='#ffffff'></meta>
			</Head>
			<Toaster />
			<div className='xs:mb-14 min-h-screen 2xl:mt-20 xs:mt-0 mt-0'>
				<Header />
				<main className='h-full'>{children}</main>
				<Panel />
			</div>
		</>
	)
}
