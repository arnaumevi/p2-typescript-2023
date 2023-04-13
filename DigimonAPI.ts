import fs from "fs";

export async function getDigimonList(): Promise<Digimon[]> {
  const response = await fetch("http://digi-api.com/api/v1/digimon");
  const data = await response.json();
  const digimonList = data.content as Digimon[];
  return digimonList;
}
export async function createHeader(): Promise<string> {
  const header = `
    <head>
      <title>Digimon Cards</title>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          background-color: #f7f7f7;
        }
        .card {
          width: 250px;
          margin: 1rem;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 0 5px #ccc;
          text-align: center;
          padding: 1rem;
        }
        .card img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 auto;
          display: block;
        }
        .card h2 {
          margin-top: 0.5rem;
        }
        .card p {
          margin: 0.5rem 0;
        }
        .card a {
          display: inline-block;
          padding: 0.5rem;
          background-color: #0f7ae5;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 1rem;
        }
        .card a:hover {
          background-color: #0055a5;
        }
      </style>
    </head>
  `;
  return header;
}
export async function getDigimonCardsHTML(): Promise<string> {
  let html = "";
  const digimonList = await getDigimonList();
  for (const digimon of digimonList) {
    html += `
        <div class="card">
          <img src="${digimon.image}" alt="${digimon.name}" />
          <h2>${digimon.name}</h2>
          <p>ID: ${digimon.id}</p>
          <a href="${digimon.href}">Learn more</a>
        </div>
      `;
  }
  return html;
}

export async function generateHTMLFile(): Promise<void> {
  const header = await createHeader();
  const cardsHTML = await getDigimonCardsHTML();
  const html = `
      <!DOCTYPE html>
      <html>
        ${header}
        <body>
          ${cardsHTML}
        </body>
      </html>
    `;
  fs.writeFileSync("index.html", html);
}

export interface Digimon {
  id: number;
  name: string;
  href: string;
  image: string;
}
