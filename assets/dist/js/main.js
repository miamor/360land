!function(e){var t=function(e,t){this.init(e,t)};t.prototype={constructor:t,init:function(t,n){var r=this.$element=e(t);this.options=e.extend({},e.fn.radio.defaults,n);r.before(this.options.template);this.setState()},setState:function(){var e=this.$element,t=e.closest(".radio");e.prop("disabled")&&t.addClass("disabled");e.prop("checked")&&t.addClass("checked")},toggle:function(){var t="disabled",n="checked",r=this.$element,i=r.prop(n),s=r.closest(".radio"),o=r.closest("form").length?r.closest("form"):r.closest("body"),u=o.find(':radio[name="'+r.attr("name")+'"]'),a=e.Event("toggle");u.not(r).each(function(){var r=e(this),i=e(this).closest(".radio");if(r.prop(t)==false){i.removeClass(n)&&r.removeAttr(n).trigger("change")}});if(r.prop(t)==false){if(i==false)s.addClass(n)&&r.prop(n,true);r.trigger(a);if(i!==r.prop(n)){r.trigger("change")}}},setCheck:function(t){var n="checked",r=this.$element,i=r.closest(".radio"),s=t=="check"?true:false,o=r.prop(n),u=r.closest("form").length?r.closest("form"):r.closest("body"),a=u.find(':radio[name="'+r["attr"]("name")+'"]'),f=e.Event(t);a.not(r).each(function(){var t=e(this),r=e(this).closest(".radio");r.removeClass(n)&&t.removeAttr(n)});i[s?"addClass":"removeClass"](n)&&s?r.prop(n,n):r.removeAttr(n);r.trigger(f);if(o!==r.prop(n)){r.trigger("change")}}};var n=e.fn.radio;e.fn.radio=function(n){return this.each(function(){var r=e(this),i=r.data("radio"),s=e.extend({},e.fn.radio.defaults,r.data(),typeof n=="object"&&n);if(!i)r.data("radio",i=new t(this,s));if(n=="toggle")i.toggle();if(n=="check"||n=="uncheck")i.setCheck(n);else if(n)i.setState()})};e.fn.radio.defaults={template:'<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>'};e.fn.radio.noConflict=function(){e.fn.radio=n;return this};e(document).on("click.radio.data-api","[data-toggle^=radio], .radio",function(t){var n=e(t.target);t&&t.preventDefault()&&t.stopPropagation();if(!n.hasClass("radio"))n=n.closest(".radio");n.find(":radio").radio("toggle")});e(function(){e('[data-toggle="radio"]').each(function(){var t=e(this);t.radio()})})}(window.jQuery);!function(e){var t=function(e,t){this.init(e,t)};t.prototype={constructor:t,init:function(t,n){var r=this.$element=e(t);this.options=e.extend({},e.fn.checkbox.defaults,n);r.before(this.options.template);this.setState()},setState:function(){var e=this.$element,t=e.closest(".checkbox");e.prop("disabled")&&t.addClass("disabled");e.prop("checked")&&t.addClass("checked")},toggle:function(){var t="checked",n=this.$element,r=n.closest(".checkbox"),i=n.prop(t),s=e.Event("toggle");if(n.prop("disabled")==false){r.toggleClass(t)&&i?n.removeAttr(t):n.prop(t,t);n.trigger(s).trigger("change")}},setCheck:function(t){var n="disabled",r="checked",i=this.$element,s=i.closest(".checkbox"),o=t=="check"?true:false,u=e.Event(t);s[o?"addClass":"removeClass"](r)&&o?i.prop(r,r):i.removeAttr(r);i.trigger(u).trigger("change")}};var n=e.fn.checkbox;e.fn.checkbox=function(n){return this.each(function(){var r=e(this),i=r.data("checkbox"),s=e.extend({},e.fn.checkbox.defaults,r.data(),typeof n=="object"&&n);if(!i)r.data("checkbox",i=new t(this,s));if(n=="toggle")i.toggle();if(n=="check"||n=="uncheck")i.setCheck(n);else if(n)i.setState()})};e.fn.checkbox.defaults={template:'<span class="icons"><span class="first-icon fui-checkbox-unchecked"></span><span class="second-icon fui-checkbox-checked"></span></span>'};e.fn.checkbox.noConflict=function(){e.fn.checkbox=n;return this};e(document).on("click.checkbox.data-api","[data-toggle^=checkbox], .checkbox",function(t){var n=e(t.target);if(t.target.tagName!="A"){t&&t.preventDefault()&&t.stopPropagation();if(!n.hasClass("checkbox"))n=n.closest(".checkbox");n.find(":checkbox").checkbox("toggle")}});e(function(){e('[data-toggle="checkbox"]').each(function(){var t=e(this);t.checkbox()})})}(window.jQuery);

(function($){
	$.fn.extend({
		donetyping: function (callback,timeout) {
			//timeout = timeout || 1e3; // 1 second default timeout
			timeout = timeout || 100
			var timeoutReference,
				doneTyping = function(el) {
					if (!timeoutReference) return;
					timeoutReference = null;
					callback.call(el);
				};
			return this.each (function (i,el) {
				var $el = $(el);
				// Chrome Fix (Use keyup over keypress to detect backspace)
				// thank you @palerdot
				$el.is(':input') && $el.on('keyup keypress',function(e) {
					// This catches the backspace button in chrome, but also prevents
					// the event from triggering too premptively. Without this line,
					// using tab/shift+tab will make the focused element fire the callback.
					if (e.type=='keyup' && e.keyCode!=8) return;

					// Check if timeout has been set. If it has, "reset" the clock and
					// start over again.
					if (timeoutReference) clearTimeout(timeoutReference);
					timeoutReference = setTimeout(function() {
						// if we made it here, our timeout has elapsed. Fire the
						// callback
						doneTyping(el);
					}, timeout);
				}).on('blur',function() {
					// If we can, fire the event since we're leaving the field
					doneTyping(el);
				});
			})
		}
	});
})(jQuery);


var isMobile = ($(window).width() <= 500 ? true : false);
var API_URL = '//beapi.mappy.com.vn:8989';
var __token = __userInfo = null;

function objectifyForm(formArray) {//serialize data function
  	var returnArray = {};
  	for (var i = 0; i < formArray.length; i++){
    	returnArray[formArray[i]['name']] = formArray[i]['value'];
  	}
  	return returnArray;
}

/*function checkUserCoin (token) {
    $.ajax({
        url: API_URL+'/manager_user/info/',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (response) {
            if (response.coin != __userInfo.coin) {
                localStorage.setItem('user_info', JSON.stringify(response))
            }
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
}*/

function getUserInfo (token) {
    console.log('getUserInfo'+token);
        $.ajax({
            url: API_URL+'/manager_user/info/',
            type: 'get',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (response) {
                localStorage.setItem('user_info', JSON.stringify(response));
                __userInfo = response;
                console.log(__userInfo);
                //$('.nav-user').html('<img class="nav-user-avt" src=""/><h4 class="nav-user-name">'+__userInfo.username+'</h4>');
                $('.nav-user #me_login_link, .nav-user #me_reg_link').hide();
                $('.nav-user').removeClass('loginlink');
                $('.nav-user #me_dropdown_info, .noti-right-bar').show();
                setUserInfoNav(__userInfo);
            },
            error: function (a, b, c) {
                console.log(a);
            }
        })
}

function randStr() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function locdau (str) {
    //str = encodeURI(str);
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function popup (html) {
    $('.popup:not(".popup-map") .the-board').html(html);
	//var topp = $(document).scrollTop() + 100;
    var topp = $('nav.navbar').height() + 20;
	$('.popup:not(".popup-map") .popup-content').slideDown(400, function () {
        //$('.popup-inner>div').height($('.popup-content').height());
        $('body').addClass('fixed');
        $('.popup:not(".popup-map")').show();
        //flatApp();
        if (isMobile) {
            $('.popup-content').css({
                left: 0,
                right: 0
            });
            $('.popup-content .the-board .popup-section').height($('.popup-content').height()-32);
        }
		$(this).css({
			'overflow': 'visible'
		});
        /*if ($('.map-item-info-board').length) {
            setWidth($(window).width());
        }
        if (productControlerObj && $('.popup:not(".popup-map") .v-place-v-direction').length) {
            productControlerObj.ShowDirection(place.latitude, place.longitude);
        }*/
	}).css('top', topp);
	$('.popup:not(".popup-map") .popup-content [role="close"]').click(function () {
		remove_popup()
	});
}
function remove_popup () {
    $('.popup:not(".popup-map") .the-board').html('');
	$('.popup:not(".popup-map") .popup-content').attr('style', '').slideUp(400, function () {
		$('.popup:not(".popup-map")').hide();
        $('body').removeClass('fixed');
	})
}

function flatApp () {
    $('.toggle-more').click(function () {
        if ($(this).next('.open-more').is(':visible')) {
            $(this).next('.open-more').slideUp();
            $(this).find('.fa').attr('class', 'fa fa-caret-down');
        } else {
            $(this).next('.open-more').slideDown();
            $(this).find('.fa').attr('class', 'fa fa-caret-up');
        }
    });
    
    $('input[type="submit"]').addClass('btn btn-success');

    //iCheck for checkbox and radio inputs
    /*$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-green',
        radioClass: 'iradio_minimal-green'
    });*/
    $(':checkbox').parent('label').addClass('checkbox');
    $(':radio').parent('label').addClass('radio');
    if ($(':checkbox').length) $(':checkbox').not('[data-toggle="switch"], .onoffswitch-checkbox').checkbox();
    if ($(':radio').length) $(':radio').radio();

    $('.v-box').each(function () {
        if ($(this).children('h4').length && !$(this).children('h4').children('.toggle-box-btn').length) {
            if ($(this).children('.v-box-content').is('.open')) {
                $(this).children('h4').prepend('<i class="toggle-box-btn fa fa-chevron-up right"></i> ');
            } else {
                $(this).children('h4').prepend('<i class="toggle-box-btn fa fa-chevron-right right"></i> ');
            }
            $(this).children('h4').click(function () {
                if ($(this).next('.v-box-content').is('.open')) {
                    $(this).children('.toggle-box-btn').removeClass('fa-chevron-up').addClass('fa-chevron-right');
                    $(this).next('.v-box-content').removeClass('open');
                } else {
                    $(this).children('.toggle-box-btn').removeClass('fa-chevron-right').addClass('fa-chevron-up');
                    $(this).next('.v-box-content').addClass('open');
                }
            })
        }
    })

}

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

// Get from query hash
String.prototype.getQueryHash = function (name, defaultVal) {
    //console.log(name+' ~ '+defaultVal);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\#&$]" + name + "=([^&#]*)"),
        results = regex.exec(this);
    //console.log(results);
    return results == null ? (defaultVal == undefined ? "" : defaultVal) : decodeURIComponent(results[1].replace(/\+/g, " "));
};

var checkSession_Interval = null;
var checkSession = function() {
    var currentSec = Math.floor(Date.now()/1000);
    var loginSec = parseInt(localStorage.getItem('login_time'));
    var s = currentSec - loginSec;
    //console.log('load secs to check token: '+s);
    //if (s > 0.5*60 && s < 3*60*60) { // > 1 hours, < 3 hours
    if (s > 10*60) { // > 1 hours, < 3 hours
        console.log('call refreshToken');
        //refreshToken()
        //logout(true)
    }
}


function logout (autoLoggedOut = false) {
    clearInterval(checkSession_Interval);
    localStorage.removeItem('login_time');
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');
    __userInfo = __token = null;
    console.log('Logged out!');
    $('.nav-user #me_login_link, .nav-user #me_reg_link').show();
    $('.nav-user').addClass('loginlink');
    $('.nav-user #me_dropdown_info, .noti-right-bar').hide();
    if (autoLoggedOut) loadLoginPopup(autoLoggedOut);
    //if (autoLoggedOut) refreshToken();
    else location.reload();
}

function refreshToken () {
    console.log('refreshToken called');
    $.ajax({
        url: API_URL+'/manager_user/refresh_token/',
        type: 'post',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (response) {
            console.log(response);
            if (response.data != 'error') {
                __token = response.data;
                localStorage.setItem('login_time', Math.floor(Date.now() / 1000));
                localStorage.setItem('token', response.data);
            }
        },
        error: function (a, b, c) {
            console.log('Can\'t refresh token!');
            //logout(true);
            console.log(a);
        }
    })
}

function loadLoginPopup (autoLoggedOut = false) {
    html = '<div class="popup-section section-light">';
    if (autoLoggedOut) html += '<div class="alerts alert-warning">Token đã hết hạn. Vui lòng <a href="'+MAIN_URL+'/login">đăng nhập</a> lại để tiếp tục.</div>';
    else html += '<div class="alerts alert-info">Xin chào! Chưa có tài khoản? <a href="'+MAIN_URL+'/register">Đăng ký ngay</a>.</div>';
    html += '<div class="load_login_form"></div></div>';
    popup(html);
    $.get(MAIN_URL+'/login?temp=true', function (templates) {
        $('.load_login_form').html(templates);
        flatApp();
        //loginForm();
    });
}


function __handle_error (a) {
    if (a) {
        console.log(a);
    }
    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
}


function mtip(a, c, title, content) {
	$(".alert").length && $(".alert").remove();
	if (a && a.length) {
		if (a == 'alert') {
			$('body').append('<div class="the-board-fixed"></div><div class="alert-fixed alert-' + c + '"><a class="close" onclick="htip(\'just-add\')" data-dismiss="alert">\u00d7</a><strong>' + title + " </strong>" + content + "</div>");
		} else $(a).prepend('<div class="alert alert-' + c + ' just-add"><a class="close" onclick="htip(\'just-add\')" data-dismiss="alert">\u00d7</a><strong>' + title + " </strong>" + content + "</div>");
	} else $('body').append('<div class="alert alert-' + c + ' just-add"><a class="close" onclick="htip(\'just-add\')" data-dismiss="alert">\u00d7</a><strong>' + title + " </strong>" + content + "</div>");
	wi = $('.just-add').width()/2;
	$('.just-add').css("left", "calc(50% - "+wi+"px)").animate({
		bottom: "+=50"
	}, 200);
	stip('just-add')
}
function htip(a) {
	if ($('.' + a).length) {
		var l = $('.' + a).attr('class');
		if (l.indexOf('alerts') > -1) {
			$("." + a).slideUp(function () {
				$("." + a).remove().prev('.the-board-fixed').remove()
			})
		} else {
			$(".alert").animate({
				bottom: "-=150"
			}, 500, function () {
				$(".alert").remove().prev('.the-board-fixed').remove()
			})
		}
	}
}
function stip(d) {
	$("." + d).fadeIn(1E3);
	setTimeout("htip('" + d + "')", 5E3)
}


function setUserInfoNav (userInfo) {
    console.log(userInfo);
    if (userInfo != null && userInfo != undefined) {
        if (userInfo.avatar) $('.myAvt, #meinfo_avt').attr('src', userInfo.avatar);
        $('.myID').attr('id', userInfo.id);
        $('.myName, #meinfo_name').text(userInfo.name.split(' ').reverse()[0]);
        //$('.myName, #meinfo_name').text(userInfo.name);
        $('#meinfo_uname').text(userInfo.username);
        $('#meinfo_coins').text(userInfo.coin);
        $('#meinfo_rank').text(userInfo.rank);
        $('#meinfo_profile_link').attr('href', MAIN_URL+'/user/'+userInfo.id);

        if (isMobile) {
            $('.nav-user-mobile').addClass('dropdown').show().html('<a class="dropdown-toggle" data-toggle="dropdown" href="'+MAIN_URL+'/dashboard">'+$('.nav-user .dropdown > a').html()+'</a><ul class="dropdown-menu pull-right"><li><a href="'+MAIN_URL+'/user/'+userInfo.id+'">Profile</a></li><li><a href="'+MAIN_URL+'/dashboard">Dashboard</a></li><li><a href="'+MAIN_URL+'/logout">Logout</a></li></ul>');
        }

        loadNoti();
    }
}

function loadNoti () {
    console.log(__token);
    /*
    $.ajax({
        url: API_URL + '/manager_user/danhsachthongbao/',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function(response) {
            data = response.data;
            console.log(data);
            $('.notification-load').html('');
            $.each(data, function (i, v) {
                var k = '<a href="'+MAIN_URL+'/dashboard/noti/'+v.id+'" class="one-noti" data-new="0" data-id="'+v.id+'"><div class="one-noti-content">'+v.details.substr(0, 1000)+'</div><div class="one-noti-time" style="margin-left:0"> '+v.time.split('T')[0].split('-').reverse().join('-')+' '+v.time.split('T')[1].split('Z')[0]+'</div><div class="clearfix"></div></a>';
                $('.notification-load').append(k);
            })
        }, 
        error: function (a, b, c) {
            refreshToken();
            //logout(true);
            console.log(a);
        }
    });*/
}


function render_nav () {
    if (!isMobile && $(window).width() <= 992) {
        $('.nav-icon').show().click(function () {
            if ($('ul.navbar-nav').is('.open')) {
                $('ul.navbar-nav').slideDown(400, function () {
                    $(this).removeClass('open')
                })
            } else {
                $('ul.navbar-nav').slideUp(400, function () {
                    $(this).addClass('open')
                })
            }
        })
    } else {
        $('.nav-icon').hide();
    }
}

var nodeMarker = {
    empty: MAIN_URL+'/assets/img/markers/empty.png'
};
var typeRealEstate = {
    typereal1: '[Bán] Chung cư',
    typereal2: '[Bán] Nhà riêng',
    typereal3: '[Bán] Biệt thự, liền kề',
    typereal4: '[Bán] Nhà mặt phố',
    typereal5: '[Bán] Đất nền dự án',
    typereal6: '[Bán] Đất',
    typereal7: '[Bán] Trang trại, khu nghỉ dưỡng',
    typereal8: '[Bán] Nhà kho, nhà xưởng',
    typereal10: '[Bán] Bất động sản khác',

    typereal11: '[Thuê] Chung cư',
    typereal12: '[Thuê] Nhà riêng',
    typereal13: '[Thuê] Nhà mặt phố',
    typereal14: '[Thuê] Phòng trọ, nhà trọ',
    typereal15: '[Thuê] Văn phòng',
    typereal16: '[Thuê] Cửa hàng, ki ốt',
    typereal17: '[Thuê] Trang trại, khu nghỉ dưỡng',
    typereal18: '[Thuê] Bất động sản khác',

    loaiduan1: "Căn hộ, chung cư",
    loaiduan10: "Biệt thự, liền kề, nhà vườn",
    loaiduan2: "Cao ốc văn phòng",
    loaiduan3: "Trung tâm thương mại",
    loaiduan4: "Khu đô thị mới",
    loaiduan5: "Khu phức hợp",
    loaiduan6: "Nhà ở xã hội",
    loaiduan7: "Khu nghỉ dưỡng, sinh thái",
    loaiduan8: "Khu công nghiệp",
    loaiduan9: "Dự án khác",

    /*apartment: 'Chung cư',
    house: 'Nhà riêng',
    villa: 'Biệt thự, liền kề',
    housestreet: 'Nhà mặt phố',
    projectland: 'Đất nền dự án',
    land: 'Đất bán',
    resort: 'Trang trại, khu nghỉ dưỡng',
    warehouse: 'Nhà kho, nhà xưởng',
    other: 'Bất động sản khác',*/
};

var typeIcon = {
    typereal1: 'apartment',
    typereal2: 'house',
    typereal3: 'villa',
    typereal4: 'housestreet',
    typereal5: 'projectland',
    typereal6: 'land',
    typereal7: 'resort',
    typereal8: 'warehouse',
    typereal10: 'other',

    typereal11: 'apartment',
    typereal12: 'house',
    typereal13: 'housestreet',
    typereal14: 'house',
    typereal15: 'office',
    typereal16: 'house',
    typereal17: 'warehouse',
    typereal18: 'other',

    typeservice1: "school",
    typeservice2: "busstop",
    typeservice3: "public",
    typeservice4: "hospital",
    typeservice5: "restaurant",
    typeservice6: "housestreet",
    typeservice7: "hotel",
    typeservice8: "stadium",
    typeservice9: "supermarket",
    typeservice10: "spa",
    typeservice11: "ban",
    typeservice12: "conmpany",
    typeservice13: "other"
};

var typeService = {
	typeservice1: "Trường học",
	typeservice2: "Bến xe, trạm xe",
	typeservice3: "Công trình công cộng",
	typeservice4: "Cơ sở y tế",
	typeservice5: "Nhà hàng",
	typeservice6: "Cơ quan hành chính",
	typeservice7: "Khách sạn",
	typeservice8: "TT thể thao, giải trí",
	typeservice9: "Địa điểm mua sắm",
	typeservice10: "Làm đẹp, spa",
	typeservice11: "ATM, ngân hàng",
	typeservice12: "Các công ty dịch vụ",
	typeservice13: "Các tiện ích khác"
};

$(document).ready(function ($) {
    flatApp();

    if (localStorage.getItem('token')) {
        __token = localStorage.getItem('token');

        checkSession_Interval = setInterval(checkSession, 60000);
        
        //localStorage.setItem('user_info', JSON.stringify(response));
        __userInfo = JSON.parse(localStorage.getItem('user_info'));
        //$('.nav-user').html('<img class="nav-user-avt" src=""/><h4 class="nav-user-name">'+__userInfo.username+'</h4>');
        $('.nav-user #me_login_link, .nav-user #me_reg_link').hide();
        $('.nav-user').removeClass('loginlink');
        $('.nav-user #me_dropdown_info, .noti-right-bar').show();
        setUserInfoNav(__userInfo);


        /*if (!localStorage.getItem('user_info')) {
            getUserInfo(localStorage.getItem('token'));
        } else {
            __userInfo = JSON.parse(localStorage.getItem('user_info'));
            // get again
            getUserInfo(localStorage.getItem('token'));
        }*/
        $('.noti-right-bar .see-all-noti').click(function () {
            location.href = MAIN_URL+'/dashboard/noti';
        });
        if (isMobile) {
            if (location.href.indexOf('dashboard') > -1) {
                patAr = (location.href.replace('/','').trim()).split('dashboard');
                pat = patAr[patAr.length-1];
                if (!pat) {
                $('.container > .col-lg-9').html('<h2 class="page-title">Dashboard</h2>');
                } else {
                $('.container > .left-menu').hide();
                $('.container .page-title').prepend('<a href="'+MAIN_URL+'/dashboard"><i class="fa fa-chevron-left"></i></a> ');
                }
            }
        }
        // destroy session every 30 minutes
    } else {
        //$('.nav-user').html('<a href="'+MAIN_URL+'/login">Đăng nhập</a>');
        $('.nav-user #me_login_link, .nav-user #me_reg_link').show();
        $('.nav-user').addClass('loginlink');
        $('.nav-user #me_dropdown_info, .noti-right-bar').hide();
        if (!isMobile) {
            $('#me_login_link, .add-node-link a').click(function () {
                loadLoginPopup();
                return false
            })
        } else {
            $('.nav-user-mobile').show().html('<a href="'+MAIN_URL+'/login" class="loginlink"><i class="fa fa-ellipsis-h"></i></a>');
        }
    }

    $('[href*="/logout"]').click(function () {
        popup('<div class="popup-section section-light">Đang đăng xuất khỏi tài khoản <b>'+__userInfo.name+'</b>...</div>');
        logout();
        setTimeout(function () {
            remove_popup();
        }, 1000);
        return false
    });

    if (isMobile) {
        $('body').addClass('mobile');
        //$('.add-node-link').addClass('dropup');
    } else {
        //$('.add-node-link').removeClass('dropup');
        $('.nav-user-mobile').html('').hide();
    }
    //else $('.container').height($(window).height());

    render_nav();
    $(window).on('resize', function () {
        render_nav();
    });
})
