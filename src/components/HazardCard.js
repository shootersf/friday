import FightingCard from "./FightingCard"
import { StyledWrapper, StyledHazardCard, StyledName, StyledFree, StyledToughness } from "./styles/StyledHazardCard"

const HazardCard = ({ name, power, hname, freeCards, toughness, id, onClick}) => {
	// visual cue to user that hazard can be selected todo: border?
	const pointerHazardStyle = {
		cursor: "pointer"
	}

	return (
		<StyledWrapper>
			<StyledHazardCard style={onClick ? pointerHazardStyle : null} onClick={ () => onClick(id) }>
				<StyledName>{hname}</StyledName>
				<StyledFree>{freeCards}</StyledFree>
				<StyledToughness>{toughness}</StyledToughness>
			</StyledHazardCard>
			<FightingCard name={name} power={power} />
		</StyledWrapper>
	)
}

export default HazardCard
