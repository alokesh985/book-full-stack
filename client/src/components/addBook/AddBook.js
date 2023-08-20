import React, { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../../services/gqlQueries";
import { BoxLoading } from "react-loadingg";
import "./addBook.css";

const renderAuthor = (author) => {
  const { name, id } = author;
  return (
    <option value={id} key={id}>
      {name}
    </option>
  );
};

const AddBook = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  // Query hooks
  const { loading, data } = useQuery(GET_AUTHORS);
  const [addBook, { data: mutationData, error }] = useMutation(ADD_BOOK);
  console.log(error);

  // Event handlers
  const setBookName = useCallback(
    (e) => {
      const name = e.target.value;
      setFormState({ ...formState, name });
    },
    [formState]
  );
  const setGenreName = useCallback(
    (e) => {
      const genre = e.target.value;
      setFormState({ ...formState, genre });
    },
    [formState]
  );
  const setAuthor = useCallback(
    (e) => {
      const authorId = e.target.value;
      setFormState({ ...formState, authorId });
    },
    [formState]
  );
  const handleAddBook = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = formState;
    console.log({ name, genre, authorId });
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [
        {
          query: GET_BOOKS,
        },
      ],
    });
    console.log(mutationData);
  };

  const { authors } = data || {};

  if (!authors || loading) {
    return <BoxLoading />;
  }

  return (
    <form className="addBookForm" onSubmit={handleAddBook}>
    <h3>Add a new book</h3>
      <div className="field">
        <label className="label">Book Name: </label>
        <input type="text" onChange={setBookName} />
      </div>
      <div className="field">
        <label className="label">Genre: </label>
        <input type="text" onChange={setGenreName} />
      </div>
      <div className="field">
        <label className="label">Author: </label>
        <select onChange={setAuthor}>
          <option>Select Author</option>
          {authors && authors.map(renderAuthor)}
        </select>
      </div>
      <button className="submitBtn" type="submit">+</button>
    </form>
  );
};

export default AddBook;
