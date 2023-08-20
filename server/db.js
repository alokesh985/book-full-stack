const dbUrl =
  "mongodb+srv://alokesh9854:books-project@cluster0.82euzms.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { dbUrl, connectionParams };