// src/pages/Login.jsx
import React from "react";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg,#e8f0fe 0%,#fff 100%)",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px 30px",
        borderRadius: 18,
        boxShadow: "0 6px 24px #2451c92a",
        width: "100%",
        maxWidth: 380
      }}>
        <h2 style={{ textAlign: "center", color: "#174080", fontWeight: 800, marginBottom: 24 }}>
          Connexion
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: 16,
              borderRadius: 12,
              border: "1px solid #e2e6f0",
              fontSize: 15
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: 20,
              borderRadius: 12,
              border: "1px solid #e2e6f0",
              fontSize: 15
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 3px 14px #1674ea33"
            }}
          >
            Se connecter
          </button>
        </form>
        <p style={{ marginTop: 16, textAlign: "center", fontSize: 14, color: "#425670" }}>
          Pas encore de compte ? <a href="#" style={{ color: "#1674ea", fontWeight: 600 }}>S’inscrire</a>
        </p>
      </div>
    </div>
  );
}
