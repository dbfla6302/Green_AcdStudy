let days = new Date();
var nos = days.getDay() + '' + ('0' + days.getHours()).slice(-2) + '' + ('0' + days.getMinutes()).slice(-2) + '' + ('0' + days.getSeconds()).slice(-2);

// 한페이지당 출력하는 목록갯수
const viewpage = 10;
let pgno = 1; // 페이징 번호 1번호
// 파라미터 체크 부분 (페이징번호, 검색부분)
let getpage = window.location.search;
let wd = "";
// console.log(getpage);
if (getpage != "") {
    var psplit = getpage.split("page=");
    var searchnm = getpage.split(/&|=/);
    if (psplit != "") {
        if (decodeURI(psplit[1]) != "undefined") {
            pgno = Number(psplit[1]);   //다음페이지로 넘어가기 위해 페이징번호 설정 그뒤 검색어 작성     
        }
    }
    if (searchnm != "") {
        if (decodeURI(searchnm[1]) != "undefined") {
            wd = decodeURI(searchnm[1]);
            // console.log(wd);
        }
        else {
            wd == "";
        }
    }
}

let start_page = (pgno - 1) * viewpage;
let slice_page = viewpage * pgno;

let f_list = new Vue({
    el: "#pd",
    data: {
        word: "",   //검색어
        part: 1,
        flist: [],
        farrays: [],
        ea: 0,   //배열갯수
        pageing: 0, //최초 페이지 번호
        ctg_text: "",
        catearray: [],
        array: []
    },
    methods: {
        // 전체 목록 클릭시 
        all_list() {
            location.href = './admin_faq.html';
        },
        // 상품검색어 입력함수
        faqsearch() {
            if (this.word == "") {
                alert("검색할 상품명을 입력하세요.");
                frm.pnm.focus();
            }
            else {
                frm.submit();
            }
        },
        // 페이징 번호 클릭시 적용되는 함수
        gopage(pageno) {
            location.href = './admin_faq.html?pnm=' + this.word + '&page=' + pageno;
        },
        faq_insert() {
            location.href = './faq_write.html';
        },
        faq_btn(n) {
            $(function () {
                $(".faq_list:eq(" + n + ")>tr:eq(" + 1 + ")").stop().slideToggle();
            });
        },
        faq_view(fno) {
            console.log(fno);
            location.href = "admin_faqview.html?fidx=" + fno;
        },
        category(nm) {
            this.ctg_text = nm.target.outerText;
            let z = "";
            this.catearray = this.array.filter((d) => {
                z = d.category.indexOf(this.ctg_text);
                console.log(z);
                if (z != -1) {
                    return d.category;
                }
            })
            this.ea = this.catearray.length;
            this.flist = this.catearray.slice(start_page, slice_page);
            this.pageing = Math.ceil(this.ea / viewpage);
            this.ea = this.ea - start_page;

        }
    },
    computed: {
        lists() {
            fetch("./admin_faq.json?v=" + nos).then((response) => {
                return response.json();
            }).then((data) => {
                this.array = data;
                this.ea = data.length;
                for (let f in data) {
                    switch (data[f]["category"]) {
                        case 1:
                            data[f]["category"] = "배송문의";
                            break;
                        case 2:
                            data[f]["category"] = "반품/교환/환불";
                            break;
                        case 3:
                            data[f]["category"] = "주문/결제";
                            break;
                        case 4:
                            data[f]["category"] = "회원서비스";
                            break;
                        case 5:
                            data[f]["category"] = "안전거래";
                            break;
                    }
                }
                if (this.ea == 0) {
                    this.part = 2;    //등록된 게시물이 없을 경우
                }
                else {
                    if (this.word == "") {
                        this.flist = data.slice(start_page, slice_page);
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - start_page;
                    }
                    else {   //검색어가 있을 경우 배열형태
                        var z = ""; //배열값에 맞는 단어가 있는지 없는지를 파악하는 변수
                        this.farrays = data.filter(function (a1, a2, a3) {
                            z = a1.productnm.indexOf(wd);   //단어 필터
                            console.log(z);
                            if (z != -1) {
                                return a1.productnm;
                            }
                        });
                        this.ea = this.farrays.length;
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.flist = this.farrays.slice(start_page, slice_page);
                        this.ea = this.ea - start_page;
                    }
                }
            })
                .catch((error) => {
                    console.log("Data error!");
                })
        }
    }
});