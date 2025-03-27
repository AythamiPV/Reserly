document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".option-item");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert(`Seleccionaste: ${button.querySelector(".option-text").textContent}`);
        });
    });
});
