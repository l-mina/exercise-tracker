import express from "express";

import { getExercises, getExercise, createExercise, updateExercise, deleteExercise,
         getUserExercises, bookmarkExercise, deleteBookmarkExercise,
         getSessions, getSession, createSession, updateSession, deleteSession,
         getAllSetsInSession, getSetsByExerciseInSession, createSet, updateSet, deleteSet
} from "../controllers/exerciseController.js";

const router = express.Router(); 

// Controllers for exercise catalog
// Get all exercises
router.get("/exercises", getExercises);
// Get an exercise
router.get("/exercises/:exerciseId", getExercise);
// Create an exercise
router.post("/exercises", createExercise);
// Update an exercise
router.put("/exercises/:exerciseId", updateExercise);
// Delete an exercise
router.delete("/exercises/:exerciseId", deleteExercise)

// Controllers for user's exercises
// Get all bookmarked user's exercises
router.get("/users/:userId/bookmark/exercises", getUserExercises);
// Post to the bookmarked section/table
router.post("users/:userId/bookmark/exercises", bookmarkExercise);
// Delete from bookmarked
router.delete("/users/:userId/bookmark/exercises/:exerciseId", deleteBookmarkExercise);

// Controllers for sessions
// Get all sessions
router.get("/users/:userId/sessions", getSessions);
// Get specific session
router.get("/sessions/:sessionId",getSession);
// Post a new session
router.post("/users/:userId/sessions", createSession);
// Update a session
router.put("/sessions/:sessionId",updateSession);
// Delete a session
router.delete("/sessions/:sessionId", deleteSession);

// Controllers for sets
// Get all sets in a session
router.get("/sessions/:sessionId/sets",getAllSetsInSession);
// Get all sets of an exercise
router.get("/sessions/:sessionId/exercises/:exerciseId/sets", getSetsByExerciseInSession);
// Post a new set
router.post("/sessions/:sessionId/sets", createSet);
// Update a set
router.put("/sets/:setId", updateSet);
// Delete a set
router.delete("/sets/:setId", deleteSet);

export default router;