$(document).ready(function () {
    $('.menu-one-item').each(function () {
        $(this).click(function () {
            $('.menu-one-item').removeClass('active');
            $(this).addClass('active');
            var divID = $(this).attr('id');
            $('.help-board').hide();
            $('.help-board.'+divID).show();
        })
    })
})