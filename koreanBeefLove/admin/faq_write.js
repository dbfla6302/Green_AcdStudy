// 등록
export let faqinck = function (part) {
    // var p = part.path[0].id;
    var p = part.srcElement.id;

    // faq등록 버튼
    if (p == "faq_inok") {
        var qa = CKEDITOR.instances.fatext.getData();
        frm.fatext.value = CKEDITOR.instances.fatext.getData()
        if (frm.fcate.value == "") {
            alert("카테고리를 선택해 주세요");
        }
        else if (frm.fqtext.value == "") {
            alert("질문내용을 입력해 주세요")
            frm.fqtext.focus();
        }
        else if (qa == "") {
            alert("답변내용을 입력해 주세요");
            CKEDITOR.instances.fatext.focus();
        }
        else {
            frm.action = "./faq_writeok.php";
            frm.submit();
        }
        return false;

    }

    // faq목록 버튼
    else if (p == "faq_list") {
        location.href = "./admin_faq.html";
    }
}
// 수정 faq_modifyok.php
export let faq_modify = function () {
    if (document.getElementById("fqtext").value == "") {
        alert("FAQ 제목을 입력해 주세요");
    }
    else {
        frm.action = "./faq_modifyok.php";
        frm.submit();
    }
}

// 삭제 faq_delok.php
export let faq_del = function () {
    if (confirm(" 삭제하시면 데이터를 복구하실 수 없습니다. \n 삭제하시겠습니까?")) {
        frm.action = "./faq_delok.php";
        frm.submit();
    }
}

document.querySelector("#faq_inok").addEventListener("click", faqinck);  //등록
document.querySelector("#faq_list").addEventListener("click", faqinck);  //리스트
document.querySelector("#faq_modifyok").addEventListener("click", faq_modify);  //수정
document.querySelector("#faq_delok").addEventListener("click", faq_del);     //삭제