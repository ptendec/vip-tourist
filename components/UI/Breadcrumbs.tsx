import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ComponentPropsWithoutRef, Fragment } from 'react'
import { Tooltip } from 'react-tooltip'
import { Breadcrumb } from 'utilities/interfaces'

interface Props extends ComponentPropsWithoutRef<'div'> {
	breadcrumbs: Breadcrumb[]
}

export const Breadcrumbs = ({ breadcrumbs, className }: Props) => {
	const { t } = useTranslation()
	return (
		<>
			<Tooltip
				anchorId='main'
				content='Перейти на главную'
				place='bottom'
				noArrow
				delayShow={200}
			/>

			<div className={clsx('flex items-center', className)}>
				{breadcrumbs.map((breadcrumb, index) => (
					<Fragment key={index}>
						<Link
							id='main'
							className={clsx(
								breadcrumbs.length - 1 !== index
									? 'text-gray'
									: 'text-lightDark',
								'font-semibold text-xs truncate',
							)}
							key={index}
							href={breadcrumb.href ?? '/'}
						>
							{t(breadcrumb.name ?? '')}
						</Link>
						{breadcrumbs.length - 1 !== index && (
							<Icon
								className='mt-auto'
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
