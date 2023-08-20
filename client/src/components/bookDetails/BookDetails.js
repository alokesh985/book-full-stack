import React from "react";
import { GET_BOOK_DETAILS } from "../../services/gqlQueries";
import { useQuery } from "@apollo/client";
import "./bookDetails.css";

const BookDetails = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_BOOK_DETAILS, {
    variables: {
      id: bookId,
    },
  });

  if (error) {
    <h3>Failed to fetch book details</h3>;
  }

  const { book } = data || {};

  const name = book?.name;
  const genre = book?.genre;
  const author = book?.author;

  if (!bookId) {
    return <h3>No book selected...</h3>;
  }

  return (
    <div className="bookDetailsContainer">
      {loading && "Loading"}
      {book && (
        <>
          <h2>{`Book Name: ${name}`}</h2>
          <div className="genre">{`Genre: ${genre}`}</div>
          <div className="authorName">{`Author Name: ${author?.name}`}</div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
