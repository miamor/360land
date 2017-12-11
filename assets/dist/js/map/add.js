var placeLatLng = {lat: 18.02, lng: 105.86};

var newNode = (window.location.href.indexOf('type=search') > -1 ? false : true);

var options = {district: ''};
var c_city = district = null;
var cityList = [];


(function($) {
    AddNode = function(o, p, q, r, s) {
        var v = $(this).attr('id');
        var $thismap = this;
        this.map = null;
        this.geocoder = new google.maps.Geocoder();
        this.marker = new google.maps.Marker();
        this.infowindow = new google.maps.InfoWindow();
        this.infowindowContent = document.getElementById('infowindow-content');

        this.initialize = function () {
            this.map = new google.maps.Map(document.getElementById(v), {
                zoom: 5,
                mapTypeControl: false,
                center: placeLatLng
            });

            google.maps.event.addListenerOnce($thismap.map, 'idle', function () {
                $('.map_select').hide();
            });

            $thismap.infowindow.setContent($thismap.infowindowContent);

            $thismap.marker.setMap($thismap.map);
            $thismap.marker.setVisible(false);

            var input = document.getElementById('details_address');
            var options = {
                //types: ['(cities)'],
                componentRestrictions: {country: 'vn'}
            };
            var autocomplete = new google.maps.places.Autocomplete(input, options);
            autocomplete.bindTo('bounds', $thismap.map);

            google.maps.event.addDomListener(input, 'keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });

            autocomplete.addListener('place_changed', function() {
                $thismap.infowindow.close();
                $thismap.marker.setVisible(false);
                var place = autocomplete.getPlace();

                $thismap.changeAdrCallback(place);
            });


            $('#city').change(function () {
                c_city = $(this).val();
                $thismap.changeCityCallback();
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

            $('#tenduan').keydown(function () {
                k = $(this).attr('name').split('town')[1];
                $dr = $('#tenduan').next('.ville-dropdown');
                loading = '<div class="spinner loading-sending"><div></div><div></div><div></div></div>';
                if (!$dr.length) $('#tenduan').after('<div class="ville-dropdown">'+loading+'</div>');
                else $dr.show().html(loading);
            }).donetyping(function () {
                $dr = $('#tenduan').next('.ville-dropdown');
                val = $(this).val();
                if (!val.length) {
                    $dr.hide().html('');
                } else {
                    $.ajax({
            			url: API_URL+'/search/duanbasic/',
            			type: 'post',
            			data: {input: val},
            			success: function (data) {
                            $dr.show().html('');
                            if (data.message && data.message.indexOf('No duan') > -1) {
                                $dr.html('<div class="ville-empty">Không có kết quả cho <b>'+val+'</b></div>');
                            } else {
                                $.each(data, function (i, d) {
                    				var vO = '<div class="sthumb"><img src="'+d.thumb+'"/></div> <div class="stit"><b>'+d.name+'</b> <div class="sadr"><i class="fa fa-map-marker"></i> '+d.address+'</div></div><div class="clearfix"></div>';
                    				$dr.append('<div class="ville-one" id="v'+i+'">'+vO+'</div>');
                    				$('.ville-one#v'+i).click(function () {
                                        console.log(vO);
                                        $('#tenduan').val(d.name);
                                        $('#duanid').val(d.id);
                    					$dr.remove()
                    				})
                                })
                            }
                        }
                    })
                }
            });

            $('.type_bds').change(function () {
                var type = $(this).val();
                $('.customshow').hide();
                $('.'+type).show();
            });

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
            });

            $('#district').change(function () {
                if (!$('#details_address').val().length) {
                    // get lat and lng based on district
                    var placeTxt = $('#district option:selected').text()+', '+$('#city option:selected').text()+', Vietnam';
                    console.log(placeTxt);
                    $thismap.infowindow.close();
                    $thismap.marker.setVisible(false);
                    var place = $thismap.geocodeaddress(placeTxt);
                }
            });

            $('.place-add').submit(function () {
                var ok = true;
                $('[attr-required="1"]').not('.form-adr,.form-price,.form-type').each(function () {
                    var val = $(this).find('input,select,textarea').val();
                    var $fgr = $(this).closest('.form-group');
                    var isCustomField = $fgr.is('.customshow');
                    var typeBDS = $('#type').val();
                    if ( (!isCustomField || (typeBDS && isCustomField && $fgr.is('.'+typeBDS) )
                         ) && (!val || val == "CN")
                       ) {
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

                postData.timefrom = postData.timeto = new Date().toISOString().replace(/T.*/,'');

                //if (newNode) postData.timeto = postData.timeto.replace('%2F', '-');
                //else postData.timeto = postData.timefrom;

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
                            mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                        }
                    })
                } else {
                    console.log('not ok~');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
                return false
            })

        }


        this.changeCityCallback = function () {
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
            f.find('#district').html('<option value="-1">--Chọn Quận/Huyện *--</option>'+options.district);
        }

        this.geocodeaddress = function (address) {
            //var address = this.input.place_search.value;
            this.geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    $thismap.changeAdrCallback(results[0]);
                    return results[0]
                } else {
                    return false;
                }
            });
        }

        this.changeAdrCallback = function (place) {
            if (place && place != undefined) {
                if (!place.geometry) {
                  // User entered the name of a Place that was not suggested and
                  // pressed the Enter key, or the Place Details request failed.
                  window.alert("No details available for input: '" + place.name + "'");
                  return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    $thismap.map.fitBounds(place.geometry.viewport);
                } else {
                    $thismap.map.setCenter(place.geometry.location);
                    $thismap.map.setZoom(17);  // Why 17? Because it looks good.
                }
                $thismap.marker.setPosition(place.geometry.location);
                $thismap.marker.setVisible(true);

                $('#latitude').val(place.geometry.location.lat());
                $('#longitude').val(place.geometry.location.lng());

                var address = '';
                if (place.address_components) {
                  address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                  ].join(' ');
                }

                $thismap.infowindowContent.children['place-icon'].src = place.icon;
                $thismap.infowindowContent.children['place-name'].textContent = place.name;
                $thismap.infowindowContent.children['place-address'].textContent = address;
                $thismap.infowindow.open($thismap.map, $thismap.marker);
            } else {
                console.log('no place');
            }
        }

        return this;
    }
    $.fn.AddNode = AddNode
}(jQuery));


$(document).ready(function () {
    if (!__token) {
        $(".add-form-content").html('<div class="alerts alert-warning">Bạn phải <a href="'+MAIN_URL+'/login">đăng nhập</a> để đăng tin bài.</div>');
    } else {
        if (typeof cityListOther1 != 'undefined') cityList = $.merge(cityList, cityListOther1);
        if (typeof cityListOTher2 != 'undefined') cityList = $.merge(cityList, cityListOther2);
        if (typeof cityListOTher3 != 'undefined') cityList = $.merge(cityList, cityListOther3);
        if (typeof cityListOTher4 != 'undefined') cityList = $.merge(cityList, cityListOther4);

        var addNode = $('#map_select').AddNode();
        addNode.initialize();
    }
})
