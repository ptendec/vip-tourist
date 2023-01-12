import { components } from '@/API/types/api.types'
import { Review } from '@/components/Tour/Review'

interface Props {
	reviews: components['schemas']['Tour']['reviews']
}

export const Reviews = ({ reviews }: Props) => {
	return (
		<div>
			<p>Отзывы ({reviews?.length})</p>
			<div>
				{reviews?.map(review => (
					<Review key={review.id} review={review} />
				))}
			</div>
		</div>
	)
}
