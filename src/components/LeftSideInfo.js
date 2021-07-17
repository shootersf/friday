import Deck from './Deck'
import { StyledLeftSideInfo } from './styles/StyledLeftSideInfo'

const LeftSideInfo = ({ deckSize, discardSize, remainingLives }) => {
	return (
		<StyledLeftSideInfo>
			<Deck name="Player" count={deckSize} background="MediumSpringGreen" />
			<Deck name="Player Discard" count={discardSize} background="MediumSpringGreen" />
			<h3> Lives remaining: {remainingLives}</h3>
		</StyledLeftSideInfo>
	)
}

export default LeftSideInfo
