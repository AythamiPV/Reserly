function initDropdown() {
    const profilePic = document.querySelector(".profile-pic");
    const dropdown = document.querySelector(".dropdown");

    if (profilePic && dropdown) {
        profilePic.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    }
}

// Ejecuta initDropdown() cuando el DOM haya cargado completamente
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".profile-pic")) {
        initDropdown();
    }
});
