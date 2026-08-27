(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  function cardHTML(p) {
    const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join("");
    const status = p.status ? `<div class="card__status">● ${p.status}</div>` : "";
    const ctas = [];
    if (p.view) {
      const label = p.viewLabel || p.linkLabel || "View online";
      const ready = /^https?:\/\//i.test(p.view);
      ctas.push(ready
        ? `<a class="card__cta" href="${p.view}" target="_blank" rel="noopener">${label} ↗</a>`
        : `<span class="card__cta card__cta--soon" title="Link belum dipasang">${label} — coming soon</span>`);
    }
    if (p.link) {
      const label = p.linkLabel || "Open";
      ctas.push(`<a class="card__cta" href="${p.link}" target="_blank" rel="noopener">${label} ↗</a>`);
    }
    if (p.pdf) {
      const label = p.pdfLabel || "View preview (PDF)";
      ctas.push(`<a class="card__cta" href="${p.pdf}" target="_blank" rel="noopener">${label} ↗</a>`);
    }
    if (p.file) {
      const label = p.fileLabel || "Download";
      ctas.push(`<a class="card__cta" href="${p.file}" download>${label} ↓</a>`);
    }
    const cta = ctas.join("");
    const note = p.note ? `<p class="card__note">${p.note}</p>` : "";
    return `
      <article class="card" data-tilt>
        ${status}
        <div class="card__top">
          <span class="card__kind">${p.kind}</span>
          <span class="card__year">${p.year}</span>
        </div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__tags">${tags}</div>
        ${cta ? `<div class="card__foot">${cta}${note}</div>` : ""}
      </article>`;
  }

  function expHTML(e) {
    const points = e.points.map((x) => `<li>${x}</li>`).join("");
    return `
      <article class="card exp" data-tilt>
        <div>
          <div class="exp__when">${e.when}</div>
          <div class="exp__org">${e.org}</div>
        </div>
        <div>
          <h3 class="exp__role">${e.role}</h3>
          <ul class="exp__list">${points}</ul>
        </div>
      </article>`;
  }

  function chipsHTML(list) {
    return list
      .map(([name, lvl]) => `<li>${name}${lvl ? `<b>${lvl}</b>` : ""}</li>`)
      .join("");
  }

  const ACCENTS = {
    dev:     { a: "#e0a458", s: "#f2c98a" },
    data:    { a: "#4fd1c5", s: "#8ef0e7" },
    support: { a: "#a78bfa", s: "#c9b8ff" }
  };

  const stage = $("#stage");
  const switchEl = $("#switch");
  const order = PORTFOLIO.trackOrder;
  let activeTrack = order[0];

  function setAccent(key) {
    const c = ACCENTS[key] || ACCENTS.dev;
    document.documentElement.style.setProperty("--accent", c.a);
    document.documentElement.style.setProperty("--accent-soft", c.s);
    document.body.dataset.theme = key;
    if (window.__setHeroColor) window.__setHeroColor(c.a);
  }

  function buildSwitch() {
    switchEl.innerHTML = order
      .map((key) => {
        const m = PORTFOLIO.meta[key];
        const on = key === activeTrack;
        return `<button class="switch__pill${on ? " is-active" : ""}"
                  role="tab" aria-selected="${on}" data-go="${key}">
                  <span class="switch__dot" style="--c:${ACCENTS[key].a}"></span>
                  ${m.label}
                </button>`;
      })
      .join("");
  }

  function stageHTML(key) {
    const m = PORTFOLIO.meta[key];
    let body, label;
    if (key === "support") {
      body = `<div class="grid grid--exp">${PORTFOLIO.support.map(expHTML).join("")}</div>`;
      label = "Toolkit";
      var chips = chipsHTML(PORTFOLIO.chips.support);
    } else {
      body = `<div class="grid">${PORTFOLIO[key].map(cardHTML).join("")}</div>`;
      label = "Stack";
      var chips = chipsHTML(PORTFOLIO.chips[key]);
    }
    return `
      <div class="section__head">
        <div class="section__index">${(order.indexOf(key) + 1).toString().padStart(2, "0")}</div>
        <div>
          <p class="eyebrow">${m.eyebrow}</p>
          <h2 class="section__title">${m.title[0]}<span class="amp">·</span>${m.title[1]}</h2>
          <p class="section__sub">${m.sub}</p>
        </div>
      </div>
      ${body}
      <div class="skills">
        <p class="skills__label">${label}</p>
        <ul class="chips">${chips}</ul>
      </div>`;
  }

  function tiltBind(scope) {
    if (reduceMotion) return;
    $$("[data-tilt]", scope).forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        if (e.target.closest("a, button")) {
          card.style.transform = "";
          return;
        }
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
        card.style.transform =
          `perspective(1000px) rotateY(${(px - 0.5) * 3}deg) rotateX(${(0.5 - py) * 3}deg) translateY(-2px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  function showTrack(key, animate = true) {
    if (!PORTFOLIO.meta[key]) return;
    activeTrack = key;
    setAccent(key);
    buildSwitch();

    const render = () => {
      stage.innerHTML = stageHTML(key);
      tiltBind(stage);
      $$(".card", stage).forEach((c, i) => {
        c.style.setProperty("--d", (i % 4) * 0.06 + "s");
      });
      requestAnimationFrame(() => stage.classList.add("is-in"));
    };

    if (animate && !reduceMotion) {
      stage.classList.remove("is-in");
      stage.classList.add("is-out");
      setTimeout(() => {
        stage.classList.remove("is-out");
        render();
      }, 280);
    } else {
      render();
    }
  }

  showTrack(activeTrack, false);
  requestAnimationFrame(() => stage.classList.add("is-in"));

  switchEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-go]");
    if (btn) showTrack(btn.dataset.go);
  });

  $$(".nav__links a[data-track]").forEach((a) =>
    a.addEventListener("click", () => {
      showTrack(a.dataset.track);
    })
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal, .reveal-up").forEach((el) => io.observe(el));

  const nav = $("#nav");
  const links = $(".nav__links");
  const toggle = $("#navToggle");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  });
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      nav.classList.remove("is-open");
    })
  );

  (function rotator() {
    const el = $("[data-words]");
    if (!el) return;
    const words = PORTFOLIO.rotatorWords;
    let wi = 0, ci = 0, deleting = false;
    function tick() {
      const word = words[wi];
      el.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) ci++;
      else if (deleting && ci > 0) ci--;
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1400); return; }
      else { deleting = false; wi = (wi + 1) % words.length; }
      setTimeout(tick, deleting ? 45 : 95);
    }
    if (reduceMotion) { el.textContent = words[0]; } else tick();
  })();

  (function hero3d() {
    const canvas = $("#hero3d");
    if (!canvas || typeof THREE === "undefined" || reduceMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geo = new THREE.IcosahedronGeometry(1.7, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x121521, metalness: 0.4, roughness: 0.5, flatShading: true
    });
    const solid = new THREE.Mesh(geo, mat);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xe0a458 })
    );

    const group = new THREE.Group();
    group.add(solid); group.add(wire);
    group.position.x = 1.6;
    scene.add(group);

    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pos[i] = (Math.random() - 0.5) * 14;
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xe0a458, size: 0.03, transparent: true, opacity: 0.6 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xe0a458, 0.9);
    rim.position.set(-4, -2, 2); scene.add(rim);
    scene.add(new THREE.AmbientLight(0x404758, 0.6));

    let curColor = new THREE.Color(0xe0a458);
    let tgtColor = new THREE.Color(0xe0a458);
    window.__setHeroColor = (hex) => tgtColor.set(hex);

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("mousemove", (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    });

    function size() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      }
    }

    let raf;
    function loop(t) {
      size();
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      group.rotation.y = t * 0.00018 + mx * 0.6;
      group.rotation.x = my * 0.5;
      group.position.y = Math.sin(t * 0.0009) * 0.18;
      points.rotation.y = t * 0.00005;

      curColor.lerp(tgtColor, 0.06);
      wire.material.color.copy(curColor);
      rim.color.copy(curColor);
      pMat.color.copy(curColor);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    });
    raf = requestAnimationFrame(loop);
  })();
})();
