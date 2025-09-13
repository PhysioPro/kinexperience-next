// src/pages/PourQui.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PourQuiPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const SECTIONS = useMemo(() => ([
    {
      id: "sportifs",
      title: "Sportifs pros",
      emoji: "🏆",
      short:
        "Optimisez vos performances, accélérez la récup’ et prévenez les blessures avec des protocoles validés, utilisés au haut niveau.",
      full: `Routines conçues avec des experts en médecine du sport et retours terrain (clubs pros). 
Ciblage par phase : échauffement optimisé, récupération active, mobilité spécifique, prévention des blessures fréquentes (genou, ischios, lombaires…). 
Adapté football, tennis, course, sports mécaniques, etc.`,
      preset: { audience: "sportif-pro" }
    },
    {
      id: "clubs",
      title: "Clubs & équipes",
      emoji: "⚽️",
      short:
        "Pilotez la préparation, la réathlétisation et la prévention depuis une plateforme unique. Traçabilité et personnalisation par joueur/poste.",
      full: `Centralisez routines, protocoles et historique santé. 
Accès staff (prépa, kiné, médecin, coach), vue effectif, rapports automatiques. 
Suivi blessés, prévention ciblée, réintégration progressive. 
Usage terrain (mobile/tablette) et synchronisation avec vos outils.`,
      preset: { audience: "club" }
    },
    {
      id: "kines",
      title: "Kinés & coachs",
      emoji: "🧑‍⚕️",
      short:
        "Créez des protocoles sur-mesure en quelques clics, partagez-les et suivez l’adhérence patient/sportif.",
      full: `Bibliothèque validée et modulaire selon pathologie, phase de récupération et objectifs. 
Suivi d’évolution, rappels, statistiques d’adhérence. 
Gagnez en efficacité et en qualité perçue, au cabinet comme à distance.`,
      preset: { audience: "kine-coach" }
    },
    {
      id: "particuliers",
      title: "Particuliers",
      emoji: "🏠",
      short:
        "Un programme pro, adapté à vos douleurs, votre niveau et votre matériel. Suivi simple à domicile, en salle ou en extérieur.",
      full: `Fini les vidéos génériques : protocole personnalisé par objectif, douleurs et contraintes. 
Progressif, clair, utilisable sur smartphone à tout moment. 
Sans matériel si besoin.`,
      preset: { audience: "particulier" }
    },
    {
      id: "entreprises",
      title: "Entreprises & Bureaux",
      emoji: "🏛️",
      short:
        "Réduisez les TMS, améliorez la QVCT, proposez une expérience bien-être sécurisée et mesurable.",
      full: `Prévention TMS, posture, gestion du stress et micro-pauses actives. 
Programmes adaptés au métier et au temps disponible, souvent sans matériel. 
Back-office RH : suivi d’engagement, besoins par service, indicateurs actionnables.`,
      preset: { audience: "entreprise" }
    },
  ]), []);

  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");

  // Ouvre automatiquement la carte basée sur le hash (#kines, #clubs, etc.)
  useEffect(() => {
    const hash = decodeURIComponent(location.hash || "").replace("#", "");
    if (!hash) return;
    const exists = SECTIONS.some(s => s.id === hash);
    if (exists) setActive(hash);
  }, [location.hash, SECTIONS]);

  // Gestion filtre rapide (tabs)
  const filteredSections = useMemo(() => {
    if (filter === "all") return SECTIONS;
    return SECTIONS.filter(s => s.id === filter);
  }, [filter, SECTIONS]);

  // Toggle carte (click / clavier) + MAJ du hash pour deep-link
  const onToggle = (id) => {
    setActive(prev => (prev === id ? null : id));
    const url = new URL(window.location.href);
    if (active === id) {
      url.hash = "";
    } else {
      url.hash = `#${id}`;
    }
    // Remplace l’historique pour éviter spam “back”
    navigate(`${url.pathname}${url.hash}${url.search}`, { replace: true });
  };

  // CTA generator avec preset (querystring)
  const buildPresetLink = (preset) => {
    const params = new URLSearchParams(preset).toString();
    return `/generator?${params}`;
  };

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
          <Link to="/" style={{ color: "#2451c9", fontWeight: 500, textDecoration: "none", fontSize: 17 }}>
            Accueil
          </Link>
          <Link to="/pourqui" style={{ color: "#0046ad", fontWeight: 700, textDecoration: "underline", fontSize: 17 }}>
            Pour qui ?
          </Link>
          <Link to="/fonctionnalites" style={{ color: "#2451c9", fontWeight: 500, textDecoration: "none", fontSize: 17 }}>
            Fonctionnalités
          </Link>
          <Link to="/generator"
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

      {/* Title */}
      <section style={{ textAlign: "center", margin: "60px 0 24px" }}>
        <h1 style={{ fontWeight: 800, fontSize: 36, color: "#174080", marginBottom: 10 }}>Pour qui ?</h1>
        <p style={{ fontSize: 18, color: "#2256a6", maxWidth: 760, margin: "0 auto" }}>
          Athlètes, kinés, clubs, entreprises ou particuliers — <b>KineXpérience</b> s’adapte à votre réalité de terrain.
        </p>
      </section>

      {/* Tabs filtres rapides */}
      <section style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
        {[
          { key: "all", label: "Tous" },
          { key: "sportifs", label: "Sportifs pros" },
          { key: "kines", label: "Kinés & coachs" },
          { key: "clubs", label: "Clubs & équipes" },
          { key: "particuliers", label: "Particuliers" },
          { key: "entreprises", label: "Entreprises" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "9px 16px",
              borderRadius: 999,
              border: "1.5px solid",
              borderColor: filter === tab.key ? "#1674ea" : "#e2e6f0",
              background: filter === tab.key ? "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)" : "#fff",
              color: filter === tab.key ? "#fff" : "#174080",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: filter === tab.key ? "0 1px 6px #1674ea33" : "none"
            }}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* Interactive cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 1050,
          margin: "0 auto 40px",
          alignItems: "start",
          padding: "0 12px"
        }}
      >
        {filteredSections.map((s) => (
          <CardExpandable
            key={s.id}
            section={s}
            expanded={active === s.id}
            onToggle={() => onToggle(s.id)}
            ctaHref={buildPresetLink(s.preset)}
          />
        ))}
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
          }}
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}

/* ---- Composant carte extensible, a11y + animation ---- */
function CardExpandable({ section, expanded, onToggle, ctaHref }) {
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    if (expanded) {
      const h = contentRef.current?.scrollHeight || 0;
      setMaxH(h + 16);
    } else {
      setMaxH(0);
    }
  }, [expanded, section.full]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={`content-${section.id}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: expanded ? "0 12px 30px #2451c92d" : "0 3px 22px #2451c91b",
        padding: "22px 18px",
        cursor: "pointer",
        transition: "box-shadow .22s ease, transform .16s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 12px 30px #2451c92d")}
      onBlur={(e) => (e.currentTarget.style.boxShadow = expanded ? "0 12px 30px #2451c92d" : "0 3px 22px #2451c91b")}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>{section.emoji}</div>
        <h3 style={{ fontWeight: 800, fontSize: 22, color: "#174080", margin: 0 }}>{section.title}</h3>
        <p style={{ fontSize: 15, color: "#425670", lineHeight: 1.45, margin: "8px 0 0" }}>{section.short}</p>
      </div>

      {/* zone extensible animée */}
      <div
        id={`content-${section.id}`}
        ref={contentRef}
        style={{
          maxHeight: maxH,
          overflow: "hidden",
          transition: "max-height .28s ease",
        }}
      >
        <hr style={{ margin: "16px auto", border: "none", borderTop: "1px solid #e1e8f4", width: "86%" }} />
        <div style={{ fontSize: 14, color: "#2b425c", lineHeight: 1.55, whiteSpace: "pre-line" }}>
          {section.full}
        </div>

        {/* CTA contextualisé */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <Link
            to={ctaHref}
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

      {/* Lien “En savoir plus” visuel (sans déborder l’a11y) */}
      <div style={{ textAlign: "center", marginTop: 12, color: "#0f4ab8", fontWeight: 700, fontSize: 14 }}>
        {expanded ? "Réduire ▲" : "En savoir plus ▼"}
      </div>
    </div>
  );
}
