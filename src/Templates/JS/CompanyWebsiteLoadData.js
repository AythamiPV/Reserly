async function loadCompanyPageData() {
    try {
        console.log("Cargando datos de la empresa...");

        const response = await fetch('../Data/User.json');
        if (!response.ok) {
            throw new Error('Error al cargar el JSON');
        }

        const jsonData = await response.json();
        console.log("Datos cargados:", jsonData);

        const companyUser = jsonData.users.find(user => user.type === 'company');
        const clientUser = jsonData.users.find(user => user.type === 'client');

        if (!companyUser || !clientUser) {
            throw new Error('No se encontraron usuarios de tipo "company" o "client"');
        }

        const companyNameElement = document.querySelector('.company-name');
        if (companyNameElement) {
            companyNameElement.textContent = companyUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase '.company-name'");
        }

        const usernameHeader = document.querySelector('.username');
        if (usernameHeader) {
            usernameHeader.textContent = clientUser.username;
        } else {
            console.warn("No se encontró el elemento con la clase '.username' en el header");
        }

        const companyDescriptionElement = document.querySelector('.company-details p');
        if (companyDescriptionElement) {
            companyDescriptionElement.textContent = companyUser.AboutUs;
        } else {
            console.warn("No se encontró el elemento con la clase '.company-details p' para la descripción de la empresa");
        }

        await waitForElement("#ServiceList");
        const serviceList = document.getElementById("List");
        if (serviceList) {
            serviceList.innerHTML = "";

            let foundService = false;

            companyUser.Service.forEach((service, index) => {
                foundService = true;

                const serviceItem = document.createElement("div");
                serviceItem.classList.add("list-item");
                serviceItem.classList.add(index % 2 === 0 ? 'light' : 'dark');
                serviceItem.innerHTML = ` 
                    <img src="../Pictures/UserDefault-icon.png" alt="Service Image" class="user-image">
                    <p><strong>${service.name}</strong> (${service.price} €)</p>
                `;
                serviceList.appendChild(serviceItem);
            });
            if (!foundService) {
                const message = document.createElement("p");
                message.textContent = "No services available";
                message.classList.add("empty-message");
                serviceList.appendChild(message);
            }
        } else {
            console.warn("No se encontró el contenedor 'ServiceList'");
        }

    } catch (error) {
        console.error("Error cargando los datos de la página de la empresa:", error.message);
    }
}

function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject(new Error(`Elemento no encontrado: ${selector}`));
            }
        }, 100);
    });
}

document.addEventListener("DOMContentLoaded", loadCompanyPageData);
