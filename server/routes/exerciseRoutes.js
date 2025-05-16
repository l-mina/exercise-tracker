import express from "express";

import { getExercises, getExercise, createExercise,
         createUserExercise, getUserExercise,
         createSession, getSessionByExercise,
         createSet, getSetBySession
} from "../controllers/exerciseController.js";

const router = express.Router();

// Controllers for all exercises 
router.get("/catalog", getExercises);

router.get("/catalog/Exercise:id", getExercise);

router.post("/catalog", createExercise);

//router.put("/exercise/:id", updateExercise)

//router.delete("/exercise/:id", deleteExercise)



// Controllers for user's exercise
router.post("/", createUserExercise);

router.get("/user/user:id", getUserExercise);

// Controllers for session
router.post("/session", createSession);

router.get("/session/Exercise/:exerciseId", getSessionByExercise);

// Controllers for sets
router.post("/set", createSet);

router.post("set/session/:sessionID", getSetBySession);

export default router;