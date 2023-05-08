$(function () {
  $("#add_member").click(function () {
    window.open("../add_member.html", "", "width=1000, height=1000, scrollbars=auto");
  });
});

function search() {
  if (sform.stext.value == "") {
    alert("검색할 단어를 입력하세요");
    return false;
  }
  else {
    return;
  }
}

function filters() {
  let sword = window.location.search;
  let stext = sword.split("&stext=");
  let spart = stext[0].replace("?search_part=", "");
  if (sword == "") {
    document.getElementById("stext").value = "";
  }
  else {
    document.getElementById("stext").value = decodeURI(stext[1]);
  }

  const sea = document.getElementById("search_part").length;
  var s;
  for (s = 0; s < sea; s++) {
    // 검색 파트 자동 select 
    if (document.getElementById("search_part").options[s].value == spart) {
      document.getElementById("search_part").options[s].selected = "selected";
    }
  }
}

let jsondb;
let db;
let plus = Math.floor(Math.random() * 99999);
function ajax() {
  plus++;
  function wck() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }
  function opens() {
    if (db.readyState == XMLHttpRequest.DONE && db.status == 200) {
      const jsondata = this.response;
      jsondb(jsondata);
    }
  }
  db = wck();
  db.onreadystatechange = opens;
  db.open("GET", "../shop_members.json?v=" + plus, true);
  db.send();
}
ajax();
jsondb = function (data) {
  $(function () {
    var $data = JSON.parse(data);
    let $tb_list = "";
    // console.log($data);
    if ($data != "") {
      $("#member_tableNone").css("display", "none");
      $("#member_tableList").css("display", "");

      $.map($data, function ($dt, $no) {

        //메일인증
        var mail_accept = "";
        if ($dt.mail_accept == "Y") {
          mail_accept = "checked";
        }
        //메일수신
        var mail_agree = "";
        if ($dt.mail_agree == "Y") {
          mail_agree = "checked";
        }
        //sms수신
        var sms_agree = "";
        if ($dt.sms_agree == "Y") {
          sms_agree = "checked";
        }
        //고객 그룹
        var sl = "selected";
        var select1, select2, select3, select4;
        switch ($dt.user_group) {
          case "N":
            select4 = sl;
            break;

          case "S":
            select3 = sl;
            break;

          case "G":
            select2 = sl;
            break;

          case "V":
            select1 = sl;
            break;
        }

        var $user_indate = $dt.user_indate.split(" ");
        var $user_lastlog = $dt.user_lastlog.split(" ");
        $tb_list = "<tr class='first_tr'>\
                <td rowspan='2'>\
                  <input type='checkbox' name='midx["+ $no + "]' value='" + $dt["midx"] + "' class='datack' onclick='u_ck();'>\
                </td>\
                <td rowspan='2'>"+ $dt.user_id + "</td>\
                <td class='member__name'>"+ $dt.user_name + "</td>\
                <td colspan='6'>\
                  <label for='member_identify1'><input type='radio' name='identify' id='member_identify1'/> 아이핀</label>\
                  <label for='member_identify2'><input type='radio' name='identify' id='member_identify2'/> 휴대폰</label>\
                </td>\
                <td>"+ $dt.user_hp + "</td>\
                <td>\
                  그룹\
                  <select name='mgroup["+ $no + "]'>\
                    <option value='V' "+ select1 + ">VIP</option>\
                    <option value='G' "+ select2 + ">GOLD</option>\
                    <option value='S' "+ select3 + ">SILVER</option>\
                    <option value='N' "+ select4 + ">NORMAL</option>\
                  </select>\
                </td>\
                <td>"+ $user_lastlog[0] + "</td>\
                <td rowspan='2'>"+ $dt.user_level + "</td>\
                <td rowspan='2'>수정 그룹</td>\
              </tr>\
              <tr>\
                <td class='member__nick'>"+ $dt.user_nick + "</td>\
                <td class='member__mailVerify'>\
                  <input type='checkbox' name='mail_accept["+ $no + "]' " + mail_accept + " value='Y'>\
                </td>\
                <td>\
                  <input type='checkbox' disabled>\
                </td>\
                <td>\
                  <input type='checkbox' name='mail_agree["+ $no + "]' " + mail_agree + " value='Y'>\
                </td>\
                <td>\
                  <input type='checkbox' name='sms_agree["+ $no + "]' " + sms_agree + " value='Y'>\
                </td>\
                <td>\
                  <input type='checkbox' disabled>\
                </td>\
                <td>\
                  <input type='checkbox' disabled>\
                </td>\
                <td>"+ $dt.user_tel + "</td>\
                <td>"+ Number($dt.user_point).toLocaleString() + "</td>\
                <td>"+ $user_indate[0] + "</td>\
              </tr>";
        $("#member_tableList").append($tb_list);
      });
    }
    else {
      $("#member_tableNone").css("display", "table-footer-group");
      $("#member_tableList").css("display", "none");
    }
  });
}
// mail_accept메일인증 , mail_agree메일수신, sms_agree sms수신

//선택수정(1), 선택삭제(2), 완전삭제(3)
modify = function (part) {
  switch (part) {
    case 1:
      if (confirm("해당 데이터를 수정 하시겠습니까?")) {
        var ck_ea = document.querySelectorAll(".datack").length;
        var w = 0, user_ck = 0;
        do {
          if (document.getElementsByName("midx[" + w + "]")[0].checked == true) {
            user_ck++;
          }
          console.log(user_ck);
          w++;
        } while (w < ck_ea);
        if (user_ck == 0) {
          alert("수정하실 회원을 선택해 주세요.");
        }
        else {
          mfrm.action = "member_modify.php";
          mfrm.submit();
        }
      }
      break;

    case 2:
      if (confirm("해당 데이터는 삭제시 복구 되지 않습니다.\n삭제 하시겠습니까?")) {
        mfrm.action = "member_del.php";
        mfrm.submit();
      }
      break;

    case 3:
      if (confirm("데이터 전체 삭제를 하시겠습니까?")) {
        alert("최고 관리자 외에는 삭제를 금합니다.");
      }
      break;
  }
}

//전체 선택 체크박스
var ck_ea, w;
function all_ck() {
  ck_ea = document.querySelectorAll(".datack").length;
  w = 0;
  var ps;
  if (mfrm.allck.checked == true) {
    ps = true;
  }
  else {
    ps = false;
  }
  do {
    document.getElementsByName("midx[" + w + "]")[0].checked = ps;
    // mfrm["midx[" + w + "]"].checked = ps;
    w++;
  } while (w < ck_ea);
}
// 선택 체크박스
function u_ck() {
  ck_ea = document.querySelectorAll(".datack").length;
  w = 0;
  var user_ck = 0;
  while (w < ck_ea) {
    if (mfrm["midx[" + w + "]"].checked == false) {
      mfrm.allck.checked = false;
    }
    else {
      user_ck++;
      if (user_ck == ck_ea) {
        mfrm.allck.checked = true;
      }
    }
    w++;
  }
}