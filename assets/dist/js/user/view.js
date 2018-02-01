var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var uID = urlAr[urlAr.length - 1];
console.log(uID);

$(document).ready(function () {
    // get user info by uID
    console.log(API_URL+'/user/profile/ '+uID);
    $.ajax({
        url: API_URL+'/user/profile/',
        type: 'post',
        data: {name: uID},
        success: function (response) {
            console.log(response);
            data = response.data;
            $('.v-user-name').html(data.name);
            $('.v-user-uname').html('@'+data.username);
            $('.v-user-phone').html(data.phone);
            $('.v-user-mail').html(data.mail);
        },
        error: function (a, b, c) {
            console.log(a)
        }
    })

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

    var ratingsDonut = new Morris.Donut({
        element: 'ratings-chart',
        resize: true,
        colors: ["#eecd56", "#f56954", "#00a65a"],
        data: [
          {label: "Neutral reviews", value: 8},
          {label: "Critical reviews", value: 4},
          {label: "Good reviews", value: 20}
        ],
        hideHover: 'auto'
    });

    $('.ratings-more').width($('.ratings-stat').width()-$('#ratings-chart').width()+5);

    // properties
    $('.v-user-properties').html('');
    $.ajax({
        url: MAIN_URL+'/api/node.php',
        type: 'get',
        success: function (data) {
            $('.v-user-properties-total').html('('+data.length+')');
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
                            <div class="listings_area">D.tích: <span>'+v.area+'</span>m2</div>\
                            <div class="listings_room"> Phòng ngủ:  <span>'+v.sophongngu+'</span></div>\
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
                $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-10);
            })
        },
        error: function (a, b, c) {
            console.log(a);
        }
    });

    //$('body').append('<style>.listings_info{width:'+wi+'px}</style>');
})
