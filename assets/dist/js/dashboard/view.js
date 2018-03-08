var urlAr = (window.location.href.replace('/', ' ').trim()).split('/');
var pType = urlAr[urlAr.length - 1].split(/\?|\#/)[0];

$(document).ready(function () {
    if (!__token) {
        location.href = MAIN_URL+'/login'
    }
    $('.public-profile-link').attr('href', MAIN_URL+'/user/'+$('.myID').attr('id'));
    if (pType == 'dashboard' && isMobile) {
        /*$('.dashboard-main,.dashboard-left').hide();
        $('.dashboard-left-mobile').show();*/
        $('.dashboard-main').hide();
        $('.view-public-profile').html('<ul class="me-profile-dropdown">'+$('#me_dropdown_info .dropdown-menu').html()+'</ul>');
        $('.view-public-profile .user-footer').remove();
    }

    urll = location.href.split(MAIN_URL)[1];
    if (urll.indexOf('dashboard') > -1) urll = 'info';
    console.log(urll);
    $('.menu-one-item[href*="'+urll+'"]').addClass('active');
})
