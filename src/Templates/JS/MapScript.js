function initializeMap() {
    const mapContainer = document.getElementById('map');  // El contenedor del mapa

    if (!mapContainer) {
        console.error("El contenedor del mapa no se ha encontrado.");
        return;
    }

    // Coordenadas de la ubicación
    const coordinates = [28.09973, -15.41343];

    // Crear el mapa en el contenedor con id="map"
    const map = L.map(mapContainer).setView(coordinates, 13); // 13 es el zoom inicial

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Espera a que el mapa y el contenedor estén listos y luego recalcula el tamaño
    setTimeout(() => {
        map.invalidateSize(); // Forzar a recalcular el tamaño del mapa
    }, 100);
}

// Aseguramos que el script se ejecute una vez que el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeMap);
