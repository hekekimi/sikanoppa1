
import { showResults } from "./results.js";

export function handleWinning(pelaajat, nykyinenPelaajaIndex, pisteraja){//voittajan käsittely
    
    if (pelaajat[nykyinenPelaajaIndex].pisteet >= pisteraja.value){
        
       document.body.innerHTML = "";

        const voittoilmoitus =document.createElement("h1");
        voittoilmoitus.className = "voittoilmoitus";
        const voittajaNimi = document.createTextNode(`${pelaajat[nykyinenPelaajaIndex].nimi} on voittaja tuloksella ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä! Onnea!`);
        voittoilmoitus.appendChild(voittajaNimi);
        document.body.appendChild(voittoilmoitus);
        showResults(pelaajat);

    }


    else{
        return;
    }


}
//pelaa uudelleen- nappi ilmestyy
export function playAgainButton(){

    const pelaa_uudelleen = document.createElement("button");
    
    pelaa_uudelleen.addEventListener("click",()=>{
        location.reload();// lataa vain sivun uudelleen
    })
    pelaa_uudelleen.className = "button";// luokka button
    const buttontext = document.createTextNode("Uusi peli")
    pelaa_uudelleen.appendChild(buttontext);
    document.body.appendChild(pelaa_uudelleen);





}