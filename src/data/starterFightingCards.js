import { abilities } from "../constants"

export const starterFightingCards = [
	{
		"name": "distracted",
		"power": -1,
		"copies": 5,
	},
	{
		"name": "weak",
		"power": 0,
		"copies": 8,
	},
	{
		"name": "focused",
		"power": 1,
		"copies": 3,
	},
	{
		"name": "genius",
		"power": 2,
		"copies": 1,
	},
	{
		"name": "eating",
		"power": 0,
		"copies": 1,
		"ability": abilities.plus1Life,
	}
]