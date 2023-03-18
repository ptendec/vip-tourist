import { Header } from '@/components/Layout/Header'
import { Panel } from '@/components/Layout/Mobile/Panel'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	children: ReactNode
}

export function Layout({ children }: Props) {
	return (
		<>
			<Toaster />
			<div className='xs:mb-14 min-h-screen 2xl:mt-20 xs:mt-0 mt-0'>
				<Header />
				<main className='h-full'>{children}</main>
				<Panel />
			</div>
		</>
	)
}
