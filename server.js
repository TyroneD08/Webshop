const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/zoeken', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  const products_array = [
    ["Demon Slayer vol 1-23", 133.69, "demonslayer.jpg", true],
    ["My Hero Academia vol 1-20", 124.34, "myheroacademia.jpg", true],
    ["Bleach vol 1-21", 89.99, "bleach.jpg", true],
    ["Naruto vol 28-48", 134.74, "narutoanime.jpg", true],
    ["One Piece vol 1-23", 118.59, "onepiece.jpg", true],
    ["Dragon Ball 1-26", 149.12, "dragonball.jpg", true],
    ["Jojo's Bizarre Adventure vol 1-17", 115.53 , "21.jpg", true],
    ["Fullmetal Alchemist vol 1-19", 112.70, "fmab.webp", true],
    ["Cruncyroll Premium Membership", 69.99, "crunch.webp", false],
    ["Pokemon Suprise Box", 60.00, "pokemong.jpg", true],
    ["Yu-Gi-Oh Collectors Box", 38.34, "yugioh.jpg", true],
    ["Blue Lock jersey - Kaiser", 15.50, "kaiser22.jpeg", false],
    ["Mystery anime figures", 9.95, "figures.jpg", true],
    ["Anime Stickers", 3.29, "stickers.jpg", true],
    ["My Hero Academia Keychains", 8.99 , "keychain.jpg", true],
  ];

  const results = products_array.filter(product =>
    product[0].toLowerCase().includes(query)
  );

  let html = `<h1>Zoekresultaten voor: ${query}</h1>`;
  if (results.length === 0) {
    html += `<p>Geen resultaten gevonden.</p>`;
  } else {
    results.forEach(p => {
      html += `<div>
        <h2>${p[0]}</h2>
        <p>€${p[1].toFixed(2)}</p>
        <img src="${p[2]}" width="100">
      </div>`;
    });
  }

  res.send(html);
});


app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
