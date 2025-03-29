async function loadCompanyData() {
    try {
        const response = await fetch('../Data/User.json');
        if (!response.ok) {
            throw new Error('Error al cargar el JSON');
        }
        const jsonData = await response.json();
        const companyUser = jsonData.users.find(user => user.type === "company");

        if (!companyUser) {
            throw new Error("No se encontró un usuario de tipo 'company'");
        }

        const usernameHeader = document.querySelector('.username');
        if (usernameHeader) {
            usernameHeader.textContent = companyUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase 'username' en el header");
        }

        const companyNameElement = document.querySelector('.company-name');
        if (companyNameElement) {
            companyNameElement.textContent = companyUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase 'company-name'");
        }

        const selectedDateInput = document.getElementById("date-input");
        const selectedDate = selectedDateInput ? selectedDateInput.value : "";
        const formattedSelectedDate = selectedDate;

        const reservationsList = document.getElementById("List");
        const emptyMessage = document.getElementById("empty-message");

        if (reservationsList) {
            reservationsList.innerHTML = "";

            let foundReservation = false;
            let displayIndex = 0;

            companyUser.Reservations.forEach((res) => {
                if (res.date !== formattedSelectedDate) {
                    return;
                }

                foundReservation = true;

                const listItem = document.createElement("div");
                listItem.classList.add("list-item");
                listItem.classList.add(displayIndex % 2 === 0 ? 'light' : 'dark');
                listItem.innerHTML = `
                    <img src="../Pictures/UserDefault-icon.png" alt="User Image" class="user-image">
                    <p><strong>${res.username}</strong>, Book a ${res.time} ${res.service}.</p>
                `;
                reservationsList.appendChild(listItem);
                displayIndex++;
            });

            if (!foundReservation) {
                reservationsList.innerHTML = "";
                const message = document.createElement("p");
                message.textContent = "Reservation list is empty";
                message.classList.add("empty-message");
                reservationsList.appendChild(message);
            }
        } else {
            console.warn("No se encontró el elemento con id 'List'");
        }
    } catch (error) {
        console.error("Error cargando los datos de la empresa:", error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadCompanyData);
