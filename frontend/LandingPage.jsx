/**
 * Tekkly Landing Page
 * Deps: npm i animejs lucide-react
 */
import { useState, useEffect, useRef } from 'react'
import { createTimeline, stagger, animate } from 'animejs'
import {
  Zap, Mic, BarChart3, Link2, Bot, Code2,
  Target, Clock, ShieldCheck, TrendingUp,
  Search, PenTool, Rocket, Activity,
  Database, Mail, MessageSquare, GitBranch,
  ArrowRight, CheckCircle2, Cpu, Webhook,
  ChevronRight,
} from 'lucide-react'
import LogoParticle from './src/components/LogoParticle';

/* ═══════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #080810;
    --surface:  #0F0F1E;
    --card:     #131326;
    --purple:   #7C3AED;
    --purple-lt:#A78BFA;
    --cyan:     #06B6D4;
    --green:    #22c55e;
    --text:     #FFFFFF;
    --muted:    #94A3B8;
    --border:   rgba(255,255,255,0.07);
    --border-p: rgba(124,58,237,0.28);
  }



  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* ── keyframes ── */
  @keyframes floatA {
    0%,100% { transform:translate(0,0)     scale(1); }
    50%     { transform:translate(30px,-40px) scale(1.08); }
  }
  @keyframes floatB {
    0%,100% { transform:translate(0,0)     scale(1); }
    50%     { transform:translate(-25px,30px) scale(1.05); }
  }
  @keyframes gradientShift {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
  @keyframes pulseRing {
    0%   { box-shadow:0 0 0 0   rgba(124,58,237,.5); }
    70%  { box-shadow:0 0 0 12px rgba(124,58,237,0); }
    100% { box-shadow:0 0 0 0   rgba(124,58,237,0); }
  }
  @keyframes lineGrow {
    from { transform:scaleY(0); }
    to   { transform:scaleY(1); }
  }
  @keyframes dotTravel {
    0%   { top:-6px;  opacity:0; }
    8%   { opacity:1; }
    92%  { opacity:1; }
    100% { top:100%; opacity:0; }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%     { opacity:.25; }
  }
  @keyframes nodePulse {
    0%,100% { box-shadow:0 0 0 0  rgba(124,58,237,.4); }
    50%     { box-shadow:0 0 0 8px rgba(124,58,237,0); }
  }
  @keyframes flowIn {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scanLine {
    0%   { top:0; }
    100% { top:100%; }
  }

  /* ── scroll reveal ── */
  .reveal       { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal-left  { opacity:0; transform:translateX(-32px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal-right { opacity:0; transform:translateX(32px);  transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity:1; transform:none; }
  .reveal-scale { opacity:0; transform:scale(.96); transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
  .reveal-scale.visible { opacity:1; transform:scale(1); }

  /* ── gradient text ── */
  .g-text {
    background:linear-gradient(135deg,var(--purple-lt) 0%,var(--cyan) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:gradientShift 4s linear infinite;
  }

  /* ══════ NAV ══════ */
  .nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    padding:1rem 2.5rem;
    display:flex; align-items:center; justify-content:space-between;
    transition:background .3s, border-bottom .3s;
  }
  .nav.scrolled {
    background:rgba(8,8,16,.9);
    backdrop-filter:blur(20px);
    border-bottom:.5px solid var(--border);
  }
  .nav-logo-wrap { display:flex; align-items:center; gap:.6rem; text-decoration:none; }
  .nav-logo-text { font-size:1.25rem; font-weight:800; letter-spacing:-.04em; color:var(--text); }
  .nav-logo-text span { color:var(--purple-lt); font-style:italic; }
  .nav-links { display:flex; align-items:center; gap:2rem; list-style:none; }
  .nav-links a { color:var(--muted); text-decoration:none; font-size:.875rem; transition:color .2s; }
  .nav-links a:hover { color:var(--text); }
  .nav-cta {
    background:var(--purple); color:var(--text);
    padding:.5rem 1.25rem; border-radius:999px;
    font-size:.875rem; font-weight:600;
    text-decoration:none; border:none; cursor:pointer;
    display:inline-flex; align-items:center; gap:.35rem;
    transition:opacity .2s, transform .2s, box-shadow .2s;
  }
  .nav-cta:hover { opacity:.88; transform:translateY(-1px); box-shadow:0 6px 20px rgba(124,58,237,.4); }
  .nav-mobile-btn {
    display:none; background:none; border:.5px solid var(--border);
    color:var(--muted); padding:.4rem .65rem; border-radius:6px; cursor:pointer; font-size:1.1rem;
  }

  /* ══════ HERO ══════ */
  .hero {
    min-height:100vh; display:flex; align-items:center;
    padding:7rem 2.5rem 4rem; position:relative; overflow:hidden;
  }
  .hero-logo-wrap {
  width: 420px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;   /* keep it on the same layer as other hero content */
}
#logoCanvas {
  width: 420px;
  height: 420px;
}
  #logoCanvas {
  /* other rules … */
}


  .hero-orb { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
  .orb-1 { width:550px;height:550px;background:rgba(124,58,237,.18);top:-180px;right:-60px;animation:floatA 10s ease-in-out infinite; }
  .orb-2 { width:350px;height:350px;background:rgba(6,182,212,.1);bottom:-100px;left:-80px;animation:floatB 14s ease-in-out infinite; }
  .hero-grid {
    position:absolute;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);
    background-size:56px 56px;
    mask-image:radial-gradient(ellipse 80% 80% at 60% 40%,black,transparent);
  }
  .hero-inner {
    position:relative;z-index:1;
    max-width:1100px;margin:0 auto;width:100%;
    display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;
  }
  .hero-badge {
    display:inline-flex;align-items:center;gap:.45rem;
    background:rgba(124,58,237,.12);border:.5px solid rgba(124,58,237,.38);
    color:var(--purple-lt);font-size:.78rem;font-weight:500;
    padding:.35rem .95rem;border-radius:999px;margin-bottom:1.5rem;
    opacity:0;
  }
  .badge-dot { width:6px;height:6px;border-radius:50%;background:var(--purple-lt);animation:pulseRing 2s infinite; }
  .hero-h1 {
    font-size:clamp(2.2rem,4.5vw,3.6rem);font-weight:800;line-height:1.12;
    letter-spacing:-.04em;color:var(--text);margin-bottom:1.25rem;
    opacity:0;
  }
  .hero-sub {
    font-size:1rem;color:var(--muted);max-width:460px;line-height:1.75;
    margin-bottom:2rem;opacity:0;
  }
  .hero-btns { display:flex;gap:.85rem;flex-wrap:wrap;opacity:0; }
  .btn-primary {
    background:var(--purple);color:var(--text);
    padding:.75rem 1.6rem;border-radius:999px;font-size:.9rem;font-weight:600;
    border:none;cursor:pointer;text-decoration:none;
    display:inline-flex;align-items:center;gap:.4rem;
    transition:transform .2s,box-shadow .2s,opacity .2s;
  }
  .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,58,237,.45);opacity:.9; }
  .btn-primary:active { transform:translateY(0) scale(.97); }
  .btn-ghost {
    background:transparent;color:var(--muted);
    padding:.75rem 1.6rem;border-radius:999px;font-size:.9rem;
    border:.5px solid rgba(255,255,255,.13);cursor:pointer;text-decoration:none;
    display:inline-flex;align-items:center;gap:.35rem;
    transition:color .2s,border-color .2s,transform .2s;
  }
  .btn-ghost:hover { color:var(--text);border-color:rgba(255,255,255,.22);transform:translateY(-2px); }
  .btn-ghost:active { transform:translateY(0) scale(.97); }

  /* ── Dot sphere ── */
  .sphere-wrap {
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    position:relative;opacity:0;
  }
  .sphere-outer {
    position:relative;
    width:360px;height:360px;
    display:flex;align-items:center;justify-content:center;
  }
  .dot-grid {
    display:grid;
    grid-template-columns:repeat(13,1fr);
    gap:5px;
    width:340px;height:340px;
    mask-image:radial-gradient(ellipse 78% 72% at 50% 50%,black 20%,rgba(0,0,0,.7) 55%,transparent 80%);
    -webkit-mask-image:radial-gradient(ellipse 78% 72% at 50% 50%,black 20%,rgba(0,0,0,.7) 55%,transparent 80%);
  }
  .sphere-dot {
    border-radius:50%;
    background:var(--purple-lt);
    transform-origin:center;
    width:100%;aspect-ratio:1/1;
  }
  .sphere-ring {
    position:absolute;inset:-20px;
    border-radius:50%;
    border:.5px solid rgba(124,58,237,.2);
    animation:nodePulse 3s ease infinite;
  }
  .sphere-ring-2 {
    position:absolute;inset:-40px;
    border-radius:50%;
    border:.5px solid rgba(124,58,237,.1);
  }
  .sphere-label {
    margin-top:1.25rem;
    font-size:.75rem;font-weight:600;color:var(--purple-lt);
    letter-spacing:.1em;text-transform:uppercase;
    display:flex;align-items:center;gap:.4rem;
  }

  /* ══════ SECTION COMMONS ══════ */
  .section { padding:clamp(4.5rem,8vw,6.5rem) clamp(1.25rem,4vw,2.5rem); position:relative; }
  .section-inner { max-width:1100px;margin:0 auto; }
  .section-tag {
    font-size:.72rem;font-weight:700;color:var(--purple-lt);
    letter-spacing:.12em;text-transform:uppercase;
    display:flex;align-items:center;gap:.4rem;margin-bottom:.75rem;
  }
  .section-title {
    font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:800;
    letter-spacing:-.04em;color:var(--text);line-height:1.18;margin-bottom:1rem;
  }
  .section-sub { font-size:clamp(.9rem,1.8vw,.98rem);color:var(--muted);max-width:520px;line-height:1.75; }
  .section-header { margin-bottom:clamp(2.5rem,5vw,3.5rem); }
  .section-header--center { text-align:center; }
  .section-header--center .section-tag { justify-content:center; }
  .section-header--center .section-sub { margin-left:auto;margin-right:auto; }
  .services-bg {
    background:linear-gradient(180deg,var(--bg) 0%,var(--surface) 48%,var(--bg) 100%);
  }
  .services-bg::before {
    content:'';position:absolute;inset:0;pointer-events:none;
    background-image:radial-gradient(rgba(124,58,237,.06) 1px,transparent 1px);
    background-size:28px 28px;
    mask-image:linear-gradient(to bottom,transparent,black 15%,black 85%,transparent);
  }
  .section-divider {
    height:1px;max-width:1100px;margin:0 auto;
    background:linear-gradient(90deg,transparent,rgba(124,58,237,.35) 50%,transparent);
    opacity:.6;
  }

  /* ══════ SERVICES — compact + UI preview ══════ */
  .services-compact {
    display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;
  }
  .svc-compact {
    border-radius:14px;overflow:hidden;
    border:.5px solid var(--border);
    background:var(--card);
    transition:border-color .3s,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s;
  }
  .svc-compact:hover {
    border-color:var(--border-p);
    transform:translateY(-3px);
    box-shadow:0 12px 32px rgba(124,58,237,.1);
  }
  .svc-compact-visual {
    height:72px;position:relative;overflow:hidden;
    border-bottom:.5px solid rgba(255,255,255,.05);
  }
  .svc-compact-visual::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(124,58,237,.18),rgba(6,182,212,.08));
  }
  .svc-preview {
    position:absolute;inset:12px 14px;
    border-radius:8px;border:.5px solid rgba(255,255,255,.1);
    background:rgba(8,8,16,.75);
    overflow:hidden;
  }
  .svc-preview--flow { display:flex;align-items:center;justify-content:center;gap:6px; }
  .svc-preview--flow span {
    width:8px;height:8px;border-radius:50%;background:var(--purple-lt);opacity:.7;
  }
  .svc-preview--flow span:nth-child(2) { width:20px;height:3px;border-radius:2px;opacity:.4; }
  .svc-preview--wave { display:flex;align-items:flex-end;justify-content:center;gap:3px;height:100%;padding-bottom:8px; }
  .svc-preview--wave i {
    display:block;width:3px;border-radius:2px;background:var(--cyan);
    animation:waveBar 1.2s ease-in-out infinite;
  }
  .svc-preview--wave i:nth-child(1){height:10px;animation-delay:0s}
  .svc-preview--wave i:nth-child(2){height:18px;animation-delay:.15s}
  .svc-preview--wave i:nth-child(3){height:14px;animation-delay:.3s}
  .svc-preview--wave i:nth-child(4){height:22px;animation-delay:.45s}
  .svc-preview--wave i:nth-child(5){height:12px;animation-delay:.6s}
  @keyframes waveBar {
    0%,100%{transform:scaleY(.6)} 50%{transform:scaleY(1)}
  }
  .svc-preview--chart { display:flex;align-items:flex-end;gap:4px;padding:10px 12px;height:100%; }
  .svc-preview--chart i {
    flex:1;border-radius:2px 2px 0 0;background:linear-gradient(to top,var(--purple),var(--purple-lt));
    opacity:.75;
  }
  .svc-preview--chart i:nth-child(1){height:35%}.svc-preview--chart i:nth-child(2){height:65%}
  .svc-preview--chart i:nth-child(3){height:45%}.svc-preview--chart i:nth-child(4){height:80%}
  .svc-preview--nodes { display:flex;align-items:center;justify-content:center;gap:8px;height:100%; }
  .svc-preview--nodes em {
    width:22px;height:22px;border-radius:6px;border:.5px solid rgba(6,182,212,.4);
    background:rgba(6,182,212,.1);
  }
  .svc-preview--nodes em:nth-child(2){width:4px;height:4px;border-radius:50%;border:none;background:var(--cyan);opacity:.5}
  .svc-preview--grid { display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:12px;height:100%; }
  .svc-preview--grid em { border-radius:3px;background:rgba(167,139,250,.25);min-height:8px; }
  .svc-preview--window { padding:8px 10px;height:100%; }
  .svc-preview--window::before {
    content:'';display:block;height:6px;width:28px;border-radius:3px;
    background:rgba(255,255,255,.12);margin-bottom:6px;
  }
  .svc-preview--window::after {
    content:'';display:block;height:calc(100% - 14px);border-radius:4px;
    background:linear-gradient(90deg,rgba(6,182,212,.15),rgba(124,58,237,.15));
  }
  .svc-compact-body { padding:.9rem 1rem 1rem; }
  .svc-compact-head {
    display:flex;align-items:center;gap:.55rem;margin-bottom:.4rem;
  }
  .svc-compact-icon {
    width:28px;height:28px;border-radius:8px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
  }
  .svc-compact-icon.icon-p { background:rgba(124,58,237,.14);color:var(--purple-lt); }
  .svc-compact-icon.icon-c { background:rgba(6,182,212,.12);color:var(--cyan); }
  .svc-compact-title { font-size:.88rem;font-weight:700;color:var(--text);letter-spacing:-.02em; }
  .svc-compact-desc { font-size:.78rem;color:var(--muted);line-height:1.55; }
  .icon-p { color:var(--purple-lt); }
  .icon-c { color:var(--cyan); }

  /* ── Slim impact strip (optional, after flow) ── */
  .impact-strip {
    display:flex;flex-wrap:wrap;justify-content:center;gap:0;
    margin-top:1.25rem;padding:.65rem 0;
    border-top:.5px solid var(--border);
    border-bottom:.5px solid var(--border);
  }
  .impact-item {
    flex:1;min-width:140px;text-align:center;padding:.5rem 1rem;
    border-right:.5px solid var(--border);
  }
  .impact-item:last-child { border-right:none; }
  .impact-num { font-size:1.1rem;font-weight:800;letter-spacing:-.03em;line-height:1.2; }
  .impact-label { font-size:.68rem;color:var(--muted);margin-top:.15rem;line-height:1.3; }

  /* ══════ PROCESS — horizontal rail ══════ */
  .process-section {
    background:var(--bg);
    overflow:hidden;
  }
  .process-section::before {
    content:'';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    width:min(900px,90vw);height:400px;
    background:radial-gradient(ellipse,rgba(124,58,237,.08),transparent 70%);
    pointer-events:none;
  }
  .process-rail {
    display:grid;grid-template-columns:repeat(4,1fr);
    gap:1.25rem;position:relative;padding-top:3.5rem;
  }
  .process-rail-track {
    position:absolute;top:1.35rem;left:12.5%;right:12.5%;height:2px;
    background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;
  }
  .process-rail-fill {
    height:100%;width:0%;
    background:linear-gradient(90deg,var(--purple),var(--cyan));
    border-radius:2px;
    transition:width 1.2s cubic-bezier(.16,1,.3,1);
    box-shadow:0 0 12px rgba(124,58,237,.5);
  }
  .process-rail-fill.drawn { width:100%; }
  .process-col {
    display:flex;flex-direction:column;align-items:center;
    text-align:center;position:relative;
  }
  .process-marker {
    width:44px;height:44px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:.75rem;font-weight:800;letter-spacing:-.02em;
    background:var(--surface);
    border:2px solid rgba(124,58,237,.25);
    color:var(--muted);margin-bottom:1.25rem;
    position:relative;z-index:2;
    transition:all .45s cubic-bezier(.16,1,.3,1);
  }
  .process-col.is-active .process-marker,
  .process-col:hover .process-marker {
    border-color:var(--purple-lt);
    background:rgba(124,58,237,.18);
    color:var(--purple-lt);
    transform:scale(1.1);
    box-shadow:0 0 24px rgba(124,58,237,.35);
  }
  .process-glass {
    width:100%;text-align:left;
    background:rgba(255,255,255,.03);
    backdrop-filter:blur(12px);
    border:.5px solid rgba(255,255,255,.08);
    border-radius:16px;padding:1.35rem 1.25rem;
    transition:border-color .35s,transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s;
  }
  .process-col:hover .process-glass {
    border-color:rgba(124,58,237,.3);
    transform:translateY(-4px);
    box-shadow:0 16px 40px rgba(0,0,0,.25);
  }
  .process-glass-head {
    display:flex;align-items:center;gap:.5rem;
    margin-bottom:.5rem;
  }
  .process-glass-head svg { flex-shrink:0; }
  .process-glass-title {
    font-size:.92rem;font-weight:700;color:var(--text);letter-spacing:-.02em;
  }
  .process-glass-desc {
    font-size:.82rem;color:var(--muted);line-height:1.65;margin-bottom:.75rem;
  }
  .process-chip {
    display:inline-flex;align-items:center;
    font-size:.68rem;font-weight:600;letter-spacing:.02em;
    color:var(--cyan);
    padding:.25rem .65rem;border-radius:999px;
    background:rgba(6,182,212,.1);
    border:.5px solid rgba(6,182,212,.22);
  }

  /* ══════ WHY — BIG FLOW VISUAL ══════ */
  .why-layout { display:flex;flex-direction:column;gap:1.5rem; }

  /* ── Big flow card ── */
  .flow-showcase {
    background:var(--surface);
    border:.5px solid var(--border-p);
    border-radius:22px;
    padding:2.5rem;
    position:relative;overflow:hidden;
  }
  .flow-showcase-orb {
    position:absolute;width:400px;height:400px;border-radius:50%;
    filter:blur(100px);pointer-events:none;
    background:rgba(124,58,237,.15);top:-150px;right:-100px;
    animation:floatA 11s ease-in-out infinite;
  }
  .flow-showcase-title {
    font-size:1.1rem;font-weight:700;color:var(--text);
    margin-bottom:2rem;display:flex;align-items:center;gap:.6rem;
    position:relative;z-index:1;
  }
  .live-badge {
    display:inline-flex;align-items:center;gap:.35rem;
    background:rgba(34,197,94,.1);border:.5px solid rgba(34,197,94,.3);
    color:var(--green);font-size:.72rem;font-weight:600;
    padding:.2rem .65rem;border-radius:999px;
  }
  .live-dot { width:6px;height:6px;border-radius:50%;background:var(--green);animation:blink 1.4s ease infinite; }

  /* Flow diagram — big */
  .flow-diagram-big {
    display:flex;flex-direction:column;align-items:center;
    gap:0;position:relative;z-index:1;
  }
  .flow-node-big {
    display:inline-flex;align-items:center;gap:.6rem;
    border-radius:12px;padding:.7rem 1.4rem;
    font-size:.85rem;font-weight:600;
    border:.5px solid;position:relative;z-index:2;
    min-width:180px;justify-content:center;
  }
  .fnode-source { background:rgba(6,182,212,.08);border-color:rgba(6,182,212,.35);color:var(--cyan); }
  .fnode-engine {
    background:rgba(124,58,237,.12);border-color:rgba(124,58,237,.5);
    color:var(--purple-lt);animation:nodePulse 3s ease infinite;
    font-size:.95rem;padding:.85rem 1.8rem;
  }
  .fnode-output {
    background:var(--card);border-color:rgba(255,255,255,.1);
    color:var(--muted);font-size:.8rem;padding:.6rem 1.1rem;min-width:140px;
  }
  .fnode-output.active { border-color:rgba(124,58,237,.3);color:var(--text); }
  .flow-vline {
    width:1px;height:36px;flex-shrink:0;position:relative;overflow:visible;
    background:linear-gradient(to bottom,rgba(124,58,237,.6),rgba(124,58,237,.2));
  }
  .flow-vdot {
    width:7px;height:7px;border-radius:50%;background:var(--purple-lt);
    position:absolute;left:50%;transform:translateX(-50%);
    animation:dotTravel 1.8s ease-in-out infinite;
  }
  .flow-vdot.d2 { animation-delay:.7s; }
  .flow-outputs-row {
    display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;justify-content:center;
  }
  .flow-branch-wrap {
    display:flex;flex-direction:column;align-items:center;gap:0;
  }
  .flow-branch-vline {
    width:1px;height:24px;
    background:linear-gradient(to bottom,rgba(124,58,237,.45),rgba(124,58,237,.1));
    position:relative;overflow:visible;
  }
  .flow-branch-dot {
    width:5px;height:5px;border-radius:50%;background:var(--cyan);
    position:absolute;left:50%;transform:translateX(-50%);
    animation:dotTravel 2.2s ease-in-out infinite;
  }
  /* scan line effect on flow card */
  .flow-scan {
    position:absolute;left:0;right:0;height:1px;
    background:linear-gradient(to right,transparent,rgba(124,58,237,.25),transparent);
    animation:scanLine 4s linear infinite;
    pointer-events:none;z-index:0;
  }


  /* ══════ CTA — split immersive ══════ */
  .cta-section {
    padding:clamp(5rem,10vw,7rem) clamp(1.25rem,4vw,2.5rem);
    position:relative;overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 20% 50%,rgba(124,58,237,.14),transparent),
      radial-gradient(ellipse 60% 50% at 85% 60%,rgba(6,182,212,.08),transparent),
      var(--bg);
  }
  .cta-mesh {
    position:absolute;inset:0;pointer-events:none;opacity:.4;
    background-image:
      linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);
    background-size:48px 48px;
    mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black,transparent);
  }
  .cta-split {
    max-width:1100px;margin:0 auto;
    display:grid;grid-template-columns:1.1fr .9fr;
    gap:clamp(2rem,5vw,4rem);align-items:center;
    position:relative;z-index:1;
  }
  .cta-copy { text-align:left; }
  .cta-copy .section-tag { margin-bottom:1rem; }
  .cta-title {
    font-size:clamp(2rem,4.5vw,3rem);font-weight:800;
    letter-spacing:-.045em;color:var(--text);
    line-height:1.08;margin-bottom:1.25rem;
  }
  .cta-sub {
    font-size:clamp(.92rem,1.8vw,1.02rem);color:var(--muted);
    line-height:1.75;margin-bottom:2rem;max-width:440px;
  }
  .cta-trust-list {
    display:flex;flex-direction:column;gap:.65rem;
  }
  .cta-trust-item {
    display:flex;align-items:center;gap:.55rem;
    font-size:.84rem;color:var(--muted);font-weight:500;
  }
  .cta-trust-item svg { color:var(--green);flex-shrink:0; }
  .cta-panel {
    position:relative;border-radius:24px;padding:2px;
    background:linear-gradient(145deg,rgba(124,58,237,.6),rgba(6,182,212,.3),rgba(124,58,237,.15));
    box-shadow:0 32px 80px rgba(124,58,237,.2);
  }
  .cta-panel-inner {
    background:rgba(10,10,20,.92);
    backdrop-filter:blur(24px);
    border-radius:22px;padding:2.25rem 2rem;
    display:flex;flex-direction:column;gap:1.25rem;
  }
  .cta-panel-label {
    font-size:.72rem;font-weight:700;color:var(--purple-lt);
    letter-spacing:.1em;text-transform:uppercase;
  }
  .cta-panel-title {
    font-size:1.15rem;font-weight:700;color:var(--text);
    letter-spacing:-.02em;line-height:1.35;
  }
  .cta-btns { display:flex;flex-direction:column;gap:.75rem; }
  .cta-btns .btn-primary,
  .cta-btns .btn-ghost { justify-content:center;width:100%; }
  .cta-panel-note {
    font-size:.75rem;color:var(--muted);text-align:center;
    padding-top:.5rem;border-top:.5px solid var(--border);
  }

  #creature-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
  }
  #creature {
    font-size: .2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150em;
    height: 150em;
    flex-wrap: wrap;
  }
  #creature div {
    transform-style: preserve-3d;
    position: relative;
    width: 4em;
    height: 4em;
    margin: 3em;
    border-radius: 2em;
    will-change: transform;
    mix-blend-mode: plus-lighter;
    /*mix-blend-mode: screen;*/
    /*mix-blend-mode: lighten;*/
    background: #A78BFA;
  }
  /* ══════ FOOTER ══════ */
  .footer {
    padding:3rem clamp(1.25rem,4vw,2.5rem) 2.25rem;
    border-top:.5px solid var(--border);
    background:linear-gradient(180deg,var(--bg),#06060e);
  }
  .footer-inner {
    max-width:1100px;margin:0 auto;
    display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:2.5rem 2rem;
    align-items:start;
  }
  .footer-brand { display:flex;flex-direction:column;gap:.65rem; }
  .footer-logo { font-size:1.2rem;font-weight:800;color:var(--text);letter-spacing:-.04em; }
  .footer-logo span { color:var(--purple-lt);font-style:italic; }
  .footer-tagline { font-size:.82rem;color:var(--muted);line-height:1.6;max-width:240px; }
  .footer-col-title {
    font-size:.7rem;font-weight:700;color:var(--purple-lt);
    letter-spacing:.1em;text-transform:uppercase;margin-bottom:.85rem;
  }
  .footer-links { display:flex;flex-direction:column;gap:.55rem;list-style:none; }
  .footer-links a {
    font-size:.86rem;color:var(--muted);text-decoration:none;
    transition:color .2s,transform .2s;display:inline-block;
  }
  .footer-links a:hover { color:var(--text);transform:translateX(3px); }
  .footer-bottom {
    max-width:1100px;margin:2rem auto 0;padding-top:1.5rem;
    border-top:.5px solid var(--border);
    display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
  }
  .footer-copy { font-size:.78rem;color:var(--muted); }
  .footer-social { display:flex;gap:.75rem; }
  .footer-social a {
    width:36px;height:36px;border-radius:10px;
    border:.5px solid var(--border);display:flex;align-items:center;justify-content:center;
    color:var(--muted);text-decoration:none;font-size:.85rem;
    transition:color .2s,border-color .2s,background .2s,transform .2s;
  }
  .footer-social a:hover {
    color:var(--text);border-color:var(--border-p);
    background:rgba(124,58,237,.1);transform:translateY(-2px);
  }

  /* ══════ RESPONSIVE ══════ */
  @media(max-width:1024px) {
    .services-compact { grid-template-columns:repeat(2,1fr); }
    .process-rail { grid-template-columns:repeat(2,1fr); gap:1.5rem; padding-top:0; }
    .process-rail-track { display:none; }
    .impact-item { min-width:120px; }
    .cta-split { grid-template-columns:1fr; text-align:center; }
    .cta-copy { text-align:center; }
    .cta-copy .section-tag { justify-content:center; }
    .cta-sub { margin-left:auto;margin-right:auto; }
    .cta-trust-list { align-items:center; }
    .footer-inner { grid-template-columns:1fr 1fr; }
    .footer-brand { grid-column:1/-1; }
  }
  @media(max-width:900px) {
    .hero-inner { grid-template-columns:1fr; text-align:center; gap:2.5rem; }
    .hero-sub { margin-left:auto;margin-right:auto; }
    .hero-btns  { justify-content:center; }
    .hero-logo-wrap, #logoCanvas { width:min(320px,85vw)!important;height:min(320px,85vw)!important; }
    .sphere-wrap { display:none; }
  }
  @media(max-width:768px) {
    .nav-links { display:none; }
    .nav-mobile-btn { display:block; }
    .nav-links.open {
      display:flex;flex-direction:column;position:fixed;
      top:0;left:0;right:0;background:var(--bg);
      padding:5rem 2rem 2rem;gap:1.5rem;
      border-bottom:.5px solid var(--border);z-index:99;
    }
    .services-compact { grid-template-columns:1fr; }
    .process-rail { grid-template-columns:1fr; }
    .impact-strip { flex-direction:column; }
    .impact-item { border-right:none;border-bottom:.5px solid var(--border); }
    .impact-item:last-child { border-bottom:none; }
    .footer-inner { grid-template-columns:1fr; text-align:center; }
    .footer-brand { align-items:center; }
    .footer-tagline { max-width:none; }
    .footer-col-title { margin-bottom:.5rem; }
    .footer-links { align-items:center; }
    .footer-bottom { flex-direction:column;text-align:center; }
    .flow-outputs-row { flex-direction:column; }
    .hero { padding-top:6.5rem; min-height:auto; padding-bottom:3rem; }
  }
  @media(max-width:480px) {
    .hero-h1 { font-size:2rem; }
    .cta-panel-inner { padding:1.75rem 1.25rem; }
  }
`

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const SERVICES = [
  { Icon: Zap, cls: 'icon-p', preview: 'flow', title: 'Flujos N8N', desc: 'Automatiza procesos completos sin código. Conecta CRMs, bases de datos, correos y herramientas en un solo flujo inteligente.' },
  { Icon: Mic, cls: 'icon-c', preview: 'wave', title: 'Retell AI — Voz', desc: 'Agentes de voz que atienden, califican y cierran clientes 24/7. Integración directa con tu CRM y agenda.' },
  { Icon: BarChart3, cls: 'icon-p', preview: 'chart', title: 'BI & Analytics', desc: 'Dashboards en tiempo real que convierten tus datos en decisiones. Métricas claras, visualización poderosa.' },
  { Icon: Link2, cls: 'icon-c', preview: 'nodes', title: 'Integraciones API', desc: 'Conectamos cualquier herramienta: HubSpot, Notion, WhatsApp, Google Sheets, Slack y muchas más.' },
  { Icon: Bot, cls: 'icon-p', preview: 'grid', title: 'Agentes IA', desc: 'Agentes inteligentes que procesan datos, responden preguntas y ejecutan tareas complejas de forma autónoma.' },
  { Icon: Code2, cls: 'icon-c', preview: 'window', title: 'React + Vite Apps', desc: 'Interfaces web rápidas y modernas para tus herramientas internas o productos digitales de cara al cliente.' },
]

const STEPS = [
  { n: '01', Icon: Search, side: 'right', title: 'Diagnóstico', desc: 'Analizamos tus procesos actuales, identificamos cuellos de botella y oportunidades de automatización con alto impacto.', chip: 'Workshop gratuito' },
  { n: '02', Icon: PenTool, side: 'left', title: 'Arquitectura a medida', desc: 'Diseñamos la solución completa: flujos, integraciones, agentes IA y el stack óptimo para tu operación.', chip: 'Entrega en 48 h' },
  { n: '03', Icon: Rocket, side: 'right', title: 'Implementación ágil', desc: 'Deploy rápido con sprints semanales. Iteramos contigo hasta que el sistema funcione perfecto en producción.', chip: 'Sprints de 1 semana' },
  { n: '04', Icon: Activity, side: 'left', title: 'Resultados medibles', desc: 'Monitoreo continuo, KPIs de impacto y optimización permanente. Tu automatización mejora con cada semana.', chip: 'KPIs en tiempo real' },
]

const WHY_FEATURES = [
  { Icon: Target, title: 'IA aplicada real', desc: 'Soluciones ya probadas en producción. No teoría.' },
  { Icon: Clock, title: 'Resultados en semanas', desc: 'Sin proyectos infinitos ni consultoras lentas.' },
  { Icon: ShieldCheck, title: 'Tu stack, tus datos', desc: 'Control total. Sin vendor lock-in.' },
  { Icon: TrendingUp, title: 'ROI documentado', desc: 'Horas ahorradas, errores eliminados, medidos.' },
]

const TECHS = ['N8N', 'Retell AI', 'OpenAI', 'Anthropic', 'React', 'Supabase', 'PostgreSQL', 'Redis', 'Docker', 'HubSpot', 'WhatsApp API', 'Notion API', 'Slack', 'Make']

const METRICS = [
  { Icon: Clock, color: 'var(--purple-lt)', num: '+150h', label: 'ahorradas por cliente al mes' },
  { Icon: Rocket, color: 'var(--cyan)', num: '7 días', label: 'primer flujo en producción' },
  { Icon: Activity, color: 'var(--green)', num: '99.2%', label: 'tasa de éxito en flujos' },
  { Icon: TrendingUp, color: 'var(--purple-lt)', num: '×3.8', label: 'ROI promedio en 90 días' },
]

const FLOW_OUTPUTS = [
  { Icon: MessageSquare, label: 'WhatsApp', color: 'var(--green)' },
  { Icon: Mail, label: 'Email', color: 'var(--cyan)' },
  { Icon: Database, label: 'CRM', color: 'var(--purple-lt)' },
  { Icon: Activity, label: 'Slack', color: 'var(--cyan)' },
]

function CreatureEffect() {
  useEffect(() => {
    let active = true;
    let mainLoop, autoMove, manualMovementTimeout;

    const followPointer = e => {
      const event = e.type === 'touchmove' ? e.touches[0] : e;
      const viewport = { w: window.innerWidth * .5, h: window.innerHeight * .5 };
      if (window.creatureCursor) {
        window.creatureCursor.x = event.pageX - viewport.w;
        window.creatureCursor.y = event.pageY - viewport.h;
      }
      if (autoMove) autoMove.pause();
      if (manualMovementTimeout) manualMovementTimeout.restart();
    };

    import('https://esm.sh/animejs').then(anime => {
      if (!active) return;
      const { animate, createTimeline, createTimer, stagger, utils } = anime;

      const creatureEl = document.querySelector('#creature');
      if (!creatureEl || creatureEl.children.length > 0) return;

      const viewport = { w: window.innerWidth * .5, h: window.innerHeight * .5 };
      const cursor = { x: 0, y: 0 };
      window.creatureCursor = cursor;
      const rows = 13;
      const grid = [rows, rows];
      const from = 'center';
      const scaleStagger = stagger([2, 5], { ease: 'inQuad', grid, from });
      const opacityStagger = stagger([1, .1], { grid, from });

      for (let i = 0; i < (rows * rows); i++) {
        creatureEl.appendChild(document.createElement('div'));
      }

      const particuleEls = creatureEl.querySelectorAll('div');

      utils.set(creatureEl, {
        width: rows * 10 + 'em',
        height: rows * 10 + 'em'
      });

      utils.set(particuleEls, {
        x: 0,
        y: 0,
        scale: scaleStagger,
        opacity: opacityStagger,
        background: stagger([80, 20], {
          grid, from,
          modifier: v => `hsl(261, 80%, ${v}%)`,
        }),
        boxShadow: stagger([8, 1], {
          grid, from,
          modifier: v => `0px 0px ${utils.round(v, 0)}em 0px var(--purple-lt)`,
        }),
        zIndex: stagger([rows * rows, 1], { grid, from, modifier: utils.round(0) }),
      });

      const pulse = () => {
        animate(particuleEls, {
          keyframes: [
            {
              scale: 5,
              opacity: 1,
              delay: stagger(90, { start: 1650, grid, from }),
              duration: 150,
            }, {
              scale: scaleStagger,
              opacity: opacityStagger,
              ease: 'inOutQuad',
              duration: 600
            }
          ],
        });
      }

      mainLoop = createTimer({
        frameRate: 15, // Animate to the new cursor position every 250ms
        onUpdate: () => {
          animate(particuleEls, {
            x: cursor.x,
            y: cursor.y,
            delay: stagger(40, { grid, from }),
            duration: stagger(120, { start: 750, ease: 'inQuad', grid, from }),
            ease: 'inOut',
            composition: 'blend', // This allows the animations to overlap nicely
          });
        }
      });

      autoMove = createTimeline()
        .add(cursor, {
          x: [-viewport.w * .45, viewport.w * .45],
          modifier: x => x + Math.sin(mainLoop.currentTime * .0007) * viewport.w * .5,
          duration: 3000,
          ease: 'inOutExpo',
          alternate: true,
          loop: true,
          onBegin: pulse,
          onLoop: pulse,
        }, 0)
        .add(cursor, {
          y: [-viewport.h * .45, viewport.h * .45],
          modifier: y => y + Math.cos(mainLoop.currentTime * .00012) * viewport.h * .5,
          duration: 1000,
          ease: 'inOutQuad',
          alternate: true,
          loop: true,
        }, 0);

      manualMovementTimeout = createTimer({
        duration: 1500,
        onComplete: () => autoMove.play(),
      });

      document.addEventListener('mousemove', followPointer);
      document.addEventListener('touchmove', followPointer);
    }).catch(err => console.error("Error loading animejs:", err));

    return () => {
      active = false;
      document.removeEventListener('mousemove', followPointer);
      document.removeEventListener('touchmove', followPointer);
      if (mainLoop) mainLoop.pause();
      if (autoMove) autoMove.pause();
      if (manualMovementTimeout) manualMovementTimeout.pause();
    };
  }, []);

  return null;
}
/* ═══════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════ */

/** Small SVG halftone sphere for nav logo */
function NavSphere() {
  const circles = []
  const rows = 5, cols = 7
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * 5.5 + 3
      const cy = r * 5.5 + 3
      const dx = (c - (cols - 1) / 2) / ((cols - 1) / 2)
      const dy = (r - (rows - 1) / 2) / ((rows - 1) / 2)
      const dist = Math.sqrt(dx * dx * 0.8 + dy * dy)
      const radius = Math.max(0.6, 2.4 - dist * 1.5)
      const opacity = Math.max(0.08, 1 - dist * 0.85)
      circles.push(<circle key={`${r}-${c}`} cx={cx} cy={cy} r={radius} fill="#A78BFA" opacity={opacity} />)
    }
  }
  return (
    <svg width="38" height="30" viewBox="0 0 38 30" style={{ flexShrink: 0 }}>
      {circles}
    </svg>
  )
}

/** Mini UI preview per service type */
function ServicePreview({ type }) {
  const inner = {
    flow: <div className="svc-preview svc-preview--flow"><span /><span /><span /></div>,
    wave: <div className="svc-preview svc-preview--wave"><i /><i /><i /><i /><i /></div>,
    chart: <div className="svc-preview svc-preview--chart"><i /><i /><i /><i /></div>,
    nodes: <div className="svc-preview svc-preview--nodes"><em /><em /><em /></div>,
    grid: <div className="svc-preview svc-preview--grid"><em /><em /><em /><em /><em /><em /></div>,
    window: <div className="svc-preview svc-preview--window" />,
  }
  return <div className="svc-compact-visual">{inner[type] || inner.flow}</div>
}

/** Animated 13×13 dot sphere — hero visual */
function DotSphere() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (!gridRef.current) return
    const dots = Array.from(gridRef.current.querySelectorAll('.sphere-dot'))
    const options = { grid: [13, 13], from: 'center' }

    const tl = createTimeline({ loop: true, alternate: true, duration: 2200 })
      .add(dots, {
        scale: stagger([1.18, 0.68], options),
        ease: 'inOutQuad',
      }, stagger(160, options))

    return () => { tl.pause && tl.pause() }
  }, [])

  return (
    <div className="sphere-wrap">
      <div className="sphere-outer">
        <div className="sphere-ring" />
        <div className="sphere-ring-2" />
        <div className="dot-grid" ref={gridRef}>
          {Array.from({ length: 169 }).map((_, i) => (
            <div key={i} className="sphere-dot" />
          ))}
        </div>
      </div>
      <div className="sphere-label">
        <span className="badge-dot" style={{ width: 5, height: 5 }} />
        Motor de automatización activo
      </div>
      <div id="creature-wrapper">
        <div id="creature"></div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   HOOKS
═══════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useRailFill(ref) {
  useEffect(() => {
    if (!ref.current) return
    const parent = ref.current.closest('.process-rail') || ref.current.parentElement
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current.classList.add('drawn') },
      { threshold: 0.2 }
    )
    io.observe(parent)
    return () => io.disconnect()
  }, [ref])
}

function useCardStagger(selector) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector)
    if (!cards.length) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          io.unobserve(entry.target)
          const siblings = Array.from(cards)
          const idx = siblings.indexOf(entry.target)
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: idx * 70,
            duration: 650,
            ease: 'outExpo',
          })
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach(c => {
      c.style.opacity = '0'
      io.observe(c)
    })
    return () => io.disconnect()
  }, [selector])
}

function useCounter(target, duration = 1600) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      let start = null
      const tick = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        setVal(Math.floor(p * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: .2 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return [val, ref]
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const railRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useReveal()
  useRailFill(railRef)
  useCardStagger('.svc-compact')
  
  useEffect(() => {
    const cols = document.querySelectorAll('.process-col')
    if (!cols.length) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.step)
            setActiveStep(idx)
          }
        })
      },
      { threshold: 0.5 }
    )
    cols.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Nav scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Hero anime.js entrance */
  useEffect(() => {
    createTimeline({ delay: 400 })
      .add('.hero-badge', { opacity: [0, 1], translateY: [18, 0], ease: 'outExpo', duration: 700 })
      .add('.hero-h1', { opacity: [0, 1], translateY: [22, 0], ease: 'outExpo', duration: 750 }, '-=550')
      .add('.hero-sub', { opacity: [0, 1], translateY: [18, 0], ease: 'outExpo', duration: 650 }, '-=500')
      .add('.hero-btns', { opacity: [0, 1], translateY: [14, 0], ease: 'outExpo', duration: 600 }, '-=400')
      .add('.sphere-wrap', { opacity: [0, 1], scale: [.9, 1], ease: 'outExpo', duration: 900 }, '-=700')
  }, [])

  return (
    <>
      <style>{css}</style>

      <CreatureEffect />
      <div id="creature-wrapper">
        <div id="creature"></div>
      </div>

      {/* ══ NAV ══ */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo-wrap">
          <NavSphere />
          <div className="nav-logo-text"><span>TEK</span>KLY</div>
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
          <li><a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a></li>
          <li><a href="#por-que" onClick={() => setMenuOpen(false)}>Por qué nosotros</a></li>
          <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
        </ul>
        <a href="#contacto" className="nav-cta" id="nav-cta-btn">
          Agenda demo <ChevronRight size={14} />
        </a>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)}>☰</button>
      </nav>


      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-grid" />
        <div className="hero-inner">
          {/* Left — text */}
          <div>
            <div className="hero-badge">
              <span className="badge-dot" />
              Automatización con IA para empresas
            </div>
            <h1 className="hero-h1">
              Transforma tu negocio<br />
              con <span className="g-text">IA que realmente<br />trabaja</span>
            </h1>
            <p className="hero-sub">
              Conectamos tus procesos con N8N, Retell AI y flujos inteligentes.
              Sin código, sin complicaciones — resultados medibles desde la primera semana.
            </p>
            <div className="hero-btns">
              <a href="#contacto" className="btn-primary" id="hero-cta-primary">
                Agenda una demo <ArrowRight size={15} />
              </a>
              <a href="#servicios" className="btn-ghost" id="hero-cta-secondary">
                Ver servicios <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Right — animated particle logo */}
          <LogoParticle />
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="servicios" className="section services-bg">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag"><Zap size={12} /> Servicios</div>
            <h2 className="section-title">
              Todo lo que necesitas<br />
              para <span className="g-text">automatizar</span>
            </h2>
            <p className="section-sub">Desde flujos simples hasta arquitecturas complejas de IA. La herramienta correcta para cada problema.</p>
          </div>
                    <div className="services-compact">
            {SERVICES.map(({ Icon, cls, preview, title, desc }) => (
              <article key={title} className="svc-compact">
                <ServicePreview type={preview} />
                <div className="svc-compact-body">
                  <div className="svc-compact-head">
                    <div className={`svc-compact-icon ${cls}`}><Icon size={15} /></div>
                    <h3 className="svc-compact-title">{title}</h3>
                  </div>
                  <p className="svc-compact-desc">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* ══ PROCESS ══ */}
      <section id="proceso" className="section process-section">
        <div className="section-inner">
          <div className="section-header section-header--center reveal">
            <div className="section-tag"><Cpu size={12} /> Proceso</div>
            <h2 className="section-title">De la idea a la <span className="g-text">automatización</span> en 4 pasos</h2>
            <p className="section-sub">Un método iterativo, claro y sin sorpresas. Sabemos exactamente qué funciona.</p>
          </div>
          <div className="process-rail reveal">
            <div className="process-rail-track">
              <div className="process-rail-fill" ref={railRef} />
            </div>
            {STEPS.map(({ n, Icon, title, desc, chip }, i) => (
              <div
                key={n}
                className={`process-col${activeStep === i ? ' is-active' : ''}`}
                data-step={i}
              >
                <div className="process-marker">{n}</div>
                <div className="process-glass">
                  <div className="process-glass-head">
                    <Icon size={15} style={{ color: i % 2 === 0 ? 'var(--cyan)' : 'var(--purple-lt)' }} />
                    <span className="process-glass-title">{title}</span>
                  </div>
                  <p className="process-glass-desc">{desc}</p>
                  <span className="process-chip">{chip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY TEKKLY — big flow enganche ══ */}
      <section id="por-que" className="section services-bg">
        <div className="section-inner">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}><CheckCircle2 size={12} /> Por qué Tekkly</div>
            <h2 className="section-title">Mira tu negocio<br /><span className="g-text">automatizado en vivo</span></h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>
              Esto es lo que construimos para ti — flujos que trabajan mientras tú duermes.
            </p>
          </div>

          <div className="why-layout">

            {/* BIG FLOW VISUAL — enganche principal */}
            <div className="flow-showcase reveal">
              <div className="flow-showcase-orb" />
              <div className="flow-scan" />

              <div className="flow-showcase-title">
                <GitBranch size={18} style={{ color: 'var(--purple-lt)' }} />
                Automatización en vivo — Tekkly Engine
                <span className="live-badge"><span className="live-dot" />Activo</span>
              </div>

              <div className="flow-diagram-big">

                {/* Source */}
                <div className="flow-node-big fnode-source">
                  <Webhook size={16} /> Webhook / CRM trigger
                </div>

                {/* Line down */}
                <div className="flow-vline" style={{ height: 44 }}>
                  <div className="flow-vdot" />
                  <div className="flow-vdot d2" />
                </div>

                {/* N8N Engine */}
                <div className="flow-node-big fnode-engine">
                  <GitBranch size={18} /> N8N Engine — Tekkly
                </div>

                {/* Line down */}
                <div className="flow-vline" style={{ height: 44 }}>
                  <div className="flow-vdot" />
                  <div className="flow-vdot d2" />
                </div>

                {/* 4 outputs */}
                <div className="flow-outputs-row">
                  {FLOW_OUTPUTS.map(({ Icon, label, color }, i) => (
                    <div key={label} className="flow-branch-wrap">
                      <div className="flow-branch-vline">
                        <div className="flow-branch-dot" style={{ animationDelay: `${i * .4}s` }} />
                      </div>
                      <div className="flow-node-big fnode-output active">
                        <Icon size={14} style={{ color }} /> {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live stats inside flow card */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
                  gap: '.75rem', marginTop: '2.5rem', width: '100%'
                }}>
                  {[
                    { label: 'Flujos activos', val: '12', color: 'var(--purple-lt)' },
                    { label: 'Procesados hoy', val: '2,341', color: 'var(--cyan)' },
                    { label: 'Tasa de éxito', val: '99.2%', color: 'var(--green)' },
                    { label: 'Uptime', val: '99.9%', color: 'var(--muted)' },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{
                      background: 'rgba(255,255,255,.03)', border: '.5px solid rgba(255,255,255,.08)',
                      borderRadius: '12px', padding: '1rem',
                      position: 'relative', zIndex: 1,
                    }}>
                      <div style={{ fontSize: '.7rem', color: 'var(--muted)', marginBottom: '.25rem' }}>{label}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color, letterSpacing: '-.02em' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="impact-strip reveal">
              {METRICS.map(({ num, label, color }) => (
                <div key={label} className="impact-item">
                  <div className="impact-num" style={{ color }}>{num}</div>
                  <div className="impact-label">{label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section id="contacto" className="cta-section">
        <div className="cta-mesh" aria-hidden="true" />
        <div className="cta-split reveal">
          <div className="cta-copy">
            <div className="section-tag"><Rocket size={12} /> Empieza hoy</div>
            <h2 className="cta-title">
              ¿Listo para <span className="g-text">automatizar</span> tu negocio?
            </h2>
            <p className="cta-sub">
              Agenda una llamada de 30 minutos sin compromiso — te decimos exactamente qué podemos automatizar y cuánto tiempo te ahorraría.
            </p>
            <div className="cta-trust-list">
              <span className="cta-trust-item"><CheckCircle2 size={15} /> Sin compromiso</span>
              <span className="cta-trust-item"><CheckCircle2 size={15} /> Demo de 30 min</span>
              <span className="cta-trust-item"><CheckCircle2 size={15} /> Respuesta en 24 h</span>
            </div>
          </div>
          <div className="cta-panel">
            <div className="cta-panel-inner">
              <div className="cta-panel-label">Siguiente paso</div>
              <p className="cta-panel-title">Cuéntanos tu proceso y te mostramos el flujo en vivo.</p>
              <div className="cta-btns">
                <a href="mailto:hola@tekkly.com" className="btn-primary" id="cta-email-btn">
                  Agenda tu demo gratis <ArrowRight size={15} />
                </a>
                <a href="https://linkedin.com/company/tekklycom" target="_blank" rel="noreferrer" className="btn-ghost" id="cta-linkedin-btn">
                  LinkedIn ↗
                </a>
              </div>
              <p className="cta-panel-note">Sin tarjeta · Sin spam · Solo valor</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo"><span>TEK</span>KLY</div>
            <p className="footer-tagline">Automatización con IA para empresas que quieren escalar sin fricción.</p>
          </div>
          <div>
            <div className="footer-col-title">Navegación</div>
            <ul className="footer-links">
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#proceso">Proceso</a></li>
              <li><a href="#por-que">Por qué nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contacto</div>
            <ul className="footer-links">
              <li><a href="mailto:hola@tekkly.com">hola@tekkly.com</a></li>
              <li><a href="https://linkedin.com/company/tekklycom" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Tekkly · Automatización con IA</div>
          <div className="footer-social">
            <a href="https://linkedin.com/company/tekklycom" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="mailto:hola@tekkly.com" aria-label="Email">@</a>
          </div>
        </div>
      </footer>
    </>
  )
}
