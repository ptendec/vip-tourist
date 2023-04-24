import { getCities } from '@/API/city.service'
import { groupBy, json } from '@/utilities/utilities'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
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

	const grouppedCities = groupBy(cities, city => city.country?.id ?? '')
	return (
		<footer
			className={clsx(
				'w-full border-t border-lightGray mt-10 py-10',
				className,
			)}
		>
			<Container>
				<div className='flex flex-row flex-wrap gap-x-4 gap-y-4'>
					{Object.entries(grouppedCities).map((group, index) => {
						return (
							<div
								key={index}
								className='basis-[calc(20%-16px)] lg:basis-[calc(25%-16px)] md:basis-[calc(50%-16px)]'
							>
								<p className='font-semibold mb-2 flex flex-row'>
									<Image
										width={23.67}
										height={12}
										style={{
											objectFit: 'contain',
										}}
										className='rounded-lg mr-2'
										// @ts-expect-error Ошибка от сервера
										src={`${process.env.NEXT_PUBLIC_API_URL}${group[1][0].country?.flag.url}`}
										alt='Flag'
									/>
									{group[1][0].country?.name}
								</p>
								<div className='flex flex-col'>
									{group[1].map(city => (
										<Link
											href={`/city/${city.id}`}
											key={city.id}
											className='text-sm py-1 font-normal'
										>
											{city.name}
										</Link>
									))}
								</div>
							</div>
						)
					})}
				</div>
			</Container>
		</footer>
	)
}
