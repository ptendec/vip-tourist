import { Footer } from '@/components/Layout/Footer'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Container } from '@/components/UI/Container'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const Wrapper = ({ children }: Props) => {
	return (
		<div className='flex'>
			<Sidebar className='basis-64 shrink-0'></Sidebar>
			<div className=' mx-auto w-full'>
				{children}
				<Container>
					<Footer />
				</Container>
			</div>
		</div>
	)
}
