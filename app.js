const COTA_VALOR = 50;
const STORAGE_KEY = "gvs-bolao-vale-da-sorte-v1";

let state = loadState();
let pendingConfirm = null;

const el = (id) => document.getElementById(id);

function freshDefaultState() {
  return {
    participants: [],
    jogos: [],
    wallComments: [],
    adminAnnouncements: [],
    activityLog: []
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return freshDefaultState();
    return { ...freshDefaultState(), ...JSON.parse(saved) };
  } catch {
    return freshDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function currency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function localDate(value) {
  if (!value) return "-";
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return "-";
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
}

function shortTime(value) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function shortDate(value) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleDateString("pt-BR");
}

function getSortedParticipants() {
  return [...state.participants].sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
}

function getSortedJogos() {
  return [...state.jogos].sort((a, b) => Number(a.numero || 0) - Number(b.numero || 0));
}

function statusInfo(status) {
  const map = {
    pago: { className: "status-pago", label: "✅ Pago" },
    pendente: { className: "status-pendente", label: "⭕ Pendente" },
    credito: { className: "status-credito", label: "💰 Crédito" },
    registrado: { className: "status-pago", label: "✅ Registrado" }
  };
  return map[status] || map.pendente;
}

function showToast(message) {
  const toast = el("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function addActivity(name, action, type) {
  state.activityLog.unshift({
    id: uid(),
    name,
    action,
    type,
    timestamp: new Date().toISOString()
  });
  state.activityLog = state.activityLog.slice(0, 50);
  saveState();
  renderActivityHistory();
}

function updateParticipantStats() {
  const total = state.participants.length;
  const totalCotas = state.participants.reduce((sum, participant) => sum + Number(participant.cotas || 1), 0);
  const totalPago = state.participants.reduce((sum, participant) => sum + Number(participant.valorPago || 0), 0);
  const totalPendente = Math.max(0, totalCotas * COTA_VALOR - totalPago);

  el("stat-participants").textContent = total;
  el("stat-arrecadado").textContent = currency(totalPago);
  el("stat-pendente").textContent = currency(totalPendente);
  el("stat-cotas").textContent = totalCotas;
}

function renderParticipants() {
  const search = el("search-input").value.trim().toLowerCase();
  const filter = el("filter-status").value;
  const tbody = el("table-body");
  const empty = el("empty-msg");

  const filtered = getSortedParticipants().filter((participant) => {
    const matchesSearch = !search || participant.name.toLowerCase().includes(search);
    const matchesFilter = filter === "todos" || participant.status === filter;
    return matchesSearch && matchesFilter;
  });

  tbody.innerHTML = filtered.map((participant, index) => {
    const cotas = Number(participant.cotas || 1);
    const pago = Number(participant.valorPago || 0);
    const devido = cotas * COTA_VALOR;
    const falta = Math.max(0, devido - pago);
    const haver = pago > devido ? pago - devido : 0;
    const info = statusInfo(participant.status);
    const note = participant.observation
      ? `<span class="participant-note">${escapeHtml(participant.observation)}</span>`
      : "";
    const faltaText = falta > 0 ? currency(falta) : haver > 0 ? `+${currency(haver)}` : "-";
    const faltaClass = falta > 0 ? "color: var(--red-600); font-weight: 800;" : "color: var(--green-700); font-weight: 800;";

    return `
      <tr>
        <td style="color: var(--gray-500);">${String(index + 1).padStart(2, "0")}</td>
        <td><span class="participant-name">${escapeHtml(participant.name)}</span>${note}</td>
        <td class="text-center">${cotas}</td>
        <td class="text-right" style="color: var(--green-700); font-weight: 700;">${currency(pago)}</td>
        <td class="text-right" style="${faltaClass}">${faltaText}</td>
        <td class="text-center"><span class="badge ${info.className}">${info.label}</span></td>
        <td class="text-center nowrap">
          <button type="button" class="icon-btn green" data-action="edit-participant" data-id="${participant.id}" title="Editar">✎</button>
          <button type="button" class="icon-btn danger" data-action="delete-participant" data-id="${participant.id}" title="Excluir">×</button>
        </td>
      </tr>
    `;
  }).join("");

  empty.hidden = filtered.length !== 0;
  updateParticipantStats();
}

function openParticipantModal(participant = null) {
  el("participant-modal-title").textContent = participant ? "Editar Participante" : "Adicionar Participante";
  el("participant-id").value = participant?.id || "";
  el("f-name").value = participant?.name || "";
  el("f-cotas").value = participant?.cotas || 1;
  el("f-pago").value = participant?.valorPago || 0;
  el("f-status").value = participant?.status || "pago";
  el("f-obs").value = participant?.observation || "";
  el("participant-modal").hidden = false;
  el("f-name").focus();
}

function saveParticipant(event) {
  event.preventDefault();
  const id = el("participant-id").value;
  const name = el("f-name").value.trim();
  const cotas = Math.max(1, parseInt(el("f-cotas").value, 10) || 1);
  const valorPago = Math.max(0, parseFloat(el("f-pago").value) || 0);
  const participant = {
    id: id || uid(),
    name,
    cotas,
    valorPago,
    status: el("f-status").value,
    observation: el("f-obs").value.trim(),
    createdAt: new Date().toISOString()
  };

  if (!name) {
    showToast("Informe o nome do participante.");
    return;
  }

  if (id) {
    const index = state.participants.findIndex((item) => item.id === id);
    if (index >= 0) {
      participant.createdAt = state.participants[index].createdAt;
      state.participants[index] = participant;
      addActivity(name, "editado/atualizado", "editar");
    }
  } else {
    state.participants.push(participant);
    addActivity(name, "adicionado ao bolão", "adicionar");
  }

  saveState();
  el("participant-modal").hidden = true;
  renderParticipants();
  showToast("Participante salvo.");
}

function askDeleteParticipant(id) {
  const participant = state.participants.find((item) => item.id === id);
  if (!participant) return;
  openConfirm("Excluir participante", `Deseja excluir ${participant.name}?`, () => {
    state.participants = state.participants.filter((item) => item.id !== id);
    addActivity(participant.name, "excluído do bolão", "deletar");
    saveState();
    renderParticipants();
    showToast("Participante excluído.");
  });
}

function renderAdminAnnouncements() {
  const list = el("admin-announcements-list");
  if (state.adminAnnouncements.length === 0) {
    list.innerHTML = `<p class="empty" style="padding: 18px 0;">Nenhum aviso publicado.</p>`;
    return;
  }

  list.innerHTML = state.adminAnnouncements.map((notice) => `
    <article class="notice-card">
      <div class="row-between">
        <div>
          <p class="notice-message"><strong>${escapeHtml(notice.message)}</strong></p>
          <span class="notice-time">${shortDate(notice.timestamp)} às ${shortTime(notice.timestamp)}</span>
        </div>
        <button type="button" class="icon-btn danger" data-action="delete-notice" data-id="${notice.id}" title="Excluir aviso">×</button>
      </div>
    </article>
  `).join("");
}

function addAdminAnnouncement(event) {
  event.preventDefault();
  const input = el("admin-message");
  const message = input.value.trim();
  if (!message) {
    showToast("Digite um aviso.");
    return;
  }

  state.adminAnnouncements.unshift({
    id: uid(),
    message,
    timestamp: new Date().toISOString()
  });
  input.value = "";
  addActivity("Admin", "publicou um aviso", "aviso");
  saveState();
  renderAdminAnnouncements();
  showToast("Aviso publicado.");
}

function deleteAdminAnnouncement(id) {
  state.adminAnnouncements = state.adminAnnouncements.filter((notice) => notice.id !== id);
  saveState();
  renderAdminAnnouncements();
  showToast("Aviso excluído.");
}

function renderWallComments() {
  const list = el("wall-comments-list");
  const empty = el("wall-empty-msg");

  list.innerHTML = state.wallComments.map((comment) => `
    <article class="comment-card">
      <div class="row-between">
        <div>
          <p class="comment-name">${escapeHtml(comment.name)}</p>
          <p class="comment-message">${escapeHtml(comment.message)}</p>
          <span class="comment-time">${shortDate(comment.timestamp)} às ${shortTime(comment.timestamp)}</span>
        </div>
        <button type="button" class="icon-btn danger" data-action="delete-comment" data-id="${comment.id}" title="Excluir comentário">×</button>
      </div>
    </article>
  `).join("");

  empty.hidden = state.wallComments.length !== 0;
}

function addWallComment(event) {
  event.preventDefault();
  const name = el("wall-name").value.trim();
  const message = el("wall-message").value.trim();

  if (!name) {
    showToast("Informe seu nome.");
    return;
  }
  if (!message) {
    showToast("Escreva um comentário.");
    return;
  }

  state.wallComments.unshift({
    id: uid(),
    name,
    message,
    timestamp: new Date().toISOString()
  });
  el("wall-name").value = "";
  el("wall-message").value = "";
  addActivity(name, `comentou: "${message.slice(0, 36)}${message.length > 36 ? "..." : ""}"`, "comentario");
  saveState();
  renderWallComments();
  showToast("Comentário publicado.");
}

function deleteWallComment(id) {
  state.wallComments = state.wallComments.filter((comment) => comment.id !== id);
  saveState();
  renderWallComments();
  showToast("Comentário excluído.");
}

function renderActivityHistory() {
  const list = el("activity-history-list");
  const empty = el("activity-empty-msg");
  const latest = state.activityLog.slice(0, 20);

  list.innerHTML = latest.map((activity) => `
    <div class="activity-item">
      <span class="activity-name activity-${escapeHtml(activity.type)}">${escapeHtml(activity.name)}</span>
      <span>${escapeHtml(activity.action)}</span>
      <span class="activity-time">${shortTime(activity.timestamp)}</span>
    </div>
  `).join("");

  empty.hidden = latest.length !== 0;
}

function normalizeDezenas(input) {
  const dezenas = String(input)
    .split(/[\s,;.-]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item));

  if (dezenas.length < 6) {
    throw new Error("Informe pelo menos 6 dezenas.");
  }
  if (dezenas.some((number) => !Number.isInteger(number) || number < 1 || number > 60)) {
    throw new Error("As dezenas devem estar entre 01 e 60.");
  }

  const unique = [...new Set(dezenas)];
  if (unique.length !== dezenas.length) {
    throw new Error("Não repita dezenas no mesmo jogo.");
  }

  return unique
    .sort((a, b) => a - b)
    .map((number) => String(number).padStart(2, "0"));
}

function updateJogosStats() {
  const total = state.jogos.length;
  const registrados = state.jogos.filter((jogo) => jogo.status === "registrado").length;
  const pendentes = state.jogos.filter((jogo) => jogo.status === "pendente").length;
  const totalDezenas = state.jogos.reduce((sum, jogo) => sum + jogo.dezenas.length, 0);

  el("stat-total-jogos").textContent = total;
  el("stat-jogos-registrados").textContent = registrados;
  el("stat-jogos-pendentes").textContent = pendentes;
  el("stat-total-dezenas").textContent = totalDezenas;
}

function renderJogos() {
  const search = el("search-jogo").value.trim().toLowerCase();
  const filter = el("filter-jogo-status").value;
  const grid = el("jogos-grid");
  const empty = el("jogos-empty-msg");

  const filtered = getSortedJogos().filter((jogo) => {
    const matchesSearch = !search || String(jogo.numero).includes(search);
    const matchesFilter = filter === "todos" || jogo.status === filter;
    return matchesSearch && matchesFilter;
  });

  grid.innerHTML = filtered.map((jogo) => {
    const info = statusInfo(jogo.status);
    const note = jogo.observation
      ? `<p class="game-note">📌 ${escapeHtml(jogo.observation)}</p>`
      : "";
    return `
      <article class="game-card">
        <div class="row-between">
          <div>
            <h3 class="game-title">Jogo</h3>
            <p class="game-number">${String(jogo.numero).padStart(2, "0")}</p>
          </div>
          <span class="badge ${info.className}">${info.label}</span>
        </div>
        <div class="game-meta">
          <span><strong>Concurso:</strong> ${escapeHtml(jogo.concurso || "-")}</span>
          <span><strong>Sorteio:</strong> ${localDate(jogo.dataSorteio)}</span>
        </div>
        <div>
          <strong style="font-size: 0.78rem; color: var(--gray-600);">DEZENAS</strong>
          <div class="dozens">
            ${jogo.dezenas.map((dezena) => `<span class="dozen">${escapeHtml(dezena)}</span>`).join("")}
          </div>
        </div>
        ${note}
        <div class="game-actions">
          <button type="button" class="btn btn-purple" data-action="edit-game" data-id="${jogo.id}">✎ Editar</button>
          <button type="button" class="btn btn-muted" data-action="delete-game" data-id="${jogo.id}">× Excluir</button>
        </div>
      </article>
    `;
  }).join("");

  empty.hidden = filtered.length !== 0;
  updateJogosStats();
}

function openJogoModal(jogo = null) {
  el("jogo-modal-title").textContent = jogo ? "Editar Jogo" : "Adicionar Jogo";
  el("jogo-id").value = jogo?.id || "";
  el("jogo-numero").value = jogo?.numero || "";
  el("jogo-concurso").value = jogo?.concurso || "";
  el("jogo-data").value = jogo?.dataSorteio || "";
  el("jogo-dezenas").value = jogo?.dezenas?.join(" ") || "";
  el("jogo-status").value = jogo?.status || "pendente";
  el("jogo-obs").value = jogo?.observation || "";
  el("jogo-modal").hidden = false;
  el("jogo-numero").focus();
}

function saveJogo(event) {
  event.preventDefault();
  const id = el("jogo-id").value;
  let dezenas;

  try {
    dezenas = normalizeDezenas(el("jogo-dezenas").value);
  } catch (error) {
    showToast(error.message);
    return;
  }

  const numero = Math.max(1, parseInt(el("jogo-numero").value, 10) || 0);
  if (!numero) {
    showToast("Informe o número do jogo.");
    return;
  }

  const existingSameNumber = state.jogos.find((jogo) => jogo.numero === numero && jogo.id !== id);
  if (existingSameNumber) {
    showToast("Já existe um jogo com esse número.");
    return;
  }

  const jogo = {
    id: id || uid(),
    numero,
    concurso: el("jogo-concurso").value.trim(),
    dataSorteio: el("jogo-data").value,
    dezenas,
    status: el("jogo-status").value,
    observation: el("jogo-obs").value.trim(),
    createdAt: new Date().toISOString()
  };

  if (id) {
    const index = state.jogos.findIndex((item) => item.id === id);
    if (index >= 0) {
      jogo.createdAt = state.jogos[index].createdAt;
      state.jogos[index] = jogo;
      addActivity(`Jogo ${String(numero).padStart(2, "0")}`, "editado/atualizado", "editar");
    }
  } else {
    state.jogos.push(jogo);
    addActivity(`Jogo ${String(numero).padStart(2, "0")}`, "adicionado", "adicionar");
  }

  saveState();
  el("jogo-modal").hidden = true;
  renderJogos();
  showToast("Jogo salvo.");
}

function askDeleteJogo(id) {
  const jogo = state.jogos.find((item) => item.id === id);
  if (!jogo) return;
  openConfirm("Excluir jogo", `Deseja excluir o Jogo ${String(jogo.numero).padStart(2, "0")}?`, () => {
    state.jogos = state.jogos.filter((item) => item.id !== id);
    addActivity(`Jogo ${String(jogo.numero).padStart(2, "0")}`, "excluído", "deletar");
    saveState();
    renderJogos();
    showToast("Jogo excluído.");
  });
}

function exportList() {
  let text = "🍀 BOLÃO MEGA-SENA - GRUPO VALE DA SORTE\n";
  text += "💰 Prêmio: R$ 300.000.000,00\n";
  text += "🕰️ Fechamento: 24/05/2026 às 18h\n";
  text += "💰 Cota: R$ 50,00\n";
  text += "📲 Pix: 32.533.957/0001-90 - MOREIRAMIX MARKETING\n\n";

  if (state.participants.length === 0) {
    text += "Nenhum participante cadastrado.\n";
  } else {
    getSortedParticipants().forEach((participant, index) => {
      const falta = Math.max(0, Number(participant.cotas || 1) * COTA_VALOR - Number(participant.valorPago || 0));
      const icon = participant.status === "pago" ? "✅" : participant.status === "credito" ? "💰" : "⭕";
      text += `${String(index + 1).padStart(2, "0")} ${participant.name} - ${participant.cotas} cota(s) ${icon}`;
      if (falta > 0) text += ` Falta: ${currency(falta)}`;
      if (participant.observation) text += ` - ${participant.observation}`;
      text += "\n";
    });
  }

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = "bolao-vale-da-sorte.txt";
  anchor.click();
  URL.revokeObjectURL(anchor.href);
  addActivity("Lista", "exportada em arquivo de texto", "copiar");
  showToast("Lista exportada.");
}

function whatsappText() {
  const pagos = getSortedParticipants().filter((participant) => participant.status === "pago");
  const pendentes = getSortedParticipants().filter((participant) => participant.status !== "pago");
  let text = "🍀 *BOLÃO MEGA-SENA*\n*GRUPO VALE DA SORTE*\n\n";
  text += "💰 Prêmio: R$ 300.000.000,00\n";
  text += "🕰️ Fechamento: 24/05/2026 às 18h\n";
  text += "💰 Cota: R$ 50,00\n";
  text += "📲 Pix: 32.533.957/0001-90\n";
  text += "MOREIRAMIX MARKETING\n\n";
  text += `✅ *Confirmados (${pagos.length}):*\n`;
  text += pagos.length
    ? pagos.map((participant, index) => `${String(index + 1).padStart(2, "0")}. ${participant.name}`).join("\n")
    : "Nenhum confirmado ainda.";
  text += "\n";

  if (pendentes.length) {
    text += `\n⭕ *Pendentes (${pendentes.length}):*\n`;
    text += pendentes.map((participant, index) => {
      const falta = Math.max(0, Number(participant.cotas || 1) * COTA_VALOR - Number(participant.valorPago || 0));
      return `${String(index + 1).padStart(2, "0")}. ${participant.name} - Falta: ${currency(falta)}`;
    }).join("\n");
    text += "\n";
  }

  text += "\n📩 Enviar comprovante no grupo";
  return text;
}

function gamesText() {
  let text = "🍀 *BOLÃO MEGA-SENA - JOGOS REGISTRADOS*\n\n";
  if (state.jogos.length === 0) return `${text}Nenhum jogo cadastrado.`;

  getSortedJogos().forEach((jogo) => {
    const status = jogo.status === "registrado" ? "✅ Registrado" : "⭕ Pendente";
    text += `*🍀 JOGO ${String(jogo.numero).padStart(2, "0")}*\n`;
    text += `Concurso: ${jogo.concurso || "-"}\n`;
    text += `Data: ${localDate(jogo.dataSorteio)}\n`;
    text += `Dezenas: ${jogo.dezenas.join(" - ")}\n`;
    text += `Status: ${status}\n`;
    if (jogo.observation) text += `📌 ${jogo.observation}\n`;
    text += "\n";
  });
  return text;
}

async function copyText(text, successMessage) {
  let copied = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }

  if (!copied) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    textarea.remove();
  }

  showToast(copied ? successMessage : "Não foi possível copiar automaticamente.");
  if (copied) addActivity("Texto", "copiado para a área de transferência", "copiar");
}

function openConfirm(title, message, onConfirm) {
  el("confirm-title").textContent = title;
  el("confirm-message").textContent = message;
  pendingConfirm = onConfirm;
  el("confirm-modal").hidden = false;
}

function closeConfirm() {
  pendingConfirm = null;
  el("confirm-modal").hidden = true;
}

function bindEvents() {
  el("btn-add-participant").addEventListener("click", () => openParticipantModal());
  el("btn-export").addEventListener("click", exportList);
  el("btn-whatsapp").addEventListener("click", () => copyText(whatsappText(), "Copiado para WhatsApp."));
  el("search-input").addEventListener("input", renderParticipants);
  el("filter-status").addEventListener("change", renderParticipants);
  el("participant-form").addEventListener("submit", saveParticipant);
  el("admin-form").addEventListener("submit", addAdminAnnouncement);
  el("wall-form").addEventListener("submit", addWallComment);
  el("btn-clear-wall").addEventListener("click", () => {
    el("wall-message").value = "";
    el("wall-message").focus();
  });
  el("btn-add-game").addEventListener("click", () => openJogoModal());
  el("btn-copy-games").addEventListener("click", () => copyText(gamesText(), "Jogos copiados para WhatsApp."));
  el("search-jogo").addEventListener("input", renderJogos);
  el("filter-jogo-status").addEventListener("change", renderJogos);
  el("jogo-form").addEventListener("submit", saveJogo);
  el("confirm-cancel").addEventListener("click", closeConfirm);
  el("confirm-ok").addEventListener("click", () => {
    if (pendingConfirm) pendingConfirm();
    closeConfirm();
  });

  document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      el(closeButton.dataset.closeModal).hidden = true;
      return;
    }

    if (event.target.classList.contains("modal-overlay")) {
      event.target.hidden = true;
      if (event.target.id === "confirm-modal") pendingConfirm = null;
      return;
    }

    const emojiButton = event.target.closest("[data-emoji]");
    if (emojiButton) {
      el("wall-message").value = `${emojiButton.dataset.emoji} ${el("wall-message").value}`;
      el("wall-message").focus();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const { action, id } = actionButton.dataset;

    if (action === "edit-participant") {
      const participant = state.participants.find((item) => item.id === id);
      if (participant) openParticipantModal(participant);
    }
    if (action === "delete-participant") askDeleteParticipant(id);
    if (action === "delete-notice") deleteAdminAnnouncement(id);
    if (action === "delete-comment") deleteWallComment(id);
    if (action === "edit-game") {
      const jogo = state.jogos.find((item) => item.id === id);
      if (jogo) openJogoModal(jogo);
    }
    if (action === "delete-game") askDeleteJogo(id);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    el("participant-modal").hidden = true;
    el("jogo-modal").hidden = true;
    closeConfirm();
  });
}

function renderAll() {
  renderParticipants();
  renderAdminAnnouncements();
  renderWallComments();
  renderActivityHistory();
  renderJogos();
}

bindEvents();
renderAll();