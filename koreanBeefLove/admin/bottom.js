$(function () {

    $.fn.bottom = function () {
        $.ajax({
            url: "./admin_info.json",
            cache: false,
            type: "GET",
            dataType: "JSON",
            success: function ($data) {
                $.fn.copyright($data);
            },
            error: function () {
                console.log("Data Error");
            }
        });

        $.fn.copyright = function ($data) {
            var $sanonm = $data[0].info_cpno;
            //카피라이터 admin_bottom
            let $cp_html;
            $cp_html = "<ul class='copy_info'>\
                    <li>"+ $data[0].info_cpname + " |</li>\
                    <li>대표 : "+ $data[0].info_ceo + " |</li>\
                    <li>사업자등록번호 : "+ $data[0].info_cpno + "</li>\
                    <li><input type='button' value='사업자 확인' id='pop_cpno' class='cn_ck'> |</li>\
                    <li>통신판매신고 : "+ $data[0].info_cn + "</li></ul>\
                    <ul class='copy_info'>\
                    <li>개인정보관리책임자 : "+ $data[0].info_manager + " |</li>\
                    <li>관리자 이메일 : "+ $data[0].info_manager_email + " |</li>\
                    <li>주소 : ("+ $data[0].info_addr + ") " + $data[0].info_addrdtc + " |</li>\
                    <li>전화번호 : "+ $data[0].info_tel + "</li></ul>\
                    <span class='copy_bottom'>Copyright ⓒ 2021 by dbfla6302.dothome.co.kr ALL Right reserved.</span>";

            $(".copyright").html($cp_html);

            //사업자번호 확인
            $("#pop_cpno").click(function () {
                //예시 123-23-123456 "-"빼고 숫자만 발송
                let $sano = $sanonm.replace(/[-]/g, "");
                console.log($sano);
                let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=" + $sano;
                window.open($urls, "biz", "width=700, height=500, scrollbars=auto");
            });

            // 환경설정 admin_config
            $.each($data[0], function ($key, $text) {
                if ($key == "info_site_ico") {
                    if ($data[0][$key] != "") {
                        $("#fimg_on").css("display", "block");
                        $("#fimg").css({    //이미지 적용
                            background: "url(" + $text + ")",
                            "background-size": "contain",
                            "background-repeat": "no-repeat",
                        });
                        $("#fimg_off").css("display", "none");
                    }
                }
                //포인트 checked
                else if ($key == "info_point_use") {
                    if ($data[0].info_point_use == "Y") {
                        $("#check_point").attr("checked", true);
                    }
                }
                switch ($key) {
                    case $key:
                        $("#" + $key).val($text);
                        break;
                }
            });

        };
    };

    $.fn.bottom();

    $("#fdel").click(function () {
        let $data1 = $("#info_idx").val();
        let $data2 = $("#info_site_ico").val();
        $.ajax({
            url: "./img_del.php",
            cache: false,
            type: "POST",
            dataType: "JSON",
            data: { "idx": $data1, "delimg": $data2 },
            contentType: "application/x-www-form-urlencoded",
            success: function ($indata) {
                if ($indata == "success") {
                    alert("정상적으로 이미지가 삭제 되었습니다.");
                    window.location.reload();
                }
            },
            error: function () {
                console.log("Ajax Error");
            }
        });
    });

    $("#fimg").click(function () {
        var $ico = $(this).css("background-image").split('"')[1];
        window.open($ico, "", "width=300 height=300");
    });

});