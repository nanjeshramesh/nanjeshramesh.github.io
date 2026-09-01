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

// Scroll-reveal animation (progressive enhancement: elements stay visible
// if IntersectionObserver is unavailable or motion is reduced).
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach((el) => el.classList.add("reveal-init"));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}
