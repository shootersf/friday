const Deck = ({ name, count}) => {
	return (
		<div className="deck">
			<p>{name} Deck</p>
			<p>{count}</p>
		</div>
	)
}

export default Deck;