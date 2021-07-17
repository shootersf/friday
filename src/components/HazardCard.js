import { StyledHazardCard, StyledName, StyledFree, StyledToughness } from "./styles/StyledHazardCard"

const HazardCard = ({ hname, freeCards, toughness, id, onClick}) => {
	// visual cue to user that hazard can be selected todo: border?
	const pointerHazardStyle = {
		cursor: "pointer"
	}

	return (
		<StyledHazardCard style={onClick ? pointerHazardStyle : null} onClick={ () => onClick(id) }>
			<StyledName>{hname}</StyledName>
			<StyledFree>{freeCards}</StyledFree>
			<StyledToughness>{toughness}</StyledToughness>
		</StyledHazardCard>
	)
}

export default HazardCard
