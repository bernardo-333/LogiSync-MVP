// LogiSync — Modo Estoquista
// Centro de Distribuição. Coloração com mais peso âmbar para sinalizar
// "modo armazém" (vs azul "modo rua"). Foco: receber, contar, separar.

function StockistMode({ connState = "online", queue = 0 }) {
  return (
    <Phone>
      <StatusBar />
      {/* Mode header com sash âmbar */}
      <div style={{ padding:"0 22px 14px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap: 6,
              padding:"3px 10px", borderRadius: 999,
              background:"var(--ls-accent)", color:"var(--ls-ink)",
              fontFamily:"var(--ls-font-mono)", fontSize: 10.5, fontWeight: 700, letterSpacing: .06, textTransform:"uppercase",
            }}>
              <Icon.Stack width="11" height="11"/> Modo Estoquista
            </div>
            <div className="ls-display-lg" style={{ marginTop: 6 }}>CD Cajamar · Doca 4</div>
          </div>
          <ConnRibbon state={connState} queue={queue} />
        </div>
      </div>

      {/* Big action — scan to receive */}
      <div style={{ margin:"0 22px 14px", padding:"18px 18px 16px", borderRadius:"var(--ls-r-lg)",
        background: "var(--ls-ink)", color:"white", position:"relative", overflow:"hidden",
      }}>
        <div className="ls-overline" style={{ color:"var(--ls-accent)" }}>Próxima ação</div>
        <div className="ls-display-md" style={{ color: "white", marginTop: 4 }}>Receber lote AP-2298</div>
        <div style={{ fontSize: 12.5, color:"rgba(255,255,255,.65)", marginTop: 4 }}>
          Caminhão #182 · 248 volumes · 1.840 kg
        </div>

        <button style={{
          width:"100%", marginTop: 14, height: 56, borderRadius:"var(--ls-r-md)",
          background:"var(--ls-accent)", color:"var(--ls-ink)", border:"none",
          fontFamily:"var(--ls-font-display)", fontWeight: 600, fontSize: 15,
          display:"flex", alignItems:"center", justifyContent:"center", gap: 10, cursor:"pointer",
        }}>
          <Icon.Scan width="20" height="20"/>
          Escanear volume
        </button>
      </div>

      {/* Progress: lote em recebimento */}
      <div style={{ margin:"0 22px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom: 6 }}>
          <div className="ls-overline">Lote em recebimento</div>
          <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-3)" }}>137/248</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background:"var(--ls-line)", overflow:"hidden", display:"flex" }}>
          <div style={{ width:"55%",  background:"var(--ls-online)"  }}/>
          <div style={{ width:"8%",   background:"var(--ls-syncing)" }}/>
          <div style={{ width:"2%",   background:"var(--ls-danger)"  }}/>
        </div>
        <div style={{ display:"flex", gap: 14, marginTop: 8, fontSize: 11.5 }}>
          <LegendDot color="var(--ls-online)"  label="Conferido" val="137"/>
          <LegendDot color="var(--ls-syncing)" label="Aguarda" val="21"/>
          <LegendDot color="var(--ls-danger)"  label="Divergência" val="5"/>
        </div>
      </div>

      {/* Itens recentes */}
      <div className="ls-overline" style={{ padding:"0 22px 6px" }}>Últimas leituras</div>
      <div style={{ padding:"0 22px", overflowY:"auto", height: SCREEN_H - 480 }}>
        <BinRow code="7891234567812" title="Smart TV 50″ AOC" sku="ML-AOC-50-4K" bin="A-12-04" status="ok" />
        <BinRow code="7891234571203" title="Geladeira Frost Free 410L" sku="ML-CON-FF410" bin="C-04-01" status="ok" />
        <BinRow code="7891234572109" title="Cafeteira Inox 1.2L" sku="ML-PHI-CAF12" bin="B-09-22" status="warn" warn="Bin C-04 cheio · realocado" />
        <BinRow code="7891234580023" title="Notebook 14″ i5/8GB" sku="ML-LEN-14-I5" bin="—"       status="error" error="EAN fora da NF · separar" />
        <BinRow code="7891234589003" title="Smartphone 128GB" sku="ML-MOT-G54"    bin="—"       status="pending"/>
        <BinRow code="7891234560006" title="Air Fryer 4L" sku="ML-MOL-AF4"        bin="B-12-08" status="ok"/>
        <div style={{ height: 80 }}/>
      </div>

      {/* Tab bar */}
      <div style={{
        position:"absolute", left: 12, right: 12, bottom: 12, height: 60,
        background:"var(--ls-surface)", borderRadius:"var(--ls-r-lg)",
        border:"0.5px solid var(--ls-line)", boxShadow:"var(--ls-shadow-card)",
        display:"flex", alignItems:"center", padding: "0 8px",
      }}>
        {[
          { ic: <Icon.Stack width="20" height="20"/>,  lbl:"Estoque", on: true },
          { ic: <Icon.Scan  width="20" height="20"/>,  lbl:"Receber" },
          { ic: <Icon.Box   width="20" height="20"/>,  lbl:"Separar" },
          { ic: <Icon.Cloud width="20" height="20"/>,  lbl:"Sync", badge: 2 },
        ].map((t,i) => (
          <button key={i} style={{
            flex: 1, height: 48, border:"none", background:"transparent", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 2,
            color: t.on ? "var(--ls-ink)" : "var(--ls-ink-4)", position:"relative",
            borderRadius: 10,
          }}>
            {t.ic}
            <span style={{ fontSize: 10, fontWeight: 500, fontFamily:"var(--ls-font-mono)" }}>{t.lbl}</span>
            {t.badge && <span style={{ position:"absolute", top: 6, right: "28%",
              minWidth: 14, height: 14, padding:"0 4px", borderRadius: 7,
              background:"var(--ls-accent)", color:"var(--ls-ink)",
              fontSize: 9, fontWeight: 700, display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"var(--ls-font-mono)",
            }}>{t.badge}</span>}
            {t.on && <span style={{ position:"absolute", bottom: 4, width: 16, height: 2, borderRadius: 1, background:"var(--ls-ink)" }}/>}
          </button>
        ))}
      </div>
    </Phone>
  );
}

function LegendDot({ color, label, val }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap: 5 }}>
      <span style={{ width: 7, height: 7, borderRadius: 4, background: color }}/>
      <span style={{ color:"var(--ls-ink-3)" }}>{label}</span>
      <span className="ls-mono" style={{ fontWeight: 600, color:"var(--ls-ink-2)" }}>{val}</span>
    </div>
  );
}

function BinRow({ code, title, sku, bin, status, warn, error }) {
  const map = {
    ok:      { fg:"var(--ls-online)",  bg:"var(--ls-online-bg)",   icon: <Icon.Check width="13" height="13"/> },
    warn:    { fg:"var(--ls-syncing)", bg:"var(--ls-syncing-bg)",  icon: <Icon.Warning width="13" height="13"/> },
    error:   { fg:"var(--ls-danger)",  bg:"color-mix(in oklch, var(--ls-danger) 12%, transparent)", icon: <span style={{ fontWeight:700 }}>!</span> },
    pending: { fg:"var(--ls-offline)", bg:"var(--ls-offline-bg)",  icon: <span style={{ width:6, height:6, borderRadius:3, background:"currentColor" }}/> },
  };
  const m = map[status];
  return (
    <div style={{
      display:"flex", alignItems:"center", gap: 12,
      padding:"10px 12px", borderRadius: "var(--ls-r-sm)",
      borderBottom:"0.5px solid var(--ls-line)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: m.bg, color: m.fg,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink: 0,
      }}>{m.icon}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display:"flex", alignItems:"center", gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color:"var(--ls-ink)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{title}</span>
        </div>
        <div className="ls-mono" style={{ fontSize: 10.5, color:"var(--ls-ink-4)", marginTop: 1 }}>
          {code} · {sku}
        </div>
        {warn  && <div style={{ fontSize: 11, color:"var(--ls-syncing)", marginTop: 2, fontWeight: 500 }}>{warn}</div>}
        {error && <div style={{ fontSize: 11, color:"var(--ls-danger)", marginTop: 2, fontWeight: 500 }}>{error}</div>}
      </div>

      <div style={{ textAlign:"right", flexShrink: 0 }}>
        <div className="ls-overline" style={{ fontSize: 9.5 }}>Bin</div>
        <div className="ls-mono" style={{ fontSize: 13, fontWeight: 600, color: status === "error" ? "var(--ls-ink-4)" : "var(--ls-ink)", letterSpacing: 0.04 }}>{bin}</div>
      </div>
    </div>
  );
}

Object.assign(window, { StockistMode });
