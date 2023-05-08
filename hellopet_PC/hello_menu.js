$(function () {
    $.ajax({
        url: "./json/hello_menu.json",
        cache: false,
        type: "GET",
        dataType: "JSON",
        success: function ($data) {
            $.fn.menu($data);
            $("#index_menu_ul > li").mouseenter(function () {
                var $nodes = $(this).index();
                $(".somenu:eq(" + $nodes + ")").stop().slideDown();

            })
            $("#index_menu_ul > li").mouseleave(function () {
                var $nodes = $(this).index();
                $(".somenu:eq(" + $nodes + ")").stop().slideUp();
            });

        },
        error: function () {
            console.log("data error")
        }
    });
    $.fn.menu = function ($data) {
        var $index_menu = "";
        $.each($data, function ($node, $datas) {
            var $index_menu = "<li link='" + $datas["cate_link"] + "'>" + "<img src='./ico/down_ico.png'>" + $datas["menus"] + "<ul class = 'somenu'>";
            $.map($data[$node]["cate"], function ($a, $b) {
                if ($a != "") {
                    $index_menu += "<li>" + $a + "</li>";

                }
            })
            $index_menu += "</ul></li>";
            $("#index_menu_ul").append($index_menu)
            if ($datas["cate"] == "") {
                $(".somenu").css({ "display": "none" })
            }
            $("#index_menu_ul > li").click(function () {
                var $z = $(this).attr("link")
                location.href = $z;
            })
        })
    }

});