const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const http = require("http");

require("dotenv").config();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");

const userRouter = require("./routes/user");
app.use("/auth", authRouter);
app.use("/user", userRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 7777;

connectDB()
	.then(() => {
		console.log("Database connection established...");
		server.listen(PORT, () => {
			console.log("Server is successfully listening on port 7777...");
		});
	})
	.catch((err) => {
		console.error("Database cannot be connected!!", err.message);
	});
