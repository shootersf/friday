import { gameStateEnum } from '../constants'
import HazardSelection from './HazardSelection'
import MainDisplayFighting from './MainDisplayFighting';

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
		case gameStateEnum.FIGHTING_HAZARD:
			return (
				<StyledFridayMainDisplay>
					<MainDisplayFighting hazard={hazard} left={leftCards} right={rightCards}/>
				</StyledFridayMainDisplay>
			)
		default:
			return <StyledFridayMainDisplay />;
	}
	
}

export default FridayMainDisplay
