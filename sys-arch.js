document.addEventListener("DOMContentLoaded", () => {
    const sysArchBtn = document.getElementById("sysArchBtn");
    const sysArchOverlay = document.getElementById("sysArchOverlay");
    const archPath = document.querySelector(".arch-path");
    const archContent = document.querySelector(".sys-arch-content");

    if (!sysArchBtn || !sysArchOverlay || !archPath) return;

    // The GSAP animation logic
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
    const initial = "M 0 100 V 100 Q 50 100 100 100 V 100 z";

    let tl = gsap.timeline({ paused: true });

    // Animate the path using attr (MorphSVG is premium, this achieves the same for matching path structures)
    tl.to(archPath, { attr: { d: start }, ease: "power2.in", duration: 0.4 })
      .to(archPath, { attr: { d: end }, ease: "power2.out", duration: 0.4 });

    sysArchBtn.addEventListener("click", () => {
        // Show overlay and play animation
        sysArchOverlay.classList.add("active");
        tl.play(0); // Play from the start
    });

    // Clicking anywhere on the flow text dismisses the overlay
    archContent.addEventListener("click", () => {
        sysArchOverlay.classList.remove("active");
        tl.reverse();
    });
});

