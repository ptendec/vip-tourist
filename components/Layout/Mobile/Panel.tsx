import NoSSR from '@/components/Common/NoSSR'
import { mdiAccountCircle, mdiBell, mdiBook, mdiHeart, mdiHome } from '@mdi/js'
import { PanelLink } from './Link'

const list = [
	{
		id: 1,
		icon: mdiHome,
		label: 'home',
		href: '/',
	},
	{
		id: 2,
		icon: mdiHeart,
		label: 'wishlist',
		href: '/favourites',
	},
	{
		id: 3,
		icon: mdiBook,
		label: 'booking',
		href: '/tourist/orders',
	},
	{
		id: 4,
		icon: mdiBell,
		label: 'notification',
		href: '/notifications',
	},
	{
		id: 5,
		icon: mdiAccountCircle,
		label: 'profile',
		href: '/profile',
	},
]

export const Panel = () => {
	return (
		<NoSSR>
			<div className='h-14 w-full bg-light hidden xs:flex fixed justify-center items-center bottom-0 z-40 border-t border-lightGray shadow-md transition-all duration-200 ease-in-out'>
				{list.map(({ id, href, icon, label }) => (
					<PanelLink
						key={id}
						icon={icon}
						label={label}
						href={href}
						className='flex flex-col items-center'
					/>
				))}
			</div>
		</NoSSR>
	)
}
