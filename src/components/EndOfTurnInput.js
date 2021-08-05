import React from 'react'

const EndOfTurnInput = ({ turnClick }) => {
	return (
		<div>
			<button onClick={turnClick}>Next Round</button>
		</div>
	)
}

export default EndOfTurnInput
