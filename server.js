const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Routes
const userRoute = require("./routes/users");
const exerciseRoute = require("./routes/exercises");

//Middleware
app.use(cors());
app.use(express.json());
app.use("/exercises", exerciseRoute);
app.use("/users", userRoute);

//MongoDB
const db = require("./config/keys").MONGO_URI;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Monconnected");
  }
);

//serve React app static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("mern-exercise/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "mern-exercie", "build", "index.html")
    );
  });
}

//Listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
