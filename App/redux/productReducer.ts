import { ActionI } from ".";
import { ProductsI } from "../api/product";

export interface ProductInitialState {
  products: Array<ProductsI>;
  isFetching: boolean;
  fetchingError: boolean;
  fetchingErrorMsg: string;
  addingStatus: {
    addingError: string;
    errorInAdding: boolean;
    isAdding: boolean;
    success: boolean;
  };
  edit: {
    product: ProductsI | null;
    isEditing: boolean;
    errorInEditing: boolean;
    editingError: string;
    success: boolean;
  };
  delete: {
    errorInDelete: boolean;
    deleteError: string;
    success: boolean;
  };
}

const initialState: ProductInitialState = {
  products: [],
  fetchingError: false,
  fetchingErrorMsg: "",
  isFetching: false,
  addingStatus: {
    isAdding: false,
    addingError: "",
    errorInAdding: false,
    success: false,
  },
  edit: {
    product: null,
    isEditing: false,
    errorInEditing: false,
    success: false,
    editingError: "",
  },
  delete: {
    errorInDelete: false,
    deleteError: "",
    success: false,
  },
};

function productReducer(state = initialState, action: ActionI) {
  switch (action.type) {
    case "PRODUCT_FETCHED":
      state = {
        ...state,
        products: action.payload,
      };
      return state;

    case "PRODUCT_FETCHING_ERROR":
      state = {
        ...state,
        fetchingError: true,
        fetchingErrorMsg: action.payload,
      };
      return state;

    case "PRODUCT_ADD_INITIATED":
      state = {
        ...state,
        addingStatus: {
          ...state.addingStatus,
          isAdding: true,
        },
      };

    case "PRODUCT_ADD_SUCCESS":
      state = {
        ...state,
        addingStatus: {
          ...state.addingStatus,
          isAdding: false,
          success: true,
        },
      };
      return state;

    case "PRODUCT_ADD_ERROR":
      state = {
        ...state,
        addingStatus: {
          ...state.addingStatus,
          isAdding: false,
          errorInAdding: true,
          addingError: action.payload,
        },
      };
      return state;

    case "PRODUCT_EDIT_INITIATED":
      state = {
        ...state,
        edit: {
          ...state.edit,
          isEditing: true,
        },
      };
      return state;

    case "PRODUCT_EDIT_SUCCESS":
      state = {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          success: true,
        },
      };
      return state;

    case "PRODUCT_EDIT_ERROR":
      state = {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          editingError: action.payload,
          errorInEditing: true,
        },
      };
      return state;

    case "PRODUCT_DELETE_SUCCESS":
      state = {
        ...state,
        delete: {
          ...state.delete,
          success: true,
        },
      };
      return state;

    case "PRODUCT_DELETE_ERROR":
      state = {
        ...state,
        delete: {
          ...state.delete,
          errorInDelete: true,
          deleteError: action.payload,
        },
      };
      return state;

    case "RESET_PRODUCT_ADD":
      state = {
        ...state,
        addingStatus: {
          ...state.addingStatus,
          success: false,
        },
      };
      return state;

    case "RESET_PRODUCT_EDIT":
      state = {
        ...state,
        edit: {
          ...state.edit,
          success: false,
        },
      };

    default:
      return state;
  }
}

export default productReducer;
