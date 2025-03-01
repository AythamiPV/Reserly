document.addEventListener("DOMContentLoaded", function () {
    const selectedOption = document.querySelector(".selected-option");
    const dropdown = document.querySelector(".dropdown");
    const selectedFlag = document.getElementById("selected-flag");
    const selectedCode = document.getElementById("selected-code");

    selectedOption.addEventListener("click", function () {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    dropdown.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const code = event.target.getAttribute("data-code");
            const flag = event.target.getAttribute("data-flag");

            selectedFlag.src = `../Pictures/${flag}`;
            selectedCode.textContent = code;

            dropdown.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!selectedOption.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const selectedFlag = document.getElementById("selected-flag");
        const selectedCode = document.getElementById("selected-code");

        // Asegurar que la imagen inicial sea la correcta
        selectedFlag.src = "../Pictures/us.png";
        selectedCode.textContent = "+1";
    });
});
