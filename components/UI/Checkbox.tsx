import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from '@mdi/js'
import Icon from '@mdi/react'
import { useState } from 'react'
import { animated, useSpring, config, useSpringRef } from 'react-spring'

interface Props {
	checked: boolean
	onChange: (state: boolean) => void
}

export const Checkbox = ({ checked, onChange }: Props) => {
	return (
		<label className=''>
			<input
				type='checkbox'
				onChange={() => {
					onChange(!checked)
				}}
			/>
			{checked ? (
				<Icon path={mdiCheckboxMarked} size={1} color='#86A545' />
			) : (
				<Icon path={mdiCheckboxBlankOutline} size={1} color='#BFBFBF' />
			)}
		</label>
	)
}

export default Checkbox
