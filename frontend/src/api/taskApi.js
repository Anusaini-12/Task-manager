import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTask = async ( token) => {
    const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
    });
    return res.data;
};

export const createTask = async (taskData, token) => {
    const res = await axios.post(API_URL, taskData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
    });
    return res.data;
};

export const updateTask = async (id, updateData, token) => {
    const res = await axios.put(`${API_URL}/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
    });
    return res.data;
};

export const deleteTask = async (id, token) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
    });
    return res.data;
};

export const clearAllTasks = async (token) => {
    const res = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
}