// 배너 신규등록 파트
let vue_banner = new Vue({
    el: "#banner",
    data: {
        banner_url: "http://dbfla6302.dothome.co.kr/",
        banner_name: "bname",
        banner_link: "blink",
        banner_img: "bimg"
    },
    methods: {
        banner_post() {
            if (bfrm.bname.value == "") {
                alert("배너명을 입력해 주세요.");
            }
            else if (bfrm.blink.value == "") {
                alert("링크주소를 입력해 주세요.");
            }
            else if (bfrm.bimg.value == "") {
                alert("배너이미지를 선택해 주세요.");
            }
            else {
                bfrm.method = "POST"
                bfrm.action = "./banner_input.php"
                bfrm.enctype = "multipart/form-data";
                bfrm.submit();
            }
        },
        banner_list() {
            location.href = 'admin_banner.html';
        }
    },
    components: {},
    computed: {}
});