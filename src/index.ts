// ===== Enum =====

enum TipoMezzo {
  Bici = "BICI",
  Scooter = "SCOOTER",
  Monopattino = "MONOPATTINO",
}

enum StatoMezzo {
  Disponibile = "DISPONIBILE",
  InUso = "IN_USO",
}

enum MetodoPagamento {
  CartaDiCredito = "CARTA_DI_CREDITO",
  PayPal = "PAYPAL",
}

// ===== Interfacce =====

interface IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: MetodoPagamento;
}

interface IMezzo {
  readonly id: number;
  tipo: TipoMezzo;
  stato?: StatoMezzo;
  assegnaUtente(utente: IUtente): void;
}

interface ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];
  aggiungiMezzo(mezzo: IMezzo): void;
}

// ===== Classi =====

class Mezzo implements IMezzo {
  private static prossimoId = 1;

  readonly id: number;
  tipo: TipoMezzo;
  stato?: StatoMezzo;
  utenteCorrente?: IUtente;
  constructor(tipo: TipoMezzo) {
    this.id = Mezzo.prossimoId++;
    this.tipo = tipo;
    this.stato = StatoMezzo.Disponibile;
  }

  assegnaUtente(utente: IUtente): void {
    if (this.stato === StatoMezzo.InUso) {
      throw new Error(`Il mezzo ${this.id} è già in uso.`);
    }

    this.stato = StatoMezzo.InUso;
    this.utenteCorrente = utente;
  }
}

class Utente implements IUtente {
  mezzoCorrente?: IMezzo;
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: MetodoPagamento;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    metodoPagamento: MetodoPagamento,
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
  }

  prenotaMezzo(mezzo: IMezzo): void {
    if (this.mezzoCorrente) {
      throw new Error(`${this.nome} ha già un mezzo in uso.`);
    }

    if (mezzo.stato === StatoMezzo.Disponibile) {
      mezzo.assegnaUtente(this);

      this.mezzoCorrente = mezzo;

      console.log(`Mezzo con id ${mezzo.id} prenotato con successo da ${this.nome}.`);
    } else {
      throw new Error("Il mezzo selezionato non è disponibile.");
    }
  }
}

class Citta implements ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];
  constructor(nome: string, mezziDisponibili: IMezzo[]) {
    this.nome = nome;
    this.mezziDisponibili = mezziDisponibili;
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    const esiste = this.mezziDisponibili.some((m) => m.id === mezzo.id);

    if (esiste) {
      throw new Error(
        `Errore: Esiste già un mezzo con ID "${mezzo.id}" nella città di ${this.nome}.`,
      );
    }
    this.mezziDisponibili.push(mezzo);
  }
}

// ===== Esecuzione =====

const bici = new Mezzo(TipoMezzo.Bici);
const monopattino = new Mezzo(TipoMezzo.Monopattino);
const scooter = new Mezzo(TipoMezzo.Scooter);

const persona1 = new Utente(
  "John",
  "Smith",
  "email@example.com",
  MetodoPagamento.CartaDiCredito,
);

persona1.prenotaMezzo(bici)

const citta1 = new Citta("Roma", [bici, monopattino, scooter]);