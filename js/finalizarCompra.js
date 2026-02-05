function renderCartTable() {
  // Acceder al contenido del carrito
  const cartContent = JSON.parse(localStorage.getItem('cartContent')) || {};
  const formatTotal = (value) => {
    const formatted = new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return `$${formatted}`;
  };

  // Crear la tabla y sus columnas
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th style="text-align: center;"></th>
      <th style="text-align: center;">Producto</th>
      <th style="text-align: center;">Cantidad</th>
      <th style="text-align: center;">Precio</th>
    </tr>
  `;

  // Verificar si el carrito está vacío
  if (Object.keys(cartContent).length === 0) {
    const container = document.querySelector('#cartTableContainer');
    //vaciar el contenedor antes de añadir el mensaje
    container.innerHTML = ''; // Limpiar el contenedor antes de añadir el mensaje
    container.innerHTML = '<p class="carritoVacio">El carrito está vacío</p>'; // Mostrar mensaje
    const totalElement = document.querySelector('#checkoutTotal');
    if (totalElement) {
      totalElement.textContent = formatTotal(0);
    }
    const checkoutMessage = document.querySelector('#checkoutMessage');
    if (checkoutMessage) {
      checkoutMessage.style.display = 'none';
    }
  } else {
    Object.values(cartContent).forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: auto;"></td>
          <td style="text-align: center;">${product.id}</td>
          <td style="text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <button class="qty-btn qty-decrease" data-product-id="${product.id}" style="padding: 5px 10px; cursor: pointer;">-</button>
              <span class="qty-value" data-product-id="${product.id}">${product.quantity}</span>
              <button class="qty-btn qty-increase" data-product-id="${product.id}" style="padding: 5px 10px; cursor: pointer;">+</button>
            </div>
          </td>
          <td style="text-align: center;">$ ${product.price * product.quantity}</td>
        `;
      table.appendChild(row);
    });
    
    // Insertar la tabla en el DOM
    const container = document.querySelector('#cartTableContainer');
    container.innerHTML = ''; // Limpiar el contenedor antes de añadir la nueva tabla
    container.style.display = 'flex'; // Usar flexbox
    container.style.justifyContent = 'center'; // Centrar horizontalmente
    container.style.alignItems = 'center'; // Centrar verticalmente
    container.style.flexDirection = 'column'; // Alinear los elementos en columna
    container.appendChild(table);
    
    // Agregar eventos a los botones de cantidad
    document.querySelectorAll('.qty-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const isIncrease = e.target.classList.contains('qty-increase');
        
        if (cartContent[productId]) {
          if (isIncrease) {
            cartContent[productId].quantity++;
          } else if (cartContent[productId].quantity > 0) {
            cartContent[productId].quantity--;
          }

          if (cartContent[productId].quantity === 0) {
            delete cartContent[productId];
          }

          // Guardar cambios en localStorage
          localStorage.setItem('cartContent', JSON.stringify(cartContent));

          // Re-renderizar la tabla
          renderCartTable();
        }
      });
    });
    
    let total = 0;
    Object.values(cartContent).forEach(product => {
      total += product.price * product.quantity;
    });

    const totalAmount = formatTotal(total);
    const totalElement = document.querySelector('#checkoutTotal');
    if (totalElement) {
      totalElement.textContent = totalAmount;
    }
    const checkoutMessage = document.querySelector('#checkoutMessage');
    if (checkoutMessage) {
      checkoutMessage.style.display = total > 0 ? 'block' : 'none';
    }

    const elementoTotal = document.querySelector('#cartTableContainer');
    const totalNode = document.createElement('p');
    totalNode.className = 'checkout-total';
    totalNode.style.marginTop = '1rem';
    totalNode.style.fontWeight = '600';
    totalNode.textContent = `Total de la compra: ${totalAmount}`;
    elementoTotal.appendChild(totalNode);
  }
}

// Llamar a la función para renderizar la tabla
renderCartTable();