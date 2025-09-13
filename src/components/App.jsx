// src/components/App.jsx
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- Lazy load des pages
const HomePage         = React.lazy(() => import("./HomePage"));
const PourQui          = React.lazy(() => import("../pages/PourQui"));
const Fonctionnalites  = React.lazy(() => import("../pages/Fonctionnalites"));
const ModularGenerator = React.lazy(() => import("./ModularGenerator"));
const LoginPage        = React.lazy(() => import("../pages/Login"));

// --- Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// --- 404 fallback
function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg,#e8f0fe 0%,#fff 100%)",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: "#174080", letterSpacing: ".02em" }}>404</div>
        <div style={{ fontSize: 18, color: "#304463", marginBottom: 18 }}>Page introuvable</div>
        <a href="/" style={{
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: 14,
          background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)",
          color: "#fff", fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 12px #1674ea33"
        }}>
          ← Retour à l’accueil
        </a>
      </div>
    </div>
  );
}

// --- Loader minimal
function Loader() {
  return (
    <div style={{ display:"grid", placeItems:"center", minHeight:"40vh", color:"#174080", fontWeight:700 }}>
      Chargement…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"                 element={<HomePage />} />
          <Route path="/pourqui"          element={<PourQui />} />
          {/* garde l’URL FR et redirige l’ancienne */}
          <Route path="/fonctionnalites"  element={<Fonctionnalites />} />
          <Route path="/features"         element={<Navigate to="/fonctionnalites" replace />} />
          <Route path="/generator"        element={<ModularGenerator />} />
          <Route path="/login"            element={<LoginPage />} />
          {/* 404 */}
          <Route path="*"                 element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
