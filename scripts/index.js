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
if(window.innerWidth < 480) {mouseEffect.style.display = 'none'};

document.body.onpointermove = event => {
  if(window.location.pathname === '/index.html') {
    const {clientX, clientY} = event;
    
    mouseEffect.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, {duration: 4000, fill: "forwards"})
  }
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
