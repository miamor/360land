/*!
 * Chatbox forumvi v0.2.1 by Zzbaivong (devs.forumvi.com)
 * https://github.com/baivong/chatbox
 */

//var socket = new WebSocket('ws://beapi.mappy.com.vn:8000/?session_key='+token);

var regexpPM = /^(<span style="color: (#[0-9A-Fa-f]{6}|rgb\(\d{2,3}, \d{2,3}, \d{2,3}\));?">(<(strike|i|u|strong)>)*)(\d{13,}_.*)({.*})(\["[^"]+"(\,"[^"]+")+\])(.*)$/; // Mã kiểm tra định dạng tin nhắn riêng
//var regexpPM = /(\d{13,}_.*)({.*})(\["[^"]+"(\,"[^"]+")+\])(.*)$/; // Mã kiểm tra định dạng tin nhắn riêng

//var regexpPM = /^(<span style="color: (#[0-9A-Fa-f]{6}|rgb\(\d{2,3}, \d{2,3}, \d{2,3}\));?">(<(strike|i|u|strong)>)*)(\d{13,}_\d+)({.*})(\["[^"]+"(\,"[^"]+")+\])(.*)$/; // Mã kiểm tra định dạng tin nhắn riêng

var cURL = API_URL + '/chat';
//var cURL = '//localhost/mRoom/chat?do=update';

//$(document).ready(function () {
function runChat() {
  //	"use strict";
  //	var chatbox_memberlist;
  /**
   * Các function mặc định và các biến chung
   *
   * action_user
   * copy_user_name
   * my_getcookie
   * my_setcookie
   */

  var firstTime = true; // Lần truy cập đầu tiên

  var $wrap = $("#chatbox-wrap"); // Khối bao quanh tin nhắn
  var $messenger = $("#chatbox-messenger-input"); // input nhập liệu
  var $form = $("#chatbox-form"); // form gửi tin
  var $wform = $("#chatbox-messenger-form");
  var currentUserID, currentUserName; // user id, user name của thành viên đang truy cập chatbox(mình)
  var currentNodeID = "";
  var currentNodeName = "";
  var autoRefresh; // Cập nhật tin nhắn mỗi 5 giây
  var $title = $("title"); // Tiêu đề của trang

  var lastMess; // Lấy html của tin cuối cùng

  var connected = 0;

  var currentUser = JSON.parse(localStorage.getItem('user_info'));
  currentUserName = currentUser['username'];
  //currentUserID = ar[9];

  currentUserID = "";
  //currentUserName = "";


  /**
   * Lấy Link của người dùng trong danh sách bằng nickname
   *
   * @param {String} nickname của người cần lấy
   */
  var userOnline = function (n) {
    if (n.indexOf("@") !== -1) n = n.split("@")[1];
    return $("#chatbox-members").find(
      "a[onclick=\"return copy_user_name('" + n + "');\"]"
    );
  };

  var chatbox_old_update = 0;

  // Copy nickname vào khung soạn thảo
  function copy_user_name(user_name) {
    $messenger[0].value += "@" + user_name + " ";
    $messenger.focus();
    return false;
  }

  // Lấy cookie
  function my_getcookie(name) {
    var cname = name + "=";
    cpos = document.cookie.indexOf(cname);
    if (cpos != -1) {
      cstart = cpos + cname.length;
      cend = document.cookie.indexOf(";", cstart);
      if (cend == -1) {
        cend = document.cookie.length;
      }
      return unescape(document.cookie.substring(cstart, cend));
    }
    return null;
  }

  // Đặt cookie
  function my_setcookie(name, value, sticky, path) {
    expires = "";
    domain = "";
    if (sticky) {
      expires = "; expires=Wed, 1 Jan 2020 00:00:00 GMT";
    }
    if (!path) {
      path = "/";
    }
    document.cookie =
      name + "=" + value + "; path=" + path + expires + domain + ";";
  }

  // Đặt cookie (hàm dùng trong chatbox fm khi disconnect)
  function SetCookie(name, value) {
    return my_setcookie(name, value);
  }

  /*!
		 * zzEmoFb ver 0.1 by zzbaivong
		 * http://devs.forumvi.com/
		 */

  var zzEmoFb = {
    all: "",
    emoFB: {},

    imgEmo: function (b, a) {
      return (
        '<img class="smiley_FB" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="' +
        b.replace(/\"/, "&quot;") +
        '" style="background-position:' +
        a +
        '" />'
      );
    },

    checkEmo: function (b) {
      return (b = b.replace(zzEmoFb.all, function (a) {
        return zzEmoFb.imgEmo(a, zzEmoFb.emoFB[a]);
      }));
    },

    list: function (b, a) {
      $.each(zzEmoFb.emoFB, function (c, d) {
        b.test(c) && $(a).append(zzEmoFb.imgEmo(c, d));
      });
    },

    addSmiley: function (ele) {
      var normal = /\bO:\)\B|\bo\.O\b|\bO\.o\b|\b8\|\B|\b8\)\B|\b3:\)\B|\B(\(y\)\B|\B:3\b|\B:\'\(\B|\B:\(\B|\B:O\b|\B:D\b|\B&gt;:\(\B|\B&lt;3\b|\B\^_\^\B|\B:\*\B|\B:v\b|\B&lt;\(\"\)\B|\B:poop:\B|\B:putnam:\B|\B\(\^\^\^\)\B|\B:\)\B|\B-_-\B|\B:P\b|\B:\/\B|\B&gt;:O\b|\B;\)\B|\B:\|\]\B)/,
        more = /\B:fb([0-9]|[1-9][0-9]|1[0-9][0-9]|20[0-9]):\B/;
      zzEmoFb.all = RegExp(
        (normal + more).replace("//", "|").replace(/^\/|\/$/g, ""),
        "g"
      );

      for (var b = 0, a, c = 0; 239 > c; c++) {
        switch (c) {
          case 210:
            a = "o.O";
            break;
          case 211:
            a = "O.o";
            break;
          case 212:
            a = ":'(";
            break;
          case 213:
            a = "3:)";
            break;
          case 214:
            a = ":(";
            break;
          case 215:
            a = ":O";
            break;
          case 216:
            a = "8)";
            break;
          case 217:
            a = ":D";
            break;
          case 218:
            a = "&gt;:(";
            break;
          case 219:
            a = "&lt;3";
            break;
          case 220:
            a = "^_^";
            break;
          case 221:
            a = ":*";
            break;
          case 222:
            a = ":v";
            break;
          case 223:
            a = '&lt;(")';
            break;
          case 224:
            a = ":poop:";
            break;
          case 225:
            a = ":putnam:";
            break;
          case 226:
            a = "(^^^)";
            break;
          case 227:
            a = ":)";
            break;
          case 228:
            a = "-_-";
            break;
          case 229:
            a = "8|";
            break;
          case 230:
            a = ":P";
            break;
          case 231:
            a = ":/";
            break;
          case 232:
            a = "&gt;:O";
            break;
          case 233:
            a = ";)";
            break;
          case 234:
            a = "(y)";
            break;
          case 235:
            a = ":3";
            break;
          case 236:
            a = ":|]";
            break;
          case 237:
            a = "O:)";
            break;
          default:
            a = ":fb" + c + ":";
        }
        b -= 17;
        zzEmoFb.emoFB[a] = "0 " + b + "px";
      }

      var $smiley = $("<div>", {
        id: "smiley_FB_frame"
      }).appendTo(ele);

      zzEmoFb.list(normal, "#smiley_FB_frame");

      $smiley.append('<p class="more">--- Xem th\u00eam ---</p>');

      var $more = $(".more", $smiley);

      $more.click(function () {
        $("p.less", $smiley).length
          ? $more.nextAll().show()
          : (zzEmoFb.list(more, "#smiley_FB_frame"),
            $smiley.append('<p class="less">--- Thu g\u1ecdn ---</p>'));
        $(this).hide();
      });

      $smiley.on("click", ".less", function () {
        $(this).hide();
        $more
          .show()
          .nextAll()
          .hide();
      });

      $smiley.on("click", "img", function (e) {
        $messenger[0].value += " " + this.alt;
        if (!e.ctrlKey) {
          $(ele).removeClass("active");
          $form.submit();
        }
      });

      $(ele).click(function () {
        $(this).toggleClass("active");
      });

      $smiley.click(function (e) {
        e.stopPropagation();
      });

      $(document).click(function (e) {
        if (!$(e.target).closest(ele).length) {
          $(ele).removeClass("active");
        }
      });
    }
  };

  zzEmoFb.addSmiley("#chatbox-option-smiley");

  /**
   * Xử lý dữ liệu tin nhắn để chuyển đến dạng tab riêng mình cần
   *
   * @param {htmlString} Dữ liệu tin nhắn mới
   */
  var newMessage = function (Messages) {
    //console.log(Messages);
    if (Messages) {
      var arr = $.parseHTML(Messages); // Chuyển htmlString tin nhắn thành HTML

      $.each(arr, function (i, val) {
        // Duyệt qua từng tin

        var $this = $(this); // Đặt biến cho tin nhắn đang xét

        var $msg = $(".msg", $this);

        var messText = $msg.html(); // Lấy HTML phần nội dung tin nhắn

        if (regexpPM.test(messText)) {
          // Nếu đúng định dạng tin riêng

          /**
           * Tạo array chứa các thành phần của tin nhắn riêng
           *
           * 0  htmlString
           * 1  Tag định dạng văn bản
           * 2  Mã màu
           * 3  Tag (không quan trọng)
           * 4  Tag (không quan trọng)
           * 5  data-id
           * 6  conversation name
           * 7  arrayString nickname các thành viên
           * 8  Nickname thành viên cuối (không quan trọng)
           * 9  nội dung và tag đóng
           */
          var arrMess = messText.match(regexpPM);
          //console.log(arrMess);

          var arrUsers = JSON.parse(arrMess[7]); // Array nickname các thành viên

          var indexUser = $.inArray(encodeURIComponent(currentUserName), arrUsers); // Lấy vị trí index nickname của thành viên đang truy cập trong arrayString

          if (indexUser !== -1) {
            // Nếu có nickname của thành viên đang truy cập trong danh sách

            var dataId = arrMess[5]; // data-id lấy từ tin nhắn
            node_id = dataId.split("_n")[1].split('_')[0];
            to_uid = dataId.split("_id")[1].split("{")[0];

            var $private = $('.chatbox-content[data-id="' + dataId + '"]'); // Đặt biến cho mục chat riêng ứng với data-id lấy được
            var $tabPrivate = $('.chatbox-change[data-id="' + dataId + '"]'); // Đặt biến cho tab của mục tương ứng

            if (!$tabPrivate.length) {
              // Nếu chưa có mục chat riêng thì tạo mới
              $private = $("<div>", {
                class: "chatbox-content",
                "data-id": dataId,
                style: "display: none;"
              }).appendTo("#chatbox-wrap"); // Thêm vào khu vực chatbox

              var node_title = arrMess[6]; // Đặt biến cho tên tab là phần ký tự trong dấu {}
              var chat_name = arrMess[8].slice(2, -1);
              var $tabname;

              if (chat_name === "") {
                chat_name = $.grep(arrUsers, function (n, i) {
                  return n !== encodeURIComponent(currentUserName);
                });

                /*if (chat_name.length === 1) {
                  chat_name = decodeURIComponent(chat_name[0]);
                  $tabname = userOnline(chat_name);
                  $tabname.parent().hide();
                } else {
                  chat_name = decodeURIComponent(chat_name.join(", ")); // Đặt tên tab là các nickname đang chat với mình
                }*/
              }

              $tabPrivate = $("<div>", {
                class: "chatbox-change",
                "data-id": dataId,
                "data-nodeid": node_id,
                "data-name": node_title,
                "data-users": arrMess[7],
                html:
                  '<h3><a href="' +
                  MAIN_URL +
                  "/u/" +
                  chat_name +
                  '" onclick="return false">@' +
                  chat_name +
                  " - " +
                  node_title.slice(1, -1) +
                  '</a></h3><span class="chatbox-change-mess"></span>'
              }).appendTo("#chatbox-list"); // Thêm vào khu vực tab

              $tabPrivate.click(function () {
                restrictTab();
              });
            } /*else if (
              $tabPrivate.is(":hidden") &&
              $msg.text().indexOf("]/out") === -1
            ) {
              $tabPrivate.show();
              userOnline($tabPrivate.find("h3").text())
                .parent()
                .hide();
            }*/ else if ($msg.text().indexOf("]/out") !== -1) {
              userOnline($tabPrivate.find("h3").text())
                .parent()
                .show();
              $tabPrivate.hide();
              /*if (my_getcookie("chatbox_active") !== "publish")
                $('.chatbox-change[data-id="publish"]').click();*/
            }

            /*if (location.href.indexOf('node_id=') > -1 && location.href.indexOf('node_name=') > -1 && location.href.indexOf('user_id=') > -1) {
              var ar = location.href.split(/=|&/);
              //console.log(ar);
              currentNodeID = ar[3];
              currentNodeName = decodeURIComponent(ar[5]);
              toUserName = ar[7];

              console.log(currentNodeID);
              console.log($tabPrivate.attr('data-nodeid'));
              if ($tabPrivate.attr('data-nodeid') == currentNodeID) {
                console.log('$tabPrivate click!');
                $tabPrivate.click();
              }
            }*/

            //console.log($tabPrivate.html());

            $msg.html(zzEmoFb.checkEmo(arrMess[1] + arrMess[9])); // Xóa phần đánh dấu tin nhắn

            $this.appendTo($private); // Thêm tin nhắn vào mục chat riêng theo data-id


          }
        } else if (
          messText.indexOf("{HIDDEN_TEXT}") !== -1 ||
          $msg.text().indexOf("]/out") !== -1
        ) {
          $this.remove();
        } else {
          // Nếu không đúng định dạng mã tin riêng
          $msg.html(zzEmoFb.checkEmo($msg.html()));
          $this.appendTo('.chatbox-content[data-id="publish"]'); // Thêm tin nhắn thường vào mục chat chung
        }

        if (newSound == true) $("#chatbox-new-audio")[0].play(); // Chạy âm thanh tin nhắn mới

        var msgId = $this.closest(".chatbox-content").attr("data-id");
        var $msgTab = $(".chatbox-change[data-id='" + msgId + "']");
        messText = $msg.text();
        if (messText === "/buzz") {
          // Nếu có ký hiệu buzz
          $msg.html(
            '<img src="' +
            MAIN_URL +
            '/assets/plugins/mchat/img/buzz.gif" width="62" height="16" />'
          ); // Thay bằng ảnh buzz
          if (!firstTime && $("#chatbox-main").css("left") !== "-1px") {
            // Không chạy hiệu ứng buzz trong lần truy cập đầu tiên
            //					$msgTab.click();
            $("#chatbox-forumvi").addClass("chatbox-buzz");
            $("#chatbox-buzz-audio")[0].play();
            setTimeout(function () {
              $("#chatbox-forumvi").removeClass("chatbox-buzz");
              $messenger.focus();
            }, 1000);
          }
        } else if (messText.indexOf("/out") === 0 && msgId !== "publish") {
          if ($this.find(".user > a").text() === currentUserName) {
            $msgTab.add(".chatbox-content[data-id='" + msgId + "']").hide();
            var otherUser = decodeURIComponent(
              $.grep($msgTab.data("users"), function (n, i) {
                return n !== encodeURIComponent(currentUserName);
              })[0]
            );
            userOnline(otherUser)
              .parent()
              .show();
            if (my_getcookie("chatbox_active") === msgId) {
              //						$(".chatbox-change[data-id='publish']").click();
              my_setcookie("chatbox_active", msgId);
            }
            $this.replaceWith(
              '<p class="chatbox-userout me clearfix">Bạn đã rời khỏi phòng.</p>'
            );
          } else {
            $this.replaceWith(
              '<p class="chatbox-userout clearfix"><strong>' +
              $this.find(".user > a").text() +
              "</strong> đã rời khỏi phòng.</p>"
            );
          }
        }

        var messTime = $(".date-and-time", $this), // Lấy định dạng thời gian
          messTimeText = messTime.text();
        var arrTime = messTimeText.match(/\[(\S+)\s(\S+)\]/);

        //			console.log(arrTime);
        arrTimeT = arrTime[2].split(":");
        messTime.text(arrTimeT[0] + ":" + arrTimeT[1]); // Dùng thông số giờ:phút cho tin nhắn

        if (
          !$this
            .closest(".chatbox-content")
            .find(".chatbox-date:contains('" + arrTime[1] + "')").length
        ) {
          // Nếu trong mục chưa có thông số ngày/tháng/năm
          $this.before(
            '<p class="chatbox-date clearfix">' + arrTime[1] + "</p>"
          ); // Thêm vào thông số ngày/tháng/năm
        }
      });

      setTimeout(function () {
        var $tabCookie = $(
          '.chatbox-change[data-id="' + my_getcookie("chatbox_active") + '"]'
        );
        if ($tabCookie.length && $tabCookie.is(":visible")) {
          $(
            '.chatbox-change[data-id="' + my_getcookie("chatbox_active") + '"]'
          ).click(); // Active tab khi có cookie
        }
      }, 200);

      var messCounterObj = JSON.parse(sessionStorage.getItem("messCounter"));
      var allNewMess = 0; // Đếm số tin nhắn mới

      $(".chatbox-content").each(function () {
        var $this = $(this),
          dataID = $this.attr("data-id");
        var messLength = $(".chatbox_row_1, .chatbox_row_2", $this).length; // Số tin nhắn
        var $count = $(".chatbox-change[data-id='" + dataID + "']").find(
          ".chatbox-change-mess"
        ); // tab tương ứng
        var mLength = messLength; // đặt biến trung gian

        var oldMessLength = 0;
        if (messCounterObj && messCounterObj[dataID]) {
          oldMessLength = parseInt(messCounterObj[dataID], 10);
        }

        mLength = messLength - oldMessLength; // trừ lấy số tin mới

        if (mLength <= 0) {
          // Nếu không có tin mới
          mLength = ""; // Xóa bộ đếm
        } else {
          allNewMess += mLength; // Lấy tổng số tin mới
          mLength = "<strong>" + mLength + "</strong>";
        }

        $count.html(mLength);
      });

      if (allNewMess > 0) {
        // Nếu có tin nhắn mới
        var tit = $title.text();
        var regexpTit = /^\(\d+(\)\s.*$)/;
        if (regexpTit.test(tit)) {
          // Đã có số đếm
          tit = "(" + allNewMess + tit.match(regexpTit)[1];
        } else {
          // Chưa có số đếm
          tit = "(" + allNewMess + ") " + tit;
        }
        $title.text(tit);
      }

      setTimeout(function () {
        $wrap.scrollTop(99999); // Cuộn xuống dòng cuối cùng
      }, 300);

      //console.log('chatbox-change length~ ' + $('.chatbox-change').length);
      //console.log($('.chatbox-change').html());

    }
  };

  var lastMess; // Lấy html của tin cuối cùng
  var newSound = false; // Không bật sound

  /**
   * Xử lý các tin nhắn sau khi tải về
   *
   * @param {htmlString} Dữ liệu tin nhắn
   */
  var filterMess = function (chatbox_messages) {
    var newChatboxMessages, thisLastMess;
    if (chatbox_messages) {
      // Nếu có tin nhắn
      thisLastMess = chatbox_messages.match(
        /<p class="chatbox_row_(1|2) clearfix">(?:.(?!<p class="chatbox_row_(1|2) clearfix">))*<\/p>$/
      )[0]; // Lấy tin nhắn cuối trong lần này
      //console.log(thisLastMess);
      if (lastMess === undefined) {
        // Nếu trước đó ko có tin cuối => lần truy cập chatbox đầu tiên hoặc chatbox mới clear
        newChatboxMessages = chatbox_messages;
        lastMess = thisLastMess; // Cập nhật tin nhắn cuối
        //console.log('lastMess === undefined');
        newMessage(newChatboxMessages); // Xử lý tin nhắn và đưa vào chatbox
      } else if (lastMess !== thisLastMess) {
        // Không có tin mới
        newChatboxMessages = chatbox_messages.split(lastMess)[1]; // Cắt bỏ tin nhắn cũ, lấy tin mới
        lastMess = thisLastMess; // Cập nhật tin nhắn cuối
        uSend = lastMess.split(/(copy_user_name\(\'|\')/)[2]; // Lấy tên người gửi cuối
        if (uSend != currentUserName) newSound = true; // Nếu người gửi là người khác thì bật âm thanh tin nhắn mới
        newMessage(newChatboxMessages); // Xử lý tin nhắn và đưa vào chatbox
      }
    } else {
      // Nếu không có tin nhắn (có thể là do clear chatbox)
      lastMess = undefined; // Xóa giá trị tin nhắn cuối
      var obj = {};
      $(".chatbox-content").each(function () {
        var $this = $(this);
        obj[$this.attr("data-id")] = $this.children("p").length;
      });
      sessionStorage.setItem("messCounter", JSON.stringify(obj)); // Lưu vào sessionStorage
    }

    $("#chatbox-forumvi:hidden").fadeIn(200); // Hiển thị chatbox
    firstTime = false;


  };

  /**
   * Xử lý khi tải xong dữ liệu
   * Cập nhật dữ liệu
   */

  /**
   * Tạo nhanh thẻ li trong menu action
   *
   * @param1 {Object} Thẻ ul mà nó gắn vào
   * @param2 {String} Mã lệnh cmd
   * @param3 {String} nickname dùng trong mã lệnh
   * @param4 {String} Nội dung thẻ li
   */
  var quickAction = function (ele, cmd, user_name, txt) {
    if (user_name) {
      user_name = " " + user_name;
    } else {
      user_name = "";
    }
    $("<li>", {
      class: "chatbox-action",
      "data-action": "/" + cmd + user_name,
      text: txt
    }).appendTo(ele);
  };

  var menuActionOne = true; // Chỉ chạy 1 lần

  /**
   * Xử lý khi tải xong dữ liệu tin nhắn
   *
   * $param {htmlString} Dữ liệu tin nhắn
   */
  var getDone = function (chatsource) {
    //console.log(chatsource);
    if (typeof chatsource !== "undefined") {
      if (chatsource.indexOf("<!DOCTYPE html PUBLIC") === 0) {
        // Lỗi do logout hoặc bị ban
        if (
          chatsource.indexOf("You have been banned from the ChatBox") !== -1
        ) {
          console.log("Bạn đã bị cấm truy cập chatbox!");
          // location.replace("/");
        } else if (chatsource.indexOf("You are disconnected") !== -1) {
          console.log("Mất kết nối đến máy chủ. Vui lòng đăng nhập lại!");
          // location.replace("/login?redirect=" + location.pathname);
        } else {
          alert("Error: log01");
        }
        clearInterval(refreshFunction);
        return false;
      } else {
        // Đã login
        connected = 1;

        /**
         * Tải dữ liệu chatbox
         *
         * chatbox_messages	 Tin nhắn chatbox
         * chatbox_memberlist   Thành viên đang truy cập
         * chatbox_last_update  Thời điểm cập nhật cuối
         */
        chatsource = chatsource.replace(/copy_user_name\('(.*?)'\)/g, "copy_user_name(\\'$1\\')");
        chatsource = chatsource.replace(/"/g, "\\\"");
        //console.log(chatsource);
        eval(chatsource); // Chuyển đổi để các biến chạy được

        //$("#chatbox-members").html(chatbox_memberlist); // Thêm dach sách thành viên
        //	icons();

        // Đặt icon online và away dựa vào class ở tiêu đề
        /*$(".chatbox-change > h3").each(function() {
          // Duyệt qua từng tab riêng
          var $this = $(this);
          if ($this.text().indexOf("@") !== -1) {
            var $status = userOnline($this.text())
                .closest("ul")
                .prev("h4"),
              clas;
            if ($status.hasClass("online")) {
              clas = "online";
            } else if ($status.hasClass("away")) {
              clas = "away";
            }
            $this
              .parent()
              .removeClass("online away")
              .addClass(clas);
          }
        });*/

        filterMess(chatbox_messages); // Lọc và xử lý các tin nhắn trong chatbox_messages

      }
    }
  };

  var disconnect = function () {
    clearInterval(refreshFunction); // Dừng tự cập nhật
    $("#chatbox-action-logout").addClass("isOut");
    $(".chatbox-action-checkbox")
      .prop("checked", false)
      .hide();
    $messenger.val("/away");
    $form.submit();
    $wform.css("bottom", "-90px");
    setTimeout(function () {
      $wform.hide();
    }, 500);
    $wrap.css({
      bottom: 0,
      opacity: 0.3
    });
    $("#chatbox-tabs").css("opacity", 0.3);
  };

  // var updateTime = function() {
  //	 return new Date().getTime();
  // };

  /**
   * Tải dữ liệu và cập nhật nội dung chatbox
   *
   * @param {URL} Đường dẫn tải dữ liệu
   */
  var update = function () {
    //console.log('update called: ' + cURL + '/message/');
    //console.log(__token);
    //console.log('update called');
    $.ajax({
      url: cURL + '/message/',
      type: "get",
      //dataType: "script",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', __token);
      },
      success: function (response) {
        //getDone(response);
        if (response.status == 'success') {
          var data = response.data;
          //console.log(data);
          getDone(data);

          $("#chatbox-forumvi:hidden").fadeIn(200);
        }
      },
      error: function (a, b, c) {
        console.log(a);
      }
    })
    /*  .done(function(data) {
        getDone(data);
      })
      .fail(function(data) {
        $.post(cURL+'/send', {
          // Gửi tin nhắn rỗng để connect
          mode: "send",
          sent: ""
        }).done(function() {
          $.post(cURL+'/message', {
            mode: "send",
            sent: "{HIDDEN_TEXT}"
          }).done(function() {
            $.ajax({
              url: cURL,
              type: "get",
              dataType: "script"
            }).done(function(data) {
              // Tải dữ liệu chatbox
              getDone(data);
              $("#chatbox-forumvi:hidden").fadeIn(200);
            });
          });
        });
      });*/
  };

  var autoUpdate = function () {
    // Tự cập nhật mỗi 1s = 600
    //console.log('autoUpdate called');
    var refreshFunction = setInterval(function () {
      update();
    }, 300);
  };

  // Bật tắt tự động cập nhật
  $("#chatbox-input-autorefesh").change(function () {
    if ($(this).prop("checked")) {
      // Đã check
      autoUpdate();
    } else {
      clearInterval(refreshFunction);
    }
  });

  $("#chatbox-action-logout").click(function () {
    var $this = $(this);
    if ($this.hasClass("isOut")) {
      $(".chatbox-action-checkbox")
        .prop("checked", true)
        .show();
      $this.removeClass("isOut");
      $wform.show();
      setTimeout(function () {
        $wform.css("bottom", 0);
      }, 10);
      $wrap.css({
        bottom: 90,
        opacity: 1
      });
      $("#chatbox-tabs").css("opacity", 1);
      setTimeout(function () {
        $wrap[0].scrollTop = $wrap.prop("scrollHeight");
      }, 500);
      autoUpdate();
    } else {
      disconnect();
    }
  });

  /**
   * Chuyển/xóa/thêm tab chat
   */

  // Đánh dấu đã xem hết tin nhắn
  $messenger.on("focus click keydown", function () {
    var dataID = $messenger.attr("data-id");
    var $countMess = $(".chatbox-change[data-id='" + dataID + "']").find(
      ".chatbox-change-mess"
    );
    var newMess = parseInt($countMess.text(), 10);

    if (newMess) {
      var $content = $(".chatbox-content[data-id='" + dataID + "']");
      var obj = JSON.parse(sessionStorage.getItem("messCounter")) || {};
      obj[dataID] = $(
        ".chatbox_row_1, .chatbox_row_2",
        $(".chatbox-content[data-id='" + dataID + "']")
      ).length;
      sessionStorage.setItem("messCounter", JSON.stringify(obj)); // Lưu vào sessionStorage

      var noSeen = $("p", $content).length - newMess - 1;
      var $noSeen = $("p:gt(" + noSeen + ")", $content);

      // Hiệu ứng cho tin nhắn mới
      $noSeen.addClass("chatbox-newmess");
      setTimeout(function () {
        $noSeen.removeClass("chatbox-newmess");
      }, 3000);

      $title.text($title.text().replace(/\(\d+\)\s/, "")); // Xóa chỉ số tin trên tiêu đề
      $countMess.empty(); // Xóa số đếm tin mới
    }
  });

  // Chuyển tab
  $("#chatbox-list").on("click", ".chatbox-change", function () {
    var $this = $(this);
    $(".chatbox-change.active").removeClass("active");
    $this.addClass("active");
    var dataID = $this.attr("data-id");
    $(".chatbox-content").hide();
    $('.chatbox-content[data-id="' + dataID + '"]').show();
    var key = "";
    var $titSetting = $("#chatbox-title >.chatbox-setting");
    if (dataID !== "publish") {
      key = dataID + $this.attr("data-name") + $this.attr("data-users");
      $titSetting.show();
    } else {
      $titSetting.hide();
    }
    $form.attr("data-key", key);
    $('#chatbox-title').attr('data-id', key);
    $messenger.add("#chatbox-title").attr("data-id", dataID);
    $("#chatbox-title > h2").text($("h3", $this).text());

    $messenger.focus();
    my_setcookie("chatbox_active", dataID, false); // Lưu cookie cho tab vừa click
    $wrap[0].scrollTop = $wrap.prop("scrollHeight"); // Cuộn xuống dòng cuối cùng
  });

  // Chạy các chức năng từ menu
  $("#chatbox-title").on("click", ".chatbox-action", function () {
    $messenger.val($(this).attr("data-action"));
    $form.submit();
  });

  // Buzz
  $("#chatbox-option-buzz").click(function () {
    if ($(this).html() === "BUZZ") {
      $messenger.val("/buzz");
      $form.submit();
    }
  });

  /**
   * Gửi tin nhắn
   *
   * @param {String} Nội dung tin nhắn
   */
  var sendMessage = function (val) {
    oldMessage = $messenger.val();
    //console.log(currentNodeID + '~~~' + currentUserID)
    if (!currentNodeID || !currentUserID) {
      //mtip('', 'error', '', 'Chọn 1 cuộc hội thoại');
      console.log('Chọn 1 cuộc hội thoại');
      return false;
    }
    console.log({
      node_id: currentNodeID,
      to_id: currentUserID,
      sent: val,
    });
    $.ajax({
      url: cURL + '/send/',
      type: 'post',
      data: {
        node_id: currentNodeID,
        to_id: currentUserID,
        sent: val,
        /*mode: "send",
        sbold: $("#chatbox-input-bold").val(),
        sitalic: $("#chatbox-input-italic").val(),
        sunderline: $("#chatbox-input-underline").val(),
        sstrike: $("#chatbox-input-strike").val(),
        scolor: $("#chatbox-input-color").val()*/
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', __token);
      },
      success: function (response) {
        //console.log(response);
        //getDone(response);
        // Cập nhật tin nhắn
        if (response.status == 'success') {
          var data = response.data;
          getDone(data);
          $messenger.focus();
        } else {
          //mtip('', 'error', '', response.message)
          $messenger.val(oldMessage);
          //console.log(response.message)
        }
      },
      error: function (a, b, c) {
        console.log("Lỗi! Tin nhắn chưa được gửi.");
        $messenger.val(oldMessage);
        // Xử lý cho lỗi mất kết nối internet (có thể xảy ra do refresh trang trong lúc đang tải)
      }
    });
  };

  var getCaret = function (el) {
    if (el.selectionStart) {
      return el.selectionStart;
    } else if (document.selection) {
      el.focus();
      var r = document.selection.createRange();
      if (r == null) {
        return 0;
      }
      var re = el.createTextRange(),
        rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint("EndToStart", re);
      return rc.text.length;
    }
    return 0;
  };

  $messenger.keyup(function (event) {
    if (event.keyCode == 13) {
      var content = this.value;
      var caret = getCaret(this);
      if (event.shiftKey) {
        this.value =
          content.substring(0, caret - 1) +
          "\n" +
          content.substring(caret, content.length);
        event.stopPropagation();
      } else {
        this.value =
          content.substring(0, caret - 1) +
          content.substring(caret, content.length);
        $form.submit();
      }
    }
  });

  $form.submit(function (event) {
    // Gửi tin nhắn
    event.preventDefault(); // Chặn sự kiện submit

    var messVal = $messenger.val();
    //console.log('form submited '+messVal);
    if ($.trim(messVal) !== "") {
      var regexpCmd = /^\/(chat|gift|toggle|kick|away|ban|unban|mod|unmod|cls|clear|me)(\s\[(.+?)\]\s\{(.+?)\}\s(.+))?$/;

      //console.log('messVal~~~~ ' + messVal);
      if (regexpCmd.test(messVal)) {
        // Nếu là các lệnh cmd
        var cmd = messVal.match(regexpCmd);

        var action = cmd[1],
          nodeid = cmd[3],
          nodename = cmd[4],
          nickname = cmd[5],
          nicknameencode = encodeURIComponent(nickname),
          currentUserNameencode = encodeURIComponent(currentUserName);

        if (/^(chat|gift|toggle)$/.test(action)) {
          // Những lệnh không gửi đi
          if (action === "chat") {
            var nickdecode = decodeURIComponent(nickname);

            //console.log('nodeid~' + nodeid);
            // Đặt biến cho tab chat riêng
            /*var $newTab = $(
              '.chatbox-change[data-users="[\\"' +
              nicknameencode +
              '\\",\\"' +
              currentUserNameencode +
              '\\"]"][data-nodeid="'+nodeid+'"]'
            );*/
            var $newTab = $(
              '.chatbox-change[data-users="[\\"' +
              currentUserNameencode +
              '\\",\\"' +
              nicknameencode +
              '\\"]"][data-nodeid="' + nodeid + '"]'
            );

            if (!$newTab.length) {
              /*$newTab = $(
                '.chatbox-change[data-users="[\\"' +
                  nicknameencode +
                  '\\",\\"' +
                  currentUserNameencode +
                  '\\"]"][data-nodeid="'+nodeid+'"][data-name="{'+nodename+'}"]'
              );*/
              var $newTab = $(
                '.chatbox-change[data-users="[\\"' +
                currentUserNameencode +
                '\\",\\"' +
                nicknameencode +
                '\\"]"][data-nodeid="' + nodeid + '"]'
              );
            }

            //console.log($newTab);

            var $user = userOnline(nickname);

            if ($newTab.length) {
              // Nếu đã có tab chat riêng
              $newTab.show().click();
              var dataId = $newTab.attr('data-id');
              $messenger.attr('data-id', dataId);

              key = dataId + $newTab.attr("data-name") + $newTab.attr("data-users");
              $form.attr('data-key', key);

              //console.log('newTab.length~ ' + dataId);
            } else {
              //if ($user.length) {
              // Nếu có nickname trong danh sách
              $user.parent().hide(); // Ẩn nickname trong danh sách

              if (!$newTab.length) {
                // Nếu chưa có tab chat
                var dataId = new Date().getTime() + "_u" + currentUserName + "_n" + currentNodeID + "_id" + currentUserID; // Tạo data-id

                $messenger.attr('data-id', dataId);
                //$form.attr('data-key', dataId);

                // Đặt icon online và away dựa vào class ở tiêu đề
                var clas,
                  $status = $user
                    .parent()
                    .parent()
                    .prev("h4");
                if ($status.hasClass("online")) {
                  clas = " online";
                } else if ($status.hasClass("online")) {
                  clas = " away";
                } else {
                  clas = "";
                }
                $newTab = $("<div>", {
                  class: "chatbox-change" + clas,
                  "data-id": dataId,
                  "data-name": "{" + nodename + "}",
                  "data-nodeid": nodeid,
                  "data-users":
                    '["' + currentUserNameencode + '","' + nicknameencode + '"]',
                  html:
                    '<h3 style="color:' +
                    $("span", $user).css("color") +
                    '">' +
                    nickname +
                    ' - ' + nodename + '</h3><span class="chatbox-change-mess"></span>'
                }).appendTo("#chatbox-list"); // Tạo tab chat riêng mới

                key = dataId + $newTab.attr("data-name") + $newTab.attr("data-users");
                $form.attr('data-key', key);

                $newTab.click();
                $("<div>", {
                  class: "chatbox-content",
                  "data-id": dataId,
                  style: "display: none;"
                }).appendTo($wrap); // Tạo mục chat riêng mới
              }

              /*} else {
                // Nếu không có nickname trong danh sách
                if ($newTab.length) {
                  // Nếu có tab chat riêng
                  $newTab.removeClass("online away").click(); // Xóa trang thái online, away về trạng thái offline
                } else {
                  if (nickname === currentUserName) {
                    console.log("Phát hiện nghi vấn Tự kỷ ^^~");
                  } else {
                    console.log(
                      "Thành viên " + nickname + " hiện không truy cập!"
                    );
                  }
                }
              }*/
            }
          } else if (action === "toggle") {
            $("#chatbox-hidetab").click();
          }
        } else {
          // Những lệnh sẽ được gửi đi
          sendMessage(messVal);
        }
      } else {
        // Nếu là tin nhắn thường
        var messWithKey = $form.attr("data-key") + messVal; // tin nhắn có key (tin riêng)
        var messId = $messenger.attr("data-id"); // 1528471380508_u2_n3
        var node_id, node_title;
        //console.log(messId);
        if (messId !== "publish") {
          currentNodeID = messId.split("_n")[1].split('_')[0];
          currentUserName = messId.split("_u")[1].split("_")[0];
          currentUserID = messId.split("_id")[1].split("{")[0];
          node_title = $messenger.attr("data-name");
          $('[name="node_id"]').val(currentNodeID);
          $('[name="to_id"]').val(currentUserID);
        }

        //console.log('messWithKey: ' + messWithKey + " - currentUserID=" + currentUserID);

        if (messVal == "/buzz") {
          // BUZZ

          var $buzz = $("#chatbox-option-buzz");
          if ($buzz.html() === "BUZZ") {
            // BUZZ chưa disable
            var timeBuzz = 59, // 30s
              timeBuzzCount;

            sendMessage(messWithKey);

            $buzz.addClass("disable"); // Thêm class để hiện số đếm lùi
            $buzz.html(60);
            timeBuzzCount = setInterval(function () {
              var zero = timeBuzz--;
              $buzz.html(zero);
              if (zero <= 0) {
                // Cho phép BUZZ
                clearInterval(timeBuzzCount);
                $buzz.removeClass("disable");
                timeBuzz = 59;
                timeBuzzCount = undefined;
                $buzz.html("BUZZ");
              }
            }, 1000);
          }
        } else if (messVal == "/out" && messId !== "publish") {
          sendMessage(messWithKey);
        } else {

          sendMessage(messWithKey);
        }
      }

      $messenger.val("");
    }
  });

  /**
   * Các công cụ soạn thảo tin nhắn
   *
   * Chữ in đậm, in nghiêng, gạch dưới, gạch bỏ
   * Chọn màu
   * Kiểm duyệt BBcode
   */
  var chooseColor = function (colo) {
    // Đổi màu chữ
    //	$("#chatbox-option-color").css("background", colo);
    $("#chatbox-input-color").val(colo.slice(1));
    //	$("#chatbox-messenger").css("color", colo);
  };
  $("#chatbox-option-color").click(function () {
    var randomColor = (function (m, s, c) {
      return (
        (c ? arguments.callee(m, s, c - 1) : "#") +
        s[m.floor(m.random() * s.length)]
      );
    })(Math, "0123456789ABCDEF", 5);
    chooseColor(randomColor);
    my_setcookie("optionColor", randomColor, false);
  });
  var cookieColor = my_getcookie("optionColor");
  if (cookieColor) {
    chooseColor(cookieColor);
  }

  $(
    "#chatbox-option-bold, #chatbox-option-italic, #chatbox-option-underline, #chatbox-option-strike"
  ).click(function () {
    var $this = $(this);

    $this.toggleClass(function () {
      var val = "1";
      if ($this.hasClass("active")) {
        val = "0";
      }
      $("#" + this.id.replace("option", "input")).val(val);
      return "active";
    });
    var arrCookie = [],
      style = "";
    $("#chatbox-form > input:not(#chatbox-input-color)").each(function (i, val) {
      var thisVal = this.value;
      arrCookie.push(thisVal);
      if (thisVal !== "0") {
        switch (i) {
          case 0:
            style += "font-weight: bold;";
            break;
          case 1:
            style += "font-style: italic;";
            break;
          case 2:
            style += "text-decoration: underline;";
            break;
          case 3:
            style += "text-decoration: line-through;";
            break;
        }
      }
    });
    $messenger.attr("style", style);
    my_setcookie("optionCookie", arrCookie.join("|"), true);
  });

  function restrictTab() {
    if (!$("#chatbox-main.clicked").length) {
      if (my_getcookie("chatbox_restrict") == 1) {
        $("#chatbox-main").addClass("restrict");
      } else $("#chatbox-main").removeClass("restrict");
      $("#chatbox-main").addClass("clicked");
    } else {
      $("#chatbox-main").removeClass("restrict");
      my_setcookie("chatbox_restrict", 0, false); // Lưu cookie
    }
  }
  $(".chatbox-change").click(function () {
    restrictTab();
  });

  var getArrCookie = my_getcookie("optionCookie");
  if (getArrCookie) {
    $.each(getArrCookie.split("|"), function (i, val) {
      if (val === "1") {
        $("#chatbox-option > div")
          .eq(i)
          .click();
      }
    });
  }

  $messenger.on("input", function () {
    var val = this.value;
    this.value = val.replace(
      /\[\/(b|i|u|strike|left|center|right|justify|size|color|font|list|quote|code|spoiler|hide|table|tr|td|flash|youtube|dailymotion|sub|sup|scroll|updown|flipv|fliph|fade|blur|wow|rand)\]|\[(\*|hr)\]/gi,
      "***"
    );
  });

  var CB_disconnect = function () {
    disconnect();
  };

  // $('#refresh_auto').prop('checked', false);
  //					 ajax_connect('?archives=0','disconnect');
  //					 if(connected)
  //						 CB_disconnect();
  //					 $('#chatbox_option_co').show();
  //					 $('#chatbox_option_disco, #chatbox_option_autorefresh, #chatbox_messenger_form').hide();
  //					 connected=0;
  //					 SetCookie('chatbox_updated', 0);var chatbox_messages = '<p class=\"chatbox_row_1 clearfix\"><span title=\"17 Nov 2014\">[06:09:35]</span>&nbsp;<span style=\"font-style:italic\">You are disconnected.</span></span></p>';
  //				 var chatbox_memberlist = '';


  __token = localStorage.getItem("token");

  $('#chatbox-forumvi').hide().after('<div class="loading-layout" style="position:absolute!important">\
    <div class= "cssload-thecube">\
    <div class="cssload-cube cssload-c1"></div>\
    <div class="cssload-cube cssload-c2"></div>\
    <div class="cssload-cube cssload-c4"></div>\
    <div class="cssload-cube cssload-c3"></div>\
  </div>\
</div>');
  $.ajax({
    url: cURL + '/message/',
    type: "get",
    //dataType: "script",
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', __token);
    },
    success: function (response) {
      console.log(response);
      if (response.status == 'success') {
        var data = response.data;
        getDone(data);

        $("#chatbox-forumvi:hidden").fadeIn(200)
        $('#chatbox-forumvi+.loading-layout').remove();

        if (location.href.indexOf('node_id=') > -1 && location.href.indexOf('node_name=') > -1 && location.href.indexOf('user_id=') > -1) {
          //console.log('check url and start /chat ');
          var ar = location.href.split(/=|&/);
          //console.log(ar);
          currentNodeID = ar[3];
          currentNodeName = decodeURIComponent(ar[5]);
          toUserName = ar[7];
          currentUserID = ar[9];

          $messenger.val('/chat [' + currentNodeID + '] {' + currentNodeName + '} ' + toUserName);
          $('[name="node_id"]').val(currentNodeID);
          $('[name="to_id"]').val(currentUserID);
          $form.submit();

          autoUpdate();

        }
      }
    },
    error: function (a, b, c) {
      console.log(a);
    }
  });
  //autoUpdate();

}

$(document).ready(function () {
  if (__token) {
    runChat();
  } else if (localStorage.getItem("token") && !__token) {
    __token = localStorage.getItem("token");
    //console.log(location.href);
    runChat();

  } else {
    $('#chatbox-forumvi').html('<div class="alerts alert-warning">Bạn phải đăng nhập để sử dụng tính năng này</div>');
  }
});
