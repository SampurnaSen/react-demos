import React, { useContext, useCallback, useState } from 'react';
import BookList from '../BookList';
import { ThemeContext } from "../../store/theme-context";
import classes from './BookPage.module.css'
import Button from '../Button/BasicButton'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const BookPage = () => {
  const theme = useContext(ThemeContext);
  const [loading, setIsLoading] = useState(false);
  const [ error, setError] = useState(null)
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://openlibrary.org/search.json?author=${searchText}`);
      console.log(response)
      console.log(searchText)

      if (response.status === 404) {
        setError(true);
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedData = data.docs.map((bookData, index) => {
        console.log(bookData)
        return {
          key: `${bookData.key}-${index}`,
          name: bookData.title
        }
      })
      setBooks(transformedData)
    } catch (e) {
      console.log(e)
      setError(error.message)
    }
    setIsLoading(false)
  }, [searchText])

  const searchTextHandler = (e) => {
    setSearchText(e.target.value);
  }

  let content =<p>No books found</p>;

  if (books.length > 0) {
    content = <BookList books={books} />
  }

  if (error) {
    content= <p>{error}</p>
  }

  if (loading) {
    content = <LoadingSpinner />
  }


  return (
    <React.Fragment>
      <section className={classes["container"]}>
        <input
        type="text"
        className={classes["search-input"]}
        value={searchText}
        onChange={searchTextHandler}
        />
        <Button
          onClick={fetchBooksHandler}
          className={`${classes["search-button"]} ${theme.darkMode ? "bg-dark" : "bg-light"}`}
          title="Search for books"
        />
        <section>{content}</section>
      </section>
    </React.Fragment>
  )
}

export default BookPage
