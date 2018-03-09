function toggleMenu (toState) {
    if (toState == 0) { // hide it
        $('.dashboard-left').animate({
            right: '100%'
        }, 200, function () {
            $(this).removeClass('show')
        })
    } else if (toState == 1) { // show
        $('.dashboard-left').animate({
            right: '30%'
        }, 200, function () {
            $(this).addClass('show')
        })
    }
}

$(document).ready(function () {
    $('.menu-one-item').each(function () {
        $(this).click(function () {
            $('.menu-one-item').removeClass('active');
            $(this).addClass('active');
            var divID = $(this).attr('id');
            $('.help-board').hide();
            $('.help-board.'+divID).show();
        })
    });

    $('.toggle-dashboard-left').click(function () {
        if ($('.dashboard-left').hasClass('show')) {
            toggleMenu(0)
        } else {
            toggleMenu(1)
        }
    })

    if (isMobile) {
        $(document).mouseup(function(e) {
            var container = $(".dashboard-left");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('.toggle-dashboard-left').is(e.target) || $('.toggle-dashboard-left').has(e.target) > 0) {
                } else {
                    toggleMenu(0)
                }
            }
        })
    }
});