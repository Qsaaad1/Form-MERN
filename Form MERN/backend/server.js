const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const bodyParser = require("body-parser");
const fs = require('fs');
const cors = require("cors");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Router Middleware
app.use("/api/users", userRoute);


// Error Middleware
app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api/users/check-email", (req, res) => {
  const { email } = req.query;

  // Check if the email already exists in the user data
  const emailExists = users.some((user) => user.email === email);

  res.json({ exists: emailExists });
});



// Connect to DB and start server
const PORT = 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
