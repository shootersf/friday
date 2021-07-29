import { gameStateEnum } from '../constants'

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
