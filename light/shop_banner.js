$(function(){
    //메인 시간타이머 
     var $bn_timer,$sbn_timer;
     let $bn_no = 0,$bn_no2=0;
     let $bn_ea = ($("#ol_banners>li").length) - 1;
     let $sbn_ea = ($("#side_bn>img").length) - 1;
 
    //메인배너 타이머작동
    $.fn.bn_btntimer = function () {
         $("#ol_banners>li").stop().fadeOut();
         if ($bn_no < $bn_ea) { $bn_no++; }
         else if ($bn_no == 2) { $bn_no = 0; }
         $("#ol_banners>li").eq($bn_no).stop().fadeIn();
         setTimeout($.fn.bn_btntimer, 8000);
    }
    setTimeout($.fn.bn_btntimer, 8000);
    
    // 사이드배너
    var $sbn_width = $("#side_bn>img").width();
    var $sbn_node = $("#side_bn>img").length;  
    $.fn.bn_times = function(){
        $("#side_bn>img").stop().animate({
            "left":-($sbn_width * $bn_no2) + "px"
        },1000);
        $bn_no2 = $bn_no2 + 1;
        if($bn_no2 >= $sbn_node){
            $bn_no2 = 0;
        }
        $sbn_timer = setTimeout($.fn.bn_times,10000);
    }
    $sbn_timer = setTimeout($.fn.bn_times,10000);
});