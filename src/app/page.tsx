"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, ShieldAlert, Cpu } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import { TerminalGate } from "@/components/TerminalGate";
import { InvitationDashboard } from "@/components/InvitationDashboard";
import { graduationData } from "@/config/graduationData";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session authorization state
  useEffect(() => {
    const bypassState = sessionStorage.getItem("invite_bypass");
    if (bypassState === "true") {
      setIsAuthorized(true);
    }
    setLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setIsAuthorized(true);
    sessionStorage.setItem("invite_bypass", "true");
  };

  const handleLockSystem = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("invite_bypass");
  };

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div className="cyber-grid" />
        <div style={styles.loaderSpinner}>
          <Cpu className="terminal-glow-green" size={32} style={{ animation: "spin 2s linear infinite" }} />
          <span style={styles.loaderText}>SECURE_BOOT_SEQUENCE...</span>
        </div>
      </div>
    );
  }

  return (
    <main style={styles.mainContainer}>
      <MatrixBackground speedMultiplier={1} />
      <div className="cyber-grid" />

      {!isAuthorized ? (
        <TerminalGate
          onAccessGranted={handleAccessGranted}
          graduateName={graduationData.graduateName}
        />
      ) : (
        <div className="dashboard-wrapper">
          {/* Dashboard Sticky Header */}
          <header style={styles.header}>
            <div style={styles.headerTitle}>
              <Unlock size={16} color="var(--cyber-cyan)" style={{ filter: "drop-shadow(0 0 4px var(--cyber-cyan))" }} />
              <span className="glow-text-cyan" style={{ fontSize: "0.85rem", letterSpacing: "1px", fontWeight: "bold" }}>
                DECRYPTED_NODE // K67E-CE1
              </span>
            </div>

            <button className="cyber-button cyan" onClick={handleLockSystem} style={styles.lockBtn}>
              <Lock size={12} style={{ marginRight: "6px" }} />
              LOCK_SYSTEM
            </button>
          </header>

          {/* Title Banner */}
          <div style={styles.banner}>
            <span style={styles.bannerSub}>GRADUATION CEREMONY INVITATION</span>
            <h1 className="banner-title terminal-glow-green">LỄ TỐT NGHIỆP</h1>
            <p style={styles.bannerMajor}>KỸ SƯ NGÀNH KỸ THUẬT MÁY TÍNH // KHÓA QH-2022-I/CQ</p>
          </div>

          {/* Dashboard Grid */}
          <InvitationDashboard data={graduationData} />

          {/* Dashboard Footer */}
          <footer style={styles.footer}>
            <div style={styles.footerLine}>
              <ShieldAlert size={12} color="var(--text-dim)" style={{ marginRight: "6px" }} />
              <span>SECURITY PROTOCOL: SHA-256 // ENCRYPTED HANDSHAKE</span>
            </div>
            <div style={styles.footerLine}>
              <span>© {new Date().getFullYear()} Nam Lê. UET-VNU Computer Engineering.</span>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  loaderContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "var(--bg-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "var(--font-mono), monospace",
  },
  loaderSpinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    zIndex: 2,
  },
  loaderText: {
    fontSize: "0.8rem",
    color: "var(--matrix-green)",
    letterSpacing: "2px",
    animation: "blink 1s step-end infinite",
  },
  mainContainer: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "var(--bg-primary)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  dashboardWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 24px 40px 24px",
    zIndex: 2,
    width: "100%",
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "56px",
    backgroundColor: "rgba(5, 7, 6, 0.85)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid var(--text-dim)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    zIndex: 10,
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  lockBtn: {
    padding: "6px 12px",
    fontSize: "0.65rem",
  },
  banner: {
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "20px",
    width: "100%",
    maxWidth: "800px",
  },
  bannerSub: {
    fontSize: "0.75rem",
    color: "var(--cyber-cyan)",
    letterSpacing: "4px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
  },
  bannerTitle: {
    fontSize: "2.4rem",
    fontWeight: "900",
    color: "var(--matrix-green)",
    letterSpacing: "2px",
    marginBottom: "12px",
  },
  bannerMajor: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    letterSpacing: "1.5px",
  },
  footer: {
    marginTop: "60px",
    borderTop: "1px solid rgba(0, 255, 102, 0.1)",
    paddingTop: "24px",
    width: "100%",
    maxWidth: "1100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    color: "var(--text-dim)",
    fontSize: "0.7rem",
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  footerLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
