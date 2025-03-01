document.addEventListener("DOMContentLoaded", function () {
    function initDropdown() {
        const currentPage = window.location.pathname.split("/").pop();

        if (currentPage === "CompanyMain.html") {
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
    }

    // Esperamos a que el header se inserte en el DOM
    let checkHeader = setInterval(() => {
        if (document.querySelector(".profile-pic")) {
            clearInterval(checkHeader);
            initDropdown();
        }
    }, 100);
});
