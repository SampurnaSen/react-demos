import React from 'react';
import styles from './Book.module.css';

const Book = (props) => {
    return (
        <li className={styles.Book}>
            <h2>{props.name}</h2>
        </li>
    )
}

export default Book;