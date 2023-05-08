// add_member.html
$(function () {   //주소 api

    $("#join_btn").click(function () {
        // let $match = /^(?=.*[!@#$%^&*+-=`.,?"])/g;
        // console.log($("#M_id").val().match(/[!@#$%^&*\|+=?/~`"'_-]/g));
        if ($("#M_id").val() == "") {
            alert("아이디를 입력해 주세요.");
            $("#M_id").focus();
        }
        else if ($("#M_pass").val() == "" || $("#M_pass2").val() == "") {
            alert("패스워드 및 동일한 패스워드를 입력해 주세요.");
        }
        else {

            if ($("#M_id").val().length < 4) {
                alert("아이디는 최소 3자 이상 입력해 주세요.");
                $("#M_id").focus();
            }
            else {
                if ($("#M_id").val().match(/[!@#$%^&*\|+=?/~`"'-]/g) != null) {
                    alert("아이디는 _ 외에 다른 특수문자는 사용하실 수 없습니다.");
                    $("#M_id").focus();
                }
                else {
                    if ($("#M_pass").val() != $("#M_pass2").val()) {
                        alert("패스워드가 같지 않습니다.");
                    }
                    else {
                        $.fn.info_ck();
                    }
                }
            }
        }
    });

    // 개인정보 입력
    $.fn.info_ck = function () {

        if ($("#M_name").val() == "") {
            alert("이름을 입력해 주세요.");
            $("#M_name").focus();
        }
        else if ($("#M_nick").val() == "") {
            alert("닉네임을 입력해 주세요.");
            $("#M_nick").focus();
        }
        else if ($("#M_email").val() == "") {
            alert("이메일을 입력해 주세요.");
            $("#M_email").focus();
        }
        else if ($("#M_tel2").val() == "") {
            alert("전화번호를 입력해 주세요.");
            $("#M_tel2").focus();
        }
        else if ($("#M_tel").val() == "") {
            alert("휴대폰 번호를 입력해 주세요.");
            $("#M_tel").focus();
        }
        else if ($("#M_post").val() == "" || $("#M_road").val() == "") {
            alert("주소를 입력해 주세요.");
        }
        else if ($("#M_addr").val() == "") {
            alert("상세주소를 입력해 주세요.");
            $("#M_addr").focus();
        }
        else if ($("#security").val() == "") {
            alert("보안코드를 입력해 주세요.");
            $("#security").focus();
        }
        else {
            $.fn.etc();
        }
    }


    $.fn.etc = function () {
        let $nick = $("#M_nick").val();
        let $ck = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[0-9a-zA-Z]/g;
        if ($nick != "") {
            if ($nick.match(/[!@#$%^&*\|+=?/~`"'_-]/g) != null) {
                alert("공백없이 한글, 영문, 숫자만 입력 가능합니다.(특수문자 사용불가)");
                $("#M_nick").focus();
            }
            else if (($nick.match(/[a-z|A-Z]/g) != null && $nick.length < 4) || ($nick.match(/[가-힣]/g) != null && $nick.length < 2)) {
                alert("닉네임은 한글 2자, 영문 4자 이상 가능합니다.");
                $("#M_nick").focus();
            }
            else {
                if ($("#M_email").val().match($ck) == null) {
                    alert("올바른 이메일을 입력해 주세요.");
                    $("#M_email").focus();
                }
                else if ($("#M_tel").val().length < 10) {
                    alert("올바른 휴대폰 번호를 입력해 주세요.(최소 10자 이상)");
                }
                else if ((isNaN($("#M_tel").val()) || isNaN($("#M_tel2").val())) == true) {
                    alert("전화번호 및 휴대폰번호는 숫자만 입력해 주세요.");
                }
                else {
                    frm.submit();
                }
            }
        }
    }
});