import BookList from "./components/booklist";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './container.css';
import AddBook from "./components/addBook";

// Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function Container() {
  return (
    <div className="container">
        <h1>My Reading List</h1>
      <ApolloProvider client={client}>
        <BookList />
        <AddBook />
      </ApolloProvider>
    </div>
  );
}

export default Container;
