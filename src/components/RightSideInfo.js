import Deck from './Deck'

const RightSideInfo = ({ deckSize, discardSize, free, toughnessRemaining, fighting}) => {
	return (
		<div>
			<Deck name="Hazard" count={deckSize} />
			<Deck name="Hazard Discard" count={discardSize} />
			<h3> Free cards remaining: {fighting ? free : "-"}</h3>
			<h3> Toughness remaining: {fighting ? toughnessRemaining : "-"}</h3>
		</div>
	)
}

export default RightSideInfo
