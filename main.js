const products_array = [
  ["Demon Slayer vol 1-23", 133.69, "demonslayer.jpg", true],
  ["My Hero Academia vol 1-20", 124.34, "myheroacademia.jpg", true],
  ["Naruto vol 28-48", 134.74, "narutoanime.jpg", false]
];

const productSection = document.querySelector('.products');

products_array.forEach((product) => {
  const [name, price, imgSrc, available] = product;

  const productArticle = document.createElement('article');
  productArticle.classList.add('product');
  if (!available) {
    productArticle.classList.add('product--not-available');
  }

  productArticle.innerHTML = `
    <img src="img/${imgSrc}" alt="${name}" class="product__img" width="250" height="300" loading="lazy" />
    <h2 class="product__price">€${price.toFixed(2)}</h2>
    <h3 class="product__title">${name}</h3>
    <p class="product__rating">★★★★★</p>
    ${
      available
        ? `<button class="product__button" type="button">Add to Cart</button>
           <button class="remove__button" type="button">Remove</button>`
        : `<button class="product__button product__button--disabled" type="button" disabled>Sold out</button>`
    }
  `;

  productSection.appendChild(productArticle);
});


(() => {
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;

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

  function onRemoveFromCartClick(event) {
    if (cartCount === 0) return;
    cartCount--;
    updateCartCount();
  }
  
  document.querySelectorAll('.product__button').forEach(button => {
    button.addEventListener('click', onAddToCartClick);
  });
  document.querySelectorAll('.remove__button').forEach(button => {
    button.addEventListener('click', onRemoveFromCartClick);
  });
  
  updateCartCount();
})();