import axios from 'axios';

const api = axios.create({baseURL: 'https://sugoku.herokuapp.com'});

import {setLoading} from './game';
import {setPlayerDifficulty, setPlayerScore} from './player';

const fetchBoardCompleted = board => ({
  type: 'FETCH_BOARD',
  payload: {
    board,
  },
});

export const fetchBoard = difficulty => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const {data} = await api.get(`/board?difficulty=${difficulty}`);
      const apiBoard = data.board;
      const defaultBoardCoordinates = apiBoard.map(row => {
        return row.map(col => {
          if (col === 0) {
            return {val: '', canChange: true};
          }
          return {val: String(col), canChange: false};
        });
      });
      dispatch(fetchBoardCompleted(defaultBoardCoordinates));
      dispatch(setPlayerDifficulty(difficulty));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err.response);
      dispatch(setLoading(false));
    }
  };
};

const restoreBoard = board => {
  const restoredBoard = board.map(row => {
    return row.map(col => {
      return Number(col.val);
    });
  });
  return restoredBoard;
};

const encodeBoard = board => {
  return board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    '',
  );
};

const encodeParams = params => {
  return Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
};

const validateSudokuCompleted = board => ({
  type: 'VALIDATE_SUDOKU',
  payload: {
    board,
  },
});

export const validateSudoku = board => {
  return dispatch => {
    dispatch(setLoading(true));
    api
      .post('/validate', encodeParams({board: restoreBoard(board)}))
      .then(({data}) => {
        const sudokuStatus = data.status;
        if (sudokuStatus === 'unsolved' || 'broken') {
          dispatch(setSudokuStatus(data.status));
          dispatch(validateSudokuCompleted(board));
          dispatch(setPlayerScore(100));
        } else {
          dispatch(setSudokuStatus(data.status));
          dispatch(validateSudokuCompleted(board));
        }
        dispatch(setLoading(false));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(setLoading(false));
      });
  };
};

const solveSudokuCompleted = board => ({
  type: 'SOLVE_SUDOKU',
  payload: {
    board,
  },
});

export const solveSudoku = board => {
  board = restoreBoard(board);
  return dispatch => {
    dispatch(setLoading(true));
    api
      .post('/solve', encodeParams({board}))
      .then(({data}) => {
        const apiBoard = data.solution;
        const defaultBoardCoordinates = apiBoard.map(row => {
          return row.map(col => {
            if (col === 0) {
              return {val: '', canChange: true};
            }
            return {val: String(col), canChange: false};
          });
        });
        dispatch(setSudokuStatus(data.status));
        dispatch(solveSudokuCompleted(defaultBoardCoordinates));
        dispatch(setLoading(false));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(setLoading(false));
      });
  };
};

const resetSudokuCompleted = board => ({
  type: 'RESET_SUDOKU',
  payload: {
    board,
  },
});

export const resetSudoku = board => {
  return dispatch => {
    dispatch(setLoading(true));
    const boardToReset = board.map(row => {
      return row.map(col => {
        col.val = '';
        return col;
      });
    });
    dispatch(setSudokuStatus('successfuly reset!'));
    dispatch(setLoading(false));
    dispatch(resetSudokuCompleted(boardToReset));
  };
};

export const setSudoku = board => ({
  type: 'SET_SUDOKU',
  payload: {
    board,
  },
});

export const setSudokuStatus = (status: string) => ({
  type: 'SET_SUDOKU_STATUS',
  payload: {
    status,
  },
});
