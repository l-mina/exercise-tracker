import { sql } from "../config/db.js";

// Helper functions
const handleServerError = (res, error, functionName) => {
    console.error(`Error in ${functionName}:`, error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
};

// Exercise catalog
export const getExercises = async(req,res) => {
    try {
        const exercises = await sql
        `
            SELECT * FROM exercises ORDER BY name
        `;
        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        handleServerError(res, error, "getExercises");
    }
};
export const getExercise = async(req,res) => {
    const { exerciseId } = req.params;
    if (isNaN(Number(exerciseId))) {
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    };
    try {
        const [exercise] = await sql
        `
            SELECT * FROM exercises WHERE id=${exerciseId}
        `;
        if(!exercise){
            return res.status(404).json({ success: false, message: "Exercise not found"});
        };
        res.status(200).json({ success: true, data: exercise });
    } catch (error) {
        handleServerError(res, error, "getExercise");
    }
};
export const createExercise = async(req,res) => {
    const { name, category, equipment } = req.body;
    if(!name || !category || !equipment){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const [newExercise] = await sql
        `
            INSERT INTO exercises (name,category,equipment)
            VALUES (${name},${category},${equipment})
            RETURNING *
        `;
        res.status(201).json({ success: true, data: newExercise });
    } catch (error) {
        handleServerError(res, error, "createExercise");
    }
};
export const updateExercise = async(req,res) => {
    const { exerciseId } = req.params;
    const { name, category, equipment } = req.body;
    if (isNaN(Number(exerciseId))) {
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    };
    try {
        const [updatedExercise] = await sql
        `
            UPDATE exercises
            SET name=${name}, category=${category}, equipment=${equipment}
            WHERE id=${exerciseId}
            RETURNING *
        `;
        if(!updatedExercise){
            return res.status(404).json({ success: false, message: "Exercise not found" });
        };
        res.status(200).json({ success: true, data: updatedExercise }) 
    } catch (error) {
        handleServerError(res, error, "updateExercise");
    }
};
export const deleteExercise = async(req,res) => {
    const { exerciseId } = req.params;
    if (isNaN(Number(exerciseId))) {
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    };
    try {
        const [deletedExercise] = await sql
        `
            DELETE FROM exercises WHERE id=${exerciseId}
            RETURNING *
        `;
        if(!deletedExercise){
            return res.status(404).json({ success: false, message: "Exercise not found" });
        };
        res.status(200).json({ success: true, data: deletedExercise });
    } catch (error) {
        handleServerError(res, error, "deleteExercise");
    }
};

// User's exercises
export const getUserExercises = async(req,res) => {
    const { id } = req.params;
    const userId = Number(id);
    if (isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    try {
        const userExercises = await sql
        `
            SELECT * FROM user_exercises WHERE user_id=${userId}
        `;
        if(userExercises.length === 0){
            return res.status(404).json({ success: false, message: "No exercises found for this user" });
        }
        res.status(200).json({ success: true, data: userExercises });
    } catch (error) {
        handleServerError(res, error, "getUserExercises");
    }
};
export const bookmarkExercise = async(req,res) => {
    const { id } = req.params;
    const userId = Number(id);
    const { exerciseId } = req.body;
    if (isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    if (exerciseId){
        return res.status(400).json({ success: false, message: "Exercise ID is required" });
    }
    try {
        const [bookmarkedExercise] = await sql
        `
            INSERT INTO user_exercises (user_id, exercise_id)
            VALUES (${userId},${exerciseId})
            ON CONFLICT (user_id, exercise_id) DO NOTHING
            RETURNING *
        `;
        if(!bookmarkedExercise){
            return res.status(409).json({ success: false, message: "Exercise already bookmarked by this user" });
        }
        res.status(201).json({ success: true, data: bookmarkedExercise });
    } catch (error) {
        handleServerError(res, error, "bookmarkExercise");
    }
};
export const deleteBookmarkExercise = async(req,res) => {
    const { id, exercise_id } = req.params;
    const userId = Number(id);
    const exerciseId = Number(exercise_id);
    if (isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    if (isNaN(exerciseId)){
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    }
    try {
        const deletedBookmarkExercise = await sql
        `
            DELETE FROM user_exercises
            WHERE user_id=${userId} AND exercise_id=${exerciseId}
            RETURNING *
        `;
        if(deletedBookmarkExercise.length === 0){
            return res.status(404).json({ success:false, message: "Bookmarked exercise not found" });
        }
        res.status(200).json({ success: true, data: deletedBookmarkExercise[0] })
    } catch (error) {
        handleServerError(res, error, "deleteBookmarkExercise");
    }
};