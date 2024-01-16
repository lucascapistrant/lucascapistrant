window.scrollTo({
  top: 0,
});

// Collapseibles logic
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// Mouse glow effect
const mouseEffect = document.getElementById('mouse-effect');

document.body.onpointermove = event => {
  const {clientX, clientY} = event;
  
  mouseEffect.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, {duration: 4000, fill: "forwards"})
}

// Nav buttons
const navMainBtn = document.getElementById('nav-main');
const navInfoBtn = document.getElementById('nav-info');

navMainBtn.addEventListener('click', scrollToTop);
navInfoBtn.addEventListener('click', scrollToInfo);

function scrollToInfo() {
  document
    .getElementById("github")
    .scrollIntoView({behavior: "smooth"});
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Fade in at scroll
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= window.innerHeight / 2;
  }  

  function handleScroll() {
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.opacity = 1;
      }
    });
  }

  // Initial check in case elements are already in view on page load
  handleScroll();

  // Listen for scroll events
  window.addEventListener("scroll", handleScroll);
});
