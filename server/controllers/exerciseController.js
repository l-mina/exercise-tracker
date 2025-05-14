import { sql } from "../config/db.js";

export const getExercises = async(req,res) => {
    try {
        const exercises = await sql `
            SELECT * FROM exercises
        `;
        console.log("fetched exercises ", exercises);
        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        console.log("Error in getExercises function ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getExercise = async(req,res) => {
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

