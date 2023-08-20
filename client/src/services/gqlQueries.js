import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

export const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query ($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
            name
        }
      }
    }
  }
`;
