import { abilities } from "../constants"

export const advancedFightingCards = [
	{
		"name": "books",
		"power": [0],
		"hID":[0],
		"ability": abilities.phase,
	},
	{
		"name": "deception",
		"power": [0,1],
		"hID": [0,1],
		"ability": abilities.below,
	},
	{
		"name": "equipment",
		"power": [0,0],
		"hID": [0,0],
		"ability": abilities.plus2Card,
	},
	{
		"name": "experience",
		"power": [2,3],
		"hID": [2,3],
		"ability": abilities.plus1Card,
	},
	{
		"name": "food",
		"power": [0,0,1,1,2],
		"hID": [0,0,1,1,2],
		"ability": abilities.plus1Life,
	},
	{
		"name": "mimicry",
		"power": [0,1],
		"hID": [0,1],
		"ability": abilities.copy,
	},
	{
		"name": "realization",
		"power": [0,1,2,3],
		"hID": [0,1,2,3],
		"ability": abilities.destroy,
	},
	{
		"name": "repeat",
		"power": [1,2],
		"hID": [1,2],
		"ability": abilities.double,
	},
	{
		"name": "strategy",
		"power": [0,0],
		"hID": [0,0],
		"ability": abilities.exchange2,
	},
	{
		"name": "strategy",
		"power": [2,3],
		"hID": [2,3],
		"ability": abilities.exchange1,
	},
	{
		"name": "vision",
		"power": [2,3],
		"hID": [2,3],
		"ability": abilities.sort3,
	},
	{
		"name": "weapon",
		"power": [2,2,4,4],
		"hID": [1,1,4,4]
	}
]