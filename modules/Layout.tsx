import { ReactNode } from 'react'
import useWindowDimensions from '@/hooks/useWindowDimensions'

interface Props {
	children: ReactNode
}

export function Layout({ children }: Props) {
	const { width } = useWindowDimensions()
	return <main className='flex-1 flex flex-col'>{children}</main>
}
