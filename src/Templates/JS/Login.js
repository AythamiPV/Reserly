document.addEventListener("DOMContentLoaded", function () {
    function initLogin(event) {
        if (event) event.preventDefault(); // Evita que el formulario se envíe automáticamente

        console.log("Iniciando sesión...");

        const emailInput = document.querySelector("input[type='email']");
        const passwordInput = document.querySelector("input[type='password']");

        if (!emailInput || !passwordInput) {
            alert("No se encontraron los campos de email o contraseña.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Email ingresado:", email);
        console.log("Password ingresado:", password);

        fetch("../Data/User.json") // Verifica que la ruta sea correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo JSON");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos cargados correctamente:", data);

                const users = data.users || [];
                const user = users.find(u => u.email === email);

                if (!user) {
                    alert("El correo no está registrado.");
                    return;
                }

                if (user.password !== password) {
                    alert("Contraseña incorrecta.");
                    return;
                }

                console.log("Usuario encontrado:", user);

                // Redirigir según el tipo de usuario
                if (user.type === "client") {
                    console.log("Redirigiendo a Tu_Cuenta.html...");
                    window.location.href = "../HTML/Tu_Cuenta.html";
                } else if (user.type === "company") {
                    console.log("Redirigiendo a CompanyMain.html...");
                    window.location.href = "../HTML/CompanyMain.html";
                } else {
                    alert("Tipo de usuario desconocido.");
                }
            })
            .catch(error => {
                console.error("Error al cargar el JSON:", error);
                alert("Hubo un problema al cargar los datos de usuario.");
            });
    }

    function waitForForm() {
        const form = document.querySelector("form");
        if (!form) {
            console.warn("Formulario aún no cargado, esperando...");
            setTimeout(waitForForm, 100); // Reintentar en 100ms
            return;
        }
        console.log("Formulario encontrado, asignando evento.");
        form.addEventListener("submit", initLogin);
    }

    waitForForm(); // Inicia la espera del formulario
});
