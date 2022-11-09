/* 
  case 'SET_PLAYER_NAME':
case 'SET_PLAYER_DIFFICULTY':
case 'SET_PLAYER_SCORE':
    
case 'SET_PLAYER_HINTS':
    
*/

export const setPlayerName = playerName => ({
  type: 'SET_PLAYER_NAME',
  payload: {
    name: playerName,
  },
});

export const setPlayerDifficulty = difficulty => ({
  type: 'SET_PLAYER_DIFFICULTY',
  payload: {
    difficulty,
  },
});

export const setPlayerScore = score => ({
  type: 'SET_PLAYER_SCORE',
  payload: {
    score,
  },
});

export const setPlayerHints = hints => ({
  type: 'SET_PLAYER_HINTS',
  payload: {
    hints,
  },
});
