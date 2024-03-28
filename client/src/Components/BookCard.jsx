// export const BookCard = ({
//   id,
//   cover_photo,
//   book_name,
//   author,
//   category,
//   release_year,
//   no_of_chapters,
// }) => {
//   return (
//     <div className="book-card">
//       {/* ``` - Show Image in image tag with class `book-image` - Show Book name
//       with class `book-name` - Show Author with class `book-author` - Show
//       Category with class `book-category` - Show Release year with class
//       `book-year` - Show Number of chapters with class `book-chapter` * Do not
//       add any extra text, See the Image provided to know what needs to be
//       displayed * ``` */}
//       <img
//         src={cover_photo}
//         alt="books"
//         className="book-image"
//         width={"200px"}
//       />
//       <h3 className="book-name">{book_name}</h3>
//       <h3 className="book-author">{author}</h3>
//       <p className="book-category">{category}</p>
//       <p className="book-year">{release_year}</p>
//       <p className="book-chapter">Chapter: {no_of_chapters}</p>
//     </div>
//   );
// };

import React from "react";
import { Link } from "react-router-dom";
export const BookCard = ({ id,title, content }) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{title}</h3>
      <p className="book-content">{content}</p>
      <Link to={`/edit-book/${id}`}>
        <button className="edit-book">Edit</button>
      </Link>
    </div>
  );
};
