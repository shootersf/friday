import React from 'react'

const SelectionAbilityInput = ({ text, selected, skipEnabled, onClick, skipClick}) => {
	return (
		<div>
			<h3>{text}</h3>
			<button disabled={selected.length === 0} onClick={onClick}>Use Ability</button>
			{ skipEnabled && <button onClick={skipClick}>Skip</button>}
		</div>
	)
}

export default SelectionAbilityInput
