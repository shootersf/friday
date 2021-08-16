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

// Experimental inheritance 
export function AgeingDeck(init) {
  // 2 temp decks with different difficulties
  const tempEasy = Object.create(BasicDeck(init.filter(card => card.difficulty === 0)));
  const tempHard = Object.create(BasicDeck(init.filter(card => card.difficulty === 1)));
  tempEasy.shuffle();
  tempHard.shuffle();
  
  const ADeck = Object.create(BasicDeck([...tempHard.getDeck(), ...tempEasy.getDeck()]));
  return ADeck;
}

export function HazardDeck(init, shuffleCallback) {
  const HDeck = Object.create(BasicDeck(init));

  HDeck.draw = function() {
    if (this.getDeck().length === 0) {
      this.addDiscardBack();
      this.shuffle();
      shuffleCallback();
    }
    const card = this.getDeck().pop();
    return card;
  }

  return HDeck;
}

export function FightingDeck(init, ageingDeck) {
  const FDeck = Object.create(BasicDeck(init));

  FDeck.draw = function() {
    if (this.getDeck().length === 0) {
      const ageingCard = ageingDeck.draw();
      this.addDiscardBack();
      this.putOnTop(ageingCard);
      this.shuffle();
    }
    const card = this.getDeck().pop();
    return card;
  }

  FDeck.putOnBottom = function(card) {
    if (this.getDeck().length === 0) {
      const ageingCard = ageingDeck.draw();
      this.addDiscardBack();
      this.putOnTop(ageingCard);
      this.shuffle();
    }
    this.getDeck().unshift(card);
  }

  return FDeck;
}

function BasicDeck(init) {
  let _deck = init;
  let _discard = [];

  return {
    draw() {
      if (_deck.length === 0) return null;

      const card = _deck.pop();
      return card;
    },
    addDiscardBack() {
     _deck.push(_discard);
     _discard = [];
    },
    shuffle() {
      // Temporary new deck
			const shuffled = _deck.slice();

			// Knuth shuffle
			for (let i = shuffled.length - 1; i >= 0; i--)
			{
			 const randomCard = Math.floor(Math.random() * (i + 1));
			 [shuffled[i], shuffled[randomCard]] = [shuffled[randomCard], shuffled[i]];
			}
		  
			// Assign new values
			_deck = shuffled;
    },
    putOnTop(card) {
			_deck.push(card);
		},
		addToDiscard(...cards) {
			_discard.push(...cards);
		},
    deckLength() {
			return _deck.length;
		},
		discardLength() {
			return _discard.length;
		},
    getDeck() {
      return _deck;
    },
    getDiscard() {
      return _discard;
    },
  }
}