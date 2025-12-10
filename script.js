// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });
}

// Filtrage des services
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    serviceCards.forEach((card) => {
      const categories = (card.getAttribute("data-category") || "").split(" ");
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// -------------------------------
// FORMULAIRE DE CONTACT EmailJS
// -------------------------------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        formStatus.textContent = "Envoi en cours...";

        // Identifiants EmailJS ✔ OFFICIELS
        const SERVICE_ID = "service_f7gnu9n";
        const TEMPLATE_ID = "template_83jmosw";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
            .then(() => {
                formStatus.textContent = "Message envoyé !";
                formStatus.style.color = "green";
                contactForm.reset();
            })
            .catch(error => {
                formStatus.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
                formStatus.style.color = "red";
                console.error("Erreur EmailJS :", error);
            });
    });
}

// Année dynamique du footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
