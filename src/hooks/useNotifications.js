import { useState, useCallback } from "react";

// Toast notification hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

// Confetti animation hook
export const useConfetti = () => {
  const triggerConfetti = useCallback(() => {
    if (typeof window === "undefined") return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 50;
    const colors = ["#C2552A", "#E8A0BF", "#6B9AC4", "#7B3D8C", "#F0EDE8"];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c) => {
        c.y += c.speedY;
        c.x += c.speedX;
        c.speedY += 0.1; // gravity
        c.rotation += c.rotationSpeed;
        c.opacity -= 0.01;

        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });

      if (confetti.some((c) => c.opacity > 0)) {
        animationId = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();
  }, []);

  return { triggerConfetti };
};
