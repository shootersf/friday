/* Contains helper functions for deck creation and card draw */

/*
 *  Takes an ID to start counting from and an array of constructors objects (cards without id and with a copies key)
 *  Coverts them to a deck with ids and no copies key
*/
export function createDeck(starterID, constructionArr, exileCost = 1)
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
      // Add exile cost
      card.exileCost = exileCost;

      deck.push(card);
      id++;
    }
  });
  return deck;
}

export function createHazardDeck(starterID, construcionArr, hazardArr, exileCost = 1)
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
      card.ability = cardCons.ability;
      card.power = cardCons.power[i];
      card.exileCost = exileCost;

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

