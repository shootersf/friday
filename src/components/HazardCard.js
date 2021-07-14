const HazardCard = ({ name, free, toughness}) => {
	return (
		<div className="hazard-card">
			<div className="hazard-card-name">{name}</div>
			<div className="hazard-card-free">{free}</div>
			<div className="hazard-card-toughness">{toughness}</div>
		</div>
	)
}

export default HazardCard
