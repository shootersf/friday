import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyledFridayGame } from './styles/StyledFridayGame'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import PlayerInput from './PlayerInput'

import { drawCard, createDeck, createHazardDeck, shuffleDeck, calculateToughnessRemaining } from '../helpers'
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
	// const [playerDeck, setPlayerDeck] = useState( () => shuffleDeck(createDeck(0, starterCards)));
	// const [playerDiscard, setPlayerDiscard] = useState([]);
	// const [hazardDeck, setHazardDeck] = useState( () => shuffleDeck(createHazardDeck(18, advancedCards, hCards)));
	// const [hazardDiscard, setHazardDisard] = useState([]);

	const [pDeckState, setPDeckState] = useState([]);
	const [pDiscardState, setPDiscardState] = useState([]);
	const [hDeckState, setHDeckState] = useState([]);
	const [hDiscardState, setHDiscardState] = useState([]);
	
	// console.log("pdeck", pDeck.deckLength());

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
	
	return (
		<StyledFridayGame>
			<LeftSideInfo deckSize={pDeckState.length} discardSize={pDiscardState.length} remainingLives={livesRemaining} />

			<StyledSection>
				<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
					leftCards={leftSideCards} rightCards={rightSideCards} />

				<PlayerInput gameState={gameState} canDraw={pDeckState.length > 0 || pDiscardState.length > 0} 
					lives={livesRemaining} toughness={toughnessRemaining} doomClick={gameOver} cardDrawn={leftSideCards.length > 0}
					turnClick={nextTurnBtn} drawClick={drawCardBtn} finishClick={finishTurnBtn} />
			</StyledSection>

			<RightSideInfo deckSize={hDeckState.length} discardSize={hDiscardState.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={toughnessRemaining} fighting={gameState === gameStateEnum.FIGHTING_HAZARD || gameState === gameStateEnum.IMPENDING_DOOM} />

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
		//setHazardDisard(() => [...hazardDiscard, notSelected]);
		hDeck.addToDiscard(notSelected);

		// clear options
		setHazardOptions([]);

		// Update Toughness remaining and free cards
		setToughnessRemaining(() => selected.toughness);
		setFreeCardsRemaining(() => selected.freeCards);

		// change game state
		setGameState(() => gameStateEnum.FIGHTING_HAZARD);
	}

	function nextTurnBtn() {
		// Determine next state
		if (hDeck.deckLength() > 1)
		{
			// draw two hazards and set them as options
			
			// drawCard(setHazardDeck, setHazardOptions);
			// drawCard(setHazardDeck, setHazardOptions);
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
		// console.log("draw card");
		//TODO: check if deck is empty

		// Keep track of lives for accurate testing 
		let accurateLives = livesRemaining;

		// Draw card

		// Determine which side to add to and add card to stack
		if (freeCardsRemaining > 0)
		{
			//setLeftSideCards( () => [...leftSideCards, card]);
			//drawCard(setPlayerDeck, setLeftSideCards);
			const card = pDeck.draw();
			setLeftSideCards((prev) => [...prev, card]);
			setFreeCardsRemaining( () => freeCardsRemaining - 1);
		}
		else
		{
			//setRightSideCards( () => [...rightSideCards, card]);
			//drawCard(setPlayerDeck, setRightSideCards);
			const card = pDeck.draw();
			setRightSideCards((prev) => [...prev, card]);
			setLivesRemaining( () => livesRemaining - 1);
			accurateLives--;
		}
		// setToughnessRemaining( () => toughnessRemaining - card.power);
		//setToughnessRemaining( () => calculateToughnessRemaining([...leftSideCards, ...rightSideCards], currentHazard.toughness))
		//console.log(accurateLives);

		// check for impending doom
		if ( (pDeck.deckLength() === 0 && pDeck.discardLength() === 0) || (freeCardsRemaining === 0 && accurateLives <= 0) )
		{
			setGameState(() => gameStateEnum.IMPENDING_DOOM);
		}
	}

	function finishTurnBtn() {
		// check if card was beaten successfully 
		// TRUE:
		if (toughnessRemaining <= 0)
		{
			// Move hazard to player discard along with all played cards
			//setPlayerDiscard( () => [...playerDiscard, ...leftSideCards, ...rightSideCards, currentHazard]);
			pDeck.addToDiscard(currentHazard, ...leftSideCards, ...rightSideCards);
		}
		else // FALSE:
		{
			// Reduce life by difference
			setLivesRemaining(() => livesRemaining - toughnessRemaining);
			
			//TODO: allow player to exile cards for lives lost

			// Move remaining cards to corresponding discards
			// setPlayerDiscard( ()=> [...playerDiscard, ...leftSideCards, ...rightSideCards]);
			// setHazardDisard( ()=> [...hazardDiscard, currentHazard]);
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
