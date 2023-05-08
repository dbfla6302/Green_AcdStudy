$(function(){

    $.fn.copyright = function(){
        $.ajax({
            url:"./json/hello_copyright.json",
            cache:false,
            type:"GET",
            dataType:"JSON",
            success:function($copyright){
                $.fn.copy_html($copyright);
            },
            error:function(){
                console.log("Copyright-Error");
            }
        });
    };


    $.fn.copy_html = function($cp_data){
        $.each($cp_data,function($cpidx,$cpname,$cpkey){
            $.each($cp_data[$cpidx],function($node_cpidx,$node_cp){
                
                if($node_cpidx=="account_bank"){
                    $.each($cp_data[$cpidx]["account_bank"],function($n,$a){
                        $("#bank"+$n).text($a["bank_name"]);
                    });
                }
                else if($node_cpidx=="account_bankno"){
                    $.each($cp_data[$cpidx]["account_bankno"],function($ns,$as){
                        $("#bankno"+$ns).text($as["bank_no"]);
                    });
                }

                switch($node_cpidx){
                    case $node_cpidx:
                    $("#"+$node_cpidx).text($node_cp);
                    break;
                }
            });
        });
    }

    $.fn.copyright();

});