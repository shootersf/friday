import { abilities } from "../constants";

export const ageingCards = [
	{
		name: "scared",
		power: 0,
		copies: 2,
		ability: abilities.highZero,
		difficulty: 0
	},
	{
		name: "hungry",
		power: 0,
		copies: 1,
		ability: abilities.minus1Life,
		difficulty: 0
	},
	{
		name: "stupid",
		power: -2,
		copies: 2,
		difficulty: 0
	},
	{
		name: "very stupid",
		power: -3,
		copies: 1,
		difficulty: 0
	},
	{
		name: "very tired",
		power: 0,
		copies: 1,
		ability: abilities.stopFree,
		difficulty: 0
	},
	{
		name: "distracted",
		power: -1,
		copies: 1,
		difficulty: 0
	},
	{
		name: "suicidal",
		power: -5,
		copies: 1,
		difficulty: 1
	},
	{
		name: "moronic",
		power: -4,
		copies: 1,
		difficulty: 1
	},
	{
		name: "very hungry",
		power: 0,
		copies: 1,
		difficulty: 1,
		ability: abilities.minus2Life
	}
]