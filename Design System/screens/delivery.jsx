// LogiSync — Baixa da Entrega
// Estrutura comum: dados do cliente + leitor de código + assinatura + CTA
// 3 mecânicas de confirmação: Swipe, Hold, Double-tap

function DeliveryHeader({ connState = "online", queue = 3, seq = 3, total = 18 }) {
  return (
    <div style={{ padding:"0 22px 14px", display:"flex", flexDirection:"column", gap: 10 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          border:"0.5px solid var(--ls-line)", background:"var(--ls-surface)",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3L5 9l6 6"/></svg>
        </button>
        <ConnRibbon state={connState} queue={queue} />
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          border:"0.5px solid var(--ls-line)", background:"var(--ls-surface)",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}>
          <Icon.More width="18" height="18" />
        </button>
      </div>

      <div>
        <div className="ls-overline">Entrega {seq}/{total} · ML-7822-C</div>
        <div className="ls-display-lg" style={{ marginTop: 2 }}>R. Frei Caneca, 569</div>
        <div style={{ display:"flex", alignItems:"center", gap: 10, marginTop: 4 }}>
          <span style={{ fontSize: 13, color:"var(--ls-ink-3)" }}>J. Bertolini · 12,1 kg · Volumoso</span>
        </div>
      </div>
    </div>
  );
}

// Scanner area
function ScannerBlock({ scanned = true }) {
  return (
    <div style={{ margin:"0 22px 14px", borderRadius:"var(--ls-r-lg)", overflow:"hidden",
      background:"var(--ls-ink)", color:"white", position:"relative", aspectRatio: "16/10",
    }}>
      {/* Câmera placeholder */}
      <div style={{ position:"absolute", inset: 0, background:
        "radial-gradient(circle at 30% 40%, oklch(0.30 0.04 250), oklch(0.10 0.01 250) 70%)" }}/>
      {/* Crosshair frame */}
      <div style={{ position:"absolute", inset: "22% 14%", border:"2px solid var(--ls-accent)", borderRadius: 10, boxShadow:"0 0 0 9999px rgba(15,17,21,.5)" }}>
        {["tl","tr","bl","br"].map(c => {
          const pos = { tl:{top:-2,left:-2}, tr:{top:-2,right:-2}, bl:{bottom:-2,left:-2}, br:{bottom:-2,right:-2} }[c];
          return <span key={c} style={{ position:"absolute", ...pos, width: 18, height: 18, borderColor:"var(--ls-accent)", borderStyle:"solid", borderWidth: c[0]==="t"?"2.5px 0 0 0":"0 0 2.5px 0", borderLeftWidth: c[1]==="l"?2.5:0, borderRightWidth: c[1]==="r"?2.5:0 }}/>;
        })}
        <div style={{ position:"absolute", left: 8, top: -8, transform:"translateY(-100%)",
          fontFamily:"var(--ls-font-mono)", fontSize: 10, color:"var(--ls-accent)", letterSpacing: 0.1, textTransform:"uppercase" }}>
          Mire no código de barras
        </div>
      </div>

      {/* Scan result overlay */}
      {scanned && (
        <div style={{ position:"absolute", left: 16, right: 16, bottom: 16,
          background:"rgba(255,255,255,.96)", color:"var(--ls-ink)",
          padding:"10px 14px", borderRadius: 12, display:"flex", alignItems:"center", gap: 10,
          backdropFilter:"blur(8px)",
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background:"var(--ls-online-bg)", color:"var(--ls-online)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon.Check width="16" height="16" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="ls-mono" style={{ fontSize: 12, fontWeight: 500 }}>ML-7822-C · 7891234567890</div>
            <div style={{ fontSize: 11, color:"var(--ls-ink-3)" }}>Lido em 0,8s · cache local</div>
          </div>
          <Icon.Refresh width="16" height="16" />
        </div>
      )}
    </div>
  );
}

// Signature pad
function SignatureBlock({ signed = true }) {
  return (
    <div style={{ margin:"0 22px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom: 8 }}>
        <div className="ls-overline">Assinatura digital</div>
        <button style={{ background:"transparent", border:"none", fontFamily:"var(--ls-font-mono)", fontSize: 11, color:"var(--ls-ink-3)", textDecoration:"underline", cursor:"pointer" }}>limpar</button>
      </div>
      <div style={{
        height: 90, borderRadius: "var(--ls-r-md)",
        background:"var(--ls-surface)", border:"1px dashed var(--ls-line-2)",
        position:"relative", overflow:"hidden",
      }}>
        {signed ? (
          <svg viewBox="0 0 300 80" style={{ width:"100%", height:"100%" }}>
            <path d="M20 55 Q 38 30 56 50 T 92 42 Q 110 18 130 50 T 175 35 Q 195 60 220 35 Q 245 22 270 50" stroke="var(--ls-ink)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <text x="20" y="74" fontFamily="var(--ls-font-mono)" fontSize="9" fill="var(--ls-ink-4)">J. BERTOLINI · CPF ***.456.789-** · 08:42</text>
          </svg>
        ) : (
          <div style={{ position:"absolute", inset: 0, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ls-ink-4)", fontSize: 12 }}>
            Recolha a assinatura aqui
          </div>
        )}
      </div>
    </div>
  );
}

// ─── A · Swipe to confirm ───────────────────────────────────────
function SwipeConfirm() {
  // Estado visual estático: thumb 40% percorrido
  const progress = 0.4;
  return (
    <div style={{
      position:"absolute", left: 18, right: 18, bottom: 18,
      height: 72, borderRadius: "var(--ls-r-lg)",
      background:"var(--ls-ink)", overflow:"hidden",
      display:"flex", alignItems:"center", paddingRight: 22,
    }}>
      {/* trilho */}
      <div style={{
        position:"absolute", inset: 0,
        background: "linear-gradient(90deg, color-mix(in oklch, var(--ls-primary) 80%, transparent), transparent)",
        width: `${100*progress}%`,
      }}/>

      {/* thumb */}
      <div style={{
        position:"absolute", top: 6, bottom: 6,
        left: `calc(${100*progress}% - 60px)`,
        width: 60, borderRadius: 14,
        background:"var(--ls-accent)",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 6px 16px -4px rgba(0,0,0,.4)",
      }}>
        <Icon.Arrow width="22" height="22" />
      </div>

      <div style={{ flex: 1, textAlign:"center", color:"rgba(255,255,255,.85)",
        fontFamily:"var(--ls-font-display)", fontWeight: 500, fontSize: 15, letterSpacing: 0.04,
      }}>
        Deslize para confirmar entrega →
      </div>
    </div>
  );
}

// ─── B · Hold to confirm ────────────────────────────────────────
function HoldConfirm() {
  // ~62% preenchido
  const pct = 0.62;
  const R = 36, C = 2 * Math.PI * R;
  return (
    <div style={{
      position:"absolute", left: 0, right: 0, bottom: 0,
      padding: "18px 22px 22px",
      background: "linear-gradient(to top, var(--ls-bg) 70%, transparent)",
      display:"flex", flexDirection:"column", alignItems:"center", gap: 10,
    }}>
      <div style={{ fontSize: 13, color: "var(--ls-ink-3)", fontFamily:"var(--ls-font-mono)" }}>
        Pressione e segure para confirmar
      </div>

      <button style={{
        position:"relative",
        width: 110, height: 110, borderRadius:"50%",
        border:"none", cursor:"pointer",
        background:"var(--ls-ink)",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 12px 28px -8px rgba(15,17,21,.4)",
      }}>
        <svg width="110" height="110" style={{ position:"absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6"/>
          <circle cx="55" cy="55" r={R} fill="none"
            stroke="var(--ls-accent)" strokeWidth="6"
            strokeDasharray={C} strokeDashoffset={C * (1-pct)} strokeLinecap="round" />
        </svg>
        <div style={{ color:"white", display:"flex", flexDirection:"column", alignItems:"center", gap: 2 }}>
          <Icon.Check width="28" height="28" />
          <div className="ls-mono" style={{ fontSize: 11, opacity: .8 }}>1.2s</div>
        </div>
      </button>

      <div style={{ display:"flex", gap: 8, alignItems:"center", fontSize: 11, color:"var(--ls-ink-4)" }}>
        <Icon.Lightning width="11" height="11" />
        <span>Solte para cancelar</span>
      </div>
    </div>
  );
}

// ─── C · Double-tap (com countdown de armar) ────────────────────
function DoubleTapConfirm({ armed = true }) {
  return (
    <div style={{
      position:"absolute", left: 18, right: 18, bottom: 18,
      display:"flex", flexDirection:"column", gap: 8,
    }}>
      {armed && (
        <div style={{
          display:"flex", alignItems:"center", gap: 10,
          padding:"8px 12px", borderRadius: 10,
          background:"color-mix(in oklch, var(--ls-accent) 25%, transparent)",
          border: "0.5px solid color-mix(in oklch, var(--ls-accent-deep) 50%, transparent)",
          color: "var(--ls-ink)",
        }}>
          <Icon.Warning width="14" height="14" />
          <div style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>
            Armado · toque novamente para confirmar
          </div>
          <div className="ls-mono" style={{ fontSize: 13, fontWeight: 600 }}>2.4s</div>
        </div>
      )}
      <button style={{
        width:"100%", height: 72, borderRadius:"var(--ls-r-lg)",
        border: "none",
        background: armed ? "var(--ls-accent)" : "var(--ls-primary)",
        color: armed ? "var(--ls-ink)" : "white",
        fontFamily:"var(--ls-font-display)", fontWeight: 600, fontSize: 17,
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap: 10,
        boxShadow: armed ? "0 8px 20px -6px color-mix(in oklch, var(--ls-accent-deep) 70%, transparent)" : "var(--ls-shadow-cta)",
      }}>
        <Icon.Check width="22" height="22"/>
        {armed ? "Tocar para confirmar" : "Confirmar entrega"}
      </button>
    </div>
  );
}

// ─── Composições por mecânica ───────────────────────────────────
function DeliverySwipe({ connState = "online", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <DeliveryHeader connState={connState} queue={queue} />
      <ScannerBlock />
      <SignatureBlock />
      <SwipeConfirm />
    </Phone>
  );
}

function DeliveryHold({ connState = "online", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <DeliveryHeader connState={connState} queue={queue} />
      <ScannerBlock />
      <SignatureBlock />
      <HoldConfirm />
    </Phone>
  );
}

function DeliveryDoubleTap({ connState = "online", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <DeliveryHeader connState={connState} queue={queue} />
      <ScannerBlock />
      <SignatureBlock />
      <DoubleTapConfirm armed />
    </Phone>
  );
}

Object.assign(window, { DeliverySwipe, DeliveryHold, DeliveryDoubleTap });
