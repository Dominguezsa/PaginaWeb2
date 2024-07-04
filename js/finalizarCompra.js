function renderCartTable() {
  // Acceder al contenido del carrito
  const cartContent = JSON.parse(localStorage.getItem('cartContent')) || {};

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
    container.innerHTML = '<p style="display:flex; justify-content: center; align-items:center; margin-top: 50%;"class="carritoVacio">El carrito está vacío</p>'; // Mostrar mensaje
  } else {
    Object.values(cartContent).forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: auto;"></td>
          <td style="text-align: center;">${product.id}</td>
          <td style="text-align: center;">${product.quantity}</td>
          <td style="text-align: center;">$ ${product.price * product.quantity}</td>
        `;
      table.appendChild(row);
      // Insertar la tabla en el DOM
      const container = document.querySelector('#cartTableContainer');
      container.innerHTML = ''; // Limpiar el contenedor antes de añadir la nueva tabla
      container.style.display = 'flex'; // Usar flexbox
      container.style.justifyContent = 'center'; // Centrar horizontalmente
      container.style.alignItems = 'center'; // Centrar verticalmente
      container.style.flexDirection = 'column'; // Alinear los elementos en columna
      container.appendChild(table);
      let total = 0;
      Object.values(cartContent).forEach(product => {
        total += product.price * product.quantity;
      });
      let elementoTotal = document.querySelector('#cartTableContainer');
      let textoTotal = document.createTextNode(`Total de la compra: $${total}`);
      elementoTotal.appendChild(textoTotal);
    });
  }
}

// Llamar a la función para renderizar la tabla
renderCartTable();