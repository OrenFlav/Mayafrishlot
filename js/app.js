const $ = (s) => document.querySelector(s);
const app = $("#app"),
  tabs = $("#tabs");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const path = (g, i) => g.folder + encodeURI(i.file);
const docPath = (g, i) => g.folder + encodeURI(i.docx);
const wordBtn = (g, i) =>
  i.docx
    ? `<a class="btn ghost" href="${docPath(g, i)}" download>Download Word</a>`
    : "";
let renderToken = 0;

function drawTabs(active) {
  const all = [{ id: "home", short: "Home" }, ...GRADINGS];
  tabs.innerHTML = all
    .map(
      (t) =>
        `<button role="tab" aria-selected="${t.id === active}" data-id="${t.id}">${esc(t.short)}</button>`,
    )
    .join("");
  tabs.querySelectorAll("button").forEach(
    (b) =>
      (b.onclick = () => {
        location.hash = b.dataset.id;
      }),
  );
}

function home() {
  drawTabs("home");
  app.innerHTML = `
    <section class="hero">
      <h1>Araling Panlipunan</h1>
      <div class="rule"></div>
      <p>Ang Araling Panlipunan ay ang pag-aaral ng lipunan: ng kasaysayan, pamahalaan, ekonomiya, at kultura ng Pilipinas at ng mundo, upang maunawaan natin ang ating nakaraan at makapag-ambag sa kinabukasan.</p>
    </section>
    <section class="about">
      <div><h3>Para sa mga mag-aaral</h3><p>Basahin ang mga modyul sa bawat markahan, diretso sa screen o i-download para mabasa kahit walang internet.</p></div>
      <div><h3>Para sa mga guro</h3><p>Kunin ang mga kagamitang pampagkatuto sa PDF at gamitin sa klase.</p></div>
      <div><h3>Apat na markahan</h3><p>Piliin ang markahan sa itaas upang makita ang lahat ng aralin nito.</p></div>
    </section>`;
}

function links(g) {
  drawTabs(g.id);
  const safe = (u) => (/^https?:\/\//i.test(u) ? u : "#");
  const rows = g.items
    .map(
      (it) => `
    <li>
      <span class="t">${esc(it.title)}${it.desc ? `<span class="desc">${esc(it.desc)}</span>` : ""}</span>
      <span class="acts"><a class="btn" href="${esc(safe(it.url))}" target="_blank" rel="noopener noreferrer">Maglaro</a></span>
    </li>`,
    )
    .join("");
  app.innerHTML = `
    <h2>${esc(g.name)}</h2><div class="rule"></div>
    <p class="sub">${esc(g.sub || "")}</p>
    ${g.items.length ? `<ul class="files">${rows}</ul>` : `<div class="empty">Wala pang nakalagay dito. Bumalik muli sa susunod.</div>`}`;
}

function list(g) {
  if (g.type === "links") return links(g);
  drawTabs(g.id);
  const rows = g.items
    .map(
      (it, n) => `
    <li>
      <span class="t"><button data-view="${n}">${esc(it.title)}</button></span>
      <span class="acts">
        <a class="btn ghost" href="#view/${g.id}/${n}">View</a>
        <a class="btn" href="${path(g, it)}" download>Download PDF</a>
        ${wordBtn(g, it)}
      </span>
    </li>`,
    )
    .join("");
  app.innerHTML = `
    <h2>${esc(g.name)}</h2><div class="rule"></div>
    <p class="sub">${esc(g.sub || "Piliin ang aralin na gusto mong basahin o i-download.")}</p>
    ${g.items.length ? `<ul class="files">${rows}</ul>` : `<div class="empty">Wala pang nakalagay dito. Bumalik muli sa susunod.</div>`}`;
  app.querySelectorAll("[data-view]").forEach(
    (b) =>
      (b.onclick = () => {
        location.hash = `view/${g.id}/${b.dataset.view}`;
      }),
  );
}

async function viewer(g, it) {
  drawTabs(g.id);
  const url = path(g, it);
  app.innerHTML = `
    <div class="vbar">
      <a class="btn ghost" href="#${g.id}">Back to ${esc(g.short)}</a>
      <h2>${esc(it.title)}</h2>
      <a class="btn ghost" href="${url}" target="_blank" rel="noopener">Open full screen</a>
      <a class="btn" href="${url}" download>Download PDF</a>
      ${wordBtn(g, it)}
    </div>
    <div id="pages"><p class="note">Loading...</p></div>`;
  const token = ++renderToken,
    box = $("#pages");
  const fallback = () => {
    if (token === renderToken)
      box.innerHTML = `<iframe src="${url}" title="${esc(it.title)}"></iframe>`;
  };
  try {
    if (!window.pdfjsLib) throw 0;
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const pdf = await pdfjsLib.getDocument(url).promise;
    if (token !== renderToken) return;
    box.innerHTML = "";
    const width = Math.min(box.clientWidth - 32, 900),
      dpr = window.devicePixelRatio || 1;
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      if (token !== renderToken) return;
      const base = page.getViewport({ scale: 1 }),
        scale = width / base.width;
      const vp = page.getViewport({ scale: scale * dpr });
      const c = document.createElement("canvas");
      c.width = vp.width;
      c.height = vp.height;
      c.style.width = width + "px";
      box.appendChild(c);
      await page.render({ canvasContext: c.getContext("2d"), viewport: vp })
        .promise;
    }
  } catch (e) {
    // File missing, or PDF.js blocked: try the browser's own viewer
    fetch(url, { method: "HEAD" })
      .then((r) =>
        r.ok
          ? fallback()
          : (box.innerHTML = `<p class="note">Hindi mahanap ang file na ito. Subukang muli mamaya.</p>`),
      )
      .catch(fallback);
  }
}

function route() {
  const h = location.hash.slice(1) || "home";
  const [a, b, c] = h.split("/");
  window.scrollTo(0, 0);
  if (a === "view") {
    const g = GRADINGS.find((x) => x.id === b),
      it = g && g.items[+c];
    if (it) return viewer(g, it);
  }
  const g = GRADINGS.find((x) => x.id === a);
  g ? list(g) : home();
}
addEventListener("hashchange", route);
route();
