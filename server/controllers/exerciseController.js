import { sql } from "../config/db.js";

// Helper functions
const handleServerError = (res, error, functionName) => {
    console.error(`Error in ${functionName}:`, error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
};

// Exercise catalog
export const getExercises = async(req,res) => {
    const id = req.user?.id;
    const { tags, bookmarked, exclude_bookmarked } = req.query;
    const tagList = tags ? tags.split(',').map(t => t.trim()) : [];
    try {
        let finalQuery = sql`SELECT DISTINCT e.* FROM exercises e`;
        const joins = [];
        const conditions = [];

        if((bookmarked ===  'true' || exclude_bookmarked === 'true') && !id){
            return res.status(401).json({ success: false, message: "User ID not valid" });
        }
        if(bookmarked === 'true'){
            joins.push(sql`JOIN user_exercises ue ON e.id = ue.exercise_id`);
            conditions.push(sql`ue.user_id=${id}`);
        }
        if(exclude_bookmarked==='true'){
            conditions.push(sql`e.id NOT IN (
                SELECT exercise_id FROM user_exercises WHERE user_id = ${id}
            )`);
        }

        if(tagList.length > 0){
            joins.push(sql`
                JOIN exercise_tags et ON e.id = et.exercise_id
                JOIN tags t on t.id = et.tag_id
            `);
            conditions.push(sql`t.name = ANY(${tagList})`);
        }

        for (const join of joins){
            finalQuery = sql `${finalQuery} ${join}`;
        }

        if(conditions.length > 0){
            finalQuery = sql`${finalQuery} WHERE `;
            finalQuery = sql`${finalQuery} ${conditions[0]}`;
            for (let i = 1; i < conditions.length; i++){
                finalQuery = sql`${finalQuery} AND ${conditions[i]}`;
            }
        }
        
        finalQuery = sql`${finalQuery} ORDER by e.name`;

        const exercises = await sql`${finalQuery}`;
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
    const { name, category, equipment, image } = req.body;
    if(!name || !category || !equipment || !image){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const [newExercise] = await sql
        `
            INSERT INTO exercises (name,category,equipment,image)
            VALUES (${name},${category},${equipment},${image})
            RETURNING *
        `;
        res.status(201).json({ success: true, data: newExercise });
    } catch (error) {
        handleServerError(res, error, "createExercise");
    }
};
export const updateExercise = async(req,res) => {
    const { exerciseId } = req.params;
    const { name, category, equipment, image } = req.body;
    if (isNaN(Number(exerciseId))) {
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    };
    try {
        const [updatedExercise] = await sql
        `
            UPDATE exercises
            SET name=${name}, category=${category}, equipment=${equipment}, image=${image}
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
    if (!exerciseId){
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

// Session
export const getSessions = async(req,res) => {
    const { id } = req.params;
    const userId = Number(id);
    if (isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    try {
        const sessions = await sql
        `
            SELECT * FROM exercise_session WHERE user_id=${userId}
        `;
        if(sessions.length===0){
            return res.status(404).json({ success: false, message: "Sessions not found for this user" });
        }
        res.status(200).json({ success: true, data: sessions })
    } catch (error) {
        handleServerError(res, error, "getSessions");
    }
};
export const getSession = async(req,res) => {
    const { id } = req.params;
    const sessionId = Number(id);
    if (isNaN(sessionId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    try {
        const session = await sql
        `
            SELECT * FROM exercise_session WHERE id=${sessionId}
        `;
        if(session.length === 0){
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        res.status(200).json({ success: true, data: session[0] });
    } catch (error) {
        handleServerError(res, error, "getSession"); 
    }
};
export const createSession = async(req,res) => {
    const { id } = req.params;
    const userId = Number(id);
    if (isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    try {
        const [addedSession] = await sql
        `
            INSERT INTO exercise_session (user_id)
            VALUES(${userId})
            RETURNING *
        `;
        if(!addedSession){
            return res.status(500).json({ success: false, message: "Unable to add session" });
        }
        res.status(201).json({ success: true, data: addedSession });
    } catch (error) {
        handleServerError(res, error, "createSession");
    }
};
export const updateSession = async(req,res) => {
    const { id } = req.params;
    const { timestamp, notes } = req.body;
    const sessionId = Number(id);
    if (isNaN(sessionId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    if (!timestamp|| isNaN(Date.parse(timestamp))){
        return res.status(400).json({ success: false, message: "Invalid timestamp" });
    }
    try {
        const [updatedSession] = await sql
        `
            UPDATE exercise_session
            SET completed_at=${timestamp}, notes=${notes}
            WHERE id=${sessionId}
            RETURNING *
        `;
        if(!updatedSession){
            return res.status(400).json({ success: false, message: "Session not updated" });
        }
        res.status(200).json({ success: true, data: updatedSession });
    } catch (error) {
        handleServerError(res, error, "updateSession"); 
    }
};
export const deleteSession = async(req,res) => {
    const { id } = req.params;
    const sessionId = Number(id);
    if (isNaN(sessionId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    try {
        const [deletedSession] = await sql
        `
            DELETE FROM exercise_session WHERE id=${sessionId}
            RETURNING *
        `;
        if(!deletedSession){
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        res.status(200).json({ success: true, data: deletedSession });
    } catch (error) {
        handleServerError(res, error, "deleteSession"); 
    }
};

// Sets
export const getAllSetsInSession = async(req,res) => {
    const { id } = req.params;
    const sessionId = Number(id);
    if (isNaN(sessionId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    try {
        const sets = await sql
        `
            SELECT * FROM sets WHERE session_id=${sessionId}
        `;
        res.status(200).json({ success: true, data: sets });
    } catch (error) {
        handleServerError(res, error, "getSets");
    }
};
export const getSetsByExerciseInSession = async(req,res) => {
    const { sessionId, exerciseId } = req.params;
    const sId = Number(sessionId);
    const eId = Number(exerciseId);
    if (isNaN(sId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    if (isNaN(eId)){
        return res.status(400).json({ success: false, message: "Invalid exercise ID" });
    }
    try {
        const setsByExercise = await sql
        `
            SELECT * FROM sets 
            WHERE session_id=${sId} AND exercise_id=${eId} 
        `;
        res.status(200).json({ success: true, data: setsByExercise });
    } catch (error) {
        handleServerError(res, error, "getSetsByExerciseInSession");
    }
};
export const createSet = async(req,res) => {
    const { id } = req.params;
    const { exercise_id, set_number, reps, weight } = req.body;
    const sessionId = Number(id);

    if (isNaN(sessionId)){
        return res.status(400).json({ success: false, message: "Invalid session ID" });
    }
    if (!exercise_id || !set_number || !reps || !weight){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const [addedSet] = await sql
        `
            INSERT INTO sets (exercise_id, session_id, set_number, reps, weight)
            VALUES(${exercise_id},${sessionId},${set_number},${reps},${weight})
            RETURNING *
        `;
        res.status(201).json({ success: true, data: addedSet });
    } catch (error) {
        handleServerError(res, error, "createSet");
    }
};
export const updateSet = async(req,res) => {
    const { id } = req.params;
    const { exercise_id, set_number, reps, weight } = req.body;
    const setId = Number(id);
    if (isNaN(setId)){
        return res.status(400).json({ success: false, message: "Invalid set ID" });
    }
    if (!exercise_id || !set_number || !reps || !weight){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const [updatedSet] = await sql
        `
            UPDATE sets
            SET exercise_id=${exercise_id}, set_number=${set_number}, reps=${reps}, weight=${weight}
            WHERE id=${setId}
            RETURNING *
        `;
        if (!updatedSet){
            return res.status(404).json({ success: false, message: "Set not found" });
        }
        res.status(200).json({ success: true, data: updatedSet });
    } catch (error) {
        handleServerError(res, error, "updateSet");
    }
};
export const deleteSet = async(req,res) => {
    const { id } = req.params;
    const setId = Number(id);
    if (isNaN(setId)){
        return res.status(400).json({ success: false, message: "Invalid set ID" });
    }
    try {
        const [deletedSet] = await sql
        `
            DELETE FROM sets WHERE id=${setId}
            RETURNING *
        `;
        if (!deletedSet.length){
            return res.status(404).json({ success: false, message: "Set not found" });
        }
        res.status(200).json({ success: true, data: deletedSet });
    } catch (error) {
        handleServerError(res, error, "deleteSet");
    }
};

// Tags
export const getTags = async(req,res) => {
    try {
        const tags = await sql`
            SELECT * FROM tags ORDER BY name
        `;
        res.status(200).json({ success: true, data: tags });
    } catch (error) {
        handleServerError(res, error, "getTags");
    }
};
export const createTags = async(req,res) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).json({ success: false, message: "Tag name is required" });
    }
    try {
        const [tag] = await sql`
            INSERT INTO tags (name)
            VALUES (${name})
            ON CONFLICT (name) DO NOTHING
            RETURNING id, name
        `;
        if(!tag){
            return res.status(409).json({ success: false, message: "Tag already exists" });
        }
        res.status(201).json({ success: true, data: tag });
    } catch (error) {
        handleServerError(res, error, "createTags");
    }
};
export const getTagsForExercise = async(req,res) => {
    const { id } = req.params;
    try {
        const tags = await sql`
            SELECT t.*
            FROM exercise_tags et
            JOIN tags t ON t.id = et.tag_id
            WHERE et.exercise_id=${id}
            ORDER BY t.name
        `;
        res.status(200).json({ success: true, data: tags });
    } catch (error) {
        handleServerError(res, error, "getTagsForExercise");
    }
};
export const createTag = async(req,res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if(!name){
        return res.status(400).json({ success: false, message: "Tag name required" });
    }
    try {
        const [tag] = await sql`
            INSERT INTO tags (name)
            VALUES (${name})
            ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING id, name
        `;
        await sql`
            INSERT INTO exercise_tags (exercise_id, tag_id)
            VALUES (${id}, ${tag.id})
            ON CONFLICT DO NOTHING
        `;
        res.status(201).json({ success: true, data: tag });
    } catch (error) {
        handleServerError(res, error, "createTag");
    }
};
export const removeTagFromExercise = async(req,res) => {
    const { exerciseId, tagId } = req.params;
    try {
        await sql`
            DELETE FROM exercise_tags
            WHERE exercise_id = ${exerciseId} AND tag_id = ${tagId}
        `;
        res.status(200).json({ success: true, message: "Tag removed from exercise" });
    } catch (error) {
        handleServerError(res, error, "removeTagFromExercise");
    }
};