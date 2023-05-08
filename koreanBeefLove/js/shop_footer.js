$(function () {

    $.fn.footer = function () {
        $.ajax({
            url: "./admin/admin_info.json?v=" + nos,
            cache: false,
            type: "GET",
            dataType: "JSON",
            success: function ($data) {
                $.fn.shop_footer($data);
            },
            error: function () {
                console.log("Data Error");
            }
        });

        $.fn.shop_footer = function ($data) {
            var $sanonm = $data[0].info_cpno;
            //카피라이터 shop_shop_footer
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
                    <span class='copy_bottom'>shop_footer ⓒ 2021 by dbfla6302.dothome.co.kr ALL Right reserved.</span><br>\
                    <div class='copy_bottom sp'>※ 본 사이트는 샘플용 사이트며 개인 포트폴리오를 위해 제작된 사이트 입니다.</div>";

            $(".shop_footer").html($cp_html);

            //사업자번호 확인
            $("#pop_cpno").click(function () {
                //예시 123-23-123456 "-"빼고 숫자만 발송
                let $sano = $sanonm.replace(/[-]/g, "");
                // console.log($sano);
                let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=" + $sano;
                window.open($urls, "biz", "width=700, height=500, scrollbars=auto");
            });
        };
    };

    $.fn.footer();

});