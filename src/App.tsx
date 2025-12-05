import "./App.css";
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import { Spinner } from "./components/ui/spinner";

const Dash = lazy(() => import("./pages/dash"));
const SharedPocket = lazy(() => import("./pages/SharedPocket"));

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <Spinner className="h-12 w-12" />
    <p className="text-sm text-muted-foreground animate-pulse">Loading 🦥</p>
  </div>
);

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
      {/* <Route path="/health" element={<Health />} /> */}

      <Route
        path="/pocket/:hash"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <SharedPocket />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Suspense fallback={<LoadingSpinner />}>
                <Dash />
              </Suspense>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Suspense fallback={<LoadingSpinner />}>
                <Dash />
              </Suspense>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/read-later"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Suspense fallback={<LoadingSpinner />}>
                <Dash />
              </Suspense>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tags/:tag"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Suspense fallback={<LoadingSpinner />}>
                <Dash />
              </Suspense>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
