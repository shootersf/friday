import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyledFridayGame } from './styles/StyledFridayGame'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import PlayerInput from './PlayerInput'
import EndOfTurnInput from './EndOfTurnInput'
import FightingInput from './FightingInput'

import { createDeck, createHazardDeck, calculateToughnessRemaining } from '../helpers'
import { DeckBuilder } from '../DeckBuilder'

import { TOTAL_LIVES, gameStateEnum } from '../constants'

import starterCards from '../data/starterFightingCards.json'
import hCards from '../data/hazardCards.json'
import advancedCards from '../data/advancedFightingCards.json'


// Inline styling for section
const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
`;

// Decks for the game
let hDeck;
let pDeck;

const FridayGame = () => {

	// Initial state for game

	const [pDeckState, setPDeckState] = useState([]);
	const [pDiscardState, setPDiscardState] = useState([]);
	const [hDeckState, setHDeckState] = useState([]);
	const [hDiscardState, setHDiscardState] = useState([]);

	const [exile, setExile] = useState([]);
	const [hazardOptions, setHazardOptions] = useState([]);
	const [currentHazard, setCurrentHazard] = useState({});
	const [leftSideCards, setLeftSideCards] = useState([]);
	const [rightSideCards, setRightSideCards] = useState([]);
	const [freeCardsRemaining, setFreeCardsRemaining] = useState(0);
	const [toughnessRemaining, setToughnessRemaining] = useState(0);
	const [livesRemaining, setLivesRemaining] = useState(TOTAL_LIVES);
	const [gameState, setGameState] = useState(gameStateEnum.TURN_OVER);

	// Setup the decks on first render
	useEffect( ()=> {
		hDeck = DeckBuilder(createHazardDeck(18, advancedCards, hCards), setHDeckState, setHDiscardState);
		pDeck = DeckBuilder(createDeck(0, starterCards), setPDeckState, setPDiscardState);
		hDeck.shuffleWithDiscard();
		pDeck.shuffleWithDiscard();
	}, [])
	
	// updating toughnessRemaining
	useEffect( ()=> {
		setToughnessRemaining(calculateToughnessRemaining([...leftSideCards, ...rightSideCards], (currentHazard.toughness) ? currentHazard.toughness : 0))
	},[leftSideCards,rightSideCards, currentHazard.toughness])
	
	// Calculate input to show
	let playerInput;
	switch(gameState) 
	{
		case gameStateEnum.TURN_OVER:
			playerInput = <EndOfTurnInput turnClick={nextTurnBtn} />;
			break;
		case gameStateEnum.FIGHTING_HAZARD:
			playerInput = <FightingInput lives={livesRemaining} freeCards={freeCardsRemaining} toughness={toughnessRemaining} 
				haveDrawn={leftSideCards.length > 0} cardsAvailable={pDeckState.length + pDiscardState.length > 0}
				drawClick={drawCardBtn} finishClick={finishTurnBtn} doomClick={gameOver} />;
			break;
		default:
			playerInput = null;
	}

	return (
		<StyledFridayGame>
			<LeftSideInfo deckSize={pDeckState.length} discardSize={pDiscardState.length} remainingLives={livesRemaining} />

			<StyledSection>
				<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
					leftCards={leftSideCards} rightCards={rightSideCards} />

				{/* <PlayerInput gameState={gameState} canDraw={pDeckState.length > 0 || pDiscardState.length > 0} 
					lives={livesRemaining} toughness={toughnessRemaining} doomClick={gameOver} cardDrawn={leftSideCards.length > 0}
					turnClick={nextTurnBtn} drawClick={drawCardBtn} finishClick={finishTurnBtn} /> */}
				{playerInput}
			</StyledSection>

			<RightSideInfo deckSize={hDeckState.length} discardSize={hDiscardState.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={toughnessRemaining} fighting={Object.keys(currentHazard).length > 0} />

		</StyledFridayGame>
	)

	// Game Logic
	function hazardSelectedBtn(hid) {
		// Mark selected and not selected cards
		const selected = (hid === hazardOptions[0].id) ? hazardOptions[0] : hazardOptions[1];
		const notSelected = (hid !== hazardOptions[0].id) ? hazardOptions[0] : hazardOptions[1];

		// Set hazard
		setCurrentHazard(() => selected);

		// Add to discard
		hDeck.addToDiscard(notSelected);

		// clear options
		setHazardOptions([]);

		// Update free cards
		setFreeCardsRemaining(() => selected.freeCards);

		// change game state
		setGameState(() => gameStateEnum.FIGHTING_HAZARD);
	}

	function nextTurnBtn() {
		// Determine next state
		if (hDeck.deckLength() > 1)
		{
			// draw two hazards and set them as options
			const card1 = hDeck.draw();
			const card2 = hDeck.draw();
			setHazardOptions(() => [card1, card2]);

			setGameState(() => gameStateEnum.SELECTING_HAZARD);
		}
		else if (hDeck.deckLength() === 1)
		{
			// draw last card and set it as current hazard
			//setCurrentHazard(() => drawCard(hazardDeck, setHazardDeck));
			setCurrentHazard(() => hDeck.draw());
			setGameState(() => gameStateEnum.FIGHTING_HAZARD);
		}
		else
		{
			// Game over man to be replaced by difficulty increase and then pirates arrr
			setGameState(() => gameStateEnum.GAME_OVER);
		}
	}

	function drawCardBtn() {
		//TODO: check if deck is empty

		// Keep track of lives for accurate testing 
		let accurateLives = livesRemaining;

		// Draw card
		// Determine which side to add to and add card to stack
		if (freeCardsRemaining > 0)
		{
			const card = pDeck.draw();
			setLeftSideCards((prev) => [...prev, card]);
			setFreeCardsRemaining( () => freeCardsRemaining - 1);
		}
		else
		{
			const card = pDeck.draw();
			setRightSideCards((prev) => [...prev, card]);
			setLivesRemaining( () => livesRemaining - 1);
			accurateLives--;
		}

		// check for impending doom
		// if ( (pDeck.deckLength() === 0 && pDeck.discardLength() === 0) || (freeCardsRemaining === 0 && accurateLives <= 0) )
		// {
		// 	setGameState(() => gameStateEnum.IMPENDING_DOOM);
		// }
	}

	function finishTurnBtn() {
		// check if card was beaten successfully 
		// TRUE:
		if (toughnessRemaining <= 0)
		{
			// Move hazard to player discard along with all played cards
			pDeck.addToDiscard(currentHazard, ...leftSideCards, ...rightSideCards);
		}
		else // FALSE:
		{
			// Reduce life by difference
			setLivesRemaining(() => livesRemaining - toughnessRemaining);
			
			//TODO: allow player to exile cards for lives lost

			// Move remaining cards to corresponding discards
			pDeck.addToDiscard(...leftSideCards, ...rightSideCards);
			hDeck.addToDiscard(currentHazard);

		}

		// Clear
		setLeftSideCards([]);
		setRightSideCards([]);
		setCurrentHazard({});
		setFreeCardsRemaining(0);
		setToughnessRemaining(0);

		// Update state
		setGameState( ()=> gameStateEnum.TURN_OVER);
	}

	function gameOver() {

	}
}

export default FridayGame
