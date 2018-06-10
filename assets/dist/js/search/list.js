var kName = location.href.indexOf('name=') > -1 ? location.href.split('name=')[1].split('&')[0] : null;
var kCompany = location.href.indexOf('company=') > -1 ? location.href.split('company=')[1].split('&')[0] : null;

function list () {
    $.ajax({
        url: API_URL+'/search/danhsachbaidangtimkiem/',
        type: 'get',
        success: function (response) {
            console.log(response);
            data = response.data;
            if (response.status == 'error') {
                mtip('', 'error', '', data);
            } else {
                $('.v-user-properties').html('');
                $('.v-user-properties-total').html('('+data.length+')');
                $.each(data, function (i, v) {
                    html = '<div class="v-user-property line" style="min-height:100px">\
                        <div class="listings_image" style="width:70px;height:70px">\
                            <img class="image_url" src="'+v.avatar+'">\
                        </div>\
                        <div class="listings_info col cols13">\
                            <div class="line listings_title">\
                                <a style="font-weight:600" target="_blank" href="'+MAIN_URL+'/search/'+v.id+'">'+v.title+'</a>\
                            </div>\
                            <div class="line listings_description">\
                                <i class="fa fa-map-marker"></i> <span>Khu vực: <b>'+v.huyen+', '+v.tinh+'</b></span>\
                            </div>\
                            <div class="line listings_description">\
                                <div>Cần: <span>'+(v.type_action == 1 ? 'Thuê' : 'Mua')+'</span></div>\
                                <div>Loại BĐS: <span>'+typeRealEstate[v.type].split('] ')[1]+'</span></div>\
                            </div>\
                        </div>\
                        <div class="clearfix"></div>\
                    </div>';
                    $('.v-user-properties').append(html);
                    $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-20);
                })
            }
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    })
}

$(document).ready(function () {
    list();
})