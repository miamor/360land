var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var uID = urlAr[urlAr.length - 1];

function loadAssets(uid) {
    // properties
    $('.v-user-properties').html('');
    $.ajax({
        url: API_URL + '/user/listnodesale/',
        type: 'post',
        data: { id: uid },
        success: function (response) {
            data = response.data;
            console.log(data);
            if (data != 'error') {
                $('.v-user-properties-total').html('(' + data.length + ')');
                $.each(data, function (i, v) {
                    v.typeid = parseInt(v.type.split('typereal')[1]);
                    if (v.thumbs) v.thumbs = v.thumbs.split(',');
                    v.avatar = (v.thumbs ? v.thumbs[0] : MAIN_URL + '/assets/img/noimage.png');
                    if (v.price < 1) v.priceTxt = v.price * 100 + ' triệu';
                    else v.priceTxt = v.price + ' tỷ';

                    html = '<div class="v-user-property line">\
                        <div class="listings_image" style="width:70px;height:70px">\
                            <img class="image_url" src="'+ v.avatar + '">\
                            <div class="listings_price" style="font-size:15px">\
                                $'+ v.priceTxt + '\
                            </div>\
                        </div>\
                        <div class="listings_info col cols13">\
			    <div class="line listings_title" style="line-height:17px!important">\
				<a style="font-size:15px!important;line-height:17px!important" target="_blank" href="'+ MAIN_URL + '#ptype=&cat=&city=CN&district=CN&area=CN&price=-1&ward=CN&street=CN&room=&direction=CN&isProject=0&place_search=&points=&zoom=13&center=21.0193996429443:105.94985198974598&page=0&product=' + v.id + '&isShowUtil=0&utilArea=&searchtype=0&details=1&fromProject=0">' + v.title + '</a>\
			    </div>\
                            <div class="line">\
                                <span class="listings_address" style="font-size:14px"><i class="fa fa-map-marker"></i> '+ v.address + '</span>\
                            </div>\
                            <div class="line listings_description">\
                                <div class="listings_area">D.tích: <span>'+ v.area + '</span>m2</div>\
                                <div class="listings_room">Phòng ngủ: <span>'+ v.sophongngu + '</span></div>\
                                <div class="listings_direction">Hướng: <span>'+ v.huong + '</span></div>';
                    if (v.type == 'typereal1' || v.type == 'typereal11') {
                        html += ' <div class="v-place-more-one v-place-tang" style="display: inline-block;">Tầng: <span>' + v.tang + '</span></div>';
                    } else {
                        html += ' <div class="v-place-more-one v-place-tang" style="display: inline-block;">Số tầng: <span>' + v.tang + '</span></div>';
                        html += ' <div class="v-place-more-one v-place-rongtien" style="display: inline-block;">Chiều rộng mặt tiền: <span>' + v.rongtien + '</span></div>\
                        <div class="v-place-more-one v-place-rongduong" style="display: inline-block;">Chiều rộng mặt đường: <span>'+ v.rongduong + '</span></div>';
                    }
                    html += '</div>\
                            <div class="listings_time">';
                    if (v.vip == 1) html += '<div class="line mts listings_type"><strong class="label label-warning">VIP</strong></div>';
                    html += '<i class="fa fa-clock-o"></i> <time class="timefrom">' + v.timefrom.split('T')[0].split('-').reverse().join('-') + '</time> đến <time class="timeto">' + v.timeto.split('T')[0].split('-').reverse().join('-') + '</time></div>';
                    if (v.typeid < 11) html += '<div class="line mts listings_type"><strong class="label label-success">Đang bán</strong></div>';
                    else html += '<div class="line mts listings_type"><strong class="label label-info">Cho thuê</strong></div>';
                    if (v.vip == 1) html += '<div class="line mts listings_type"><strong class="label label-warning">VIP</strong></div>';
                    html += '<div class="line mts listings_delete">\
                                <a class="text-danger" href="#" title="Xóa bài đăng"><i class="fa fa-trash"></i></a>\
                            </div>\
                        </div>\
                        <div class="clearfix"></div>\
                    </div>';
                    $('.v-user-properties').append(html);
                    $('.listings_info').width($('.v-user-property').width() - $('.listings_image').width() - 20);
                    $('.listings_description,.listings_description *').css('font-size', 14)
                })
            }
        },
        error: function (a, b, c) {
            console.log(a);
        }
    });
}


function drawChart(chartData) {
    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var areaChart = new Chart(areaChartCanvas);

    var areaChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
            {
                label: "Digital Goods",
                fillColor: "rgba(60,141,188,0.9)",
                strokeColor: "rgba(60,141,188,0.8)",
                pointColor: "#3b8bba",
                pointStrokeColor: "rgba(60,141,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: chartData.split(',')
            }
        ]
    };

    var areaChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: false,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true
    };
    //Create the area chart
    areaChart.Line(areaChartData, areaChartOptions);
}


$(document).ready(function () {
    $('.page-title').html('User info');
    // get user info by uID
    console.log(API_URL + '/user/profile/ ' + uID);
    $.ajax({
        url: API_URL + '/user/profile/',
        type: 'post',
        data: { id: uID },
        success: function (response) {
            //console.log(response);
            data = response.data;
            data.social = data.social.split(',');
            
            $('.page-title').html(data.name);
            $('.v-user-avt').attr('src', data.avatar);
            $('.v-user-name').html(data.name);
            $('.v-user-phone span').html(data.phone);
            $('.v-user-mail span').html(data.email);
            $('.v-user-intro').html(data.details);

            $('.v-user-social').append('<a class="btn-social btn-facebook" href="' + data.social[0] + '"><i class="fa fa-facebook-square"></i></a>');
            $('.v-user-social').append('<a class="btn-social btn-youtube" href="' + data.social[1] + '"><i class="fa fa-youtube-square"></i></a>');
            if (isMobile) {
                $('.container').append('<div class="v-place-contacts">\
                <a class="btn btn-primary v-place-call" href="tel:'+ data.phone + '"><i class="fa fa-phone"></i> Call</a>\
                <a class="btn btn-primary v-place-sendmail" href="mailto:'+ data.email + '"><i class="fa fa-mail-forward"></i> Email</a>\
                </div>');
                $('.v-user-body').css('margin-bottom', 40);
            }

            loadAssets(data.id);
        },
        error: function (a, b, c) {
            console.log(a)
        }
    });

    $.ajax({
        url: API_URL + '/search/thongkesale/',
        type: 'post',
        data: { userid: uID, year: 2017 },
        success: function (response) {
            data = response.data;
            if (data == 'error') {
                __handle_error()
            } else {
                drawChart(data);
            }
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    })

    // chart
    /*    var donut = new Morris.Donut({
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
    */

    //$('body').append('<style>.listings_info{width:'+wi+'px}</style>');
})
