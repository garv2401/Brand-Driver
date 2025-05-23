import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; // Adjust path if different

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser,fetchUser } = useAuth(); // Optional if you're using context
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    try {
      //console.log(email,password);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login", 
        { email, password },
        { withCredentials: true }
      );
      setUser?.(res.data.user);
      fetchUser();
      navigate("/dashboard");
    } catch (err) {
      console.error(err.data.message);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[81vh] bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white px-6 py-8 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-row gap-2 items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-20 flex justify-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-all duration-200"
            >
              {loading ? "Logging in..." : "Login"} 
            </button>

            <p className="">or</p>

            <Link to="/register" className="text-indigo-600 hover:text-indigo-700">
             Register
            </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
