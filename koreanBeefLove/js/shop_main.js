// login
function login_infodata() {
    if (shop_id == "") {
        document.getElementById("login_off").style.display = "block";
        document.getElementById("login_on").style.display = "none";
        document.getElementById("member_on").style.display = "block";
    }
    else {
        document.getElementById("login_on").style.display = "block";
        document.getElementById("member_on").style.display = "none";
        document.getElementById("login_off").style.display = "none";
    }
}
login_infodata();
$(function () {

    var $po_timer;
    var $point = 0;
    $.fn.times = function () {
        $po_timer = 0;
        $po_timer = setInterval(function () {
            if ($point % 2 == 0) {
                $("#member_on>div").stop().animate({ "top": "90%" }, 500); //style.bottom="-2px";
            }
            else if ($point % 2 == 1) {
                $("#member_on>div").stop().animate({ "top": "100%" }, 500);
            }
            $point++;
        }, 500);
    }
    $po_timer = setTimeout($.fn.times, 100);

    // Drop menu
    $("#m_box>li").bind({
        "mouseenter": function () {
            var $mno = $(this).index();
            $("#m_box>li>ol").eq($mno).stop().slideDown();
        },
        "mouseleave": function () {
            var $mno = $(this).index();
            $("#m_box>li>ol").eq($mno).stop().slideUp();
        }
    });
});

// search
function wsearch(p) {
    let sw = document.getElementById("search_text").value;
    if (p == 1) {   //onsubmit
        var kc = event.keyCode;
        if (kc == 13) {
            if (sw == "") {
                alert("검색어를 입력하세요.");
                sw.focus();
                return false;
            }
            else {
                f_search.method = "GET";
                f_search.action = "./search.html";
                f_search.submit();
            }
        }
        else {
            return false;
        }
    }
    else {  //onclick
        if (sw == "") {
            alert("검색어를 입력하세요.");
            sw.focus();
            return false;
        }
        else {
            f_search.method = "GET";
            f_search.action = "./search.html";
            f_search.submit();
        }
    }
}
var search = window.location.search;
var word = decodeURI(search.split("?searchwd=")[1]);
if (word == "" || word == "undefined") {
    document.getElementById("search_text").value = "";
}
else if (word != "") {
    document.getElementById("search_text").value = word;
}