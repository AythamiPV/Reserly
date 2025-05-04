<h1 align="center"> Reserly</h1>

<h2 align="center"> Aythami Pérez Vega, Francisco Malillos Castellano y Nicolás Ruiz Barreto.</h2>

<p align="center">
<img src="img-README/Reserly_Logo.png" alt="Reserly">
</p>

---

# Descripcion del proyecto - Reserly.

Nuestra página web ofrece una solución rápida y sencilla para reservar servicios de peluquería, barbería, manicura, masajes y más. Con una interfaz intuitiva y accesible desde cualquier dispositivo, los clientes pueden encontrar profesionales cercanos, ver su disponibilidad y agendar citas en segundos, sin llamadas ni esperas.

Para los negocios, nuestra plataforma optimiza la gestión de reservas con recordatorios automáticos y herramientas de organización, reduciendo cancelaciones y mejorando la productividad. Además, permite crear un perfil profesional con reseñas y promociones para atraer nuevos clientes.

Con un diseño moderno y funcional, nuestra web digitaliza el sector de la belleza y el bienestar, ofreciendo comodidad y eficiencia a todos.

# Requisitos Funcionales - Reserly

## 1. Gestión de Usuarios
- Registro y autenticación de usuarios (clientes y negocios).
- Inicio de sesión con correo electrónico y contraseña.
- Opción de autenticación mediante redes sociales.
- Perfil de usuario con datos personales y de contacto.
- Gestión de roles (negocio, cliente).

## 2. Gestión de Negocios
- Creación y configuración de perfil para negocios.
- Administración de horarios de atención.
- Definición de servicios ofrecidos (nombre, duración, precio, etc.).
- Configuración de disponibilidad de citas.

## 3. Gestión de Reservas
- Búsqueda y selección de negocios/servicios disponibles.
- Agendamiento de citas en función de la disponibilidad del negocio.
- Confirmación automática de reservas.
- Modificación y cancelación de citas por parte del cliente.

## 4. Gestión de Reseñas y Calificaciones
- Posibilidad de que los clientes dejen reseñas y califiquen los servicios.
- Visualización de opiniones y valoraciones en los perfiles de negocios.


# Listado de Templates - Reserly

-AboutYou_template.html:
  Se carga en ManageCompany.html
  
-Calendar_template.html:
  Se carga en CompanyMain.html, ManageCompany.html, CompletarReserva.html
  
-Footer.html
  Se carga en todos menos InicioSesion.html, Registro.html, CompanyRegister.html
  
-Formulario.html:
  Se carga en CompanyRegister.html
  
-FormularioInicio.html: 
  Se carga en index.html

-Gestionar_Cuenta.html:
  Se carga en MainCompany.html y Tu_Cuenta.html

-Header1.html:
  Se carga en index.html
  
-List_template.html:
  Se carga en CompanyMain.html, CompanyRegister.html
  
-Location.html:
  Se carga en Tu_Cuenta.html, ManageCompany.html

-LoggedHeader.html
  Se carga en Tus_Resrvas.html, Tu_Cuenta.html, ManageCompany.html, Completar_Reseva.html,        CompanyMain.html, CompanyWebsite.html
  
-Schedule_template.html:
  Se carga en CompanyMain.html

-Service_template.html:
  Se carga en CompanyMain.html
  
-Servicios.html
  Se carga en Tu_Cuenta.html

-Valoracion.html:
  Se carga en index.html
  
# Listado de páginas html - Reserly

  -CompanyMain.html corresponde al mockup Principal empresa
  
  -CompanyRegister.html corresponde al mockup Formulario empresa
  
  -CompanyWebsite.html corresponde al mockup a Principal empresa
  
  -Completar_Reserva.html corresponde al mockup Formulario Reserva
  
  -index.html (Página de inicio) corresponde al mockup Principal
  
  -InicioSesion.html corresponde al mockup inicio sesion
  
  -ManageCompany.html corresponde al mockup Modificar horarios/servicios
  
  -Registro.html corresponde al mockup Formulario cliente
  
  -Tu_Cuenta.html corresponde al mockup Principal cliente
  
  -Tus_Reservas.html corresponde al mockup Mis Reservas / Historial

# Menciones interesantes del proyecto

## Biblioteca de Carga de Templates HTML con JS 

Esta biblioteca permite la carga dinámica de templates HTML junto con sus scripts JavaScript correspondientes. Utiliza un atributo personalizado (`xlu-include-file`) para incluir archivos HTML en el DOM y, si corresponde, carga el script asociado desde un mapeo predefinido.

## Funcionamiento

1. **Mapeo de archivos**: Se define un objeto `scriptMap` que relaciona cada archivo HTML con su script JS correspondiente.
2. **Carga de templates**: La función `xLuIncludeFile` busca elementos en el DOM con el atributo `xlu-include-file`, obtiene el HTML correspondiente y lo inserta en el elemento.
3. **Carga de scripts**: Si el template tiene un script asociado en `scriptMap`, la función `loadScript` lo carga y ejecuta.
4. **Inicialización específica**: Se realizan acciones específicas para ciertos templates, como la inicialización del calendario (`initCalendar`) o ajustes en la navegación de usuario (`initDropdown`).
5. **Ejecución recursiva**: Tras insertar un template, `xLuIncludeFile` se llama nuevamente para procesar posibles inclusiones anidadas.

## Uso

Para incluir un template en tu HTML, usa:

```html
<div xlu-include-file="Header1.html"></div>
```
## Código
```js
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
```

# Rutas de PDF y PowerPoint del proyecto
- PDF: Documento/MOCKUPS RESERLY.pdf
- PowerPoint: Documento/PresentaciónSprint1PWM.pptx

# Enlaces a Figma y Trello
- Trello: https://trello.com/invite/b/67a62f6bffa16fc46760a77b/ATTI9789d2d7db6ffa16c1a8e1291604a1999397688E/reserly
- Figma: https://www.figma.com/design/M87p0PfJuhE1bq51WpVQs4/Reserly?node-id=0-1&t=6vBebie4Pjv9fZOe-1

  
