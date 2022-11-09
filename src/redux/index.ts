import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

// APIs
import {SudokuAPI} from '@/api';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  combineReducers({
    [SudokuAPI.reducerPath]: SudokuAPI.reducer,
  }),
);

const store = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(SudokuAPI.middleware);
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
