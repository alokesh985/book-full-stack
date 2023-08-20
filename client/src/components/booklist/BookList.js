import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../services/gqlQueries";
import { BoxLoading } from "react-loadingg";
import BookDetails from "../bookDetails";
import "./bookList.css";

const renderBookName = (handleBookClick) => (book) => {
  const name = book?.name;
  const id = book?.id;
  return (
    <div className="bookName" onClick={handleBookClick(id)} key={id}>
      {name}
    </div>
  );
};

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(undefined);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const { books } = data || {};

  if (loading || !books) {
    return <BoxLoading />;
  }

  if (error) {
    return <h1>There was some error loading data</h1>;
  }

  // handlers
  const handleBookClick = (id) => () => {
    setSelectedBook(id);
  };

  return (
    <div className="bookList">
      {books && books.map(renderBookName(handleBookClick))}
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;
