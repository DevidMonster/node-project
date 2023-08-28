import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    fetchAllPost: builder.query({
      query: (option = '') => "/posts"+option,
      providesTags: ["post", "comment"],
    }),
    fetchOne: builder.query({
      query: (id) => "/posts/" + id,
      providesTags: ["post"],
    }),
    fetchById: builder.query({
      query: (id) => "/post/" + id,
      providesTags: ["post"],
    }),
    fetchTrash: builder.query({
        query: () => "/posts-trash",
        providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, post }) => ({
        url: "/posts/" + id,
        method: "PATCH",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "/posts/" + id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: "/posts/" + id + '/del',
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    restorePost: builder.mutation({
        query: (id) => ({
          url: "/posts/" + id + '/restore',
          method: "PATCH",
          credentials: "include",
        }),
        invalidatesTags: ["post"],
      }),
  }),
});

export const {
  useFetchAllPostQuery,
  useFetchOneQuery,
  useFetchByIdQuery,
  useFetchTrashQuery,
  useCreatePostMutation,
  useRemovePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useRestorePostMutation
} = postApi;
export default postApi;
