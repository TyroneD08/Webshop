const products_array = [
  ["Demon Slayer Complete Manga Box Set volume 1-23", 133.69, "demonslayer.jpg", true],
  ["My Hero Academia Complete Box Set Volume 1-20", 124.34, "myheroacademia.jpg", true],
  ["Tokyo Ghoul Complete Manga Box Set Volume 1-16", 143.59, "tokyoghoul.jpg", true],
  ["Naruto Shipudden Complete Manga Box Set Volume 28-48", 134.74, "narutoanime.jpg", true],
  ["Bleach Complete Manga Box Set Volume 1-21 + 22 & 23", 89.99, "bleach.jpg", true],
  ["Dragon Ball Complete Manga Box Set Volume 1-26", 149.12, "dragonball.jpg", true],
  ["Bakuman Complete Box Set vol 1-22", 160.00, "bakuman.jpg", true],
  ["One Piece, Dressrosa to Reverie: Vol 71-90", 228.98, "opopop.webp", true],
  ["Vampire Knight Complete Box Set Vol 1-19", 157.36, "vampire.jpg", false],
  ["Naruto Shipudden Bookmarks 9pcs", 1.70, "sakura.webp", true],
  ["Demon Slayer Bookmarks 9pcs", 1.45, "tanj.jpg", false],
  ["Jujutsu Kaisen Bookmarks 9pcs", 1.50, "jjkk.jpg", true],
  ["Blue Lock jersey - Nagi Seishiro", 14.99, "nagi.webp", true],
  ["Blue Lock jersey - Yoichi Isagi", 14.99, "isagii.webp", true],
  ["Blue Lock jersey - Kaiser", 15.50, "kaiser22.jpeg", false],
  ["Blue Lock figure - Nagi Seishiro", 4.79, "nagii.jpg", true],
  ["Blue Lock figure - Meguru Bkl achira", 4.79, "bachi.webp", true],
  ["Blue Lock figure - Rin & Sae", 9.25, "rinn.webp", true],
  ["Mystery Box mini anime figures 5pcs", 9.95, "figures.jpg", true],
  ["Anime Stickers - 50pcs Random", 3.29, "stickers.jpg", true],
  ["My Hero Academia Keychains", 8.99 , "keychain.jpg", true],
  ["Konosuba Nendroid - Aqua Goddess of Water", 49.95, "aqua.webp", true],
  ["Konosuba Nendroid - Megumin", 49.95, "megumin.jpg", true],
  ["Death Note Nendroid - L", 75.50, "L.jpg", false],
  ["Lego Katana with Scabbard & Stand - Zoro", 68.99, "zoro.jpg", false],
  ["Lego Katana with Scabbard & Stand - Yamato", 70.00, "redred.jpg", true],
  ["Lego Katana with Scabbard & Stand - Zenitsu", 58.50, "zeni.jpg", true]
];

const productsPerBatch = 3;
const productSection = document.querySelector('.products');
const cartCountEl = document.getElementById('cart-count');
const priceFilter = document.getElementById('price-filter');
let productIndex = 0;
let cartCount = 0;
let currentSearchTerm = '';
let currentPriceFilter = 'all';

function updateCartCount() {
  cartCountEl.textContent = cartCount;
  const cart = document.querySelector('.cart');
  cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
}

function onAddToCartClick(event) {
  const product = event.target.closest('.product');
  if (!product || product.classList.contains('product--not-available')) return;
  const titleEl = product.querySelector('.product__title');
  const productName = titleEl ? titleEl.textContent.trim() : 'Product';
  cartCount++;
  updateCartCount();
  showAddedAlert(productName);
}

function onRemoveFromCartClick() {
  if (cartCount === 0) return;
  cartCount--;
  updateCartCount();
}

function showAddedAlert(name) {
  console.log(`${name} toegevoegd aan winkelwagen.`);
}
function stars(){
  let str = "";
  let rand = Math.random() * 5;
  for(let i = 0; i < rand; i++){
    str+= "★"
  }
  return str;
}
function renderProducts(products) {
  productSection.innerHTML = '';
  products.forEach(([name, price, imgSrc, available]) => {
    const article = document.createElement('article');
    article.classList.add('product');
    if (!available) article.classList.add('product--not-available');

    article.innerHTML = `
      <img src="img/${imgSrc}" alt="${name}" class="product__img" width="250" height="300" loading="lazy" />
      <h2 class="product__price">€${price.toFixed(2)}</h2>
      <h3 class="product__title">${name}</h3>
      <p class="product__rating">${stars()}</p>
      ${
        available
          ? `<button class="product__button" type="button">Add to Cart</button>
             <button class="remove__button" type="button">Remove</button>`
          : `<button class="product__button product__button--disabled" type="button" disabled>Sold out</button>`
      }
    `;

    const addButton = article.querySelector('.product__button:not(.product__button--disabled)');
    if (addButton) addButton.addEventListener('click', onAddToCartClick);

    const removeButton = article.querySelector('.remove__button');
    if (removeButton) removeButton.addEventListener('click', onRemoveFromCartClick);

    productSection.appendChild(article);
  });
}

function applyFilters() {
  const filtered = products_array.filter(([name, price]) => {
    const matchesSearch = name.toLowerCase().includes(currentSearchTerm.toLowerCase());

    let matchesPrice = true;
    if (currentPriceFilter === '100+') {
      matchesPrice = price >= 100;
    } else if (currentPriceFilter !== 'all') {
      const limit = parseFloat(currentPriceFilter);
      matchesPrice = price <= limit;
    }

    return matchesSearch && matchesPrice;
  });

  renderProducts(filtered);
}

function handleSearch(event) {
  event.preventDefault();
  currentSearchTerm = event.target.q.value.trim();
  applyFilters();
}

function handlePriceFilter() {
  currentPriceFilter = priceFilter.value;
  applyFilters();
}

function loadMoreProducts() {
  const end = productIndex + productsPerBatch;
  const batch = products_array.slice(productIndex, end);

  batch.forEach(([name, price, imgSrc, available]) => {
    const article = document.createElement('article');
    article.classList.add('product');
    if (!available) article.classList.add('product--not-available');

    article.innerHTML = `
      <img src="img/${imgSrc}" alt="${name}" class="product__img" width="250" height="300" loading="lazy" />
      <h2 class="product__price">€${price.toFixed(2)}</h2>
      <h3 class="product__title">${name}</h3>
      <p class="product__rating">${stars()}</p>
      ${
        available
          ? `<button class="product__button" type="button">Add to Cart</button>
             <button class="remove__button" type="button">Remove</button>`
          : `<button class="product__button product__button--disabled" type="button" disabled>Sold out</button>`
      }
    `;

    const addButton = article.querySelector('.product__button:not(.product__button--disabled)');
    if (addButton) addButton.addEventListener('click', onAddToCartClick);

    const removeButton = article.querySelector('.remove__button');
    if (removeButton) removeButton.addEventListener('click', onRemoveFromCartClick);

    productSection.appendChild(article);
  });

  productIndex = end;
}

const sentinel = document.createElement('div');
sentinel.id = 'scroll-sentinel';
productSection.appendChild(sentinel);

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting && productIndex < products_array.length) {
    loadMoreProducts();
    productSection.appendChild(sentinel);
    observer.observe(sentinel);
  }
}, {
  rootMargin: '100px'
});

document.querySelector('form').addEventListener('submit', handleSearch);
priceFilter.addEventListener('change', handlePriceFilter);

updateCartCount();
loadMoreProducts();
observer.observe(sentinel);
