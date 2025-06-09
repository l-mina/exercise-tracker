import { sql } from "./db.js";

export async function initDB(){
    try {
        // users 
        await sql
        `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        // catalog of exercises
        await sql
        `
            CREATE TABLE IF NOT EXISTS exercises (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                category VARCHAR(100),
                equipment VARCHAR(100),
                description TEXT
            )
        `;
        // user's exercises
        await sql
        `
            CREATE TABLE IF NOT EXISTS user_exercises (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                exercise_id INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id) on DELETE CASCADE,
                UNIQUE(user_id, exercise_id)
            )
        `;
        // exercise session
        await sql
        `
            CREATE TABLE IF NOT EXISTS exercise_session (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                notes TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        // sets (individual effort in  a session)
        await sql
        `
            CREATE TABLE IF NOT EXISTS sets (
                id SERIAL PRIMARY KEY,
                exercise_id INTEGER NOT NULL,
                session_id INTEGER NOT NULL,
                set_number INTEGER NOT NULL,
                reps INTEGER NOT NULL,
                weight DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id) on DELETE CASCADE,
                FOREIGN KEY(session_id) REFERENCES exercise_session(id) ON DELETE CASCADE
            )
        `;

        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initDB ",error);
    }
};