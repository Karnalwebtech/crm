import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure /react is imported

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    addNewOrder: builder.mutation<any, any>({
      query: (data) => {
        const formData = new FormData();
        for (let [key, value] of Object.entries(data)) {
          if (key === "image" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("image", file));
          } else if (key === "invoice" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("invoice", file));
          } else if (key === "doket" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("doket", file));
          } else if (key === "product") {
            formData.append("products_details", JSON.stringify(value));
          } else if (key === "services") {
            formData.append("services", JSON.stringify(value));
          } else if (key === "i") {
            formData.append("i", JSON.stringify(value));
          } else {
            // Handle different types of values
            if (typeof value === "object" && value !== null) {
              formData.append(key, JSON.stringify(value)); // Convert object to JSON string
            } else if (typeof value === "string") {
              formData.append(key, value); // Append if value is a string
            } else if (
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              formData.append(key, value.toString()); // Convert numbers and booleans to string
            } else {
              formData.append(key, ""); // Default to empty string if value is null or undefined
            }
          }
        }

        return {
          url: "/order/add",
          method: "POST",
          body: formData, // Use formData as body
        };
      },
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    update: builder.mutation<any, any>({
      query: (data) => {
        const formData = new FormData();
        for (let [key, value] of Object.entries(data)) {
          if (key === "image" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("image", file));
          } else if (key === "invoice" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("invoice", file));
          } else if (key === "doket" && Array.isArray(value)) {
            value.forEach((file: any) => formData.append("doket", file));
          } else if (key === "product") {
            formData.append("products_details", JSON.stringify(value));
          } else if (key === "services") {
            formData.append("services", JSON.stringify(value));
          } else if (key === "i") {
            formData.append("i", JSON.stringify(value));
          } else {
            // Handle different types of values
            if (typeof value === "object" && value !== null) {
              formData.append(key, JSON.stringify(value)); // Convert object to JSON string
            } else if (typeof value === "string") {
              formData.append(key, value); // Append if value is a string
            } else if (
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              formData.append(key, value.toString()); // Convert numbers and booleans to string
            } else {
              formData.append(key, ""); // Default to empty string if value is null or undefined
            }
          }
        }

        return {
          url: "/order/update",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    // action: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `/categorie/remove/${data.id}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Categorie", id: "LIST" }],
    // }),
    getSingle: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/order/data/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    getAllOrders: builder.query<
      any,
      {
        is_delete?: string;
        keyword?: string;
        status?: string;
        rowsPerPage?: number;
        page?: number;
        is_active?: string;
      } | void
    >({
      query: (filters) => {
        // Initialize the query params object with the default value for isActive
        const params: Record<string, string | number | boolean> = {
          // is_active: filters.is_active, // Default to true
        };
        // Add filters to the query parameters if they are present
        if (filters) {
          if (filters.is_active && filters.is_active !== "final") {
            params.is_active = filters.is_active;
          }
          if (filters.is_delete) {
            params.is_delete = filters.is_delete;
          }

          if (filters.keyword) {
            params.keyword = filters.keyword;
          }
          if (filters.status && filters.status !== "all") {
            params.status = filters.status;
          }
          if (filters.rowsPerPage) {
            params.rowsPerPage = filters.rowsPerPage; // Convert number to string
          }
          if (filters.page) {
            params.page = filters.page; // Convert number to string
          }
        }

        return {
          url: "/order/all-orders",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

// Correct hook name generated by createApi
export const {
  useAddNewOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleMutation,
  useUpdateMutation,
} = orderApi;
