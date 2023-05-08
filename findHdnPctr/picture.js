$(function () {
    let $okct = 0;    //성공
    let $errorct = 5; //실패
    let $count = 0;
    $("#start").click(function () {
        $("#dark").fadeOut(1000);
    });
    $("#ca_aw").click(function () {
        $errorct--;
        $(".h_img>img").attr("src", "./game/no_" + $errorct + ".png");
        $count++;
        console.log($count)
        if ($count == 5) {
            $("#ca_aw").unbind("click");
            $(".aw").unbind("click");
            setTimeout($.fn.alerts, 100, 2);
        }
    });
    $(".aw").click(function () {
        let $ct = $(this).index();
        $(".aw:eq(" + $ct + ")>img").attr("src", "./game/answer.gif");
        $okct++;
        $count++;
        console.log($count)
        if ($okct == 5) {
            setTimeout($.fn.alerts, 200, 1);
            $("#ca_aw").unbind("click");
            $(".aw").unbind("click");
        }
        else if ($count == 5) {
            $("#ca_aw").unbind("click");
            $(".aw").unbind("click");
            setTimeout($.fn.alerts, 100, 2);
        }
    });

    $.fn.alerts = function (ct_part) {
        if (ct_part == 1) {
            alert('🎉❗ "축하드립니다" 정답을 모두 맞추셨습니다 ❗🎉');
            $("#fm").css("display", "block");
            $("html").scrollTop(9999);  //게임완료 후 입력 폼으로 스크롤 이동
        }
        else if (ct_part == 2) {
            alert("아쉽게도 틀린그림 찾기에 실패 하셨습니다.💦");
            $("#start").css("display", "none");
            $("#dark").fadeIn(1000, function () {
                $("#end").fadeIn();
            });
        }
    }

    /* 우편번호 api 연동 */
    $("#addr_btn").postcodifyPopUp();
});

function event_ck() {
    if (fm.e_name.value == "") {
        alert("고객명을 입력해 주세요!");
        fm.e_name.focus();
    }
    else if (document.getElementById("t1").value == "" || document.getElementById("t2").value == "" || document.getElementById("t3").value == "") {
        alert("이벤트 당첨 문자를 받을 휴대폰 번호를 입력하세요");
        // document.getElementById("t1").focus();
    }
    else if (fm.e_addr.value == "" || fm.e_dtc.value == "") {
        alert("경품을 받을 배송지를 입력해 주세요");
    }
    else if (fm.e_agree.checked == false) {
        alert("개인정보수집 이용약관에 동의해 주세요");
    }
    else {   //실제 전화번호 확인 부분
        let number1 = document.getElementById("t1").value;
        if (number1 != "010" && number1 != "011" && number1 != "017") {
            alert("정상적인 휴대폰 번호가 아닙니다.");
        }
        else {
            let hp = document.getElementById("t1").value + "" + document.getElementById("t2").value + "" + document.getElementById("t3").value;
            let hp_length = hp.length;
            if (hp_length < 10) {
                alert("정상적인 휴대폰 번호가 아닙니다.");
            }
            else {
                document.getElementById("e_tel").value = hp;
                fm.submit();
            }
        }

    }
}