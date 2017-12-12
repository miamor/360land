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

    //$('body').append('<style>.listings_info{width:'+wi+'px}</style>');
})
