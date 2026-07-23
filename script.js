window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar-custom");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});
