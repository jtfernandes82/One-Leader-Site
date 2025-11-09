import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

// ----------------- BRAND (with safe defaults) -----------------
const BRAND = {
  name: "One Leader at a Time – Leadership Group™",
  legal: "One Leader at a Time Leadership Group, LLC",
  tagline: "Transforming Ordinary into Legendary",
  colors: {
    headerBlue: "#4C7CC1",
    link: "#FFFFFF",
    gold: "#F5C24B",
    goldDark: "#D4A32C",
    sky: "#E6EEF7",
    white: "#FFFFFF",
    body: "#334155"
  },
  fonts: {
    heading: "'Merriweather', Georgia, 'Times New Roman', serif",
    body: "'Open Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  },
  bannerUrl: "/fb-cover.png"
};

const color = (k, fallback = "#111827") => (BRAND.colors[k]) || fallback;
const font = (k, fallback = "system-ui, sans-serif") => (BRAND.fonts[k]) || fallback;

const useBrandSelfTest = () => {
  useEffect(() => {
    const tests = [
      ["BRAND exists", !!BRAND],
      ["BRAND.colors.headerBlue", !!BRAND.colors.headerBlue],
      ["BRAND.fonts.heading", !!BRAND.fonts.heading],
      ["BRAND.bannerUrl string", typeof BRAND.bannerUrl === "string"]
    ];
    console.table(tests.map(([name, pass]) => ({ test: name, pass })));
  }, []);
};

const GoldButton = ({ to = "#", text = "Learn more" }) => (
  <Link
    to={to}
    className="px-5 py-3 rounded-lg transition-colors duration-200"
    style={{ backgroundColor: color("gold"), color: "#0f172a" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = color("goldDark");
      e.currentTarget.style.color = "#FFFFFF";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = color("gold");
      e.currentTarget.style.color = "#0f172a";
    }}
  >
    {text}
  </Link>
);

const AppShell = ({ children }) => {
  useBrandSelfTest();
  if (typeof document !== "undefined") {
    document.title = "One Leader at a Time – Leadership Group™ | E.L.I.T.E.™ Framework";
  }
  return (
    <div className="min-h-screen bg-white" style={{ color: color("body"), fontFamily: font("body") }}>
      <header className="sticky top-0 z-40 backdrop-blur border-b border-transparent" style={{ backgroundColor: color("headerBlue") }}>
        <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src={BRAND.bannerUrl} alt="One Leader at a Time banner" className="h-16 md:h-20 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/elite", label: "ELITE" },
              { to: "/speaking", label: "Speaking" },
              { to: "/veterans", label: "Veterans" },
              { to: "/contact", label: "Contact" }
            ].map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `hover:opacity-90 ${isActive ? "font-semibold" : ""}`} style={{ color: color("link") }}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-10 border-t border-transparent" style={{ backgroundColor: color("headerBlue") }}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

const HomePage = () => (
  <AppShell>
    <section className="w-full text-center py-20" style={{ background: `linear-gradient(180deg, ${color("sky")} 0%, ${color("white")} 100%)` }}>
      <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>
        Lead Today. Transform Tomorrow.
      </h1>
      <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">
        Empowering leaders and organizations through the E.L.I.T.E.™ Framework — Empower, Lead, Inspire, Transform, Elevate.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <GoldButton to="/contact" text="Book a discovery call" />
        <GoldButton to="/elite" text="Explore the E.L.I.T.E.™ Framework" />
      </div>
    </section>
  </AppShell>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
