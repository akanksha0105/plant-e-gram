require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");

app.use(
	cors({
		origin: function (origin, callback) {
			const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
				.split(",")
				.map((o) => o.trim());
			// Allow requests with no origin (mobile apps, curl, health checks)
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const plantRouter = require("./routes/plant");
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use("/plant", plantRouter);

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 7777;

connectDB()
	.then(() => {
		console.log("Database connection established...");
		server.listen(PORT, () => {
			console.log(`Server is successfully listening on port ${PORT}...`);
		});
	})
	.catch((err) => {
		console.error("Database cannot be connected!!", err.message);
	});
