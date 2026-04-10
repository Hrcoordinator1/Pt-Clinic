const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const messageForm = document.querySelector("#message-form");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

if (messageForm) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#patient-name")?.value.trim() || "";
    const email = document.querySelector("#patient-email")?.value.trim() || "";
    const phone = document.querySelector("#patient-phone")?.value.trim() || "";
    const message = document.querySelector("#patient-message")?.value.trim() || "";

    const subject = encodeURIComponent(`New Patient Inquiry from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nIssue / Message:\n${message}`
    );

    window.location.href = `mailto:Info@americareptclinic.com?subject=${subject}&body=${body}`;
  });
}
