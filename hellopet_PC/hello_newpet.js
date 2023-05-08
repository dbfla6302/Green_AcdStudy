$(function(){
    $.fn.new_print = function(){
        $.ajax({
            url:"./json/hello_newpet.json",
            cache:false,
            data:"GET",
            dataType:"JSON",
            success:function($new_data,$ok){
                $.fn.new_photos($new_data);
            },
            error:function(){
                console.log("error_data");
            }
        });
    };
    $.fn.new_print();
    let $new_photo ="";
    let $new_photo_li ="";
    $.fn.new_photos = function($new_data){
        $.map($new_data,function($arr,$nod){
            $new_photo = '<span class="new_span" id="new_span'+$nod+'"></span>';
            $("#new_photos").append($new_photo);
            $("#new_span"+$nod).css("background-image","url("+$new_data[$nod]["pet_img"]+")");
            $new_photo_li = '<ul>\
                    <li>'+$new_data[$nod]["pet_title"]+'</li>\
                    <li>'+$new_data[$nod]["pet_explanation"]+'</li>\
                    <li><ol class="new_icons">\
                        <li><img src="./newpets/screen.svg"></li>\
                        <li><img src="./newpets/heart.svg"></li>\
                        <li><img src="./newpets/bag.svg"></li>\
                    </ol></li>\
                </ul>\
            </span>';
            $("#new_span"+$nod).append($new_photo_li);
        })
        
        $(".new_span").bind({
            "mouseenter":function(){
                let $now_new_span = $(this).index();
                $("#new_span"+$now_new_span+">ul").css("display","block");
            },
            "mouseleave":function(){
                let $now_new_span = $(this).index();
                $("#new_span"+$now_new_span+">ul").css("display","");
            }
        });
    };
});