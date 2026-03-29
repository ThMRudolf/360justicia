// ── Bio toggle ──────────────────────────────────────────────────────────────

let activeCard = null;
let activeBioId = null;

function toggleBio(bioId, card) {
  const panel = document.getElementById(bioId);
  const hint = card.querySelector('.bio-hint');
  const isSame = bioId === activeBioId;

  // close any open panel
  if (activeBioId) {
    document.getElementById(activeBioId).style.display = 'none';
    activeCard.querySelector('.bio-hint').textContent = 'Click para leer más ▾';
  }

  // if clicking a different card, open it
  if (!isSame) {
    panel.style.display = 'block';
    hint.textContent = 'Click para cerrar ▴';
    activeBioId = bioId;
    activeCard = card;
  } else {
    activeBioId = null;
    activeCard = null;
  }
}

// ── Contact form ─────────────────────────────────────────────────────────────

(() => {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return; // only runs on pages that have the contact form

  const ok  = document.getElementById("formOk");
  const err = document.getElementById("formErr");
  const btn = document.getElementById("sendBtn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    ok.classList.add("d-none");
    err.classList.add("d-none");

    // Bootstrap validation UI
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // Send to Formspree without leaving the page
    btn.disabled = true;

    try {
      const resp = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (resp.ok) {
        ok.classList.remove("d-none");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        err.classList.remove("d-none");
        const data = await resp.json().catch(() => null);
        console.log("Formspree error:", resp.status, data);
      }
    } catch (e) {
      err.classList.remove("d-none");
    } finally {
      btn.disabled = false;
    }
  });
})();