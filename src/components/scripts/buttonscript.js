const ButtonAnimation = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 15 + "px";
            circle.style.top = y - 15 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.2;
            y += (nextCircle.y - y) * 0.2;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

    Array.from(document.getElementsByClassName("button_su_inner")).forEach((e) =>
        e.addEventListener("mouseenter", function (ev) {
            var relX = ev.offsetX;
            var relY = ev.offsetY;

            const circle = ev.target.offsetParent.firstChild;

            circle.style.left = relX + "px";
            circle.style.top = relY + "px";

            circle.classList.remove("desplode-circle");
            circle.classList.add("explode-circle");
        }),
    );

    Array.from(document.getElementsByClassName("button_su_inner")).forEach((e) =>
        e.addEventListener("mouseleave", function (ev) {
            var relX = ev.offsetX;
            var relY = ev.offsetY;

            const circle = ev.target.offsetParent.firstChild;

            circle.style.left = relX + "px";
            circle.style.top = relY + "px";

            circle.classList.remove("explode-circle");
            circle.classList.add("desplode-circle");
        }),
    );
};

export default ButtonAnimation;
