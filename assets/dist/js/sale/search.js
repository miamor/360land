var kName = location.href.split('name=')[1].split('&')[0];
var kCompany = location.href.split('company=')[1].split('&')[0];

function loadData (name, company) {
    $.ajax({
        url: API_URL+'/search/timkiemsale/',
        type: 'post',
        data: {name: name, company: company},
        success: function (response) {
            console.log(response);
            data = response.data;
            $('.v-user-properties-total').html('('+data.length+')');
            $.each(data, function (i, v) {
                v.social = v.social.split(',');
                html = '<div class="v-user-property line" style="min-height:100px">\
                    <div class="listings_image" style="width:70px;height:70px">\
                        <img class="image_url" src="'+v.avatar+'">\
                    </div>\
                    <div class="listings_info col cols13">\
                        <div class="line listings_title">\
                            <a style="font-weight:600" target="_blank" href="'+MAIN_URL+'/user/'+v.username+'">'+v.name+'</a>\
                        </div>\
                        <div class="line listings_description">\
                            <span>Địa chỉ: '+v.address+'</span>\
                        </div>\
                        <div class="line listings_description">\
                            <span>Công ty: '+v.company+'</span>\
                        </div>\
                        <div class="line listings_description">\
                            <div>Điện thoại: <a href="tel:'+v.phone+'">'+v.phone+'</a></div>\
                            <div>Email: <a href="maito:'+v.email+'">'+v.email+'</a></div>\
                        </div>\
                        <div class="line listings_description social-accounts">\
                            <a class="btn-social btn-facebook" href="' + v.social[0] + '"><i class="fa fa-facebook-square"></i></a>\
                            <a class="btn-social btn-youtube" href="' + v.social[1] + '"><i class="fa fa-youtube-square"></i></a\
                        </div>\
                    </div>\
                    <div class="clearfix"></div>\
                </div>';
                $('.v-user-properties').append(html);
                $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-20);
            })
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    })
}

$(document).ready(function () {
    loadData(kName, kCompany);
    $('#searchsale').submit(function () {
        var name = $(this).find('[name="name"]').val();
        var company = $(this).find('[name="company"]').val();
        history.pushState('search', 'Tìm kiếm sales', location.href+'?name='+name+'&company='+company);
        loadData(name, company);
        return false
    })
})