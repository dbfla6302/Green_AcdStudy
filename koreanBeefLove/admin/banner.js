/* 폰트 크기 조절 */
function fontclass(part) {
    let cs = document.getElementById("banner").className;
    if (part == "1") {
        plus_cs = "section";
        document.getElementById("banner").className = plus_cs;
    }
    else {
        if (part == "2") {
            plus_cs = "font_view2";
            document.getElementById("banner").classList.remove("font_view3");
        }
        else if (part == "3") {
            plus_cs = "font_view3";
            document.getElementById("banner").classList.remove("font_view2");
        }
        document.getElementById("banner").className += " " + plus_cs;
    }
};

/* 대메뉴 파트 */
$(function () {

    $("#adm_menus>li").click(function () {
        var $move = $(this).attr("links");
        location.href = $move;
    });

    $("#banner_effect").click(function () {
        var $ef;
        if ($("#ef_R").is(":checked") == true) {
            $ef = $("#ef_R").val();
        }
        else if ($("#ef_F").is(":checked") == true) {
            $ef = $("#ef_F").val();
        }

        $.ajax({
            url: "banner_effect.php",
            cache: false,
            type: "GET",
            dataType: "JSON",
            data: { effect: $ef },
            contentType: "application/x-www-form-urlencoded",
            success: function (response) {
                alert("해당 효과가 적용 되었습니다.");
            },
            error: function () {
                alert("Data error!");
            }
        });
    });
});
// 배너등록 btn
function banner_input() {
    location.href = 'admin_newbanner.html';
}
// 배너수정 btn
function banner_modify() {
    alert("해당 서비스는 준비 중입니다.");
}
