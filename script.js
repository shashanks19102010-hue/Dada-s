const menuButton = document.getElementById("menuButton");
const drawer = document.getElementById("mobileDrawer");
const closeDrawer = document.getElementById("closeDrawer");
const year = document.getElementById("year");

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("no-scroll", open);
}

menuButton?.addEventListener("click", () => setDrawer(true));
closeDrawer?.addEventListener("click", () => setDrawer(false));
drawer?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setDrawer(false)));

const header = document.querySelector(".site-header");
const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".food-card")];

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});