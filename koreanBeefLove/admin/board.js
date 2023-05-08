function go_page(part,bname){
    switch(part){
        case 1:
        location.href='./admin_bmodify.html?boardnm='+bname;
        break;
    } 
}

function search(){
    if(sform.stext.value==""){
        alert("검색어를 입력해 주세요");
        return false;
    }
    else{
        return;
    }
}

function filters(){
    let sword = window.location.search;
    let stext = sword.split("&stext=");
    let spart = stext[0].replace("?spart=","");;
    if(sword==""){
        document.getElementById("stext").value = "";
    }
    else{
        document.getElementById("stext").value = decodeURI(stext[1]);
    }

    var sea = document.getElementById("spart").length;
    var s;
    for(s=0;s<sea;s++){
        if(document.getElementById("spart").options[s].value==spart){
            document.getElementById("spart").options[s].selected = "selected";
        }
    }
}
