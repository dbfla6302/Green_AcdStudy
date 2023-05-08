$(function () {
    let $imgsrc = $("#product_img").val();
    $("#order_img").attr("src", $imgsrc);
    $("#order_pnm").text($("#goodname").val()); //상품명
    $("#order_op").text($("#product_option").val());    //옵션정보
    $("#order_ea").text($("#goodea").val() + " EA");  //상품수량
    $("#order_money").append(Number($("#price").val()).toLocaleString() + "원");  //상품금액
    $("#order_total").append(Number($("#price").val()).toLocaleString() + "원");  //합계금액
    $("#order_total2").append(Number($("#price").val()).toLocaleString() + "원"); //총상품금액
    //계산 (배송비 계산)
    let $total_momey = Number($("#price").val()) + 2500;
    $("#order_total3").append($total_momey.toLocaleString() + "원");
    $("#price").val($total_momey);  //hidden값에 계산된 최종값을 다시 이관함
    $("#order_total4").text($total_momey.toLocaleString() + "원");  //최종 결제 금액 확인
    //우편번호검색
    $("#addsearch").postcodifyPopUp();
});
function pay(p) {
    if (p == 0) {
        document.getElementById("bank").style.display = "block";
    }
    else {
        document.getElementById("bank").style.display = "none";

    }
}

function del_ck(delivery_ck) {
    var $b_name = $("#buy_name").val();
    var $b_ap = $("#order_post").val(); //우편번호
    var $b_addr1 = $("#order_addr1").val();
    var $b_addr2 = $("#oeder_addr2").val();
    var $b_tel = $("#buy_tel").val();
    var $b_hp = $("#buy_hp").val();

    if (delivery_ck == 4) { //주문자와 동일
        $("#receiver_name").val($b_name);
        $("#receiver_name").attr("readonly", true);
        $("#receiver_post").val($b_ap);
        $("#receiver_addr").val($b_addr1);
        $("#receiver_addr2").val($b_addr2);
        $("#receiver_addr2").attr("readonly", true);
        $("#receiver_tel").val($b_tel);
        $("#receiver_tel").attr("readonly", true);
        $("#receiver_hp").val($b_hp);
        $("#receiver_hp").attr("readonly", true);
        $("#addsearch").unbind("click");
    }
    else {
        $("#receiver_name").val("");
        $("#receiver_name").attr("readonly", false);
        $("#receiver_post").val("");
        $("#receiver_addr").val("");
        $("#receiver_addr2").val("");
        $("#receiver_addr2").attr("readonly", false);
        $("#receiver_tel").val("");
        $("#receiver_tel").attr("readonly", false);
        $("#receiver_hp").val("");
        $("#receiver_hp").attr("readonly", false);
        $("#addsearch").postcodifyPopUp();
    }

}

function pay_btn() {
    orders.buyeremail.value = document.getElementById("buyeremail").value + document.getElementById("buy_emsel").value;
    if (orders.buyername.value == "") {
        alert("주문자의 이름을 입력해 주세요.");
        orders.buyername.focus();
    }
    else if (orders.order_post.value == "" || orders.order_addr1.value == "" || orders.oeder_addr2.value == "") {
        alert("주문자의 주소를 입력해 주세요.");
    }
    else if (orders.buyertel.value == "") {
        alert("주문자의 핸드폰 번호를 입력해 주세요.");
        orders.buyertel.focus();
    }
    else if (isNaN(orders.buy_tel.value) == true || isNaN(orders.buyertel.value) == true) {
        alert("숫자만 입력해 주세요.");
    }
    else if (orders.buyeremail.value == "" || document.getElementById("buy_emsel").value == "") {
        alert("주문자의 이메일을 입력해 주세요.");
        orders.buyeremail.focus();
    }
    else if (orders.receiver_name.value == "") {
        alert("받으실 분의 정보를 입력해 주세요.");
        orders.receiver_name.focus();
    }
    else if (orders.receiver_post.value == "" || orders.receiver_addr.value == "" || orders.receiver_addr2.value == "") {
        alert("받으실 곳의 주소를 입력해 주세요.");
    }
    else if (orders.receiver_hp.value == "") {
        alert("받으실 분의 핸드폰 번호를 입력해 주세요.");
        orders.receiver_hp.focus();
    }
    else if (isNaN(orders.receiver_hp.value) == true || isNaN(orders.receiver_tel.value) == true) {
        alert("숫자만 입력해 주세요.");
    }
    else {
        if (orders.gopaymethod.value == "directbank") {
            if (orders.banksend_name.value == "" || orders.bank_name.value == "") {
                alert("입금자명과 입금은행을 입력해 주세요.");
                orders.banksend_name.focus();
            }
            else if (orders.ordercheck.checked == false) {
                alert("구매진행시 결제정보 체크를 해 주셔야 진행이 됩니다.");
            }
            else {
                orders.action = "./shop_pay.html";
                orders.submit();
            }
        }
        else if (orders.ordercheck.checked == false) {
            alert("구매진행시 결제정보 체크를 해 주셔야 진행이 됩니다.");
        }
        else {
            orders.action = "./shop_pay.html";
            orders.submit();
        }
    }
}