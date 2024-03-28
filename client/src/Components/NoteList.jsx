import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../Redux/BookReducer/action";

export const NoteList= () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookReducer.books);
  const loading = useSelector((state) => state.bookReducer.loading);
  const error = useSelector((state) => state.bookReducer.error);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Token is present, proceed with fetching books
      dispatch(getBooks());
    } else {
      // Token is not present, handle error
      dispatch({ type: "GET_BOOKS_FAILURE", payload: "JWT token is missing" });
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Note List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
