const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const cors = require("cors");
const errorHandler = require("./middleware/error");

dotenv.config({
    path: "./config.env",
});
connectDB();
const app = express();
const port = process.env.PORT || 2500;

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use("/", require("./routes/api"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
