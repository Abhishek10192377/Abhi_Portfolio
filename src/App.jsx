import { lazy, Suspense, useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Dashboard/ProtectedRoute";

// Lazy load heavy components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./Dashboard/Login"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
import CircleFollower from "./components/CircleFollower";
import BootSequence from "./components/BootSequence";
import Footer from "./components/Footer";

// Loading placeholder (Fallback UI)
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-stark-red border-t-stark-gold rounded-full animate-spin"></div>
  </div>
);

function Portfolio() {
  const [booted, setBooted] = useState(false);
  const handleBooted = useCallback(() => setBooted(true), []);

  return (
    <div className="stark-theme">
      <div className="stark-backdrop" aria-hidden="true" />
      <BootSequence onDone={handleBooted} />
      <CircleFollower />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-stark-charcoal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <main>
          <Home ready={booted} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Toaster richColors theme="dark" position="top-right" />
      <Routes>
        <Route path="/" element={<Portfolio />}></Route>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  );
}

export default App;
