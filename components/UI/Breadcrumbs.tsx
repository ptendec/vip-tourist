import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'
import { Tooltip } from 'react-tooltip'
import { Breadcrumb } from 'utilities/interfaces'

interface Props {
	breadcrumbs: Breadcrumb[]
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
	return (
		<>
			<Tooltip
				anchorId='main'
				content='Перейти на главную'
				place='bottom'
				noArrow
			/>

			<div className='flex items-center'>
				{breadcrumbs.map((breadcrumb, index) => (
					<Fragment key={index}>
						<Link
							id='main'
							className={clsx(
								breadcrumbs.length - 1 !== index
									? 'text-gray'
									: 'text-lightDark',
								'font-semibold text-xs',
							)}
							key={index}
							href={breadcrumb.href ?? '/'}
						>
							{breadcrumb.name}
						</Link>
						{breadcrumbs.length - 1 !== index && (
							<Icon
								className='translate-y-[2px]'
								path={mdiChevronRight}
								size={0.7}
								color='#BFBFBF'
							/>
						)}
					</Fragment>
				))}
			</div>
		</>
	)
}
