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

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let errors = [];

    const fullName = document.getElementById("fullName").value.trim();
    if (fullName.split(" ").length < 2) {
        errors.push("Debe incluir al menos un nombre y un apellido.");
    }

    const email = document.getElementById("email").value.trim();
    if (!email.endsWith("@gmail.com")) {
        errors.push("El correo debe terminar en @gmail.com.");
    }

    const password = document.getElementById("password").value;
    if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.push("La contraseña debe incluir al menos una mayúscula y un número.");
    }

    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
    }

    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{9}$/.test(phone)) {
        errors.push("El número de teléfono debe tener exactamente 9 dígitos.");
    }

    if (errors.length > 0) {
        showModal(errors);
    } else {
        alert("Formulario enviado correctamente.");
        // Aquí podrías hacer un envío con fetch()
    }
});

function showModal(errors) {
    const modal = document.getElementById("errorModal");
    const errorList = document.getElementById("errorList");
    errorList.innerHTML = "";

    errors.forEach(error => {
        let li = document.createElement("li");
        li.textContent = error;
        errorList.appendChild(li);
    });

    modal.style.display = "block";

    document.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFormulario);
} else {
    initFormulario();
}
