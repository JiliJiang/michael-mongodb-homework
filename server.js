const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

mongoose.connect(
  // process.env.MONGODB_URI || 
  "mongodb://127.0.0.1:27017/socialmedia"
  ,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);



//app listen

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
