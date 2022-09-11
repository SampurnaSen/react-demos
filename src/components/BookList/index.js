import React from "react";
import Book from "../Book";
import classes from "./BookList.module.css";

const BookList = (props) => {
  return (
    <section>
      <ul className={classes["books-list"]}>
        {props.books.map((book) => (
          <Book key={book.key} name={book.name} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
