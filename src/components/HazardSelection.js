import HazardCard from "./HazardCard";

const HazardSelection = ({ options , onClick }) => {
	if (options.length > 0)
	{
		return (
		<div className="hazard-options">
			<h3> Select the next hazard:</h3>
			<section style={{display:"flex"}}>
				<HazardCard {...options[0]} onClick={onClick}/>
				<HazardCard {...options[1]} onClick={onClick}/>
			</section>
		</div>
		)
	}
	else
	{
		return null;
	}

}

export default HazardSelection;