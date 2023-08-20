const express = require("express");
const graphQLHttp = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const { dbUrl, connectionParams } = require("./db");
const cors = require("cors");

const app = express();

// Allow cross-origin requests
app.use(cors());

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => console.log("Database connected!"))
  .catch(() => console.log("Database connection FAILED!"));

// One single endpoint for graphQL
app.use(
  "/graphql",
  graphQLHttp({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => console.log("Server is running on port 4000!"));
