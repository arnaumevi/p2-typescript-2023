import * as fs from "fs";

export async function getCharacterList(): Promise<Rickandmortyapi[]> {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  const characterList = data.results as Rickandmortyapi[];
  return characterList;
}

export async function createHeader(): Promise<string> {
  const header = `
    <head>
      <title>Rick and Morty Cards</title>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          background-color: #bcf8ff;
        }
        .card {
          width: 250px;
          margin: 1rem;
          background-color: rgb(43, 250, 24);
          border: 10px solid #000000;
          border-radius: 15px;
          box-shadow: 0 0 5px #0e8526;
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

export async function getCharacterCardsHTML(): Promise<string> {
  let html = "";
  const characterList = await getCharacterList();
  for (const character of characterList) {
    let htmlContent = `
        <div class="card">
          <img src="${character.image}" alt="${character.name}" />
          <h2>${character.name}</h2>
            <p>ID: ${character.id}</p>
            <p>GENDER: ${character.gender}</p>
            <p>ORIGIN: ${character.origin}</p>
            <p>STATUS: ${character.status}</p>
            <p>SPECIE: ${character.species}</p>
            <p>TYPE: ${character.type}</p>

        </div>
        <style>
        body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          background-color: #f7f7f7;
        }
        .card {
          width: 550px;
          margin: 1rem;
          background-color: rgb(43, 250, 24);
          border: 10px solid #000000;
          border-radius: 5px;
          box-shadow: 0 0 15px #0e8526;
          text-align: center;
          padding: 1rem;
        }
        .card img {
          width: 450px;
          height: 450px;
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
      `;
    fs.writeFile("./characters/" + character.id + ".html", htmlContent, () => {
      /* handle error */
    });

    html += `
        <div class="card" onclick="window.location.href='./characters/${character.id}.html';">
          <img src="${character.image}" alt="${character.name}" />
          <h2>${character.name}</h2>
        
        </div>
      `;
  }
  return html;
}

export async function generateHTMLFile(): Promise<void> {
  const header = await createHeader();
  const cardsHTML = await getCharacterCardsHTML();
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
export interface Rickandmortyapi {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
