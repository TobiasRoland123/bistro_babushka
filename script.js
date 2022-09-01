// ----------------    opretter globale variabler    -----------------------

// først har vi de konstante variabler
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const template = document.querySelector("template").content;
const main = document.querySelector("#indhold");
const header = document.querySelector("h1");
const popup = document.querySelector("#popup");
const filterKnapper = document.querySelectorAll("nav button");
const option = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

// her er de variable variabler
let retter;
let filter = "alle";

// ----------------    venter på at dom elementerne er loaded og kalder start     -----------------------
document.addEventListener("DOMContentLoaded", start);

// Denne funktion går igennem alle knapper og tildeler click eventlistener

function start() {
  // click eventlisteneren aktiverer filtrerfunktionen
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
  // Denne funktion kalder også hentData funktionen
  hentData();
}

// denne funktion sætter filter lig med datasettet på den knap vi trykker på
function filtrerRetter() {
  filter = this.dataset.kategori;
  // fjerner klassen valgt
  document.querySelector(".valgt").classList.remove("valgt");
  // giver det valgte filter en anden farve
  this.classList.add("valgt");
  // kalder funktionen vis
  vis();
}

// denne funtion henter data ind fra vore restDB json fil
async function hentData() {
  // henter filen
  const respons = await fetch(url, option);
  // sætter retter lig med json filens indhold
  retter = await respons.json();
  // kalder vis funktionen
  vis();
}

// denne funktion får vist vores indhold fra json filen
function vis() {
  // fjerner alt i main, så der er rent canvas
  main.textContent = "";
  // for hvert element i arrayet udføres følgende
  retter.forEach((ret) => {
    // hvis retten har samme kategori, som filteret eller hvis alle filteret er valgt udføres følgende
    if (filter == ret.kategori || filter == "alle") {
      // opretter variabel klon og copirer template ind i det
      const klon = template.cloneNode(true);
      // tager fat i elementerne og tildeler dem strings eller filsti samt tilføjer dem til klon
      klon.querySelector("img").src = "billeder/" + ret.billednavn + "-md.jpg";
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".info").textContent = ret.kategori + " | " + ret.oprindelsesregion;
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + ret.pris + ",-";

      // sætter click eventlistener på article, som kalder visDetaljer funktion
      klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

      // placerer klon i main
      main.appendChild(klon);
    }
  });
}

// funktion som laver popup vindue
function visDetaljer(retten) {
  // sætter popup til display flex
  popup.style.display = "flex";
  // tager fat i elementerne og tildeler dem strings eller filsti samt tilføjer dem til klon
  popup.querySelector("img").src = "billeder/" + retten.billednavn + "-md.jpg";
  popup.querySelector(".navn").textContent = retten.navn;
  popup.querySelector(".korttekst").textContent = "  " + retten.langbeskrivelse;
  popup.querySelector(".info").textContent = retten.kategori + "  |  " + retten.oprindelsesregion;
  popup.querySelector(".pris").textContent = "Pris: " + retten.pris + ",-";
  // sætter popup til display none, så den forsviner
  document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));

  // location.href = "02-detalje.html?id=" + retten._id;

  // popup.style.display = "flex";
  // popup.querySelector("img").src = "billeder/" + retten.billednavn + "-md.jpg";
  // popup.querySelector(".titel").textContent = retten.navn;
  // popup.querySelector(".korttekst").textContent = retten.langbeskrivelse;
  // popup.querySelector(".typeogland").textContent = retten.kategori + " | " + retten.oprindelsesregion;
  // popup.querySelector(".pris").textContent = "Pris: " + retten.pris + ",-";

  // document.querySelector("#luk").addEventListener("click", () => (popup.style.display = "none"));
}
