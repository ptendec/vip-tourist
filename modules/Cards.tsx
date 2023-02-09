import { components } from '@/API/types/api.types'
import { Card } from '@/components/Layout/Card'
import { useKeenSlider } from 'keen-slider/react'

interface Props {
	title: string
	tours:
		| components['schemas']['Tour'][]
		| components['schemas']['City']['tours']
}

export const Cards = ({ tours, title }: Props) => {
	const [ref] = useKeenSlider<HTMLDivElement>(
		{
			// loop: true,
			mode: 'free-snap',
			slides: {
				spacing: 16,
				perView: 4,
			},
		},
		[
			// add plugins here
		],
	)
	return (
		<div>
			<p className='font-semibold text-lg mb-4 mt-8'>{title}</p>
			<div ref={ref} className='flex flex-row keen-slider overflow-hidden'>
				{tours?.map(tour => (
					<Card className='keen-slider__slide' key={tour.id} tour={tour}></Card>
				))}
			</div>
		</div>
	)
}
