var _URL = location.href.split('?')[0];
var splitURL = _URL.split('/');
var nodeID = splitURL[splitURL.length - 1];

$(document).ready(function () {
    console.log(nodeID);
    $.ajax({
        url: API_URL + '/user/chitietnode/',
        type: 'post',
        data: { id: nodeID },
        success: function (data) {
            console.log(data);
            /*if (response.status == 'error') {
                mtip('', 'error', '', data);
            } else {*/
                if (data.price < 1) { // trăm triệu
                    data.priceTxt = data.price * 100 + 'tr';
                } else data.priceTxt = data.price + ' tỷ';
                $('.node-search-price').html(data.priceTxt);

                $('#node-title').html(data.title);
                $('.node-search-adr').html(data.huyen+', '+data.tinh);
                
                for (var key in data) {
                    //console.log(key);
                    if (!data[key]) {
                        $('.node-search-'+key).closest('div').hide();
                    } else {
                        $('.node-search-'+key).html(data[key]);
                    }
                }

                if (data.duanid) {
                    $('.node-search-duan').html('<a href="">'+data.tenduan+'</a>');
                } else {
                    $('.node-search-duan').closest('div').hide();
                }

                if (data.type == 'typereal1' || data.type == 'typereal4' || data.type == 'typereal11') $('.tang-txt').html('Ở tầng');
                else $('.tang-txt').html('Số tầng');

                if (data.type == 'typereal1' || data.type == 'typereal11') {
                    $('.node-search-rongtien, .node-search-rongduong').hide();
                }

                if (!$('.node-search-more').find('.line>div:visible').length) {
                    $('.node-search-more').closest('.v-box').hide();
                }
            //}
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    })
})