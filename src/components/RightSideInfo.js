import Deck from './Deck'
import { StyledRightSideInfo } from './styles/StyledRightSideInfo'

const RightSideInfo = ({ deckSize, discardSize, freeCardsRemaining, toughnessRemaining, fighting}) => {
	return (
		<StyledRightSideInfo>
			<Deck name="Hazard" count={deckSize} />
			<Deck name="Hazard Discard" count={discardSize} />
			<h3> Free cards remaining: {fighting ? freeCardsRemaining : "-"}</h3>
			<h3> Toughness remaining: {fighting ? toughnessRemaining : "-"}</h3>
		</StyledRightSideInfo>
	)
}

export default RightSideInfo
