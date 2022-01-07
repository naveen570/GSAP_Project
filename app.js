function animateSlides() {
  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  slides.forEach((slide) => {
    const revealText = slide.querySelector(".reveal-text");
    const revealImg = slide.querySelector(".reveal-image");
    const img = slide.querySelector("img");
    const heroDesc = slide.querySelector(".hero-body");
    // gsap.fromTo(revealImg, { x: "0%" }, { x: "100%" }, 1);
    // gsap.fromTo(revealText, { x: "0%" }, { x: "100%" }, 1);
    const slideTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: Power4.ease,
      },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "=-1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "=-.65");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "=-0.8");
  });
}
animateSlides();
