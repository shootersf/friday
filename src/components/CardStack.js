import React from 'react'
import { StyledCardStack } from './styles/StyledCardStack'
import FightingCard from './FightingCard'

const CardStack = ({ cards, fightCardClick }) => {
	return (
		<StyledCardStack>
			{cards.map( card => <FightingCard {...card} onClick={fightCardClick} key={card.id}/>)}
		</StyledCardStack>
	)
}

export default CardStack
