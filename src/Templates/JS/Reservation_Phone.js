let allReservations = [];

// Cargar datos desde el JSON
fetch('../Data/Reservation_Phone.json')
    .then(res => res.json())
    .then(data => {
        const list = document.querySelector('.reservations-list');
        const searchStories = document.querySelector('.search-stories');

        allReservations = data.reservations; // Guardamos todas para poder filtrar

        // Mostrar todas las reservas por defecto
        renderReservations(allReservations);

        // Mostrar todas al hacer clic en el botón
        document.getElementById('reset-filter').addEventListener('click', () => {
            renderReservations(allReservations);
        });

        // Crear historias interactivas
        data.recentSearches.forEach(story => {
            const div = document.createElement('div');
            div.className = 'story';
            div.innerHTML = `
        <img src="${story.icon}" alt="${story.service}">
        <span>${story.service}</span>
        <span>${story.date}</span>
      `;
            div.addEventListener('click', () => {
                const filtered = allReservations.filter(r => r.service === story.service);
                renderReservations(filtered);
            });
            searchStories.appendChild(div);
        });
    })
    .catch(err => console.error('Error loading Reservation_Phone.json:', err));


// Función para renderizar reservas
function renderReservations(reservations) {
    const list = document.querySelector('.reservations-list');
    list.innerHTML = ''; // Limpiar lista actual
    if (reservations.length === 0) {
        list.innerHTML = `<p style="color: #90caf9;">No reservations found for this service.</p>`;
        return;
    }

    reservations.forEach(res => {
        const card = document.createElement('div');
        card.className = 'reservation-card';
        card.innerHTML = `
      <img src="${res.icon}" alt="${res.service} icon">
      <div>
        <h4>${res.service}</h4>
        <p>${res.date} at ${res.time}</p>
        <p>${res.location}</p>
      </div>
    `;
        list.appendChild(card);
    });
}
