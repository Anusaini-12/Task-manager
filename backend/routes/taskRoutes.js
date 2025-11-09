import { getTask, getTasks, createTask, deleteTask, deleteAllTasks, updateTask } from "../controllers/taskController.js";
import express from 'express';
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getTasks)         
  .post(protect, createTask)      
  .delete(protect, deleteAllTasks) 

router.route("/:id")
  .get(protect, getTask)          
  .put(protect, updateTask)        
  .delete(protect, deleteTask);

export default router;