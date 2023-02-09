import dynamic from 'next/dynamic'
import { Fragment, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const NoSSR = ({ children }: Props) => <Fragment>{children}</Fragment>

export default dynamic(() => Promise.resolve(NoSSR), {
	ssr: false,
})
