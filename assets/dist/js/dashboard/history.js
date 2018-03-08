var table;
$(document).ready(function () {
    table = $('#buyList').DataTable({
        ajax: {
            url: API_URL+"/manager_user/lichsugiaodich/",
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            }
        },
		columns: [
            { data: "id" },
            { data: "coin" },
			{ data: "type" },
            {
                data: "date",
                render : function (data, type, row) {
                    return data.split('T')[0]
                }
            }
		],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            console.log(aData);
            /*if (aData.taxiid != null) {
                $(nRow).addClass('taken');
            }*/
        }
	})
})
