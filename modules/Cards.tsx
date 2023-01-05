import { Tour } from '@/API/types/Tour'
import { Card } from '@/components/Layout/Card'

interface Props {
	title: string
	tours: Tour[]
}

export const Cards = ({ tours, title }: Props) => {
	return (
		<div>
			<p className='font-semibold text-lg mb-4 mt-8'>{title}</p>
			<div className='flex flex-row gap-4'>
				{tours?.map(tour => (
					<Card key={tour.id} tour={tour}></Card>
				))}
			</div>
		</div>
	)
}
