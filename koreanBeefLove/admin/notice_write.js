export let notice_write = function (part) {
    // var p = part.path[0].id;
    var p =part.srcElement.id;

    var notice_text = CKEDITOR.instances.notice_text.getData();
    // 등록
    if (p == "nt_add") {
        if (frm.notice_subject.value == "") {
            alert("제목을 입력해 주세요.");
            frm.notice_subject.focus();
        }
        else if (frm.notice_pw.value == "") {
            alert("패스워드를 입력해 주세요.");
            frm.notice_pw.focus();
        }
        else if (notice_text == "") {
            alert("내용을 입력해 주세요.");
            CKEDITOR.instances.notice_text.focus();
        }
        else {
            frm.action = "./notice_writeok.php";
            frm.submit();
        }
    }
    //수정
    else if (p == "nt_modify") {
        if (frm.notice_subject.value == "") {
            alert("제목을 입력해 주세요.");
            frm.notice_subject.focus();
        }
        else if (frm.notice_pw.value == "") {
            alert("패스워드를 입력해 주세요.");
            frm.notice_pw.focus();
        }
        else if (notice_text == "") {
            alert("내용을 입력해 주세요.");
            CKEDITOR.instances.notice_text.focus();
        }
        else {
            frm.action = "./notice_modifyok.php";
            frm.submit();
        }
    }
    else {
        location.href = './admin_notice.html';
    }
}

document.querySelector("#nt_add").addEventListener("click", notice_write);  //등록
document.querySelector("#all_list").addEventListener("click", notice_write);  //리스트
document.querySelector("#nt_modify").addEventListener("click", notice_write);  //수정