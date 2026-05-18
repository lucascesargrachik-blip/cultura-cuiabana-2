const pontos = [
  { nome: "Museu de História Natural de Mato Grosso", cat: "Arte e Cultura",
    end: "Av. Manoel José de Arruda, 2000 – Jardim Europa", lat: -15.5914, lng: -56.0801 },

  { nome: "Museu do Mato Grosso", cat: "Arte e Cultura",
    end: "Praça da República s/n – Centro", lat: -15.5971, lng: -56.0966 },

  { nome: "Teatro Zulmira Canavarros", cat: "Arte e Cultura",
    end: "Rua Barão de Melgaço, 3473 – Centro", lat: -15.5985, lng: -56.0979 },

  { nome: "Fundação Cultural de Cuiabá", cat: "Arte e Cultura",
    end: "Av. Tenente Coronel Duarte, 140 – Porto", lat: -15.5957, lng: -56.1006 },

  { nome: "Mercado Municipal", cat: "Gastronomia",
    end: "Rua General Valle, 315 – Porto", lat: -15.5942, lng: -56.0988 },

  { nome: "Chopão Bar & Restaurante", cat: "Gastronomia",
    end: "Av. do CPA, 1234 – CPA", lat: -15.5700, lng: -56.0820 },

  { nome: "Restaurante Casa do Peixe", cat: "Gastronomia",
    end: "Rua 13 de Junho, 2100 – Araés", lat: -15.5880, lng: -56.0935 },

  { nome: "Catedral Basílica do Senhor Bom Jesus", cat: "Pontos Turísticos",
    end: "Praça Alencastro s/n – Centro", lat: -15.5978, lng: -56.0997 },

  { nome: "Palácio Alencastro", cat: "Pontos Turísticos",
    end: "Praça Alencastro, 50 – Centro", lat: -15.5975, lng: -56.1002 },

  { nome: "Ponte Seis de Outubro", cat: "Pontos Turísticos",
    end: "Rio Cuiabá – Centro", lat: -15.5940, lng: -56.0972 },

  { nome: "Praça Ipiranga", cat: "Pontos Turísticos",
    end: "Av. Ten. Cel. Duarte – Centro", lat: -15.5950, lng: -56.1010 },

  { nome: "Arena Pantanal", cat: "Lazer e Entretenimento",
    end: "Av. Agrícola Paes de Barros, 750 – Dom Aquino", lat: -15.6013, lng: -56.1085 },

  { nome: "Parque Mãe Bonifácia", cat: "Lazer e Entretenimento",
    end: "Av. Miguel Sutil – Quilombo", lat: -15.5778, lng: -56.0790 },

  { nome: "Shopping Pantanal", cat: "Lazer e Entretenimento",
    end: "Av. Fernando Correa da Costa, 1555 – Boa Esperança", lat: -15.5863, lng: -56.0737 },

  { nome: "Parque Tia Nair", cat: "Natureza",
    end: "Av. Miguel Sutil s/n – Goiabeiras", lat: -15.5882, lng: -56.0835 },

  { nome: "Lagoa do Amor", cat: "Natureza",
    end: "Bairro Coxipó da Ponte", lat: -15.6452, lng: -55.9832 },

  { nome: "APA Inundável Cuiabá-Mimoso", cat: "Natureza",
    end: "Zona rural – Cuiabá", lat: -15.7100, lng: -56.1000 },
];

const cores = {
  "Arte e Cultura": "#e63946",
  "Gastronomia": "#f4a261",
  "Pontos Turísticos": "#2a9d8f",
  "Lazer e Entretenimento": "#8338ec",
  "Natureza": "#52a65b",
};

/* 🔥 PIN COLORIDO */
function iconeColorido(cor) {
  return L.divIcon({
    html: `<div style="
      width:18px;
      height:18px;
      background:${cor};
      border-radius:50%;
      border:3px solid white;
    "></div>`,
    className: "",
    iconSize: [18,18]
  });
}

/* 🔥 MAPA */
const mapa = L.map("mapa-leaflet").setView([-15.601, -56.097], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

let marcadores = [];
let categoriaAtiva = "Arte e Cultura";
let textoBusca = "";

/* 🔥 RENDER */
function renderMarcadores() {
  marcadores.forEach(m => mapa.removeLayer(m));
  marcadores = [];

  pontos.forEach(p => {
    const catOk = !categoriaAtiva || p.cat === categoriaAtiva;
    const busOk = !textoBusca || p.nome.toLowerCase().includes(textoBusca);

    if (!catOk || !busOk) return;

    const marker = L.marker([p.lat, p.lng], {
      icon: iconeColorido(cores[p.cat])
    }).addTo(mapa);

    /* 🔥 POPUP COM ENDEREÇO */
    marker.bindPopup(`
      <div>
        <strong>${p.nome}</strong><br>
        <small>${p.cat}</small><br><br>
        📍 ${p.end}
      </div>
    `);

    marcadores.push(marker);
  });
}

renderMarcadores();

/* FILTROS */
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;

    if (categoriaAtiva === cat) {
      categoriaAtiva = null;
      btn.classList.remove("ativo");
    } else {
      categoriaAtiva = cat;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
    }

    renderMarcadores();
  });
});

/* BUSCA */
document.getElementById("busca").addEventListener("input", e => {
  textoBusca = e.target.value.toLowerCase();
  renderMarcadores();
});

/* TODOS */
document.getElementById("btnTodos").addEventListener("click", () => {
  categoriaAtiva = null;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("ativo"));
  renderMarcadores();
});