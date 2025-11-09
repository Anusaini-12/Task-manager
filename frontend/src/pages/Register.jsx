import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prevData) => ({
           ...prevData,
           [e.target.name]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
       e.preventDefault(); 
       try {
         await axios.post("http://localhost:8080/api/user/register", formData, 
         {
            headers: { "Content-Type": "application/json" },
         });
         console.log(formData);
         alert("Register Successful!");
         navigate("/login");
       } catch (err) {
          setError(err.response?.data || error.message);
       }
    };

    return(
     <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl mb-4 font-bold">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
          <input 
           type="text" 
           name="name" 
           placeholder="Name" 
           onChange={handleChange} 
           required 
           className="border p-2" 
           />

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
            Register
         </button>

        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p 
         className="mt-4">
            Already have an account? 
            <Link to="/login" className="text-blue-500">
             Login
            </Link>
        </p>
     </div>
    )
}

export default Register;