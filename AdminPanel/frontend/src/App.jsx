import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BannerUploadForm from "./pages/Banner/BannerUpload";
import BannerList from "./pages/Banner/BannerList";
import BannerEdit from "./pages/Banner/BannerEdit";
import CategoryDashBoard from "./pages/CategoryDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CategoryImagesPage from "./pages/CategoryImagesPage";
import Register from "./pages/Register";
import Header from "./components/Header";
import ImageUploadForm from "./pages/Image/imageUpload";
import { fetchBanners } from './lib/api';  
import GoogleSuccess from "./pages/GoogleSuccess";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
    
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="/:categoryParentName/:categoryParentId" element={<CategoryImagesPage/>} />
                  <Route path="/upload-banner" element={<BannerUploadForm />} />
                  <Route path="/upload-image" element={<ImageUploadForm />} />
                  <Route path="/show-banners" element={<BannerList fetchBanners={fetchBanners} />} />
                  <Route path="/edit-banner/:id" element={<BannerEdit />} />
                  <Route path="/manage-categories" element={<CategoryDashBoard />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
