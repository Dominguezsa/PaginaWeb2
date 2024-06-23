function renderCartTable() {
  // Acceder al contenido del carrito
  const cartContent = JSON.parse(localStorage.getItem('cartContent')) || {};

  // Crear la tabla y sus columnas
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Foto</th>
      <th>Product ID</th>
      <th>Precio</th>
    </tr>
  `;

  // Verificar si el carrito está vacío
  if (Object.keys(cartContent).length === 0) {
    const container = document.querySelector('#cartTableContainer');
    container.innerHTML = '<p class="carritoVacio">El carrito está vacío</p>'; // Mostrar mensaje
  } else {
    Object.values(cartContent).forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: auto;"></td>
          <td>${product.id}</td>
          <td>${product.price * product.quantity}</td>
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
  }
}

// Llamar a la función para renderizar la tabla
renderCartTable();