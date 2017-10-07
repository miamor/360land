
function flatApp () {
    $('input[type="submit"]').addClass('btn btn-danger');

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass: 'iradio_minimal-red'
    });
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

jQuery(document).ready(function ($) {
    flatApp();
    $('.container').height($(window).height());
})
