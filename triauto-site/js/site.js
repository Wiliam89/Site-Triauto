/* =====================================================================
   TRIAUTO — FUNCIONAMENTO DO SITE
   Este arquivo lê o conteudo.js e monta as seções. Não precisa mexer.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.TRIAUTO || {};
  var E = C.empresa || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Links de WhatsApp, Instagram e dados ---------- */
  var linkWhats = "https://wa.me/" + (E.whatsappNumero || "5537988389470") +
    "?text=" + encodeURIComponent(E.whatsappMensagem || "Olá! Vim pelo site.");
  $$("[data-whats]").forEach(function (a) {
    a.href = linkWhats; a.target = "_blank"; a.rel = "noopener";
  });
  if (E.instagramLink) $$("[data-insta]").forEach(function (a) { a.href = E.instagramLink; });
  $$("[data-campo]").forEach(function (el) {
    var v = E[el.getAttribute("data-campo")];
    if (v) el.textContent = v;
  });
  if (E.horario) $("#itemHorario").hidden = false;

  var enderecoCompleto = [E.endereco, E.cidade, E.cep].filter(Boolean).join(", ");
  var buscaMapa = encodeURIComponent((E.nome ? E.nome + ", " : "") + enderecoCompleto);
  $("#mapa").src = "https://www.google.com/maps?q=" + encodeURIComponent(enderecoCompleto) + "&z=16&output=embed";
  $("#linkRota").href = "https://www.google.com/maps/dir/?api=1&destination=" + buscaMapa;
  $("#ano").textContent = new Date().getFullYear();

  /* ---------- Serviços ---------- */
  var listaServicos = $("#listaServicos");
  (C.servicos || []).forEach(function (s) {
    var art = document.createElement("article");
    art.className = "servico";
    art.innerHTML =
      '<svg aria-hidden="true"><use href="#s-' + esc(s.icone || "chave") + '"/></svg>' +
      "<h3>" + esc(s.titulo) + "</h3><p>" + esc(s.texto) + "</p>";
    listaServicos.appendChild(art);
  });

  /* ---------- Antes e depois ---------- */
  var pares = C.antesDepois || [];
  var comparador = $("#comparador");
  var controle = $("#cmpControle");
  var lista = $("#cmpLista");

  var parAtual = -1;
  function mostrarPar(i, imediato) {
    var p = pares[i];
    if (!p || i === parAtual) return;
    parAtual = i;
    $$(".trabalho", lista).forEach(function (b, n) { b.setAttribute("aria-selected", n === i ? "true" : "false"); });
    if (imediato || movimentoReduzido) return trocarPar(p);
    comparador.classList.add("trocando");
    setTimeout(function () {
      trocarPar(p);
      var antes = $("#cmpAntes");
      var revelar = function () { requestAnimationFrame(function () { comparador.classList.remove("trocando"); }); };
      if (antes.complete) revelar(); else { antes.onload = revelar; antes.onerror = revelar; }
    }, 380);
  }
  function trocarPar(p) {
    $("#cmpAntes").src = p.antes;
    $("#cmpAntes").alt = p.titulo + " — antes";
    $("#cmpDepois").src = p.depois;
    $("#cmpDepois").alt = p.titulo + " — depois";
    controle.value = 50; posicionar(50);
  }
  function posicionar(v) { comparador.style.setProperty("--pos", v + "%"); }

  if (pares.length) {
    pares.forEach(function (p, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "trabalho"; b.setAttribute("role", "tab");
      b.innerHTML = '<img src="' + esc(p.depois) + '" alt="" loading="lazy"><span>' + esc(p.titulo) + "</span>";
      b.addEventListener("click", function () { mostrarPar(i); });
      lista.appendChild(b);
    });
    if (pares.length < 2) lista.hidden = true;
    controle.addEventListener("input", function () { posicionar(controle.value); });
    mostrarPar(0, true);
  } else {
    $("#antes-depois").hidden = true;
    var linkAD = $('a[href="#antes-depois"]'); if (linkAD) linkAD.hidden = true;
  }

  /* ---------- Galeria ---------- */
  var itens = C.galeria || [];
  var grade = $("#listaGaleria");
  var visiveis = [];

  function montarGaleria(filtro) {
    grade.innerHTML = "";
    visiveis = itens.filter(function (it) { return filtro === "todos" || it.tipo === filtro; });
    visiveis.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "midia" + (it.tipo === "video" ? " midia--video" : "");
      b.setAttribute("aria-label", (it.tipo === "video" ? "Assistir vídeo: " : "Ampliar foto: ") + (it.legenda || ""));
      var imagem = it.tipo === "video" ? (it.capa || "") : it.arquivo;
      b.innerHTML =
        (imagem ? '<img src="' + esc(imagem) + '" alt="" loading="lazy">' : "") +
        (it.tipo === "video" ? '<span class="midia__play"><svg class="i"><use href="#i-play"/></svg></span>' : "") +
        (it.legenda ? "<figcaption>" + esc(it.legenda) + "</figcaption>" : "");
      b.style.setProperty("--i", i);
      b.addEventListener("click", function () { abrirJanela(i); });
      grade.appendChild(b);
    });
  }
  if (itens.length) {
    montarGaleria("todos");
    if (!itens.some(function (i) { return i.tipo === "video"; })) $(".filtros").hidden = true;
  } else {
    $("#galeria").hidden = true;
  }
  $$(".filtro").forEach(function (f) {
    f.addEventListener("click", function () {
      $$(".filtro").forEach(function (o) { o.classList.remove("ativo"); o.setAttribute("aria-pressed", "false"); });
      f.classList.add("ativo"); f.setAttribute("aria-pressed", "true");
      var filtro = f.getAttribute("data-filtro");
      if (movimentoReduzido) return montarGaleria(filtro);
      grade.classList.add("saindo");
      setTimeout(function () {
        grade.classList.remove("saindo", "visivel");
        montarGaleria(filtro);
        void grade.offsetWidth;            // reinicia a entrada em cascata
        grade.classList.add("visivel");
      }, 300);
    });
  });

  /* ---------- Janela (ampliar foto / tocar vídeo) ---------- */
  var janela = $("#janela"), janelaMidia = $("#janelaMidia"), atual = 0, focoAnterior = null;

  function renderJanela(direcao) {
    if (direcao && !movimentoReduzido) {
      janelaMidia.style.setProperty("--dir", (direcao > 0 ? "-28px" : "28px"));
      janelaMidia.classList.add("trocando");
      setTimeout(function () {
        janelaMidia.style.setProperty("--dir", (direcao > 0 ? "28px" : "-28px"));
        desenharJanela();
        requestAnimationFrame(function () { requestAnimationFrame(function () { janelaMidia.classList.remove("trocando"); }); });
      }, 200);
      return;
    }
    desenharJanela();
  }
  function desenharJanela() {
    var it = visiveis[atual];
    if (!it) return;
    var html = it.tipo === "video"
      ? '<video src="' + esc(it.arquivo) + '" ' + (it.capa ? 'poster="' + esc(it.capa) + '" ' : "") + 'controls autoplay playsinline></video>'
      : '<img src="' + esc(it.arquivo) + '" alt="' + esc(it.legenda || "") + '">';
    janelaMidia.innerHTML = html + (it.legenda ? "<figcaption>" + esc(it.legenda) + "</figcaption>" : "");
    var unico = visiveis.length < 2;
    $("#janelaAnt").hidden = unico; $("#janelaProx").hidden = unico;
  }
  function abrirJanela(i) {
    focoAnterior = document.activeElement;
    atual = i; renderJanela();
    janela.hidden = false; document.body.style.overflow = "hidden";
    janela.classList.add("fechada");
    requestAnimationFrame(function () { requestAnimationFrame(function () { janela.classList.remove("fechada"); }); });
    $("#janelaFechar").focus();
  }
  function fecharJanela() {
    var v = $("video", janelaMidia); if (v) v.pause();
    janela.classList.add("fechada");
    setTimeout(function () {
      janela.hidden = true; janelaMidia.innerHTML = ""; document.body.style.overflow = "";
    }, movimentoReduzido ? 0 : 350);
    if (focoAnterior) focoAnterior.focus();
  }
  function passar(d) { atual = (atual + d + visiveis.length) % visiveis.length; renderJanela(d); }

  $("#janelaFechar").addEventListener("click", fecharJanela);
  $("#janelaAnt").addEventListener("click", function () { passar(-1); });
  $("#janelaProx").addEventListener("click", function () { passar(1); });
  janela.addEventListener("click", function (e) { if (e.target === janela) fecharJanela(); });
  document.addEventListener("keydown", function (e) {
    if (janela.hidden) return;
    if (e.key === "Escape") fecharJanela();
    if (e.key === "ArrowLeft") passar(-1);
    if (e.key === "ArrowRight") passar(1);
  });

  /* ---------- Menu do celular ---------- */
  var menu = $("#menu"), menuBotao = $("#menuBotao");
  function alternarMenu(abrir) {
    menu.classList.toggle("aberto", abrir);
    menuBotao.setAttribute("aria-expanded", abrir ? "true" : "false");
    menuBotao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = abrir ? "hidden" : "";
  }
  menuBotao.addEventListener("click", function () { alternarMenu(!menu.classList.contains("aberto")); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { alternarMenu(false); }); });

  /* ---------- Cabeçalho muda ao rolar + item do menu atual ---------- */
  var topo = $("#topo");
  function aoRolar() { topo.classList.toggle("rolou", window.scrollY > 30); }
  window.addEventListener("scroll", aoRolar, { passive: true }); aoRolar();

  if ("IntersectionObserver" in window) {
    var links = $$('.menu a[href^="#"]');
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("atual", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { obs.observe(s); });
  }

  /* ---------- Topo: vídeo opcional e reflexo na pintura ---------- */
  var pintura = $("#pintura");
  if (C.videoTopo) {
    var v = $("#heroVideo");
    v.src = C.videoTopo;
    v.addEventListener("canplay", function () { v.classList.add("pronto"); v.play().catch(function () {}); });
    v.load();
  }
  if (!movimentoReduzido) {
    var alvoX = 30, alvoY = 30, x = 30, y = 30, rodando = false;
    function animar() {
      x += (alvoX - x) * 0.08; y += (alvoY - y) * 0.08;
      pintura.style.setProperty("--x", x.toFixed(2) + "%");
      pintura.style.setProperty("--y", y.toFixed(2) + "%");
      if (Math.abs(alvoX - x) > 0.1 || Math.abs(alvoY - y) > 0.1) requestAnimationFrame(animar);
      else rodando = false;
    }
    $(".hero").addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var r = pintura.getBoundingClientRect();
      alvoX = 10 + ((e.clientX - r.left) / r.width) * 80;
      alvoY = 10 + ((e.clientY - r.top) / r.height) * 60;
      if (!rodando) { rodando = true; requestAnimationFrame(animar); }
    });
  }
})();
