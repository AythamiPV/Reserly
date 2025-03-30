document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        fetch("../Data/User.json") // Asegúrate de que la ruta es correcta
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    if (user.type === "client") {
                        window.location.href = "../HTML/Hi_user.html";
                    } else if (user.type === "company") {
                        window.location.href = "../HTML/CompanyMain.html";
                    }
                } else {
                    alert("Credenciales incorrectas");
                }
            })
            .catch(error => console.error("Error al cargar el JSON", error));
    });
});
