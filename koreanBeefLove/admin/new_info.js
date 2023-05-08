/* new_info */ 
// 포인트
let no = 0, no2 = 0, no3 = 0;
var tr_ea = document.getElementById("tb_tbody").children.length;
var tr_ea2 = document.getElementById("qtb_tbody").children.length;
var tr_ea3 = document.getElementById("ptb_tbody").children.length;
while(no<tr_ea){ //회원부분   
    var tb_trp = document.getElementById("tb_tr"+no).children;
    tb_trp[4].innerText = Number(tb_trp[4].outerText).toLocaleString("ko");
    no++;
}

while(no2<tr_ea3){ //포인트부분  
    var ptb_trp = document.getElementById("ptb_tr"+no2).children;
    ptb_trp[5].innerText = Number(ptb_trp[5].outerText).toLocaleString("ko");
    ptb_trp[6].innerText = Number(ptb_trp[6].outerText).toLocaleString("ko"); 

    //말줄임 (포인트 내용)
    let point = document.getElementById("point"+no2);
    let po_ea = point.innerText.length;    
    if(po_ea>40){   //포인트 내용
        point.innerText = point.innerText.substr(0, 40) + "...";
    }
    no2++;
}

//말줄임 (질문사항 부분)
    while(no3<tr_ea2){      
        let qna = document.getElementById("qna"+no3);
        let qna_ea = qna.innerText.length;
        if(qna_ea>50){  //질문사항
            qna.innerText = qna.innerText.substr(0, 50) + "...";
        } 
        no3++;     
    }

