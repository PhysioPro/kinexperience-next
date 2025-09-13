// src/components/HomePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Smooth scrolling global (ancre -> section)
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev; };
  }, []);

  // Active section for nav highlight
  const [activeId, setActiveId] = useState(null);
  const sections = useMemo(() => [
    { id: "pourqui", label: "Pour qui ?" },
    { id: "features", label: "Fonctionnalités" },
    { id: "tarifs", label: "Tarifs" },
    { id: "login", label: "Connexion" },
    { id: "contact", label: "Contact" },
  ], []);

  useEffect(() => {
    const els = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean);

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // On prend la section la plus visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // Le header ~72px => on déclenche un peu avant
        rootMargin: "-72px 0px -60% 0px",
        threshold: [0.2, 0.5, 0.75],
      }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const isActive = (id) => activeId === id;

  return (
    <div style={rootStyle}>
      {/* HEADER sticky */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo-kinexperience.png" alt="KineXpérience logo" style={logoStyle} loading="lazy" />
          <span style={brandStyle}>KineXpérience</span>
        </div>
        <nav style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <a href="#pourqui" style={{ ...navStyle, ...(isActive("pourqui") ? navActiveStyle : null) }}>Pour qui ?</a>
          <a href="#features" style={{ ...navStyle, ...(isActive("features") ? navActiveStyle : null) }}>Fonctionnalités</a>
          <a href="#tarifs" style={{ ...navStyle, ...(isActive("tarifs") ? navActiveStyle : null) }}>Tarifs</a>
          <a href="#login" style={{ ...navStyle, ...(isActive("login") ? navActiveStyle : null) }}>Connexion</a>
          <a href="#contact" style={{ ...navStyle, ...(isActive("contact") ? navActiveStyle : null) }}>Contact</a>
          <Link to="/generator" style={ctaButtonStyle} aria-label="Commencer à générer mon programme">Commencer</Link>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ ...sectionY(40, 48), textAlign: "center" }}>
        <img src="/logo-kinexperience.png" alt="Logo KineXpérience" style={heroLogoStyle} draggable={false} loading="lazy" />
        <h1 style={heroTitleStyle}>
          Anticiper, renforcer, performer,<br />chaque détail compte.
        </h1>
        <div style={heroSubtitleStyle}>
          Génère des programmes d’exercices sur-mesure, validés par des kinés & coachs sportifs d’élite.<br />
          <span style={{ color: "#1451a0", fontWeight: 600 }}>La référence SaaS sport & santé.</span>
        </div>
        <Link to="/generator" style={heroCTAStyle}>Créer mon programme</Link>
      </section>

      {/* POUR QUI */}
      <section id="pourqui" style={{ ...pourQuiWrapStyle, scrollMarginTop: 90 }}>
        {[
          { label: "Sportifs pros", emoji: "🏆" },
          { label: "Clubs & équipes", emoji: "⚽️" },
          { label: "Kinés & coachs", emoji: "🧑‍⚕️" },
          { label: "Particuliers", emoji: "🏠" },
        ].map(({ label, emoji }) => (
          <div key={label} style={pourQuiCardStyle} role="button" tabIndex={0} aria-label={label}>
            <div style={{ fontSize: 34 }}>{emoji}</div>
            {label}
          </div>
        ))}
      </section>

      {/* FONCTIONNALITES */}
      <section id="features" style={{ ...featuresGridStyle, scrollMarginTop: 90 }}>
        {features.map(({ icon, title, desc }) => (
          <div key={title} style={featureCardStyle}>
            <div style={{ fontSize: 33, marginBottom: 13 }} aria-hidden>{icon}</div>
            <div style={featureTitleStyle}>{title}</div>
            <div style={featureDescStyle}>{desc}</div>
          </div>
        ))}
      </section>

      {/* TARIFS (Freemium -> Prestige) */}
      <section id="tarifs" style={{ ...pricingSectionStyle, scrollMarginTop: 90 }}>
        <h2 style={h2Style}>Choisissez votre expérience</h2>
        <p style={subtitleStyle}>Du Freemium à l’Ultra-Premium, chaque sportif trouve sa formule.</p>

        <div style={pricingGridStyle}>
          {/* Gratuit */}
          <div style={pricingCardStyle}>
            <div style={planHeaderStyle}>Gratuite</div>
            <div style={priceStyle}>0 €<span style={perStyle}>/mois</span></div>
            <ul style={ulStyle}>
              {[
                "1 programme personnalisé / mois",
                "Accès aux modules basiques",
                "Aperçu de la bibliothèque d’exercices",
              ].map((f) => (<li key={f} style={liStyle}>✅ {f}</li>))}
            </ul>
            <Link to="/generator" style={planCTAStyle}>Commencer gratuitement</Link>
          </div>

          {/* Standard */}
          <div style={pricingCardStyle}>
            <div style={planHeaderStyle}>Standard</div>
            <div style={priceStyle}>29 €<span style={perStyle}>/mois</span></div>
            <ul style={ulStyle}>
              {[
                "Programmes illimités",
                "Accès complet à la bibliothèque",
                "Suivi automatique des progrès",
              ].map((f) => (<li key={f} style={liStyle}>✅ {f}</li>))}
            </ul>
            <Link to="/generator" style={planCTAStyle}>Rejoindre Standard</Link>
          </div>

          {/* Premium (Most popular) */}
          <div style={{ ...pricingCardStyle, border: "2px solid #0f4ab8", boxShadow: "0 6px 24px #2451c93a", transform: "scale(1.02)" }}>
            <div style={{ ...planHeaderStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Premium</span>
              <span style={badgeStyle}>Le plus populaire</span>
            </div>
            <div style={priceStyle}>99 €<span style={perStyle}>/mois</span></div>
            <ul style={ulStyle}>
              {[
                "Personnalisation avancée (objectifs & pathologies)",
                "Suivi détaillé + analytics",
                "Accès prioritaire aux nouveautés",
              ].map((f) => (<li key={f} style={liStyle}>✅ {f}</li>))}
            </ul>
            <Link to="/generator" style={planCTAStyle}>Passer Premium</Link>
          </div>

          {/* Pro / Entreprise (B2B) */}
          <div style={pricingCardStyle}>
            <div style={planHeaderStyle}>Pro / Club / Entreprise</div>
            <div style={priceStyle}>Sur devis</div>
            <ul style={ulStyle}>
              {[
                "Multi-utilisateurs & équipes",
                "Tableaux de performance collectifs",
                "Reporting & analytics avancés",
              ].map((f) => (<li key={f} style={liStyle}>✅ {f}</li>))}
            </ul>
            <a href="#contact" style={planCTAStyle}>Demander un devis</a>
          </div>

          {/* Prestige / Luxe */}
          <div style={{ ...pricingCardStyle, border: "2px solid #c6a24b", boxShadow: "0 10px 28px #c6a24b33", background: "linear-gradient(180deg,#fff, #fffaf0)" }}>
            <div style={{ ...planHeaderStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Prestige / Luxe</span>
              <span style={{ ...badgeStyle, background: "linear-gradient(90deg,#d4af37,#b8860b)", color: "#fff" }}>Exclusif</span>
            </div>
            <div style={priceStyle}>5 000 €<span style={perStyle}>/an</span></div>
            <ul style={ulStyle}>
              {[
                "Suivi individuel kiné + coach (1:1)",
                "Programmes ultra-personnalisés avec ajustements en temps réel",
                "Accès VIP & nouveautés en avant-première",
                "Places limitées — club privé",
              ].map((f) => (<li key={f} style={liStyle}>🌟 {f}</li>))}
            </ul>
            <a href="#contact" style={{ ...planCTAStyle, background: "linear-gradient(90deg,#d4af37,#b8860b)" }}>Rejoindre le club Elite</a>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES (confiance) */}
      <section style={{ padding: "60px 20px", background: "#fff" }}>
        <h2 style={h2Style}>Ils nous font confiance</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {["⚽️ Club Elite", "🏀 Académie Basket", "🏌️‍♂️ Golf Pro"].map((name, i) => (
            <div key={i} style={testimonialStyle} aria-label={`Référence ${name}`}>{name}</div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={finalCTASectionStyle}>
        <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 14 }}>Prêt à passer au niveau supérieur ?</h2>
        <p style={{ fontSize: 18, opacity: .95, marginBottom: 22 }}>
          Rejoignez dès maintenant les sportifs, kinés et coachs qui optimisent leur performance.
        </p>
        <Link to="/generator" style={finalCTAStyle}>Commencer maintenant</Link>
      </section>

      {/* LOGIN (ancre simple) */}
      <section id="login" style={{ padding: "40px 20px", textAlign: "center", scrollMarginTop: 90 }}>
        <p style={{ color: "#2256a6" }}>
          Déjà membre ? <Link to="/login" style={{ color: "#0f4ab8", fontWeight: 700, textDecoration: "none" }}>Se connecter</Link>
        </p>
      </section>

      {/* CONTACT (nouvelle section) */}
      <section id="contact" style={{ padding: "60px 20px", background: "#f7f9ff", scrollMarginTop: 90 }}>
        <h2 style={h2Style}>Contact</h2>
        <p style={{ color: "#3a5ea8", textAlign: "center", marginBottom: 20 }}>
          Une question, un devis Pro/Entreprise ou l’offre Prestige ?
        </p>
        <div style={contactCard}>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Merci ! Nous revenons vers vous sous 24h ouvrées."); }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <input required name="name" placeholder="Nom complet" style={inputStyle} />
            <input required type="email" name="email" placeholder="Email" style={inputStyle} />
            <input name="phone" placeholder="Téléphone (optionnel)" style={inputStyle} />
            <input name="company" placeholder="Club / Entreprise (optionnel)" style={inputStyle} />
            <textarea required name="message" placeholder="Votre besoin" style={{ ...inputStyle, gridColumn: "1 / -1", minHeight: 90 }} />
            <button type="submit" style={{ ...planCTAStyle, gridColumn: "1 / -1", textAlign: "center" }}>
              Envoyer ma demande
            </button>
          </form>
          <div style={{ marginTop: 12, fontSize: 14, color: "#4a5f85", textAlign: "center" }}>
            Ou écrivez-nous : <a href="mailto:contact@kinexperience.com" style={{ color: "#0f4ab8", textDecoration: "none", fontWeight: 700 }}>contact@kinexperience.com</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footerStyle}>© {new Date().getFullYear()} KineXpérience — Tous droits réservés.</footer>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const rootStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#e8f0fe 0%,#fff 100%)",
  padding: 0,
  fontFamily: "Inter, Segoe UI, Arial, sans-serif",
};

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: 1100,
  margin: "0 auto",
  padding: "14px 18px",
  backdropFilter: "saturate(120%) blur(8px)",
  background: "rgba(255,255,255,0.7)",
  borderBottom: "1px solid #e9eefc",
};

const logoStyle = {
  width: 52,
  height: 52,
  marginRight: 14,
  borderRadius: 16,
  boxShadow: "0 2px 14px #1674ea18",
};

const brandStyle = { fontWeight: 700, color: "#144178", fontSize: 28, letterSpacing: ".01em" };
const navStyle = { color: "#2451c9", fontWeight: 600, textDecoration: "none", fontSize: 16, padding: "6px 10px", borderRadius: 10 };
const navActiveStyle = { background: "#eaf1ff", color: "#0f4ab8", boxShadow: "0 1px 6px #0f4ab81a" };

const ctaButtonStyle = { marginLeft: 6, padding: "10px 22px", borderRadius: 14, background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)", color: "#fff", fontWeight: 700, fontSize: 16, boxShadow: "0 2px 10px #1674ea22", letterSpacing: ".01em", textDecoration: "none" };

const heroLogoStyle = { width: 110, height: 110, margin: "0 auto 15px auto", borderRadius: 20, boxShadow: "0 4px 30px #17408024" };
const heroTitleStyle = { fontWeight: 800, fontSize: 38, color: "#174080", letterSpacing: ".01em", marginBottom: 12, marginTop: 0 };
const heroSubtitleStyle = { fontSize: 21, color: "#2256a6", marginBottom: 26, fontWeight: 500, maxWidth: 540, margin: "0 auto" };
const heroCTAStyle = { display: "inline-block", margin: "20px auto 0 auto", padding: "16px 46px", borderRadius: 18, background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)", color: "#fff", fontWeight: 800, fontSize: 22, boxShadow: "0 4px 20px #1674ea33", letterSpacing: ".03em", textDecoration: "none" };

const sectionY = (mt, mb) => ({ marginTop: mt, marginBottom: mb });

const pourQuiWrapStyle = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 34, marginBottom: 44 };
const pourQuiCardStyle = { minWidth: 170, minHeight: 115, background: "#f5f8ff", borderRadius: 20, boxShadow: "0 2px 10px #2451c915", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "#134084", margin: 8 };

const featuresGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 26, maxWidth: 1050, margin: "0 auto 55px auto" };
const featureCardStyle = { background: "#fff", borderRadius: 19, boxShadow: "0 3px 18px #2451c91c", padding: "30px 18px 24px 18px", textAlign: "center" };
const featureTitleStyle = { fontWeight: 700, fontSize: 20, color: "#174080", marginBottom: 5 };
const featureDescStyle = { color: "#425670", fontSize: 15, fontWeight: 500 };

const features = [
  { icon: "⚡️", title: "Génération instantanée", desc: "Programme sur-mesure, en un clic, selon objectifs & pathologies." },
  { icon: "📚", title: "Base d’exercices validés", desc: "Bibliothèque complète, mise à jour par des experts du sport et santé." },
  { icon: "🏥", title: "Adapté kiné & prévention", desc: "Protocoles pro pour rééducation, prévention et optimisation." },
  { icon: "📊", title: "Suivi & historique", desc: "Visualisez vos progrès, adaptez votre routine selon vos résultats." },
  { icon: "📲", title: "Accessible partout", desc: "Web app responsive. Utilisable sur mobile, tablette, PC." },
  { icon: "🤝", title: "Partage & export", desc: "Envoyez votre programme à un coach ou imprimez-le facilement." },
];

const pricingSectionStyle = { padding: "70px 20px", background: "#f4f7ff", textAlign: "center" };
const h2Style = { fontSize: 32, fontWeight: 800, color: "#174080", marginBottom: 10 };
const subtitleStyle = { fontSize: 16, color: "#3a5ea8", marginBottom: 32 };
const pricingGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 26, maxWidth: 1100, margin: "0 auto" };
const pricingCardStyle = { background: "#fff", borderRadius: 18, boxShadow: "0 3px 16px #2451c920", padding: "26px 20px", textAlign: "left" };
const planHeaderStyle = { fontSize: 18, fontWeight: 800, color: "#174080", marginBottom: 8 };
const priceStyle = { fontSize: 28, fontWeight: 900, color: "#0f4ab8", marginBottom: 12 };
const perStyle = { fontSize: 14, fontWeight: 700, color: "#6b8dd6", marginLeft: 6 };
const ulStyle = { listStyle: "none", padding: 0, margin: "0 0 16px 0" };
const liStyle = { fontSize: 15, color: "#304463", marginBottom: 8, fontWeight: 500 };
const planCTAStyle = { display: "inline-block", padding: "10px 22px", borderRadius: 14, background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)", color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none" };
const badgeStyle = { fontSize: 11, fontWeight: 900, padding: "6px 10px", borderRadius: 999, background: "#0f4ab8", color: "#fff", letterSpacing: ".02em" };

const testimonialStyle = { background: "#f5f8ff", borderRadius: 16, padding: "20px 30px", fontWeight: 600, fontSize: 18, color: "#174080", boxShadow: "0 2px 10px #2451c915" };

const finalCTASectionStyle = { textAlign: "center", padding: "70px 20px", background: "linear-gradient(90deg,#1674ea 0%,#0046ad 100%)", color: "#fff" };
const finalCTAStyle = { display: "inline-block", padding: "16px 42px", borderRadius: 18, background: "#fff", color: "#0046ad", fontWeight: 800, fontSize: 20, textDecoration: "none", boxShadow: "0 3px 14px #00000022" };

const footerStyle = { background: "#144178", color: "#fff", textAlign: "center", padding: "22px 12px", fontSize: 14 };

const contactCard = { maxWidth: 740, margin: "0 auto", background: "#fff", borderRadius: 18, boxShadow: "0 3px 16px #2451c920", padding: 20, border: "1px solid #e5ecff" };
const inputStyle = { width: "100%", border: "1px solid #dfe7ff", background: "#fff", borderRadius: 12, padding: "12px 14px", fontSize: 15, color: "#20416d", outline: "none" };
