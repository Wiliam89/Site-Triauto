/* =====================================================================
   TRIAUTO — ANIMAÇÕES (não precisa mexer)
   Abertura, entrada do topo, revelações ao rolar, profundidade (parallax),
   cabeçalho que se esconde, barra de progresso e demonstração do
   comparador antes/depois.
   ===================================================================== */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var anima = raiz.classList.contains("anima");
  var comAbertura = raiz.classList.contains("com-abertura");

  /* ---------- Quebra títulos em palavras (para entrarem uma a uma) ---------- */
  function quebrarEmPalavras(el) {
    if (!el || el.dataset.quebrado) return;
    var texto = el.textContent.trim();
    el.setAttribute("aria-label", texto);
    el.innerHTML = texto.split(/\s+/).map(function (p, i) {
      return '<span class="palavra" aria-hidden="true" style="--i:' + i + '"><span>' + p + "</span></span>";
    }).join(" ");
    el.dataset.quebrado = "1";
  }

  quebrarEmPalavras($(".hero__titulo"));
  $$(".secao__cabeca h2, .contato h2, .chamada h2").forEach(function (h) {
    quebrarEmPalavras(h);
    h.classList.add("titulo-anima");
  });

  /* ---------- Engrenagens: giram engatadas, mais rápido quando a página rola ---------- */
  var engrenagens = $$(".eng").map(function (g) {
    return { el: g, fator: parseFloat(g.getAttribute("data-giro")) || 1, fase: parseFloat(g.getAttribute("data-fase")) || 0, visivel: true };
  });
  function posicionarEngrenagens(angulo) {
    engrenagens.forEach(function (e) {
      if (e.visivel) e.el.setAttribute("transform", "rotate(" + (angulo * e.fator + e.fase).toFixed(2) + ")");
    });
  }
  posicionarEngrenagens(0);

  /* Sem animação (movimento reduzido): para por aqui, tudo fica visível e parado */
  if (!anima) return;

  if ("IntersectionObserver" in window) {
    var obsEng = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        engrenagens.forEach(function (e) { if (en.target.contains(e.el)) e.visivel = en.isIntersecting; });
      });
    });
    $$(".engrenagens").forEach(function (box) { obsEng.observe(box); });
  }
  var anguloRolagem = 0, anguloAlvo = 0, t0Eng = performance.now();
  window.addEventListener("scroll", function () { anguloAlvo = window.scrollY * 0.09; }, { passive: true });
  (function girar(agora) {
    anguloRolagem += (anguloAlvo - anguloRolagem) * 0.07;     // inércia, como peça pesada
    var giroLento = ((agora - t0Eng) / 1000) * 3;              // 3 graus por segundo parado
    posicionarEngrenagens(giroLento + anguloRolagem);
    requestAnimationFrame(girar);
  })(t0Eng);

  /* ---------- Marca o que deve aparecer ao rolar ---------- */
  function marcar(seletor, tipo, passo, base) {
    $$(seletor).forEach(function (el, i) {
      el.setAttribute("data-revela", tipo);
      el.style.setProperty("--atraso", ((base || 0) + i * (passo || 0)) + "ms");
    });
  }
  marcar(".secao__cabeca p", "subir", 0, 250);
  marcar(".filtros", "direita", 0, 300);
  marcar(".servico", "subir", 90);
  marcar(".comparador", "cortina", 0);
  marcar(".trabalho", "direita", 110, 300);
  marcar(".etapas li", "subir", 140);
  marcar(".chamada p", "subir", 0, 300);
  marcar(".chamada .botao", "escala", 0, 450);
  marcar(".contato__lista li", "esquerda", 100, 200);
  marcar(".contato__mapa", "cortina-lado", 0, 150);
  marcar(".galeria__mais", "subir", 0, 400);
  marcar(".rodape__dentro > *", "subir", 90);

  var observados = $$("[data-revela], .titulo-anima, .galeria, .chamada, .etapas li");

  if ("IntersectionObserver" in window) {
    // Elementos com efeito "cortina" começam 100% recortados e o navegador não
    // os enxerga; nesses casos observamos a moldura (o elemento pai).
    var alvos = new Map();
    function revelar(el) {
      el.classList.add("visivel");
      el.dispatchEvent(new CustomEvent("revelado"));
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        (alvos.get(en.target) || [en.target]).forEach(revelar);
        obs.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    observados.forEach(function (el) {
      var tipo = el.getAttribute("data-revela") || "";
      var alvo = tipo.indexOf("cortina") === 0 ? el.parentElement : el;
      if (!alvos.has(alvo)) alvos.set(alvo, []);
      alvos.get(alvo).push(el);
      obs.observe(alvo);
    });
  } else {
    observados.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- Entrada do topo ---------- */
  function iniciarTopo() {
    raiz.classList.add("hero-pronto");
    var pintura = $("#pintura");
    if (pintura) {
      pintura.classList.remove("varrendo");
      void pintura.offsetWidth;            // reinicia a varredura de luz
      pintura.classList.add("varrendo");
    }
  }
  var esperaFontes = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  var atraso = comAbertura ? 1150 : 60;
  var inicio = Date.now();
  Promise.race([esperaFontes, new Promise(function (r) { setTimeout(r, 800); })]).then(function () {
    setTimeout(iniciarTopo, Math.max(0, atraso - (Date.now() - inicio)));
  });

  /* ---------- Rolagem: progresso, cabeçalho, profundidade, botão do WhatsApp ---------- */
  var progresso = document.createElement("div");
  progresso.className = "progresso";
  progresso.setAttribute("aria-hidden", "true");
  document.body.appendChild(progresso);

  var topo = $("#topo"), menu = $("#menu");
  var heroConteudo = $(".hero__conteudo"), pinturaEl = $("#pintura"), hero = $(".hero");
  var whats = $(".whats-flutuante");
  var ultimoY = window.scrollY, agendado = false;

  function aoRolar() {
    agendado = false;
    var y = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    progresso.style.setProperty("--p", total > 0 ? (y / total).toFixed(4) : 0);

    // cabeçalho some quando desce, volta quando sobe
    var menuAberto = menu && menu.classList.contains("aberto");
    if (!menuAberto && y > 320 && y > ultimoY + 4) topo.classList.add("escondido");
    else if (y < ultimoY - 4 || y <= 320) topo.classList.remove("escondido");
    ultimoY = y;

    // profundidade no topo
    var alturaHero = hero ? hero.offsetHeight : 0;
    if (y < alturaHero && raiz.classList.contains("hero-pronto")) {
      var f = y / alturaHero;
      heroConteudo.style.transform = "translateY(" + (y * 0.28).toFixed(1) + "px)";
      heroConteudo.style.opacity = (1 - f * 1.15).toFixed(3);
      pinturaEl.style.transform = "translateY(" + (y * 0.12).toFixed(1) + "px) scale(" + (1 + f * 0.06).toFixed(4) + ")";
    }

    // botão do WhatsApp aparece depois do topo
    if (whats) whats.classList.toggle("aparece", y > 380);
  }
  window.addEventListener("scroll", function () {
    if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  aoRolar();

  // quando a transição de entrada termina, a profundidade passa a controlar o topo
  setTimeout(function () {
    if (pinturaEl) pinturaEl.style.transition = "none";
    if (heroConteudo) heroConteudo.style.transition = "none";
  }, atraso + 2600);

  /* ---------- Antes e depois: demonstração automática ---------- */
  var comparador = $("#comparador"), controle = $("#cmpControle");
  if (comparador && controle) {
    var mexeu = false;
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      comparador.addEventListener(ev, function () { mexeu = true; }, { passive: true });
    });

    function demonstrar() {
      if (mexeu) return;
      comparador.classList.add("demonstrando");
      var quadros = [50, 16, 84, 50], dur = 2600, t0 = null;
      function suave(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
      function passo(ts) {
        if (mexeu) { comparador.classList.remove("demonstrando"); return; }
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var seg = Math.min(quadros.length - 2, Math.floor(p * (quadros.length - 1)));
        var local = suave(p * (quadros.length - 1) - seg);
        var v = quadros[seg] + (quadros[seg + 1] - quadros[seg]) * local;
        controle.value = v;
        comparador.style.setProperty("--pos", v + "%");
        if (p < 1) requestAnimationFrame(passo);
        else comparador.classList.remove("demonstrando");
      }
      requestAnimationFrame(passo);
    }
    comparador.addEventListener("revelado", function () { setTimeout(demonstrar, 900); });
  }
})();
