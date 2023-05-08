export function join_member(){
    if(!join_form.mid.value){
        alert("아이디를 입력하세요");
    }
    else if(!join_form.mpass.value){
        alert("패스워드를 입력하세요");
    }
    else if(!join_form.mname.value){
        alert("고객명을 입력하세요");
    }
    else if(!join_form.memail.value){
        alert("이메일을 입력하세요");
    }
    else if(!join_form.mhp.value){
        alert("연락처를 입력하세요");
    }
    else if(!join_form.mnick.value){
        alert("닉네임을 입력하세요");
    }
    else{
        if(isNaN(join_form.mhp.value)==true){
            alert("연락처는 숫자만 입력바랍니다.");
        }
        else if(join_form.mhp.value.length<11){
            alert("연락처를 정확하게 입력바랍니다.");
        }
        else{
    
            join_form.method ="POST";
            join_form.action ="../portfolio/shop/m/m_membership.php";
            join_form.enctype="application/x-www-form-urlencoded";
            join_form.submit();
        }
    
    }
    }
    function input_pw(){
        document.querySelector(".padbox").style.display="block";
    }
    const pass_array = ["1","2","3","4","5","6","7","8","9","0","!","*","-","_","."];
    let arrange =""
    export let aa = function(k){
        var nodes = document.querySelectorAll('.num');
        arrange+=pass_array[Array.from(nodes).indexOf(k.target)];
        console.log(arrange)
        join_form.mpass.value = arrange;
    }
    document.querySelector(".keypad").addEventListener("click",aa);
    
    document.getElementById("to_Join").onclick = join_member;
    document.getElementById("mpass").onclick = input_pw;