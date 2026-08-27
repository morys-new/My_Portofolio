(function () {
  "use strict";

  var OWNER = "Mourrynes Pasa";
  var YEAR = new Date().getFullYear();

  document.addEventListener("contextmenu", function (e) { e.preventDefault(); }, { capture: true });

  document.addEventListener("dragstart", function (e) { e.preventDefault(); }, { capture: true });

  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    if (
      (ctrl && ["s", "u", "p"].indexOf(k) !== -1) ||
      (e.key === "F12") ||
      (ctrl && e.shiftKey && ["i", "j", "c"].indexOf(k) !== -1)
    ) {
      e.preventDefault();
      e.stopPropagation();
      flash();
      return false;
    }
  }, { capture: true });

  var css = document.createElement("style");
  css.textContent =
    "img,canvas{ -webkit-user-drag:none; user-drag:none; pointer-events:auto; }" +
    "body{ -webkit-touch-callout:none; }" +
    "*:not(input):not(textarea):not([contenteditable]){ -webkit-user-select:none; -moz-user-select:none; user-select:none; }" +
    ".__owner_badge{position:fixed;right:10px;bottom:10px;z-index:2147483647;" +
    "font:600 11px/1.4 system-ui,sans-serif;color:#fff;background:rgba(15,17,23,.82);" +
    "border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:6px 11px;" +
    "letter-spacing:.3px;backdrop-filter:blur(6px);pointer-events:none;user-select:none;}" +
    ".__owner_wm{position:fixed;inset:0;z-index:2147483646;pointer-events:none;overflow:hidden;}" +
    ".__owner_wm .row{position:absolute;left:-20%;width:140%;white-space:nowrap;" +
    "transform:rotate(-30deg);font:800 30px/1 system-ui,sans-serif;letter-spacing:3px;" +
    "color:rgba(255,255,255,.10);text-shadow:0 1px 2px rgba(0,0,0,.15);}" +
    ".__owner_flash{position:fixed;left:50%;top:24px;transform:translateX(-50%);" +
    "z-index:2147483647;background:rgba(15,17,23,.95);color:#fff;border:1px solid rgba(255,255,255,.2);" +
    "padding:10px 18px;border-radius:10px;font:500 13px system-ui,sans-serif;opacity:0;" +
    "transition:opacity .25s;pointer-events:none;}";
  document.head.appendChild(css);

  function addBadge() {
    if (document.querySelector(".__owner_badge")) return;
    var wm = document.createElement("div");
    wm.className = "__owner_wm";
    var text = "FOR JOB-SEEKING PURPOSES ONLY  ·  © " + OWNER + "  ";
    var line = "";
    for (var i = 0; i < 8; i++) line += text;
    for (var y = -10; y < 130; y += 14) {
      var r = document.createElement("div");
      r.className = "row";
      r.style.top = y + "%";
      r.textContent = line;
      wm.appendChild(r);
    }
    document.body.appendChild(wm);

    var b = document.createElement("div");
    b.className = "__owner_badge";
    b.textContent = "© " + YEAR + " " + OWNER + " — view only";
    document.body.appendChild(b);
  }

  var flashEl;
  function flash() {
    if (!flashEl) {
      flashEl = document.createElement("div");
      flashEl.className = "__owner_flash";
      document.body.appendChild(flashEl);
    }
    flashEl.textContent = "🔒 Protected work — © " + OWNER;
    flashEl.style.opacity = "1";
    clearTimeout(flash._t);
    flash._t = setTimeout(function () { flashEl.style.opacity = "0"; }, 1400);
  }

  if (document.body) addBadge();
  else document.addEventListener("DOMContentLoaded", addBadge);

  try {
    console.log("%c© " + YEAR + " " + OWNER, "font-size:14px;font-weight:700;color:#e0a458");
    console.log("%cThis work is the property of " + OWNER + ". View only — please do not copy or redistribute.",
      "color:#9aa0ad");
  } catch (e) {}
})();
