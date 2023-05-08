function member_btn(n) {
    if (n == 1) {
        location.href = "./member_ship.html";
    }
    else {
        alert("서비스 준비 중입니다.");
    }
}

// 로그인
function shop_logins() {
    if (frm.shop_id.value == "") {
        alert("아이디를 입력해 주세요.");
        frm.shop_id.focus();

    }
    else if (frm.shop_pw.value == "") {
        alert("패스워드를 입력해 주세요.");
        frm.shop_pw.focus();
    }
    else {
        frm.action = "./shop_loginok.php";
        frm.method = "POST";
        frm.submit();
    }
    return false;
}

// 비회원주문조회
function no_logins() {
    if (nofrm.nomember_id.value == "") {
        alert("주문자명을 입력해 주세요.");
        nofrm.nomember_id.focus();
    }
    else if (nofrm.nomember_no.value == "" || nofrm.nomember_no.value.length < 8) {
        alert("주문번호 8자리를 제대로 입력해 주세요.");
        nofrm.nomember_no.focus();
    }
    else {
        if (isNaN(nofrm.nomember_no.value)) {
            alert("주문번호는 숫자만 입력하세요.");
            nofrm.nomember_no.focus();
        }
        else {
            nofrm.action = "./shop_loginok.php";
            nofrm.method = "POST";
            nofrm.submit();
        }
    }
    return false;
}