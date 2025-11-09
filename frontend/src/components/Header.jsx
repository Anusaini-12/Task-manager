import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
        const fetchUser = async(token) => {
        try {
          const token = localStorage.getItem("token");
          if(!token){
            navigate("/login");
            return;
          }
          const { data } = await axios.get("http://localhost:8080/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
        } catch(err) {
          console.error("Error fetching user:", err);
          navigate("/login");
        }
    };
    fetchUser();
  }, []);

  return (
    <div className="py-20 px-6 md:py-12 md:px-6">
      <h1 className="text-3xl font-bold">Welcome, <span className="text-purple-800">{user?.name || "User"}</span>!</h1>
      <p className="text-sm text-gray-600">
        {new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="pt-10 text-lg text-2xl">Here's your task summary : </p>
    </div>
  )
}

export default Header
