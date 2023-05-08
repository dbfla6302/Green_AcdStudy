let p_list = new Vue({
    el: "#pdfrm",
    data: {
        domain: "http://dbfla6302.dothome.co.kr/",
        product_key: "new_product",
        pd_content: "",
        rncode: "",
        dc: "N",
        dcpart: "P",
        p_money: "",
        dc_money: "",
        t_money: ""
    },
    methods: {
        pd_post() { //상품등록
            if (pdfrm.product_nm.value == "") {
                alert("상품명을 입력하세요.");
                pdfrm.product_nm.focus();
            }
            else if (pdfrm.product_nmdtc.value == "") {
                alert("간편설명을 입력하세요.");
                pdfrm.product_nmdtc.focus();
            }
            else if (pdfrm.product_money.value == "" || isNaN(pdfrm.product_money.value) == true) {
                alert("소비자 가격을 제대로 입력하세요. (숫자만)");
                pdfrm.product_money.focus();
            }
            else if (pdfrm.product_ea.value == "" || isNaN(pdfrm.product_ea.value) == true) {
                alert("상품 제한수량을 제대로 입력하세요. (숫자만)");
                pdfrm.product_ea.focus();
            }
            else if (pdfrm.product_img.value == "") {
                alert("상품 대표 이미지를 선택하세요.");
            }
            else if (pdfrm.product_contents1.value == "") {
                alert("상품 상세설명을 입력하세요.");
                pdfrm.product_contents1.focus();
            }
            else {
                pdfrm.method = "POST"
                pdfrm.action = "./new_productok.php"
                pdfrm.enctype = "multipart/form-data";
                pdfrm.submit();
            }
        },
        m_check(mp) {
            if (mp == 1) {  //적용
                if (this.p_money == "") {
                    alert("소비자 가격을 입력하셔야 합니다.");
                    document.getElementsByName("product_dc")[1].checked = true;
                    pdfrm.product_money.focus();
                }
                else {
                    document.getElementsByName("product_money")[0].readOnly = true;
                }
            }
            else {   //미적용
                document.getElementsByName("product_money")[0].readOnly = false;
            }
        },
        total() {
            var m2 = 0;
            if (this.dcpart == "P") {
                m2 = Math.floor(Number(this.p_money) - (Number(this.p_money) * (this.dc_money / 100)));
                this.t_money = Math.floor(m2 * 0.1) * 10;   //절삭
            }
            else if (this.dcpart == "M") {
                this.t_money = Number(this.p_money) - Number(this.dc_money);
            }

        },
        pd_list() {
            location.href = "./admin_product.html";
        }
    },
    components: {},
    computed: {
        pd_Code() {
            var random_num = Math.floor(Math.random() * 100000000);
            this.rncode = random_num;
        }
    }
});    