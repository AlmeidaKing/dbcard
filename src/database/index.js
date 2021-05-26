const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dbcard-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
