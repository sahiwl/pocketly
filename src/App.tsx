import "./App.css";
import { Routes, Route } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import { Spinner } from "./components/ui/spinner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import axios from "axios";
import { Layers } from "lucide-react";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const warmup = async () => {
      let alive = false;
      while (!alive) {
        try {
          await axios.get(`${import.meta.env.VITE_APP_BASE}/health`);
          alive = true;
          setReady(true);
        } catch {
          console.log("Backend still cold, retrying :/");
          await new Promise((res) => setTimeout(res, 5000));
        }
      }
    };

    warmup();
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 p-4 text-center font-sans">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-stone-200 bg-white shadow-xl shadow-orange-100/50 animate-in zoom-in duration-500">
          <Layers className="h-12 w-12 text-orange-600" />
        </div>

        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Waking up the server
          </h2>
          <p className="text-stone-500 leading-relaxed">
            Server is starting up. This typically takes 30–60 seconds.
            Have a cookie in the meantime 🍪
          </p>
        </div>

        <div className="mt-10 flex gap-2">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400/60 [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500/80 [animation-delay:-0.15s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-600"></div>
        </div>
      </div>
    );
  }

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
