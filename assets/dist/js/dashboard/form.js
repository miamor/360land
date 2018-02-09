var placeLatLng = { lat: 18.02, lng: 105.86 };

var options = { district: '' };
var c_city = district = null;
var cityList = [];

var splitURL = location.href.split('/');
var nodeID = location.href.split('id=')[1];


var template = '<div class="preview"><div class="remove-thumb"><i class="fa fa-times"></i></div><span class="imageHolder"><img /><span class="uploaded"></span></span><div class="progressHolder"><div class="progress"></div></div></div>';

function createImageReal (src, div, paramname) {
    if (src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        var preview = $(template),
            image = $('img', preview);

        image.width = 100;
        image.height = 100;

        image.attr('src', src);

        $(div).find('.message').hide();
        preview.appendTo(div);
        preview.addClass('done');

        $(div).find('.remove-thumb').each(function () {
            $(this).click(function (event) {
                event.stopPropagation();
                $(this).parent('.preview').hide();
                if (!$(div).find('.preview').length) {
                    $(message).show()
                }
                $('[name="'+paramname+'"]').val($('[name="'+paramname+'"]').val().replace(src, ''));
            });
        })
    }
}

function createImage(file, div) {
    var preview = $(template),
        image = $('img', preview);

    var reader = new FileReader();

    image.width = 100;
    image.height = 100;

    reader.onload = function (e) {
        image.attr('src', e.target.result);
    };
    reader.readAsDataURL(file);

    $(div).find('.message').hide();
    preview.appendTo(div);

    $(div).find('.remove-thumb').each(function () {
        $(this).click(function (event) {
            event.stopPropagation();
            $(this).parent('.preview').hide();
            if (!$(div).find('.preview').length) {
                $(message).show()
            }
        });
    })

    // Associating a preview container
    // with the file, using jQuery's $.data():
    $.data(file, preview);
}

errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"];


(function ($) {
    FormGen = function (submitType, isNewNode) {
        var v = $(this).attr('id');
        var $thismap = this;
        if (isNewNode) {
            this.map = null;
            this.geocoder = new google.maps.Geocoder();
            this.marker = new google.maps.Marker();
            this.infowindow = new google.maps.InfoWindow();
            this.infowindowContent = document.getElementById('infowindow-content');
        }

        this.initialize = function () {
            if (submitType == 'edit') {
                this.loadDataNode()
            }

            if (isNewNode) {
                if (submitType == 'add') {
                    $('#anh360').val('');
                    $('#thumbs').val('');
                    $('#panorama_image').val('');    
                }
    
                $thismap.uploadThumbs();
                $thismap.uploadPanorama();
                $thismap.upload360();
            }

            if (isNewNode) {
                this.map = new google.maps.Map(document.getElementById('map_select'), {
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

                var input = document.getElementById('address');
                var options = {
                    //types: ['(cities)'],
                    componentRestrictions: { country: 'vn' }
                };
                var autocomplete = new google.maps.places.Autocomplete(input, options);
                autocomplete.bindTo('bounds', $thismap.map);

                google.maps.event.addDomListener(input, 'keydown', function (event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                });

                autocomplete.addListener('place_changed', function () {
                    $thismap.infowindow.close();
                    $thismap.marker.setVisible(false);
                    var place = autocomplete.getPlace();

                    $thismap.changeAdrCallback(place);
                });

                google.maps.event.addListener($thismap.map, 'click', function (event) {
                    $thismap.addMarker(event.latLng);
                });
            } else {
                $('[name="type_action"][value="2"]').parent('label').html($('[name="type_action"][value="2"]').parent('label').html().replace('Bán', 'Tìm mua'));
                $('[name="type_action"][value="1"]').parent('label').html($('[name="type_action"][value="1"]').parent('label').html().replace('Cho thuê', 'Tìm thuê'));
                //$('[name="type_action"]').radio();
            }

            var wi = $('.form-price').find('[class*="col-"]:not(".control-label")').width() - $('.form-price #price_giatri').width() - 30;
            $('#pricefrom_donvi, #price_donvi').css({
                width: wi,
                'margin-left': 5
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

            this.autocompleteProject();

            $('.type_bds').change(function () {
                var type = $(this).val();
                $('.customshow').hide();
                $('.' + type).not('.form-proj').show();
                if ($('#city').val() && $('#city').val() != -1 && $('#district').val() && $('#district').val() != -1) {
                    $('.' + type + '.form-proj').show();
                }
                $('#type').val($(this).val());
                if ($('.' + type + ' #address').length) {
                    $('.' + type + ' #address').attr({
                        'placeholder': 'Địa chỉ cụ thể *',
                        'isRequired': 1
                    })
                }
            });
            $('[name="type_action"]').change(function () {
                var a = $(this).val();
                $('.type_bds').hide();
                $('.type_bds#type' + a).show();
                $('#type').val('');
                $('#type' + a).val('CN');
            });

            $('.rank-one-select').click(function () {
                var r = $(this).attr('attr-rank');
                $('.rank-one-select').removeClass('active');
                $(this).addClass('active');
                $('#rank').val(r);
            });

            $('#district').change(function () {
                if (!$('#address').val().length) {
                    // get lat and lng based on district
                    var placeTxt = $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Vietnam';
                    console.log(placeTxt);
                    if ($('#type').val() && $('#type').val() != 'CN') {
                        $('.' + $('#type').val() + '.form-proj').show();
                    }
                    if (newNode) {
                        $thismap.infowindow.close();
                        $thismap.marker.setVisible(false);
                        var place = $thismap.geocodeaddress(placeTxt);
                    }
                }
            });

            this.submitForm();
        }

        this.submitForm = function () {
            $thismap.submitNode()
        }


        this.addMarker = function (location) {
            $thismap.marker.setPosition(location);
            $thismap.marker.setVisible(true);
            $('#latitude').val(location.lat());
            $('#longitude').val(location.lng());
        }

        this.autocompleteProject = function () {
            $('#tenduan').keydown(function () {
                k = $(this).attr('name').split('town')[1];
                $dr = $('#tenduan').next('.ville-dropdown');
                loading = '<div class="spinner loading-sending"><div></div><div></div><div></div></div>';
                if (!$dr.length) $('#tenduan').after('<div class="ville-dropdown">' + loading + '</div>');
                else $dr.show().html(loading);
            }).donetyping(function () {
                $dr = $('#tenduan').next('.ville-dropdown');
                val = $(this).val();
                //console.log(val);
                if (!val.length) {
                    $dr.hide().html('');
                } else {
                    _city = $('#city option:selected').text();
                    if (_city == 'Hà Nội') _city = 'Hà Nội'
                    searchData = {
                        input: val,
                        tinh: _city,
                        huyen: $('#district option:selected').text()
                    };
                    console.log(searchData);
                    $.ajax({
                        url: API_URL + '/search/duanbasic/',
                        type: 'post',
                        data: searchData,
                        success: function (data) {
                            $dr.show().html('');
                            if (data.message && data.message.indexOf('No duan') > -1) {
                                $dr.html('<div class="ville-empty">Không có kết quả cho <b>' + val + '</b></div>');
                            } else {
                                $.each(data, function (i, d) {
                                    var vO = '<div class="sthumb"><img src="' + d.thumb + '"/></div> <div class="stit"><b>' + d.name + '</b> <div class="sadr"><i class="fa fa-map-marker"></i> ' + d.address + '</div></div><div class="clearfix"></div>';
                                    $dr.append('<div class="ville-one" id="v' + i + '">' + vO + '</div>');
                                    $('.ville-one#v' + i).click(function () {
                                        console.log(vO);
                                        $('#tenduan').val(d.name);
                                        $('#duanid').val(d.id);
                                        $('#address').val(d.address);
                                        $('#latitude').val(d.latitude);
                                        $('#longitude').val(d.longitude);
                                        $dr.remove()
                                    })
                                })
                            }
                        },
                        error: function (a, b, c) {
                            __handle_error(a);
                        }
                    })
                }
            });
        }


        this.upload360 = function () {
            var dropbox = $('#dropbox_360'),
                message = $('.message', dropbox);

            dropbox.UploadImages({
                // The name of the $_FILES entry:
                paramname: 'anh_360',

                maxfiles: 25,
                maxfilesize: 5,
                url: API_URL + '/manager_user/uploadanh360/',
                token: __token,
                dragable: true,

                uploadFinished: function (i, file, response) {
                    $.data(file).addClass('done');
                    // response is the JSON object that post_file.php returns
                    //console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.data)
                    } else {
                        img = response.data;

                        var $thisImgHolder = $($.data(file)[0]);
                        if ($thisImgHolder.is(':hidden')) {
                            if ($('#anh360').val().indexOf(img) > -1) {
                                console.log('remove from anh360 ' + img);
                                $('#anh360').val($('#anh360').val().replace(img + ',', ''));
                            }
                        } else {
                            if ($('#anh360').val().indexOf(img) == -1) {
                                console.log('add to anh360 ' + img);
                                $('#anh360').val($('#anh360').val() + img + ',');
                            }
                        }
                        $thisImgHolder.find('.remove-thumb').click(function (event) {
                            event.stopPropagation();
                            $('#anh360').val($('#anh360').val().replace(img + ',', ''));
                            $thisImgHolder.remove();
                            if (!$(dropbox).find('.preview').length) {
                                $(message).show()
                            }
                        })
                    }
                },

                error: function (err, file) {
                    console.log(err);
                    switch (err) {
                        case 'BrowserNotSupported':
                            mtip('', 'error', '', 'Your browser does not support HTML5 file uploads!');
                            break;
                        case 'TooManyFiles':
                            mtip('', 'error', '', 'Too many files!');
                            break;
                        case 'FileTooLarge':
                            mtip('', 'error', '', file.name + ' is too large!.');
                            break;
                        default:
                            break;
                    }
                },

                // Called before each upload is started
                beforeEach: function (file) {
                    if (!file.type.match(/^image\//)) {
                        alert('Only images are allowed!');
                        return false;
                    }
                },

                uploadStarted: function (i, file, len) {
                    createImage(file, dropbox);
                },

                progressUpdated: function (i, file, progress) {
                    $.data(file).find('.progress').width(progress);
                }
            });
        }

        this.uploadThumbs = function () {
            console.log('up thumbs called');
            var dropbox = $('#dropbox'),
                message = $('.message', dropbox);

            dropbox.UploadImages({
                // The name of the $_FILES entry:
                paramname: 'thumbnail',

                maxfiles: 25,
                maxfilesize: 5,
                url: API_URL + '/manager_user/uploadthumbnail/',
                token: __token,
                dragable: true,

                uploadFinished: function (i, file, response) {
                    $.data(file).addClass('done');
                    // response is the JSON object that post_file.php returns
                    //console.log(response);
                    console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.data)
                    } else {
                        img = response.data;
                        //console.log($('#thumbs').val());

                        var $thisImgHolder = $($.data(file)[0]);
                        if ($thisImgHolder.is(':hidden')) {
                            if ($('#thumbs').val().indexOf(img) > -1) {
                                console.log('remove from thumb ' + img);
                                $('#thumbs').val($('#thumbs').val().replace(img + ',', ''));
                            }
                        } else {
                            if ($('#thumbs').val().indexOf(img) == -1) {
                                console.log('add to thumb ' + img);
                                $('#thumbs').val($('#thumbs').val() + img + ',');
                            }
                        }
                        $thisImgHolder.find('.remove-thumb').click(function (event) {
                            event.stopPropagation();
                            $('#thumbs').val($('#thumbs').val().replace(img + ',', ''));
                            $thisImgHolder.remove();
                            if (!$(dropbox).find('.preview').length) {
                                $(message).show()
                            }
                        })
                    }
                },

                error: function (err, file) {
                    console.log(err);
                    switch (err) {
                        case 'BrowserNotSupported':
                            mtip('', 'error', '', 'Your browser does not support HTML5 file uploads!');
                            break;
                        case 'TooManyFiles':
                            mtip('', 'error', '', 'Too many files!');
                            break;
                        case 'FileTooLarge':
                            mtip('', 'error', '', file.name + ' is too large!.');
                            break;
                        default:
                            break;
                    }
                },

                // Called before each upload is started
                beforeEach: function (file) {
                    if (!file.type.match(/^image\//)) {
                        alert('Only images are allowed!');
                        return false;
                    }
                },

                uploadStarted: function (i, file, len) {
                    createImage(file, dropbox);
                },

                progressUpdated: function (i, file, progress) {
                    $.data(file).find('.progress').width(progress);
                }
            });
        }

        this.uploadPanorama = function () {
            var dropbox = $('#dropbox_pano'),
                message = $('.message', dropbox);

            dropbox.UploadImages({
                // The name of the $_FILES entry:
                paramname: 'panorama',

                maxfiles: 1,
                maxfilesize: 8,
                url: API_URL + '/manager_user/uploadpanorama/',
                token: __token,
                dragable: false,

                uploadFinished: function (i, file, response) {
                    $.data(file).addClass('done');
                    // response is the JSON object that post_file.php returns
                    console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.data)
                    } else {
                        img = response.data;
                        $('#panorama_image').val(img);

                        var $thisImgHolder = $($.data(file)[0]);
                        $thisImgHolder.find('.remove-thumb').click(function (event) {
                            event.stopPropagation();
                            $('#panorama_image').val('');
                            $thisImgHolder.remove();
                        })
                    }
                },

                error: function (err, file) {
                    console.log(err);
                    switch (err) {
                        case 'BrowserNotSupported':
                            mtip('', 'error', '', 'Your browser does not support HTML5 file uploads!');
                            break;
                        case 'TooManyFiles':
                            mtip('', 'error', '', '');
                            break;
                        case 'FileTooLarge':
                            mtip('', 'error', '', file.name + ' is too large!.');
                            break;
                        default:
                            break;
                    }
                },

                // Called before each upload is started
                beforeEach: function (file) {
                    if (!file.type.match(/^image\//)) {
                        alert('Only images are allowed!');
                        return false;
                    }
                },

                uploadStarted: function (i, file, len) {
                    createImage(file, dropbox);
                },

                progressUpdated: function (i, file, progress) {
                    $.data(file).find('.progress').width(progress);
                }
            })
        }


        this.submitNode = function () {
            $('#' + v).submit(function () {
                var ok = true;

                var a = $('[name="type_action"]').val();
                $('#type').val($('#type' + a).val());

                var typeBDS = $('#type').val();

                if (!typeBDS || typeBDS == 'CN') {
                    console.log('Missing parameters (type)');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }

                if (submitType == 'add') {
                    $('[attr-required="1"]').not('.form-adr,.form-price,.form-type, .form-time').each(function () {
                        var val = $(this).find('input,select,textarea').val();
                        var $fgr = $(this).closest('.form-group');
                        var isCustomField = $fgr.is('.customshow');
                        if ((!isCustomField || (typeBDS && isCustomField && $fgr.is('.' + typeBDS))
                        ) && (!val || val == "CN")
                        ) {
                            console.log('Missing parameters');
                            console.log($fgr);
                            console.log($fgr.html);
                            mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                            ok = false;
                            return false;
                        }
                    });

                    if (ok && isNewNode) {
                        if (!$('#city').val() || !$('#district').val()) {
                            console.log('Missing parameters (city || district)');
                            mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc (city/district)');
                            ok = false;
                            return false;
                        }
                        if ($('.' + typeBDS).find('#address[isRequired="1"]').length && !$('#address').val()) {
                            console.log('Missing parameters (address)');
                            //mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                            mtip('', 'error', '', 'Với loại bất động sản <b>' + $('.type_bds#type' + $('[name="type_action"]:checked').val()).find('option:selected').text() + '</b>, trường <b>Địa chỉ cụ thể</b> là bắt buộc.');
                            ok = false;
                            return false;
                        }
                    }

                    if (isNewNode) {
                        if (($('#rank').val() == 1 && __userInfo.coin < 20) || __userInfo.coin < 10) {
                            ok = false;
                            console.log('Not enough money');
                            mtip('', 'error', '', 'Tài khoản của bạn không đủ để đăng tin bài thuộc gói này');
                        }
                    }

                    if (isNewNode && !$('#price_giatri').val()) {
                        ok = false;
                        console.log('Missing parameters (price_giatri)');
                        mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc (price_giatri)');
                    }

                    if (isNewNode) {
                        if (!$('#timefrom').val() || !$('#timeto').val()) {
                            ok = false;
                            console.log('Missing parameters (timefrom || timeto)');
                            mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc (price_giatri)');
                        } else {
                            var today = new Date();
                            today.setHours(0, 0, 0, 0);
                            var timefrom = new Date($('#timefrom').val()).getTime();
                            var timeto = new Date($('#timeto').val()).getTime();
                            if (timefrom < today) {
                                ok = false;
                                console.log('timefrom < today');
                                mtip('', 'error', '', 'Thời gian không thể bắt đầu từ trước ngày hôm nay');
                            } else if (timefrom > timeto) {
                                ok = false;
                                console.log('timefrom > timeto');
                                mtip('', 'error', '', 'Thời gian không hợp lệ (thời gian kết thúc < thời gian bắt đầu)');
                            }
                        }

                        if (!$('#latitude').val() || !$('#longitude').val()) {
                            ok = false;
                            console.log('lat/lng missing');
                            mtip('', 'error', '', 'Không tìm thấy vị trí địa điểm! Vui lòng chọn vị trí trên bản đồ bằng tay!');
                        }
                    }
                }

                if (isNewNode) {
                    if ($('#thumbs').val()) {
                        console.log($('#thumbs').val());
                        console.log($('#thumbs').val().endsWith(','));
                        if ($('#thumbs').val().endsWith(',')) {
                            //var n = $('#thumbs').val().lastIndexOf(",");
                            var len = $('#thumbs').val().length - 1;
                            $('#thumbs').val($('#thumbs').val().substring(0, len))
                        }
                    }
                }

                var postData = objectifyForm($(this).serializeArray());

                //console.log(postData);

                postData.price = postData.price_giatri;
                if (postData.price_donvi == 'm') {
                    postData.price = postData.price_giatri / 1000;
                }

                if (submitType == 'add') {
                    if (isNewNode) {
                        postData.timefrom += ' 00:00:00';
                        postData.timeto += ' 00:00:00';
                    } else {
                        postData.timefrom = postData.timeto = new Date().toISOString().replace(/T.*/,'')+' 00:00:00';
                    }
                }

                postData.vip = parseInt(postData.rank);
                delete postData['rank'];
                //postData.rank = parseInt(postData.rank);

                if (!postData.area) postData.area = 0;
                postData.area = parseInt(postData.area);
                if (!postData.sophongngu) postData.sophongngu = 0;
                postData.sophongngu = parseInt(postData.sophongngu);

                if (!postData.rongduong) postData.rongduong = 0;
                else postData.rongduong = parseInt(postData.rongduong);
                if (!postData.rongtien) postData.rongtien = 0;
                else postData.rongtien = parseInt(postData.rongtien);
                if (!postData.tang) postData.tang = 0;
                else postData.tang = parseInt(postData.tang);

                postData.latitude = (postData.latitude ? parseFloat(postData.latitude) : 0);
                postData.longitude = (postData.latitude ? parseFloat(postData.longitude) : 0);

                postData.tinh = $('#city option:selected').text();
                postData.huyen = $('#district option:selected').text();

                console.log(postData);
                console.log(JSON.stringify(postData));

                if (ok) {
                    if (submitType == 'add') $thismap.addNode(postData)
                    else if (submitType == 'edit') $thismap.editNode(postData)
                } else {
                    console.log('not ok~');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }

                return false
            })
        }

        this.addNode = function (postData) {
            console.log('ajax post');
            //var postData = $(this).serialize();
            $.ajax({
                url: (isNewNode ? API_URL + '/manager_user/nodes/' : API_URL+'/manager_user/dangbaitimkiem/'),
                type: 'post',
                data: postData,
                datatype: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    if (response.status == 'error') {
                        //__handle_error()
                        mtip('', 'error', '', response.data);
                    } else {
                        mtip('', 'success', '', 'Tin bài đã được đăng thành công');
                        if (isNewNode) location.href = MAIN_URL + '/dashboard/node/waiting';
                        else location.href = MAIN_URL + '/dashboard/node/search';
                    }
                },
                error: function (a, b, c) {
                    __handle_error(a)
                }
            })
        }

        this.editNode = function (postData) {
            console.log('ajax post');
            //var postData = $(this).serialize();
            $.ajax({
                url: API_URL + '/manager_user/nodes/' + nodeID + '/',
                type: 'put',
                data: postData,
                datatype: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    if (response.status == 'error') {
                        //__handle_error()
                        mtip('', 'error', '', response.data);
                    } else {
                        mtip('', 'success', '', 'Tin bài đã được cập nhật thành công');
                    }
                },
                error: function (a, b, c) {
                    __handle_error(a)
                }
            })
        }


        this.changeCityCallback = function () {
            var f = $('form.place-add');
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i].code == c_city) {
                    district = cityList[i].district;
                    for (var u = 0; u < district.length; u++) {
                        district[u].order = district[u].id;
                        if (c_city == 'HN') {
                            if (district[u].id == 718)
                                district[u].order = 15;
                            else if (district[u].id > 15)
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
            f.find('#district').html('<option value="-1">--Chọn Quận/Huyện *--</option>' + options.district);
        }

        this.geocodeaddress = function (address) {
            //var address = this.input.place_search.value;
            this.geocoder.geocode({ 'address': address }, function (results, status) {
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

        this.loadDataNode = function () {
            $.ajax({
                url: API_URL + '/user/chitietnode/',
                type: 'post',
                data: { id: nodeID },
                success: function (response) {
                    console.log(response);

                    if ( (response.typenode == true && !isNewNode) || (response.typenode == false && isNewNode) ) {
                        $('#'+v).html('<div class="alerts alert-error">Sai URL</div>');
                        return false
                    }

                    if (isNewNode) {
                        if (response.thumbs == null) response.thumbs = '';
                        else response.thumbs = response.thumbs+',';
                        if (response.anh360 == null) response.anh360 = '';
                        else response.anh360 = response.anh360+',';
                        if (response.panorama_image == null) response.panorama_image = '';
                    }

                    $('.rank-select,.form-time').hide();

                    response.timefrom = response.timefrom.split('T')[0];
                    response.timeto = response.timeto.split('T')[0];

                    $('.node_title').html(response.title);
                    for (var key in response) {
                        $('input[name="' + key + '"], .form-group:not(".form-adr") select[name="' + key + '"], textarea[name="' + key + '"]').not('[type="file"],[name="typenode"]').val(response[key])
                    }
                    // get typeid
                    typeid = parseInt(response.type.split('typereal')[1]);
                    if (typeid < 11) { // show type2
                        $('#type2').show().val(response.type);
                        $('#type1').hide()
                    } else { // shwo type1
                        $('#type1').show().val(response.type);
                        $('#type2').hide()
                    }

                    $('.customshow.' + response.type).show();

                    //$('.form-type_action input, .form-type select, .form-adr select, .form-adr input, [name="title"]').attr('disabled', true);
                    $('.form-group input, .form-group select').not('[name="panorama_image"],[name="video"],[type="file"]').attr('disabled', true);
                    $('#'+v).find('label.radio').addClass('disabled');

                    $('.form-type').find('input').attr('readonly', true);

                    $('#price_giatri').val(response.price);
                    $('#price_donvi').val('b');

                    thumbsAr = response.thumbs.split(',');
                    $.each(thumbsAr, function (i, v) {
                        createImageReal(v, $('#dropbox'), 'thumbs');
                    });
                    createImageReal(response.panorama_image, $('#dropbox_pano'), 'panorama_image');
                    img360Ar = response.anh360.split(',');
                    $.each(img360Ar, function (i, v) {
                        createImageReal(v, $('#dropbox_360'), 'anh360');
                    });

                    $('#city option').each(function () {
                        // if ($(this).text() == response.tinh)
                        //if ('Hà Nội' == response.tinh) {
                        if ($(this).text() == response.tinh || (response.tinh == 'Hà Nội' && $(this).attr('value') == 'HN')) {
                            $('#city').val($(this).attr('value'));
                            c_city = $('#city').val();
                            $thismap.changeCityCallback();

                            $('#district option').each(function () {
                                if ($(this).text() == response.huyen) {
                                    $('#district').val($(this).attr('value'));
                                }
                            })
                        }
                    })
                },
                error: function (a, b, c) {
                    console.log(a);
                }
            })
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));


$(document).ready(function () {
    if (typeof cityListOther1 != 'undefined') cityList = $.merge(cityList, cityListOther1);
    if (typeof cityListOTher2 != 'undefined') cityList = $.merge(cityList, cityListOther2);
    if (typeof cityListOTher3 != 'undefined') cityList = $.merge(cityList, cityListOther3);
    if (typeof cityListOTher4 != 'undefined') cityList = $.merge(cityList, cityListOther4);
})
