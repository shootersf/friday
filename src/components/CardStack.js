import React from 'react'
import { StyledCardStack } from './styles/StyledCardStack'
import FightingCard from './FightingCard'

const CardStack = ({ cards, fightCardClick, tapped, selected }) => {
	return (
		<StyledCardStack>
			{cards.map( card => <FightingCard {...card} tapped={tapped.indexOf(card.id) !== -1} selected={selected.indexOf(card.id) !== -1} onClick={fightCardClick} key={card.id}/>)}
		</StyledCardStack>
	)
}

export default CardStack
