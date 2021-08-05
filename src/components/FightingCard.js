import PropTypes from 'prop-types'
import { StyledFightingCard, StyledName, StyledPower } from './styles/StyledFightingCard'


const FightingCard = ({ name, power, id, exileCost, tapped, selected, onClick }) => {
	return (
		<StyledFightingCard  onClick={() => onClick && onClick(id, exileCost)} tapped={tapped} selected={selected}>
			<StyledName >{name}</StyledName>
			<StyledPower>{power}</StyledPower>
		</StyledFightingCard>
	)
}

FightingCard.propTypes = {
	name: PropTypes.string,
}

export default FightingCard
