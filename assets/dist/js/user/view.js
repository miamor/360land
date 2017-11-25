$(document).ready(function () {
    // chart
    var donut = new Morris.Donut({
        element: 'sales-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
          {label: "Download Sales", value: 12},
          {label: "In-Store Sales", value: 30},
          {label: "Mail-Order Sales", value: 20}
        ],
        hideHover: 'auto'
    });

    // properties
    $('.v-user-properties').html('');
    $.ajax({
        url: MAIN_URL+'/api/node.php',
        type: 'get',
        success: function (data) {
            $.each(data, function (i, v) {
                html = '<div class="v-user-property line">\
                    <div class="listings_image mbs prl col cols6">\
                        <img class="image_url" src="'+v.avatar+'" alt="'+v.title+'">\
                    </div>\
                    <div class="listings_info col cols13">\
                        <div class="line h4 mbn typeEmphasize">\
                            <span class="listings_address"><a href="#">'+v.address+'</a></span>\
                        </div>\
                        <div class="line listings_description">\
                            <div class="listings_area">Diện tích: <span>'+v.area+'</span>m2</div>\
                            <div class="listings_room"> Số phòng ngủ:  <span>'+v.sophongngu+'</span></div>\
                            <div class="listings_direction">Hướng: <span>'+v.huong+'</span></div>\
                            <div class="listings_area">Loại: <span>'+v.type+'</span></div>\
                        </div>\
                        <div class="listings_price col cols5 lastCol h4 pts typeEmphasize">$'+v.price+'</div>\
                        <div class="line mts listings_type">\
                            '+(v.type_action == 1 ? '<strong class="label label-success">Đang bán</strong>' : '<strong class="label label-info">Cho thuê</strong>')+'\
                        </div>\
                    </div>\
                    <div class="clearfix"></div>\
                </div>';
                $('.v-user-properties').append(html);
            })
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
})
