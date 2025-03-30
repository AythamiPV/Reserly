window.addEventListener("DOMContentLoaded", () => {
    fetch("../data/userData.json")
        .then(res => res.json())
        .then(data => {
            document.getElementById("userName").textContent = data.user.fullName;
            document.getElementById("profileImage").src = data.user.profileImage;
        });

    document.getElementById("form").addEventListener("submit", e => {
        e.preventDefault();
        alert("Formulario enviado correctamente.");
    });
});
