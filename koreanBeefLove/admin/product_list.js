let days = new Date();
var nos = days.getDay() + '' + ('0' + days.getHours()).slice(-2) + '' + ('0' + days.getMinutes()).slice(-2) + '' + ('0' + days.getSeconds()).slice(-2);

// 페이지 출력 
const viewpage = 4;
let getpage = window.location.search;
let pgno = 1;
if (getpage != "") {
    var psplit = getpage.split("page=");
    pgno = psplit[1];
    console.log(pgno);
}
let start_page = (pgno - 1) * viewpage;
let slice_page = viewpage * pgno;

//상품이름 검색부분
let search_pnm = window.location.search;
let spnm = search_pnm.split("?pnm=")[1];
var wd;

if (spnm == "" || spnm == undefined) {
    wd = "";
}
else {
    wd = decodeURI(spnm);
}
let p_list = new Vue({
    el: "#pd",
    data: {
        pd_search: wd,
        arrays: [],
        arrays2: [],
        part: 1,
        pageing: 0,
        p: ""
    },
    methods: {
        popup() {
            alert("test");
            // console.log(imgsrc);
            // window.open(imgsrc, "", "_blank");
        },
        pd_add() {
            location.href = "./admin_newproduct.html";
        },
        search() {
            if (this.pd_search == "") {
                alert("검색할 상품명을 입력하세요.");
                sfrm.pnm.focus();
                return false;
            }
            else {
                sfrm.submit();
            }
        },
        del_pd(pidx) {
            if (confirm('해당 상품을 삭제시 데이터는 복구 되지 않습니다.\n삭제 하시겠습니까?')) {
                location.href = "./product_listdel.php?idxs=" + pidx + "&callsign=pdel_sign";
            }
        },
        gopage(p) {
            location.href = './admin_product.html?page=' + p;
        }
    },
    components: {},
    computed: {
        lists() {
            fetch("./admin_product.json?v=" + nos).then(function (response) {
                return response.json();
            }).then((da) => {
                ea = da.length;
                // console.log(this.arrays2);
                if (ea == 0) {
                    this.part = 2;
                }
                else {
                    this.pd_search = wd;
                    this.arrays = da.slice(start_page, slice_page);
                    this.pageing = Math.ceil(da.length / viewpage);
                    ea = ea - start_page;
                }
            }).catch(function (error) {
                console.log("Data Error!!");
            });
        }
    }
});