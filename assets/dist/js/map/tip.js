google.maps.event.addListener(this.infoWindow, 'domready', function() {
    $('.gm-style-iw').each(function () {
        var iwOuter = $(this);
        if (iwOuter.find('.iw-content').length) {
            iwOuter.parent().removeClass('iw-tip-parent');
            iwOuter.removeClass('iw-tip-custom').addClass('iw-custom');
            var iwBackground = iwOuter.prev();
            iwBackground.removeClass('gw-tip-bg').addClass('gw-style-bg')
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});
            if (iwOuter.find('#iw-container').length) {
                iwOuter.addClass('iw-node');
                iwOuter.parent().addClass('iw-parent');
            } else iwOuter.parent().addClass('iw-ult-parent');
            //iwOuter.parent().parent().css('left', '115px');
            var iwCloseBtn = iwOuter.next();
            //iwCloseBtn.css({opacity: '1', right: '48px', top: '9px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px rgba(57, 144, 185, .4)'});
            iwCloseBtn.css({opacity: '1', right: '45px', top: '27px'});
            if ($('.iw-content').height() < 140)
                $('.iw-bottom-gradient').css({display: 'none'});
            iwCloseBtn.mouseout(function(){
                $(this).css({opacity: '1'});
            });
        }
    })
});
google.maps.event.addListener(this.infoTipWindow, 'domready', function() {
    $('.gm-style-iw').each(function () {
        var iwOuter = $(this);
        if (!iwOuter.find('.iw-content').length) {
            iwOuter.parent().removeClass('iw-parent').addClass('iw-tip-parent');
            iwOuter.removeClass('iw-custom').addClass('iw-tip-custom');
            //iwOuter.parent().parent().css('left', '0px');
            var iwBackground = iwOuter.prev();
            iwBackground.removeClass('gw-style-bg').addClass('gw-tip-bg')
        }
    });
});
tip.