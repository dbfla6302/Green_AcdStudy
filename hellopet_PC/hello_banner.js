$(function () {
    $("#bn_logo").click(function () {
        location.href = "http://dbfla6302.dothome.co.kr/hello/public_html/index.html";
    });

    $.fn.banner_print = function () {
        $.ajax({
            url: "./json/hello_banner.json",
            cache: false,
            type: "GET",
            dataType: "JSON",
            success: function ($bn_data, $ok) {
                $.fn.bn_print($bn_data);
            },
            error: function () {
                console.log("error_data")
            }
        });
    };
    $.fn.banner_print();
    $.fn.bn_print = function ($bn_data) {
        // console.log($bn_data)
        let $bn_disclis = "";
        $.map($bn_data["banners"], function ($a, $node) {
            let $key_yes = $bn_data["banners"][$node][3];
            switch ($key_yes) {
                case "yes":
                    $(".bn_" + $node).css("background-image", "url(" + $bn_data["banners"][$node][0] + ")");
                    $bn_disclis += '<li></li>';
                    break;
            }
        });
        let $bn_node = 0;
        $("#bn_disc").html($bn_disclis);
        //디스크 클릭 이동
        $("#bn_disc>li").click(function () {
            $bn_node = $(this).index();
            $("#bn_imgs>span").fadeOut(300);
            $("#bn_disc>li").css("background-color", "#ccc");
            $(".bn_" + $bn_node).fadeIn(300);
            $("#bn_disc>li").eq($bn_node).css("background-color", "black");
        });
        /*우측버튼*/
        $("#bn_r").click(function () {
            $.fn.slide_bn();
        });
        /*좌측버튼*/
        $("#bn_l").click(function () {
            $(".bn_" + $bn_node).fadeOut(300);
            $("#bn_disc>li").eq($bn_node).css("background-color", "#ccc");
            if ($bn_node > 0) { $bn_node--; }
            else if ($bn_node == 0) { $bn_node = $bn_length - 1 }
            $(".bn_" + $bn_node).fadeIn(300);
            $("#bn_disc>li").eq($bn_node).css("background-color", "black");
        });
        /*배너 오른쪽 움직이기*/
        let $bn_length = $("#bn_imgs>span").length;
        $.fn.slide_bn = function () {
            $(".bn_" + $bn_node).fadeOut(300);
            $("#bn_disc>li").eq($bn_node).css("background-color", "#ccc");
            if ($bn_node < $bn_length - 1) { $bn_node++; }
            else if ($bn_node == $bn_length - 1) { $bn_node = 0 }
            $(".bn_" + $bn_node).fadeIn(300);
            $("#bn_disc>li").eq($bn_node).css("background-color", "black");
        };
        /*8초마다 흐르기*/
        $.fn.bn_timerset = function () {
            setTimeout(function () {
                $.fn.slide_bn();
            }, 8000);
            setTimeout($.fn.bn_timerset, 8000);
        };
        $.fn.bn_timerset();
    };
    /*10초마다 흐르기*/
    let $bn_logo = 0;
    $.fn.bn_logo_timerset = function () {
        setTimeout(function () {
            if ($bn_logo == 0) {
                $(".bn_logo>img").attr("src", "./logo/eu_logo.png");
                $bn_logo++;
            }
            else if ($bn_logo == 1) {
                $(".bn_logo>img").attr("src", "./logo/ko_logo.png");
                $bn_logo--;
            }

        }, 10000);
        setTimeout($.fn.bn_logo_timerset, 10000);
    };
    $.fn.bn_logo_timerset();
});