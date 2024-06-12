window.onload = function() {
    // Obtén todos los botones de radio y los divs de información
    var radios = document.querySelectorAll('.btn-check');
    var infoDivs = document.querySelectorAll('.informacionGeneral > div');

    // Muestra el div de biografía al inicio
    infoDivs[0].style.display = 'block';

    // Para cada botón de radio, agrega un evento de escucha 'change'
    radios.forEach(function(radio, index) {
        radio.addEventListener('change', function() {
            // En el evento de escucha, oculta todos los divs de información
            infoDivs.forEach(function(div) {
                div.style.display = 'none';
            });

            // Muestra solo el div de información que corresponde al botón de radio activado
            infoDivs[index].style.display = 'block';
        });
    });
}