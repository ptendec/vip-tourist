import { mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Container } from '../UI/Container'
import { Sidebar } from './Tablet/Sidebar'

export const Header = () => {
	const { t } = useTranslation()
	const [isVisible, setIsVisible] = useState(false)
	return (
		<>
			<Sidebar isVisible={isVisible} onClose={() => setIsVisible(false)} />
			<header className='2xl:flex xs:hidden hidden h-20 bg-white w-full fixed top-0 z-10 items-center'>
				<Container className='mx-auto flex flex-row justify-between'>
					<Link href='/' className=''>
						<span className='relative flex justify-center'>
							<Image
								src='/images/logo.svg'
								width={162}
								height={32}
								alt='VipTourist'
							/>
						</span>
					</Link>
					<button
						onClick={() => setIsVisible(prevState => !prevState)}
						className='relative flex items-center border-gray border bg-white rounded-lg px-4 py-2 text-sm font-semibold basis-auto shrink-0'
					>
						<Icon path={mdiMenu} size={1} color='#86A545' />
					</button>
				</Container>
			</header>
		</>
	)
}
