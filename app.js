function scrollToSection(targetSectionId) {
    const targetElement = document.getElementById(targetSectionId);
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
    const navigationBarHeight = document.querySelector(".navbar").offsetHeight;
    const duration = 1000; // You can adjust the duration as needed
    const startTime = performance.now();
    const startScrollY = window.scrollY;

    function scroll(time) {
        const currentTime = time - startTime;
        const progress = Math.min(currentTime / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const newY = startScrollY + (targetOffset - startScrollY - navigationBarHeight) * easedProgress;

        window.scrollTo(0, newY);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    requestAnimationFrame(scroll);
}

// Add event listeners to the navigation links
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetSectionId = link.getAttribute("href").substring(1); // Remove the "#" character
            scrollToSection(targetSectionId);
        });
    });
});