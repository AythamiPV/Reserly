document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.querySelector(".search-icon");
    const searchContainer = document.querySelector(".search-container");
    const menuIcon = document.querySelector(".menu-icon");
    const menuContainer = document.querySelector(".menu-container");

    // Al hacer clic en el icono de búsqueda
    searchIcon.addEventListener("click", function(event) {
        searchContainer.classList.toggle("show"); // Mostrar u ocultar el buscador
        event.stopPropagation(); // Evitar que se cierre al hacer clic fuera
    });

    // Al hacer clic en el icono del menú
    menuIcon.addEventListener("click", function(event) {
        menuContainer.classList.toggle("show");
        event.stopPropagation();
    });

    // Si se hace clic fuera del buscador o del menú, se cierran
    document.addEventListener("click", function(event) {
        // Solo cerramos el contenedor de búsqueda si se hace clic fuera de él
        if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
            searchContainer.classList.remove("show");
        }

        // Si se hace clic fuera del menú, se cierra
        if (!menuIcon.contains(event.target)) {
            menuContainer.classList.remove("show");
        }
    });

    // Prevenir que el buscador se cierre si se hace clic dentro del input
    searchContainer.querySelector("input").addEventListener("click", function(event) {
        event.stopPropagation();  // Evita que el clic cierre el buscador
    });
});
