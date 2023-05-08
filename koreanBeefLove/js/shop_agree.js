function agree_text() { //약관동의
    let agree_text1 = new XMLHttpRequest();
    let agree_text2 = new XMLHttpRequest();
    agree_text1.open("GET", "./agree/provision.txt?v=1", true);
    agree_text1.onload = function () {
        document.getElementById("agree_txt1").innerHTML = agree_text1.responseText;
    }
    agree_text2.open("GET", "./agree/privacy.txt?v=1", true);
    agree_text2.onload = function () {
        document.getElementById("agree_txt2").innerHTML = agree_text2.responseText;
    }
    agree_text1.send();
    agree_text2.send();
}

function agree_all() {
    var ckuse = document.getElementById("allagree").checked;
    var onoff = null;
    if (ckuse == true) { onoff = true; }
    else { onoff = false; }
    var fr;
    for (fr = 1; fr < 3; fr++) {
        document.getElementById("agree" + fr).checked = onoff;
    }
}
function agree_ne() {
    document.getElementById("allagree").checked = false;
    if (document.getElementById("agree1").checked == true && document.getElementById("agree2").checked == true) {
        document.getElementById("allagree").checked = true;
    }
}

function agree_btn() {
    var fr;
    var agree_use = "ok";
    for (fr = 1; fr < 3; fr++) {
        var ckoff = document.getElementById("agree" + fr).checked;
        if (ckoff == false) {
            agree_use = "no";
        }
    }
    if (agree_use == "no") {
        alert("약관에 모두 동의하셔야만 회원가입이 진행 됩니다.");
    }
    else {
        member_agree.method = "POST";
        member_agree.action = "member_join.html";
        member_agree.submit();
    }
}