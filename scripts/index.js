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
  const {clientX, clientY} = event;
    
  mouseEffect.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, {duration: 4000, fill: "forwards"})
}