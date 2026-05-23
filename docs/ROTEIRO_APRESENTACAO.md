# 🗺️ Roteiro de Apresentação — LogiSync MVP

> **Para apresentar em:** browser mobile ou DevTools em modo responsivo (380–430px de largura)  
> **Arquivo principal:** `index.html` — abra direto no navegador  
> **Tempo estimado:** 8–12 minutos

---

## Antes de começar — Setup rápido

1. Abra o `index.html` no Chrome ou Edge
2. Pressione `F12` → clique em **Toggle Device Toolbar** (ícone de celular) → selecione **iPhone 12 Pro** ou similar
3. Garanta que o zoom está em **100%**
4. **Limpe o localStorage** para começar do zero:
   - DevTools → aba **Application** → **Local Storage** → clique direito → *Clear*
5. Feche o DevTools e recarregue a página — você verá a tela de Login

---

## 1. Abertura — O Problema

> **O que falar:**

*"Entregadores de última milha passam o dia em campo, muitas vezes sem sinal de internet. O LogiSync resolve isso: é um app de gestão de entregas que funciona completamente offline e sincroniza os dados quando a conexão volta."*

**Pontos para destacar:**
- App feito para a Magalu (contexto real de logística last-mile)
- Roda no navegador — **zero instalação obrigatória** (mas pode ser instalado como app)
- Funciona com ou sem internet

---

## 2. Tela de Login

**Onde você está:** `#screen-login` — primeira tela ao abrir o app

### O que mostrar

- [ ] O logotipo **LogiSync** e o tagline *"Gestão de entregas last-mile"*
- [ ] O campo de e-mail e senha com visual limpo e legível
- [ ] **Digite qualquer e-mail** (ex: `joao@magalu.com`) e qualquer senha
- [ ] Clique em **Entrar**

### O que falar

*"O login salva a sessão localmente. Se o entregador fechar o app e voltar, ele não precisa logar de novo — o sistema reconhece quem é."*

**Transição:** Você será levado automaticamente para o Dashboard.

---

## 3. Dashboard — Visão Geral da Rota

**Onde você está:** `#screen-dash`

### O que mostrar — parte por parte

#### 3.1 Cabeçalho inteligente
- [ ] O **saudação dinâmica**: *"Bom dia"*, *"Boa tarde"* ou *"Boa noite"* — muda conforme o horário real
- [ ] As **iniciais do usuário** no avatar (derivadas do e-mail digitado no login)
- [ ] A **barra de status** no topo com horário atualizado em tempo real

> *"Cada detalhe foi pensado para o campo: fonte grande, contraste alto, toque mínimo de 56px."*

#### 3.2 Ribbon de conexão
- [ ] A faixa verde no topo: **"Conectado"**
- [ ] Explique que ela muda de cor conforme o estado da rede (verde → âmbar → cinza)

> *"O entregador sabe em tempo real se está online ou offline, sem precisar abrir configurações."*

#### 3.3 Strip de estatísticas
- [ ] Mostre os 3 contadores: **Entregues · Pendentes · Rota**
- [ ] Destaque o código de rota (ex: `SP-07`)

#### 3.4 Cards de pacotes
- [ ] Role a lista e explique os elementos de um card:
  - Número de sequência + código do pacote (`ML-XXXX-X`)
  - Endereço de entrega
  - Nome do cliente + peso + bairro
  - **Badge de prioridade**: `Alta` (vermelho), `Normal` (neutro), `Frágil` (âmbar)
  - Botão **"Ver Detalhes"**

> *"A lista já vem ordenada pela rota. O entregador não precisa pensar — só seguir a sequência."*

---

## 4. Tela de Detalhe da Entrega

**Onde você está:** `#screen-delivery` — acessada ao clicar em "Ver Detalhes" em qualquer card

### O que mostrar

- [ ] O **endereço completo** com ícone de localização
- [ ] O **card de informações**: código de barras, peso, bairro, prazo
- [ ] O **badge de prioridade** no header
- [ ] O botão grande: **"Confirmar Entrega"**

### Demonstração — Entrega online

- [ ] Clique em **"Confirmar Entrega"**
- [ ] Mostre o **toast de sucesso** ("Entrega confirmada!") que aparece no topo
- [ ] Clique em **Voltar** e mostre que o card agora exibe o ✓ verde de entregue

> *"Quando está online, a confirmação é imediata. O status atualiza na lista em tempo real."*

---

## 5. Cenário Offline — O Grande Diferencial

**Onde você está:** Dashboard (`#screen-dash`)

### Setup do cenário

1. Localize o botão oculto de simulação offline — no rodapé do dashboard há um pequeno botão de dev **"Simular Offline"**
   - *Ou use DevTools: aba Network → selecione "Offline" no dropdown de throttling*
2. Mostre o **ribbon mudando para cinza**: *"Offline · X na fila"*

### Demonstração — Entrega offline

- [ ] Abra um pacote pendente → clique em **"Confirmar Entrega"**
- [ ] Mostre o **toast âmbar** ("Guardado em cache — será sincronizado quando voltar a conexão")
- [ ] Volte ao dashboard — o card agora exibe o ícone ⚠️ (cached)

> *"O entregador não perde o trabalho. A confirmação é salva localmente e vai para o servidor quando a internet voltar."*

---

## 6. Tela de Fila de Sincronização

**Onde você está:** `#screen-sync` — acessada pelo botão **"Fila de Sync"** no dashboard (com contador de itens)

### O que mostrar

- [ ] O **badge numérico** no botão (quantos itens pendentes)
- [ ] A lista de itens em fila: tipo, ID do pacote, horário, endereço, cliente, bairro
- [ ] Os contadores: **Pendentes · Enviando · Falhas**

### Demonstração — Sincronização

1. **Com conexão simulada como offline:** mostre o botão **"Sincronizar Dados"** desabilitado
   - > *"Ele não deixa o entregador tentar sincronizar sem internet — evita frustração."*
2. **Volte a conexão** (clique em "Simular Online" ou desfaça o throttling)
   - Mostre o ribbon voltando para verde
3. Clique em **"Sincronizar Dados"**
   - Mostre o **spinner de carregamento** por ~2 segundos
   - Mostre o **toast de sucesso** e a fila sendo limpa
4. Volte ao dashboard — todos os itens estão com ✓ entregue

> *"Em campo, o entregador sincroniza no almoço, numa lanchonete, ou ao chegar no depósito. Não precisa de internet o dia todo."*

---

## 7. PWA — Instalar como App Nativo

**Onde você está:** Qualquer tela

### O que mostrar (Chrome/Edge no desktop ou mobile)

- [ ] Mostre o **ícone de instalação** na barra de endereço (ou o menu `...` → *Instalar app*)
- [ ] Instale e abra o app na janela standalone (sem barra do navegador)
- [ ] Destaque: **funciona como app nativo**, aparece no menu do celular

> *"Não precisa de App Store. O entregador recebe um link, abre no navegador, e instala com um clique. A atualização é automática."*

**Pontos técnicos para mencionar (se o público for técnico):**
- `manifest.json` define nome, ícone, cor e modo `standalone`
- `service-worker.js` faz cache dos assets para funcionar sem internet
- Estratégia cache-first para arquivos locais, network-first para fontes externas

---

## 8. Design System (Opcional — Para Audiência Técnica/Design)

**Arquivo:** `Design System/index.html` — abra separado no navegador

### O que mostrar

- [ ] **Tokens de cor OKLCH** — paleta acessível e perceptualmente uniforme
- [ ] **3 temas de cor**: Voltage (azul), Solar (laranja), Lime (verde)
- [ ] **Tipografia**: Geist (corpo), Geist Mono (dados), Space Grotesk (display)
- [ ] **Grade de espaçamento** com base em 8px
- [ ] **Tamanhos de toque**: mínimo 56px, CTA 72px (pensado para luva/dedos grandes)

**Arquivo:** `Design System/LogiSync - Prototype.html`

- [ ] Mostre o protótipo interativo com o painel de tweaks lateral
- [ ] Troque o tema de cor ao vivo
- [ ] Mostre dark mode vs. light mode

> *"Todo o app foi construído a partir de um design system próprio. As decisões de cor e tipografia priorizaram legibilidade ao sol e acessibilidade de contraste."*

---

## 9. Encerramento — Próximos Passos

> **O que falar:**

*"Este é o MVP. O que está funcionando hoje: gestão de rota, confirmação de entrega online e offline, fila de sync e PWA. O que vem a seguir:"*

### Roadmap sugerido para mencionar

| Feature | Descrição |
|---|---|
| **Backend real** | API REST para autenticação e sincronização |
| **Leitura de código de barras** | Câmera do celular para leitura via `BarcodeDetector API` |
| **Captura de assinatura** | Canvas touch para coleta de assinatura do cliente |
| **GPS / Rota otimizada** | Integração com Maps para ordenação por proximidade |
| **Notificações push** | Avisos de nova rota ou atualização de entrega |
| **Modo Estoquista** | Tela de recebimento de estoque (protótipo já existe no Design System) |

---

## Dicas para a Apresentação

- **Use o celular real** se possível — mostre o app instalado na tela inicial
- **Mostre o offline** — é o diferencial mais impactante visualmente
- **Mostre os toasts** — o feedback imediado impressiona
- **Fale do contexto real** — entregadores no sol, com luva, sem internet
- **Não esconda que é MVP** — o escopo intencionalmente focado mostra maturidade de produto

---

*Arquivo gerado por Claude Code — LogiSync-MVP · 2026*
