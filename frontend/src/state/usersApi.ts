import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { Login, Sign_up, User_Data } from "@/types/auth_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnyARecord } from "dns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["Users"],
  endpoints: (build) => ({
    loginUser: build.mutation<User_Data, Login>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST", // or 'GET' based on your API requirement
      }),
    }),
    profile: build.mutation<User_Data, Login>({
      query: (data) => ({
        url: "/auth/profile",
        method: "POST", 
        body: data,
      }),
    }),
    status_action: build.mutation<void, any>({
      query: (data) => {
        return {
          url: `/auth/action-status/${data.id}`,
          method: "POST",
          body:''
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    sign_up_user: build.mutation<User_Data, Sign_up>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    all: build.query<
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
        const params: Record<string, string | number | boolean> = {};
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
          url: "/auth/all",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },

      providesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useProfileMutation,
  useSign_up_userMutation,
  useLogoutMutation,
  useAllQuery,
  useStatus_actionMutation,
} = usersApi;
