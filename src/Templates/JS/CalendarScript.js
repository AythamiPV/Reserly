document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM cargado");

    initCalendar();
})

function initCalendar() {
    console.log("✅ initCalendar ejecutado");

    const monthYear = document.querySelector(".month-year");
    const prevMonthBtn = document.querySelector(".prev-month");
    const nextMonthBtn = document.querySelector(".next-month");
    const calendarDays = document.querySelector(".calendar-days");
    const dateInput = document.querySelector("#date-input");
    let selectedDate = new Date();

    if (!monthYear || !prevMonthBtn || !nextMonthBtn || !calendarDays || !dateInput) {
        console.warn("⚠️ Elementos del calendario no encontrados.");
        return;
    }

    function renderCalendar() {
        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const prevLastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);

        monthYear.textContent = firstDay.toLocaleString("en-US", { month: "long", year: "numeric" });
        calendarDays.innerHTML = "<div class='day'>M</div><div class='day'>T</div><div class='day'>W</div><div class='day'>T</div><div class='day'>F</div><div class='day'>S</div><div class='day'>S</div>";

        let startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        for (let i = prevLastDay.getDate() - startDay + 1; i <= prevLastDay.getDate(); i++) {
            calendarDays.innerHTML += `<div class='date inactive' data-disabled='true'>${i}</div>`;
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            calendarDays.innerHTML += `<div class='date'>${i}</div>`;
        }

        let remainingDays = (7 - (calendarDays.children.length % 7)) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            calendarDays.innerHTML += `<div class='date inactive' data-disabled='true'>${i}</div>`;
        }

        // Seleccionar el día actual si está en el mes actual
        const today = new Date();
        if (today.getFullYear() === selectedDate.getFullYear() && today.getMonth() === selectedDate.getMonth()) {
            const todayDate = today.getDate();
            const todayElement = Array.from(calendarDays.children).find(day => day.textContent == todayDate);
            if (todayElement && !todayElement.classList.contains("inactive")) {
                todayElement.classList.add("selected");
                const day = todayDate.toString().padStart(2, '0');
                const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = selectedDate.getFullYear();
                dateInput.value = `${month}/${day}/${year}`;
            }
        }

        document.querySelectorAll(".date").forEach(date => {
            if (!date.classList.contains("inactive")) {
                date.addEventListener("click", function () {
                    document.querySelectorAll(".date").forEach(d => d.classList.remove("selected"));
                    this.classList.add("selected");
                    const day = this.textContent.padStart(2, '0');
                    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                    const year = selectedDate.getFullYear();
                    dateInput.value = `${month}/${day}/${year}`;

                    loadCompanyData();
                });
            }
        });
    }

    prevMonthBtn.addEventListener("click", () => {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}
