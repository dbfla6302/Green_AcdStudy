$(function () {
    $.get("./admin/admin_product.json?v=" + nos, function ($wdata) { })
        .done(function ($wdata) {
            // console.log($wdata);
            let $week_ul = "";
            $.map($wdata, function ($wdt, $wno) {
                // console.log($wdt);
                // 이미지 경로
                if ($wdata[$wno]["product_img"]) {
                    $wdata[$wno]["product_img"] = $wdata[$wno]["product_img"].replace('../', './');
                }

                // 금액
                if ($wdata[$wno]["product_sales"] == 0) {
                    $wdata[$wno]["product_sales"] = $wdata[$wno]["product_money"].toLocaleString() + " 원";
                    $wdata[$wno]["product_money"] = "";
                }
                else {
                    $wdata[$wno]["product_money"] = $wdata[$wno]["product_money"].toLocaleString() + " 원";
                    $wdata[$wno]["product_sales"] = $wdata[$wno]["product_sales"].toLocaleString() + " 원";
                }

                $week_ul = "<ul class='wproduct' pidx='" + $wdt.pidx + "' goodsno='" + $wdt.goodsno + "'>\
                <li id='product_img"+ $wno + "'><span><img src=" + $wdt.product_img + "></span>\
                <label><span><img src='./ico/icon_heart.png'>찜하기</span>\
                <span><img src='./ico/icon_cart.png'>장바구니</span>\</label></li>\
                <li><span>"+ $wdt.productnm + "</span>\
                <span>"+ $wdt.productnm_dtc + "</span>\
                <span><s>"+ $wdt.product_money + "</s></span>\
                <span>"+ $wdt.product_sales + "</span></li></ul>";
                $("#wproduct_view").append($week_ul);
                $("#wproduct_view>ul").click(function () {
                    var $th = $(this).index();
                    var $pidx = $("#wproduct_view>ul").eq($th).attr("pidx");
                    var $goodsno = $("#wproduct_view>ul").eq($th).attr("goodsno");
                    location.href = "./shop_product.html?pidx=" + $pidx + "&goodsno=" + $goodsno;
                    console.log($pidx, $goodsno);
                });
            });


        })
        .fail(function (notice_data) { console.log("json_error"); });
})