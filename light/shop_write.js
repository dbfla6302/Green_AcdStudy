function qa_go_list() {
    location.href = "./shop_qnalist.html";
};
function qa_write_sub() {
    console.log(qa_write_frm.qa_pass.value)
    if (!qa_write_frm.qa_subject.value) {
        alert("문의 제목을 입력해주세요.")
    }
    else if (!qa_write_frm.qa_cate.value) {
        alert("문의 카테고리를 선택해주세요.")
    }
    else if (!qa_write_frm.qa_name.value) {
        alert("문의 작성자를 입력해주세요.")
    }
    else if (!qa_write_frm.qa_pass.value) {
        alert("문의 비밀번호를 입력해주세요.")
    }
    else if (!qa_write_frm.qa_text.value) {
        alert("문의 내용을 입력해주세요.")
    }
    else {
        qa_write_frm.method = "POST";
        qa_write_frm.action = "./qa_insert.php";
        qa_write_frm.submit();
    }
};