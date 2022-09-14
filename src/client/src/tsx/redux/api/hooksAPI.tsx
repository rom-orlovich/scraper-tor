import { API_ROUTES, Paste } from "../api/interfaceAPI";

import { apiCreateCRUDHooks } from "./apiCreateCRUDHooks";

// Each on of the api object contains the CRUD hooks of the endpoint.
export const PastesApi = apiCreateCRUDHooks<Paste>({
  reducerPath: "PastesApi",
  baseUrl: API_ROUTES.PastesApi,
  singleEntityName: "",
  listId: "Pastes",
});

export const apiCreatCrudArr = [PastesApi];

// Create Reducer arr that contains  object with key of the redcuer name and value the reducer function.
let reducersArr = {};
apiCreatCrudArr.forEach((value) => {
  reducersArr = { ...reducersArr, [value.reducerPath]: value.reducer };
});
export { reducersArr };

// Create middlewareArr from the apiCreateCrudArr.
export const middlewareArr = apiCreatCrudArr.map((el) => el.middleware);
