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

window.addEventListener("load", function () {
    setTimeout(() => {
        const currentPage = window.location.pathname.split("/").pop();
        console.log("Página actual:", currentPage);
        if (currentPage !== "CompanyMain.html") {
            const manageLink = document.querySelector(".dropdown-menu a[href*='ManageCompany.html']");
            if (manageLink) {
                manageLink.remove();
            }
        }
    }, 500);
});
