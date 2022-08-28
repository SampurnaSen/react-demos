import React, { useEffect, useCallback, useState } from "react";
import Button from './components/Button'
import BookList from "./components/BooksList";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
 
function App() {
 const [books, setBooks] = useState([]);
 const [error, setError] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 
 const fetchBooksHandler = useCallback(async() => {
  setIsLoading(true)
  setError(null)
  try {
    const response = await fetch("https://openlibrary.org/authors/OL23919A/works.json?limit=10")
    if(response.status === 404) {
      setError(true)
      console.log(response)
      throw new Error("Something went wrong")
    }
    const data = await response.json();
    const transformedBooks = data.entries.map((bookData, index) => {
      return {
        key: bookData.key,
        name: bookData.title,
      };
  });
    setBooks(transformedBooks);
  } catch (error) {
    setError(error.message)
  }
  setIsLoading(false)
  }, [])

 useEffect(() => {
  fetchBooksHandler()
 }, [fetchBooksHandler])

 let content = <p>No books found</p>

 if (books.length > 0) {
  content = <BookList books={books} />
 }

 if(error) {
  content = <p>{error}</p>
 }

 if (isLoading) {
  content = <LoadingSpinner />
 }
 
 return (
   <React.Fragment>
     <section>
       <Button onClick={fetchBooksHandler}>Search for J.K Rowling's work</Button>
     </section>
       {content}
   </React.Fragment>
 );
}
 
export default App;