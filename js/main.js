try {
    var DataGridDatabase = [];
    (function () {
        // $.getJSON("http://localhost:3000/HTMLCSSJS/json/bigData.json", {
            $.getJSON("https://github.com/mnmawapuri/HTMLCSSJS/blob/master/json/bigData.json", {
            tagmode: "any",
            format: "json"
        }).done(function (response) {
            //debugger;
            DataGridDatabase = response;
            DataGridDatabase.sort().reverse();
            //console.log(DataGridDatabase);
        }).fail(function (error) {
            console.log(error);
        }).always(function () {
            BindDataGrid(null)
        });
    })();

    function BindDataGrid(params, action) {
        //$("#DataGrid").html("");

        var PageNos, html = "";
        PageNos = DataGridDatabase.length / parseInt($("#ddlPageSize").val());
        if (!Number.isInteger(PageNos)) {
            PageNos = parseInt(PageNos) + 1;
        }
        //console.log("PageNos: " + PageNos);

        $("#LastPage").attr("onclick", "BindDataGrid(" + PageNos + ")");

        var DataGrid = "<table id='DataGridTable' border-collapse='collapse' border='1px solid black' width='100%'>" +
            "<thead><tr style='font-size:20px'>" +
            "<th>Sr. No.</th>" +
            "<th style='display:none'>ID</th>" +
            "<th>Status</th>" +
            "<th>Username</th>" +
            "<th>Password</th>" +
            "<th>Email</th>" +
            "<th>Mobile No</th>" +
            "<th>Gender</th>" +
            "<th>Country Code</th>" +
            "</tr></thead>";

        if (params == null || params == "" || params == undefined) {
            if (PageNos >= 5) {
                for (let index = 1; index <= 5; index++) {
                    html += "<button type='button' id='Pagination-Button-" + index + "' onclick='BindDataGrid(" + index + ")' class='Current' style='margin:5px;'>" + index + "</button>";
                }
            }
            else {
                for (let index = 1; index <= PageNos; index++) {
                    html += "<button type='button' id='Pagination-Button-" + index + "' onclick='BindDataGrid(" + index + ")' class='Current' style='margin:5px;'>" + index + "</button>";
                }
            }
            $("#PageNos").html(html);

            $(DataGridDatabase).each(function (index, value) {
                if (index <= parseInt($("#ddlPageSize").val()) - 1) {
                    var Status;
                    if (value.active) {
                        Status = "Active";
                    }
                    else {
                        Status = "Inactive";
                    }

                    DataGrid += "<tr>" +
                        "<td> " + (index + 1) + " </td> " +
                        "<td style='display:none'> " + value.id + " </td> " +
                        "<td> " + Status + " </td>" +
                        "<td> " + value.username + " </td>" +
                        "<td> " + value.password + " </td>" +
                        "<td> " + value.email + " </td>" +
                        "<td> " + value.mobileno + " </td>" +
                        "<td> " + value.gender + " </td>" +
                        "<td> " + value.country + " </td>" +
                        "</tr>";
                }
            });

            $("#FirstPage").prop("disabled", true);
            $("#PrevPage").prop("disabled", true);

            if (PageNos == 1) {
                $("#NextPage").prop("disabled", true);
                $("#LastPage").prop("disabled", true);
            }
            else {
                $("#NextPage").prop("disabled", false);
                $("#LastPage").prop("disabled", false);
            }
            $("#Pagination-Button-1").addClass("btn-success");
        }
        else if (Number.isInteger(params)) {
            //console.log("Params: " + params);
            if (params > 5 && params != PageNos && action == "Next") {
                for (let index = (params - 5 + 1); index <= params; index++) {
                    html += "<button type='button' id='Pagination-Button-" + index + "' onclick='BindDataGrid(" + index + ")' class='Current' style='margin:5px;'>" + index + "</button>";
                }
            }
            else if (params > 5 && params == PageNos && action == "Next") {
                for (let index = (PageNos - 5 + 1); index <= PageNos; index++) {
                    html += "<button type='button' id='Pagination-Button-" + index + "' onclick='BindDataGrid(" + index + ")' class='Current' style='margin:5px;'>" + index + "</button>";
                }
            }
            else if (action == "Prev") {
                var CurrentPageNos = $("#PageNos").find(".Current");
                var flag = false;
                $(CurrentPageNos).each(function (index, value) {
                    if ($(this).hasClass("btn-success") && index == 0) {
                        flag = true;
                        html += "<button type='button' id='Pagination-Button-" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + "' onclick='BindDataGrid(" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + ")' class='Current' style='margin:5px;'>" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + "</button>";
                    }
                    else if (flag) {
                        html += "<button type='button' id='Pagination-Button-" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + "' onclick='BindDataGrid(" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + ")' class='Current' style='margin:5px;'>" + (parseInt($("#" + CurrentPageNos[index].id).text()) - 1) + "</button>";
                    }
                    else {
                        html += "<button type='button' id='Pagination-Button-" + $("#" + CurrentPageNos[index].id).text() + "' onclick='BindDataGrid(" + $("#" + CurrentPageNos[index].id).text() + ")' class='Current' style='margin:5px;'>" + $("#" + CurrentPageNos[index].id).text() + "</button>";
                    }
                });
            }
            else if (PageNos >= 5) {
                var CurrentPageNos = $("#PageNos").find(".Current");
                $(CurrentPageNos).each(function (index, value) {
                    html += "<button type='button' id='Pagination-Button-" + $("#" + CurrentPageNos[index].id).text() + "' onclick='BindDataGrid(" + $("#" + CurrentPageNos[index].id).text() + ")' class='Current' style='margin:5px;'>" + $("#" + CurrentPageNos[index].id).text() + "</button>";
                });
            }
            else {
                for (let index = 1; index <= PageNos; index++) {
                    html += "<button type='button' id='Pagination-Button-" + index + "' onclick='BindDataGrid(" + index + ")' class='Current' style='margin:5px;'>" + index + "</button>";
                }
            }
            $("#PageNos").html(html);

            $("#PageSize").val($("#ddlPageSize").val());

            var FirstRecord = (params - 1) * parseInt($("#ddlPageSize").val()) + 1;
            //console.log("FirstRecord: " + FirstRecord);
            var LastRecord = (((params - 1) * parseInt($("#ddlPageSize").val()) + 1) + parseInt($("#PageSize").val())) - 1;
            //console.log("LastRecord: " + LastRecord);

            if (params == 1 && $("#PrevPage").prop("disabled") && !$("#NextPage").prop("disabled")) {
                $("#FirstPage").prop("disabled", true);
                $("#PrevPage").prop("disabled", true);
                $("#NextPage").prop("disabled", false);
                $("#LastPage").prop("disabled", false);
            }
            else if (params == 1 && !$("#PrevPage").prop("disabled") && $("#NextPage").prop("disabled")) {
                $("#FirstPage").prop("disabled", true);
                $("#PrevPage").prop("disabled", true);
                $("#NextPage").prop("disabled", false);
                $("#LastPage").prop("disabled", false);
            }
            else if (params == 1 && !$("#PrevPage").prop("disabled") && !$("#NextPage").prop("disabled")) {
                $("#FirstPage").prop("disabled", true);
                $("#PrevPage").prop("disabled", true);
                $("#NextPage").prop("disabled", false);
                $("#LastPage").prop("disabled", false);
            }
            else if (params == 1 && $("#PrevPage").prop("disabled") && $("#NextPage").prop("disabled")) {
                $("#FirstPage").prop("disabled", true);
                $("#PrevPage").prop("disabled", true);
                $("#NextPage").prop("disabled", true);
                $("#LastPage").prop("disabled", true);
            }
            else if (params == PageNos) {
                $("#FirstPage").prop("disabled", false);
                $("#PrevPage").prop("disabled", false);
                $("#NextPage").prop("disabled", true);
                $("#LastPage").prop("disabled", true);
                LastRecord = DataGridDatabase.length;
            }
            else {
                $("#FirstPage").prop("disabled", false);
                $("#PrevPage").prop("disabled", false);
                $("#NextPage").prop("disabled", false);
                $("#LastPage").prop("disabled", false);
            }

            $("#Pagination-Button-" + params + "").addClass("btn-success");

            for (let index = FirstRecord - 1; index < LastRecord; index++) {
                var Status;
                if (DataGridDatabase[index].active) {
                    Status = "Active";
                }
                else {
                    Status = "Inactive";
                }

                DataGrid += "<tr>" +
                    "<td> " + (index + 1) + " </td> " +
                    "<td style='display:none'> " + DataGridDatabase[index].id + " </td> " +
                    "<td> " + Status + " </td>" +
                    "<td> " + DataGridDatabase[index].username + " </td>" +
                    "<td> " + DataGridDatabase[index].password + " </td>" +
                    "<td> " + DataGridDatabase[index].email + " </td>" +
                    "<td> " + DataGridDatabase[index].mobileno + " </td>" +
                    "<td> " + DataGridDatabase[index].gender + " </td>" +
                    "<td> " + DataGridDatabase[index].country + " </td>" +
                    "</tr>";
            }
        }

        DataGrid += "</table>";

        $("#DataGrid").html(DataGrid);
    }

    function PrevPage() {
        BindDataGrid(parseInt($(".btn-success").text()) - 1, "Prev");
    }

    function NextPage() {
        BindDataGrid(parseInt($(".btn-success").text()) + 1, "Next");
    }

    // function ControlValidation() {
    //     var objJSON = {};

    //     objJSON["id"] = DataGridDatabase[0].id + 1;

    //     if ($("#Status").is(":checked")) {
    //         objJSON["active"] = true;
    //     }
    //     else {
    //         alert("Please check status");
    //         $("#Status").focus();
    //         return;
    //     }

    //     if ($("#Username").val()) {
    //         $(DataGridDatabase).each(function (index, value) {
    //             if (DataGridDatabase[index].username.indexOf($("#Username").val()) >= 0) {
    //                 alert("Username is already exist");
    //                 return;
    //             }
    //             else {
    //                 objJSON["username"] = $("#Username").val();
    //             }
    //         });
    //     }
    //     else {
    //         alert("Please enter username");
    //         $("#Username").focus();
    //         return;
    //     }

    //     objJSON["password"] = $("#Password").val() ? $("#Password").val() : "";

    //     if ($("#Email").val()) {
    //         $(DataGridDatabase).each(function (index, value) {
    //             if (DataGridDatabase[index].email.indexOf($("#Email").val()) >= 0) {
    //                 alert("Email is already exist");
    //                 return;
    //             }
    //             else {
    //                 objJSON["email"] = $("#Email").val();
    //             }
    //         });
    //     }
    //     else {
    //         objJSON["email"] = "";
    //     }

    //     if ($("#MobileNo").val()) {
    //         $(DataGridDatabase).each(function (index, value) {
    //             if (DataGridDatabase[index].mobileno.indexOf($("#MobileNo").val()) >= 0) {
    //                 alert("Mobile No is already exist");
    //                 return;
    //             }
    //             else {
    //                 objJSON["mobileno"] = $("#MobileNo").val();
    //             }
    //         });
    //     }
    //     else {
    //         objJSON["mobileno"] = "";
    //     }

    //     if ($("input[name='Gender']").is(":checked")) {
    //         objJSON["gender"] = $("input[name='Gender']:checked").val();
    //     }
    //     else {
    //         alert("Please select gender");
    //         $("#Male").focus();
    //         return;
    //     }

    //     if ($("#ddlCountryCode").prop('selectedIndex') > 0) {
    //         objJSON["country"] = $("#ddlCountryCode").val();
    //     }
    //     else {
    //         alert("Please select country code");
    //         $("#ddlCountryCode").focus();
    //         return;
    //     }
    // }
} catch (error) {
    console.log("Detail Log:-" + "\nName: " + error.name + "\nMessage: " + error.message + "\nNumber: " + error.number + "\nDescription" + error.description + "\nStack: " + error.stack);
}