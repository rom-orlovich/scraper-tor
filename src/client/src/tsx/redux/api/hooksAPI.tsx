import { AlertsAPI, API_ROUTES, Paste } from "../api/interfaceAPI";

import { apiCreateCRUDHooks } from "./apiCreateCRUDHooks";

// Each on of the api object contains the CRUD hooks of the endpoint.
export const PastesApi = apiCreateCRUDHooks<Paste>({
  reducerPath: "PastesApi",
  baseUrl: API_ROUTES.PastesApi,
  singleEntityName: API_ROUTES.PasteSingleEntity,
  listId: "Pastes",
});
export const alertsApi = apiCreateCRUDHooks<AlertsAPI>({
  reducerPath: "alertsApi",
  baseUrl: API_ROUTES.ALERTS_ROUTE,
  singleEntityName: API_ROUTES.ALERTS_ENTITY,
  listId: "alerts_list",
}).injectEndpoints({
  endpoints: (builder) => ({
    deleteAll: builder.mutation({
      query: () => ({
        url: ``,
        method: "delete",
      }),
      invalidatesTags: [{ type: API_ROUTES.ALERTS_ENTITY, id: "alerts_list" }],
    }),
  }),
});

export const apiCreateCrudArr = [PastesApi,alertsApi];

// Create Reducer arr that contains  object with key of the reducer name and value the reducer function.
let reducersArr = {};
apiCreateCrudArr.forEach((value) => {
  reducersArr = { ...reducersArr, [value.reducerPath]: value.reducer };
});
export { reducersArr };

// Create middlewareArr from the apiCreateCrudArr.
export const middlewareArr = apiCreateCrudArr.map((el) => el.middleware);
