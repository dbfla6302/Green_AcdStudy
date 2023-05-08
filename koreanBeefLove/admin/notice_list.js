// 한페이지당 출력하는 목록갯수
const viewpage = 5;
let pno = 1; // 페이징 번호 1번호
// 파라미터 체크 부분 (페이징번호, 검색부분)
let getpage = window.location.search;
let wd = "";
// console.log(getpage);
if (getpage != "") {
    var pplit = getpage.split("page=");
    var searchnm = getpage.split(/&|=/);
    if (pplit != "") {
        if (decodeURI(pplit[1]) != "undefined") {
            pno = Number(pplit[1]);   //다음페이지로 넘어가기 위해 페이징번호 설정 그뒤 검색어 작성     
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

let st_page = (pno - 1) * viewpage;
let sl_page = viewpage * pno;

let notice = new Vue({
    el: "#notice_vue",
    data: {
        word: "",   //검색어
        arrays: [],
        farrays: [],
        part: 1,
        ea: 0,   //배열갯수
        pageing: 0, //최초 페이지 번호
    },
    methods: {
        // 게시물 등록 
        nt_add() {
            location.href = './notice_write.html';
        },
        //전체 체크박스
        all_ck() {
            var ckea = document.getElementById("notice_tb").children.length;
            var ck = document.getElementById("allck").checked;
            var c;
            for (c = 0; c < ckea; c++) {
                document.getElementsByClassName("cks")[c].checked = ck;
            }
        },
        //체크박스
        ch_ck() {
            var ckea = document.getElementById("notice_tb").children.length;
            var c;
            var ck = 0;
            for (c = 0; c < ckea; c++) {
                if (document.getElementsByClassName("cks")[c].checked == false) {
                    document.getElementById("allck").checked = false;
                }
                else {
                    ck++;
                    if (ck == ckea) {
                        document.getElementById("allck").checked = true;
                    }
                }
            }
        },
        // 게시물 삭제 
        nt_del() {
            if (confirm("해당 공지사항을 삭제시 데이터는 복구 되지 않습니다.\n삭제 하시겠습니까?")) {
                frm.submit();
            };
        },
        // 게시물검색어 입력함수
        ntsearch() {
            if (this.word == "") {
                alert("검색할 상품명을 입력하세요.");
                nfrm.notice.focus();
            }
            else {
                nfrm.submit();
            }
        },
        // 전체 목록 클릭시 
        all_list() {
            location.href = './admin_notice.html';
        },
        // 페이징 번호 클릭시 적용되는 함수
        gopage(pageno) {
            location.href = './admin_notice.html?notice=' + this.word + '&page=' + pageno;
        },
        modify(sidx) {
            location.href = "./notice_modify.html?sidx=" + sidx;
        }
    },
    computed: {
        lists() {
            console.log(nos);
            fetch("./admin_notice.json?v=" + nos).then((pdata) => {
                return pdata.json();
            }).then((db) => {
                console.log(db);
                this.word = wd;
                this.ea = db.length;
                if (this.ea == 0) {
                    this.part = 2;    //등록된 게시물이 없을 경우
                }
                else {
                    if (this.word == "") {
                        this.arrays = db.slice(st_page, sl_page);
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - st_page;
                    }
                    else {   //검색어가 있을 경우 배열형태
                        var z = "";
                        this.farrays = db.filter(function (a1, a2, a3) {
                            z = a1.subject.indexOf(wd);
                            console.log(z);
                            if (z != -1) {
                                return a1.subject;
                            }
                        });
                        this.ea = this.farrays.length;
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.arrays = this.farrays.slice(st_page, sl_page);
                        this.ea = this.ea - st_page;
                    }
                }
            }).catch((error) => {
                console.log("Data error");
            })
        }
    }
});


/* 폰트 크기 조절 */
function fontclass(part) {
    var plus_cs;
    if (part == "1") {
        plus_cs = "section";
        document.getElementById("notice_vue").className = plus_cs;
    }
    else {
        if (part == "2") {
            plus_cs = "font_view2";
            document.getElementById("notice_vue").classList.remove("font_view3");
        }
        else if (part == "3") {
            plus_cs = "font_view3";
            document.getElementById("notice_vue").classList.remove("font_view2");
        }
        document.getElementById("notice_vue").className += " " + plus_cs;
    }
};