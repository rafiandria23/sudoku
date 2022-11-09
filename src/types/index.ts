// Constants
import {GameDifficulty, GameStatus} from '@/constants';

export interface Game {
  difficulty: GameDifficulty;
  board: {
    editable: boolean;
    value: number;
  }[][];
  status: GameStatus;
}

export interface GetBoardRequestParams {
  difficulty: GameDifficulty;
}
export interface GetBoardResponseData {
  board: number[][];
}
export interface GetBoardTransformedResponseData {
  board: Game['board'];
}

export interface SolveBoardRequestParams {
  board: Game['board'];
}
export interface SolveBoardResponseData {
  difficulty: Game['difficulty'];
  solution: number[][];
  status: Game['status'];
}
export interface SolveBoardTransformedResponseData {
  difficulty: Game['difficulty'];
  solution: Game['board'];
  status: Game['status'];
}

export interface ValidateBoardRequestParams {
  board: Game['board'];
}
export interface ValidateBoardResponseData {
  status: Game['status'];
}

export interface GameState {
  current: Game | null;
  list: Game[];
}

// Screen Route Param Types
export type GameScreenRouteParams = {
  game: Game;
};

export type RootStackParams = {
  Game: GameScreenRouteParams;
};
