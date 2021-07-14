//import logo from './logo.svg';
//import './App.css';
import { useState } from 'react'
import FightingCard from "./components/FightingCard"
import HazardCard from "./components/HazardCard"
import Deck from "./components/Deck"

import starterCards from "./data/starterFightingCards.json"
import hCards from "./data/hazardCards.json"
import advancedCards from "./data/advancedFightingCards.json"

function App() 
{

  const gameStateEnum = {
    welcome: 1,
    
  }

  //let startDeck = createDeck(0, starterCards)
  const [playerDeck, setPlayerDeck] = useState( () => createDeck(0, starterCards));
  //let hazardDeck = createHazardDeck(18, advancedCards, hCards);
  const [hazardDeck, setHazardDeck] = useState( () => createHazardDeck(18, advancedCards, hCards));

  console.log("starter deck", playerDeck.length)

  return (
    <div className="App">
      <h1>Testing this react thing</h1>
      <h2>Hello</h2>
      <Deck name="Player" count={playerDeck.length} />
      <Deck name="Hazard" count={hazardDeck.length} />
      <FightingCard {...playerDeck[17]}/>
      <br>
      </br>
      {/* <HazardCard {...testHazard}/> */}
    </div>
  );
}

/*
 *  Takes an ID to start counting from and an array of constructors objects (cards without id and with a copies key)
 *  Coverts them to a deck with ids and no copies key
*/
function createDeck(starterID, constructionArr)
{
  let id = starterID;
  const deck = [];

  constructionArr.forEach(cardCons => {
    //loop to create a card for each copy
    for (let i = 0; i < cardCons.copies; i++)
    {
      const card = {};
      card.id = id;
      // loop over object and add all key/values 
      for (const key in cardCons)
      {
        if(key !== "copies")
          card[key] = cardCons[key];
      }
      deck.push(card);
      id++;
    }
  });
  return deck;
}

function createHazardDeck(starterID, construcionArr, hazardArr)
{
  let id = starterID;
  const deck = [];

  construcionArr.forEach(cardCons => {
    //loop over power array, 1 value for each card to create
    for (let i = 0; i < cardCons.power.length; i++)
    {
      const card = {};
      card.id = id;
      card.name = cardCons.name;
      card.power = cardCons.power[i];
      // attach hazard
      const hazardID = cardCons.hID[i];
      const hazard = hazardArr[hazardID];
      for (const key in hazard)
      {
        card[key] = hazard[key];
      }
      // next id
      id++;
      deck.push(card);
    }
  })
  return deck;
}

export default App;
