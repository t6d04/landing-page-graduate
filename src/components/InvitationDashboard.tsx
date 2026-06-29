"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, Calendar, Shield, Share2, Compass, Heart, Users, GraduationCap, Copy, Check } from "lucide-react";
import { GraduationData } from "@/config/graduationData";

interface InvitationDashboardProps {
  data: GraduationData;
}

export const InvitationDashboard: React.FC<InvitationDashboardProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    expired: false,
  });
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Prevent hydration mismatch for timer
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Target Date: 2026-07-05T08:00:00
    const targetDate = new Date("2026-07-05T08:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown((prev) => ({ ...prev, expired: true }));
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
        expired: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.graduateName} | Lễ tốt nghiệp UET`,
        text: `Tham dự lễ tốt nghiệp của ${data.graduateName} vào ngày ${data.ceremonyDate}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết lời mời vào bộ nhớ tạm!");
    }
  };

  const handleCopyPhone = () => {
    if (!data.phone) return;
    navigator.clipboard.writeText(data.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="dashboard-grid">
      {/* COLUMN 1: Profile */}
      <div style={styles.column}>
        {/* PROFILE CARD */}
        <div className="cyber-panel" style={styles.card}>
          <div className="cyber-panel-header">
            <span>GRADUATE NODE PROFILE // VERIFIED</span>
            <div className="cyber-panel-dots">
              <span className="cyber-panel-dot cyan" />
              <span className="cyber-panel-dot" />
            </div>
          </div>
          <div style={styles.profileBody}>
            <div style={styles.profileMeta}>
              <div style={styles.avatarPlaceholder}>
                <GraduationCap size={44} color="var(--matrix-green)" />
                <div style={styles.avatarPulse} />
              </div>
              <div>
                <h3 className="profile-name terminal-glow-green">{data.graduateName}</h3>
                <span className="cyber-badge" style={{ marginRight: "6px" }}>CLASS_OF_2026</span>
                <span className="cyber-badge cyan">SYSTEM_ACTIVE</span>
              </div>
            </div>

            <div style={styles.infoDivider} />

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>TRƯỜNG</span>
                <span style={styles.detailVal}>{data.university}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>NGÀNH</span>
                <span style={styles.detailVal} className="glow-text-cyan">{data.major}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>COMPLETION INDEX</span>
                <span style={{ ...styles.detailVal, color: "var(--matrix-green)", fontWeight: "bold" }}>
                  100% - DEGREE GRANTED
                </span>
              </div>
              {data.phone && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>SĐT</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={styles.detailVal}>{data.phone}</span>
                    <button
                      onClick={handleCopyPhone}
                      title="Sao chép SĐT"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: copiedPhone ? "var(--matrix-green)" : "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        padding: "2px",
                        borderRadius: "2px",
                        transition: "color 0.2s ease"
                      }}
                    >
                      {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    {copiedPhone && (
                      <span style={{ fontSize: "0.65rem", color: "var(--matrix-green)", fontFamily: "var(--font-mono), monospace" }}>
                        [COPIED]
                      </span>
                    )}
                  </div>
                </div>
              )}
              {data.facebook && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>FACEBOOK</span>
                  <span style={styles.detailVal}>
                    <a
                      href={`https://${data.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-text-cyan"
                      style={{ textDecoration: "underline" }}
                    >
                      {data.facebook}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Details */}
      <div style={styles.column}>
        {/* CEREMONY SCHEDULE CARD */}
        <div className="cyber-panel" style={styles.card}>
          <div className="cyber-panel-header">
            <span>EXECUTION SCHEDULE // EVENT_INFOS</span>
            <div className="cyber-panel-dots">
              <span className="cyber-panel-dot red" />
              <span className="cyber-panel-dot" />
            </div>
          </div>
          <div style={styles.scheduleBody}>
            {/* COUNTDOWN */}
            <div style={styles.timerWrapper}>
              <span style={styles.timerLabel}>T-MINUS EVENT EXECUTION</span>
              {mounted ? (
                countdown.expired ? (
                  <div style={styles.timerExpired} className="terminal-glow-green">
                    [SYSTEM_RUNNING] CEREMONY IN PROGRESS / COMPLETED
                  </div>
                ) : (
                  <div className="timer-grid">
                    <div className="timer-box">
                      <span className="timer-num">{countdown.days}</span>
                      <span style={styles.timerUnit}>DAYS</span>
                    </div>
                    <span className="timer-colon">:</span>
                    <div className="timer-box">
                      <span className="timer-num">{countdown.hours}</span>
                      <span style={styles.timerUnit}>HRS</span>
                    </div>
                    <span className="timer-colon">:</span>
                    <div className="timer-box">
                      <span className="timer-num">{countdown.minutes}</span>
                      <span style={styles.timerUnit}>MINS</span>
                    </div>
                    <span className="timer-colon">:</span>
                    <div className="timer-box">
                      <span className="timer-num">{countdown.seconds}</span>
                      <span style={styles.timerUnit}>SECS</span>
                    </div>
                  </div>
                )
              ) : (
                <div style={styles.timerSkeleton}>LOAD_TIME_CLOCK...</div>
              )}
            </div>

            <div style={styles.infoDivider} />

            {/* CEREMONY DETAILS */}
            <div style={styles.scheduleItem}>
              <Calendar size={18} color="var(--matrix-green)" />
              <div>
                <span style={styles.scheduleLabel}>DATE (NGÀY)</span>
                <p style={styles.scheduleVal}>{data.ceremonyDate}</p>
              </div>
            </div>

            <div style={styles.scheduleItem}>
              <Clock size={18} color="var(--matrix-green)" />
              <div>
                <span style={styles.scheduleLabel}>EXECUTION WINDOW (GIỜ)</span>
                <p style={styles.scheduleVal}>{data.ceremonyTime}</p>
              </div>
            </div>

            <div style={styles.scheduleItem}>
              <MapPin size={18} color="var(--matrix-green)" />
              <div>
                <span style={styles.scheduleLabel}>LOCATION (ĐỊA ĐIỂM)</span>
                <p style={styles.scheduleVal}>{data.location}</p>
                <span style={styles.addressText}>{data.locationAddress}</span>
              </div>
            </div>

            <div style={styles.mapMeta}>
              <Compass size={14} style={{ marginRight: "6px" }} />
              <span>COORDS: {data.locationCoords.lat}° N, {data.locationCoords.lng}° E</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location + " " + data.locationAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button cyan"
                style={styles.mapBtn}
              >
                OPEN MAP LINK
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1100px",
    position: "relative",
    zIndex: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  profileBody: {
    padding: "24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  profileMeta: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: "70px",
    height: "70px",
    borderRadius: "var(--border-radius)",
    border: "2px solid var(--matrix-green-dim)",
    background: "var(--bg-tertiary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarPulse: {
    position: "absolute",
    top: "-4px",
    left: "-4px",
    right: "-4px",
    bottom: "-4px",
    border: "1px solid var(--matrix-green)",
    borderRadius: "var(--border-radius)",
    opacity: 0.4,
    animation: "blink 2s infinite ease-in-out",
  },
  name: {
    fontSize: "1.45rem",
    fontWeight: "bold",
    color: "var(--matrix-green)",
    marginBottom: "6px",
    letterSpacing: "1px",
  },
  infoDivider: {
    height: "1px",
    background: "rgba(0, 255, 102, 0.1)",
    margin: "20px 0",
  },
  detailsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  detailLabel: {
    fontSize: "0.65rem",
    color: "var(--text-dim)",
    letterSpacing: "1.5px",
    fontWeight: "bold",
  },
  detailVal: {
    fontSize: "0.85rem",
    color: "var(--text-primary)",
    lineHeight: "1.4",
  },
  scheduleBody: {
    padding: "24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  timerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    background: "rgba(0, 0, 0, 0.25)",
    padding: "16px",
    borderRadius: "var(--border-radius)",
    border: "1px solid var(--text-dim)",
  },
  timerLabel: {
    fontSize: "0.7rem",
    letterSpacing: "2px",
    color: "var(--text-secondary)",
    fontWeight: "bold",
  },
  timerSkeleton: {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "1.2rem",
    color: "var(--matrix-green-dim)",
    padding: "8px",
    animation: "blink 1.5s infinite",
  },
  timerExpired: {
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "var(--matrix-green)",
    letterSpacing: "1px",
    textAlign: "center",
    padding: "6px",
  },
  timerGrid: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "var(--matrix-green)",
  },
  timerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "44px",
  },
  timerNum: {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "1.75rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    textShadow: "0 0 8px var(--matrix-green-glow-strong)",
  },
  timerUnit: {
    fontSize: "0.55rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
    marginTop: "2px",
  },
  timerColon: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: "4px",
    animation: "blink 1s step-end infinite",
  },
  scheduleItem: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  scheduleLabel: {
    fontSize: "0.65rem",
    color: "var(--text-dim)",
    letterSpacing: "1px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "2px",
  },
  scheduleVal: {
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    fontWeight: "bold",
  },
  addressText: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    display: "block",
    marginTop: "2px",
  },
  mapMeta: {
    marginTop: "20px",
    borderTop: "1px dashed var(--text-dim)",
    paddingTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "0.7rem",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-mono), monospace",
  },
  mapBtn: {
    padding: "6px 12px",
    fontSize: "0.65rem",
  },
  portalBody: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  portalDesc: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  },
  portalsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  portalLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    border: "1px solid var(--text-dim)",
    borderRadius: "var(--border-radius)",
    background: "var(--bg-tertiary)",
    transition: "all 0.2s ease-in-out",
  },
  portalLinkContent: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  portalLinkTexts: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  portalRole: {
    fontSize: "0.65rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "var(--text-primary)",
  },
  portalTitle: {
    fontSize: "0.7rem",
    color: "var(--text-secondary)",
  },
  portalAccessText: {
    fontSize: "0.7rem",
    color: "var(--matrix-green)",
    fontFamily: "var(--font-mono), monospace",
    letterSpacing: "1px",
    transition: "all 0.2s ease",
  },
  shareBtn: {
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    fontSize: "0.8rem",
  },
};
