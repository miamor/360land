var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var uID = urlAr[urlAr.length - 1];
console.log(uID);

function saveProject (duanid) {
    $('.save_project[attr-id="'+duanid+'"]').html('<a class="v-place-save" href="#" title="Nhận thông báo từ dự án này"><i class="fa fa-heart-o"> Theo dõi</a>');

    $('.save_project[attr-id="'+duanid+'"] .v-place-save').hover(function () {
        $(this).children('i').removeClass('fa-heart-o').addClass('fa-heart');
    }).mouseout(function () {
        $(this).children('i').removeClass('fa-heart').addClass('fa-heart-o');
    }).click(function () {
        $.ajax({
            url: API_URL + '/manager_user/duanquantams/',
            type: 'post',
            data: { duan: duanid },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', __token);
            },
            success: function(data) {
                console.log(data);
                unsaveProject(duanid);
            }, 
            error: function (a, b, c) {
                console.log(a);
            }
        });
        return false
    })
}

function unsaveProject (duanid) {
    $('.save_project[attr-id="'+duanid+'"]').html('<a class="v-place-save saved" href="#" title="Bỏ theo dõi"><i class="fa fa-heart"></i> Bỏ Theo dõi</a>');

    $('.save_project[attr-id="'+duanid+'"] .v-place-save').hover(function () {
        $(this).children('i').removeClass('fa-heart').addClass('fa-heart-o');
    }).mouseout(function () {
        $(this).children('i').removeClass('fa-heart-o').addClass('fa-heart');
    }).click(function () {
        $.ajax({
            url: API_URL + '/manager_user/boduanquantam/',
            type: 'put',
            data: { duan: duanid },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', __token);
            },
            success: function(data) {
                console.log(data);
                saveProject(duanid);
            }, 
            error: function (a, b, c) {
                console.log(a);
            }
        });
        return false
    })
}

function getProjectInfo(duanid) {
    $.post(API_URL + '/user/chitietduan/', { id: duanid }, function(place) {
        v = handle(place);

        html = '<div class="v-user-property line">\
        <div class="listings_image mbs prl col cols6">\
            <img class="image_url" src="'+v.avatar+'">\
        </div>\
        <div class="listings_info col cols13">\
            <div class="line h4 mbn typeEmphasize">\
                <span class="listings_title"><a target="_blank" href="'+MAIN_URL+'#ptype=&cat=&city=CN&district=CN&area=CN&price=-1&ward=CN&street=CN&room=&direction=CN&isProject=1&place_search=&points=&zoom=13&center=21.0193996429443:105.94985198974598&page=0&product='+v.id+'&isShowUtil=0&utilArea=&searchtype=0&details=1&fromProject=0">'+v.title+'</a></span>\
            </div>\
            <div class="line listings_description">\
                <i class="fa fa-map-marker"></i> <span class="listings_address">'+v.address+'</span>\
            </div>\
            <div class="listings_price col cols5 lastCol h4 pts typeEmphasize">$'+v.priceTxt+'</div>\
            <div class="line mts listings_type save_project" attr-id="'+v.id+'"></div>\
        </div>\
        <div class="clearfix"></div>\
    </div>';
        
        $('.v-user-properties').append(html);
        unsaveProject(v.id);

        $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-40);
    })
}

function handle(place) {
    console.log(place);

    if (place.thumbs) place.thumbs = place.thumbs.split(',');
    place.avatar = (place.thumbs ? place.thumbs[0] : MAIN_URL+'/assets/img/noimage.png');
    
    place.title = place.name;

    place.typeid = parseInt(place.type.split('typereal')[1]);

    if (place.pricefrom < 1) place.priceTxt = place.pricefrom * 100 + ' triệu';
    else place.priceTxt = place.pricefrom + ' tỷ';

    if (!place.thumbs) {
        place.thumbs = [MAIN_URL + "/data/images/h1.jpg", MAIN_URL + "/data/images/h2.jpg", MAIN_URL + "/data/images/h3.jpg", MAIN_URL + "/data/images/h4.jpg", MAIN_URL + "/data/images/h5.jpg", MAIN_URL + "/data/images/h6.jpg", MAIN_URL + "/data/images/h7.jpg"]
    }

    return place;
}

$(document).ready(function () {
    if (__token) {
        // properties
        $('.v-user-properties').html('');
        $.ajax({
            url: API_URL+'/manager_user/duanquantams/',
            type: 'get',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', __token);
            },
            success: function (response) {
                data = response.data;
                console.log(data);
                $('.v-user-properties-total').html('('+data.length+')');
                $.each(data, function (i, v) {
                    getProjectInfo(v.duan);
                });
            },
            error: function (a, b, c) {
                console.log(a);
            }
        });
    }

    //$('body').append('<style>.listings_info{width:'+wi+'px}</style>');
});