$(function () {

    $("#s_btn").click(function () {
        $("#search_menu").slideToggle();
        $("#search_menu").css("display", "flex");
    });

    $("#search").click(function () {
        if ($("#input1").val() == "") {
            alert("검색할 단어를 입력해 주세요.");
        }
    });

    // 사이드메뉴
    $("#mn_btn").click(function () {
        $("#side_menu").fadeIn(500);
    });
    $("#close").click(function () {
        $("#side_menu").fadeOut(500);
    });

    //배너
    var $n = 0;
    var $banner;

    $.fn.banner = function () {

        // $("#top_bns").fadeIn(1000);
        $("#top_bn > img").fadeOut(800);
        $("#top_bn > img").eq($n).fadeIn(800);
        $("#top_bn > img").eq($n).css("z-index", "2");
        $n++;
        if ($n > $("#top_bn > img").length - 1) {
            $n = 0;
        }
        setTimeout($.fn.banner, 5000);
    }
    $.fn.banner();


    //floor
    $(window).scroll(function () {
        var $sct = $(this).scrollTop();
        $("#floor").stop().animate({
            "top": $sct + 200 + "px"
        }, 800);

    });
    $("#floor").click(function () {
        var $sct = $("#floor").offset().top;
        console.log($sct);
        $("html,body").stop().animate({
            "scrollTop": -$sct + "px"
        }, 800);
    });

});

// 사이드 메뉴 & 리뷰
let jsondb;
let db;
let plus = 0;
function ajax() {
    plus++;
    function wck() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    function opens() {
        if (db.readyState == XMLHttpRequest.DONE && db.status == 200) {
            const jsondata = this.response;
            jsondb(jsondata);
        }
    }
    db = wck();
    db.onreadystatechange = opens;
    db.open("GET", "./json/qanda.json?v=" + plus, true);
    db.send();
}
ajax();
jsondb = function (data) {
    $(function () {
        var $data = JSON.parse(data);
        //console.log($data);

        let $li_html = "", $rv_html = "";
        $.map($data, function ($dt, $no) {

            //사이드 말줄임
            let $word = $dt.q_subject;
            if ($word.length > 18) {
                $word = $word.substr(0, 18) + "...";
            }
            var $q_date = $dt.q_date.split(" ");
            $li_html = "<li><font>" + $q_date[0] + "</font> &nbsp;" + $word + "</li>"
            $("#qanda").append($li_html);

            //리뷰출력
            $rv_html = "<li>" + $word + "</li>";
            $("#review").append($rv_html);
            // console.log($word.length);

            //리뷰 하단 타이머
            var $notice_timer;
            $.fn.notice_timer = function () {
                $("#review").stop().animate({
                    top: "-40px",
                }, 500, function () {
                    var $nt = $("#review>li").eq(0).clone();
                    $("#review>li").eq(0).remove();
                    $("#review").append($nt);
                    $("#review").css("top", "0px");
                });
                $notice_timer = setTimeout($.fn.notice_timer, 5000);
            };
            setTimeout($.fn.notice_timer, 5000);
        });

    });
}

// 뉴펫 cat,dog
let newpet;
let np;
let pl = 0;
function ajax2() {
    pl++;
    function wck() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    function opens() {
        if (np.readyState == XMLHttpRequest.DONE && np.status == 200) {
            const jsondata = this.response;
            newpet(jsondata);
        }
    }
    np = wck();
    np.onreadystatechange = opens;
    np.open("GET", "./json/new_pet.json?v=" + pl, true);
    np.send();
}
ajax2();
newpet = function (data) {
    $(function () {
        var $data = JSON.parse(data);
        //console.log($data);

        let $li_html = "";
        $.map($data, function ($dt, $no) {
            // console.log($dt);
            if ($dt.pet_part == "cat") {
                $li_html = "<li><img src=" + $dt.pet_img + "><span>" + $dt.pet_title + "</span></li>"
                $("#cat").append($li_html);
            }
            else if ($dt.pet_part == "dog") {
                $li_html = "<li><img src=" + $dt.pet_img + "><span>" + $dt.pet_title + "</span></li>"
                $("#dog").append($li_html);
            }
        });

        $("#d_btn").click(function () {
            $("#dog").css("display", "flex");
            $("#cat").css("display", "none");
            $("#d_btn").css("top", "1px");
            $("#c_btn").css("top", "0");
        });
        $("#c_btn").click(function () {
            $("#dog").css("display", "none");
            $("#cat").css("display", "flex");
            $("#d_btn").css("top", "0px");
            $("#c_btn").css("top", "1px");
        });
    });
}

// 베스트 프로덕트
let best;
let bd;
let pp = 0;
function ajax3() {
    pp++;
    function wck() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    function opens() {
        if (bd.readyState == XMLHttpRequest.DONE && bd.status == 200) {
            const jsondata = this.response;
            best(jsondata);
        }
    }
    bd = wck();
    bd.onreadystatechange = opens;
    bd.open("GET", "./json/best_product.json?v=" + pp, true);
    bd.send();
}
ajax3();
best = function (data) {
    $(function () {
        var $data = JSON.parse(data);
        //console.log($data);
        let $li_html = "";
        $.map($data.best_product, function ($dt, $no) {
            //console.log($dt);
            $li_html = "<li><img src=" + $dt.product_img + "><span>\
            <p>"+ $dt.product_nm + "</p>\
            <p>"+ $dt.product_sample + "</p>\
            <p>"+ $dt.product_money + "원</p></span></li>";

            $("#best_pd").append($li_html);
        });

    });
}

