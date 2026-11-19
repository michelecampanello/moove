"use strict";
// ===== Enum =====
var TipoMezzo;
(function (TipoMezzo) {
    TipoMezzo["Bici"] = "BICI";
    TipoMezzo["Scooter"] = "SCOOTER";
    TipoMezzo["Monopattino"] = "MONOPATTINO";
})(TipoMezzo || (TipoMezzo = {}));
var StatoMezzo;
(function (StatoMezzo) {
    StatoMezzo["Disponibile"] = "DISPONIBILE";
    StatoMezzo["InUso"] = "IN_USO";
})(StatoMezzo || (StatoMezzo = {}));
var MetodoPagamento;
(function (MetodoPagamento) {
    MetodoPagamento["CartaDiCredito"] = "CARTA_DI_CREDITO";
    MetodoPagamento["PayPal"] = "PAYPAL";
})(MetodoPagamento || (MetodoPagamento = {}));
// ===== Classi =====
class Mezzo {
    static prossimoId = 1;
    id;
    tipo;
    stato;
    utenteCorrente;
    constructor(tipo) {
        this.id = Mezzo.prossimoId++;
        this.tipo = tipo;
        this.stato = StatoMezzo.Disponibile;
    }
    assegnaUtente(utente) {
        if (this.stato === StatoMezzo.InUso) {
            throw new Error(`Il mezzo ${this.id} è già in uso.`);
        }
        this.stato = StatoMezzo.InUso;
        this.utenteCorrente = utente;
    }
}
class Utente {
    mezzoCorrente;
    nome;
    cognome;
    email;
    metodoPagamento;
    constructor(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }
    prenotaMezzo(mezzo) {
        if (this.mezzoCorrente) {
            throw new Error(`${this.nome} ha già un mezzo in uso.`);
        }
        if (mezzo.stato === StatoMezzo.Disponibile) {
            mezzo.assegnaUtente(this);
            this.mezzoCorrente = mezzo;
            console.log(`Mezzo con id ${mezzo.id} prenotato con successo da ${this.nome}.`);
        }
        else {
            throw new Error("Il mezzo selezionato non è disponibile.");
        }
    }
}
class Citta {
    nome;
    mezziDisponibili;
    constructor(nome, mezziDisponibili) {
        this.nome = nome;
        this.mezziDisponibili = mezziDisponibili;
    }
    aggiungiMezzo(mezzo) {
        const esiste = this.mezziDisponibili.some((m) => m.id === mezzo.id);
        if (esiste) {
            throw new Error(`Errore: Esiste già un mezzo con ID "${mezzo.id}" nella città di ${this.nome}.`);
        }
        this.mezziDisponibili.push(mezzo);
    }
}
// ===== Esecuzione =====
const bici = new Mezzo(TipoMezzo.Bici);
const monopattino = new Mezzo(TipoMezzo.Monopattino);
const scooter = new Mezzo(TipoMezzo.Scooter);
const persona1 = new Utente("John", "Smith", "email@example.com", MetodoPagamento.CartaDiCredito);
persona1.prenotaMezzo(bici);
const citta1 = new Citta("Roma", [bici, monopattino, scooter]);
console.log(citta1.nome);
