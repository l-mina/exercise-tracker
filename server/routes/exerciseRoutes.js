import express from "express";

const router = express.Router();

// Controllers for exercises 
router.get("/exercise", getExercises);

router.get("/exercise/:id", getExercise);

router.post("/exercise", createExercise);

router.put("/exercise/:id", updateExercise)

router.delete("/exercise/:id", deleteExercise)

export default router;