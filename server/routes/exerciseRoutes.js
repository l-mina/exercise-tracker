import express from "express";

import { getExercises, getExercise, createExercise,
         createUserExercise, getUserExercise,
         createSession, getSessionByExercise,
         createSet, getSetBySession
} from "../controllers/exerciseController.js";

const router = express.Router();

// Controllers for all exercises 
router.get("/catalog", getExercises);

router.get("/catalog/:id", getExercise);

router.post("/catalog", createExercise);

//router.put("/exercise/:id", updateExercise)

//router.delete("/exercise/:id", deleteExercise)



// Controllers for user's exercise
router.post("/", createUserExercise);

router.get("/", getUserExercise);

// Controllers for session
router.post("/session", createSession);

router.get(":id/session", getSessionByExercise);

// Controllers for sets
router.post("/set", createSet);

router.post("session:id/set", getSetBySession);

export default router;