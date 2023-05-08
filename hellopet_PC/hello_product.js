$(function () {
    $.fn.product = function () {
        $.ajax({
            url: "./json/hello_product.json",
            cache: false,
            type: "GET",
            dataType: "JSON",
            success: function ($pd_data) {
                $.fn.pd_js($pd_data);
            },
            error: function () {
                console.log("Data Error");
            }
        });
    }

    $.fn.pd_js = function ($pd_data) {
        let $pd_html = "";
        let $pd_html_li = "";
        // console.log($pd_data);
        $($pd_data["pet_product"]).map(function ($no, $dt) {
            $pd_html = "<li><ul class='pd_imgb' id='pd_imgb" + $no + "'>\
                        <li>\
                            <label class='pd_sale'>"+ $dt.product_dc + "</label>\
                            <img src='"+ $dt.product_img + "'>\
                        </li>\
                        <li></li>\
                        <li>\
                            "+ $dt.product_nm + "\
                        </li>\
                        <li>"+ $dt.product_sample + "</li>\
                        <li>"+ "<s>" + $dt.product_money + "</s>&nbsp;" + "<font>" + $dt.product_sales + "</font></li></ul></li>";
            $("#pd_ovbox").append($pd_html);

            if ($dt.product_dc == "") {
                $("#pd_imgb" + $no + ">li:eq(0)>label").css("display", "none");
                $pd_html_li = "<li>" + $dt.product_money + "</li>";
                $("#pd_imgb" + $no + ">li:eq(4)").html($pd_html_li);
                $("#pd_imgb" + $no + ">li:eq(4)").css({
                    "font-weight": "bold",
                    "color": "black"
                });
            }


        });
        // 상품 롤링
        let $node_ea = $("#pd_ovbox>li>ul").length;
        let $node_width = $("#pd_ovbox>li>ul").eq(0).width();
        $("#pd_left").click(function () {
            var $cp = $("#pd_ovbox>li").eq($node_ea - 1).clone();
            $("#pd_ovbox>li").eq($node_ea - 1).remove();
            $("#pd_ovbox").prepend($cp);
            $("#dtc").css("left", -($node_width + 20) + "px");
            $("#dtc").stop().animate({
                left: "0px"
            });
        });

        $("#pd_right").click(function () {
            $("#dtc").stop().animate({
                "left": -($node_width + 20) + "px"
            }, function () {
                var $clone = $("#pd_ovbox>li").eq(0).clone();
                $("#pd_ovbox").append($clone);
                $("#pd_ovbox>li").eq(0).remove();
                $("#dtc").css("left", "0px")
            });
        });

    };

    $.fn.product();

});