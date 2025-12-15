document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-container", "components/header.html", highlightActiveLink);
    loadComponent("footer-container", "components/footer.html", highlightActiveFooterLink);
});

function loadComponent(containerId, filePath, callback) {
    const container = document.getElementById(containerId);
    if (!container) return; // specific page might not have the container

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
            // Re-initialize Webflow interactions if needed (often requires specific calls)
            // But for simple nav highlighting, callback is enough
            if (callback) callback();
        })
        .catch(error => console.error(error));
}

function highlightActiveLink() {
    let currentPath = window.location.pathname.split("/").pop();

    // Normalize root and index.html to match the 'home.html' link in the nav
    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "home.html";
    }

    const navLinks = document.querySelectorAll(".nav_links");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("w--current");
            link.setAttribute("aria-current", "page");
        }
    });

    // Also highlight the mobile/logo generic "Home" if needed, but nav_links handles the specific menu items
}

function highlightActiveFooterLink() {
    let currentPath = window.location.pathname.split("/").pop();

    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "home.html";
    }

    const footerLinks = document.querySelectorAll(".footer_link");
    footerLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("w--current");
            link.setAttribute("aria-current", "page");
        }
    });
}
