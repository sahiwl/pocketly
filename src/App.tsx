import "./App.css";
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import { Spinner } from "./components/ui/spinner";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Dash = lazy(() => import("./pages/dash"));
const TagPage = lazy(() => import("./pages/TagPage"));
const TypePage = lazy(() => import("./pages/TypePage"));
const SharedPocket = lazy(() => import("./pages/SharedPocket"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

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
      <Route
        path="/login"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/signup"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Signup />
            </Suspense>
          </ErrorBoundary>
        }
      />
      {/* <Route path="/health" element={<Health />} /> */}

      <Route
        path="/pocket/:hash"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <SharedPocket />
            </Suspense>
          </ErrorBoundary>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Dash />
                </Suspense>
              </ErrorBoundary>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/tag/:tagName"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <TagPage />
                </Suspense>
              </ErrorBoundary>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/type/:typeName"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <TypePage />
                </Suspense>
              </ErrorBoundary>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
