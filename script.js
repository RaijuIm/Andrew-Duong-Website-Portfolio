/* SECTION THEME DETECTION */
const sections = Array.from(document.querySelectorAll('section'));
const darkSections = new Set(['Quote', 'Projects']);
const lightSections = new Set(['Intro', 'AboutMe', 'Technologies', 'ContactMe']);
let ticking = false;

function updateTheme() {
  ticking = false;
  const vh = window.innerHeight;
  let maxVisible = 0;
  let mostVisible = null;

  sections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    if (visible > maxVisible) {
      maxVisible = visible;
      mostVisible = sec;
    }
  });

  if (!mostVisible) return;

  const id = mostVisible.id;
  if (darkSections.has(id)) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else if (lightSections.has(id)) {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
}

function onScrollOrResize() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateTheme);
  }
}

/*PAGE SCALING (FOR DESIGN SIZE)*/
function scalePage() {
  if (window.innerWidth < 768) return;
  const designW = 1440;
  const designH = 1024;
  const scale = Math.min(window.innerWidth / designW, window.innerHeight / designH);

  const wrapper = document.getElementById("page-wrapper");
  if (wrapper) {
    wrapper.style.transformOrigin = "top center";
    wrapper.style.transform = `translateX(-50%) scale(${scale})`;
  }
}

/*BACK TO TOP BUTTON*/
const backToTop = document.querySelector(".back-to-top");
const contact = document.getElementById("ContactMe");

function toggleBackToTop() {
  const rect = contact.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

backToTop.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*RESPONSIVE HAMBURGER MENU*/
const nav = document.querySelector('nav');
let menuToggle = document.querySelector('.menu-toggle');

function createHamburger() {
  if (!menuToggle && window.innerWidth <= 768) {
    menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '&#9776;';
    document.querySelector('header').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });
  }
}

function removeHamburger() {
  if (menuToggle && window.innerWidth > 768) {
    menuToggle.remove();
    menuToggle = null;
    nav.classList.remove('nav-open');
  }
}

/*EVENT LISTENERS*/
// Theme updates
window.addEventListener("scroll", onScrollOrResize, { passive: true });
window.addEventListener("resize", onScrollOrResize);
window.addEventListener("load", updateTheme);

// Page scaling
window.addEventListener("resize", scalePage);
window.addEventListener("load", scalePage);

// Back to top visibility
window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("resize", toggleBackToTop);
window.addEventListener("load", toggleBackToTop);

// Hamburger menu
window.addEventListener("load", () => { 
  createHamburger(); 
  removeHamburger(); 
});
window.addEventListener("resize", () => { 
  createHamburger(); 
  removeHamburger(); 
});
