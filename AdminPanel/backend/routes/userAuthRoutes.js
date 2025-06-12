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

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email,name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Redirect to frontend with token
    res.redirect(`https://brandingdriver.com/google-success?token=${token}`);
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


//front end example code to access info from google success token
//url:https://brandingdriver.com/google-success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGE2Yzg5MjU2NWJhZDMwODRiMjk1MyIsImVtYWlsIjoiZXppb29kaXRvcmUyMDA0QGdtYWlsLmNvbSIsImlhdCI6MTc0OTcwNzkxNCwiZXhwIjoxNzQ5Nzk0MzE0fQ.ijquhtO1caRbL9ngwtVAQVVUj1nT2tLejF1wRAjpN7k
// import jwtDecode from "jwt-decode";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom"; // or use URLSearchParams

// const GoogleSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");

//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode(token);
//       console.log("Decoded token:", decoded);
//       // decoded.id and decoded.email,decode.name will be available
//       // Store in localStorage or context if needed
//     }
//   }, [token]);

//   return <div>Logging in with Google...</div>;
// };

// export default GoogleSuccess;

