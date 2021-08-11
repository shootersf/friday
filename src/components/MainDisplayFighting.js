import React from 'react'
import { StyledMainDisplayFighting } from './styles/StyledMainDisplayFighting'
import HazardCard from './HazardCard'
import CardStack from './CardStack'


const MainDisplayFighting = ({ hazard, left, right, fightCardClick, tapped, selected, faceDown }) => {
	return (
		<StyledMainDisplayFighting>
			<CardStack cards={left} fightCardClick={fightCardClick} tapped={tapped} selected={selected} faceDown={faceDown} />
			<HazardCard {...hazard}/>
			<CardStack cards={right} fightCardClick={fightCardClick} tapped={tapped} selected={selected} faceDown={faceDown} />
		</StyledMainDisplayFighting>
	)
}

export default MainDisplayFighting
