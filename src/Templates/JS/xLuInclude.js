// Mapeo manual de los HTML con sus respectivos JS
const scriptMap = {
    "BodySettingsOfCompany_template.html": "CompanySettingsScript.js",
    "Calendar_template.html": "CalendarScript.js",
    "List_template.html": "ListScript.js",
    "Scheduled_template.html": "ScheduledScript.js",
    "Service_template.html": "ServiceScript.js",
    "AboutYou_template.html": "AboutYouEditScript.js",
    "LoggedHeader.html": "LoggedHeaderScript.js",
    "Formulario.html": "FormularioScript.js",
    "Footer.html": "FooterScript.js",
    "FormularioInicio.html": "FormularioInicioScript.js",
    "Header1.html": "Header1Script.js",
    "Valoracion.html" : "ValoracionScript.js",
    "Locartion.html": "LocartionScript.js",
};

async function xLuIncludeFile() {
    let elements = document.querySelectorAll("[xlu-include-file]");

    for (let elem of elements) {
        let file = elem.getAttribute("xlu-include-file");
        let filePath = `../HTML-components/${file}`;

        try {
            let response = await fetch(filePath);
            if (response.ok) {
                let content = await response.text();
                elem.innerHTML = content;
                elem.removeAttribute("xlu-include-file");

                let scriptFile = scriptMap[file];
                if (scriptFile) {
                    await loadScript(`../JS/${scriptFile}`);
                    
                    if (file === "Calendar_template.html" && typeof initCalendar === "function") {
                        initCalendar();
                    }

                    if (file === "LoggedHeader.html" && typeof initDropdown === "function") {
                        initDropdown();
                        const currentPage = window.location.pathname.split("/").pop();
                        if (currentPage !== "CompanyMain.html") {
                            const manageLink = document.querySelector(".dropdown-menu a[href*='ManageCompany.html']");
                            if (manageLink) {
                                manageLink.remove();
                            }
                        }
                        if (currentPage !== "Tu_Cuenta.html") {
                            const manageLink = document.querySelector(".dropdown-menu a[href*='Tus_Reservas.html']");
                            if (manageLink) {
                                manageLink.remove();
                            }
                        }
                    }
                }
                await xLuIncludeFile();
            }
        } catch (error) {
            console.error(`Error cargando ${filePath}:`, error);
        }
    }
}

async function loadScript(scriptPath) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(scriptPath);
            if (response.ok) {
                let scriptText = await response.text();
                let scriptElement = document.createElement("script");
                scriptElement.textContent = scriptText;
                document.body.appendChild(scriptElement);
                resolve();
            } else {
                console.warn(`No se encontró el script para ${scriptPath}`);
                reject();
            }
        } catch (error) {
            console.error(`Error cargando script: ${scriptPath}`, error);
            reject();
        }
    });
}

document.addEventListener("DOMContentLoaded", xLuIncludeFile);