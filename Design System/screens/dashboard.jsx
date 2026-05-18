// LogiSync — Dashboard do Entregador (Rota)
// 3 variações: cards, lista densa, timeline horária.

// Dados compartilhados (rota do dia)
const ROUTE_DATA = [
  { seq: 1, code: "ML-7821-A", addr: "R. Augusta, 1234 · Apto 82",  district: "Consolação",   eta: "08:55", customer: "M. Andrade",  weight: "2,4 kg",  tag: "priority", state: "next"  },
  { seq: 2, code: "ML-7821-B", addr: "Av. Paulista, 1578 · Sala 1102", district: "Bela Vista", eta: "09:20", customer: "P. Tavares",  weight: "0,8 kg",  tag: "fragile",  state: "queue" },
  { seq: 3, code: "ML-7822-C", addr: "R. Frei Caneca, 569",          district: "Cerqueira",    eta: "09:48", customer: "J. Bertolini", weight: "12,1 kg", tag: "big",      state: "queue" },
  { seq: 4, code: "ML-7822-D", addr: "Al. Santos, 2233",             district: "Jardim Paulista",eta: "10:12", customer: "C. Vidal",    weight: "1,1 kg",  tag: "late",     state: "queue" },
  { seq: 5, code: "ML-7822-E", addr: "R. Oscar Freire, 808",         district: "Jardins",      eta: "10:35", customer: "R. Kessler",  weight: "0,3 kg",  tag: "cold",     state: "queue" },
  { seq: 6, code: "ML-7823-F", addr: "R. Haddock Lobo, 1500",        district: "Cerqueira",    eta: "11:02", customer: "L. Marçal",   weight: "3,2 kg",  tag: null,       state: "queue" },
];

// Header compartilhado
function DashHeader({ connState = "online", queue = 3 }) {
  return (
    <div style={{ padding: "0 22px 14px", display:"flex", flexDirection:"column", gap: 14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div className="ls-overline">Rota · Ter, 17 mai</div>
          <div className="ls-display-lg" style={{ marginTop: 2 }}>Bom dia, Caio.</div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: "var(--ls-line)", display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"var(--ls-font-mono)", fontWeight: 600, fontSize: 14, color: "var(--ls-ink-2)",
        }}>CR</div>
      </div>
      <ConnRibbon state={connState} queue={queue} />
    </div>
  );
}

// Stats strip — números chave do dia
function DashStats({ done = 0, total = 18, kms = "23,4", eta = "16:40" }) {
  const cell = { flex: 1, padding: "10px 14px" };
  return (
    <div style={{
      display:"flex", margin: "0 22px 18px",
      background: "var(--ls-surface)", borderRadius: "var(--ls-r-md)",
      border: "0.5px solid var(--ls-line)",
    }}>
      <div style={cell}>
        <div className="ls-overline" style={{ fontSize: 9.5 }}>Entregas</div>
        <div style={{ fontFamily:"var(--ls-font-display)", fontSize: 22, fontWeight: 600, letterSpacing:-0.02 }}>
          {done}<span style={{ color: "var(--ls-ink-4)", fontWeight: 500 }}>/{total}</span>
        </div>
      </div>
      <div style={{ width: "0.5px", background: "var(--ls-line)", margin: "10px 0" }} />
      <div style={cell}>
        <div className="ls-overline" style={{ fontSize: 9.5 }}>Km rest.</div>
        <div style={{ fontFamily:"var(--ls-font-display)", fontSize: 22, fontWeight: 600, letterSpacing:-0.02 }}>{kms}</div>
      </div>
      <div style={{ width: "0.5px", background: "var(--ls-line)", margin: "10px 0" }} />
      <div style={cell}>
        <div className="ls-overline" style={{ fontSize: 9.5 }}>Previsão</div>
        <div style={{ fontFamily:"var(--ls-font-display)", fontSize: 22, fontWeight: 600, letterSpacing:-0.02 }}>{eta}</div>
      </div>
    </div>
  );
}

// ─── Variation A: Cards (default — cada pacote tem peso visual) ───
function DashboardCards({ connState = "online", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <DashHeader connState={connState} queue={queue} />
      <DashStats done={2} />

      <div style={{ padding: "0 22px", display:"flex", flexDirection:"column", gap: 12, overflowY:"auto", height: SCREEN_H - 240 }}>
        {ROUTE_DATA.map((p, i) => {
          const isNext = p.state === "next";
          const isLate = p.tag === "late";
          return (
            <div key={p.code} style={{
              position: "relative",
              padding: "16px 16px 16px 18px",
              borderRadius: "var(--ls-r-lg)",
              background: isNext ? "var(--ls-ink)" : "var(--ls-surface)",
              color: isNext ? "white" : "var(--ls-ink)",
              border: isNext ? "none" : `0.5px solid ${isLate ? "color-mix(in oklch, var(--ls-danger) 40%, transparent)" : "var(--ls-line)"}`,
              boxShadow: isNext ? "0 12px 30px -10px rgba(15,17,21,.4)" : "var(--ls-shadow-card)",
            }}>
              {/* numeração + tag */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 10 }}>
                <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: isNext ? "var(--ls-accent)" : "var(--ls-line)",
                    color: isNext ? "var(--ls-ink)" : "var(--ls-ink-2)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"var(--ls-font-mono)", fontWeight: 700, fontSize: 13,
                  }}>{p.seq}</div>
                  <div className="ls-mono" style={{ fontSize: 12, opacity: isNext ? 0.8 : 0.6, letterSpacing: 0.04 }}>
                    {p.code}
                  </div>
                </div>
                {p.tag && <PriorityBadge kind={p.tag} />}
              </div>

              {/* endereço */}
              <div className="ls-display-md" style={{ fontWeight: 600, color: isNext ? "white" : "var(--ls-ink)" }}>
                {p.addr}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginTop: 4 }}>
                <div style={{ fontSize: 13, color: isNext ? "rgba(255,255,255,.65)" : "var(--ls-ink-3)" }}>
                  {p.district} · {p.customer}
                </div>
                <div className="ls-mono" style={{ fontSize: 13, fontWeight: 500, color: isNext ? "var(--ls-accent)" : "var(--ls-ink-2)" }}>
                  {p.eta}
                </div>
              </div>

              {/* CTA quando é o próximo */}
              {isNext && (
                <button style={{
                  width: "100%", marginTop: 14, height: 52,
                  border: "none", borderRadius: "var(--ls-r-md)",
                  background: "var(--ls-accent)", color: "var(--ls-ink)",
                  fontFamily: "var(--ls-font-display)", fontWeight: 600, fontSize: 15,
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding: "0 18px", cursor: "pointer",
                }}>
                  <span>Iniciar entrega</span>
                  <Icon.Arrow width="18" height="18" />
                </button>
              )}
            </div>
          );
        })}
        <div style={{ height: 40 }} />
      </div>
    </Phone>
  );
}

// ─── Variation B: Lista densa ───────────────────────────────────
function DashboardList({ connState = "online", queue = 3 }) {
  return (
    <Phone>
      <StatusBar />
      <DashHeader connState={connState} queue={queue} />
      <DashStats done={2} />

      {/* Filtros */}
      <div style={{ padding: "0 22px 12px", display:"flex", gap: 6, overflowX:"auto" }}>
        {["Todos · 18","Atrasados · 1","Prioridade · 2","Frágil · 3"].map((f,i) => (
          <button key={i} style={{
            padding: "6px 12px", borderRadius: 999,
            border: i === 0 ? "none" : "0.5px solid var(--ls-line-2)",
            background: i === 0 ? "var(--ls-ink)" : "transparent",
            color: i === 0 ? "white" : "var(--ls-ink-2)",
            fontSize: 12, fontWeight: 500, whiteSpace:"nowrap", cursor:"pointer",
            fontFamily:"var(--ls-font-mono)",
          }}>{f}</button>
        ))}
      </div>

      <div style={{ overflowY:"auto", height: SCREEN_H - 260, background:"var(--ls-surface)", borderTop:"0.5px solid var(--ls-line)" }}>
        {ROUTE_DATA.map((p, i) => {
          const isLate = p.tag === "late";
          const isNext = p.state === "next";
          return (
            <div key={p.code} style={{
              display:"flex", alignItems:"stretch",
              borderBottom:"0.5px solid var(--ls-line)",
              position:"relative",
            }}>
              {/* Stripe lateral por status */}
              <div style={{
                width: 4,
                background: isNext ? "var(--ls-accent)" : isLate ? "var(--ls-danger)" : "transparent",
              }}/>
              <div style={{ flex: 1, padding: "14px 20px 14px 16px", display:"flex", alignItems:"center", gap: 14 }}>
                <div style={{
                  fontFamily:"var(--ls-font-display)", fontSize: 22, fontWeight: 600,
                  color: isNext ? "var(--ls-ink)" : "var(--ls-ink-3)",
                  minWidth: 26, fontVariantNumeric:"tabular-nums",
                }}>{p.seq}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
                    <div className="ls-h2" style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.addr}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap: 8, marginTop: 3 }}>
                    <span className="ls-mono" style={{ fontSize: 11, color: "var(--ls-ink-3)" }}>{p.code}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 2, background: "var(--ls-line-2)" }}/>
                    <span style={{ fontSize: 12, color: "var(--ls-ink-3)" }}>{p.district}</span>
                    {p.tag && <PriorityBadge kind={p.tag} />}
                  </div>
                </div>

                <div style={{ textAlign:"right" }}>
                  <div className="ls-mono" style={{ fontSize: 15, fontWeight: 600, color: isLate ? "var(--ls-danger)" : "var(--ls-ink)" }}>{p.eta}</div>
                  <div style={{ fontSize: 11, color: "var(--ls-ink-4)", marginTop: 2 }}>{p.weight}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA flutuante */}
      <div style={{ position:"absolute", left: 22, right: 22, bottom: 22 }}>
        <button className="ls-cta">
          <Icon.Lightning width="18" height="18"/>
          <span>Iniciar próxima · Augusta, 1234</span>
        </button>
      </div>
    </Phone>
  );
}

// ─── Variation C: Timeline horária ──────────────────────────────
function DashboardTimeline({ connState = "online", queue = 3 }) {
  const slots = ROUTE_DATA;
  return (
    <Phone>
      <StatusBar />
      <DashHeader connState={connState} queue={queue} />

      <div style={{ padding: "0 22px 14px", display:"flex", alignItems:"baseline", justifyContent:"space-between" }}>
        <div className="ls-display-md">Cronograma</div>
        <div className="ls-overline">2 / 18 · 11%</div>
      </div>

      <div style={{ overflowY:"auto", height: SCREEN_H - 240, padding:"0 22px 80px" }}>
        {/* já entregue (estado "done") */}
        <TimelineItem time="08:12" done seq="—" code="ML-7820" addr="R. Estados Unidos, 432" district="Jardins" />
        <TimelineItem time="08:31" done seq="—" code="ML-7820-B" addr="R. Pamplona, 1200 · 5º" district="Jardins" />

        {/* now divider */}
        <div style={{ display:"flex", alignItems:"center", gap: 10, margin: "10px 0 4px" }}>
          <div style={{ flex: 1, height: 1, background:"var(--ls-primary)", opacity: .35 }}/>
          <div style={{
            display:"flex", alignItems:"center", gap: 6,
            padding: "4px 10px", borderRadius: 999,
            background:"var(--ls-primary)", color: "white",
            fontFamily:"var(--ls-font-mono)", fontSize: 10.5, fontWeight: 600, letterSpacing: .06, textTransform:"uppercase",
          }}>
            <span className="ls-conn-dot" style={{ background:"white", animation:"ls-pulse 1.4s ease-in-out infinite" }}/>
            Agora · 08:42
          </div>
          <div style={{ flex: 1, height: 1, background:"var(--ls-primary)", opacity: .35 }}/>
        </div>

        {slots.map((p, i) => (
          <TimelineItem key={p.code} time={p.eta} seq={p.seq} code={p.code} addr={p.addr} district={p.district} tag={p.tag} next={i === 0} />
        ))}
      </div>
    </Phone>
  );
}

function TimelineItem({ time, seq, code, addr, district, tag, done, next }) {
  return (
    <div style={{ display:"flex", gap: 14, padding: "10px 0", position:"relative" }}>
      <div style={{ width: 50, paddingTop: 2 }}>
        <div className="ls-mono" style={{
          fontSize: 13, fontWeight: 500,
          color: done ? "var(--ls-ink-4)" : next ? "var(--ls-primary)" : "var(--ls-ink)",
          textDecoration: done ? "line-through" : "none",
        }}>{time}</div>
        {!done && <div style={{ fontSize: 10, color:"var(--ls-ink-4)", marginTop: 1, fontFamily:"var(--ls-font-mono)" }}>+{Math.round(Math.random()*8 + 2)}min</div>}
      </div>

      {/* trilha */}
      <div style={{ width: 14, display:"flex", flexDirection:"column", alignItems:"center", flexShrink: 0 }}>
        <div style={{
          width: next ? 14 : 10, height: next ? 14 : 10, borderRadius:"50%",
          background: done ? "var(--ls-line-2)" : next ? "var(--ls-accent)" : "var(--ls-surface)",
          border: done ? "none" : next ? "2px solid var(--ls-ink)" : "2px solid var(--ls-line-2)",
          marginTop: 4,
        }}/>
        <div style={{ flex: 1, width: 2, background: "var(--ls-line)", marginTop: 2 }}/>
      </div>

      <div style={{ flex: 1, paddingBottom: 8 }}>
        <div style={{ display:"flex", alignItems:"center", gap: 8, flexWrap:"wrap" }}>
          {!done && <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)" }}>#{seq}</span>}
          <span className="ls-mono" style={{ fontSize: 11, color:"var(--ls-ink-4)" }}>{code}</span>
          {tag && <PriorityBadge kind={tag} />}
        </div>
        <div className="ls-h2" style={{
          marginTop: 3,
          color: done ? "var(--ls-ink-4)" : "var(--ls-ink)",
          textDecoration: done ? "line-through" : "none",
        }}>{addr}</div>
        <div style={{ fontSize: 12, color:"var(--ls-ink-3)", marginTop: 1 }}>{district}</div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardCards, DashboardList, DashboardTimeline });
