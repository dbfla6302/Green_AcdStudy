function go_to_write() {
    location.href = "./shop_qnawrite.html";
};
let qa_vue = new Vue({
    el: "#qa_list_article",
    data: {
        qa_list_data: [],
        on: "off"
    },
    methods: {
        go_to_write() {
            location.href = "./shop_qnawrite.html"
        },
        array_data(data) {
            let qa_n;
            console.log(data)
            for (qa_n in data) {
                this.qa_list_data.push({
                    "date": data[qa_n]["qaindate"].substr(0, 4) + "." + data[qa_n]["qaindate"].substr(4, 2) + "." + data[qa_n]["qaindate"].substr(6, 2),
                    "tag": data[qa_n]["qacate"],
                    "title": data[qa_n]["qasubject"].substr(0, 30) + "...",
                    "name": data[qa_n]["qaname"],
                    "respon": data[qa_n]["qarespon"],
                })
            }
            this.on = "on";
            // console.log(this.qa_list_data)
        }
    },
    computed: {
        qa_json() {
            fetch("./qadata.json?v=" + nos).then((data1) => {
                return data1.json();
            }).then((data2) => {
                qa_vue.array_data(data2);
            })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
});