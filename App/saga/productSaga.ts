import { call, put, takeLatest } from "redux-saga/effects";
import {
  addProduct,
  ApiResponseI,
  editProduct,
  getProducts,
  ProductsI,
} from "../api/product";
import { ActionI } from "../redux";

function* fetchProduct(action: ActionI) {
  try {
    const products: ProductsI[] = yield call(getProducts);
    yield put({ type: "PRODUCT_FETCHED", payload: products });
  } catch (e) {
    yield put({ type: "PRODUCT_FETCHING_ERROR", payload: e });
  }
}

function* productAddRequested(action: ActionI) {
  yield put({ type: "PRODUCT_ADD_INITIATED", payload: null });
  try {
    const response: ApiResponseI = yield call(addProduct, action.payload);
    yield put({ type: "PRODUCT_ADD_SUCCESS", payload: null });
    yield put({ type: "PRODUCT_FETCHING_REQUEST", payload: null });
  } catch (e) {
    yield put({ type: "PRODUCT_ADD_ERROR", payload: e });
  }
}

function* editProductRequest(action: ActionI) {
  yield put({ type: "PRODUCT_EDIT_INITIATED", action: null });
  try {
    const response: ApiResponseI = yield call(editProduct, action.payload);
    yield put({ type: "PRODUCT_EDIT_SUCCESS", payload: null });
    yield put({ type: "PRODUCT_FETCHING_REQUEST", payload: null });
  } catch (e) {
    yield put({ type: "PRODUCT_EDIT_ERROR", payload: e });
  }
}

function* productSaga() {
  yield takeLatest("PRODUCT_FETCHING_REQUEST", fetchProduct);
  yield takeLatest("PRODUCT_ADD_REQUESTED", productAddRequested);
  yield takeLatest("PRODUCT_EDIT_REQUESTED", editProductRequest);
}

export default productSaga;
