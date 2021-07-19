/* Contains helper functions for deck creation and card draw */

export function drawCard(fromSetter, toSetter) {
	// console.log("drawing card");

  fromSetter( previousCards => {
    console.log("setting draw pile");
    const[card, ...remainder] = previousCards;

    sendToToSetter(card);

    return [...remainder];
  })

  const sendToToSetter = (card) => {
    // console.log("sending...");
    toSetter( previousCards => {
      // console.log(previousCards);

      // Messy fix for duplicates until I can figure out whats wrong
      if (previousCards.some( element => element === card))
      {
        return [...previousCards];
      }
      return [...previousCards, card];
    })
  }
  
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

export function shuffleDeck(deck)
{
  const shuffled = deck.slice();

  // Knuth shuffle
  for (let i = shuffled.length - 1; i >= 0; i--)
  {
   const randomCard = Math.floor(Math.random() * (i + 1));
   [shuffled[i], shuffled[randomCard]] = [shuffled[randomCard], shuffled[i]];
  }

  return shuffled;
}

export function calculateToughnessRemaining(cards, toughness)
{
  cards.forEach(card => toughness -= card.power);
  return toughness;
}