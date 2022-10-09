import React from 'react';
import Book from "../Book"
import styles from "./BookList.module.css"

const BookList = (props) => {
    return (
        <section>
            <ul className={styles.bookslist}>
                { props.books.map((book) => (
                    <Book key={book.key} name={book.name} />
                ))}
            </ul>
        </section>
    )
}

export default BookList