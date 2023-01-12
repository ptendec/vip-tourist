import { components } from '@/API/types/api.types'
import { City } from '@/API/types/City'
import { Town } from '@/components/Layout/Town'
import { useKeenSlider } from 'keen-slider/react'

interface Props {
	cities: components['schemas']['City'][]
}

export const Towns = ({ cities }: Props) => {
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
			<p className='font-semibold text-lg mb-4 mt-8'>Города</p>
			<div ref={ref} className='flex flex-row keen-slider overflow-hidden'>
				{cities.map(city => (
					<Town className='keen-slider__slide' key={city.id} city={city} />
				))}
			</div>
		</div>
	)
}
