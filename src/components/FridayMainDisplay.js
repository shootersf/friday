import { gameStateEnum } from '../constants'
import HazardSelection from './HazardSelection'

const FridayMainDisplay = ({ gameState, hazard, hazardOptions, optionsOnClick, leftCards, rightCards }) => {

	switch(gameState) {
		case gameStateEnum.SELECTING_HAZARD:
			return (
				<HazardSelection options={hazardOptions} onClick={optionsOnClick} />
			);
			break;
		default:
			return null;
	}
	
}

export default FridayMainDisplay
