import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// security middleware protects by setting various HTTP headers
app.use(
    helmet({
      contentSecurityPolicy: false,  
    })
)

// logs requests
app.use(morgan("dev"));

// arcjet sets rate-limits to all routes
app.use(async(req, res, next)=>{
    try {
        const decision = await aj.protect(req, {
            // each request consumes 1 token
            requested: 1,
        });

        if (decision.isDenied()){
            if (decision.reason.isRateLimit()){
                res.status(429).json({ error: "Too many requests" });
            } else if (decision.reason.isBot()){
                res.status(403).json({ error: "Bot access denied" });
            } else {
                res.status(403).json({ error: "Forbidden" });
            }
            return;
        }

        // check for spoofed bots
        if (decision.results.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({ error: "Spoofed bot detected "});
            return;
        }

        next();

    } catch (error) {
        console.log("Arcjet error ", error);
        next(error)
    }
});

//app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercise", authMiddleware, exerciseRoutes);

async function initDB(){
    try {
        await sql
        `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(email)
            )
        `
        await sql
        `
            CREATE TABLE IF NOT EXISTS userExercises (
                id SERIAL PRIMARY KEY,
                user_id INTEGER,
                exercises VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `;
        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initDB ",error);
    }
};

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port ", PORT);
    })
});