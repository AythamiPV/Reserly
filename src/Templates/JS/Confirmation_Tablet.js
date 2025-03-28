let selectedService = null;

fetch("../JSON/Confirmation_Tablet.json")
    .then(res => res.json())
    .then(data => {
        const gallery = document.getElementById("service-gallery");

        data.services.forEach(service => {
            const card = document.createElement("div");
            card.className = "service-card";
            card.innerHTML = `
        <img src="${service.icon}" alt="${service.name}" />
        <span>${service.name}</span>
      `;

            card.addEventListener("click", () => {
                document.querySelectorAll(".service-card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                selectedService = service.name;
                updateConfirmState();
            });

            gallery.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading services:", err));

document.getElementById("reservation-date").addEventListener("change", updateConfirmState);

function updateConfirmState() {
    const date = document.getElementById("reservation-date").value;
    const button = document.getElementById("confirm-btn");
    button.disabled = !(selectedService && date);
}

document.getElementById("confirm-btn").addEventListener("click", () => {
    const date = document.getElementById("reservation-date").value;
    alert(`✅ Reservation confirmed!\nService: ${selectedService}\nDate: ${date}`);
});
