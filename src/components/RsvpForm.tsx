"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, ShieldCheck, Wifi, RefreshCw } from "lucide-react";

interface RsvpFormProps {
  rsvpDeadline: string;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ rsvpDeadline }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "ACTIVE_NODE", // ACTIVE_NODE = Attending, OFFLINE_NODE = Declining
    message: "",
  });

  const [step, setStep] = useState<"idle" | "transmitting" | "success">("idle");
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transmissionLogs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStep("transmitting");
    setTransmissionLogs([]);
    setProgress(0);

    const logs = [
      `[PACKET] Generating payload for host: '${formData.name.toUpperCase().replace(/ /g, "_")}'`,
      `[SECURITY] Encrypting response with host RSA-2048 public key...`,
      `[SECURITY] Handshake: Generating session key (AES-256-GCM)... [OK]`,
      `[PACKET] Computed MD5 Checksum: ${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
      `[TRANSMIT] Dispatching packets via local gateway...`,
      `[ROUTE] Hop 1: Guest_Terminal -> local_isp [Rtt: 12ms]`,
      `[ROUTE] Hop 2: local_isp -> vnu_gateway (203.113.137.1) [Rtt: 24ms]`,
      `[ROUTE] Hop 3: vnu_gateway -> uet_main_host [Rtt: 5ms]`,
      `[TRANSMIT] Data sent. Waiting for host ACK (Acknowledge)...`,
      `[SUCCESS] ACK received. Node RSVP register updated. [Code: 200 OK]`,
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setTransmissionLogs((prev) => [...prev, logs[currentLog]]);
        setProgress((prev) => Math.min(prev + 10, 100));
        currentLog++;
      } else {
        clearInterval(interval);
        setProgress(100);
        setStep("success");
      }
    }, 300);
  };

  const handleReset = () => {
    setFormData({ name: "", status: "ACTIVE_NODE", message: "" });
    setStep("idle");
    setTransmissionLogs([]);
    setProgress(0);
  };

  return (
    <div className="cyber-panel" style={styles.container}>
      <div className="cyber-panel-header">
        <span>RSVP TRANSMITTER</span>
        <div className="cyber-panel-dots">
          <span className="cyber-panel-dot red" />
          <span className="cyber-panel-dot cyan" />
          <span className="cyber-panel-dot" />
        </div>
      </div>

      {step === "idle" && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              GUEST IDENTITY (HỌ & TÊN KHÁCH MỜI) <span style={{ color: "var(--matrix-green)" }}>*</span>
            </label>
            <input
              type="text"
              required
              className="cyber-input"
              placeholder="Nhập tên của bạn..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>CONNECTION STATUS (XÁC NHẬN THAM DỰ)</label>
            <div style={styles.radioGroup}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "ACTIVE_NODE" })}
                style={{
                  ...styles.radioButton,
                  borderColor: formData.status === "ACTIVE_NODE" ? "var(--matrix-green)" : "var(--text-dim)",
                  color: formData.status === "ACTIVE_NODE" ? "var(--matrix-green)" : "var(--text-secondary)",
                  backgroundColor: formData.status === "ACTIVE_NODE" ? "rgba(0, 255, 102, 0.05)" : "transparent",
                  boxShadow: formData.status === "ACTIVE_NODE" ? "0 0 8px var(--matrix-green-glow)" : "none",
                }}
              >
                <div style={{ ...styles.radioDot, backgroundColor: formData.status === "ACTIVE_NODE" ? "var(--matrix-green)" : "transparent" }} />
                ACTIVE_NODE (Sẽ Tham Dự)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "OFFLINE_NODE" })}
                style={{
                  ...styles.radioButton,
                  borderColor: formData.status === "OFFLINE_NODE" ? "var(--alert-red)" : "var(--text-dim)",
                  color: formData.status === "OFFLINE_NODE" ? "var(--alert-red)" : "var(--text-secondary)",
                  backgroundColor: formData.status === "OFFLINE_NODE" ? "rgba(255, 59, 48, 0.05)" : "transparent",
                  boxShadow: formData.status === "OFFLINE_NODE" ? "0 0 8px var(--alert-red-glow)" : "none",
                }}
              >
                <div style={{ ...styles.radioDot, backgroundColor: formData.status === "OFFLINE_NODE" ? "var(--alert-red)" : "transparent", borderColor: formData.status === "OFFLINE_NODE" ? "var(--alert-red)" : "var(--text-dim)" }} />
                OFFLINE_NODE (Bận Việc)
              </button>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ENCRYPTED WISHES / NOTES (LỜI CHÚC / LƯU Ý)</label>
            <textarea
              className="cyber-input"
              rows={3}
              placeholder="Gửi lời chúc hoặc lời nhắn cho Nam tại đây..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ resize: "none" }}
            />
          </div>

          <button type="submit" className="cyber-button" style={styles.submitBtn}>
            <Send size={16} style={{ marginRight: "8px" }} />
            TRANSMIT SECURE PACKET
          </button>
        </form>
      )}

      {step === "transmitting" && (
        <div style={styles.transmittingBox}>
          <div style={styles.terminalHeader}>
            <RefreshCw className="terminal-glow-green" style={{ animation: "spin 1.5s linear infinite" }} size={20} />
            <span style={{ letterSpacing: "1px" }}>TRANSMITTING PACKETS...</span>
          </div>

          <div style={styles.terminalLogs}>
            {transmissionLogs.map((log, index) => (
              <div key={index} style={styles.logLine}>
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <div style={styles.progressContainer}>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
            </div>
            <div style={styles.progressFooter}>
              <span>ENCRYPTED BANDWIDTH</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div style={styles.successBox}>
          <CheckCircle size={48} color="var(--cyber-cyan)" style={{ marginBottom: "16px", filter: "drop-shadow(0 0 8px var(--cyber-cyan))" }} />
          <h4 style={styles.successTitle} className="terminal-glow-cyan">TRANSMISSION COMPLETED!</h4>
          <p style={styles.successText}>
            Dữ liệu xác nhận tham dự của bạn đã được mã hóa và truyền tải thành công vào cơ sở dữ liệu của Nam Lê.
          </p>

          <div style={styles.receipt}>
            <div style={styles.receiptLine}><strong>SENDER:</strong> {formData.name}</div>
            <div style={styles.receiptLine}><strong>NODE_STATUS:</strong> {formData.status === "ACTIVE_NODE" ? "ONLINE / ATTENDING" : "OFFLINE / NOT ATTENDING"}</div>
            <div style={styles.receiptLine}><strong>HASH:</strong> SHA256:{Math.random().toString(36).substring(2, 15).toUpperCase()}</div>
            <div style={styles.receiptLine}><strong>TIMESTAMP:</strong> {new Date().toLocaleString()}</div>
          </div>

          <button className="cyber-button cyan" onClick={handleReset} style={styles.resetBtn}>
            <ShieldCheck size={16} style={{ marginRight: "8px" }} />
            SEND NEW PACKET
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    background: "var(--bg-secondary)",
  },
  form: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    color: "var(--text-secondary)",
  },
  radioGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  radioButton: {
    flex: 1,
    minWidth: "160px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    border: "1px solid",
    borderRadius: "var(--border-radius)",
    background: "transparent",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  radioDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "1px solid var(--matrix-green)",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "12px",
    marginTop: "10px",
  },
  transmittingBox: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  terminalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "var(--matrix-green)",
    letterSpacing: "2px",
  },
  terminalLogs: {
    height: "150px",
    background: "var(--bg-primary)",
    border: "1px solid var(--text-dim)",
    borderRadius: "var(--border-radius)",
    padding: "12px",
    overflowY: "auto",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  logLine: {
    marginBottom: "4px",
    wordBreak: "break-all",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  progressBarBg: {
    width: "100%",
    height: "8px",
    backgroundColor: "var(--bg-tertiary)",
    border: "1px solid var(--matrix-green-dim)",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "var(--matrix-green)",
    boxShadow: "0 0 6px var(--matrix-green-glow-strong)",
    transition: "width 0.2s ease",
  },
  progressFooter: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.65rem",
    color: "var(--text-secondary)",
    letterSpacing: "1px",
  },
  successBox: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  successTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "var(--cyber-cyan)",
    letterSpacing: "2px",
    marginBottom: "8px",
  },
  successText: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
    marginBottom: "16px",
    maxWidth: "400px",
  },
  receipt: {
    width: "100%",
    background: "var(--bg-primary)",
    border: "1px dashed var(--cyber-cyan-dim)",
    padding: "16px",
    borderRadius: "var(--border-radius)",
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.75rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    color: "var(--text-secondary)",
    marginBottom: "20px",
  },
  receiptLine: {
    borderBottom: "1px solid rgba(0, 240, 255, 0.05)",
    paddingBottom: "4px",
  },
  resetBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    fontSize: "0.8rem",
  },
};
