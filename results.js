export function showResults(pelaajat){//tulosten käsittely
   console.log(pelaajat)
    // lista tuloksia varten
    let tuloslista = document.createElement("ol");
    tuloslista.setAttribute("id", "tuloslista");


    const lajitellutPelaajat = [...pelaajat];

    
    lajitellutPelaajat.sort((a, b) => b.pisteet - a.pisteet);//lajitellaan pelaajat paremmuysjärjestykseen
   
    for (let i = 0; i < pelaajat.length; i++) {
        const pelaaja = pelaajat[i];
        let pelaajanTulos = document.createElement("li");
        pelaajanTulos.textContent = `${pelaaja.nimi}: ${pelaaja.pisteet} pistettä`;
        tuloslista.appendChild(pelaajanTulos);
    }

    
    document.body.appendChild(tuloslista);
}
