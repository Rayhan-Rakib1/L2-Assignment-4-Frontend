// src/redux/Api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook, IBorrowSummaryRecord } from "@/type";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["book"],
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBook[];
      }) => response.data,
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books/create-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (_id: string) => ({
        url: `/books/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    borrowBook: builder.mutation({
      query: ({ book, quantity, dueDate }) => ({
        url: "/borrow/borrow-book",
        method: "POST",
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ["book"],
    }),
    getAllBorrowBooks: builder.query<IBorrowSummaryRecord[], void>({
      query: () => "/borrow",
      providesTags: ["book"],
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBorrowSummaryRecord[];
      }) => response.data,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetAllBorrowBooksQuery,
} = baseApi;
