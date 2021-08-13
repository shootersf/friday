import React from 'react'

const BonusCardInput = ({ text, onClick, skipEnabled, skipClick}) => {
	return (
		<div>
			<h3>{text}</h3>
			<button onClick={onClick}>Draw</button>
			{ skipEnabled && <button onClick={skipClick}>Skip</button> }
		</div>
	)
}

export default BonusCardInput
