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
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".site-footer");
    if (!footer || footer.querySelector("[data-tpj-contact]")) return;

    const contact = document.createElement("div");
    contact.className = "footer-contact";
    contact.dataset.tpjContact = "";
    contact.innerHTML = `
        <a href="mailto:baked@thepastryjunkie.com">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
            </svg>
            <span>baked@thepastryjunkie.com</span>
        </a>
        <a href="tel:+16823738842">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a12 12 0 0 1-6-6l2-2-2-5Z"/>
            </svg>
            <span>(682) 373-8842</span>
        </a>`;

    const bottom = footer.querySelector(".footer-bottom");
    if (bottom) bottom.before(contact);
    else footer.append(contact);
});
