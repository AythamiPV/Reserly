const reservations = [
    {
        service: "Haircut",
        date: "2025-04-02",
        time: "16:00",
        location: "Gran Canaria Salon"
    },
    {
        service: "Massage",
        date: "2025-04-10",
        time: "11:30",
        location: "Relax Spa"
    },
    {
        service: "Facial",
        date: "2025-03-18",
        time: "14:00",
        location: "Skin Glow Center"
    },
    {
        service: "Nails",
        date: "2025-04-01",
        time: "10:00",
        location: "Beauty Bar"
    }
];

const container = document.querySelector('.reservations-grid');

reservations.forEach(res => {
    const card = document.createElement('div');
    card.className = 'reservation-card';
    card.innerHTML = `
    <h3>${res.service}</h3>
    <p>${res.date} at ${res.time}</p>
    <p>${res.location}</p>
  `;
    container.appendChild(card);
});
