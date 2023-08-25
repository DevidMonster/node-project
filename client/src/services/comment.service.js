import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api'
    }),
    tagTypes: ['comment'],
    endpoints: builder => ({
        fetchAllComment: builder.query({
            query: (option = '') => "/comment/"+option,
            providesTags: ['comment']
        }),
        fetchById: builder.query({
            query: (id) => "/comment/post/" + id,
            providesTags: ['comment']
        }),
        createComment: builder.mutation({
            query: (cmt) => {
                return {
                    url: '/comment',
                    method: 'POST',
                    body: cmt
                }
            },
            invalidatesTags: ['comment']
        }),
        removeComment: builder.mutation({
            query: (id) => {
                return {
                    url: '/comment/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['comment']
        }),
    })
})


export const { useFetchAllCommentQuery, useFetchByIdQuery, useCreateCommentMutation, useRemoveCommentMutation } = commentApi
export default commentApi