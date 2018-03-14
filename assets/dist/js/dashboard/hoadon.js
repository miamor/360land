var table;
$(document).ready(function () {
    table = $('#buyList').DataTable({
        ajax: {
            url: API_URL+"/manager_user/danhsachgiaodichcho/",
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            }
        },
		columns: [
            { data: "id" },
            { 
                data: "coin",
                render: function (data, type, row) {
                    if (row.type == false) return -data;
                    else return data
                }
            },
            {
                data: "money",
                render : function (data, type, row) {
                    return 20
                }
            },
            {
                data: "date",
                render : function (data, type, row) {
                    return data.split('T')[0]
                }
            }
		],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            console.log(aData);
            if (aData.type == false) {
                $(nRow).addClass('substract');
            } else {
                $(nRow).addClass('add');
            }
        }
	})
})
