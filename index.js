const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const app = express();
require("dotenv").config();
const {DATABASE_URL, PORT } = process.env;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use(cors({
    origin: ["http://localhost:4000", "http://localhost:3000",],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute)