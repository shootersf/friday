const HazardCard = ({ name, freeCards, toughness, id, onClick}) => {
	// visual cue to user that hazard can be selected todo: border?
	const pointerHazardStyle = {
		cursor: "pointer"
	}

	return (
		<div className="hazard-card" style={onClick ? pointerHazardStyle : null} onClick={ () => onClick(id) }>
			<div className="hazard-card-name">{name}</div>
			<div className="hazard-card-free">{freeCards}</div>
			<div className="hazard-card-toughness">{toughness}</div>
		</div>
	)
}

export default HazardCard
