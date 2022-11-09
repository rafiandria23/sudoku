import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

// Queries
import {
  reducerPath as queryReducerPath,
  reducer as queryReducer,
  middleware as queryMiddleware,
} from '@/redux/queries';

// Slices
import gameReducer from '@/redux/slices';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  combineReducers({
    [queryReducerPath]: queryReducer,
    game: gameReducer,
  }),
);

const store = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });

    middlewares.push(queryMiddleware);

    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type Dispatch = typeof store['dispatch'];
export type RootState = ReturnType<typeof store['getState']>;

export default store;
