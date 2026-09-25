(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     IKON - SVG sebaris, tanpa pustaka ikon
     Satu berkas pustaka ikon berarti satu permintaan jaringan lagi untuk
     sesuatu yang totalnya di bawah 2 KB. Warnanya diatur CSS lewat kelas
     .ico--*, jadi di sini cukup bentuknya.
     ------------------------------------------------------------------ */
  const SVG = {
    live: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
    pdf: '<path d="M14 3v5h5"/><path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-4-5Z"/><path d="M9 13h6M9 17h4"/>',
    download: '<path d="M12 4v11"/><path d="m7.5 11 4.5 4.5 4.5-4.5"/><path d="M5 20h14"/>',
    play: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="m10 8.5 6 3.5-6 3.5v-7Z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4.5 4.5L16 14l4 4"/>',
    pin: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    degree: '<path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z"/><path d="M6 11v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3V11"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10.5V17M7.5 7.2v.1M11.5 17v-3.6a2.1 2.1 0 0 1 4.2 0V17"/>',
    github: '<path d="M9 19c-4 1.4-4-2-5.5-2.5M15 21v-3.2c0-.9-.3-1.5-.7-1.8 2.4-.3 4.9-1.2 4.9-5.4 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.4-.1-2.9 0 0-.9-.3-3 1.1a10 10 0 0 0-5.2 0C7.7 4.4 6.8 4.7 6.8 4.7c-.6 1.5-.2 2.6-.1 2.9-.7.8-1.1 1.8-1.1 3 0 4.2 2.5 5.1 4.9 5.4-.3.3-.6.8-.7 1.5V21"/>'
  };

  function ico(nama, jenis) {
    return `<span class="ico ico--${jenis || nama}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${SVG[nama]}</svg></span>`;
  }

  function cardHTML(p) {
    const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join("");
    const status = p.status ? `<div class="card__status">● ${p.status}</div>` : "";
    const ctas = [];
    if (p.view) {
      const label = p.viewLabel || p.linkLabel || "View online";
      const ready = /^https?:\/\//i.test(p.view);
      ctas.push(ready
        ? `<a class="card__cta" href="${p.view}" target="_blank" rel="noopener">${ico("live")}${label}</a>`
        : `<span class="card__cta card__cta--soon" title="Link belum dipasang">${label} (coming soon)</span>`);
    }
    if (p.link) {
      const label = p.linkLabel || "Open";
      // Ikonnya mengikuti maksud tautannya, bukan jenis berkasnya: "Play"
      // berarti sesuatu yang dijalankan, sisanya gambar atau halaman.
      const bentuk = /play/i.test(label) ? "play" : "image";
      ctas.push(`<a class="card__cta" href="${p.link}" target="_blank" rel="noopener">${ico(bentuk)}${label}</a>`);
    }
    if (p.pdf) {
      const label = p.pdfLabel || "View preview (PDF)";
      ctas.push(`<a class="card__cta" href="${p.pdf}" target="_blank" rel="noopener">${ico("pdf")}${label}</a>`);
    }
    if (p.file) {
      const label = p.fileLabel || "Download";
      ctas.push(`<a class="card__cta" href="${p.file}" download>${ico("download")}${label}</a>`);
    }
    const cta = ctas.join("");
    const note = p.note ? `<p class="card__note">${p.note}</p>` : "";

    // Galeri tangkapan layar. Dipakai proyek yang tidak punya tautan hidup -
    // aplikasi di balik halaman masuk tidak bisa dicoba pengunjung, jadi yang
    // bisa ditunjukkan hanya layarnya.
    const shots = (p.shots || []).length
      ? `<div class="card__shots">${p.shots
          .map(
            (src, i) =>
              `<button class="shot" type="button" data-src="${src}" data-i="${i}" aria-label="Perbesar tangkapan layar ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`,
          )
          .join("")}</div>`
      : "";
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
        ${shots}
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
          <h2 class="section__title">${m.title[0]}<span class="amp">·</span><wbr>${m.title[1]}</h2>
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

  /* ------------------------------------------------------------------
     LIGHTBOX - tangkapan layar dibuka besar
     Satu lapisan untuk seluruh halaman, bukan satu per kartu: yang dibuka
     selalu satu gambar, dan lapisan yang menumpuk hanya menahan klik.
     ------------------------------------------------------------------ */
  function setupLightbox() {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("aria-hidden", "true");
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Tutup">×</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Sebelumnya">‹</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Berikutnya">›</button>';
    document.body.appendChild(box);

    const img = box.querySelector(".lightbox__img");
    let daftar = [];
    let posisi = 0;

    const tampil = () => {
      img.src = daftar[posisi] || "";
    };

    const buka = (sumber, i) => {
      daftar = sumber;
      posisi = i;
      tampil();
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const tutup = () => {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      img.src = "";
    };

    const geser = (arah) => {
      if (!daftar.length) return;
      posisi = (posisi + arah + daftar.length) % daftar.length;
      tampil();
    };

    document.addEventListener("click", (e) => {
      const tombol = e.target.closest(".shot");
      if (!tombol) return;
      const kartu = tombol.closest(".card");
      const semua = [...kartu.querySelectorAll(".shot")].map((b) => b.dataset.src);
      buka(semua, Number(tombol.dataset.i) || 0);
    });

    box.querySelector(".lightbox__close").addEventListener("click", tutup);
    box.querySelector(".lightbox__nav--prev").addEventListener("click", () => geser(-1));
    box.querySelector(".lightbox__nav--next").addEventListener("click", () => geser(1));
    // Klik latar menutup; klik gambarnya sendiri tidak.
    box.addEventListener("click", (e) => {
      if (e.target === box) tutup();
    });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowLeft") geser(-1);
      if (e.key === "ArrowRight") geser(1);
    });
  }

  setupLightbox();

})();
