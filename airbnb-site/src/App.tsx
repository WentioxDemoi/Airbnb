import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";

export default function App() {
  return (
    // reducedMotion="user" : respecte prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bien/:id" element={<PropertyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </MotionConfig>
  );
}
