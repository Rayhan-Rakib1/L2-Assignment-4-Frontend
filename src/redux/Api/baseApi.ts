// src/redux/Api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '@/type';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getTasks: builder.query<IBook[], void>({
      query: () => '/books',
      transformResponse: (response: { success: boolean; message: string; data: IBook[] }) =>
        response.data,
    }),
  }),
});

export const { useGetTasksQuery } = baseApi;
