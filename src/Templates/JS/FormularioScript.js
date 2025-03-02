function initFormulario() {
    const selectedOption = document.querySelector(".selected-option");
    const dropdown = document.querySelector(".dropdown");
    const selectedFlag = document.getElementById("selected-flag");
    const selectedCode = document.getElementById("selected-code");

    if (selectedOption && dropdown) {
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
    }

    if (selectedFlag && selectedCode) {
        selectedFlag.src = "../Pictures/us.png";
        selectedCode.textContent = "+1";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFormulario);
} else {
    initFormulario();
}
