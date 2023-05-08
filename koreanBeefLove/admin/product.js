/* 폰트 크기 조절 */
function fontclass(part) {
    var plus_cs;
    if (part == "1") {
        plus_cs = "section";
        document.getElementById("pd").className = plus_cs;
    }
    else {
        if (part == "2") {
            plus_cs = "font_view2";
            document.getElementById("pd").classList.remove("font_view3");
        }
        else if (part == "3") {
            plus_cs = "font_view3";
            document.getElementById("pd").classList.remove("font_view2");
        }
        document.getElementById("pd").className += " " + plus_cs;
    }
};