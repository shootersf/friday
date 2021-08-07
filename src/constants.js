// Constants
export const gameStateEnum = {
    TURN_OVER: 0,
    SELECTING_HAZARD: 1,
    FIGHTING_HAZARD: 2,
    ACTIVATING_ABILITY: 3,
    EXILING: 4,
    GAME_OVER: 5,
}

export const abilities = {
    plus1Life: 0,
    plus2Life: 1,
    plus1Card: 2,
    plus2Card: 3,
    destroy: 4,
    double: 5,
    copy: 6,
    phase: 7,
    sort3: 8,
    exchange1: 9,
    exchange2: 10,
    below: 11,
    minus1Life: 12,
    minus2Life: 13,
    highZero: 14,
    stopFree: 15,
}

export const TOTAL_LIVES = 20;