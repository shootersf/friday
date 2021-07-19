import { gameStateEnum } from '../constants'


// const PlayerInput = ({ gameState, lives, toughness, canDraw, cardDrawn, doomClick, turnClick, drawClick, finishClick }) => {
// 	// Determine if ending the turn now will result in game over
// 	const potentialGameOver = (gameState === gameStateEnum.IMPENDING_DOOM || lives < toughness);

// 	switch(gameState) {
// 		case gameStateEnum.TURN_OVER:
// 			return (
// 				<button onClick={turnClick}>Next Round</button>
// 			);
// 			break;
// 		case gameStateEnum.FIGHTING_HAZARD:
// 			return (
// 				<>
// 					<button onClick={drawClick} disabled={!canDraw}>Draw Card</button>
// 					<button onClick={(potentialGameOver) ? doomClick : finishClick}>{potentialGameOver ? "Accept Defeat" : "Finish Fight"}</button>
// 				</>
// 			);
// 			break;
// 		case gameStateEnum.IMPENDING_DOOM:
// 			return (
// 				<>
// 					<button onClick={doomClick}>Accept Defeat</button>
// 				</>
// 			)
// 		default:
// 			return null;
// 	}
	
// }

const PlayerInput = ({ gameState, lives, toughness, canDraw, cardDrawn, doomClick, turnClick, drawClick, finishClick }) => {
	const showNextTurnBtn = (gameState === gameStateEnum.TURN_OVER);
	const showDrawBtn = canDraw && (gameState === gameStateEnum.FIGHTING_HAZARD || gameState === gameStateEnum.IMPENDING_DOOM);
	const showFinishBtn = gameState === gameStateEnum.FIGHTING_HAZARD && lives >= toughness && cardDrawn;
	const showDefeatBtn = gameState === gameStateEnum.IMPENDING_DOOM || lives < toughness;

	return (
		<>
			<button onClick={turnClick} hidden={!showNextTurnBtn}>Next Round</button>
			<button onClick={drawClick} hidden={!showDrawBtn}>Draw Card</button>
			<button onClick={finishClick} hidden={!showFinishBtn}>Finish Fight</button>
			<button onClick={doomClick} hidden={!showDefeatBtn}>Accept Defeat</button>
		</>
	)

}

export default PlayerInput
