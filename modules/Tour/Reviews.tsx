interface Props {
	a: string
}

export const Review = ({ a }: Props) => {
	return (
		<div>
			<p>Отзывы (6)</p>
			<div>
				<Review a={''} />
			</div>
		</div>
	)
}
