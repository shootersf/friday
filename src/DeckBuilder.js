export function DeckBuilder(initialDeck, setDeckState, setDiscardState) 
{
	let _deck = initialDeck;
	let _discard = [];
	let _deckState = setDeckState;
	let _discardState = setDiscardState;
	 setDeckState( prev => _deck);

	// Object returned 
	return {
		draw() {
			// Null if empty
			if(_deck.length === 0) return null;

			// Top card
			let card = _deck.pop();

			// Update state
			_deckState( () => _deck);

			return card;
		},
		putOnTop(card) {
			_deck.push(card);

			// Update state
			_deckState( () => _deck);
		},
		addToDiscard(...cards) {
			_discard.unshift(...cards);

			_discardState( () => _discard);
		},
		shuffleWithDiscard() {
			// Temporary new deck
			const shuffled = _deck.slice();
			shuffled.push(..._discard);

			// Knuth shuffle
			for (let i = shuffled.length - 1; i >= 0; i--)
			{
			 const randomCard = Math.floor(Math.random() * (i + 1));
			 [shuffled[i], shuffled[randomCard]] = [shuffled[randomCard], shuffled[i]];
			}
		  
			// Assign new values
			_deck = shuffled;
			_discard = [];
			_deckState( ()=> _deck);
			_discardState( ()=> _discard);
		},
		deckLength() {
			return _deck.length;
		},
		discardLength() {
			return _discard.length;
		},
	}
}