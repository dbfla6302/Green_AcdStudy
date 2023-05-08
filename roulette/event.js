$(document).ready(function(){
    var $img;
    var $data = "5000,100,200,2000,1000,500,300";
    var $result = $data.split(",");

    $("#game_btn").mouseover(function(){
        $("#game_btn>img").attr("src","./images/event_start_on.png");

    });
    $("#game_btn").mouseout(function(){
        $("#game_btn>img").attr("src","./images/event_start_off.png");
    });

    var $r = 0; //오브젝트 최초의 위치값
    $("#game_btn").click(function(){
        //횟수제한
        var $ct = Number($("#ct").val());
        if($ct > 0){
            $ct = $ct - 1;
            $("#ct").val($ct);       

            var $pc = Math.ceil(Math.random()*360);
            $r = $r + 1800; //기본 돌아가는 횟수가 5바퀴
            var $msg = $.fn.rotate($r,$pc);
            $("#msg").fadeOut(100);
            //결과출력
            setTimeout(function(){
                //결과 애니메이션
                $("#msg").slideDown(500);
                //결과 메세지 출력
                $("#msg").text( $result[$msg]+" 마일리지 당첨 되셨습니다! 🎉");
            },5500);
        } 
        else {
            alert("오늘 룰렛은 3회 횟수 모두 사용하셨습니다.");
        }
    });

    $.fn.rotate = function($r,$pc){
        var $node;
        
        if($pc >= 23 && $pc <= 67){
            $node = 1;
        } 
        else if($pc >= 68 && $pc <= 112){
            $node = 2;
        } 
        else if($pc >= 113 && $pc <= 157){
            $node = 3;
        } 
        else if($pc >= 158 && $pc <= 202){
            $node = 4;
        } 
        else if($pc >= 203 && $pc <= 247){
            $node = 1;
        } 
        else if($pc >= 248 && $pc <= 292){
            $node = 5;
        } 
        else if($pc >= 293 && $pc <= 338){
            $node = 6;
        } 
        else if($pc >= 339 && $pc <= 360 || $pc >= 0 && $pc <= 22){
            $node = 0;
        } 
        else {
            $node = 1;
        }
        var $rotate = $r + $pc;
        $("#game_pan").css("transform","rotate("+$rotate+"deg)");
        return $node;    
        }
    
});