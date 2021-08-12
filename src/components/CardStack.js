import React from 'react'
import { StyledCardStack } from './styles/StyledCardStack'
import FightingCard from './FightingCard'

const CardStack = ({ cards, fightCardClick, tapped, selected, faceDown, doubled }) => {

	return (
		<StyledCardStack>
			{cards.map( card => {
				const id = card.id;
				const isTapped = tapped.includes(id);
				const isSelected = selected.includes(id);
				const isFaceDown = faceDown.includes(id);
				const isDoubled = doubled.includes(id);

				return <FightingCard {...card} tapped={isTapped} selected={isSelected} faceDown={isFaceDown} doubled={isDoubled} key={id} onClick={fightCardClick} />;
			})}
		</StyledCardStack>
	)
}

export default CardStack
