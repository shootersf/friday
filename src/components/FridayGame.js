import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyledFridayGame } from './styles/StyledFridayGame'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import EndOfTurnInput from './EndOfTurnInput'
import FightingInput from './FightingInput'

import { createDeck, createHazardDeck, calculateToughnessRemaining } from '../helpers'
import { DeckBuilder } from '../DeckBuilder'

import { TOTAL_LIVES, gameStateEnum } from '../constants'

import starterCards from '../data/starterFightingCards.json'
import hCards from '../data/hazardCards.json'
import advancedCards from '../data/advancedFightingCards.json'
import ExilingInput from './ExilingInput'


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

	// Deck states are managed by object returned by deckbuilder when methods of that object such as draw are called.
	const [pDeckState, setPDeckState] = useState([]);
	const [pDiscardState, setPDiscardState] = useState([]);
	const [hDeckState, setHDeckState] = useState([]);
	const [hDiscardState, setHDiscardState] = useState([]);

	const [exile, setExile] = useState([]);
	const [exilePoints, setExilePoints] = useState(0);
	const [tapped, setTapped] = useState([]);
	const [selected, setSelected] = useState([]);
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
		case gameStateEnum.EXILING:
			playerInput = <ExilingInput exilePoints={exilePoints} finishClick={finishExile} />
			break;
		default:
			playerInput = null;
	}

	return (
		<StyledFridayGame>
			<LeftSideInfo deckSize={pDeckState.length} discardSize={pDiscardState.length} remainingLives={livesRemaining} />

			<StyledSection>
				<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
					leftCards={leftSideCards} rightCards={rightSideCards} fightCardClick={fightCardClicked} tapped={tapped} selected={selected} />

				{playerInput}
			</StyledSection>

			<RightSideInfo deckSize={hDeckState.length} discardSize={hDiscardState.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={toughnessRemaining} fighting={Object.keys(currentHazard).length > 0} />

		</StyledFridayGame>
	)

	// Game Logic
	function fightCardClicked(id, exileCost) {
		// // return if card is already tapped
		// if (tapped.indexOf(id) !== -1) return;

		// // Add to tapped
		// setTapped( prev => [...prev, id]);

		// // Toggle selected
		// if (selected.indexOf(id) === -1)
		// {
		// 	setSelected( prev => [...prev, id]);
		// }
		// else
		// {
		// 	setSelected(selected.filter(selID => selID !== id));
		// }
		switch (gameState) 
		{
			case gameStateEnum.EXILING:
				handleExileCardSelected(id, exileCost);
				break;
			default:
				return;
		}
	}

	function handleExileCardSelected(id, exileCost) {
		// toggle selected and adjust value of exilePoints
		if (selected.indexOf(id) === -1)
		{
			// Not in.
			setSelected(prev => [...prev, id]);
			setExilePoints(prev => prev - exileCost);
		}
		else 
		{
			setSelected(selected.filter(selID => selID !== id));
			setExilePoints(prev => prev + exileCost);
		}
	}

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
		// debug log decks
		console.log("playerDeck", pDeckState);
		console.log("hazardDeck", hDeckState);
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
		// check if deck is empty
		if (pDeck.deckLength() === 0)
		{
			// TODO add aging card

			// Shuffle back in
			pDeck.shuffleWithDiscard();
		}

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
		}

	}

	function finishTurnBtn() {
		// check if card was beaten successfully 
		// TRUE:
		if (toughnessRemaining <= 0)
		{
			// Move hazard to player discard along with all played cards
			pDeck.addToDiscard(currentHazard, ...leftSideCards, ...rightSideCards);

			clearFightStates();

			// Clear tapped and selected
			setSelected([]);
			setTapped([]);

			// Update state
			setGameState( ()=> gameStateEnum.TURN_OVER);
		}
		else // FALSE:
		{
			// Set initial exile points
			setExilePoints(toughnessRemaining);

			// Reduce life by difference
			setLivesRemaining(() => livesRemaining - toughnessRemaining);

			// Clear selected
			setSelected([]);
			
			//TODO: allow player to exile cards for lives lost
			setGameState( ()=> gameStateEnum.EXILING);

			// Move remaining cards to corresponding discards
			//pDeck.addToDiscard(...leftSideCards, ...rightSideCards);
			//hDeck.addToDiscard(currentHazard);

		}
	}

	function finishExile() {
			// collect all played cards into initial array then split them between discard and exile
			const allPlayed = [...leftSideCards, ...rightSideCards];
			const toDiscard = [];
			const toExile = [];

			allPlayed.forEach(card => {
				if (selected.indexOf(card.id) === -1)
				{
					toDiscard.push(card);
				}
				else
				{
					toExile.push(card);
				}
			});

			// debugging
			console.log("todiscard", toDiscard);
			console.log("toExile", toExile);

			// Move cards
			pDeck.addToDiscard(...toDiscard);
			hDeck.addToDiscard(currentHazard);
			setExile(prev => [...prev, ...toExile]);

			// cleanup
			setSelected([]);
			setTapped([]);
			clearFightStates();

			// Update state
			setGameState( ()=> gameStateEnum.TURN_OVER);
	}

	function gameOver() {

	}

	// Helpers
	function clearFightStates() {
		// Clear
		setLeftSideCards([]);
		setRightSideCards([]);
		setCurrentHazard({});
		setFreeCardsRemaining(0);
		setToughnessRemaining(0);
	}
}

export default FridayGame
