// routes/userAuthRoutes.js
// routes/userAuthRoutes.js

import express from "express";
import passport from "passport";
import { registerUser, loginUser, logoutUser, verifyEmail } from "../controllers/userAuthController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/verify-email", verifyEmail);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);


export default router;


{/* <a href="http://localhost:5000/api/user/google">
  <button>Login with Google</button>
</a>
On successful login, the backend will redirect to:
http://localhost:5173/google-success?token=JWT_TOKEN

On your frontend route /google-success, parse the token from the URL and store it:

const params = new URLSearchParams(window.location.search);
const token = params.get("token");
localStorage.setItem("userToken", token);
 */}



 //sample code for frontend usage

{/* <a href="http://localhost:5000/api/user/google">
  <button>Login with Google</button>
</a>
// /src/pages/GoogleSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("userToken", token);
      navigate("/dashboard");
    } else {
      navigate("/login"); // fallback if token is missing
    }
  }, []);

  return <div>Logging in...</div>;
};

export default GoogleSuccess; */}
