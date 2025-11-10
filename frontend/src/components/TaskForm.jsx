import { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/tasks`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskAdded(res.data);
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error("Error Adding Task:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleOnChange}
        required
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleOnChange}
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none resize-none"
      />
      <button
        type="submit"
        className="bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Add Task
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default TaskForm;
