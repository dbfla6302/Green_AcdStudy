$(function () {

    $(window).scroll(function () {
        var $sct = $(this).scrollTop();
        $("#floorbanner>span").stop().animate({
            "top": $sct + 200 + "px"
        }, 800);
    });

    //  플로팅배너
    $("#floor_top").click(function () {
        var $sct = $("#floor_top").offset().top;
        $("html,body").stop().animate({
            "scrollTop": -$sct + "px"
        }, 1500);
    });
    $("#floor_bottom").click(function () {
        $("html,body").stop().animate({
            "scrollTop": "2509px"
        }, 1500);
    });
});