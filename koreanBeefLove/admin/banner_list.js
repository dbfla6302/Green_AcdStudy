// 한페이지당 출력하는 목록갯수
const viewpage = 5;
let pgno = 1; // 페이징 번호 1번호
// 파라미터 체크 부분 
let getpage = window.location.search;
if (getpage != "") {
    var psplit = getpage.split("page=");
    if (psplit != "") {
        if (decodeURI(psplit[1]) != "undefined") {
            pgno = decodeURI(psplit[1]);
        }
    }
}
let start_page = (pgno - 1) * viewpage;
let slice_page = viewpage * pgno;
console.log(viewpage);

// 배너 리스트 출력 Vue 부분
let list_bn = new Vue({
    el: "#banner",
    data: {
        blist: [],
        ea: 0,
        pageing: 0

    },
    methods: {
        popup_img(imgsrc) {
            window.open(imgsrc, "", "_blank");
        },
        del_banner(bidx) {
            if(ADMIN_id !== "admin"){
                alert("Master 관리자만 삭제 권한이 있습니다.");
                $("button.sub_admin").unbind("click");
            }else{
                if (confirm('해당 데이터는 삭제시 복구 되지 않습니다.\n삭제 하시겠습니까?')) {
                    location.href = "./banner_del.php?del_idx=" + bidx
                }
            }
        },
        banner_table(bjson) {   //json출력
            // console.log(bjson);
            if (bjson != "") {
                document.getElementById("bn_tableNone").style.display = "none"
            }

            for (let n in bjson) {
                var bname = bjson[n].bname;
                /*말줄임 필요할때 조건문
                console.log(bname.length);
                if (bname.length > 17) {
                    bname = bname.substr(0, 17) + "..."
                }*/
                this.blist.push({
                    number: Number(n) + 1,
                    img: bjson[n].bimg,
                    link: bjson[n].blink,
                    bnm: bname,
                    date: bjson[n].bindate.split(" ")[0],
                    bidx: bjson[n].bidx,
                    num: Number(n) + 1
                });
            }

            //
            this.ea = this.blist.length;
            this.pageing = Math.ceil(this.ea / viewpage);
            this.arrays = this.blist.slice(start_page, slice_page);
            this.ea = this.ea - start_page;
            console.log(this.ea);
        },
        gopage(pageno) {
            location.href = "./admin_banner.html?page=" + pageno;
        }
    },
    components: {

    },
    computed: {
        jsons() {
            fetch("./admin_banner.json?v=<?=$v?>").then(function (response) {
                return response.json();
            }).then(function (bjson) {
                list_bn.banner_table(bjson);
            }).catch(function (error) {
                console.log("Data Error!!");
            });
        }
    }
});

// R:롤링배너 F:페이드 효과
if (eff == "R") {
    document.getElementsByName("effect")[0].checked = true;
}
else {
    document.getElementsByName("effect")[1].checked = true;
}