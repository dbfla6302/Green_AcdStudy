$(function () {
    $.get("./admin/admin_notice.json?v=" + nos, function ($ndata) { })
        .done(function ($ndata) {
            let $notice_ul = "";
            $.map($ndata, function ($ndt, $no) {
                let $word = $ndt.subject;
                if ($word.length > 25) {
                    $word = $word.substr(0, 25) + "...";
                }
                $notice_ul = "<li>" + $word + "</li>";
                $("#notice").append($notice_ul);
            });

        })
        .fail(function (notice_data) { console.log("json_error"); });
})