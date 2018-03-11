var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var listType = urlAr[urlAr.length - 1].split(/\?|\#/)[0];

(function ($) {
    ListGen = function () {
        var url = API_URL + '/manager_user/nodes/';
        if (listType == 'hethan') url = API_URL + '/manager_user/nodefalse/';
        if (listType == 'waiting') url = API_URL + '/manager_user/nodewait/';
        if (listType == 'search') url = API_URL + '/manager_user/danhsachtimkiem/';
        var $div = $(this);
        //var $div = $('.v-user-properties');
        $thisList = this;

        this.initialize = function () {
            $div.html('');
            $.ajax({
                url: url,
                type: 'get',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    if (response.status == 'error') {

                    } else {
                        $('.v-user-properties-total').html('(' + response.data.length + ')');
                        if (response.data.length == 0) {
                            $thisList.html('Không có bài đăng nào')
                        }
                        else {
                            $.each(response.data, function (i, v) {
                                $thisList.appendList(v);
                            });
                        }
                    }
                },
                error: function (a, b, c) {
                    console.log(a);
                }
            });
        }

        this.appendList = function (v) {
            v.typeid = parseInt(v.type.split('typereal')[1]);
            if (v.thumbs) v.thumbs = v.thumbs.split(',');
            v.avatar = (v.thumbs ? v.thumbs[0] : MAIN_URL + '/assets/img/noimage.png');
            if (v.price < 1) v.priceTxt = v.price * 100 + ' triệu';
            else v.priceTxt = v.price + ' tỷ';

            html = '<div class="v-user-property line" attr-id="' + v.id + '">';
            if (listType != 'waiting') {
                html += '<div class="listings_rank mbs prl col cols6">\
                <strong>'+ v.rank + '</strong>\
                <a href="#" onclick="javascript:__listGen.openRefreshForm(\''+ v.id + '\'); return false" class="btn btn-success">Refresh</a>\
            </div>';
            }
            html += '<div class="listings_image mbs prl col cols6">\
                <img class="image_url" src="'+ v.avatar + '">\
                <div class="listings_price col cols5 lastCol h4 pts typeEmphasize">\
                    $'+ v.priceTxt + '\
                </div>\
            </div>\
            <div class="listings_info col cols13">\
                <div class="line listings_title h4 mbn typeEmphasize"">';
            
            if (listType == 'hethan') {
                html += '<a href="#" onclick="javascript:return false">'+ v.title + '</a>';
            }
            else if (listType == 'waiting') {
                html += '<a href="#" onclick="javascript:return false">'+ v.title + '</a>';
            }
            else {
                html += '<a target="_blank" href="'+ MAIN_URL + '#ptype=&cat=&city=CN&district=CN&area=CN&price=-1&ward=CN&street=CN&room=&direction=CN&isProject=0&place_search=&points=&zoom=13&center=21.0193996429443:105.94985198974598&page=0&product=' + v.id + '&isShowUtil=0&utilArea=&searchtype=0&details=1&fromProject=0">' + v.title + '</a>';
            }

            html += '</div>\
                <div class="line">\
                    <span class="listings_address"><i class="fa fa-map-marker"></i> '+ v.address + '</span>\
                </div>\
                <div class="line listings_description">\
                    <div class="listings_area">D.tích: <span>'+ v.area + '</span>m2</div>\
                    <div class="listings_room">Phòng ngủ: <span>'+ v.sophongngu + '</span></div>\
                    <div class="listings_direction">Hướng: <span>'+ v.huong + '</span></div>';
            if (v.type == 'typereal1' || v.type == 'typereal11') {
                html += ' <div class="v-place-more-one v-place-tang" style="display: inline-block;">Tầng: <span>' + v.tang + '</span></div>';
            } else {
                html += ' <div class="v-place-more-one v-place-tang" style="display: inline-block;">Số tầng: <span>' + v.tang + '</span></div>';
                html += ' <div class="v-place-more-one v-place-rongtien" style="display: inline-block;">Chiều rộng mặt tiền: <span>' + v.rongtien + '</span></div>\
            <div class="v-place-more-one v-place-rongduong" style="display: inline-block;">Chiều rộng mặt đường: <span>'+ v.rongduong + '</span></div>';
            }
            /*html += ' <div class="listings_area">Vip: <span class="bold">'+(v.vip == 1 ? 'Có' : 'Không')+'</span></div>\
             <div class="listings_room">Loại: <span>'+typeRealEstate[v.type]+'</span></div>';*/
            html += '</div>\
                <div class="listings_time">';
            if (v.vip == 1) html += '<div class="line mts listings_type"><strong class="label label-warning">VIP</strong></div>';
            html += '<i class="fa fa-clock-o"></i> <time class="timefrom">' + v.timefrom.split('T')[0].split('-').reverse().join('-') + '</time> đến <time class="timeto">' + v.timeto.split('T')[0].split('-').reverse().join('-') + '</time></div>';
            /*html += '<div class="line mts listings_type">\
                        '+(v.type_action == 1 ? '<strong class="label label-success">Đang bán</strong>' : '<strong class="label label-info">Cho thuê</strong>')+'\
                    </div>\
                    <div class="line mts listings_edit">\
                        <a class="text-info" href="'+location.href.trim()+'/node/'+v.id+'" title="Sửa bài đăng"><i class="fa fa-pencil"></i></a>\
                    </div>';*/
            if (v.typeid < 11) html += '<div class="line mts listings_type"><strong class="label label-success">Đang bán</strong></div>';
            else html += '<div class="line mts listings_type"><strong class="label label-info">Cho thuê</strong></div>';
            if (v.vip == 1) html += '<div class="line mts listings_type"><strong class="label label-warning">VIP</strong></div>';
            html += '<div class="line mts listings_edit">';
            //if (listType == 'search') html += '<a class="text-info" href="'+ MAIN_URL + '/dashboard/node?mode=edit&type=search&id=' + v.id + '" title="Sửa bài đăng"><i class="fa fa-pencil"></i></a>';
            if (listType != 'search') html += '<a class="text-info" href="'+ MAIN_URL + '/dashboard/node?mode=edit&type=node&id=' + v.id + '" title="Sửa bài đăng"><i class="fa fa-pencil"></i></a>';
            html += '</div>\
                <div class="line mts listings_delete">\
                    <a class="text-danger" href="javascript:__listGen.del(\''+ v.id + '\')" title="Xóa bài đăng"><i class="fa fa-trash"></i></a>\
                </div>\
            </div>\
            <div class="clearfix"></div>\
        </div>';
            $div.append(html);
            $('.listings_info').width($('.v-user-property').width() - $('.listings_image').width() - $('.listings_rank').width() - 40);
        }

        this.del = function (itemID) {
            $delDiv = $('.v-user-property[attr-id="' + itemID + '"]');
            console.log('del ' + itemID + ' called!');
            var title = $delDiv.find('.listings_title a').text();
            if (itemID && title) {
                if (confirm("Bạn có chắc muốn xóa tin đăng " + title + " vĩnh viễn?")) {
                    $.ajax({
                        url: API_URL + '/manager_user/delete_node/' + itemID + '/',
                        type: 'delete',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', __token);
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.status == 'success') {
                                mtip('', 'success', '', 'Dự án đã xóa khỏi hệ thống thành công');
                                $delDiv.remove();
                            } else {
                                __handle_error();
                            }
                        },
                        error: function (a, b, c) {
                            __handle_error(a)
                        }
                    })
                }
            }
        }

        this.openRefreshForm = function (itemID) {
            /*if (isMobile) {
                location.href = MAIN_URL + '/dashboard/node?mode=refresh&id=' + itemID;
                //return false;
            }*/
            console.log(MAIN_URL + '/dashboard/node?mode=refresh&id=' + itemID + '&temp=true');
            html = '<div class="popup-section section-light"><div class="load_refresh_form"></div></div>';
            popup(html);
            $.get(MAIN_URL + '/dashboard/node?mode=refresh&id=' + itemID + '&temp=true', function (templates) {
                $('.load_refresh_form').html(templates);
                $('#theform').attr('attr-id', itemID);
                flatApp();
                $('.popup .popup-content').css({
                    left: '15%',
                    right: '15%'
                })
            });
        }

        return this;
    }
    $.fn.ListGen = ListGen
}(jQuery));

var __listGen;

$(document).ready(function () {
    if (__token) {
        __listGen = $('.v-user-properties').ListGen();
        __listGen.initialize();
    }
})