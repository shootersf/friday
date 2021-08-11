import PropTypes from 'prop-types'
import { StyledFightingCard, StyledName, StyledPower } from './styles/StyledFightingCard'


const FightingCard = ({ name, power, id, ability, exileCost, tapped, selected, onClick, faceDown }) => {
	return (
		<StyledFightingCard  onClick={() => onClick && onClick(id, ability, exileCost)} tapped={tapped} selected={selected}>
			<StyledName >{(faceDown) ? "facedown" : name}</StyledName>
			<StyledPower>{(faceDown) ? 0 :power}</StyledPower>
		</StyledFightingCard>
	)
}

FightingCard.propTypes = {
	name: PropTypes.string,
}

export default FightingCard
