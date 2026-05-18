// LogiSync — Shared UI primitives
// StatusBar, ConnectionRibbon, icons, package row primitives.

const SCREEN_W = 380;
const SCREEN_H = 800;

// ─── Status bar ─────────────────────────────────────────────────
function StatusBar({ time = "08:42", dark }) {
  const fg = "var(--ls-ink)";
  return (
    <div className="ls-statusbar">
      <span>{time}</span>
      <div className="ls-sb-right">
        {/* signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0"  y="7" width="3" height="4" rx="0.5" fill={fg}/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={fg}/>
          <rect x="9"  y="2.5" width="3" height="8.5" rx="0.5" fill={fg}/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={fg} opacity=".35"/>
        </svg>
        {/* battery */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={fg} strokeOpacity=".6"/>
          <rect x="2" y="2" width="14" height="8" rx="1.5" fill={fg}/>
          <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill={fg} opacity=".6"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Connection ribbon ──────────────────────────────────────────
function ConnRibbon({ state = "online", queue = 0, compact = false }) {
  const labels = {
    online:   "Conectado",
    syncing:  `Sincronizando · ${queue}`,
    offline:  `Offline · ${queue} na fila`,
  };
  return (
    <div className="ls-conn" data-state={state}>
      <span className="ls-conn-dot" />
      <span>{labels[state]}</span>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────
const Icon = {
  Box:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4"/><path d="M12 11v10"/></svg>,
  Pin:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Clock:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  Arrow:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  Check:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6"/></svg>,
  Scan:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><path d="M7 8v8M11 8v8M15 8v8M19 8v8" opacity=".5"/></svg>,
  Lightning:(p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>,
  Cloud:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 18H7a5 5 0 010-10 6 6 0 0111.5 1.5A4 4 0 0117 18z"/></svg>,
  CloudOff:(p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3l18 18"/><path d="M17 18H7a5 5 0 01-3.5-8.5"/><path d="M8.5 6.5A6 6 0 0118.5 9.5 4 4 0 0119 17.5"/></svg>,
  Refresh: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>,
  Filter:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></svg>,
  More:    (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
  Phone:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7 12 12 0 00.7 2.7 2 2 0 01-.5 2.1L8.1 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5 12 12 0 002.7.7 2 2 0 011.7 2z"/></svg>,
  Stack:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l9 4-9 4-9-4 9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 18l9 4 9-4"/></svg>,
  Plus:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Search:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  Warning: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5"/><circle cx="12" cy="18" r=".8" fill="currentColor"/></svg>,
};

// ─── Priority badge ─────────────────────────────────────────────
function PriorityBadge({ kind }) {
  const map = {
    late:     { label: "Atrasado",   bg: "color-mix(in oklch, var(--ls-danger) 12%, transparent)",  fg: "var(--ls-danger)",  border: "color-mix(in oklch, var(--ls-danger) 35%, transparent)" },
    priority: { label: "Prioridade", bg: "var(--ls-accent)",                                          fg: "var(--ls-ink)",     border: "transparent" },
    fragile:  { label: "Frágil",     bg: "color-mix(in oklch, var(--ls-warn) 18%, transparent)",    fg: "var(--ls-ink-2)",   border: "transparent" },
    cold:     { label: "Refrigerado",bg: "color-mix(in oklch, var(--ls-primary) 12%, transparent)", fg: "var(--ls-primary)", border: "transparent" },
    big:      { label: "Volumoso",   bg: "var(--ls-line)",                                           fg: "var(--ls-ink-2)",   border: "transparent" },
  };
  const m = map[kind] || map.fragile;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      fontSize: 10.5, fontWeight: 600, letterSpacing: 0.04, textTransform: "uppercase",
      background: m.bg, color: m.fg,
      border: `0.5px solid ${m.border}`,
      fontFamily: "var(--ls-font-mono)",
    }}>{m.label}</span>
  );
}

// Phone frame (just inner — no bezel, since canvas mode)
function Phone({ children, screen = "ls-screen", dark }) {
  return (
    <div className={screen} data-theme={dark ? "dark" : undefined}>
      {children}
    </div>
  );
}

Object.assign(window, { SCREEN_W, SCREEN_H, StatusBar, ConnRibbon, Icon, PriorityBadge, Phone });
