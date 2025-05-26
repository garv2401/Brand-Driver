import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db2.js";
import bannerRoutes from './routes/bannerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import categoryParentRoutes from './routes/categoryParentRoutes.js';
import categoryDetailsRoutes from './routes/categoryDetailsRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import festivalRoutes from './routes/festivalRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

const app = express(); 
dotenv.config();
 

//Serve static files from the 'uploads' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Middlewares 
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running `)
  );
});
 
app.get('/',(req,res)=>{
    res.send("This is admin panel");
})

//Auth Routes
app.use("/api/auth", authRoutes);

//Banner Routes
app.use('/api/banners', bannerRoutes);

//image routes
app.use('/api/images', imageRoutes);

//category routes
app.use('/api/category-parents', categoryParentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/category-details', categoryDetailsRoutes);
 
//event routes
app.use('/api/events',eventRoutes);

//festival routes
app.use('/api/festivals',festivalRoutes);






