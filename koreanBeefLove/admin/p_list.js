let days = new Date();
var nos = days.getDay() + '' + ('0' + days.getHours()).slice(-2) + '' + ('0' + days.getMinutes()).slice(-2) + '' + ('0' + days.getSeconds()).slice(-2);
// 한페이지당 출력하는 목록갯수
const viewpage = 5;
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
        }
        else {
            wd == "";
        }
    }
}

let start_page = (pgno - 1) * viewpage;
let slice_page = viewpage * pgno;

let p_list = new Vue({
    el: "#pd",
    data: {
        word: "",   //검색어
        part: 1,
        arrays: [],
        warrays: [],    //검색어에 따른 재배열
        ea: 0,   //배열갯수
        pageing: 0, //최초 페이지 번호
    },
    methods: {
        popup_img(imgsrc) {
            window.open(imgsrc, "_blank", "width=500 height=500");
        },
        view_product(pno) {
            location.href = './admin_productview.html?pidx=' + pno;
        },
        // 전체 목록 클릭시 
        all_list() {
            location.href = './admin_product.html';
        },
        // 상품검색어 입력함수
        sendsearch() {
            if (this.word == "") {
                alert("검색할 상품명을 입력하세요.");
                sfrm.pnm.focus();
            }
            else {
                sfrm.submit();
            }
        },
        // 페이징 번호 클릭시 적용되는 함수
        gopage(pageno) {
            location.href = './admin_product.html?pnm=' + this.word + '&page=' + pageno;
        },
        // 글쓰기 버튼 클릭시 적용되는 함수
        pwrite() {
            location.href = "./admin_newproduct.html";
        },
        // 글삭제 클릭시 적용되는 함수
        product_del(pidx) {
            if(ADMIN_id !== "admin"){
                alert("Master 관리자만 삭제 권한이 있습니다.");
                $("button.sub_admin").unbind("click");
            }else{
                if (confirm('해당 상품 목록을 삭제시 데이터는 복구 되지 않습니다.\n삭제 하시겠습니까?')) {
                    location.href = "./product_listdel.php?idxs=" + pidx + "&callsign=pdel_sign";
                }
            }
        }

    },
    computed: {
        lists() {
            fetch("./admin_product.json?v=" + nos).then((pdata) => {
                return pdata.json();
            }).then((db) => {
                // console.log(db);
                this.word = wd; //검색어
                this.ea = db.length;    //전체 배열갯수
                if (this.ea == 0) {
                    this.part = 2;    //등록된 게시물이 없을 경우
                }
                else {
                    if (this.word == "") {
                        this.arrays = db.slice(start_page, slice_page);
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - start_page;
                    }
                    else {   //검색어가 있을 경우 배열형태
                        var z = ""; //배열값에 맞는 단어가 있는지 없는지를 파악하는 변수
                        this.warrays = db.filter(function (a1, a2, a3) {
                            z = a1.productnm.indexOf(wd);   //단어 필터
                            // console.log(z);
                            if (z != -1) {
                                return a1.productnm;
                            }
                        });
                        this.ea = this.warrays.length;
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.arrays = this.warrays.slice(start_page, slice_page);
                        this.ea = this.ea - start_page;
                    }
                }
            }).catch((error) => {
                console.log("Data error");
            })
        }


    }
});