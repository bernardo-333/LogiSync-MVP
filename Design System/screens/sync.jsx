// LogiSync — Fila de Sincronização
// Linguagem visual de offline / em cache:
//   • Tracejado pontilhado (dashed) na borda
//   • Tipografia "fantasma" (cor reduzida) com selo monospace
//   • Hatch listrado sutil para itens em trânsito de sync
//   • Glow âmbar e contador de progresso quando online

const QUEUE_DATA = [
  { kind: "Entrega",  code: "ML-7822-C", info: "R. Frei Caneca, 569",      time: "08:42", size:"12 KB", state: "queued",    has_signature: true,  has_photo: true  },
  { kind: "Coleta",   code: "ML-7820-X", info: "CD Guarulhos · Doca 4",    time: "08:28", size:"4 KB",  state: "queued",    has_signature: false, has_photo: false },
  { kind: "Entrega",  code: "ML-7820-B", info: "R. Pamplona, 1200 · 5º",   time: "08:14", size:"86 KB", state: "syncing",   progress: 0.65,       has_signature: true, has_photo: true },
  { kind: "Entrega",  code: "ML-7820",   info: "R. Estados Unidos, 432",   time: "08:02", size:"54 KB", state: "synced",    has_signature: true,  has_photo: true  },
  { kind: "Status",   code: "—",         info: "Saída do CD · Vaivém #182", time: "07:48", size:"1 KB",  state: "synced" },
  { kind: "Entrega",  code: "ML-7819-Z", info: "Av. Faria Lima, 4221",     time: "ontem", size:"28 KB", state: "failed",    error: "Foto corrompida · re-tentar" },
];

function SyncHeader({ connState = "syncing", queue = 3 }) {
  const onlineLabel = {
    online:  "Conectado · sincronização imediata",
    syncing: "Conectado · enviando para servidor",
    offline: "Offline · tudo salvo localmente",
  }[connState];
  return (
    <div style={{ padding:"0 22px 14px", display:"flex", flexDirection:"column", gap: 10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div className="ls-overline">Fila local · device://logisync.cache</div>
          <div className="ls-display-lg" style={{ marginTop: 2 }}>Sincronização</div>
        </div>
        <ConnRibbon state={connState} queue={queue} />
      </div>
      <div style={{ fontSize: 12.5, color:"var(--ls-ink-3)" }}>{onlineLabel}</div>
    </div>
  );
}

// Stats: pendentes / em trânsito / falhas
function SyncStats() {
  return (
    <div style={{ margin:"0 22px 14px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 8 }}>
      {[
        { lbl:"Pendentes", val:"2",  hint:"108 KB",  color:"var(--ls-offline)",  bg:"var(--ls-offline-bg)" },
        { lbl:"Enviando",  val:"1",  hint:"em trânsito", color:"var(--ls-syncing)", bg:"var(--ls-syncing-bg)" },
        { lbl:"Falhas",    val:"1",  hint:"re-tentar", color:"var(--ls-danger)",  bg:"color-mix(in oklch, var(--ls-danger) 10%, transparent)" },
      ].map((s,i) => (
        <div key={i} style={{ padding:"10px 12px", borderRadius:"var(--ls-r-md)", background: s.bg }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.06, textTransform:"uppercase", color: s.color, fontFamily:"var(--ls-font-mono)" }}>{s.lbl}</div>
          <div style={{ fontFamily:"var(--ls-font-display)", fontSize: 22, fontWeight: 600, color:"var(--ls-ink)", lineHeight: 1.1, marginTop: 4 }}>{s.val}</div>
          <div style={{ fontSize: 11, color:"var(--ls-ink-3)", marginTop: 2 }}>{s.hint}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Variation A: Lista cronológica ─────────────────────────────
function SyncQueueList({ connState = "syncing", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <SyncHeader connState={connState} queue={queue} />
      <SyncStats />

      <div style={{ overflowY:"auto", height: SCREEN_H - 290, padding:"0 22px 80px" }}>
        {QUEUE_DATA.map((q, i) => <QueueRow key={i} item={q} />)}
      </div>

      <div style={{ position:"absolute", left: 22, right: 22, bottom: 22 }}>
        <button className="ls-cta" style={{
          background: connState === "offline" ? "var(--ls-line)" : "var(--ls-primary)",
          color: connState === "offline" ? "var(--ls-ink-3)" : "white",
        }}>
          <Icon.Cloud width="20" height="20"/>
          {connState === "offline" ? "Aguardando sinal" : "Forçar sincronização"}
        </button>
      </div>
    </Phone>
  );
}

function QueueRow({ item }) {
  const { state } = item;
  const isQueued  = state === "queued";
  const isSyncing = state === "syncing";
  const isSynced  = state === "synced";
  const isFailed  = state === "failed";

  const palette = isFailed ? "var(--ls-danger)" : isSyncing ? "var(--ls-syncing)" : isSynced ? "var(--ls-online)" : "var(--ls-offline)";

  return (
    <div style={{
      position:"relative",
      padding: "12px 14px",
      borderRadius: "var(--ls-r-md)",
      marginBottom: 8,
      background: isSyncing ? "var(--ls-surface)" : isQueued ? "transparent" : "var(--ls-surface)",
      border: isQueued ? "1px dashed color-mix(in oklch, var(--ls-offline) 50%, transparent)" : "0.5px solid var(--ls-line)",
      overflow:"hidden",
    }}>
      {isSyncing && <div className="ls-hatch" style={{ position:"absolute", inset: 0, opacity: 0.5, pointerEvents:"none" }}/>}

      <div style={{ position:"relative", display:"flex", alignItems:"flex-start", gap: 12 }}>
        <SyncDot state={state} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display:"flex", alignItems:"center", gap: 8, marginBottom: 2 }}>
            <span className="ls-overline" style={{ color: palette, fontSize: 10 }}>{item.kind}</span>
            <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)" }}>{item.code}</span>
            <span style={{ flex: 1 }}/>
            <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)" }}>{item.time}</span>
          </div>
          <div className="ls-h2" style={{
            color: isQueued ? "var(--ls-ink-2)" : "var(--ls-ink)",
            opacity: isSynced ? 0.55 : 1,
          }}>{item.info}</div>

          {/* artefatos */}
          <div style={{ display:"flex", alignItems:"center", gap: 10, marginTop: 6 }}>
            {item.has_signature && <Chip icon={<Icon.Check width="11" height="11"/>} label="assinatura"/>}
            {item.has_photo     && <Chip icon={<Icon.Box   width="11" height="11"/>} label="foto"/>}
            <Chip mono label={item.size}/>
            {isFailed && <span style={{ fontSize: 11, color:"var(--ls-danger)", fontWeight: 500 }}>· {item.error}</span>}
          </div>

          {/* progresso */}
          {isSyncing && (
            <div style={{ marginTop: 8, display:"flex", alignItems:"center", gap: 8 }}>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background:"var(--ls-line)", overflow:"hidden" }}>
                <div style={{ width: `${item.progress*100}%`, height:"100%", background:"var(--ls-syncing)" }}/>
              </div>
              <span className="ls-mono" style={{ fontSize: 10, color:"var(--ls-syncing)", fontWeight: 600 }}>{Math.round(item.progress*100)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ icon, label, mono }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap: 4,
      padding:"2px 6px", borderRadius: 4,
      background:"var(--ls-line)", color:"var(--ls-ink-3)",
      fontSize: 10.5, fontWeight: 500,
      fontFamily: mono ? "var(--ls-font-mono)" : "var(--ls-font-body)",
    }}>{icon}{label}</span>
  );
}

function SyncDot({ state }) {
  if (state === "syncing") {
    return (
      <div style={{ width: 22, height: 22, position:"relative", marginTop: 2 }}>
        <svg width="22" height="22" style={{ transform:"rotate(-90deg)" }}>
          <circle cx="11" cy="11" r="9" fill="none" stroke="var(--ls-line)" strokeWidth="2"/>
          <circle cx="11" cy="11" r="9" fill="none" stroke="var(--ls-syncing)" strokeWidth="2"
            strokeDasharray={2*Math.PI*9} strokeDashoffset={2*Math.PI*9*0.35} strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 11 11" to="360 11 11" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    );
  }
  if (state === "synced") {
    return <div style={{ width: 22, height: 22, marginTop: 2, borderRadius: 11, background:"var(--ls-online-bg)", color:"var(--ls-online)", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon.Check width="14" height="14"/></div>;
  }
  if (state === "failed") {
    return <div style={{ width: 22, height: 22, marginTop: 2, borderRadius: 11, background:"color-mix(in oklch, var(--ls-danger) 15%, transparent)", color:"var(--ls-danger)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight: 700, fontSize: 12 }}>!</div>;
  }
  // queued
  return <div style={{ width: 22, height: 22, marginTop: 2, borderRadius: 11, border:"1.5px dashed var(--ls-offline)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ width: 6, height: 6, borderRadius: 3, background:"var(--ls-offline)" }}/></div>;
}

// ─── Variation B: Blocks grid ───────────────────────────────────
function SyncQueueBlocks({ connState = "syncing", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <SyncHeader connState={connState} queue={queue} />

      {/* Progress hero — quando online, mostra fluxo de sync */}
      <div style={{ margin:"0 22px 16px", padding: 16, borderRadius:"var(--ls-r-lg)",
        background:"var(--ls-ink)", color:"white", position:"relative", overflow:"hidden" }}>
        <div className="ls-hatch" style={{ position:"absolute", inset: 0, opacity: 0.2 }}/>
        <div style={{ position:"relative" }}>
          <div className="ls-overline" style={{ color:"var(--ls-accent)" }}>Sincronizando agora</div>
          <div className="ls-display-lg" style={{ marginTop: 2, color:"white" }}>3<span style={{ color:"rgba(255,255,255,.5)", fontWeight: 500 }}>/4</span> tarefas</div>
          <div style={{ height: 6, borderRadius: 3, background:"rgba(255,255,255,.15)", marginTop: 14, overflow:"hidden" }}>
            <div style={{ width:"68%", height:"100%", background:"var(--ls-accent)" }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop: 6, fontFamily:"var(--ls-font-mono)", fontSize: 11 }}>
            <span style={{ color: "rgba(255,255,255,.7)" }}>148 KB de 218 KB</span>
            <span style={{ color: "var(--ls-accent)" }}>00:23 restante</span>
          </div>
        </div>
      </div>

      <div className="ls-overline" style={{ padding:"0 22px 8px" }}>Tarefas na fila</div>
      <div style={{ padding:"0 22px 80px", overflowY:"auto", height: SCREEN_H - 410,
        display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8 }}>
        {QUEUE_DATA.map((q, i) => <QueueBlock key={i} item={q} />)}
      </div>
    </Phone>
  );
}

function QueueBlock({ item }) {
  const { state } = item;
  const palette = state === "failed" ? "var(--ls-danger)" : state === "syncing" ? "var(--ls-syncing)" : state === "synced" ? "var(--ls-online)" : "var(--ls-offline)";
  const isQueued = state === "queued";
  return (
    <div style={{
      padding: 12,
      borderRadius: "var(--ls-r-md)",
      border: isQueued ? "1px dashed color-mix(in oklch, var(--ls-offline) 55%, transparent)" : "0.5px solid var(--ls-line)",
      background: isQueued ? "transparent" : "var(--ls-surface)",
      position:"relative", overflow:"hidden",
      aspectRatio:"1/1",
      display:"flex", flexDirection:"column", justifyContent:"space-between",
    }}>
      {state === "syncing" && <div className="ls-hatch" style={{ position:"absolute", inset:0, opacity: .4, pointerEvents:"none" }}/>}
      <div style={{ position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 8 }}>
          <SyncDot state={state} />
          <span className="ls-mono" style={{ fontSize: 10, color:"var(--ls-ink-4)" }}>{item.time}</span>
        </div>
        <div className="ls-overline" style={{ color: palette, fontSize: 9.5 }}>{item.kind}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color:"var(--ls-ink)", marginTop: 2, lineHeight: 1.25,
          display:"-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient:"vertical", overflow:"hidden",
          opacity: state === "synced" ? .55 : 1,
        }}>{item.info}</div>
      </div>
      <div style={{ position:"relative" }}>
        <div className="ls-mono" style={{ fontSize: 10, color:"var(--ls-ink-4)" }}>{item.code}</div>
        {state === "syncing" && (
          <div style={{ height: 3, borderRadius: 2, background:"var(--ls-line)", marginTop: 6, overflow:"hidden" }}>
            <div style={{ width:`${item.progress*100}%`, height:"100%", background:"var(--ls-syncing)" }}/>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Variation C: Timeline vertical ─────────────────────────────
function SyncQueueTimeline({ connState = "syncing", queue = 3 }) {
  // Agrupar por status: failed > queued > syncing > synced
  const groups = [
    { title: "Aguardando sinal", items: QUEUE_DATA.filter(q => q.state === "queued") },
    { title: "Em trânsito",      items: QUEUE_DATA.filter(q => q.state === "syncing") },
    { title: "Sincronizado",     items: QUEUE_DATA.filter(q => q.state === "synced") },
    { title: "Re-tentar",        items: QUEUE_DATA.filter(q => q.state === "failed") },
  ];
  return (
    <Phone>
      <StatusBar />
      <SyncHeader connState={connState} queue={queue} />
      <SyncStats />

      <div style={{ overflowY:"auto", height: SCREEN_H - 290, padding:"0 22px 60px" }}>
        {groups.map((g, gi) => g.items.length > 0 && (
          <div key={gi} style={{ marginBottom: 14 }}>
            <div style={{ display:"flex", alignItems:"center", gap: 8, marginBottom: 8 }}>
              <div className="ls-overline">{g.title}</div>
              <div style={{ flex: 1, height: 0.5, background:"var(--ls-line)" }}/>
              <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)" }}>{g.items.length}</span>
            </div>
            <div style={{ paddingLeft: 4 }}>
              {g.items.map((q, i) => (
                <div key={i} style={{ display:"flex", gap: 12, paddingBottom: 10, position:"relative" }}>
                  <div style={{ width: 22, display:"flex", flexDirection:"column", alignItems:"center", flexShrink: 0 }}>
                    <SyncDot state={q.state} />
                    {i < g.items.length - 1 && <div style={{ flex: 1, width: 1.5, background: q.state === "queued" ? "var(--ls-offline)" : "var(--ls-line-2)", marginTop: 2, opacity: q.state === "queued" ? 0.5 : 1, ...(q.state === "queued" && { backgroundImage:"linear-gradient(to bottom, var(--ls-offline) 50%, transparent 50%)", backgroundSize:"1px 6px", background:"none", borderLeft:"1.5px dashed var(--ls-offline)" }) }}/>}
                  </div>
                  <div style={{ flex: 1, padding:"2px 0 12px" }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap: 8 }}>
                      <span className="ls-h2">{q.info}</span>
                      <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)", marginLeft:"auto" }}>{q.time}</span>
                    </div>
                    <div style={{ marginTop: 3, display:"flex", alignItems:"center", gap: 8 }}>
                      <span className="ls-mono" style={{ fontSize: 10.5, color:"var(--ls-ink-4)" }}>{q.kind} · {q.code}</span>
                      <span className="ls-mono" style={{ fontSize: 10.5, color:"var(--ls-ink-4)" }}>{q.size}</span>
                      {q.state === "syncing" && (
                        <span style={{ display:"inline-flex", alignItems:"center", gap: 4, color:"var(--ls-syncing)", fontFamily:"var(--ls-font-mono)", fontSize: 10.5, fontWeight: 600 }}>
                          ↑ {Math.round(q.progress*100)}%
                        </span>
                      )}
                      {q.state === "failed" && <span style={{ fontSize: 11, color:"var(--ls-danger)", fontWeight: 500 }}>{q.error}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

Object.assign(window, { SyncQueueList, SyncQueueBlocks, SyncQueueTimeline });
