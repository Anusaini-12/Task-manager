import { useEffect, useState } from "react";
import { fetchTask, createTask, deleteTask, updateTask, clearAllTasks } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import Header from "../components/Header";
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import Filter from "../components/Filter";

const Dashboard = () => {
  
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  //GET TASKS
  useEffect(() => {
      const getTasks = async () => {
        try {
         const token = localStorage.getItem('token');
         const data = await fetchTask(token);
         setTasks(data);
      
        } catch (err){
         console.error("Error fetching tasks: ", err);
        } finally {
         setLoading(false);
    }
      }
      getTasks();
  }, []);

  //CREATE a task
const handleTaskAdded = async (taskData) => {
  try {
    const token = localStorage.getItem("token");
    const newTask = await createTask(taskData, token); 
    
    setTasks((prev) => [...prev, newTask]); 
    toast.success("Task added successfully!");
    setShowForm(false);
  } catch (err) {
    console.error("Error adding task:", err);
    toast.error("Failed to add task");
  }
};

  //UPDATE a task
  const handleUpdate = async (id, currentStatus) => {
      try {
        const token = localStorage.getItem('token');
        const updatedTask = await updateTask(id , { completed: !currentStatus }, token);
        setTasks((prev) => (
          prev.map((task) => task._id === id ? updatedTask : task)
        ));
        toast.success("Task updated successfully!");
      } catch (err){
        console.error("Error updating task:", err);
        toast.error("Failed to update task");
      }
  };

  //DELETE a task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
     
    try {
      const token = localStorage.getItem('token');
      await deleteTask(id, token);
        
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
     }
     catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };
  
  //CLEAR all tasks
  const handleClearAll = async () => {
     if(!window.confirm("Delete all your tasks? This cannot be undone.")) return;
     try {
      const token = localStorage.getItem('token');
      await clearAllTasks(token);
      setTasks("");
      toast.success("All tasks cleared!");
     } catch (err){
      console.error("Error clearing tasks:", err);
      toast.error("Failed to clear all tasks");
     }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">All Tasks</h1>
        <div className="flex">
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm md:text-base py-1 px-3 md:py-2 md:px-6 text-blue-600 font-bold border border-blue-600 rounded-lg shadow hover:bg-blue-600 hover:text-white transition"
        >
           <span className="hidden sm:inline">{showForm ? "Close Form" : "+ Add Task"}</span>
           <span className="sm:hidden">{showForm ? "Close" : <i className="fa-solid fa-plus"></i>}</span>
        </button>  

        <button
         onClick={handleClearAll}
         className="text-sm md:text-base py-1 px-3 md:py-2 md:px-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition ml-4"
        >
         Clear All
        </button>

        </div>
      </div>

      {showForm && (
        <div className="bg-white shadow-lg rounded-md p-6 mx-6 mb-6">
          <TaskForm onTaskAdded={handleTaskAdded} />
        </div>
      )}  
  
      {loading ? (
        <div className="flex justify-center items-center py-10">
         <ClipLoader color="#6B21A8" size={50} />
        </div>
      ) : (
      <>
      <div>
         <Filter filter={filter} setFilter={setFilter} />
      </div>    

      <div className="grid md:grid-cols-1 gap-4 mx-6 pb-12">
        {tasks.length > 0 ? (
          tasks.filter((task) => {
             if (filter === "completed") return task.completed;
             if (filter === "pending") return !task.completed;
             return true; 
          })      
          .map((task) => (
              <div
               key={task._id}
               className={`border rounded-lg p-4 shadow-sm transition ${
                task.completed
                  ? "bg-green-100 border-green-400"
                  : "bg-blue-100 border-blue-300"
                }`}
              >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-700">{task.description}</p>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleUpdate(task._id, task.completed)}
                  className={`py-1 px-3 rounded-md text-white cursor-pointer ${
                    task.completed
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  {task.completed ? "Already done!" : "Mark as Done"}
                </button>
                <i 
                 onClick={() => handleDelete(task._id)}
                 className="fa-solid fa-trash text-2xl text-black hover:scale-[1.1] cursor-pointer">
                </i>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tasks yet!</p>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default Dashboard;
