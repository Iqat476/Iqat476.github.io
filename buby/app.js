document.addEventListener("DOMContentLoaded", (event) => {

    gsap.registerPlugin(MotionPathPlugin, TextPlugin);
    const heart = document.getElementById("heart");
    const flower1 = document.getElementById('flower1');
    const flower2 = document.getElementById('flower2');

    let tl = gsap.timeline();
    let clicked = false;

    heart.addEventListener("mouseenter", () => {
        if (clicked) return;
        gsap.to("#heart", { duration: 1, width: "35vw", ease: "elastic.out(1,0.3)", });
        gsap.to("#heart > path", { duration: 0.3, fill: "#ff69b4" });
    });

    heart.addEventListener("mouseleave", () => {
        if (clicked) return;
        gsap.to("#heart", { duration: 0.4, width: "25vw", ease: "back.out(1.7)", opacity: 1 });
        gsap.to("#heart > path", { duration: 0.8, fill: "#AA8ED6" });
    })

    heart.addEventListener("mousedown", async () => {
        if (clicked) return;
        clicked = true;
        tl.to("#heart > path", { duration: 0.6, fill: "#B95CF4" });
        tl.to("div:has(#heart)", { duration: 0.4, ease: "circ.out", backgroundColor: "#B95CF4" });
        document.body.classList.add("orbs");
        document.head.classList.add("orbs");
        await tl.to("div:has(#heart)", { duration: 1, opacity: 0 });
        heart.parentElement.remove();
        flower1.classList.remove("invisible"); flower2.classList.remove("invisible");
        gsap.to("#flower1", { duration: 1, rotation: 360, repeat: -1, transformOrigin: "50% 45%", ease: "none" });
        gsap.to("#flower2", { duration: 1, rotation: 360, repeat: -1, transformOrigin: "50% 45%", ease: "none" });
        gsap.from("#flower-container", { delay: 1, duration: 1, y: `-${flower1.getBoundingClientRect().top + 300}px`, ease: "elastic.out(1,0.75)" });
        tl.to("#header", { delay: 1.2, duration: 0.5, text: { value: "", rtl: true }, ease: "none" });
        tl.to("#header", { delay: 0.2, duration: 0.5, text: { value: "HOW RU" }, ease: "none" });
        tl.to("#header", { delay: 1.5, duration: 0.4, text: { value: "", rtl: true }, ease: "none" });
        tl.to("#header", { delay: 0.2, duration: 0.5, text: { value: "IM GOOOD" }, ease: "none" });
        tl.to("#header", { delay: 0.2, duration: 0.3, text: { value: "", rtl: true }, ease: "none" });
        tl.to("#header", { delay: 0.5, duration: 0.6, text: { value: "TOOOOOOOOOOO" }, ease: "none" });
        await tl.to("#header", { delay: 0.5, duration: 0.4, text: { value: "", rtl: true }, ease: "none" });
        await gsap.to("#flower-container", { delay: 1, duration: 1.5, y: `-${flower1.getBoundingClientRect().top + 300}px`, ease: "elastic.in(1,0.75)" });
        document.getElementById("flower-container").remove();
        gsap.set("thank", { fontSize: "8vh" });
        await tl.to("#thank", { delay: 0.4, duration: 1, fontSize: "20vh", ease: "elastic.out(1,0.9)" });
        tl.to("#for", { duration: 1, opacity: 1 });
        tl.to("#for", { delay: 0.3, duration: 1, text: { value: "for being my bestie" }, ease: "none" });
        tl.to("#for", { delay: 0.4, duration: 1, text: { value: "for being my ", rtl: true }, ease: "none" });
        tl.to("#for", { delay: 0.3, duration: 1, text: { value: "for being my wifey" }, ease: "none" });
        tl.to("#for", { delay: 0.3, duration: 1.5, text: { value: "for ", rtl: true }, ease: "none" });
        tl.to("#for", { delay: 0.15, duration: 1.3, text: { value: "for making me happy" }, ease: "none" });
        tl.to("#thankDiv", { delay: 2, duration: 1, opacity: 0 });
    });


});
