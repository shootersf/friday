import Deck from './Deck'
import { StyledRightSideInfo } from './styles/StyledRightSideInfo'
import styled from 'styled-components'
import { phaseColours } from '../constants'


// Phase circle
const PhaseCircle = styled.div`
	background: ${props => props.colour};
	width: 2em;
	height: 2em;
	border-radius: 50%;
`

const RightSideInfo = ({ deckSize, discardSize, freeCardsRemaining, toughnessRemaining, fighting, phase, phaseModifier}) => {

	

	return (
		<StyledRightSideInfo>
			<Deck name="Hazard" count={deckSize} />
			<Deck name="Hazard Discard" count={discardSize} />
			<h3> Free cards remaining: {fighting ? freeCardsRemaining : "-"}</h3>
			<h3> Toughness remaining: {fighting ? toughnessRemaining : "-"}</h3>
			<h3> Current phase:</h3>
			<PhaseCircle colour={phaseColours[phase]}/>
		</StyledRightSideInfo>
	)
}

export default RightSideInfo
