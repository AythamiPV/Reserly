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
    loadTemplate('../HTML-components/LoggedHeader.html', document.getElementById('header'), function() {
        initDropdown();
    });
    loadTemplate('../HTML-components/Footer.html', document.getElementById('main_footer'));
    loadTemplate('../HTML-components/Calendar_template.html', document.getElementById('Calendar'), function() {
        initCalendar();
    });
    loadTemplate('../HTML-components/List_template.html', document.getElementById('ReservationsList'));
    loadTemplate('../HTML-components/List_template.html', document.getElementById('ServiceList'));
    loadTemplate('../HTML-components/List_template.html', document.getElementById('ScheduleList'));
    loadTemplate('../HTML-components/Formulario.html', document.getElementById('Formulario'));
    loadTemplate('../HTML-components/Header1.html', document.getElementById('main_header'));
    loadTemplate('../HTML-components/FormularioInicio.html', document.getElementById('FormularioInicio'));
    loadTemplate('../HTML-components/Shedule_template.html', document.getElementById('Schedule'));
    loadTemplate('../HTML-components/Service_template.html', document.getElementById('Service'));
    loadTemplate('../HTML-components/AboutYou_template.html', document.getElementById('AboutYou'));
    loadTemplate('../HTML-components/Location.html', document.getElementById('Location'));
    loadTemplate('../HTML-components/Valoracion.html', document.getElementById('Reseña'));
    }