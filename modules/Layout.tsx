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
			<div className='xs:mb-14 min-h-screen'>
				<main className='h-full'>{children}</main>
				<Panel />
			</div>
		</>
	)
}
