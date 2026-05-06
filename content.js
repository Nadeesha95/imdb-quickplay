(function () {
  const host = window.location.hostname;

  if (host.includes("imdb.com")) {
    handleIMDB();
  } else if (host.includes("google.com")) {
    handleGoogle();
  }

  /* ─────────────────────────────────────────
     SHARED: Floating Button
  ───────────────────────────────────────── */
  function injectFloatingButton(url) {
    if (document.getElementById("watchnow-btn-container")) return;

    const container = document.createElement("div");
    container.id = "watchnow-btn-container";
    container.innerHTML = `
      <button id="watchnow-btn">
        <span>▶</span>
        <span>Watch Now</span>
      </button>
    `;
    container.querySelector("button").addEventListener("click", () => {
      window.open(url, "_blank");
    });
    document.body.appendChild(container);
  }

  /* ─────────────────────────────────────────
     IMDB Handler
  ───────────────────────────────────────── */
  function handleIMDB() {
    const match = window.location.pathname.match(/\/title\/(tt\d+)/);
    if (!match) return;

    const playUrl = window.location.href.replace("www.imdb.com", "www.playimdb.com");

    injectFloatingButton(playUrl);

    // Inline button near the title
    const selectors = [
      '[data-testid="hero-title-block__ctas"]',
      '[data-testid="tm-box-wl-button"]',
      '[data-testid="hero-rating-bar__aggregate-rating"]',
      "h1",
    ];

    let target = null;
    for (const sel of selectors) {
      target = document.querySelector(sel);
      if (target) break;
    }
    if (!target) return;

    const wrapper = document.createElement("div");
    wrapper.id = "watchnow-inline-wrapper";
    wrapper.innerHTML = `<a id="watchnow-inline-btn" href="${playUrl}" target="_blank" rel="noopener noreferrer">▶&nbsp;&nbsp;Watch Now</a>`;
    target.insertAdjacentElement("afterend", wrapper);
  }

  /* ─────────────────────────────────────────
     GOOGLE SEARCH Handler
  ───────────────────────────────────────── */
  function handleGoogle() {
    tryInjectGoogle();

    // Google loads content dynamically, watch for changes
    const observer = new MutationObserver(() => tryInjectGoogle());
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }

  function tryInjectGoogle() {
    if (document.getElementById("watchnow-google-btn")) return;

    // Strategy 1: Find an IMDB link directly in search results
    const imdbLink = document.querySelector('a[href*="imdb.com/title/tt"]');
    if (imdbLink) {
      const idMatch = imdbLink.href.match(/\/title\/(tt\d+)/);
      if (idMatch) {
        const playUrl = `https://www.playimdb.com/title/${idMatch[1]}/`;
        injectGoogleButton(playUrl);
        injectFloatingButton(playUrl);
        return;
      }
    }

    // Strategy 2: Use the movie title from the knowledge panel + search on playimdb
    const title = getKnowledgePanelTitle();
    if (title && isMovieOrTVSearch()) {
      const searchUrl = `https://www.playimdb.com/search/?q=${encodeURIComponent(title)}`;
      injectGoogleButton(searchUrl);
      injectFloatingButton(searchUrl);
    }
  }

  function getKnowledgePanelTitle() {
    const selectors = [
      '[data-attrid="title"] span',
      ".qrShPb span",
      ".SPZz6b span",
      '[role="heading"][aria-level="2"]',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.textContent.trim().length > 1) return el.textContent.trim();
    }
    return null;
  }

  function isMovieOrTVSearch() {
    // Check knowledge panel attributes for film/TV signals
    const movieAttrs = [
      '[data-attrid*="film"]',
      '[data-attrid*="movie"]',
      '[data-attrid*="director"]',
      '[data-attrid*="cast"]',
      '[data-attrid*="tv"]',
      '[data-attrid="kc:/film/film:initial_release_date"]',
      '[data-attrid="kc:/tv/tv_program:seasons"]',
    ];
    for (const sel of movieAttrs) {
      if (document.querySelector(sel)) return true;
    }
    // Also check search query keywords
    const q = new URLSearchParams(window.location.search).get("q") || "";
    return /\b(movie|film|series|season|watch|trailer|tv show|episode|imdb)\b/i.test(q);
  }

  function injectGoogleButton(url) {
    if (document.getElementById("watchnow-google-btn")) return;

    // Find the knowledge panel to inject into
    const targets = [
      '[data-attrid="title"]',
      ".kp-header",
      ".I6TXqe",
      "#rhs",
    ];

    let target = null;
    for (const sel of targets) {
      target = document.querySelector(sel);
      if (target) break;
    }
    if (!target) return;

    const btn = document.createElement("a");
    btn.id = "watchnow-google-btn";
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.innerHTML = `▶&nbsp;&nbsp;Watch Now`;

    const wrapper = document.createElement("div");
    wrapper.id = "watchnow-google-wrapper";
    wrapper.appendChild(btn);

    target.insertAdjacentElement("afterend", wrapper);
  }
})();