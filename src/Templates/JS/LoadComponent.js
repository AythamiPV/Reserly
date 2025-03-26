document.addEventListener("DOMContentLoaded", () => {
    // Definimos los componentes con sus archivos HTML y sus scripts
    const components = {
        "CompanyMain_header": { html: "LoggedHeader.html", js: "LoggedHeaderScript.js" },
        "Schedule": { html: "Schedule_template.html", js: "ScheduledScript.js" },
        "ScheduleList": { html: "List_template.html", js: "" },
        "Calendar": { html: "Calendar_template.html", js: "CalendarScript.js" },
        "Service": { html: "Service_template.html", js: "ServiceScript.js" },
        "ServiceList": { html: "List_template.html", js: "" },
        "AboutYou": { html: "AboutYou_template.html", js: "AboutYouEditScript.js" },
        "Location": { html: "Location.html", js: "" },
        "main_footer": { html: "Footer.html", js: "" }
    };

    // Cargar los componentes de manera dinámica
    Object.entries(components).forEach(([id, { html, js }]) => {
        const element = document.getElementById(id);

        if (element) {
            // Cargar el HTML
            fetch(`../HTML-components/${html}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Error loading ${html}`);
                    return response.text();
                })
                .then(htmlContent => {
                    element.innerHTML = htmlContent;

                    // Si hay un script asociado, cargarlo
                    if (js) {
                        loadScript(js);
                    }
                })
                .catch(error => console.error(`Failed to load ${html}:`, error));
        }
    });
});

// Función para cargar un script dinámicamente y asegurar que se ejecute correctamente
function loadScript(scriptName) {
    const script = document.createElement("script");
    script.src = `../JS/${scriptName}`;
    script.defer = true;

    // Agregar control de carga del script
    script.onload = () => {
        console.log(`${scriptName} loaded successfully.`);
    };

    script.onerror = () => {
        console.error(`Error loading script: ${scriptName}`);
    };

    document.body.appendChild(script);
}
