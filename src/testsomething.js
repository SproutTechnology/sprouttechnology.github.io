window.addEventListener("load", (event) => {
    let currentX = 0;
    let currentY = 0;
    let animationSpeed = 8;
    let count = 0;
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;
    let hovered = false;
    let pulsed = false;
    let activeButton = 0;
    let loaded = false;

    let x = 0;
    let y = 0;
    let dot = window.document.getElementById("dot");
    let path = dot.getElementsByTagName("path");

    window.addEventListener("mousemove", (e) => {
        loaded = true;
        // console.log(e, "e");
        console.log(e, "e mousemove");

        if (!hovered) {
            x = e.pageX;
            y = e.pageY;
        }
    });

    window.addEventListener("scroll", (e) => {
        // loaded = true;
        console.log(e, "e scroll");
        // if (!hovered) {
        //     x = e.pageX;
        //     y = e.pageY;
        // }
    });

    function move() {
        count++;

        if (!loaded) {
            console.log("!loaded");
            x = windowW / 2 + Math.sin(count / 20) * (windowW / 4);
            y = windowH / 2;
        }

        var boxCenter = [dot.offsetLeft + dot.offsetWidth / 2, dot.offsetTop + dot.offsetHeight / 2];

        var angle = Math.atan2(x - boxCenter[0], -(y - boxCenter[1])) * (180 / Math.PI);
        var speedX = Math.abs(x - currentX),
            speedY = Math.abs(y - currentY),
            speed = Math.sqrt(speedX * speedX + speedY * speedY) * -1;

        if (speed > -1) {
            speed = 0;
        }

        var scale = speed / 500 + 1;
        var tailPos = speed / 10 + 50;

        if (tailPos < 0) {
            tailPos = 0;
        } else if (tailPos > 40) {
            tailPos = 50;
        }

        if (scale < 0.2) {
            scale = 0.2;
        }

        currentX += (x - currentX) / animationSpeed;
        currentY += (y - currentY) / animationSpeed;

        if (hovered) {
            angle = 0;
            scale = 1;
            tailPos = 50;

            if (Math.abs(x - currentX) < 10 && Math.abs(y - currentY) < 10) {
                if (!pulsed) {
                    activeButton.addClass("pulse");
                    pulsed = true;
                }
            }
        }

        // dot.css({
        //     transform: "translate(" + (currentX - 0) + "px, " + (currentY - 0) + "px) rotate(" + angle + "deg) scaleX(" + scale + ")",
        // });
        dot.setAttribute(
            "style",
            `
            transform: translate(${currentX - 0}px, ${currentY - 0}px) rotate(${angle}deg) scaleX(${scale});
        `,
        );
        //translate(567px, 323px) rotate(135deg) scaleX(1)
        // // dot.style.transform = `translate(calc(${currentX}px + ${currentY}px) rotate(${angle}deg) scaleX(${scale})) !important`;
        // dot.setAttribute("style", `transform: translate(calc(${currentX}px + ${currentY}px) rotate(${angle}deg) scaleX(${scale})) !important`);
        // console.log(dot.style.transform, `translate(${currentX}px + ${currentY}px rotate(${angle}deg) scaleX(${scale}))`);

        path[0].setAttribute(
            "d",
            `M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813  ${tailPos},75 C50,88.8071187 61.1928813,100 75,100 Z`,
        );

        // path.attr({
        //     d:
        //         "M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813  " +
        //         tailPos +
        //         ",75 C50,88.8071187 61.1928813,100 75,100 Z",
        // });

        window.requestAnimationFrame(move);
    }

    window.requestAnimationFrame(move);

    // $(".button").on("mouseenter", function () {
    //     hovered = true;
    //     pulsed = false;
    //     activeButton = $(this);
    //     x = $(this).offset().left + $(this).width() / 2;
    //     y = $(this).offset().top + $(this).height() / 2;

    //     dot.addClass("button-hover");

    //     $(this).on("mouseleave", function () {
    //         hovered = false;
    //         dot.removeClass("button-hover");
    //         $(this).removeClass("pulse");
    //     });
    // });
});
