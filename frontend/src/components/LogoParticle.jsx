// 👉 src/components/LogoParticle.jsx
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import tekklyLogo from '../images/tekkly.png';

export default function LogoParticle() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const size = 420;
        canvas.width = size;
        canvas.height = size;

        let animationFrameId;
        let animeInstance;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            if (!canvasRef.current) return;

            // ── 1. Draw the image filling the full canvas ──────────────────────
            // Keep aspect ratio: the logo is square-ish, draw it centered
            const padding = 20;
            const drawSize = size - padding * 2;
            ctx.drawImage(img, padding, padding, drawSize, drawSize);

            // ── 2. Sample pixel data ───────────────────────────────────────────
            const imageData = ctx.getImageData(0, 0, size, size);
            ctx.clearRect(0, 0, size, size);

            // ── 3. Build particle list, skip near-white background pixels ──────
            const particles = [];
            const step = 5; // pixel sampling stride — lower = more particles

            for (let y = 0; y < imageData.height; y += step) {
                for (let x = 0; x < imageData.width; x += step) {
                    const idx = (y * imageData.width + x) * 4;
                    const r = imageData.data[idx];
                    const g = imageData.data[idx + 1];
                    const b = imageData.data[idx + 2];
                    const a = imageData.data[idx + 3];

                    // Skip fully transparent pixels
                    if (a < 30) continue;

                    // Skip near-white background (all channels > 230)
                    if (r > 230 && g > 230 && b > 230) continue;

                    let particleColor = `rgb(${r},${g},${b})`;

                    // Transform very dark pixels (like the "KLY" text) into white
                    // so they are visible against the dark background.
                    if (r < 65 && g < 65 && b < 65) {
                        particleColor = 'rgb(255, 255, 255)';
                    }

                    particles.push({
                        x,
                        y,
                        // Preserve the real logo colour as a CSS hex string, or white if it was too dark
                        color: particleColor,
                        scale: 0.6 + Math.random() * 0.6,
                    });
                }
            }

            // ── 4. Render loop ─────────────────────────────────────────────────
            const render = () => {
                if (!canvasRef.current) return;
                ctx.clearRect(0, 0, size, size);

                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);

                    // Subtle glow matching particle colour
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = p.color;
                    ctx.fillStyle = p.color;
                    ctx.fill();
                });

                animationFrameId = requestAnimationFrame(render);
            };
            render();

            // ── 5. Pulse animation via anime.js ───────────────────────────────
            animeInstance = animate(particles, {
                scale: [
                    { to: 1.8, duration: 900 },
                    { to: 0.5, duration: 900 },
                ],
                delay: stagger(8, { from: 'center' }),
                loop: true,
                ease: 'easeInOutSine',
            });
        };

        img.src = tekklyLogo;

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (animeInstance) animeInstance.pause();
        };
    }, []);

    return (
        <div className="hero-logo-wrap">
            <canvas ref={canvasRef} id="logoCanvas" />
        </div>
    );
}
