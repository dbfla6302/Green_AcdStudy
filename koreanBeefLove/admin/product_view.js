let p_list = new Vue({
    el: "#pd",
    data: {
        domain: "http://dbfla6302.dothome.co.kr/",
        pidx: "",
        pd_content: "",
        goodsno: "",
        product_nm: "",
        productnm_dtc: "",
        product_money: "",
        product_dc: "N",
        product_dcpart: "P",
        product_dcnum: "",
        product_dcnum: "",
        product_ea: "",
        product_img: "",
        product_img1: "",
        product_img2: "",
        product_img3: "",
        pd_img: 1,
        pd_img1: 1,
        pd_img2: 1,
        pd_img3: 1,
        product_option1: "",
        product_option2: "",
        product_option3: "",
        product_url: "",
        pidx: "",
        product_contents1: "",
        main_img: 1,
        product_file: ""
    },
    methods: {
        pmodify() { //상품수정
            this.product_contents1 = CKEDITOR.instances.product_contents1.getData();

            if (this.product_nm == "") {
                alert("상품명을 입력하세요.");
                pdfrm.product_nm.focus();
            }
            else if (this.productnm_dtc == "") {
                alert("간편설명을 입력하세요.");
                pdfrm.product_nmdtc.focus();
            }
            else if (this.product_money == "" || isNaN(this.product_money) == true) {
                alert("소비자 가격을 제대로 입력하세요. (숫자만)");
                pdfrm.product_money.focus();
            }
            else if (this.product_ea == "" || isNaN(this.product_ea) == true) {
                alert("상품 제한수량을 제대로 입력하세요. (숫자만)");
                pdfrm.product_ea.focus();
            }
            else if (this.main_img == 0) {
                // alert("상품 대표 이미지를 선택하세요.");
                if (this.product_file == "") {
                    alert("상품 대표 이미지를 선택하세요.");
                }
            }
            // else if (this.main_img == 0) {
            // }
            else if (this.product_contents1 == "") {
                alert("상품 상세설명을 입력하세요.");
                pdfrm.product_contents1.focus();
            }
            else {
                pdfrm.submit();
            }
        },
        m_check(mp) {
            if (mp == 1) {  //적용
                if (this.product_money == "") {
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
            if (this.product_dcpart == "P") {
                m2 = Math.floor(Number(this.product_money) - (Number(this.product_money) * (this.product_dcnum / 100)));
                this.product_sales = Math.floor(m2 * 0.1) * 10;   //절삭
            }
            else if (this.product_dcpart == "M") {
                this.product_sales = Number(this.product_money) - Number(this.product_dcnum);
            }

        },
        all_list() {
            location.href = "./admin_product.html";
        },
        // 상품수정 페이지 이미지 삭제
        img_del(img_name) {
            if (confirm("해당 이미지를 삭제 하시겠습니까?")) {
                fetch("./files_del.php?tablenm=shop_product&pidx=" + this.pidx + "&fieldnm=" + img_name)
                    .then((call) => {
                        return call.json();
                    }).then((sign) => {
                        if (sign == "success") {
                            switch (img_name) {
                                case "product_img":
                                    this.pd_img = 1;
                                    break;
                                case "product_simg1":
                                    this.pd_img1 = 1;
                                    break;
                                case "product_simg2":
                                    this.pd_img2 = 1;
                                    break;
                                case "product_simg3":
                                    this.pd_img3 = 1;
                                    break;
                            }
                        }
                    }).catch((erroe) => {
                        console.log(error);
                    });
            }
        }
    },
    components: {},
    computed: {
        datas() {
            const data = JSON.parse(arrays);
            // console.log(data);
            this.pidx = data[0]["pidx"];
            this.goodsno = data[0]["goodsno"];
            this.product_nm = data[0]["productnm"];
            this.productnm_dtc = data[0]["productnm_dtc"];
            this.product_money = data[0]["product_money"];
            this.product_dc = data[0]["product_dc"];
            this.product_dcpart = data[0]["product_dcpart"];
            this.product_dcnum = data[0]["product_dcnum"];
            this.product_sales = data[0]["product_sales"];
            this.product_ea = data[0]["product_ea"];
            this.product_option1 = data[0]["product_option1"];
            this.product_option2 = data[0]["product_option2"];
            this.product_option3 = data[0]["product_option3"];
            this.product_url = data[0]["product_url"];
            // 이미지
            this.product_img = data[0]["product_img"];
            this.product_img1 = data[0]["product_simg1"];
            this.product_img2 = data[0]["product_simg2"];
            this.product_img3 = data[0]["product_simg3"];
            if (data[0]["product_img"] != "") { this.pd_img = 2; this.main_img = 1; }
            if (data[0]["product_simg1"] != "") { this.pd_img1 = 2; }
            if (data[0]["product_simg2"] != "") { this.pd_img2 = 2; }
            if (data[0]["product_simg3"] != "") { this.pd_img3 = 2; }
            if (this.pd_img == 1) {
                if (this.product_file == "") { this.main_img = 0; }
                else { this.main_img = 1; }
            }
        }
    }

});