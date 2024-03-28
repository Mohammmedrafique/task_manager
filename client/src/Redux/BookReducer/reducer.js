// reducer.js
import axios from "axios";
import {
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  PATCH_BOOK_SUCCESS,
} from "./actionTypes";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        error: null,
      };
    case GET_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Failed to fetch books",
      };
    case PATCH_BOOK_SUCCESS:
      return {
        ...state,
        error: null, // Clear any previous errors
      };
    default:
      return state;
  }
};
