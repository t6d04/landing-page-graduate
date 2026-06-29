"use client";

import React, { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  speedMultiplier?: number;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -100); // Random offset start

    // Engineering/Code character set
    const chars = "01010101010101010101{}[]();:<>+-*/&|^~%!_".split("");

    let lastTime = 0;
    const fps = 24; // Lower fps for terminal vibe and battery efficiency
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      // Fading background for trails
      ctx.fillStyle = "rgba(5, 7, 6, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = yPositions[i] * fontSize;

        // Make some characters Cyan to add depth
        const isCyan = Math.random() > 0.93;
        const isBright = Math.random() > 0.95;

        if (isCyan) {
          ctx.fillStyle = isBright ? "#e0faff" : "#00f0ff";
        } else {
          ctx.fillStyle = isBright ? "#e6f9f0" : "#00ff66";
        }

        ctx.fillText(char, x, y);

        // Reset drop position if it goes off screen
        if (y > height && Math.random() > 0.975) {
          yPositions[i] = 0;
        }

        // Drop movement speed
        yPositions[i] += 1 * speedMultiplier;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.18,
      }}
    />
  );
};

export default MatrixBackground;
