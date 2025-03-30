const services = ["Haircut", "Massage", "Facial", "Nails"];
const serviceContainer = document.querySelector(".service-options");
const confirmButton = document.getElementById("confirm-button");
let selectedService = null;

// Generar tarjetas de servicios
services.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.textContent = service;

    card.addEventListener("click", () => {
        // Deseleccionar todos
        document.querySelectorAll(".service-card").forEach(c => c.classList.remove("selected"));
        // Seleccionar actual
        card.classList.add("selected");
        selectedService = service;
        updateConfirmState();
    });

    serviceContainer.appendChild(card);
});

// Habilitar el botón si hay selección
function updateConfirmState() {
    const date = document.getElementById("reservation-date").value;
    confirmButton.disabled = !(selectedService && date);
}

document.getElementById("reservation-date").addEventListener("change", updateConfirmState);

// Confirmar reserva (simulado)
confirmButton.addEventListener("click", () => {
    const date = document.getElementById("reservation-date").value;
    alert(`✅ Reservation confirmed:\nService: ${selectedService}\nDate: ${date}`);
});
