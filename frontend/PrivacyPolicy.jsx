/**
 * Tekkly — Política de Privacidad
 * Conforme a: RGPD (UE 2016/679) · LOPDGDD (LO 3/2018) · LSSI-CE
 */
import { useEffect } from 'react'
import { ShieldCheck, ArrowLeft } from 'lucide-react'

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

  .pp-nav {
    position: sticky; top: 0; z-index: 100;
    padding: 1rem 2.5rem;
    display: flex; align-items: center; gap: 1rem;
    background: rgba(8,8,16,.92);
    backdrop-filter: blur(20px);
    border-bottom: .5px solid var(--border);
  }
  .pp-nav-back {
    display: inline-flex; align-items: center; gap: .4rem;
    color: var(--muted); text-decoration: none; font-size: .875rem;
    transition: color .2s;
  }
  .pp-nav-back:hover { color: var(--text); }
  .pp-nav-title { font-size: 1rem; font-weight: 700; color: var(--text); letter-spacing: -.02em; }
  .pp-nav-badge {
    margin-left: auto;
    display: inline-flex; align-items: center; gap: .35rem;
    background: rgba(124,58,237,.12); border: .5px solid rgba(124,58,237,.38);
    color: var(--purple-lt); font-size: .72rem; font-weight: 600;
    padding: .2rem .7rem; border-radius: 999px;
  }

  .pp-wrap {
    max-width: 720px; margin: 0 auto;
    padding: 3rem 2rem 5rem;
  }
  .pp-hero {
    margin-bottom: 2.5rem; padding-bottom: 2rem;
    border-bottom: .5px solid var(--border);
  }
  .pp-tag {
    font-size: .72rem; font-weight: 700; color: var(--purple-lt);
    letter-spacing: .12em; text-transform: uppercase;
    display: flex; align-items: center; gap: .4rem;
    margin-bottom: .65rem;
  }
  .pp-h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
    letter-spacing: -.04em; color: var(--text); line-height: 1.12;
    margin-bottom: .85rem;
  }
  .pp-meta { font-size: .82rem; color: var(--muted); line-height: 1.7; }
  .pp-meta strong { color: var(--text); }

  .pp-block { margin-bottom: 2rem; }
  .pp-block-title {
    font-size: .92rem; font-weight: 700; color: var(--text);
    letter-spacing: -.02em; margin-bottom: .6rem;
    padding-bottom: .45rem;
    border-bottom: .5px solid var(--border-p);
  }
  .pp-p {
    font-size: .88rem; color: var(--muted); line-height: 1.8;
    margin-bottom: .6rem;
  }
  .pp-p:last-child { margin-bottom: 0; }
  .pp-p strong { color: var(--text); font-weight: 600; }
  .pp-p a { color: var(--purple-lt); text-decoration: none; }
  .pp-p a:hover { text-decoration: underline; }

  .pp-list {
    list-style: none; padding: 0; margin: 0 0 .6rem;
  }
  .pp-list li {
    font-size: .88rem; color: var(--muted); line-height: 1.7;
    padding: .2rem 0 .2rem 1.1rem; position: relative;
  }
  .pp-list li::before {
    content: '›'; position: absolute; left: 0;
    color: var(--purple-lt); font-weight: 700;
  }

  .pp-callout {
    background: rgba(124,58,237,.07);
    border: .5px solid rgba(124,58,237,.25);
    border-radius: 10px; padding: 1rem 1.15rem;
    margin-top: .75rem;
  }
  .pp-callout p { font-size: .86rem; color: var(--muted); line-height: 1.7; margin: 0; }
  .pp-callout p strong { color: var(--text); }
  .pp-callout p a { color: var(--cyan); text-decoration: none; }
  .pp-callout p a:hover { text-decoration: underline; }

  .pp-rights-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
    gap: .6rem; margin-bottom: .75rem;
  }
  .pp-right-card {
    background: var(--card); border: .5px solid var(--border);
    border-radius: 10px; padding: .75rem .9rem;
    transition: border-color .2s;
  }
  .pp-right-card:hover { border-color: var(--border-p); }
  .pp-right-card-name { font-size: .75rem; font-weight: 700; color: var(--purple-lt); margin-bottom: .25rem; }
  .pp-right-card-desc { font-size: .75rem; color: var(--muted); line-height: 1.5; }

  .pp-footer {
    max-width: 720px; margin: 0 auto;
    padding: 1.25rem 2rem 2.5rem;
    border-top: .5px solid var(--border);
    font-size: .78rem; color: var(--muted);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: .75rem;
  }
  .pp-footer a { color: var(--purple-lt); text-decoration: none; }
  .pp-footer a:hover { text-decoration: underline; }

  @media(max-width: 600px) {
    .pp-wrap { padding: 2rem 1.25rem 4rem; }
    .pp-nav { padding: .85rem 1.25rem; }
    .pp-rights-grid { grid-template-columns: 1fr 1fr; }
  }
`

const RIGHTS = [
  { name: 'Acceso', desc: 'Saber qué datos tuyos tenemos y obtener una copia.' },
  { name: 'Rectificación', desc: 'Corregir datos incorrectos o incompletos.' },
  { name: 'Supresión', desc: 'Pedir que eliminemos tus datos cuando ya no sean necesarios.' },
  { name: 'Oposición', desc: 'Oponerte al uso de tus datos, incluido el marketing.' },
  { name: 'Limitación', desc: 'Restringir el tratamiento en ciertas circunstancias.' },
  { name: 'Portabilidad', desc: 'Recibir tus datos en formato legible y transferirlos.' },
]

export default function PrivacyPolicy({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.title = 'Política de Privacidad — Tekkly'
    return () => { document.title = 'Tekkly — Automatización con IA' }
  }, [])

  return (
    <>
      <style>{css}</style>

      <nav className="pp-nav">
        <a href="#" className="pp-nav-back" onClick={e => { e.preventDefault(); onBack() }}>
          <ArrowLeft size={14} /> Volver al inicio
        </a>
        <span className="pp-nav-title">Política de Privacidad</span>
        <span className="pp-nav-badge"><ShieldCheck size={12} /> RGPD · LOPDGDD</span>
      </nav>

      <div className="pp-wrap">

        <div className="pp-hero">
          <div className="pp-tag"><ShieldCheck size={12} /> Protección de datos</div>
          <h1 className="pp-h1">Política de Privacidad</h1>
          <p className="pp-meta">
            Última actualización: <strong>20 de mayo de 2026</strong> · Conforme al <strong>RGPD (UE 2016/679)</strong>, la <strong>LOPDGDD (LO 3/2018)</strong> y la <strong>LSSI-CE (Ley 34/2002)</strong>.
          </p>
        </div>

        {/* 1. Quiénes somos */}
        <div className="pp-block">
          <div className="pp-block-title">1. Responsable del tratamiento</div>
          <p className="pp-p">
            <strong>Tekkly</strong> es el responsable del tratamiento de tus datos personales. Puedes contactarnos en <a href="mailto:tekklycom@gmail.com">tekklycom@gmail.com</a> o en el teléfono <a href="tel:+593998000699">+593 998 000 699</a>.
          </p>
        </div>

        {/* 2. Qué datos recogemos */}
        <div className="pp-block">
          <div className="pp-block-title">2. Qué datos recogemos y para qué</div>
          <p className="pp-p">Solo recogemos los datos estrictamente necesarios para cada finalidad:</p>
          <ul className="pp-list">
            <li><strong>Datos de contacto</strong> (nombre, email, teléfono opcional): para atender tu consulta y gestionar la relación comercial. Los conservamos hasta 3 años desde el último contacto.</li>
            <li><strong>Datos de clientes</strong> (identificación, facturación, sistemas integrados): para ejecutar el contrato y cumplir obligaciones fiscales. Se conservan durante la relación contractual más el plazo legal aplicable.</li>
            <li><strong>Grabaciones de voz</strong> (cuando se activan agentes Retell AI): para prestar el servicio conversacional. Se eliminan a los 90 días salvo instrucción contraria.</li>
            <li><strong>Datos de navegación</strong> (IP anonimizada, dispositivo, páginas visitadas): para analizar el tráfico y mejorar el sitio web. Máximo 13 meses.</li>
          </ul>
          <p className="pp-p">
            La base jurídica es la <strong>ejecución de un contrato</strong> (Art. 6.1.b RGPD), el <strong>interés legítimo</strong> (Art. 6.1.f) para analítica web anonimizada, o el <strong>consentimiento</strong> (Art. 6.1.a) cuando sea requerido. No tratamos categorías especiales de datos.
          </p>
        </div>

        {/* 3. Con quién compartimos */}
        <div className="pp-block">
          <div className="pp-block-title">3. Con quién compartimos tus datos</div>
          <p className="pp-p">
            No vendemos ni cedemos tus datos. Trabajamos con proveedores técnicos que actúan como encargados del tratamiento bajo contrato (Art. 28 RGPD): plataformas de automatización <strong>(N8n, UE)</strong>, agentes de voz <strong>(Retell AI, EE.UU.)</strong>, modelos de IA <strong>(OpenAI / Anthropic, EE.UU.)</strong> y base de datos <strong>(Supabase, UE)</strong>. Las transferencias fuera del EEE se realizan mediante <strong>Cláusulas Contractuales Tipo</strong> (Decisión UE 2021/914).
          </p>
        </div>

        {/* 4. Tus derechos */}
        <div className="pp-block">
          <div className="pp-block-title">4. Tus derechos</div>
          <div className="pp-rights-grid">
            {RIGHTS.map(r => (
              <div key={r.name} className="pp-right-card">
                <div className="pp-right-card-name">{r.name}</div>
                <div className="pp-right-card-desc">{r.desc}</div>
              </div>
            ))}
          </div>
          <div className="pp-callout">
            <p>
              Escríbenos a <a href="mailto:tekklycom@gmail.com">tekklycom@gmail.com</a> con el asunto <strong>"Derechos RGPD"</strong> y una copia de tu documento de identidad. Respondemos en un máximo de <strong>30 días</strong>. Si no estás satisfecho con nuestra respuesta, puedes reclamar ante la <a href="https://www.aepd.es" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.
            </p>
          </div>
        </div>

        {/* 5. Cookies */}
        <div className="pp-block">
          <div className="pp-block-title">5. Cookies</div>
          <p className="pp-p">
            Usamos cookies técnicas necesarias para que el sitio funcione. Cualquier cookie analítica o de marketing requiere tu consentimiento previo. Puedes gestionarlas en cualquier momento desde los ajustes de tu navegador.
          </p>
        </div>

        {/* 6. Cambios */}
        <div className="pp-block">
          <div className="pp-block-title">6. Cambios en esta política</div>
          <p className="pp-p">
            Si realizamos cambios relevantes, te lo comunicaremos por email o mediante un aviso en el sitio web con al menos 15 días de antelación. La versión vigente está siempre disponible en <strong>tekkly.com/#privacidad</strong>.
          </p>
        </div>

      </div>

      <footer className="pp-footer">
        <span>© 2026 Tekkly · Todos los derechos reservados</span>
        <span>
          <a href="mailto:tekklycom@gmail.com">tekklycom@gmail.com</a>
          {' · '}
          <a href="tel:+593998000699">+593 998 000 699</a>
        </span>
      </footer>
    </>
  )
}
