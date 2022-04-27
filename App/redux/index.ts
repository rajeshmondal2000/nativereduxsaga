import { combineReducers } from "redux";
import productReducer, { ProductInitialState } from "./productReducer";

export interface ActionI {
  type: string;
  payload: any;
}

export interface StateI {
  products: ProductInitialState;
}

const reducers = combineReducers({ products: productReducer });

export default reducers;
