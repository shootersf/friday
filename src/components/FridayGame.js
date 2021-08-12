import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyledFridayGame } from './styles/StyledFridayGame'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import EndOfTurnInput from './EndOfTurnInput'
import FightingInput from './FightingInput'
import SelectionAbilityInput from './SelectionAbilityInput'

import { createDeck, createHazardDeck } from '../helpers'
import { DeckBuilder } from '../DeckBuilder'

import { TOTAL_LIVES, gameStateEnum, abilities } from '../constants'

import { starterFightingCards } from '../data/starterFightingCards.js'
import { hazardCards } from '../data/hazardCards.js'
import { advancedFightingCards } from '../data/advancedFightingCards.js'
import ExilingInput from './ExilingInput'


// Inline styling for section
const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
`;

// Decks for the game
let hDeck;
let pDeck;

// Dummy card for testing abilities
let dummyCard = {
	id: 1000,
	power: 0,
	name: "DUMMY",
	ability: abilities.double,
	exileCost: 1,
}

// Debug mode
const debugMode = true;

let playerInput;				// Which input component is displayed. 
let selectingMode = false;		// Whether selecting cards is allowed.
let restrictSelectionOfDoubled = false; 	// When true player cannot select doubled cards. (NO double doubles allowed)

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
	const [activeID, setActiveID] = useState(-1);
	const [doubled, setDoubled] = useState([]);
	const [faceDown, setFaceDown] = useState([]);
	const [activationsRemaining, setActivationsRemaining] = useState(0);
	const [currentAbility, setCurrentAbility] = useState(-1);

	

	// Setup the decks on first render
	useEffect( ()=> {
		hDeck = DeckBuilder(createHazardDeck(18, advancedFightingCards, hazardCards), setHDeckState, setHDiscardState);
		pDeck = DeckBuilder(createDeck(0, starterFightingCards), setPDeckState, setPDiscardState);
		hDeck.shuffleWithDiscard();
		pDeck.shuffleWithDiscard();

		// If debug add dummy card
		if (debugMode) pDeck.putOnTop(dummyCard);
	}, [])
	
	// updating toughnessRemaining
	useEffect( ()=> {
		setToughnessRemaining(calculateToughnessRemaining([...leftSideCards, ...rightSideCards], (currentHazard.toughness) ? currentHazard.toughness : 0))
	},[leftSideCards,rightSideCards, faceDown, doubled, currentHazard.toughness])
	
	// Calculate input to show.
	
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
		case gameStateEnum.ACTIVATING_ABILITY:
			{
				switch(currentAbility)
				{
					case abilities.destroy:
						playerInput = <SelectionAbilityInput text="Select card to destroy" selected={selected} onClick={handleCardDestruction} />
						break;
					case abilities.double:
						playerInput = <SelectionAbilityInput text="Select card to double" selected={selected} onClick={handleCardDoubling} />
						break;
					default:
						console.log("Danger Will Robinson!! danger");
				}
			}
			break;
		// default:
		// 	playerInput = null;
	}

	// Actual output
	return (
		<StyledFridayGame>
			<LeftSideInfo deckSize={pDeckState.length} discardSize={pDiscardState.length} remainingLives={livesRemaining} />

			<StyledSection>
				<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
					leftCards={leftSideCards} rightCards={rightSideCards} fightCardClick={fightCardClicked} tapped={tapped} selected={selected}
					faceDown={faceDown} doubled={doubled} />

				{playerInput}
			</StyledSection>

			<RightSideInfo deckSize={hDeckState.length} discardSize={hDiscardState.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={toughnessRemaining} fighting={Object.keys(currentHazard).length > 0} />

		</StyledFridayGame>
	)

	// Game Logic
	function fightCardClicked(id, ability, exileCost) {
		
		switch (gameState) 
		{
			case gameStateEnum.FIGHTING_HAZARD:
				handleAbilityCardSelected(id, ability);
				break;
			case gameStateEnum.EXILING:
				handleExileCardSelected(id, exileCost);
				break;
			case gameStateEnum.ACTIVATING_ABILITY:
				{
					// Set current selected card to this cards ID
					if (selectingMode)
					{
						// Check for ignores
						// Same card
						if (activeID === id) return;
						// FaceDown
						if (faceDown.includes(id)) return;
						// Double if restricted
						if (restrictSelectionOfDoubled && doubled.includes(id)) return;

						// Set selected
						setSelected([id]);
					}
				}
				break;
			default:
				return;
		}
	}

	function handleAbilityCardSelected(id, ability) {
		console.log("ability", id, ability);
		// Handle basic cards
		if (!ability) return;
		// Handle tapped cards
		if (tapped.indexOf(id) !== -1) return;

		// tap card
		setTapped(prev => [...prev, id]);

		// allow selection of doubles by default
		restrictSelectionOfDoubled = false;


		switch(ability) 
		{
			case abilities.plus2Life:
				setLivesRemaining(prev => Math.min(prev + 2, 22));
				break;
			case abilities.plus1Life:
				setLivesRemaining(prev => Math.min(prev + 1, 22));
				break;
			case abilities.destroy:
				selectingMode = true;
				setActiveID(id);
				setCurrentAbility(ability);
				setGameState(gameStateEnum.ACTIVATING_ABILITY);
				break;
			case abilities.double:
				selectingMode = true;
				restrictSelectionOfDoubled = true;
				setActiveID(id);
				setCurrentAbility(ability);
				setGameState(gameStateEnum.ACTIVATING_ABILITY);
				break;
			default:
				console.log(`Ability ${Object.keys(abilities)[ability]} has not been implemented yet`);
		}
	}

	function handleCardDestruction()
	{
		const id = selected[0];
		setFaceDown(prev => [...prev, id]);
		// Clear selected and return to fighting
		setSelected([]);
		setGameState(gameStateEnum.FIGHTING_HAZARD);
	}

	function handleCardDoubling() {
		const id = selected[0];
		setDoubled(prev => [...prev, id]);
		// Clear selected and return to fighting
		setSelected([]);
		setGameState(gameStateEnum.FIGHTING_HAZARD);
	}

	function handleExileCardSelected(id, exileCost) {
		// Do not allow user to select facedown cards
		if (faceDown.includes(id)) return;

		// toggle selected and adjust value of exilePoints
		if (selected.indexOf(id) === -1)
		{
			// Not in.
			// Make sure exile points available
			if (exilePoints <= 0) return;

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
		console.log("exile", exile);
		console.log("pDiscard", pDiscardState);
		console.log("hDiscard", hDiscardState);
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

	function moveCardsAfterFight(fightWon) {
		const toExile = [];
		const toPlayerDiscard = [];
		const cardsInPlay = [...leftSideCards, ...rightSideCards];

		// Handle the hazard card location
		if (fightWon) 
		{
			toPlayerDiscard.push(currentHazard);
		}
		else
		{
			hDeck.addToDiscard(currentHazard);
		}

		// Step through inPlay and move accordingly
		cardsInPlay.forEach( card => {
			const id = card.id;
			const exiled = (fightWon) ? faceDown.includes(id) : faceDown.includes(id) || selected.includes(id);
			(exiled) ? toExile.push(card) : toPlayerDiscard.push(card);
		})

		// Add to discard or into exile state
		pDeck.addToDiscard(...toPlayerDiscard);
		setExile(prev => [...exile, ...toExile]);
	}

	function finishTurnBtn() {
		// check if card was beaten successfully 
		// TRUE:
		if (toughnessRemaining <= 0)
		{
			moveCardsAfterFight(true);
			clearFightStates();
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

			moveCardsAfterFight(false);
			// cleanup
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
		setSelected([]);
		setTapped([]);
		setFaceDown([]);
	}

	function calculateToughnessRemaining(cards, toughness)
	{
		cards.forEach(card => {
			if(!faceDown.includes(card.id))
			{
				if(doubled.includes(card.id))
					toughness -= 2 * card.power;
				else
					toughness -= card.power;
			}
		});
		return toughness;
	}
}

export default FridayGame
