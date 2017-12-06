var placeLatLng = {lat: 18.02, lng: 105.86};

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

$(function () {
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

    var ok = true;
    $('.place-add').submit(function () {
        $('[attr-required="1"]').not('.form-adr,.form-price').each(function () {
            var val = $(this).find('input,select,textarea').val();
            if (!val || val == "CN") {
                console.log('Missing parameters');
                ok = false;
                return false;
            }
        });
        if (ok) {
            if ( !$('#city').val() || !$('#district').val() || !$('#price_donvi').val() ) {
                console.log('Missing parameters (2)');
                ok = false;
                return false;
            }
            if (!$('#details_address').val() && newNode) {
                console.log('Missing parameters (details_address)');
                ok = false;
                return false;
            }
        }
        if (ok) {
            console.log('ajax post');
            var postData = $(this).serialize();
            console.log(postData);
            $.ajax({
                url: API_URL+'/manager/realestatenode/',
                type: 'post',
                data: postData,
                success: function (response) {
                    console.log(response);
                },
                error: function (a, b, c) {
                    console.log(a);
                }
            })
        }
        return false
    })
})
