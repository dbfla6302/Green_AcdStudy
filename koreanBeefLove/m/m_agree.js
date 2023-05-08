export let agreeck = function () {
    console.log(frm.agree.value,frm.email.value,frm.personal.value);

    if (frm.agree.value!="Y") {
        alert("이용약관에 동의해 주세요.")
    }
    else if (frm.email.value!="Y") {
        alert("이메일 수신 약관에 동의해 주세요.")
    }
    else if (frm.personal.value!="Y") {
        alert("개인정보 처리방침에 동의해 주세요.")
    }
    else {
        frm.method = "GET";
        frm.action = "http://ohellojjo.dothome.co.kr/es/index15.html";
        frm.submit();
    }
}
let cnt1=0,cnt2=0,cnt3=0;
export let agree = function (n) {

    if(n==1){
        if (cnt1 == 0) {
            cnt1++;
            frm.agree.value="Y";
            document.getElementById("ag"+n).style.right = "45px";
            document.getElementById("ag_bk"+n).style.backgroundColor = "tomato";
        }
        else{
            frm.agree.value ="N";
            document.getElementById("ag"+n).style.right = "";
            document.getElementById("ag_bk"+n).style.backgroundColor = "";
            cnt1--;
        }
    }
    if(n==2){
        if (cnt2 == 0) {
            cnt2++;
            frm.email.value="Y";
            document.getElementById("ag"+n).style.right = "45px";
            document.getElementById("ag_bk"+n).style.backgroundColor = "tomato";
        }
        else{
            frm.email.value="N";
            document.getElementById("ag"+n).style.right = "";
            document.getElementById("ag_bk"+n).style.backgroundColor = "";
            cnt2--;
        }
    }
    if(n==3){
        if (cnt3 == 0) {
            cnt3++;
            frm.personal.value="Y";
            document.getElementById("ag"+n).style.right = "45px";
            document.getElementById("ag_bk"+n).style.backgroundColor = "tomato";
        }
        else{
            frm.personal.value="N";
            document.getElementById("ag"+n).style.right = "";
            document.getElementById("ag_bk"+n).style.backgroundColor = "";
            cnt3--;
        }
    }
}
document.getElementById("ag1").addEventListener("click", function () { agree(1); });
document.getElementById("ag2").addEventListener("click", function () { agree(2); });
document.getElementById("ag3").addEventListener("click", function () { agree(3); });
document.querySelector("#agree_btn").addEventListener("click", agreeck);