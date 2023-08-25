import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    fetchAll: builder.query({
      query: (option = '') => {
        return {
          url: "/user"+option,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["user"],
    }),
    fetchOne: builder.query({
        query: (id) => '/user/' + id,
        providesTags: ["user"],
    }),
    createUser: builder.mutation({
        query: (info) => {
          return {
            url: "/user",
            method: "POST",
            body: info,
            credentials: "include",
          };
        },
        invalidatesTags: ["user"],
      }),
    updateUser: builder.mutation({
      query: ({id, info}) => {
        return {
          url: "/user/" + id,
          method: "PATCH",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["user"],
    })
  }),
});

export const {
  useFetchAllQuery,
  useFetchOneQuery,
  useCreateUserMutation,
  useUpdateUserMutation
} = userApi;
export default userApi;
