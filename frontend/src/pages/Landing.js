import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const FEATURES = [
  {
    icon: "🔗",
    title: "Blockchain-Verified",
    desc: "Every file upload is recorded as an immutable transaction on the Ethereum Sepolia testnet. No one can alter or tamper with your file registry.",
  },
  {
    icon: "🪐",
    title: "IPFS Storage",
    desc: "Files are pinned on IPFS via Pinata — distributed across thousands of nodes worldwide. No single server owns your data.",
  },
  {
    icon: "🔐",
    title: "Granular Sharing",
    desc: "Share files with specific wallet addresses. Grant or revoke access any time, directly from the smart contract — no middleman.",
  },
  {
    icon: "⚡",
    title: "Reshare Control",
    desc: "Decide at upload time whether a recipient can reshare your file. Permissions are enforced by contract code, not by trust.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect or Demo", body: "Use MetaMask with a Sepolia wallet, or click 'Demo Account' to explore instantly — no wallet needed." },
  { step: "02", title: "Upload a File", body: "Your file is pinned to IPFS. The resulting content hash is stored on-chain alongside your wallet address." },
  { step: "03", title: "Share Selectively", body: "Enter any wallet address to grant access. The smart contract enforces who can view each file — nothing else can override it." },
  { step: "04", title: "Full Control", body: "Delete files or revoke sharing at any time. Every action is a signed blockchain transaction." },
];

const TECH = [
  { label: "Smart Contract", value: "Solidity + Hardhat", color: "#facc15" },
  { label: "Network", value: "Ethereum Sepolia", color: "#818cf8" },
  { label: "Storage", value: "IPFS via Pinata", color: "#34d399" },
  { label: "Frontend", value: "React + ethers.js", color: "#38bdf8" },
];

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef();

  // Subtle parallax tilt on hero text
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * 6;
      const ry = (e.clientX / window.innerWidth - 0.5) * -6;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="page-root landing-root">

      {/* ── NAV ── */}
      <nav className="land-nav">
        <span className="land-nav-logo">Decentralized Drive</span>
        <button className="land-nav-cta" onClick={() => navigate("/connect")}>
          Launch App →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="land-hero">
        <div className="land-hero-inner" ref={heroRef}>
          <div className="land-eyebrow">Built on Ethereum · Stored on IPFS</div>
          <h1 className="land-hero-h1">
            Your files.<br />
            <span className="grad-text">No servers.</span><br />
            No middlemen.
          </h1>
          <p className="land-hero-sub">
            A fully decentralized file storage and sharing platform —
            every upload is an on-chain transaction, every access rule is
            a smart contract, and every file lives on IPFS forever.
          </p>
          <div className="land-hero-btns">
            <button className="land-btn-primary" onClick={() => navigate("/connect")}>
              Get Started
            </button>
            <button className="land-btn-ghost" onClick={() => {
              document.getElementById("how").scrollIntoView({ behavior: "smooth" });
            }}>
              How it works ↓
            </button>
          </div>
        </div>

        {/* floating pills */}
        <div className="land-pill land-pill-1">⛓️ On-chain</div>
        <div className="land-pill land-pill-2">🌐 IPFS</div>
        <div className="land-pill land-pill-3">🔒 Non-custodial</div>
      </section>

      {/* ── TECH STRIP ── */}
      <section className="land-tech-strip">
        {TECH.map((t) => (
          <div className="land-tech-item" key={t.label}>
            <span className="land-tech-label">{t.label}</span>
            <span className="land-tech-value" style={{ color: t.color }}>{t.value}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="land-section" id="features">
        <div className="land-section-tag">Features</div>
        <h2 className="land-section-h2">Why decentralized storage?</h2>
        <div className="land-features-grid">
          {FEATURES.map((f) => (
            <div className="land-feature-card" key={f.title}>
              <div className="land-feature-icon">{f.icon}</div>
              <h3 className="land-feature-title">{f.title}</h3>
              <p className="land-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="land-section" id="how">
        <div className="land-section-tag">Process</div>
        <h2 className="land-section-h2">How it works</h2>
        <div className="land-steps">
          {HOW_IT_WORKS.map((s, i) => (
            <div className="land-step" key={s.step}>
              <div className="land-step-num">{s.step}</div>
              {i < HOW_IT_WORKS.length - 1 && <div className="land-step-line" />}
              <div className="land-step-body">
                <div className="land-step-title">{s.title}</div>
                <p className="land-step-desc">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="land-cta-banner">
        <h2>Try it right now — no wallet required</h2>
        <p>Use the built-in Demo Account to explore every feature on Sepolia testnet instantly.</p>
        <button className="land-btn-primary land-btn-large" onClick={() => navigate("/connect")}>
          Open the App
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="land-footer">
        <span className="grad-text" style={{ fontFamily:"Space Grotesk", fontWeight:700 }}>Decentralized Drive</span>
        <span className="land-footer-sub">Portfolio project · Ethereum Sepolia testnet · Not for production use</span>
      </footer>

    </div>
  );
};

export default Landing;
