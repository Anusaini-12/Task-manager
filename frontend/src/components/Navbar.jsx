import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ user, setUser}) => {
  
  const navigate = useNavigate();
    
  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log("User Info:", user);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-purple-950 text-white flex justify-between items-center px-8 md:px-20 py-5 shadow">
      <h1 className="text-xl font-bold">Task Manager</h1>
       
      { user ? (
        <button
         onClick={handleLogout}
         className="md:border border-white text-white px-3 py-1 rounded-md hover:bg-purple-800 transition cursor-pointer"
         > 
           <i className="fa-solid fa-right-from-bracket md:mx-1 md:text-sm text-xl"></i>
          <span className="hidden md:inline">Logout</span>
        </button>
        ) : (
        <div className="flex gap-4">
         <Link to="/login">Login</Link>
         <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
