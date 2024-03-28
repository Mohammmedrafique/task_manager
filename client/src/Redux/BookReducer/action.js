import axios from "axios";
import {
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  PATCH_BOOK_SUCCESS,
} from "./actionTypes";
export const getBooks = () => (dispatch) => {
  dispatch({ type: GET_BOOKS_REQUEST });

  // Retrieve authentication token from local storage
  const token = localStorage.getItem("jwtToken");

  axios
    .get(`https://better-wasp-overshirt.cyclic.app/notes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    })
    .then((res) => {
      console.log("Response from getBooks API:", res.data);
      dispatch({ type: GET_BOOKS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("Error while fetching books:", err);
      dispatch({ type: GET_BOOKS_FAILURE });
    });
};

export const editBook = (id, data) => (dispatch) => {
  dispatch({ type: GET_BOOKS_REQUEST });

  // Retrieve authentication token from local storage
  const token = localStorage.getItem("jwtToken");

  axios
    .patch(
      `https://better-wasp-overshirt.cyclic.app/notes/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      }
    )
    .then((res) => {
      console.log("Response from editBook API:", res.data);
      dispatch({ type: PATCH_BOOK_SUCCESS });
    })
    .catch((err) => {
      console.error("Error while editing book:", err);
      dispatch({ type: GET_BOOKS_FAILURE });
    });
};
