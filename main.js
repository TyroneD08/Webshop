(() => {
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;

  function updateCartCount() {
    cartCountEl.textContent = cartCount;
    const cart = document.querySelector('.cart');
    cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
  }

  function showAddedAlert(productName) {
    alert(`Product "${productName}" is toegevoegd aan het winkelmandje.`);
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
  document.querySelectorAll('.product__remove-button').forEach(button => {
    button.addEventListener('click', onRemoveFromCartClick);
  });
  
  updateCartCount();
})();