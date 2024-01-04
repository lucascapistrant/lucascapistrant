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
    .getElementById("info")
    .scrollIntoView({behavior: "smooth"});
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}