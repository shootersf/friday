import React from 'react'
import { StyledCardStack } from './styles/StyledCardStack'
import FightingCard from './FightingCard'

const CardStack = ({ cards }) => {
	return (
		<StyledCardStack>
			{cards.map( card => <FightingCard {...card} key={card.id}/>)}
		</StyledCardStack>
	)
}

export default CardStack
