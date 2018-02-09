$(document).ready(function () {
    $('#searchsale').submit(function () {
        $.ajax({
            url: API_URL+'/search/timkiemsale/',
            type: 'post',
            data: $(this).serialize(),
            success: function (response) {
                if (!response) {
                    response = {
                        "data": [
                            {
                                "id": "B892FB32E4",
                                "username": "",
                                "password": "",
                                "name": "bach hiep",
                                "email": "bachngochiep@gmail.com",
                                "phone": "0917217271",
                                "address": "Hà Nội",
                                "company": "BHomes",
                                "sex": true,
                                "birthday": "1995-01-01",
                                "coin": "",
                                "status": "",
                                "rank": "",
                                "details": "Là một nhà môi giới chuyên nghiệp có uy tín. Tôi luôn cố gắng để đem đến cho khách hàng dịch vụ tốt nhất và BDS uy tín.",
                                "avatar": "http://mappy.com.vn/media/profile/2018/2/6/B892FB32E4.png"
                            }
                        ]
                    }
                }
                console.log(response);
                data = response.data;
                $('#search_total').html('('+data.length+')');
                $.each(data, function (i, v) {
                    html = '<div class="v-user-property line">\
                        <div class="listings_image" style="width:70px;height:70px">\
                            <img class="image_url" src="'+v.avatar+'">\
                        </div>\
                        <div class="listings_info col cols13">\
			                <div class="line listings_title" style="line-height:17px!important">\
				                <a style="font-size:15px!important;line-height:17px!important" target="_blank" href="'+MAIN_URL+'/user/'+v.username+'">'+v.title+'</a>\
			                </div>\
                            <div class="line">\
                                <span class="listings_address" style="font-size:14px">Công ty: '+v.company+'</span>\
                            </div>\
                            <div class="line listings_description">\
                                <div class="listings_area">D.tích: <span>'+v.area+'</span>m2</div>\
                                <div class="listings_room">Phòng ngủ: <span>'+v.sophongngu+'</span></div>\
                                <div class="listings_direction">Hướng: <span>'+v.huong+'</span></div>\
                            </div>\
                        </div>\
                        <div class="clearfix"></div>\
                    </div>';
                    $('.v-user-properties').append(html);
                    $('.listings_info').width($('.v-user-property').width()-$('.listings_image').width()-20);
                    $('.listings_description,.listings_description *').css('font-size', 14)
                })
            },
            error: function (a, b, c) {
                __handle_error(a)
            }
        })
        return false
    })
})