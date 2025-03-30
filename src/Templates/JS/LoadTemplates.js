document.addEventListener('DOMContentLoaded', init);

function loadTemplate(fileName, element, callback) {
    fetch(fileName)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error cargando ${fileName}: ${res.status}`);
            }
            return res.text();
        })
        .then((text) => {
            element.innerHTML = text;
            if (callback) {
                callback();
            }
        })
        .catch((error) => {
            console.error("Error al cargar componente:", error);
        });
}

function init() {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        loadTemplate('../HTML-components/LoggedHeader.html', headerElement, function() {
            initDropdown();
        });
    }
    const footerElement = document.getElementById('main_footer');
    if (footerElement) {
        loadTemplate('../HTML-components/Footer.html', footerElement);
    }

    // Cargar el calendario solo si el elemento con id 'Calendar' está presente
    const calendarElement = document.getElementById('Calendar');
    if (calendarElement) {
        loadTemplate('../HTML-components/Calendar_template.html', calendarElement, function() {
            initCalendar();
        });
    }

    // Cargar las listas solo si los elementos con id 'ReservationsList', 'ServiceList' y 'ScheduleList' están presentes
    const reservationsListElement = document.getElementById('ReservationsList');
    if (reservationsListElement) {
        loadTemplate('../HTML-components/List_template.html', reservationsListElement);
    }

    const serviceListElement = document.getElementById('ServiceList');
    if (serviceListElement) {
        loadTemplate('../HTML-components/List_template.html', serviceListElement);
    }

    const scheduleListElement = document.getElementById('ScheduleList');
    if (scheduleListElement) {
        loadTemplate('../HTML-components/List_template.html', scheduleListElement);
    }

    // Cargar el formulario solo si el elemento con id 'Formulario' está presente
    const formularioElement = document.getElementById('Formulario');
    if (formularioElement) {
        loadTemplate('../HTML-components/Formulario.html', formularioElement, function() {
            initFormulario();
        });
    }

    // Cargar el header adicional solo si el elemento con id 'main_header' está presente
    const mainHeaderElement = document.getElementById('main_header');
    if (mainHeaderElement) {
        loadTemplate('../HTML-components/Header1.html', mainHeaderElement);
    }

    // Cargar el formulario de inicio solo si el elemento con id 'FormularioInicio' está presente
    const formularioInicioElement = document.getElementById('FormularioInicio');
    if (formularioInicioElement) {
        loadTemplate('../HTML-components/FormularioInicio.html', formularioInicioElement);
    }

    // Cargar el schedule solo si el elemento con id 'Schedule' está presente
    const scheduleElement = document.getElementById('Schedule');
    if (scheduleElement) {
        loadTemplate('../HTML-components/Schedule_template.html', scheduleElement);
    }

    // Cargar los servicios solo si el elemento con id 'Service' está presente
    const serviceElement = document.getElementById('Service');
    if (serviceElement) {
        loadTemplate('../HTML-components/Service_template.html', serviceElement);
    }

    // Cargar la localización solo si el elemento con id 'Location' está presente
    const locationElement = document.getElementById('Location');
    if (locationElement) {
        loadTemplate('../HTML-components/Location.html', locationElement, function() {
            initializeMap();
        });
    }

    // Cargar la valoración solo si el elemento con id 'Reseña' está presente
    const reseñaElement = document.getElementById('Reseña');
    if (reseñaElement) {
        loadTemplate('../HTML-components/Valoracion.html', reseñaElement);
    }
}
