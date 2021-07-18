import { useState } from 'react'
import styled from 'styled-components'

import { StyledFridayGame } from './styles/StyledFridayGame'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import PlayerInput from './PlayerInput'

import { drawCard, createDeck, createHazardDeck } from '../helpers'
import { TOTAL_LIVES, gameStateEnum } from '../constants'

import starterCards from '../data/starterFightingCards.json'
import hCards from '../data/hazardCards.json'
import advancedCards from '../data/advancedFightingCards.json'


// Inline styling for section
const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
`;


const FridayGame = () => {

	// Initial state for game
	const [playerDeck, setPlayerDeck] = useState( () => createDeck(0, starterCards));
	const [playerDiscard, setPlayerDiscard] = useState([]);
	const [hazardDeck, setHazardDeck] = useState( () => createHazardDeck(18, advancedCards, hCards));
	const [hazardDiscard, setHazardDisard] = useState([]);
	const [exile, setExile] = useState([]);
	const [hazardOptions, setHazardOptions] = useState([]);
	const [currentHazard, setCurrentHazard] = useState({});
	const [leftSideCards, setLeftSideCards] = useState([]);
	const [rightSideCards, setRightSideCards] = useState([]);
	const [freeCardsRemaining, setFreeCardsRemaining] = useState(0);
	const [tougnessRemaining, setToughnessRemaining] = useState(0);
	const [livesRemaining, setLivesRemaining] = useState(TOTAL_LIVES);
	const [gameState, setGameState] = useState(gameStateEnum.TURN_OVER);

	
	return (
		<StyledFridayGame>
			<LeftSideInfo deckSize={playerDeck.length} discardSize={playerDiscard.length} remainingLives={livesRemaining} />

			<StyledSection>
				<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
					leftCards={leftSideCards} rightCards={rightSideCards} />

				<PlayerInput gameState={gameState} canDraw={playerDeck.length > 0 || playerDiscard.length > 0} 
					turnClick={nextTurnBtn} drawClick={drawCardBtn} finishClick={finishTurnBtn} />
			</StyledSection>

			<RightSideInfo deckSize={hazardDeck.length} discardSize={hazardDiscard.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={tougnessRemaining} fighting={gameState === gameStateEnum.FIGHTING_HAZARD} />

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
		setHazardDisard(() => [...hazardDiscard, notSelected]);

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
		if (hazardDeck.length > 1)
		{
			// draw two hazards and set them as options
			const cards = [];
			cards.push(drawCard(hazardDeck, setHazardDeck));
			cards.push(drawCard(hazardDeck, setHazardDeck));
			setHazardOptions(() => cards);
			setGameState(() => gameStateEnum.SELECTING_HAZARD);
		}
		else if (hazardDeck.length === 1)
		{
			// draw last card and set it as current hazard
			setCurrentHazard(() => drawCard(hazardDeck, setHazardDeck));
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

		// Draw card
		const card = drawCard(playerDeck, setPlayerDeck);

		// Determine which side to add to and add card to stack
		if (freeCardsRemaining > 0)
		{
			setLeftSideCards( () => [...leftSideCards, card]);
			setFreeCardsRemaining( () => freeCardsRemaining - 1);
		}
		else
		{
			setRightSideCards( () => [...rightSideCards, card]);
		}
		setToughnessRemaining( () => tougnessRemaining - card.power);
	}

	function finishTurnBtn() {
		console.log("finish turn");
	}

	function gameOver() {

	}
}

export default FridayGame
