import React from 'react'
import { StyledMainDisplayFighting } from './styles/StyledMainDisplayFighting'
import HazardCard from './HazardCard'
import CardStack from './CardStack'


const MainDisplayFighting = ({ hazard, left, right, fightCardClick }) => {
	return (
		<StyledMainDisplayFighting>
			<CardStack cards={left} fightCardClick={fightCardClick} />
			<HazardCard {...hazard}/>
			<CardStack cards={right} fightCardClick={fightCardClick}/>
		</StyledMainDisplayFighting>
	)
}

export default MainDisplayFighting
