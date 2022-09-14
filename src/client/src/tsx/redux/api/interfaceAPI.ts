import { OmitKey, PickKey } from "../../types";
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

// All the endpoints and the entities names.
export enum API_ROUTES {
  PastesApi = "/api/pastes",
  PasteSingleEntity = "paste",
}

export interface PayloadAPI<T> {
  id: number;
  payload: T;
}
export interface ResponseMutationAPI {
  message: string;
  id?: number;
}

export interface ResponseQueryAPI<T> {
  next: boolean;
  data: T[];
}

export interface Paste {
  title: string;
  author: string;
  date: string;
  id: number;
  content: string;
  url: string;
}
