import Task from "../models/taskModel.js";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";

//To GET all tasks
export const getTasks = expressAsyncHandler (async (req, res) => {
    const tasks = await Task.find({user: req.user.id});
    res.status(200).json(tasks);
});

//TO GET a task
export const getTask = expressAsyncHandler (async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error("Task not found!");
    }

    const user = await User.findById(req.user.id);
    if(task.user.toString() !== req.user.id){
        res.status(400);
        throw new Error("User not authorized!");
    }
    res.status(200).json(task);
});

//CREATE a new task
export const createTask = expressAsyncHandler( async (req, res) => {
    const { title, description } = req.body;

    if(!title){
        res.status(400);
        throw new Error("Please provide a title for the task.");
    }

    const task = await Task.create({
        title, 
        description,
        user: req.user.id,
    });

    res.status(201).json(task);
});

//UPDATE a task
export const updateTask = expressAsyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task)
    {
      res.status(400);
      throw new Error("Task not found!");
    }

    const user = await User.findById(req.user.id);
    if(!user){
      res.status(400);
      throw new Error("User not found!");
    }

    if(task.user.toString() !== req.user.id){
        res.status(400);
        throw new Error("User not authorized!");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    
    res.status(200).json(updatedTask);
});


//DELETE a task
export const deleteTask = expressAsyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
       res.status(400);
       throw new Error("Task not found!");
    }
    
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400);
        throw new Error("User not found!");
    }

    if(task.user.toString() !== req.user.id){
       res.status(400);
       throw new Error("User not found");
    }  

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(`${task.title} is deleted successfully!`);
});


//DELETE all tasks
export const deleteAllTasks = expressAsyncHandler( async (req, res) => {
    const result = await Task.deleteMany({user: req.user.id});

    res.status(200).json({
      message: "All tasks deleted successfully",
      deletedCount: result.deletedCount,
    });
});