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
        <th>Precio Final</th>
      </tr>
    `;
  
    // Iterar sobre los elementos del carrito y añadirlos a la tabla
    Object.values(cartContent).forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: auto;"></td>
        <td>${product.id}</td>
        <td>${product.price}</td>
        <td>${product.price * product.quantity}</td>
      `;
      table.appendChild(row);
    });
  
    // Insertar la tabla en el DOM
    const container = document.querySelector('#cartTableContainer'); // Asegúrate de tener un elemento con este ID en tu HTML
    container.innerHTML = ''; // Limpiar el contenedor antes de añadir la nueva tabla
    container.appendChild(table);
  }
  
  // Llamar a la función para renderizar la tabla
  renderCartTable();