import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

import { initDB } from "./config/initDB.js";
import { aj } from "./lib/arcjet.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

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

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port ", PORT);
    })
});