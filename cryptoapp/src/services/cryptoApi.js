import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const cryptoApiHeaders = {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
    }),
});

// This is a redux hook approach. Put "use" and
// "Query" before and at the end respectively
export const { useGetCryptosQuery } = cryptoApi;
