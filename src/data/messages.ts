export interface Message {
  id: number;
  text: string;
  author?: string;
}

export const messages: Message[] = [
  { id: 1, text: "Tillykke x 30 🎉" },
  { id: 2, text: "Kæmpe tillykke! xoxo", author: "Jmog" },
  { id: 3, text: "CAMILLA 3.0!" },
  { id: 4, text: "Tillykke CAM 🙂" },
  { id: 5, text: "HEY CAMILLA – STORT TILLYKKE MED DE 30", author: "Ole" },
  { id: 6, text: "TILLYKKE TIL VORES DIY QUEEN 🔨🪚" },
  { id: 7, text: "Tillykkeeee! Gamle tos 😉", author: "Nicklas" },
  { id: 8, text: "Søde Camilla, kæmpe stort tillykke med de 30 år! Jeg håber du har haft det bedste ferie i Asien, og at du bliver fejret og forkælet rigtig meget. Glæder mig til den store jubilæumsfest! Knus", author: "Filip" },
  { id: 9, text: "Stort tillykke med den runde dag, og velkommen til version 3.0 ❤️", author: "Pia" },
  { id: 10, text: "Selvom vi ikke kunne være med til at fejre dig på din ægte fødselsdag, så du ikke snydes for lidt glimmer og fest 💜 Kærlig hilsen dine søde kollegaer" },
  { id: 11, text: "Tillykke søde Cam ❤️ Hvor er jeg bare glad for at have mødt dig! – Du er bare sød og dejlig – xoxo", author: "Annabel" },
  { id: 12, text: "Kære Camilla – Hjertelig tillykke med den runde dag. Nyd den – og nyd livet. Det slutter ikke ved de 30. Fra mig 😊", author: "Jes" },
  { id: 13, text: "Tillykke med fødselsdagen – håber du føler dig fejret!", author: "Frederic" },
  { id: 14, text: "Sødeste Camilla – Du ønskes et stort og varmt tillykke med de 30 år. Det er en fornøjelse at være omkring dig på kontoret – din energi og dit nærvær smitter. Tak for grin, snak og gode stunder – vi glæder os til mange flere. Kram", author: "Kristina" },
];
