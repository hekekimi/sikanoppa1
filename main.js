import { handleWinning } from "./handlewin.js";

// glob. muuttujat
let pelaajat = []; // taulukko pelaajista
let nykyinenPelaajaIndex = 0; // indeksi nykyiselle pelaajalle

// elementit
const aloita_peli = document.getElementById("aloita");
const pelaa_vuoro = document.getElementById("pelaa");
const lisaa = document.getElementById("lisaa");
const ilmoitus = document.getElementById("ilmoitukset");
const lopeta_vuoro = document.getElementById("lopeta");
const pisteraja = document.getElementById("pisteraja");

// painikkeiden tilat
aloita_peli.disabled = true;
pelaa_vuoro.disabled = true;
lopeta_vuoro.disabled = true;
pelaa_vuoro.style.visibility = "hidden";
lopeta_vuoro.style.visibility = "hidden";

// tapahtumakuuntelijat
aloita_peli.addEventListener("click", () => startGame());
pelaa_vuoro.addEventListener("click", () => playTurn());
lopeta_vuoro.addEventListener("click", () => switchTurn());
lisaa.addEventListener("click", () => addPlayer());

function addPlayer() {
    const pelaajaInput = document.getElementById("pelaaja");
    const pelaajanNimi = pelaajaInput.value.trim(); // pelaajan nimi inputista

    if (pelaajanNimi && pelaajat.length < 4) { 
        pelaajat.push({ nimi: pelaajanNimi, pisteet: 0 }); // lisätään pelaaja 
        pelaajaInput.value = ""; 
    } else {
        alert("Max 4 pelaajaa tai nimi puuttuu!");
    }

    if(pelaajat.length >= 2) {
        aloita_peli.disabled = false;
    }
}

function startGame() {
    if(pelaajat.length < 2) {
        window.alert("Ei tarpeeksi pelaajia");
    } else {
        let tekstikentatDiv = document.getElementById("tekstikentat");
         
        while (tekstikentatDiv.firstChild) {
            tekstikentatDiv.removeChild(tekstikentatDiv.firstChild);
        }

        playTurn();
        pelaa_vuoro.disabled = false;
        pelaa_vuoro.style.visibility = "visible";
        lopeta_vuoro.style.visibility = "visible";
    }
}

function playTurn() {
    pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`; //pelaajan nimen näyttö napissa
    lopeta_vuoro.disabled = false; // Lopeta vuoro -painike oletuksena toimiva
    let heitto = Math.floor(Math.random() * 6) + 1; // varsinainen nopan heitto

    ilmoitus.innerHTML = "";
    const diceImage1 = "assets/dice" + heitto + ".png";
    document.querySelectorAll("img")[0].setAttribute("src", diceImage1);

    const results = document.querySelector("h1");
    results.innerHTML = "Heittokierroksen tulokset: ";
    const currentResult = document.createElement("p");
    currentResult.innerHTML = pelaajat[nykyinenPelaajaIndex].nimi + " heitti " + heitto;  // Näytetään pelaajan nimi ja äskeinen heitto
    results.appendChild(currentResult);

    if (heitto === 1) {
        ilmoitus.style.color = "crimson";
        ilmoitus.innerHTML = "Nopan silmäluku oli 1, vuoro päättyy ja pisteet nollaantuvat!";
        pelaajat[nykyinenPelaajaIndex].pisteet = 0;
        let nykyisetPisteet = document.getElementById("yhteensa");
        nykyisetPisteet.innerHTML = `Pelaajan ${pelaajat[nykyinenPelaajaIndex].nimi} pisteet ovat ${pelaajat[nykyinenPelaajaIndex].pisteet}`; // näytetään pisteet

        // Vuoron vaihto
        nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
        lopeta_vuoro.disabled = true; // Lopeta vuoro -painike pois käytöstä
        pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`;
    } else {
        pelaajat[nykyinenPelaajaIndex].pisteet += heitto;
        let nykyisetPisteet = document.getElementById("yhteensa");
        nykyisetPisteet.innerHTML = `Pelaajan ${pelaajat[nykyinenPelaajaIndex].nimi} pisteet ovat ${pelaajat[nykyinenPelaajaIndex].pisteet}`; // näytetään pisteet
        handleWinning(pelaajat, nykyinenPelaajaIndex, pisteraja);
    }
}

function switchTurn() {
    ilmoitus.style.color = "green";
    ilmoitus.innerHTML = `Vuoro vaihtuu, säilytät ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä!`;
    nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
    lopeta_vuoro.disabled = true; // Lopeta vuoro -painike pois käytöstä
    pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`;
}
