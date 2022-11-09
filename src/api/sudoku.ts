import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Utils
import {encodeBoard} from '@/utils/sudoku';

const SudokuAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sugoku.herokuapp.com',
  }),
  endpoints(build) {
    return {
      getBoard: build.query({
        providesTags: ['Board'],
        query({difficulty}) {
          return {
            method: 'GET',
            url: '/board',
            params: {
              difficulty,
            },
          };
        },
      }),
      solveBoard: build.mutation({
        invalidatesTags: ['Board'],
        query({board}) {
          return {
            method: 'POST',
            url: '/solve',
            body: encodeBoard(board),
          };
        },
      }),
      validateBoard: build.mutation({
        invalidatesTags: ['Board'],
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
  tagTypes: ['Board'],
});

export default SudokuAPI;
