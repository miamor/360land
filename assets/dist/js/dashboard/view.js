var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var uID = urlAr[urlAr.length - 1];
console.log(uID);

$(document).ready(function () {
    if (__token) {
        // properties
        $('.v-user-properties').html('');
        $.ajax({
            url: MAIN_URL+'/api/node.php',
            type: 'get',
            success: function (data) {
                $('.v-user-properties-total').html('('+data.length+')');
                $.each(data, function (i, v) {
                    html = '<div class="v-user-property line">\
                        <div class="listings_rank mbs prl col cols6">\
                            <strong>'+v.rank+'</strong>\
                            <a href="#" class="btn btn-success">Refresh</a>\
                        </div>\
                        <div class="listings_image mbs prl col cols6">\
                            <img class="image_url" src="'+v.avatar+'" alt="'+v.title+'">\
                        </div>\
                        <div class="listings_info col cols13">\
                            <div class="line h4 mbn typeEmphasize">\
                                <span class="listings_address"><a href="'+location.href.trim()+'/node/'+v.id+'">'+v.address+'</a></span>\
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
                            <div class="line mts listings_edit">\
                                <a class="text-info" href="'+location.href.trim()+'/node/'+v.id+'" title="Sửa bài đăng"><i class="fa fa-pencil"></i></a>\
                            </div>\
                            <div class="line mts listings_delete">\
                                <a class="text-danger" href="#" title="Xóa bài đăng"><i class="fa fa-trash"></i></a>\
                            </div>\
                        </div>\
                        <div class="clearfix"></div>\
                    </div>';
                    $('.v-user-properties').append(html);
                    $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-$('.listings_rank').width()-20);
                })
            },
            error: function (a, b, c) {
                console.log(a);
            }
        });
    }

    var areaChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Electronics",
          fillColor: "rgba(210, 214, 222, 1)",
          strokeColor: "rgba(210, 214, 222, 1)",
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Digital Goods",
          fillColor: "rgba(60,141,188,0.9)",
          strokeColor: "rgba(60,141,188,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas);
    var barChartData = areaChartData;
    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";
    var barChartOptions = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - If there is a stroke on each bar
      barShowStroke: true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing: 1,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to make the chart responsive
      responsive: true,
      maintainAspectRatio: true
    };

    barChartOptions.datasetFill = false;
    barChart.Bar(barChartData, barChartOptions);

    //$('body').append('<style>.listings_info{width:'+wi+'px}</style>');
})
