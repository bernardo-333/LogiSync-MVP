<div align="center">

# LogiSync

**Gestão de entregas last-mile para a Magalu**

*Um PWA offline-first para entregadores de campo — sem frameworks, sem servidor, sem desculpas.*

---

[![PWA](https://img.shields.io/badge/PWA-Ready-5A67D8?style=flat-square&logo=googlechrome&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Offline First](https://img.shields.io/badge/Offline-First-22C55E?style=flat-square)](https://offlinefirst.org/)
[![Version](https://img.shields.io/badge/version-v0.1_MVP-94A3B8?style=flat-square)]()

</div>

---

## O Problema

Entregadores de última milha passam o dia em campo — em garagens, prédios sem sinal, zonas rurais. Quando a internet cai, o app trava. Entregas se perdem. O histórico some.

**LogiSync foi projetado para esse cenário.** Funciona 100% offline, salva confirmações localmente, e sincroniza tudo com o servidor quando a conexão voltar — sem intervenção do usuário.

---

## Telas

| Login | Dashboard | Entrega | Fila de Sync |
|-------|-----------|---------|--------------|
| Autenticação com persistência de sessão | Rota do dia com stats e filtros | Confirmar entrega online ou offline | Gerenciar e sincronizar itens em cache |

---

## Funcionalidades

### Gestão de Entregas
- Visualização da rota diária em cards ordenados por sequência
- Badge de prioridade por pacote: **Alta** · **Normal** · **Frágil**
- Detalhe completo: endereço, cliente, peso, bairro, código de barras, prazo
- Filtros no dashboard: **Todos / Pendentes / Entregues**

### Offline-First
- Confirmação de entrega funciona **sem internet**
- Itens offline entram na fila de sync com timestamp
- Ribbon de conexão em tempo real: `Conectado` → `Sincronizando · N` → `Offline · N na fila`
- Sync manual com feedback visual (spinner + toast)

### Scanner de Código de Barras *(simulado)*
- Botão de scanner no detalhe da entrega
- Overlay com animação de linha de escaneamento (CSS puro)
- Bip sonoro via Web Audio API após leitura
- Confirma a entrega automaticamente após 2 segundos

### Integração com Mapas
- Botão **"Abrir no Google Maps"** na tela de detalhe
- Abre o app nativo de mapas no celular ou nova aba no desktop
- URL gerada dinamicamente com o endereço do pacote

### Modo Estoquista
- Toggle na tela de login: **"Entrar como Estoquista"**
- Altera o esquema de cores para azul Magalu
- Adapta textos e código de rota para o contexto de recebimento

### Painel Admin *(para demos e apresentações)*
- **Long-press no logo** da tela de login (~0.9s) → abre painel
- **Triple-tap no avatar** do dashboard → abre painel
- Ações disponíveis:
  - `Resetar App` — limpa localStorage e recarrega
  - `Carregar Rota Simples` — injeta 3 pacotes pendentes
  - `Carregar Rota Complexa` — injeta 10 pacotes com status variados

### PWA
- Instalável via navegador (sem App Store)
- Service Worker com estratégia cache-first para assets locais
- Funciona offline após a primeira abertura
- Ícones e metadata via `manifest.json`

---

## Stack Técnica

```
HTML5 + CSS3 + JavaScript (ES6+)   — sem frameworks, sem build step
localStorage API                    — persistência de dados offline
Service Worker API                  — cache e funcionamento offline
Web Audio API                       — feedback sonoro no scanner
Google Fonts (Geist, Space Grotesk) — tipografia
```

### Arquitetura de Módulos JS

O app é organizado em três módulos internos (closures IIFE):

```
LS_DATA   — camada de dados (localStorage: entregas, fila, usuário)
LS_NET    — estado de rede (online/offline/syncing, simulação)
LS_UI     — navegação e UI (showScreen, toast, ribbons, clock)
```

### Design System

Tokens de design próprios baseados em `oklch` (espaço de cor perceptualmente uniforme):

| Token | Uso |
|-------|-----|
| `--ls-primary` | Azul principal (botões, acentos, badges) |
| `--ls-accent` | Âmbar (prioridade Alta, código de rota) |
| `--ls-online/syncing/offline` | Estado da conexão |
| `--ls-surface / --ls-bg` | Superfícies e fundo do dark theme |

**Tipografia:** Geist (corpo) · Geist Mono (dados, timestamps) · Space Grotesk (display)  
**Touch targets:** mínimo 56px · CTAs 72px *(pensado para uso com luvas)*  
**Espaçamento:** grade de 8px

---

## Estrutura do Projeto

```
LogiSync-MVP/
├── index.html              # App completo (HTML + CSS + JS em arquivo único)
├── manifest.json           # Metadados do PWA (nome, ícone, tema, modo)
├── service-worker.js       # Cache offline (cache-first local, network-first fontes)
├── ROTEIRO_APRESENTACAO.md # Guia de demonstração passo a passo
├── README.md               # Este arquivo
└── Design System/
    ├── index.html          # Viewer do design system com tokens e componentes
    ├── tokens.css          # Fonte da verdade dos design tokens
    ├── screens/            # Protótipos React das telas (referência de design)
    │   ├── dashboard.jsx
    │   ├── delivery.jsx
    │   ├── sync.jsx
    │   └── stockist.jsx
    ├── LogiSync - Brandbook.html   # Guia de marca e identidade visual
    └── LogiSync - Prototype.html   # Protótipo interativo com painel de tweaks
```

---

## Como Usar

Nenhum passo de build necessário. Abra o arquivo direto no navegador:

```bash
# Clone o repositório
git clone <url-do-repo>

# Abra no navegador
# Opção 1: Arraste index.html para o Chrome/Edge
# Opção 2: Use um servidor local
npx serve .
# ou
python -m http.server 8080
```

> **Para testar offline:** Use as DevTools do Chrome → aba Network → selecione "Offline"  
> **Para modo mobile:** DevTools → Toggle Device Toolbar → iPhone 12 Pro (390px)

---

## Fluxo de Dados

```
Login (email + senha)
  └─► Salva sessão em localStorage
        └─► Dashboard: carrega rota do dia

Confirmar Entrega
  ├─► Online  → mark as "delivered" · toast de sucesso
  └─► Offline → mark as "cached" · adiciona à fila de sync · toast de aviso

Fila de Sync
  └─► Sincronizar (online)
        └─► 1.8s upload simulado → limpa fila → todos marcados como "delivered"
```

---

## Roadmap

O MVP valida o fluxo principal. Próximas iterações planejadas:

| Feature | Descrição |
|---------|-----------|
| **Backend real** | API REST para autenticação, rotas e sincronização |
| **Leitura de código de barras** | `BarcodeDetector API` — câmera nativa no celular |
| **Captura de assinatura** | Canvas touch para assinatura digital do destinatário |
| **GPS e rota otimizada** | Integração Maps API para ordenação por proximidade |
| **Push notifications** | Atualização de rota e avisos de entrega urgente |
| **Modo Estoquista completo** | Tela de recebimento de carga com leitura de paletes |
| **Autenticação real** | JWT + refresh token, expiração de sessão |

---

## Decisões de Design

**Por que um único arquivo HTML?**  
Portabilidade máxima para o MVP. Qualquer entregador pode receber um link, salvar o arquivo, e o app funciona — sem node_modules, sem servidor, sem App Store.

**Por que sem framework?**  
O escopo do MVP cabe em ~300 linhas de JS. Adicionar React ou Vue traria complexidade de build sem benefício real nesta fase. A estrutura modular com closures escala bem para o próximo passo.

**Por que OKLCH para cores?**  
Cores em OKLCH são perceptualmente uniformes — mudar o lightness de `0.55` para `0.72` resulta em um salto visual consistente, independente do matiz. Isso torna o dark mode, os semantic colors e os temas alternativos muito mais previsíveis de construir e manter.

---

<div align="center">

**LogiSync v0.1 · MVP**  
Desenvolvido para a Magalu · 2026

</div>
