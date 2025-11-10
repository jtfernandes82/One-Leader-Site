import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

// ----------------- BRAND -----------------
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
  // ⬇️ Use your new banner file here
  bannerUrl: "/logo01.png" // must exist at /public/logo01.png
};

// ----------------- Helpers -----------------
const color = (k, fallback = "#111827") => (BRAND.colors && BRAND.colors[k]) || fallback;
const font = (k, fallback = "system-ui, sans-serif") => (BRAND.fonts && BRAND.fonts[k]) || fallback;

const useBrandSelfTest = () => {
  useEffect(() => {
    const tests = [
      ["BRAND exists", !!BRAND],
      ["BRAND.colors.headerBlue", !!(BRAND.colors && BRAND.colors.headerBlue)],
      ["BRAND.fonts.heading", !!(BRAND.fonts && BRAND.fonts.heading)],
      ["BRAND.bannerUrl string", typeof BRAND.bannerUrl === "string"],
    ];
    // eslint-disable-next-line no-console
    console.table(tests.map(([name, pass]) => ({ test: name, pass })));
  }, []);
};

// ----------------- Shared UI -----------------
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
      {/* ======= HEADER as FULL-WIDTH BANNER BACKGROUND ======= */}
      <header
        className="sticky top-0 z-40 border-b border-transparent"
        style={{
          backgroundImage: `url(${BRAND.bannerUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "140px"
        }}
      >
        {/* subtle overlay to keep nav readable */}
        <div style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.10))" }}>
          <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* Optional inline logo (hide if you want ONLY the background): */}
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img
                src={BRAND.bannerUrl}
                alt="One Leader at a Time banner"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const f = document.getElementById("brand-fallback");
                  if (f) f.style.display = "block";
                }}
              />
              <span
                id="brand-fallback"
                style={{
                  display: "none",
                  color: "#FFFFFF",
                  fontFamily: font("heading"),
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.35)"
                }}
              >
                One Leader at a Time – Leadership Group™
              </span>
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
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `hover:opacity-90 ${isActive ? "font-semibold" : ""}`}
                  style={{ color: "#FFFFFF", textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-10 border-t border-transparent" style={{ backgroundColor: color("headerBlue") }}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <Link to="/elite" className="hover:text-slate-300">ELITE</Link>
            <Link to="/services" className="hover:text-slate-300">Services</Link>
            <Link to="/speaking" className="hover:text-slate-300">Speaking</Link>
            <Link to="/veterans" className="hover:text-slate-300">Veterans</Link>
            <Link to="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ----------------- Pages -----------------
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

const AboutPage = () => (
  <AppShell>
    <section className="w-full" style={{ background: `linear-gradient(180deg, ${color("white")} 0%, ${color("sky")} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>About Jesseana Fernandes</h2>
        <div className="mt-6 space-y-6 text-slate-700 leading-relaxed max-w-3xl">
          <p>
            Jesseana Fernandes is a transformational senior leader and <strong>Chief Warrant Officer Three (CW3)</strong> with over two decades of expertise in leadership,
            logistics, and organizational strategy. As a <strong>Senior Manager in aerospace operations</strong>, she brings a rare dual perspective—combining the precision of
            military discipline with the innovation of corporate excellence.
          </p>
          <p>
            Throughout her career, Jesseana has mentored leaders from <strong>junior enlisted Soldiers to senior commissioned officers</strong>, serving as a trusted advisor
            and technical expert to decision-makers at every level. Her leadership approach is rooted in purpose, accountability, and service—principles that consistently
            deliver clarity in complex operations and performance under pressure.
          </p>
          <p>
            Her philosophy is simple and proven: <em>great organizations are built one leader at a time</em>. That conviction inspired the creation of
            <strong> One Leader at a Time – Leadership Group™</strong> and its proprietary <strong>E.L.I.T.E.™ Framework</strong>—Empower, Lead, Inspire, Transform, Elevate.
          </p>
        </div>

        <h3 className="mt-12 text-2xl md:text-3xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>
          About One Leader at a Time – Leadership Group™
        </h3>
        <div className="mt-4 space-y-6 text-slate-700 leading-relaxed max-w-3xl">
          <p>
            <strong>One Leader at a Time – Leadership Group™</strong> equips executives, teams, and transitioning veterans to lead with integrity, resilience, and purpose.
            We deliver executive coaching, organizational transformation programs, and veteran transition leadership—bridging the gap between technical mastery and
            human-centered leadership.
          </p>
          <p>
            Every engagement is grounded in the <strong>E.L.I.T.E.™ Framework</strong>, translating values into daily behaviors, decision frameworks, and measurable outcomes.
            Our mission is to build <strong>high-performing teams</strong> and <strong>resilient cultures</strong> that thrive in high-stakes environments.
          </p>
        </div>

        <div className="mt-10 text-sm font-medium tracking-wide" style={{ color: color("headerBlue") }}>
          Veteran-Owned • Women-Owned • Purpose-Driven • Leadership-Focused
        </div>

        <div className="mt-6">
          <GoldButton to="/elite" text="Explore the E.L.I.T.E.™ Framework →" />
        </div>
      </div>
    </section>
  </AppShell>
);

const ServicesPage = () => (
  <AppShell>
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>Services</h2>
        <p className="mt-6 text-slate-700 max-w-3xl leading-relaxed">
          Our services transform leaders, teams, and organizations through the E.L.I.T.E.™ Framework — Empower, Lead, Inspire, Transform, Elevate.
        </p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 p-6 bg-white/80">
            <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>Leadership & Team Development</h3>
            <p className="mt-2 text-slate-600 text-sm">High-impact workshops to strengthen trust, communication, and decision-making across all levels of leadership.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white/80">
            <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>Executive & Strategic Coaching</h3>
            <p className="mt-2 text-slate-600 text-sm">Customized one-on-one or small-group coaching for senior leaders navigating transformation and performance excellence.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white/80">
            <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>Veteran Transition Leadership</h3>
            <p className="mt-2 text-slate-600 text-sm">
              As a proud veteran-owned organization, One Leader at a Time – Leadership Group™ provides comprehensive support for transitioning service members and veterans,
              including leadership translation, resume building, interview preparation, job search coaching, career counseling, mentorship matching, and 30-60-90 onboarding
              strategy planning—all aligned with the E.L.I.T.E.™ Framework.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white/80">
            <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>Organizational Resilience Consulting</h3>
            <p className="mt-2 text-slate-600 text-sm">Build adaptability and continuity strategies for long-term success in complex environments.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white/80">
            <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>Speaking & Keynote Engagements</h3>
            <p className="mt-2 text-slate-600 text-sm">Dynamic keynotes and presentations rooted in leadership, resilience, and transformation across high-stakes environments.</p>
          </div>
        </div>
        <div className="mt-8"><GoldButton to="/contact" text="Schedule a consultation" /></div>
      </div>
    </section>
  </AppShell>
);

const ElitePage = () => (
  <AppShell>
    <section className="w-full" style={{ background: `linear-gradient(180deg, ${color("white")} 0%, ${color("sky")} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>E.L.I.T.E.™ Framework</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-5 gap-4 text-slate-700">
          {[{k:"E",t:"Empower",d:"Build confidence, autonomy, and accountability."},
            {k:"L",t:"Lead",d:"Model values, align decisions, and execute with clarity."},
            {k:"I",t:"Inspire",d:"Craft vision and communicate to mobilize action."},
            {k:"T",t:"Transform",d:"Navigate change with resilience and systems thinking."},
            {k:"E",t:"Elevate",d:"Sustain excellence through coaching and continuous learning."}].map((m)=> (
            <div key={m.t} className="rounded-xl border border-slate-200 p-5 bg-white">
              <div className="text-sm font-semibold" style={{ color: color("headerBlue") }}>{m.k} — {m.t}</div>
              <p className="mt-2 text-slate-600 text-sm">{m.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><GoldButton to="/contact" text="Request ELITE program details" /></div>
      </div>
    </section>
  </AppShell>
);

const SpeakingPage = () => (
  <AppShell>
    <section className="w-full" style={{ background: `linear-gradient(180deg, ${color("white")} 0%, ${color("sky")} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>Speaking & Keynotes</h1>
        <p className="mt-4 text-slate-700 max-w-3xl">
          High-energy, high-credibility talks that turn leadership principles into action. Jesseana brings two decades of military and aerospace leadership to the stage,
          equipping audiences to lead with clarity, courage, and the E.L.I.T.E.™ mindset.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GoldButton to="/contact" text="Check availability" />
          <a href="/OneLeaderAtATime_Speaker-OneSheet.pdf" className="px-5 py-3 rounded-lg border" style={{ borderColor: color("headerBlue"), color: color("headerBlue") }}>
            Download one-sheet
          </a>
        </div>
      </div>
    </section>

    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-start">
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200">
          <iframe
            title="Speaker Demo Reel"
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="space-y-3 text-slate-700">
          <div><span className="font-semibold">Formats:</span> Keynote (20–45 min), Fireside chat, Panelist, Workshop (90–120 min)</div>
          <div><span className="font-semibold">Audiences:</span> Executives, emerging leaders, technical teams, veteran ERGs</div>
          <div><span className="font-semibold">Outcomes:</span> Higher clarity, accountability, decision speed, and cultural momentum</div>
          <div><span className="font-semibold">Travel:</span> Domestic & international • Based in Oklahoma City, OK</div>
        </div>
      </div>
    </section>

    <section className="w-full" style={{ background: `linear-gradient(180deg, ${color("sky")} 0%, ${color("white")} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>Signature Topics</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            t:"Building High-Performance Teams in High-Stakes Environments",
            b:"How to align roles, run disciplined stand-ups, and execute with urgency without burning people out.",
            o:["Team trust & cadence systems","Clarity of priorities & ownership","Faster, cleaner handoffs"]
          },{
            t:"Culture as a Competitive Advantage",
            b:"Turn values into daily behaviors, feedback loops, and visible leadership standards that lift performance.",
            o:["Leadership standards & rituals","Constructive feedback culture","Retention & engagement gains"]
          },{
            t:"The E.L.I.T.E.™ Framework: Practical Leadership for Real Results",
            b:"Empower, Lead, Inspire, Transform, Elevate — a field-tested system to simplify decisions and drive change.",
            o:["Decision frameworks","Change navigation","Post-event action plans"]
          },{
            t:"Veteran Lessons for Modern Leaders",
            b:"From mission planning to after-action reviews — translate military excellence into business execution.",
            o:["Leadership under pressure","Accountability systems","After-action learning"]
          }].map(card => (
            <div key={card.t} className="rounded-xl border border-slate-200 p-6 bg-white/80">
              <h3 className="font-semibold" style={{ fontFamily: font("heading") }}>{card.t}</h3>
              <p className="mt-2 text-slate-600 text-sm">{card.b}</p>
              <div className="mt-3">
                <div className="text-xs font-medium" style={{ color: color("headerBlue") }}>Audience takeaways</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                  {card.o.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </AppShell>
);

const VeteransPage = () => (
  <AppShell>
    <section className="w-full" style={{ background: `linear-gradient(180deg, ${color("white")} 0%, ${color("sky")} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>Veteran Transition Leadership</h2>
        <div className="mt-4 text-slate-700 space-y-4 leading-relaxed max-w-3xl">
          <p><strong>From junior enlisted to senior commissioned officers — stepping into what’s next.</strong></p>
          <p>We equip veterans to convert military discipline, technical mastery, and operational experience into high-impact civilian leadership. Our programs focus on leadership readiness, advancement, and career success—not just job placement.</p>
          <p><strong>What’s included:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Leadership & skills translation into executive-ready language</li>
            <li>Resume & LinkedIn development tailored to leadership and technical roles</li>
            <li>Interview preparation focused on confidence, communication, and executive presence</li>
            <li>Job search coaching and market navigation strategies</li>
            <li>Career counseling to align experience, purpose, and advancement goals</li>
            <li>Senior mentor matching and executive networking strategies</li>
            <li>Target-role 30-60-90 day onboarding plan aligned to E.L.I.T.E.™</li>
            <li>Ongoing progression and promotion planning support</li>
          </ul>
        </div>
        <div className="mt-8"><GoldButton to="/contact" text="Start your transition" /></div>
      </div>
    </section>
  </AppShell>
);

const ContactPage = () => (
  <AppShell>
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: font("heading"), color: color("headerBlue") }}>Contact</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-6 items-start">
          <form className="rounded-xl border border-slate-200 p-6 space-y-4 bg-white">
            <div>
              <label className="text-sm text-slate-600">Name</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Your name"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="you@company.com"/>
              </div>
              <div>
                <label className="text-sm text-slate-600">Phone</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="(###) ###-####"/>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600">What are you looking for?</label>
              <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>Keynote / Speaking</option>
                <option>Leadership Workshop</option>
                <option>Executive Coaching</option>
                <option>Veteran Transition Program</option>
                <option>Custom Engagement</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Message</label>
              <textarea rows={5} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Tell us about your goals, dates, and audience size…"/>
            </div>
            <GoldButton to="/contact" text="Send inquiry" />
          </form>
          <div className="rounded-xl border border-slate-200 p-6 space-y-3 bg-white">
            <div className="text-slate-700"><span className="font-medium">Email</span> — info@OneLeaderAtATimeGroup.com</div>
            <div className="text-slate-700"><span className="font-medium">Location</span> — Oklahoma City, OK</div>
          </div>
        </div>
      </div>
    </section>
  </AppShell>
);

// ----------------- Router -----------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/elite" element={<ElitePage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/veterans" element={<VeteransPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

// ----------------- Runtime smoke tests -----------------
if (typeof window !== "undefined") {
  console.assert(typeof color === "function", "color() defined");
  console.assert(typeof font === "function", "font() defined");
  console.assert(!!BRAND.colors.headerBlue, "headerBlue set");
  console.assert(!!BRAND.fonts.heading, "heading font set");
}
