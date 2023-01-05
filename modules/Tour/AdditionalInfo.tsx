import { Article } from '@/components/Tour/Article'
import { Fragment } from 'react'
import { AdditionalInfo as AdditionalInfoInterface } from 'utilities/interfaces'

interface Props {
	additionalInfos: AdditionalInfoInterface[]
}

export const AdditionalInfo = ({ additionalInfos }: Props) => {
	return (
		<div className='mt-8'>
			{additionalInfos.map(additionalInfo => (
				<Fragment key={additionalInfo.id}>
					<Article
						title={additionalInfo.title}
						description={additionalInfo.description}
					/>
					<div className='my-8 w-full h-[1px] bg-lightGray' />
				</Fragment>
			))}
		</div>
	)
}
