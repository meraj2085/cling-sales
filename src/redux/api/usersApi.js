import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const USERS_URL = "/users";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userRegister: build.mutation({
      query: (signUpData) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        data: signUpData,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } = usersApi;
