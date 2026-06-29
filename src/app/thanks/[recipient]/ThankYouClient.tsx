"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Cpu, Heart, Check } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

interface ThankYouNote {
  recipientName: string;
  roleTitle: string;
  letterTitle: string;
  message: string;
}

interface ThankYouClientProps {
  recipient: string;
  note: ThankYouNote;
}

export const ThankYouClient: React.FC<ThankYouClientProps> = ({ recipient, note }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const initialLogs = [
    `[INFO] Establishing encrypted link to node: '${recipient.toUpperCase()}_SECTOR'...`,
    `[SECURITY] Verifying signature matching key: SHA-256...`,
    `[INFO] Handshake verified. Channel state: SECURE/DECRYPTED.`,
    `[ACTION] Streaming message payload...`,
  ];

  // Print system logs on mount
  useEffect(() => {
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [recipient]);

  // Typing animation for the thank-you message
  useEffect(() => {
    // Wait for initial logs to finish printing before typing
    const logDelay = initialLogs.length * 150 + 200;
    let typingTimeoutId: NodeJS.Timeout;

    const startTyping = setTimeout(() => {
      let charIdx = 0;
      const textToType = note.message;

      const typeNextChar = () => {
        if (charIdx < textToType.length) {
          setDisplayedText(textToType.substring(0, charIdx + 1));
          charIdx++;
          // Faster typing speed for smoother reading
          const speed = textToType[charIdx - 1] === "." || textToType[charIdx - 1] === "," ? 120 : 25;
          typingTimeoutId = setTimeout(typeNextChar, speed);
        } else {
          setTypingComplete(true);
        }
      };

      typeNextChar();
    }, logDelay);

    return () => {
      clearTimeout(startTyping);
      clearTimeout(typingTimeoutId);
    };
  }, [note.message]);

  return (
    <div style={styles.container}>
      <MatrixBackground speedMultiplier={0.5} />
      <div className="cyber-grid" />

      <div style={styles.letterWrapper}>
        {/* Back Link */}
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>[ RETURN_TO_DASHBOARD ]</span>
        </Link>

        {/* Outer terminal screen frame */}
        <div className="cyber-panel" style={styles.monitorCard}>
          <div className="cyber-panel-header">
            <span>SECURE DECRYPTION LAYER // COMMS_{recipient.toUpperCase()}</span>
            <div className="cyber-panel-dots">
              <span className="cyber-panel-dot red" />
              <span className="cyber-panel-dot cyan" />
              <span className="cyber-panel-dot" />
            </div>
          </div>

          <div className="thanks-monitor-content">
            {/* Connection log metadata */}
            <div style={styles.logContainer}>
              {logs.map((log, index) => {
                if (!log) return null;
                return (
                  <div key={index} style={styles.logLine}>
                    {log}
                  </div>
                );
              })}
            </div>

            <div style={styles.divider} />

            {/* Letter Header */}
            <div style={styles.letterHeader}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span className="cyber-badge" style={{ color: "var(--cyber-cyan)", borderColor: "var(--cyber-cyan-dim)" }}>
                    {note.roleTitle}
                  </span>
                  <h1 className="thanks-recipient-name terminal-glow-green">
                    {note.recipientName}
                  </h1>
                </div>
                <div style={styles.encryptionBadge}>
                  <Cpu size={14} color="var(--matrix-green)" />
                  <span>DECRYPT LEVEL: CLEAR</span>
                </div>
              </div>
              <h3 className="thanks-letter-title terminal-glow-cyan">
                {note.letterTitle}
              </h3>
            </div>

            {/* Message contents */}
            <div style={styles.letterBody}>
              <p className="thanks-message-text">
                {displayedText}
                {!typingComplete && <span className="caret-blink" style={{ color: "var(--matrix-green)" }} />}
              </p>
            </div>

            {/* Verification Footer */}
            {typingComplete && (
              <div style={styles.signOff}>
                <div style={styles.signOffLine}>
                  <Check size={14} color="var(--matrix-green)" style={{ marginRight: "6px" }} />
                  <span>TRANSMITTED BY: Nam Lê</span>
                </div>
                <div style={{ ...styles.signOffLine, color: "var(--text-dim)" }}>
                  <span>HASH: SHA256:{Math.random().toString(36).substring(2, 10).toUpperCase()} // COMPLETED</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action button */}
        <div style={styles.footerActions}>
          <Link href="/" className="cyber-button cyan" style={styles.actionBtn}>
            <Heart size={16} color="var(--alert-red)" style={{ marginRight: "8px", fill: "var(--alert-red)" }} />
            COMPLETED READ PROTOCOL
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "var(--bg-primary)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
  },
  letterWrapper: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    position: "relative",
    zIndex: 2,
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "var(--text-secondary)",
    fontSize: "0.8rem",
    fontFamily: "var(--font-mono), monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
    width: "fit-content",
    transition: "color 0.2s ease",
  },
  monitorCard: {
    width: "100%",
    background: "var(--bg-secondary)",
  },
  monitorContent: {
    padding: "24px",
  },
  logContainer: {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.75rem",
    color: "var(--text-dim)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    lineHeight: "1.4",
  },
  logLine: {
    wordBreak: "break-all",
  },
  divider: {
    height: "1px",
    background: "rgba(0, 255, 102, 0.1)",
    margin: "18px 0",
  },
  letterHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  recipientName: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "var(--matrix-green)",
    letterSpacing: "1px",
    marginTop: "6px",
  },
  encryptionBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.65rem",
    color: "var(--matrix-green)",
    fontFamily: "var(--font-mono), monospace",
    border: "1px solid var(--matrix-green-dim)",
    padding: "4px 8px",
    borderRadius: "2px",
  },
  letterTitle: {
    fontSize: "1.05rem",
    color: "var(--cyber-cyan)",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
  letterBody: {
    minHeight: "180px",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "16px",
    borderRadius: "var(--border-radius)",
    border: "1px solid rgba(0, 255, 102, 0.05)",
  },
  messageText: {
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
  },
  signOff: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
  },
  signOffLine: {
    display: "flex",
    alignItems: "center",
  },
  footerActions: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 30px",
    fontSize: "0.85rem",
    width: "100%",
    maxWidth: "350px",
  },
};
