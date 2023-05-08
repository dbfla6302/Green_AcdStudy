$(function () {
    var $md_timer;
    $.fn.mdpick = function () {
        $md_timer = 0;
        $md_timer = setInterval(function () {
            $.fn.md_times();
        }, 3000);

    }
    setTimeout($.fn.mdpick);

    var $md_ea = $("#mdpick_product > ul").length;
    const $node_width = $("#mdpick_product > ul>li").eq(0).width();

    $.fn.md_times = function () {
        $("#mdpick_product").stop().animate({
            "left": "-235px"
        }, function () {
            var $clone = $("#mdpick_product > ul").eq(0).clone();
            $("#mdpick_product").append($clone);
            $("#mdpick_product > ul").eq(0).remove();
            $("#mdpick_product").css("left", "0px")
        });
    }

    // 좌우버튼 클릭 시 
    $("#arrow_next").click(function () {
        clearInterval($md_timer);
        $.fn.md_times();
    });

    $("#arrow_prev").click(function () {
        clearInterval($md_timer);
        var $cp = $("#mdpick_product>ul").eq($md_ea - 1).clone();
        $("#mdpick_product>ul").eq($md_ea - 1).remove();
        $("#mdpick_product").prepend($cp);
        $("#mdpick_product").css("left", "-235px");
        $("#mdpick_product").stop().animate({
            left: "0px"
        });
    })

    $(".arrow_btn >img").bind({
        "mouseenter": function () {
            clearInterval($md_timer);
        },
        "mouseleave": function () {
            $md_timer = setTimeout($.fn.mdpick, 3000);
        }
    });

});