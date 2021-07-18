import React from 'react'
import { StyledMainDisplayFighting } from './styles/StyledMainDisplayFighting'
import HazardCard from './HazardCard'
import CardStack from './CardStack'


const MainDisplayFighting = ({ hazard, left, right }) => {
	return (
		<StyledMainDisplayFighting>
			<CardStack cards={left}/>
			<HazardCard {...hazard}/>
			<CardStack cards={right}/>
		</StyledMainDisplayFighting>
	)
}

export default MainDisplayFighting
