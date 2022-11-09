import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Constants
import {Tag} from '@/constants';

// Types
import type {
  GetBoardRequestParams,
  GetBoardResponseData,
  GetBoardTransformedResponseData,
  SolveBoardRequestParams,
  SolveBoardResponseData,
  SolveBoardTransformedResponseData,
  ValidateBoardRequestParams,
  ValidateBoardResponseData,
} from '@/types';

// Utils
import {encodeBoard, decodeBoard} from '@/utils';

const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sugoku.herokuapp.com',
  }),
  endpoints(build) {
    return {
      getBoard: build.query<
        GetBoardTransformedResponseData,
        GetBoardRequestParams
      >({
        providesTags: [Tag.BOARD],
        query({difficulty}) {
          return {
            method: 'GET',
            url: '/board',
            params: {
              difficulty,
            },
          };
        },
        transformResponse(data: GetBoardResponseData) {
          return {
            board: decodeBoard(data.board),
          };
        },
      }),
      solveBoard: build.mutation<
        SolveBoardTransformedResponseData,
        SolveBoardRequestParams
      >({
        invalidatesTags: [Tag.BOARD],
        query({board}) {
          return {
            method: 'POST',
            url: '/solve',
            body: encodeBoard(board),
          };
        },
        transformResponse(data: SolveBoardResponseData) {
          return {
            ...data,
            solution: decodeBoard(data.solution),
          };
        },
      }),
      validateBoard: build.mutation<
        ValidateBoardResponseData,
        ValidateBoardRequestParams
      >({
        invalidatesTags: [Tag.BOARD],
        query({board}) {
          return {
            method: 'POST',
            url: '/validate',
            body: encodeBoard(board),
          };
        },
      }),
    };
  },
  tagTypes: [Tag.BOARD],
});

export const {
  reducerPath,
  reducer,
  middleware,
  useLazyGetBoardQuery,
  useSolveBoardMutation,
  useValidateBoardMutation,
} = API;
