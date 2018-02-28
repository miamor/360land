var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var pType = urlAr[urlAr.length - 1].split(/\?|\#/)[0];

$(document).ready(function () {
    if (!__token) {
        location.href = MAIN_URL+'/login'
    }
    $('.public-profile-link').attr('href', MAIN_URL+'/user/'+$('.myID').attr('id'));
    if (pType == 'dashboard' && isMobile) {
        $('.dashboard-main,.dashboard-left').hide();
        $('.dashboard-left-mobile').show();
    }

    urll = location.href.split(MAIN_URL)[1];
    if (!urll) urll = 'info';
    $('.menu-one-item[href*="'+urll+'"]').addClass('active');
})
