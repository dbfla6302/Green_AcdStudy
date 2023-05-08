$(function () {
    var $evp_width = $("#epd_banner>li>img").width();
    var $evp_node = $("#epd_banner>li>img").length;
    let $evp_no = 0;
    $.fn.evp_times = function () {
        $("#epd_banner").stop().animate({
            "left": -($evp_width * $evp_no) + "px"
        }, 1000);
        $evp_no = $evp_no + 1;
        if ($evp_no >= $evp_node) {
            $evp_no = 0;
        }
        $evp_timer = setTimeout($.fn.evp_times, 8000);
    }
    $evp_timer = setTimeout($.fn.evp_times, 8000);

    $("#event_best").click(function () {
        window.open("https://www.youtube.com/watch?v=FEBmjBCZ9AU", "_blank");
    });
});