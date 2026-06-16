import { useEffect } from "react";

/**
 * Mounts a <canvas id="bg-canvas"> into document.body and draws
 * a subtle, moving decentralized-network graph (nodes + edges).
 * Cleans up on unmount so React StrictMode doesn't double-mount it.
 */
const AnimatedBg = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let animId;
    let W, H;

    const NODE_COUNT = 55;
    const CONNECT_DIST = 160;
    const SPEED = 0.28;

    const nodes = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: 1.4 + Math.random() * 1.6,
        // each node is tinted blue or purple
        hue: Math.random() > 0.5 ? 200 : 250,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // subtle vignette overlay
      const vignette = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
      vignette.addColorStop(0, "rgba(2,5,16,0)");
      vignette.addColorStop(1, "rgba(2,5,16,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(210, 80%, 68%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 85%, 75%, 0.55)`;
        ctx.shadowColor = `hsla(${n.hue}, 90%, 70%, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
};

export default AnimatedBg;
