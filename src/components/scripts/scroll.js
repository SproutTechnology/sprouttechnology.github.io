export default function scrollHandler() {
    var divi = window.innerHeight * 100;
    var dist = document.documentElement.scrollTop || document.body.scrollTop;
    var final = dist / divi;

    if (final <= 0.0035) {
        document.getElementById("dd1").className = "";
        document.getElementById("dd2").className = "";
        document.getElementById("dd3").className = "";
    } else if (final > 0.0035 && final < 0.0215) {
        document.getElementById("dd1").className = "scroll-section-2";
        document.getElementById("dd2").className = "scroll-section-2";
        document.getElementById("dd3").className = "scroll-section-2";
    } else {
        document.getElementById("dd1").className = "scroll-section-3";
        document.getElementById("dd2").className = "scroll-section-3";
        document.getElementById("dd3").className = "scroll-section-3";
    }
}
