import React from 'react'
import { StyledFightingInput } from './styles/StyledFightingInput';

const FightingInput = ({ haveDrawn, lives, toughness, freeCards, cardsAvailable, drawClick, finishClick, doomClick }) => {

	// Calculate if draw button should show. Cards must be available and either a free card or life to spend
	const drawButton = (cardsAvailable && (freeCards > 0 || lives > 0)) ? <button onClick={drawClick}>Draw Card</button> : null;

	// Determine end fight button: 
	// Nothing if no card has been drawn yet
	// Game Over if impending doom
	// Otherwise finish fight
	let endButton;
	if (!haveDrawn)
	{
		endButton = null;
	}
	else if ( (lives <= toughness) || (!cardsAvailable && toughness > 0) )	// Impending doom
	{
		endButton = <button onClick={doomClick}>Accept Defeat</button>
	}
	else
	{
		endButton = <button onClick={finishClick}>Finish Fight</button>
	}
	return (
		<StyledFightingInput>
			{drawButton}
			{endButton}
		</StyledFightingInput>
	)
}

export default FightingInput
