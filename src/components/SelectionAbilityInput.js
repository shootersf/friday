import React from 'react'

const SelectionAbilityInput = ({ text, selected, onClick}) => {
	return (
		<div>
			<h3>{text}</h3>
			<button disabled={selected.length === 0} onClick={onClick}>Use Ability</button>
		</div>
	)
}

export default SelectionAbilityInput
