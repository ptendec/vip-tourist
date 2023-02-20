import { components } from '@/API/types/api.types'
import { Card } from '@/components/Layout/Card'

interface Props {
	title?: string | null
	tours:
		| components['schemas']['Tour'][]
		| components['schemas']['City']['tours']
}

export const Cards = ({ tours, title }: Props) => {
	return (
		<div>
			{title && <p className='font-semibold text-lg mb-4 mt-8'>{title}</p>}
			<div className='flex flex-row flex-wrap overflow-hidden gap-x-5 xs:justify-center'>
				{tours?.map(tour => (
					<Card className='' key={tour.id} tour={tour}></Card>
				))}
			</div>
		</div>
	)
}
