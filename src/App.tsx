import "./App.css";
import { Routes, Route } from "react-router";
import Dash from "./pages/dash";
import Health from "./pages/Health";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Temp } from "./pages/Temp";
import { DashboardLayout } from "./components/DashboardLayout";
import SharedPocket from "./pages/SharedPocket";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Landing />
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/health" element={<Health />} />

      <Route path="/pocket/:hash" element={<SharedPocket />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dash />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/temp"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Temp />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dash />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/read-later"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dash />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tags/:tag"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dash />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
