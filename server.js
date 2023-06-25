require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 3000;

connectDb();
app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Connected to ${port}`));
