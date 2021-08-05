import React from 'react'

const ExilingInput = ({ exilePoints, finishClick }) => {
	return (
		<div>
			<h3>Select Cards to exile. Points remaining: {exilePoints} </h3>
			<button onClick={finishClick} >Finish Exiling</button>
		</div>
	)
}

export default ExilingInput
