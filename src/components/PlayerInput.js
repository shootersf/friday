import { gameStateEnum } from '../constants'


const PlayerInput = ({ gameState, canDraw, turnClick, drawClick, finishClick }) => {
	switch(gameState) {
		case gameStateEnum.TURN_OVER:
			return (
				<button onClick={turnClick}>Next Round</button>
			);
			break;
		case gameStateEnum.FIGHTING_HAZARD:
			return (
				<>
					<button onClick={drawClick} disabled={!canDraw}>Draw Card</button>
					<button onClick={finishClick}>Finish Fight</button>
				</>
			);
			break;
		default:
			return null;
	}
	
}

export default PlayerInput
