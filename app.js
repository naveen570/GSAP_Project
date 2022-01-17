let controller;
let slideScene;
let pageScene;
let fashionScene;
const mouse = document.querySelector(".cursor");
const mouseText = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const logo = document.querySelector(".logo");
function animateSlides() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  slides.forEach((slide, index, slides) => {
    const revealText = slide.querySelector(".reveal-text");
    const revealImg = slide.querySelector(".reveal-image");
    const img = slide.querySelector("img");
    const heroDesc = slide.querySelector(".hero-body");
    // gsap.fromTo(revealImg, { x: "0%" }, { x: "100%" }, 1);
    // gsap.fromTo(revealText, { x: "0%" }, { x: "100%" }, 1);
    const slideTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "Power2.ease",
      },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "=-1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "=-.65");
    // slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "=-0.8");
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   name: "slide",
      //   colorStart: "white",
      //   colorTrigger: "red",
      // })
      .addTo(controller);
    const pageTl = gsap.timeline();
    const nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    if (nextSlide && nextSlide != "end") {
      pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
      pageTl.fromTo(
        slide,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.5 }
      );
      pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    }

    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      // .addIndicators({
      //   name: "page",
      //   colorStart: "white",
      //   colorTrigger: "red",
      //   colorEnd: "white",
      //   indent: 200,
      // })
      .addTo(controller);
  });
}
function fashionSlides() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".fashion-slide");

  slides.forEach((slide, index, slides) => {
    const fashionImg = slide.querySelector(".fashion-img");
    const fashionTitle = slide.querySelector(".fashion-title");
    const fashionDesc = slide.querySelector(".fashion-text p");
    const fashionNr = slide.querySelector(".fashion-nr");
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: Back.easeInOut.config(7) },
    });
    slideTl.fromTo(
      fashionTitle,
      { y: "-25%", opacity: 0 },
      { y: "0%", opacity: 1 }
    );
    slideTl.fromTo(
      fashionDesc,
      { y: "20%", opacity: 0 },
      { y: "0%", opacity: 1 },
      "-=0.8"
    );
    slideTl.fromTo(
      fashionImg,
      { x: "30%", opacity: 0 },
      { x: "0%", opacity: 1 },
      "-=0.8"
    );
    slideTl.fromTo(
      fashionNr,
      {
        opacity: 0,
      },
      { opacity: 1 },
      "-=0.5"
    );
    fasahionScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "blue",
      //   name: "fashion-slide",
      // })
      .setTween(slideTl)
      .addTo(controller);
    const pageTl = gsap.timeline();
    const nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    if (nextSlide && nextSlide != "end") {
      pageTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
      pageTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=0.5");
    }
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "90%",
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "blue",
      //   name: "fashion-page",
      //   indent: 200,
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

//Event listeners for clicks
window.addEventListener("mousemove", addCursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggler);
function addCursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  if (
    e.target.classList.contains("logo") ||
    e.target.classList.contains("burger")
  ) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (e.target.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseText.innerText = "Tap";
    gsap.to(".title-swipe", 0.3, { y: "0%" });
  } else {
    mouse.classList.remove("explore-active");
    mouseText.innerText = "";
    gsap.to(".title-swipe", 0.3, { y: "100%" });
  }
}
function navToggler(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    document.body.classList.add("hide");
    gsap.to(".line1", 0.5, { rotate: 45, y: 5, backgroundColor: "black" });
    gsap.to(".line2", 0.5, { rotate: -45, y: -7, backgroundColor: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    gsap.to(".logo", 1, { color: "black" });
    mouse.style.border = "2px solid var(--bg-color)";
  } else {
    e.target.classList.remove("active");
    document.body.classList.remove("hide");
    gsap.to(".line1", 0.5, { rotate: 0, y: 0, backgroundColor: "white" });
    gsap.to(".line2", 0.5, { rotate: 0, y: 0, backgroundColor: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(".logo", 1, { color: "white" });
    mouse.style.border = "2px solid var(--primary-color)";
  }
}
//barba page Transitions
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        fashionSlides();
      },
      beforeLeave() {
        controller.destroy();
        pageScene.destroy();
        fashionScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "Power2.easeInOUt" } });
        // console.log(current.container, next.container);
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.65,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        window.scroll(0, 0);
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "Power2.easeInOUt" } });
        // console.log(current.container, next.container);
        tl.fromTo(
          ".swipe",
          0.65,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".nav-header", { y: "-100%" }, { y: "0%" }, "-=1");
      },
    },
  ],
});
