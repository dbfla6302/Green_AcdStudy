$(function () {
    let $price_check = 1;
    var $main_pic = product_info[0]["product_img"].replace("../", "./");
    $("#main_img").attr("src", $main_pic);
    $("#product_img").val($main_pic);
    $("#product_nm").text(product_info[0]["productnm"]);
    $("#goods_no").text(product_info[0]["goodsno"]);
    $("#productnm_dtc").text(product_info[0]["productnm_dtc"]);
    $("#product_money").html("<s>" + product_info[0]["product_money"].toLocaleString() + " 원" + "</s>");
    let $product_temp = product_info[0]["product_contents1"].replaceAll('height:3278px', '');
    $("#pd_dt0").html($product_temp);
    $("#goodname").val(product_info[0]["productnm"]);
    $("#goodsno").val(product_info[0]["goodsno"]);

    if (product_info[0]["product_sales"] == null || product_info[0]["product_sales"] === 0) {
        $("#sales").css("display", "none");
        $price_check = product_info[0]["product_money"];
        $("#product_money").text(product_info[0]["product_money"].toLocaleString() + " 원");
    }
    else {
        $("#product_sales").text(product_info[0]["product_sales"].toLocaleString() + " 원");
        $price_check = product_info[0]["product_sales"];
    }
    $("#total_money").text($price_check.toLocaleString());
    $("#price").val($price_check);
    $("#product_ea").text(product_info[0]["product_ea"] + " EA");
    // 옵션
    for (let op = 1; op < 4; op++) {
        if (product_info[0]["product_option" + op] != "") {
            var $op_html = "<option value='" + product_info[0]["product_option" + op] + "'>" + product_info[0]["product_option" + op] + "</option>";
            $("#product_option").append($op_html);
        }
    }
    // 옵션 없을 경우
    var $options = Number(product_info[0]["product_option1"].length) + Number(product_info[0]["product_option2"].length) + Number(product_info[0]["product_option3"].length);
    if ($options < 1) {
        $("#pd_option").css("display", "none");
    }

    $("#buy_btn").click(function () {
        if ($("#product_option").val() == "" && $options > 1) {
            alert("옵션을 선택해 주세요");
        }
        else if ($("#goods_buy").val() == "") {
            alert("구매수량을 입력해 주시길 바랍니다.");
        }
        else {
            $("#order").attr("action", "./shop_buy.html");
            $("#order").submit();
        }
    });
    $("#cart_btn").click(function () {
        if (confirm("장바구니에 상품을 담겠습니까?")) {
            alert("장바구니에 상품이 등록 되었습니다.");
        };
    });
    $("#wish_btn").click(function () {
        alert("서비스 준비중 입니다.");
    });

    // 상품상세정보 / 배송교환환불 / 상품후기 / 상품문의
    var $pm_no = 0;
    while ($pm_no < 4) {
        $("#pd_menu" + $pm_no + " > li").click(function () {
            var $tabli = $(this).index();
            var $did = $("#pd_menu" + $tabli).offset().top;
            $("html,body").animate({
                "scrollTop": $did + "px"
            }, 1000);
        });
        $pm_no++;
    }

    // 구매갯수
    $("#up_cnt").click(function () {
        $("#goods_buy").val(Number($("#goods_buy").val()) + 1);
        var $buy_ea = $("#goods_buy").val();
        $("#goodea").val($buy_ea);
        $.fn.total_price($buy_ea);
    })

    $("#down_cnt").click(function () {
        if ($("#goods_buy").val() > 1) {
            $("#goods_buy").val(Number($("#goods_buy").val()) - 1);
        }
        var $buy_ea = $("#goods_buy").val();
        $("#goodea").val($buy_ea);
        $.fn.total_price($buy_ea);
    })
    $.fn.total_price = function ($buy_ea) {
        if (product_info[0]["product_sales"] != 0) {
            $price_check = $buy_ea * product_info[0]["product_sales"];
        }
        else {
            $price_check = $buy_ea * product_info[0]["product_money"];
        }
        $("#total_money").text($price_check.toLocaleString());
        $("#price").val($price_check);
        $("#goodea").val($(this).val());
    }

});