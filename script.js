document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-links a[data-nav]");
const sections = Array.from(navLinks)
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === id);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      setActive(visible.target.id);
    }
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
);

sections.forEach((section) => observer.observe(section));
