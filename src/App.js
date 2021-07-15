//import './App.css';
import { useState } from 'react'
import FridayGame from './components/FridayGame'
import FightingCard from "./components/FightingCard"
import HazardCard from "./components/HazardCard"
import HazardSelection from './components/HazardSelection'
import Deck from "./components/Deck"
import { drawCard, createDeck, createHazardDeck } from './helpers'

import starterCards from "./data/starterFightingCards.json"
import hCards from "./data/hazardCards.json"
import advancedCards from "./data/advancedFightingCards.json"

function App() 
{

  

// function startTurn() {
//   // determine state
//   console.log("here", hazardDeck.length)
//   if (hazardDeck.length === 0)
//   {
//     setGameState(gameStateEnum.gameOver);
//     return;
//   }
//   else if (hazardDeck.length === 1)
//   {
//     // TODO: No selection
//   }
//   else
//   {
//     setGameState(gameStateEnum.selection);
//     // draw two hazards and set them as options
//     const cards = [];
//     cards.push(drawCard(hazardDeck, setHazardDeck));
//     cards.push(drawCard(hazardDeck, setHazardDeck));
//     console.log("card1", cards[0]);
//     setHazardOptions(cards);

//   }
// }

// if (gameState === gameStateEnum.cleanUp)
//   startTurn();
// // UI

  return (
    <div className="App">
      <FridayGame />
    </div>
  );
}



// function hazardSelected(hid) {
//   console.log(hid);
// }

export default App;
