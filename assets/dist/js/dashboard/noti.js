$(document).ready(function () {
    $.ajax({
        url: API_URL + '/manager_user/danhsachthongbao/',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function(response) {
            data = response.data;
            $('.v-user-properties-total').html(data.length);
            $('.v-user-properties').html('');
            $.each(data, function (i, v) {
                var k = '<a href="'+MAIN_URL+'/dashboard/noti/'+v.id+'" class="one-noti" data-new="0" data-id="'+v.id+'"><div class="one-noti-content">'+v.details.substr(0, 1000)+'</div><div class="one-noti-time" style="margin-left:0"> '+v.time.split('T')[0].split('-').reverse().join('-')+' '+v.time.split('T')[1].split('Z')[0]+'</div><div class="clearfix"></div></a>';
                $('.v-user-properties').append(k);
            })
        }, 
        error: function (a, b, c) {
            console.log(a);
        }
    });
})