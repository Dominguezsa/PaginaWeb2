let cartContent = JSON.parse(localStorage.getItem('cartContent')) || {}; // contenidoCarrito
let cartCount = Object.values(cartContent).reduce((total, product) => total + product.quantity, 0);
document.querySelector('.texto-carrito').textContent = cartCount;

document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId; // assuming each button has a data-product-id attribute
    let product = {
      id: productId,
      image: button.dataset.image, // assuming each button has a data-image attribute
      price: button.dataset.price, // assuming each button has a data-price attribute
      // add more attributes as needed
    };
    if (cartContent[productId]) {
      cartContent[productId].quantity++;
    } else {
      product.quantity = 1;
      cartContent[productId] = product;
    }

    // Recalculate cartCount and update it in the UI
    cartCount = Object.values(cartContent).reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.texto-carrito').textContent = cartCount;

    // Save cartContent to localStorage
    localStorage.setItem('cartContent', JSON.stringify(cartContent));
  });
});

document.querySelector('.empty-cart-button').addEventListener('click', () => {
  // Establecer cartContent a un objeto vacío
  cartContent = {};

  // Restablecer cartCount a 0
  cartCount = 0;

  // Actualizar el texto del carrito en la interfaz de usuario
  document.querySelector('.texto-carrito').textContent = cartCount;

  // Guardar el estado actualizado en localStorage
  localStorage.setItem('cartContent', JSON.stringify(cartContent));
});

