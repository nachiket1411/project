const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 9046;
const router = express.Router();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

mongoose
  .connect(
    "mongodb+srv://Finalproject1:KvgDnLWgz9wc5VM2@cluster0.d4i0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("mongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server in running at port 9046" + port);
});
