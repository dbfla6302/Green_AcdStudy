$(function () {
    let $effect = eff;
    //F : fade , R : rolling

    $.ajax({
        url: "./admin/admin_banner.json?v=" + nos,
        cache: false,
        type: "GET",
        dataType: "JSON",
        success: function ($data) {
            if ($effect == "F") {
                $(".effect1").css("display", "block");
                $.fn.effect1($data);
            }
            else {
                $(".effect2").css("display", "block");
                $.fn.effect2($data);
            }
        },
        error: function () {
            console.log("Data error!");
        }
    });

    /******* FadeIn *******/
    var $bn_li, $bn_disc;
    $.fn.effect1 = function ($data) {
        $.map($data, function ($dt, $no) {
            $bn_li = "<li title='" + $dt.bname + "'><img src='" + $dt.bimg + "'></li>";
            $bn_disc = "<li></li> ";
            $("#banner_ul").append($bn_li);
            $("#banner_disc").append($bn_disc);
        });
        //effect1 fade 
        var $bn_timer;
        let $no = 0;
        let $bn_ea = ($("#banner_ul>li").length) - 1;
        $.fn.times = function () {
            $bn_timer = 0;
            $bn_timer = setInterval(function () {
                $.fn.bn_btntimer();
            }, 8000);
        }
        $bn_timer = setTimeout($.fn.times, 100);

        /* 타이머작동 */
        $.fn.bn_btntimer = function () {
            $("#banner_ul>li").stop().fadeOut();
            $("#banner_disc>li").css("background-color", "rgba(0,0,0,0.7)");
            if ($no < $bn_ea) { $no++; }
            else if ($no == $bn_ea) { $no = 0; }
            $("#banner_ul>li").eq($no).stop().fadeIn();
            $("#banner_disc>li").eq($no).css("background-color", "crimson");
        }

        //left 버튼
        $("#banner_left").click(function () {
            if ($no > 0) { $no--; }
            else if ($no == 0) { $no = $bn_ea; }
            $("#banner_ul>li").stop().fadeOut();
            $("#banner_disc>li").css("background-color", "rgba(0,0,0,0.7)");
            $("#banner_ul>li").eq($no).stop().fadeIn();
            $("#banner_disc>li").eq($no).css("background-color", "crimson");
        });

        //right 버튼
        $("#banner_right").click(function () {
            $.fn.bn_btntimer();
        });

        //disc 작동
        $("#banner_disc>li").click(function () {
            $no = $(this).index();
            $("#banner_ul>li").stop().fadeOut();
            $("#banner_disc>li").css("background-color", "rgba(0,0,0,0.7)");
            $("#banner_ul>li").eq($no).stop().fadeIn();
            $("#banner_disc>li").eq($no).css("background-color", "crimson");
        });

        /* clearInterval */
        //disc
        $("#banner_disc>li").bind({
            "mouseenter": function () {
                clearInterval($bn_timer);
            },
            "mouseleave": function () {
                $bn_timer = setTimeout($.fn.times, 100);
            }
        });

        //banner
        $("#banner_ul").bind({
            "mouseenter": function () {
                clearInterval($bn_timer);
            },
            "mouseleave": function () {
                $bn_timer = setTimeout($.fn.times, 100);
            }
        });

        // button
        $("#banner_left").bind({
            "mouseenter": function () {
                clearInterval($bn_timer);
            },
            "mouseleave": function () {
                $bn_timer = setTimeout($.fn.times, 100);
            }
        });
        $("#banner_right").bind({
            "mouseenter": function () {
                clearInterval($bn_timer);
            },
            "mouseleave": function () {
                $bn_timer = setTimeout($.fn.times, 100);
            }
        });
    }

    /******* Rolling *******/
    let $timer;
    let $n = 0;
    var $wait = 0;
    $.fn.effect2 = function ($data) {
        $.map($data, function ($dt, $no) {
            $bn_li = "<li title='" + $dt.bname + "'><img src='" + $dt.bimg + "'></li>";
            $bn_disc = "<li></li> ";
            $("#rolling_ul").append($bn_li);
            $("#rolling_disc").append($bn_disc);
        });

        let $counts = 1;
        let $banner_ea = $("#rolling_ul > li").length;

        $.fn.stimer = function () {
            if ($wait == 0) {
                if ($counts < $banner_ea) {
                    let $bh = 534 * $counts;
                    $("#rolling_ul").stop().animate({
                        "top": -$bh + "px"
                    }, 1000);

                    $("#rolling_disc > li").css("background-color", "rgba(0,0,0,0.7)");
                    $("#rolling_disc > li").eq($counts).css("background-color", "red");
                }
                else {
                    $counts = 0;
                    $("#rolling_ul").stop().animate({
                        "top": "0px"
                    }, 1000);
                    $("#rolling_disc > li").css("background-color", "rgba(0,0,0,0.7)");
                    $("#rolling_disc > li").eq($counts).css("background-color", "red");
                }
                $counts++;
                $timer = setTimeout($.fn.stimer, 8000);
            }
        }
        $timer = setTimeout($.fn.stimer, 8000);

        // disc click
        $("#rolling_disc>li").click(function () {
            var $rd = $(this).index();
            console.log($rd);
            $("#rolling_ul").stop().animate({ "top": -534 * $rd + "px" }, 1000);
            $("#rolling_disc>li").css("background-color", "rgba(0,0,0,0.7)");
            $("#rolling_disc>li").eq($rd).css("background-color", "red");
        });

        $("#rolling_banner").bind({
            "mouseenter": function () {
                $wait = 1;
                clearTimeout($timer);
            },
            "mouseleave": function () {
                $wait = 0;
                $timer = setTimeout($.fn.stimer, 8000);
            }
        });
    }


});