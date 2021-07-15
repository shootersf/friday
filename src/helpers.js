/* Contains helper functions for deck creation and card draw */

export function drawCard(deck, setDeck) {
	// Select random position in deck array
	const position = Math.floor(Math.random() * deck.length);
	const drawnCard = deck[position];
  
	// filter card from deck 
	//const filteredDeck = deck.filter( card => card.id != drawCard.id);
  
	//setDeck( deck.filter( card => card.id != drawnCard.id));
	setDeck( previousState => {
	  return previousState.filter( card => card.id !== drawnCard.id);
	})
  
	return drawnCard;
}

/*
 *  Takes an ID to start counting from and an array of constructors objects (cards without id and with a copies key)
 *  Coverts them to a deck with ids and no copies key
*/
export function createDeck(starterID, constructionArr)
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

export function createHazardDeck(starterID, construcionArr, hazardArr)
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