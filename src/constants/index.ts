import {Dimensions} from 'react-native';

export enum GameDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  RANDOM = 'random',
}

export enum GameStatus {
  SOLVED = 'solved',
  UNSOLVED = 'unsolved',
  BROKEN = 'broken',
}

export enum Tag {
  BOARD = 'Board',
}

export const BoardConstant = {
  CellSize: Math.round(Dimensions.get('window').width / 10),
};
