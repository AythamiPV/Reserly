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
    "Valoracion.html": "ValoracionScript.js",
    "Locartion.html": "LocartionScript.js",
    "Map_template.html": "MapScript.js",
};

async function xLuIncludeFile() {
    let elements = document.querySelectorAll("[xlu-include-file]");

    for (let elem of elements) {
        let file = elem.getAttribute("xlu-include-file");
        let filePath = `../HTML-components/${file}`;

        try {
            let response = await fetch(filePath);
            if (!response.ok) throw new Error(`Error cargando ${filePath}`);

            let content = await response.text();
            elem.innerHTML = content;
            elem.removeAttribute("xlu-include-file");

            let scriptFile = scriptMap[file];
            if (scriptFile) {
                await loadScript(`../JS/${scriptFile}`);
                executeDynamicFunctions(file);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

async function loadScript(scriptPath) {
    try {
        let response = await fetch(scriptPath);
        if (!response.ok) throw new Error(`No se encontró el script para ${scriptPath}`);

        let scriptText = await response.text();
        let scriptElement = document.createElement("script");
        scriptElement.textContent = scriptText;
        document.body.appendChild(scriptElement);
    } catch (error) {
        console.error(error);
    }
}

function executeDynamicFunctions(file) {
    if (file === "Calendar_template.html" && typeof initCalendar === "function") {
        initCalendar();
    }
    if (file === "LoggedHeader.html" && typeof initDropdown === "function") {
        initDropdown();
        adjustHeaderLinks();
    }
}

function adjustHeaderLinks() {
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "CompanyMain.html") {
        document.querySelector(".dropdown-menu a[href*='ManageCompany.html']")?.remove();
    }
    if (currentPage !== "Tu_Cuenta.html") {
        document.querySelector(".dropdown-menu a[href*='Tus_Reservas.html']")?.remove();
    }
}

document.addEventListener("DOMContentLoaded", xLuIncludeFile);
