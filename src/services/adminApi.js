import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//using rtk query to fetch the data from the provided api
export const adminApi = createApi({
    reducerPath : 'adminApi',
    baseQuery : fetchBaseQuery({baseUrl : 'https://geektrust.s3-ap-southeast-1.amazonaws.com/'}),
    endpoints : ( builder )=>({
        getAdmin :  builder.query({
        query : () => 'adminui-problem/members.json',
    }),
 }),
});


// useGetAdminQuery : custom hook for fetching the data
export const { useGetAdminQuery } = adminApi;