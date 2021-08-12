import PropTypes from 'prop-types'
import { StyledFightingCard, StyledName, StyledPower } from './styles/StyledFightingCard'


const FightingCard = ({ name, power, id, ability, exileCost, tapped, selected, onClick, faceDown, doubled }) => {
	// Calculate what power to show
	let displayedPower;
	displayedPower = (doubled) ? `${power} x2` : power;
	// Facedown overrides double
	displayedPower = (faceDown) ? 0 : displayedPower;

	return (
		<StyledFightingCard  onClick={() => onClick && onClick(id, ability, exileCost)} tapped={tapped} selected={selected}>
			<StyledName >{(faceDown) ? "facedown" : name}</StyledName>
			<StyledPower>{displayedPower}</StyledPower>
		</StyledFightingCard>
	)
}

FightingCard.propTypes = {
	name: PropTypes.string,
}

export default FightingCard
