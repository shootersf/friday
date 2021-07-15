import Deck from './Deck'

const LeftSideInfo = ({ deckSize, discardSize, remainingLives }) => {
	return (
		<div>
			<Deck name="Player" count={deckSize} />
			<Deck name="Player Discard" count={discardSize} />
			<h3> Lives remaining: {remainingLives}</h3>
		</div>
	)
}

export default LeftSideInfo
