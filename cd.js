const tl = gsap.timeline();

tl.to("body", {
  background: "#383839"
})
  .to(".card", {
    duration: 0.8,
    scale: 1,
    ease: "back.out(1.4)"
  })
  .to(
    "body",
    {
      background: "#383838"
    },
    "-=0.2"
  )
  .to(".img", {
    duration: 0.5,
    scaleY: 1,
    ease: "power3.out"
  })
  .to(
    "svg",
    {
      duration: 1,
      opacity: 1
    },
    "-=0.2"
  )
  .from(
    ".line",
    {
      duration: 0.8,
      width: 0,
      ease: "elastic.out(1, 0.75)",
      stagger: 0.3
    },
    "-=0.8"
  );

document.querySelector(".restart").addEventListener("click", () => {
  tl.reversed() ? tl.play() : tl.reverse();
});
