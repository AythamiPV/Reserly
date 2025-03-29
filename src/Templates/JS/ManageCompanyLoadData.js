async function loadCompanyData() {
    try {
        console.log("Cargando datos de la empresa...");

        const response = await fetch('../Data/User.json');
        if (!response.ok) {
            throw new Error('Error al cargar el JSON');
        }

        const jsonData = await response.json();
        console.log("Datos cargados:", jsonData);

        const companyUser = jsonData.users.find(user => user.type === 'company');

        if (!companyUser) {
            throw new Error("No se encontró un usuario de tipo 'company'");
        }

        // Insertar nombre de la empresa
        const companyNameElement = document.querySelector('.company-name');
        if (companyNameElement) {
            companyNameElement.textContent = companyUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase 'company-name'");
        }

        // Insertar nombre en el header si existe una clase 'username'
        const usernameHeader = document.querySelector('.username');
        if (usernameHeader) {
            usernameHeader.textContent = companyUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase 'username' en el header");
        }

        // Insertar descripción de la empresa en "About you"
        const aboutYouText = document.getElementById("editable-text");
        if (aboutYouText) {
            aboutYouText.textContent = companyUser.AboutUs || "Click the pencil to edit this text.";
        } else {
            console.warn("No se encontró el elemento con id 'editable-text'");
        }

        // Esperar a que se cargue la plantilla en "ScheduleList"
        const scheduleContainer = document.getElementById("ScheduleList");
        if (scheduleContainer) {
            const checkListLoaded = setInterval(() => {
                const listContainer = scheduleContainer.querySelector("#List");
                if (listContainer) {
                    clearInterval(checkListLoaded); // Detener la espera

                    listContainer.innerHTML = ""; // Limpiar antes de agregar elementos

                    let foundSchedule = false;

                    companyUser.Schedule.forEach((schedule, index) => {
                        foundSchedule = true;

                        const scheduleItem = document.createElement("div");
                        scheduleItem.classList.add("list-item");
                        scheduleItem.classList.add(index % 2 === 0 ? 'light' : 'dark');
                        scheduleItem.innerHTML = ` 
                            <img src="../Pictures/UserDefault-icon.png" alt="User Image" class="user-image">
                            <p><strong>Days: </strong>${schedule.days.join(", ")}.</p>
                            <p><strong>Hours: </strong>${schedule.hours}.</p>
                        `;
                        listContainer.appendChild(scheduleItem);
                    });

                    if (!foundSchedule) {
                        const message = document.createElement("p");
                        message.textContent = "No schedules available";
                        message.classList.add("empty-message");
                        listContainer.appendChild(message);
                    }
                }
            }, 100);
        } else {
            console.warn("No se encontró el elemento con id 'ScheduleList'");
        }

        // **Cargar servicios en la lista de servicios**
        const serviceContainer = document.getElementById("ServiceList");
        if (serviceContainer) {
            const checkServiceListLoaded = setInterval(() => {
                const listContainer = serviceContainer.querySelector("#List");
                if (listContainer) {
                    clearInterval(checkServiceListLoaded); // Detener la espera

                    listContainer.innerHTML = ""; // Limpiar antes de agregar elementos

                    let foundService = false;

                    companyUser.Service.forEach((service, index) => {
                        foundService = true;

                        const serviceItem = document.createElement("div");
                        serviceItem.classList.add("list-item");
                        serviceItem.classList.add(index % 2 === 0 ? 'light' : 'dark');
                        serviceItem.innerHTML = `
                            <img src="../Pictures/UserDefault-icon.png" alt="Service Image" class="user-image">
                            <p><strong>${service.name}</strong></p>
                            <p>Price: ${service.price}€</p>
                            <p>Timecost: ${service.time} minutes</p>
                        `;
                        listContainer.appendChild(serviceItem);
                    });

                    if (!foundService) {
                        const message = document.createElement("p");
                        message.textContent = "No services available";
                        message.classList.add("empty-message");
                        listContainer.appendChild(message);
                    }
                }
            }, 100);
        } else {
            console.warn("No se encontró el elemento con id 'ServiceList'");
        }

        // Cargar mapa con la localización de la empresa
        const locationElement = document.getElementById("Location");
        if (locationElement) {
            loadTemplate('../HTML-components/Location.html', locationElement, function() {
                // Obtener las coordenadas de la empresa
                const coordinates = companyUser.Localization.coord;

                // Crear el mapa con las coordenadas de la empresa
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    const map = L.map(mapContainer).setView(coordinates, 13);

                    // Capa de OpenStreetMap
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    // Agregar el marcador en la ubicación de la empresa
                    const marker = L.marker(coordinates).addTo(map);
                    marker.bindPopup("<b>Mi Empresa</b><br>Ubicada aquí").openPopup();

                    // Espera a que el mapa y el contenedor estén listos y luego recalcula el tamaño
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 100);
                }
            });
        }

    } catch (error) {
        console.error("Error cargando los datos de la empresa:", error.message);
    }
}

// Cargar datos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadCompanyData);
