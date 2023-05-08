$(function () {
    //Jquery ajax
    $.get("./admin/admin_notice.json?v=" + nos, function (notice_data) {
    })
        .done(function (notice_data) {    //파일로드
            $.map(notice_data, function (dt, no) {
                let $word = dt.subject;
                if ($word.length > 20) {
                    $word = $word.substr(0, 20) + "...";
                }
                $("#top_notice").append("<li title=" + dt.subject + ">" + $word + "</li>");

                // 공지사항 작동
                var $nt_timer, $t = 0;
                let $n_ea = $("#top_notice>li").length;
                let $height = $("#top_notice>li").eq(0).height();
                $.fn.notice = function () {
                    $nt_timer = 0;
                    $nt_timer = setInterval(function () {
                        $.fn.nt_times();
                    }, 3500);
                }
                setTimeout($.fn.notice);

                $.fn.nt_times = function () {
                    $("#top_notice").stop().animate({
                        top: -$height + "px"
                    }, function () {
                        var $nt_copy = $("#top_notice>li").eq(0).clone();
                        $("#top_notice>li").eq(0).remove();
                        $("#top_notice").append($nt_copy);
                        $("#top_notice").css("top", "0px");
                    });
                };

                $("#n_up").click(function () {
                    clearTimeout($nt_timer);
                    $.fn.nt_times();
                });
                $("#n_down").click(function () {
                    clearTimeout($nt_timer);
                    var $nt_copy = $("#top_notice>li").eq($n_ea - 1).clone();
                    $("#top_notice>li").eq($n_ea - 1).remove();
                    $("#top_notice").prepend($nt_copy);
                    $("#top_notice").css("top", -$height + "px");
                    $("#top_notice").stop().animate({
                        top: "0px"
                    });

                });

                $("#nbtn>img").bind({
                    "mouseenter": function () {
                        clearTimeout($nt_timer);
                    },
                    "mouseleave": function () {
                        $nt_timer = setTimeout($.fn.notice, 100);
                    }
                });
            });
        })
        .fail(function (notice_data) {    //파일로드 실패
            console.log("json_error");
        });
});