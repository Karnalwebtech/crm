import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = cookiesManager.get("token"); // Get token from cookies
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
    credentials: "include",
  }),

  tagTypes: ["cache", "contact-us"],
  endpoints: (build) => ({
    removeCache: build.mutation<any, any>({
      query: (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("key", data?.pattern || "");
        return {
          url: "v2/remove-cache",
          method: "POST",
          body: formData, // Use formData as body
        };
      },
      invalidatesTags: ["cache"],
    }),
    getAllContacts: build.query<
      any,
      {
        rowsPerPage?: number;
        page?: number;
      } | void
    >({
      query: (filters) => {
        const params: Record<string, string | number | boolean> = {
          // is_active: filters.is_active, // Default to true
        };
        if (filters) {
          if (filters.rowsPerPage) {
            params.rowsPerPage = filters.rowsPerPage; // Convert number to string
          }
          if (filters.page) {
            params.page = filters.page; // Convert number to string
          }
        }

        return {
          url: "v2/contact-us",
          params,
          method: "GET",
        };
      },
      providesTags: ["contact-us"],
    }),
  }),
});

export const { useRemoveCacheMutation, useGetAllContactsQuery } = api;
