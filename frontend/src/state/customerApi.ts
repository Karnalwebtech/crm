const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { customer_form, customer_list } from "@/types/Customer_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",
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
  tagTypes: ["Customer"],
  endpoints: (build) => ({
    addNewCustomer: build.mutation<any, customer_form>({
      query: (data) => ({
        url: "/customer/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    update_customer: build.mutation<any, customer_form>({
      query: (data) => ({
        url: "/customer/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    actionCustomer: build.mutation({
      query: (data) => {
        return {
          url: `/customer/remove/${data.id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    getSingleCustomer: build.mutation<customer_list, string>({
      query: (id: string) => ({
        url: `/customer/data/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    getAllcustomer: build.query<
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
          url: "/customer/all-customers",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },

      providesTags: [{ type: "Customer", id: "LIST" }],
    }),
  }),
});

// Export both the mutation and the query hooks
export const {
  useAddNewCustomerMutation,
  useUpdate_customerMutation,
  useActionCustomerMutation,
  useGetSingleCustomerMutation,
  useGetAllcustomerQuery,
} = customerApi;
