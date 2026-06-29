"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, ShieldAlert, Cpu, Lock, Unlock, ShieldCheck } from "lucide-react";

interface TerminalGateProps {
  onAccessGranted: () => void;
  graduateName: string;
}

export const TerminalGate: React.FC<TerminalGateProps> = ({
  onAccessGranted,
  graduateName,
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<"idle" | "decrypting" | "granted">("idle");
  const [progress, setProgress] = useState(0);
  const [scrambledName, setScrambledName] = useState("");
  const logEndRef = useRef<HTMLDivElement>(null);
  const decryptIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initialLogs = [
    "[INFO] Initializing connection to VNU-UET security mainframe...",
    "[INFO] Establishing secure SSH tunnel to port 8080...",
    "[INFO] Connection successful. Host address resolved to 144.110.15.5.",
    `[SECURITY] File detected: '${graduateName.toUpperCase().replace(/ /g, "_")}_GRADUATION_INVITATION.dossier'`,
    "[SECURITY] Payload size: 4096 KB (AES-256 encrypted)",
    "[WARNING] ACCESS RESTRICTED: Authorization credentials or manual bypass required.",
  ];

  // Scramble text effect for graduate's name
  useEffect(() => {
    if (currentStep === "granted") {
      setScrambledName(graduateName);
      return;
    }

    const chars = "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./";
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledName(
        graduateName
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return graduateName[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= graduateName.length) {
        clearInterval(interval);
      }
      iterations += 0.3;
    }, 40);

    return () => clearInterval(interval);
  }, [graduateName, currentStep]);

  // Terminal printout effect on load
  useEffect(() => {
    if (currentStep !== "idle") return;

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Auto scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Clean up decrypt interval on unmount
  useEffect(() => {
    return () => {
      if (decryptIntervalRef.current) {
        clearInterval(decryptIntervalRef.current);
      }
    };
  }, []);

  // Decryption workflow
  const handleBypass = () => {
    if (currentStep !== "idle") return;
    setCurrentStep("decrypting");

    const decryptLogs = [
      "[ACTION] Launching brute-force bypass sequence...",
      "[SYSTEM] Running prime factorization keyspace search...",
      "[SYSTEM] Injecting vulnerability vector into firewall... [OK]",
      "[SECURITY] Intruders counter-measures bypassed.",
      "[SYSTEM] Crunching hashes: SHA-256 check... OK",
      "[SUCCESS] Decryption key found: UET_VNU_COMPUTER_ENGINEERING_2026",
      "[SUCCESS] Digital signature verified. Opening payload...",
      "[SYSTEM] Access granted. Redirecting to dashboard...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < decryptLogs.length) {
        setLogs((prev) => [...prev, decryptLogs[step]]);
        setProgress((prev) => Math.min(prev + 13, 100));
        step++;
      } else {
        clearInterval(interval);
        setProgress(100);
        setCurrentStep("granted");
        setTimeout(() => {
          onAccessGranted();
        }, 800);
      }
    }, 400);
    decryptIntervalRef.current = interval;
  };

  return (
    <div style={styles.container}>
      <div className="cyber-grid" />
      
      <div style={styles.gateWrapper}>
        {/* Terminal Header Info */}
        <div style={styles.statusHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Cpu size={16} className="terminal-glow-green" />
            <span style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
              SECURE ACCESS PORTAL v2.26
            </span>
          </div>
          <span style={styles.statusText}>
            STATUS: <span style={{ color: currentStep === "granted" ? "var(--cyber-cyan)" : "var(--alert-red)", animation: "blink 1s step-end infinite" }}>
              {currentStep === "idle" && "LOCKED"}
              {currentStep === "decrypting" && "DECRYPTING..."}
              {currentStep === "granted" && "GRANTED"}
            </span>
          </span>
        </div>

        {/* Scrambled Name Banner */}
        <div style={styles.titleSection}>
          <h2 className="gate-title glitch terminal-glow-green" data-text={scrambledName}>
            {scrambledName}
          </h2>
          <p className="gate-subtitle">
            GRADUATION DOSSIER ACCESS HANDLER
          </p>
        </div>

        {/* Live Terminal Log Viewer */}
        <div className="cyber-panel gate-terminal-box">
          <div className="cyber-panel-header">
            <span>TERMINAL MONITOR</span>
            <div className="cyber-panel-dots">
              <span className="cyber-panel-dot red" />
              <span className="cyber-panel-dot cyan" />
              <span className="cyber-panel-dot" />
            </div>
          </div>
          <div style={styles.terminalContent}>
            {logs.map((log, index) => {
              if (!log) return null;
              const isWarning = log.includes("[WARNING]");
              const isSuccess = log.includes("[SUCCESS]");
              const isAction = log.includes("[ACTION]");
              let color = "var(--text-secondary)";
              if (isWarning) color = "var(--alert-red)";
              if (isSuccess) color = "var(--cyber-cyan)";
              if (isAction) color = "#ffea00";

              return (
                <div key={index} style={{ ...styles.logLine, color }}>
                  {log}
                </div>
              );
            })}
            {currentStep === "idle" && (
              <div style={styles.cursorLine}>
                <span style={{ color: "var(--matrix-green)" }}>guest@uet-vnu:~$</span>
                <span style={styles.waitingAction} onClick={handleBypass}>
                  _ waiting for decrypt command...
                </span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Decryption Control */}
        <div style={styles.controls}>
          {currentStep === "idle" ? (
            <button 
              className="cyber-button gate-decrypt-btn"
              onClick={handleBypass} 
            >
              <Lock size={18} style={{ marginRight: "8px" }} />
              BYPASS FIREWALL & DECRYPT INVITE
            </button>
          ) : (
            <div style={styles.progressContainer}>
              <div style={styles.progressHeader}>
                <span>DECRYPTING PAYLOAD D-2026: {progress}%</span>
                {currentStep === "granted" ? <ShieldCheck size={18} color="var(--cyber-cyan)" /> : <ShieldAlert size={18} color="var(--matrix-green)" />}
              </div>
              <div style={styles.progressBarBg}>
                <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "var(--bg-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    padding: "20px",
  },
  gateWrapper: {
    width: "100%",
    maxWidth: "750px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
    zIndex: 2,
  },
  statusHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "var(--text-secondary)",
    borderBottom: "1px solid var(--text-dim)",
    paddingBottom: "8px",
  },
  statusText: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    letterSpacing: "1.5px",
  },
  titleSection: {
    textAlign: "center",
  },
  scrambledName: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "var(--matrix-green)",
    letterSpacing: "4px",
    marginBottom: "8px",
    height: "3.5rem",
  },
  subtitle: {
    fontSize: "0.8rem",
    color: "var(--cyber-cyan)",
    letterSpacing: "3px",
  },
  terminalBox: {
    height: "260px",
    display: "flex",
    flexDirection: "column",
  },
  terminalContent: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.85rem",
    lineHeight: "1.6",
  },
  logLine: {
    marginBottom: "6px",
    wordBreak: "break-all",
  },
  cursorLine: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  waitingAction: {
    color: "var(--matrix-green)",
    cursor: "pointer",
    animation: "blink 1.5s infinite",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
  },
  decryptBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.95rem",
    padding: "14px 28px",
    width: "100%",
    maxWidth: "450px",
  },
  progressContainer: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.8rem",
    color: "var(--matrix-green)",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarBg: {
    width: "100%",
    height: "10px",
    backgroundColor: "var(--bg-tertiary)",
    border: "1px solid var(--matrix-green-dim)",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "var(--matrix-green)",
    boxShadow: "0 0 8px var(--matrix-green-glow-strong)",
    transition: "width 0.3s ease",
  },
};
