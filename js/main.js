document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mainNavigation = document.getElementById("mainNavigation");

    if (!mobileMenuButton || !mainNavigation) {
        return;
    }

    mobileMenuButton.addEventListener("click", () => {
        const menuIsOpen = mainNavigation.classList.toggle("is-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNavigation.classList.remove("is-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });
    });
});
