import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ setUser }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    };
    
    const API_URL = import.meta.env.VITE_API_URL;
    const handleSubmit = async (e) => {
       e.preventDefault(); 
       try {
          const res = await axios.post(`${API_URL}/api/user/login`,formData, 
            { 
                headers: { "Content-Type": "application/json" } 
            });

           localStorage.setItem("token", res.data.token);
           localStorage.setItem("user", JSON.stringify(res.data));
           setUser(res.data);
           alert("Login Successful!");
           navigate("/");

       } catch (err) {
          setError(err.response?.data?.message || err.message || "Something went wrong");
       }
    };

    return(
     <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
          <input 
           type="email" 
           name="email" 
           placeholder="Email" 
           onChange={handleChange} 
           required 
           className="border p-2" 
           />

          <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="border p-2" 
          />

          <button 
           type="submit" 
           className="bg-purple-950 text-white py-2 rounded hover:bg-purple-800">
            Login
         </button>

        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
     </div>
    )
}

export default Login;
