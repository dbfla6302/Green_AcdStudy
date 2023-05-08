let a = new Vue({
    el: "#pd_weekly",
    data: {
        pd_list: [],
    },
    methods: {
        ccc(ajax) {
            //console.log(ajax);
            var a;
            for (a in ajax) {
                if (ajax[a]["sale_money"] == 0) {
                    ajax[a]["sale_money"] = ajax[a]["product_money"];
                    ajax[a]["product_money"] = "";

                    this.pd_list.push({
                        product_img: ajax[a]["product_img"],
                        product_nms: ajax[a]["product_nm"],
                        product_sample: ajax[a]["product_sample"],
                        product_money: "",
                        sale_money: ajax[a]["sale_money"],
                    });
                }
                else {
                    this.pd_list.push({
                        product_img: ajax[a]["product_img"],
                        product_nms: ajax[a]["product_nm"],
                        product_sample: ajax[a]["product_sample"],
                        product_money: ajax[a]["product_money"] + "원",
                        sale_money: ajax[a]["sale_money"],
                    });
                }
            }
        }
    },
    components: {

    },
    computed: {
        aaa() {
            fetch("./json/week_product.json").then(function (response) {
                return response.json();
            }).then(function (data) {
                a.ccc(data["week"]);

            });
        },
    }
});

$(function () {
    $.ajax({
        url: "./json/best_product.json",     // best_product ajax
        cache: false,
        type: "GET",
        dataType: "JSON",

        success: function ($data) {
            var $html = "";
            $.map($data.best_product, function ($a, $b) {
                $("#pd_bestitem_list_view").append("<li><img src=" + $a.product_img + "></li>");
            });
            var $timer;
            $.fn.auto = function () {
                $timer = 0;
                $timer = setInterval(function () {
                    $.fn.times();
                }, 5000);

            }
            setTimeout($.fn.auto);


            var $pd_best_ea = $("#pd_bestitem_list_view > li").length;
            var $pd_best_width = $("#pd_bestitem_list_view > li").eq(0).width();
            const $node_width = $("#pd_bestitem_list_view > li").eq(0).width();
            $.fn.times = function () {
                $("#pd_bestitem_list_view").stop().animate({
                    "left": -($node_width + 12) + "px"
                }, function () {
                    var $clone = $("#pd_bestitem_list_view > li").eq(0).clone();
                    $("#pd_bestitem_list_view").append($clone);
                    $("#pd_bestitem_list_view > li").eq(0).remove();
                    $("#pd_bestitem_list_view").css("left", "0px")
                });
            }


            $("#pd_bestitem_btn >li").mouseenter(function () {
                clearInterval($timer);
            });

            $("#pd_bestitem_btn > li").eq(1).click(function () {
                clearInterval($timer);
                $.fn.times();
            });


            $("#pd_bestitem_btn > li").eq(0).click(function () {
                clearInterval($timer);
                var $cp = $("#pd_bestitem_list_view>li").eq($pd_best_ea - 1).clone();
                $("#pd_bestitem_list_view>li").eq($pd_best_ea - 1).remove();
                $("#pd_bestitem_list_view").prepend($cp);
                $("#pd_bestitem_list_view").css("left", -($node_width + 12) + "px");
                $("#pd_bestitem_list_view").stop().animate({
                    left: "0px"
                });
            })

            $("#pd_bestitem_btn >li").mouseleave(function () {
                $timer = setTimeout($.fn.auto, 5000);
            });

        },
        error: function () {
            console.log("data error")
        }


    })

    // 인스타그램 배너
    var $int_no = 0, $int_timer;
    var $int_width = $("#pd_instagram_view>li").width();
    var $int_node = $("#pd_instagram_view>li").length;
    $.fn.int_times = function () {
        $("#pd_instagram_view").stop().animate({
            "left": -$int_width + "px"
        }, function () {
            var $clone = $("#pd_instagram_view>li").eq(0).clone();
            $("#pd_instagram_view").append($clone);
            $("#pd_instagram_view>li").eq(0).remove();
            $("#pd_instagram_view").css("left", "0px")
        });
        $int_timer = setTimeout($.fn.int_times, 8000);
    }
    $int_timer = setTimeout($.fn.int_times, 8000);

});