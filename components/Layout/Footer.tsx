import { getCities } from '@/API/city.service'
import { json } from '@/utilities/utilities'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '../UI/Container'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['cities'], () =>
		getCities({ locale: context.locale as string }),
	)
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
			dehydratedState: json(dehydrate(queryClient)),
		},
	}
}

interface Props {
	className?: string
}

export const Footer = ({ className }: Props) => {
	const { t } = useTranslation()
	const { locale } = useRouter()

	const {
		data: cities,
		isLoading: isCitiesLoading,
		isError: isCitiesError,
	} = useQuery(['cities'], () => getCities({ locale: locale as string }))

	if (isCitiesLoading) return <>Loading...</>
	if (isCitiesError) return <>Error!</>

	return (
		<footer
			className={clsx(
				'w-full border-t border-lightGray mt-10 py-10',
				className,
			)}
		>
			<Container className=''>
				<p className='font-medium capitalize mb-3'>{t('cities')}</p>
				<div className='flex flex-row flex-wrap gap-x-4 gap-y-2'>
					{cities?.map(city => (
						<Link
							href={`/city/${city.id}`}
							key={city.id}
							className='text-sm py-1 font-normal'
						>
							{city.name}
						</Link>
					))}
				</div>
			</Container>
		</footer>
	)
}
