import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const LEADS_URL = "/leads";

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllLeads: build.query({
      query: (arg) => {
        return {
          url: `${LEADS_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          leads: response,
          meta,
        };
      },
      providesTags: [tagTypes.leads],
    }),
  }),
});

export const {
  useGetAllLeadsQuery,
} = leadsApi;
