
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("agentContainer");

    if (container) {
        fetch("data/ajanlar.json")
        .then((res) => res.json())
        .then((veri) => {
            veri.forEach((ajan) => {
                const card = document.createElement("div");
                card.className = "agent-card";
                card.innerHTML = `
                    <img src="${ajan.resim}" alt="${ajan.isim}">
                    <h3>${ajan.isim}</h3>
                    <p>Rol: ${ajan.rol}</p>
                    <a href="${ajan.sayfa}">
                        <button>Detayları Gör</button>
                    </a>
                `;
                container.appendChild(card);
            });
        })
        
        .catch((err) => {
            container.innerHTML = "<p>Veriler yüklenmedi.</p>";
            console.error("Json Hatası:", err);
        });
    }
});

let ajanVerisi = [];

function filtrele(rol) {
  const container = document.getElementById("agentContainer");
  container.innerHTML = "";

  const filtrelenmis = rol === "Hepsi"
    ? ajanVerisi
    : ajanVerisi.filter((ajan) => ajan.rol === rol);

  filtrelenmis.forEach((ajan) => {
    const card = document.createElement("div");
    card.className = "agent-card";
    card.innerHTML = `
      <img src="${ajan.resim}" alt="${ajan.isim}">
      <h3>${ajan.isim}</h3>
      <p>Rol: ${ajan.rol}</p>
      <a href="${ajan.sayfa}">
        <button>Detayları Gör</button>
      </a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("agentContainer");

  fetch("data/ajanlar.json")
    .then((res) => res.json())
    .then((veri) => {
      ajanVerisi = veri;
      filtrele("Hepsi"); // ilk açılışta hepsi gösterilsin
    });
});

document.getElementById("agentSearch").addEventListener("input", function () {
  const aranan = this.value.toLowerCase();
  const filtrelenmis = ajanVerisi.filter(ajan =>
    ajan.isim.toLowerCase().includes(aranan)
  );
  const container = document.getElementById("agentContainer");
  container.innerHTML = "";

  filtrelenmis.forEach((ajan) => {
    const card = document.createElement("div");
    card.className = "agent-card";
    card.innerHTML = `
      <img src="${ajan.resim}" alt="${ajan.isim}">
      <h3>${ajan.isim}</h3>
      <p>Rol: ${ajan.rol}</p>
      <a href="${ajan.sayfa}">
        <button>Detayları Gör</button>
      </a>
    `;
    container.appendChild(card);
  });
});
const video = document.getElementById("intro-video");
const container = document.getElementById("intro-container");
const content = document.querySelector(".main-content");
const skipBtn = document.getElementById("skip-btn");
const soundBtn = document.getElementById("sound-btn");

// Geç butonuna basınca içeriği göster
skipBtn.addEventListener("click", () => {
  if (!video.paused) video.pause();
  container.style.display = "none";
  content.style.display = "block";
});

// Ses aç butonuna basınca sesi aktif et
soundBtn.addEventListener("click", () => {
  video.muted = false;
  video.volume = 1.0;
  video.play().catch(err => {
    console.warn("Oynatma hatası:", err);
  });
});

// Video bittiğinde içeriğe geç
video.addEventListener("ended", () => {
  container.style.display = "none";
  content.style.display = "block";
});
