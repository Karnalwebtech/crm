const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { Vendor_Data, vendr_form, vendr_list } from "@/types/Vendor_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Vendors {
  name: string;
  phone: string;
  email: string;
}

export const vendorApi = createApi({
  reducerPath: "vendorApi",
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

  tagTypes: ["Vendor"],
  endpoints: (build) => ({
    addNew_vendor: build.mutation<Vendor_Data, vendr_form>({
      query: (data) => ({
        url: "/vendor/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    update_vendor: build.mutation<Vendor_Data, vendr_form>({
      query: (data) => ({
        url: "/vendor/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    actionVendor: build.mutation({
      query: (data) => {
        return {
          url: `/vendor/remove/${data.id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    getSingeVendor: build.mutation<vendr_list, string>({
      query: (id: string) => ({
        url: `/vendor/data/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    getAllVendors: build.query<
      Vendors[],
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
          url: "/vendor/all-vendors",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },

      providesTags: [{ type: "Vendor", id: "LIST" }],
    }),
  }),
});

// Export both the mutation and the query hooks
export const {
  useAddNew_vendorMutation,
  useGetAllVendorsQuery,
  useActionVendorMutation,
  useGetSingeVendorMutation,
  useUpdate_vendorMutation,
} = vendorApi;
