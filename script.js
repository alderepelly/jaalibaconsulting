// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  // accessibility: expose expanded state
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // close menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // close on Escape and click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!navLinks.contains(target) && target !== navToggle && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
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
    formStatus.classList.remove('success','error');

        // Identifiants EmailJS ✔ OFFICIELS
        const SERVICE_ID = "service_f7gnu9n";
        const TEMPLATE_ID = "template_83jmosw";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
            .then(() => {
        formStatus.textContent = "Message envoyé !";
        formStatus.classList.add('success');
        contactForm.reset();
        setTimeout(() => { formStatus.textContent = ''; formStatus.classList.remove('success'); }, 6000);
            })
            .catch(error => {
        formStatus.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
        formStatus.classList.add('error');
        console.error("Erreur EmailJS :", error);
        setTimeout(() => { formStatus.classList.remove('error'); }, 6000);
            });
    });
}

// Année dynamique du footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
