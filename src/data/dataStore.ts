import { createStore, Store } from "redux";
import { StoreReducer } from "./reducers";
import { StoreData, StoreAction } from "./types";

export const dataStore: Store<StoreData, StoreAction> = createStore(StoreReducer);
