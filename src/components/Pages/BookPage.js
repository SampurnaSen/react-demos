import React, { useContext, useCallback, useState } from 'react';
import BookList from '../BookList';
import classes from "./BookPage.module.css"
import BasicButton from '../Button/BasicButton';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const BookPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);

    const fetchBooksHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://openlibrary.org/search.json?author=${searchText}`);
            console.log(response);
            if (response.status === 404) {
                setError(true);
                throw new Error("Something went wrong");
            }
            const data = await response.json();
            console.log({ data })
            const transformedData = data.docs.map(( bookData, index) => {
                return {
                    key: bookData.key,
                    name: bookData.title
                };
            });
            setBooks(transformedData);
        } catch(error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [searchText]);

    const searchTextHandler = (event) => {
        setSearchText(event.target.value);
    }

    let content = <p>No books found</p>

    if(error) {
        content = <p>{error}</p>
    }

    if (isLoading) {
        content = <LoadingSpinner />
    }

    if(books.length > 0) {
        content = <BookList books={books} />;
    }

    return (
        <React.Fragment>
            <section className={classes["container"]}>
                <input 
                className={classes["search-input"]}
                type="text"
                value={searchText}
                onChange={searchTextHandler}
                />
                <BasicButton onClick={fetchBooksHandler} title="Search for books"/>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    )
}

export default BookPage