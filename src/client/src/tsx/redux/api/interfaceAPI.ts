import { OmitKey, PickKey } from "../../types";
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

// All the endpoints and the entities names.
export enum API_ROUTES {
  PastesApi = "/api/pastes",
  PasteSingleEntity = "paste",
  ALERTS_ROUTE = "/api/alerts",
  ALERTS_ENTITY = "alert",
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
  countRows?:number
  data: T[];
}
export interface ErrorResponseAPI<T> {


  message: string;
}

export interface Paste {
  title: string;
  author: string;
  date: string;
  id: number;
  content: string;
  url: string;
}

export interface AlertsAPI {
  _id: Number,
  title: string,
  author: string,
  date: string,
}
