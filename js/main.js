document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mainNavigation = document.getElementById("mainNavigation");
    const currentYear = document.getElementById("currentYear");
    const newsletterForm = document.querySelector(".newsletter-form");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (mobileMenuButton && mainNavigation) {
        const closeMobileMenu = () => {
            mainNavigation.classList.remove("is-open");
            mobileMenuButton.classList.remove("is-active");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        };

        mobileMenuButton.addEventListener("click", () => {
            const menuIsOpen = mainNavigation.classList.toggle("is-open");

            mobileMenuButton.classList.toggle("is-active", menuIsOpen);

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );

            document.body.classList.toggle("menu-open", menuIsOpen);
        });

        mainNavigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 980) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const emailInput = newsletterForm.querySelector(
                'input[type="email"]'
            );

            const submitButton = newsletterForm.querySelector("button");

            if (!emailInput || !submitButton || !emailInput.validity.valid) {
                emailInput?.reportValidity();
                return;
            }

            const originalButtonText = submitButton.textContent;

            submitButton.textContent = "Welcome to the Society";
            submitButton.disabled = true;

            setTimeout(() => {
                newsletterForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 2500);
        });
    }
});
