$(document).ready(function () {
    $("#booklisttable").DataTable({
        language: { "url": "https://cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese-Brasil.json" },
        bDestroy: true,
        ajax: {
            url: "../Home/booklist",
            data: {},
            dataSrc: "",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON"
        },
        "columns": [
            {
                "data": "BookName"

            },

            {
                "data": "AuthorName"

            },
            {
                "data": "Book_id",
                "render": function (data) {
                    return " <a href=\"#\" class=\"btn btn-danger\"  onclick=\"return modalaprovacao(" + data + ")\"><span> Delete </span></a> </td>";

                }
            }

        ]

    });
});

function modalaprovacao(id) {
    console.log(id)
    $("#modalaprovacaoid").val(id)
    $("#modalaprovacao").modal("show");
};