// src/pages/Fonctionnalites.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const featuresList = [
  {
    title: "Génération instantanée",
    icon: "⚡️",
    desc: "Créez un programme 100% personnalisé en quelques clics, adapté à vos objectifs, douleurs et disponibilités.",
    full:
      "Notre algorithme prend en compte plus de 15 paramètres (sport, douleurs, niveau, lieu, fréquence…) pour proposer un programme réellement personnalisé. Aucun template générique : chaque recommandation est unique, validée par des experts, et modifiable."
  },
  {
    title: "Base d’exercices validés",
    icon: "📚",
    desc: "170+ exercices par type, zone, sport, niveau. Mise à jour continue avec les dernières données scientifiques.",
    full:
      "Chaque exercice est documenté, illustré, et enrichi de métadonnées (douleurs ciblées, sport, matériel, niveau). Contenu validé par des kinés formés en clinique et haut niveau, avec relectures régulières."
  },
  {
    title: "Adapté rééducation & prévention",
    icon: "🏥",
    desc: "Utilisable en cabinet ou à distance, en prévention, post-blessure ou retour au sport.",
    full:
      "Intégrez vos protocoles ou utilisez ceux validés par la plateforme. Le suivi est simplifié, les contenus s’adaptent aux données d’entrée, et peuvent être exportés/partagés avec d’autres professionnels."
  },
  {
    title: "Suivi et historique",
    icon: "📊",
    desc: "Consultez vos séances passées, suivez votre progression, ajustez vos objectifs en temps réel.",
    full:
      "Tableau de bord clair avec fréquence, durée, catégories d’exercices. Idéal pour motiver, corriger la trajectoire et adapter le plan en fonction des résultats."
  },
  {
    title: "Utilisable partout",
    icon: "📲",
    desc: "Mobile, tablette, ordinateur. Aucun téléchargement requis.",
    full:
      "Web-app responsive ultra-fluide. Utilisable en cabinet, salle, domicile, extérieur. Fonctionne même avec des réseaux moyens."
  },
  {
    title: "Partage & export",
    icon: "🤝",
    desc: "Envoyez un programme à vos patients, sportifs, collaborateurs — en un clic.",
    full:
      "Export PDF, partage par lien, intégration dossier patient. Communication fluidifiée, meilleure adhérence et meilleure expérience globale."
  }
];

export default function FonctionnalitesPage() {
  const [open, setOpen] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#e8f0fe 0%,#fff 100%)",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "28px 18px 10px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo-kinexperience.png"
            alt="KineXpérience logo"
            style={{
              width: 52,
              height: 52,
              marginRight: 14,
              borderRadius: 16,
              boxShadow: "0 2px 14px #1674ea18",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              color: "#144178",
              fontSize: 28,
              letterSpacing: ".01em",
            }}
          >
            KineXpérience
          </span>
        </div>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <Link to="/" style={navLink(false)}>Accueil</Link>
          <Link to="/pourqui" style={navLink(false)}>Pour qui ?</Link>
          <Link to="/fonctionnalites" style={navLink(true)}>Fonctionnalités</Link>
          <Link to="/tarifs" style={navLink(false)}>Tarifs</Link>
          <Link
            to="/generator"
            style={{
              marginLeft: 8,
              padding: "10px 26px",
              borderRadius: 14,
              background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
              boxShadow: "0 2px 10px #1674ea22",
              letterSpacing: ".01em",
              textDecoration: "none",
            }}
          >
            Commencer
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", margin: "60px 0 40px" }}>
        <h1 style={{ fontWeight: 800, fontSize: 36, color: "#174080", marginBottom: 10 }}>
          Nos Fonctionnalités
        </h1>
        <p style={{ fontSize: 18, color: "#2256a6", maxWidth: 700, margin: "0 auto" }}>
          Une plateforme complète, pensée par des kinés pour la performance, la santé et la simplicité.
        </p>
      </section>

      {/* Cartes + bouton “En savoir plus” */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
          gap: 24,
          maxWidth: 1080,
          margin: "0 auto 60px",
          padding: "0 12px"
        }}
      >
        {featuresList.map((f, i) => {
          const expanded = open === i;

          const toggle = (e) => {
            // si click sur le bouton ou sur la carte : on bascule
            if (e) e.stopPropagation?.();
            setOpen(expanded ? null : i);
          };

          return (
            <div
              key={f.title}
              role="group"
              aria-labelledby={`feat-${i}`}
              onClick={toggle}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: expanded ? "0 10px 28px #2451c92a" : "0 3px 20px #2451c91c",
                padding: "24px 22px",
                cursor: "pointer",
                transition: "box-shadow .2s ease, transform .16s ease",
              }}
              onMouseEnter={(e)=> e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={(e)=> e.currentTarget.style.transform="translateY(0)"}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.icon}</div>
                <div id={`feat-${i}`} style={{ fontWeight: 700, fontSize: 20, color: "#174080", marginBottom: 6 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 15, color: "#425670" }}>{f.desc}</div>

                {/* Bouton explicite */}
                <div style={{ marginTop: 12 }}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`feat-content-${i}`}
                    onClick={toggle}
                    style={{
                      padding: "9px 14px",
                      borderRadius: 12,
                      border: "1.5px solid #e2e6f0",
                      background: expanded ? "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)" : "#fff",
                      color: expanded ? "#fff" : "#174080",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: expanded ? "0 1px 6px #1674ea33" : "none"
                    }}
                    onMouseDown={(e)=> e.stopPropagation()}
                  >
                    {expanded ? "Réduire ▲" : "En savoir plus ▼"}
                  </button>
                </div>
              </div>

              {/* zone extensible animée (grid 0fr→1fr) */}
              <div
                id={`feat-content-${i}`}
                aria-hidden={!expanded}
                style={{
                  display: "grid",
                  gridTemplateRows: expanded ? "1fr" : "0fr",
                  transition: "grid-template-rows .28s ease",
                  marginTop: 10
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <hr style={{ margin: "12px auto", border: "none", borderTop: "1px solid #e1e8f4", width: "80%" }} />
                  <div style={{ fontSize: 14, color: "#2c3e50", lineHeight: 1.45 }}>{f.full}</div>
                  <div style={{ marginTop: 12 }}>
                    <Link
                      to="/generator"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        borderRadius: 14,
                        background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 15,
                        textDecoration: "none",
                        boxShadow: "0 3px 14px #1674ea33",
                        letterSpacing: ".02em"
                      }}
                    >
                      Créer mon programme
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Retour */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Link
          to="/"
          style={{
            padding: "14px 40px",
            borderRadius: 20,
            background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            boxShadow: "0 2px 14px #1674ea33",
            textDecoration: "none",
            transition: "all .15s cubic-bezier(.4,0,.2,1)",
          }}
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}

/* --- helpers styles --- */
function navLink(active) {
  return {
    color: active ? "#0046ad" : "#2451c9",
    fontWeight: active ? 700 : 500,
    textDecoration: active ? "underline" : "none",
    fontSize: 17,
  };
}
