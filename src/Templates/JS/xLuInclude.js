// Mapeo manual de los HTML con sus respectivos JS
const scriptMap = {
    "BodySettingsOfCompany_template.html": "CompanySettingsScript.js",
    "Calendar_template.html": "CalendarScript.js",
    "List_template.html": "ListScript.js",
    "Scheduled_template.html": "ScheduledScript.js",
    "Service_template.html": "ServiceScript.js",
    "AboutYou_template.html": "AboutYouEditScript.js",
    "LoggedHeader.html": "LoggedHeaderScript.js",
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
                }

                xLuIncludeFile();
            }
        } catch (error) {
            console.error(`Error cargando ${filePath}:`, error);
        }
    }
}

async function loadScript(scriptPath) {
    try {
        let response = await fetch(scriptPath);
        if (response.ok) {
            let scriptText = await response.text();
            let scriptElement = document.createElement("script");
            scriptElement.textContent = scriptText;
            document.body.appendChild(scriptElement);
        }
    } catch (error) {
        console.warn(`No se encontró el script para ${scriptPath}`);
    }
}

document.addEventListener("DOMContentLoaded", xLuIncludeFile);
