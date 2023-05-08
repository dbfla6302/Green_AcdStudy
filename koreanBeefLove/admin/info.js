/* 환경설정 체크 스크립트 */
function info_ok() {
    var cpno = info.info_cpno.value;
    if (cpno.match(/-/g) == null) {
        alert("사업자 등록번호에 -를 포함하셔야 합니다.");
    }
    else if (cpno.length < 10 || cpno.length > 13) {
        alert("사업자 등록번호는 10~12자리 입니다.");
    }
    else {
        return true;
    }
    return false;
}

//포인트 checkbox
function use_point() {
    var po_ck = document.getElementById("check_point").checked;

    if (po_ck == true) {
        document.getElementById("info_point").disabled = false;
    }
    else {
        document.getElementById("info_point").disabled = true;
        document.getElementById("info_point").value = "";
    }
}