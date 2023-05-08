$(function () {
    $("#t_tmenu>li:eq(0)").click(function () {
        location.href = "shop_login.html";
    });
    $(".top_menu>div:eq(1)").click(function () {
        location.href = "shop_qnalist.html";
    });
    $("#logo").click(function () {
        location.href = "index.html";
    });


});

// notice
let jsondb;
let db;
let plus = 0;
function ajax() {
    plus++;
    function wck() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    function opens() {
        if (db.readyState == XMLHttpRequest.DONE && db.status == 200) {
            const jsondata = this.response;
            jsondb(jsondata);
        }
    }
    db = wck();
    db.onreadystatechange = opens;
    db.open("GET", "./json/notice.json?v=" + plus, true);
    db.send();
}
ajax();
jsondb = function (data) {
    $(function () {
        var $data = JSON.parse(data);
        let $top_html = "", $top_html2 = "";
        $.map($data, function ($dt, $no) {
            let $top_word = $dt.notice_data;
            let $top_word2 = $dt.notice_data;
            if ($top_word.length > 25) {
                $top_word = $top_word.substr(0, 25) + "...";
            }
            if ($top_word2.length > 15) {
                $top_word2 = $top_word2.substr(0, 15) + "...";
            }
            // console.log($dt.notice_data);
            $top_html = "<li>" + $top_word + "</li>";
            $("#nt_view").append($top_html);
            $top_html2 = "<li>" + $top_word2 + "</li>";
            $("#bn_notice").append($top_html2);
        });

        // 공지사항 작동
        var $nt_timer, $t = 0;
        let $n_ea = $("#nt_view>li").length;
        var $height = $("#nt_view>li").eq(0).height();
        $.fn.notice = function () {
            $nt_timer = 0;
            $nt_timer = setInterval(function () {
                $.fn.nt_times();
            }, 5000);
        }
        setTimeout($.fn.notice);

        $.fn.nt_times = function () {
            $("#nt_view").stop().animate({
                top: -$height + "px"
            }, function () {
                var $nt_copy = $("#nt_view>li").eq(0).clone();
                $("#nt_view").append($nt_copy);
                $("#nt_view>li").eq(0).remove();
                $("#nt_view").css("top", "0px");
            });
        };

        $("#n_up").click(function () {
            clearTimeout($nt_timer);
            $.fn.nt_times();
        });

        $("#n_down").click(function () {
            clearTimeout($nt_timer);
            var $nt_copy = $("#nt_view>li").eq($n_ea - 1).clone();
            $("#nt_view").prepend($nt_copy);
            $("#nt_view>li").eq($n_ea).remove();
            $("#nt_view").css("top", -$height + "px");
            $("#nt_view").stop().animate({
                top: "0px"
            });
        });

        $("#updown>span").bind({
            "mouseenter": function () {
                clearTimeout($nt_timer);
            },
            "mouseleave": function () {
                $nt_timer = setTimeout($.fn.notice, 100);
            }
        });
    });
};