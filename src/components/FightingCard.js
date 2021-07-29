import PropTypes from 'prop-types'


const FightingCard = ({ name, power }) => {
	return (
		<div className="fight-card">
			<div className="fight-card-name">{name}</div>
			<div className="fight-card-power">{power}</div>
		</div>
	)
}

FightingCard.propTypes = {
	name: PropTypes.string,
}

export default FightingCard
