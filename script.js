const url = "https://babushka-dd8a.restdb.io/rest/menu";
const template = document.querySelector("template").content;
const main = document.querySelector("#indhold");
const header = document.querySelector("h1");
const popup = document.querySelector("#popup");
const option = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

document.addEventListener("DOMContentLoaded", start);
let retter;
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
  hentData();
}

function filtrerRetter() {
  filter = this.dataset.kategori;
  // console.log(this.dataset.kategori);
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  vis();
}

async function hentData() {
  const respons = await fetch(url, option);
  retter = await respons.json();
  console.log(retter);
  vis();
}

function vis() {
  main.textContent = "";
  retter.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("img").src = "billeder/" + ret.billednavn + "-md.jpg";
      // console.log(ret.billednavn);
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".info").textContent = ret.kategori + " | " + ret.oprindelsesregion;
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + ret.pris + ",-";

      klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
      main.appendChild(klon);
    }
  });
}

function visDetaljer(retten) {
  console.log(retten.navn);
  popup.style.display = "flex";
  popup.querySelector("img").src = "billeder/" + retten.billednavn + "-md.jpg";
  popup.querySelector(".titel").textContent = retten.navn;
  popup.querySelector(".korttekst").textContent = retten.langbeskrivelse;
  popup.querySelector(".typeogland").textContent = retten.kategori + " | " + retten.oprindelsesregion;
  popup.querySelector(".pris").textContent = "Pris: " + retten.pris + ",-";

  document.querySelector("#luk").addEventListener("click", () => (popup.style.display = "none"));
}

hentData();
