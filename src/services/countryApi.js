import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = import.meta.env.VITE_Countries_API_KEY;

export const countryApi = createApi({
  reducerPath: "countryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.restcountries.com/countries/v5",
  }),

  endpoints: (builder) => ({
    getCountries: builder.query({
      query: ({ page = 1, limit = 10, search = "", region = "" }) => ({
        url: "",
        params: {
          limit: limit,
          offset: (page - 1) * limit,
          ...(search.trim() && { q: search.trim() }),
          ...(region && { region }),
        },
        headers: {
          Authorization: `Bearer ${APIKEY}`,
        },
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
