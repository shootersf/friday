import { StyledDeck } from "./styles/StyledDeck";

const Deck = ({ name, count, background}) => {
	return (
		<StyledDeck background={background}>
			<p>{name} Deck</p>
			<p>{count}</p>
		</StyledDeck>
	)
}

export default Deck;