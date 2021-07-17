import { gameStateEnum } from '../constants'
import HazardSelection from './HazardSelection'

import { StyledFridayMainDisplay } from './styles/StyledFridayMainDisplay';

const FridayMainDisplay = ({ gameState, hazard, hazardOptions, optionsOnClick, leftCards, rightCards }) => {

	switch(gameState) {
		case gameStateEnum.SELECTING_HAZARD:
			return (
				<StyledFridayMainDisplay>
					<HazardSelection options={hazardOptions} onClick={optionsOnClick} />
				</StyledFridayMainDisplay>
			);
			break;
		default:
			return <StyledFridayMainDisplay />;
	}
	
}

export default FridayMainDisplay
