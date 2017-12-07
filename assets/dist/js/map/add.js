var newNode = (window.location.href.indexOf('type=search') > -1 ? false : true);

var options = {district: ''};
var c_city = district = null;
var cityList = [];
function changeCityCallback () {
    var f = $('form.place-add');
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            district = cityList[i].district;
            for (var u = 0; u < district.length; u++) {
                district[u].order = district[u].id;
                if (city == 'HN') {
                    if (district[u].id == 718)
                        district[u].order = 15;
                    else if(district[u].id > 15)
                        district[u].order = district[u].id + 1;
                }
            }
            //district = district.sort(SortByOrder);
            break;
        }
    }
    options.district = '';
    if (district != null && district) {
        for (var i = 0; i < district.length; i++) {
            options.district += "<option value='" + district[i].id + "'>" + district[i].name + "</option>";
            street = district[i].street;
        }
    }
    f.find('#district').html('<option value="-1">--Chọn Quận/Huyện--</option>'+options.district);
}

$(document).ready(function () {
    if (!__token) {
        $(".place-add").html('<div class="alerts alert-warning">Bạn phải <a href="'+MAIN_URL+'/login">đăng nhập</a> để đăng tin bài.</div>');
    } else {
        if (typeof cityListOther1 != 'undefined') cityList = $.merge(cityList, cityListOther1);
        if (typeof cityListOTher2 != 'undefined') cityList = $.merge(cityList, cityListOther2);
        if (typeof cityListOTher3 != 'undefined') cityList = $.merge(cityList, cityListOther3);
        if (typeof cityListOTher4 != 'undefined') cityList = $.merge(cityList, cityListOther4);

        $('#city').change(function () {
            c_city = $(this).val();
            changeCityCallback();
        });

        $('[attr-required="1"]').each(function () {
            $(this).find('.control-label,.control-labels').append('<span class="required-mark text-danger bold">*</span>')
        });

        if (__userInfo) {
            $('.user-info-input').hide();
            $('#tenlienhe').val(__userInfo.name);
            $('#dienthoai').val(__userInfo.phone);
            $('#email').val(__userInfo.email);
        }

        if (newNode) {
            $('.rank-one-select').click(function () {
                var r = $(this).attr('attr-rank');
                $('.rank-one-select').removeClass('active');
                $(this).addClass('active');
                $('#rank').val(r);
            });
            $("#timeto").datepicker({
                dateFormat: "dd/mm/yy",
                minDate: new Date()
            });
        }

        $('[name="type_action"]').change(function () {
            var a = $(this).val();
            $('.type_bds').hide();
            $('.type_bds#type'+a).show();
            $('#type').val('');
            $('#type'+a).val('CN');
        })

        $('.place-add').submit(function () {
            var ok = true;
            $('[attr-required="1"]').not('.form-adr,.form-price,.form-type').each(function () {
                var val = $(this).find('input,select,textarea').val();
                if (!val || val == "CN") {
                    console.log('Missing parameters');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
            });
            if (ok) {
                if ( !$('#city').val() || !$('#district').val() ) {
                    console.log('Missing parameters (city || district)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
                if (!$('#details_address').val() && newNode) {
                    console.log('Missing parameters (details_address)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
            }

            var a = $('[name="type_action"]').val();
            $('#type').val($('#type'+a).val());
            if (newNode) {
                if (!$('#rank').val()) {
                    ok = false;
                    console.log('Missing parameters (rank)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
                if (!$('#type').val() || $('#type').val() == 'CN') {
                    ok = false;
                    console.log('Missing parameters (type)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
                if (!$('#price_giatri').val()) {
                    ok = false;
                    console.log('Missing parameters (price_giatri)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
            }


            var postData = {};
            e = $(this).serialize().split('&');
            $.each(e, function (i, v) {
                vk = v.split('=')[0];
                vl = v.split('=')[1];
                postData[vk] = vl;
            });
            postData.email = postData.email.replace('%40', '@');

            if (newNode) {
                postData.price = postData.price_giatri;
                if (postData.price_donvi == 'm') {
                    postData.price = postData.price_giatri/1000;
                }
            }

            postData.rank = parseInt(postData.rank);
            if (!postData.area) postData.area = 0;
            postData.area = parseInt(postData.area);
            if (!postData.sophongngu) postData.sophongngu = 0;
            postData.sophongngu = parseInt(postData.sophongngu);

            postData.latitude = parseFloat(postData.latitude);
            postData.longitude = parseFloat(postData.longitude);
            postData.timefrom = new Date().toISOString().replace(/T.*/,'');
            if (!newNode) {
                postData.timeto = postData.timefrom;
            }
            console.log(postData);
            console.log(JSON.stringify(postData));

            if (ok) {
                console.log('ajax post');
                //var postData = $(this).serialize();
                $.ajax({
                    url: API_URL+'/manager_user/nodes/',
                    type: 'post',
                    data: postData,
                    datatype: 'json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        console.log(response);
                        mtip('', 'success', '', 'Tin bài đã được đăng thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                        mtip('', 'error', '', 'Lỗi đăng tin bài! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    }
                })
            } else {
                console.log('not ok~');
                mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
            }
            return false
        })
    }
})
