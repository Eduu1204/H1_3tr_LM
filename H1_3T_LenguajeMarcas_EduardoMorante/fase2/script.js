// Obtener la lista de provincias del API
fetch('https://www.el-tiempo.net/api/json/v2/provincias')
.then(response => response.json())
.then(data => {
    const provinciasSelect = document.getElementById('provincias-select');
    const provinciaInfo = document.getElementById('provincia-info');

    // Crear opciones para cada provincia y agregarlas al menú desplegable
    data.provincias.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia.CODPROV;
        option.textContent = provincia.NOMBRE_PROVINCIA;
        provinciasSelect.appendChild(option);
    });

    // Función para mostrar la información de la provincia seleccionada
    const mostrarInformacionProvincia = () => {
        const codigoProvinciaSeleccionada = provinciasSelect.value;
        const provinciaSeleccionada = data.provincias.find(provincia => provincia.CODPROV === codigoProvinciaSeleccionada);

        // Mostrar la información de la provincia seleccionada
        provinciaInfo.innerHTML = `
            <h2>${provinciaSeleccionada.NOMBRE_PROVINCIA}</h2>
            <p>Código: ${provinciaSeleccionada.CODPROV}</p>
            <p>Comunidad Autónoma: ${provinciaSeleccionada.COMUNIDAD_CIUDAD_AUTONOMA}</p>
            <p>Capital: ${provinciaSeleccionada.CAPITAL_PROVINCIA}</p>
        `;
    };

    // Escuchar el evento de cambio en el menú desplegable
    provinciasSelect.addEventListener('change', mostrarInformacionProvincia);

    // Mostrar información de la primera provincia por defecto
    mostrarInformacionProvincia();
})
.catch(error => {
    console.error('Error al obtener la lista de provincias:', error);
});
