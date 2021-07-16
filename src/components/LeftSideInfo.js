import Deck from './Deck'

const LeftSideInfo = ({ deckSize, discardSize, remainingLives }) => {
	return (
		<div>
			<Deck name="Player" count={deckSize} background="MediumSpringGreen" />
			<Deck name="Player Discard" count={discardSize} background="MediumSpringGreen" />
			<h3> Lives remaining: {remainingLives}</h3>
		</div>
	)
}

export default LeftSideInfo
