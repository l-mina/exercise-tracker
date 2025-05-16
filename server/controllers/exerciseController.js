import { sql } from "../config/db.js";

// exercise catalog
export const getExercises = async(req,res) => {
    const { user_id } = req.params;
    try {
        const exercises = await sql `
            SELECT * FROM exercises ORDER BY NAME
        `;
        console.log("fetched exercises ", exercises);
        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        console.log("Error in getExercises function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getExercise = async(req,res) => {
    const { id } = req.params;
    try {
        const exercise = await sql `
            SELECT * FROM exercises WHERE id=${id}
        `;
        res.status(200).json({ success: true, data: exercise[0] });
    } catch (error) {
        console.log("Error in getExercise function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
};

export const createExercise = async(req,res) => {
    const { name, category, equipment, desc } = req.body;
    try {
        const exercise = await sql
        `
            INSERT INTO exercises (name, category, equipment, desc)
            VALUES (${name},${category},${equipment},${desc})
            RETURNING *

        `;
        res.status(200).json({ success: true, data: exercise });
    } catch (error) {
        console.log("Error in newExercise function ",error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// user's exercises
export const createUserExercise = async(req,res) => {
    const { user_id, exercise_id } = req.body;
    try {
        const userExercise = await sql
        `
            INSERT INTO userExercises (user_id, exercise_id)
            VALUES (${user_id}, ${exercise_id})
            RETURNING *
        `;
        res.status(200).json({ success: true, data: userExercise[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getUserExercise = async(req,res) => {
    const { user_id } = req.params;
    try {
        const userExercise = await sql
        `
            SELECT e.*, ed.name AS exercise_name 
            FROM userExercises e
            JOIN exercises ed ON e.exercise_id = ed.id
            WHERE e.user_id = ${user_id}
        `;
        res.status(200).json({ success: true, data: userExercise[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// exercise sessions
export const createSession = async(req,res) => {
    const { exercise_id, performedAt, notes } = req.body;
    try {
        const exerciseSession = await sql
        `
            INSERT INTO exerciseSession (exercise_id, performedAt, notes)
            VALUES (${exercise_id}, ${performedAt}, ${notes})
            RETURNING *
        `;
        res.status(200).json({ success: true, data: exerciseSession[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getSessionByExercise = async(req,res) => {
    const { exercise_id } = req.params;
    try {
        const singleSession = await sql
        `
            SELECT * FROM exerciseSession
            WHERE exercise_id = ${exercise_id}
            ORDER BY performed_at DESC
        `;
        res.status(200).json({ success: true, data: singleSession[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// sets
export const createSet = async(req,res) => {
    const { session_id, setNumber, reps, weight } = req.body;
    try {
        const addSet = await sql
        `
            INSERT INTO sets (session_id, set_number, reps, weight)
            VALUES (${session_id}, ${setNumber}, ${reps}, ${weight})
            RETURNING *
        `;
        res.status(200).json({ success: true, data: addSet[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getSetBySession = async(req,res) => {
    const { session_id} = req.id;
    try {
        const singleSet = await sql
        `
            SELECT * FROM sets
            WHERE session_id = ${session_id}
            ORDER BY set_number
        `;
        res.status(200).json({ success: true, data: singleSet[0] });
    } catch (error) {
        console.log("Error in createUserExercise function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};