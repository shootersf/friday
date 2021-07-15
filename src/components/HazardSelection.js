import HazardCard from "./HazardCard";

const HazardSelection = ({ options , onClick }) => {
	console.log(options);
	if (options.length > 0)
	{
		return (
		<div className="hazard-options">
			<h3> Select the next hazard:</h3>
			<HazardCard {...options[0]} onClick={onClick}/>
			<HazardCard {...options[1]} onClick={onClick}/>
		</div>
		)
	}
	else
	{
		return null;
	}

}

export default HazardSelection;