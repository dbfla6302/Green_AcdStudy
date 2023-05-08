let login_page = new Vue({
    el: "#logins",
    data: {
        views: true,
        views2: false,
        member: "p",
        p_id: "",
        p_pw: ""
    },
    methods: {
        ops(vparts) {
            if (vparts == 1) {
                this.views = true,
                    this.views2 = false
            }
            else {
                this.views = false,
                    this.views2 = true
            }
        },
        gologin() {
            if (this.member == "c") {
                if (mfrm.person_id.value == "") {
                    alert("아이디를 입력하세요");
                    mfrm.person_id.focus();
                }
                else if (mfrm.corp_no.value.length < 10) {
                    alert("사업자 번호는 10자리입니다");
                    mfrm.corp_no.focus();
                }
                else if (isNaN(Number(mfrm.corp_no.value)) == true) {
                    alert("사업자 번호에는 숫자만 입력가능합니다");
                    mfrm.corp_no.value = "";
                    mfrm.corp_no.focus();
                }
                else if (mfrm.person_pw.value == "") {
                    alert("패스워드를 입력하세요");
                    mfrm.person_pw.focus();
                }
                else {
                    mfrm.submit();
                }
            }
            else if (this.member == "p") {
                if (this.p_id == "") {
                    alert("아이디를 입력하세요");
                    this.$refs.po_id.focus();
                }
                else if (this.p_pw == "") {
                    alert("패스워드를 입력하세요");
                    this.$refs.po_pw.focus();
                }
                else {
                    mfrm.submit();
                }
            }
        },
        member_btn1(nm) {
            alert("해당 서비스는 준비 중입니다.");
        }
    }
});