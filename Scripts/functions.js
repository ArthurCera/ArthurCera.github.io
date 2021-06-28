$(document).ready(function () {
    getbooks();
    getauthor();
});

function addbook() {

    var obj = {
        Author_Id : $("#authorname").val(),
        BookName : $("#booktitle").val(),
        BookDesc : $("#bookdesc").val()
    }
    if (obj.AuthorId == "" || obj.BookName == "" || obj.BookDesc == "") {

        return alert("Verify the input fields!");
    }

    $.ajax({
        url: '../Home/AddBook',
        type: 'POST',
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            if (data == 1) {
                modalsuccessbook();
            } else if (-1) {
                modalauthorexists();
            } else modalfail();
        }
    });
}

function modalsuccessbook() {
    getbooks();
}

function addauthor() {
    var obj = {
        AuthorName: $("#authornameadd").val(),
        AuthorN: $("#authornatadd").val()
    }
    $("#authornatadd").val("");
    $("#authornameadd").val("");
    if (obj.AuthorN == "" || obj.AuthorName == "") {
        
        return alert("Verify the input fields!");
    }

    $.ajax({
        url: '../Home/Addauthor',
        type: 'POST',
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            if (data == 1) {
                modalsuccess();
            } else if (-1) {
                modalauthorexists();
            }else modalfail();
        }
    });
}

function modalsuccess() {

    $("#addauthor").modal("hide");
    getauthor();
    $("#modalsuccess").modal("show");

}

function modalfail() {

    $("#addauthor").modal("hide");
    $("#modalfail").modal("show");

}

function modalauthorexists() {

    $("#addauthor").modal("hide");
    $("#modalauthorexists").modal("show");

}

function modalauthoradd() {
    $("#addauthor").modal("show");
}

function getauthor() {
    $.ajax({
        url: '../Home/Authorlist',
        type: "GET",
        dataType: "JSON",
        data: {},
        success: function (data) {
            $("#authorname").html("");
            $("#authorname").append(
                $('<option value = ""></option>'));
            $.each(data, function (i, data) {
                $("#authorname").append(
                    $('<option></option>').val(data.Author_id).html(data.AuthorName));
            });

        }
    });
}

function getbooks() {
    $("#booklisttable").DataTable({
        language: { "url": "https://cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese-Brasil.json" },
        bDestroy: true,
        ajax: {
            url: "../Home/Booklist",
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
                "data": "BookDesc",
                "render": function (data) {
                    return " <a href=\"#\" class=\"btn btn-primary\"  onclick=\"return modalaprovacao('" + data + "')\"><i class='fa fa-book'></i> Description</a></td>";

                }
            },
            {
                "data": { "flag": "BookRead", "id": "Book_id" },
                "render": function (data) {
                    if (data.BookRead) {
                        return " <a href=\"#\" class=\"btn btn-success\"  onclick=\"return read(" + data.Book_id + ")\"><i class='fa fa-check-circle'></i></a> </td>";
                    } else {
                        return " <a href=\"#\" class=\"btn btn-warning\"  onclick=\"return read(" + data.Book_id + ")\"><i class='fa fa-check-circle'></i></a> </td>";
                    }

                }
            },
            {
                "data": "Book_id",
                "render": function (data) {
                    return " <a href=\"#\" class=\"btn btn-danger\" id='book_id' onclick=\"return modaldelete(" + data + ")\"><i class='fa fa-times-circle'></i> Delete </a></td>";

                }
            }

        ]

    });
};

function removebook() {
    var data = $("#btnremove").val();
    console.log(data)
    $.ajax({
        url: '../Home/RemoveBook',
        type: "POST",
        dataType: "JSON",
        data: {book_id : data},
        success: function (data) {
            modalsuccessbook();
            $("#modaldelete").modal("hide")
        }
    });
}

function modalaprovacao(desc) {
    $("#descvalue").text(desc)
    $("#modalaprovacao").modal("show");
};

function modaldelete(desc) {
    console.log(desc)
    $("#btnremove").val(desc)
    $("#modaldelete").modal("show");
};

function read(data) {
    let obj = {
        Book_id : data
    }
    $.ajax({
        url: '../Home/ChangeRead',
        type: 'POST',
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function (data) {
            console.log(data)
            if (data == 1) {
                modalsuccessbook();
            } else if (-1) {
                modalauthorexists();
            } else modalfail();
        }
    });
};