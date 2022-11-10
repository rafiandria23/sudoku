import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import update from 'immutability-helper';

// Types
import {GameState} from '@/types';

const initialState: GameState = {
  current: null,
  list: [],
};

export const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<GameState['current']>) {
      state = update(state, {
        current: {
          $set: action.payload,
        },
      });
    },
    addList(state, action: PayloadAction<GameState['list'][number]>) {
      state.list.push(action.payload);
    },
    clearList(state) {
      state.list = [];
    },
  },
});

export const {setCurrent, addList, clearList} = slice.actions;

export default slice.reducer;