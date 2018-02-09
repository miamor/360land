var InfoBoxType = {
    Product: 0,
    Project: 1,
    Utility: 2
};

function InfoBox(a) {
    a = a || {};
    google.maps.OverlayView.apply(this, arguments);
    this.content_ = a.content || "";
    this.disableAutoPan_ = a.disableAutoPan || false;
    this.maxWidth_ = a.maxWidth || 0;
    this.pixelOffset_ = a.pixelOffset || new google.maps.Size(0, 0);
    this.position_ = a.position || new google.maps.LatLng(0, 0);
    this.zIndex_ = a.zIndex || null;
    this.boxClass_ = a.boxClass || "infoBox";
    this.boxStyle_ = a.boxStyle || {};
    this.closeBoxMargin_ = a.closeBoxMargin || "2px";
    this.closeBoxURL_ = a.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
    if (a.closeBoxURL === "") {
        this.closeBoxURL_ = ""
    }
    this.infoBoxClearance_ = a.infoBoxClearance || new google.maps.Size(1, 1);
    if (typeof a.visible === "undefined") {
        if (typeof a.isHidden === "undefined") {
            a.visible = true
        } else {
            a.visible = !a.isHidden
        }
    }
    this.isHidden_ = !a.visible;
    this.alignBottom_ = a.alignBottom || false;
    this.pane_ = a.pane || "floatPane";
    this.enableEventPropagation_ = a.enableEventPropagation || false;
    this.div_ = null;
    this.closeListener_ = null;
    this.moveListener_ = null;
    this.contextListener_ = null;
    this.eventListeners_ = null;
    this.fixedWidthSet_ = null;
    this.listeners_ = [];
    this.avatarClickCallBack_ = null;
    this.avatarClickContext_ = null;
    this._infoBoxType = InfoBoxType.Product
}
InfoBox.prototype = new google.maps.OverlayView();
InfoBox.prototype.createInfoBoxDiv_ = function() {
    var i;
    var a;
    var b;
    var c = this;
    var d = function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation()
        }
    };
    var f = function(e) {
        e.returnValue = false;
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (!c.enableEventPropagation_) {
            d(e)
        }
    };
    if (!this.div_) {
        this.div_ = document.createElement("div");
        var g = document.createElement("div");
        g.className = "bdsInfoWindow-head";
        var h = document.createElement("div");
        h.className = "bdsInfoWindow-body";
        var j = document.createElement("div");
        if (this.closeBoxURL_ != undefined && this.closeBoxURL_.length > 0) {
            var k = document.createElement("img");
            k.style.cursor = "pointer";
            k.style.position = "absolute";
            k.style.top = '8px';
            k.style.right = '5px';
            k.src = this.closeBoxURL_;
            k.className = 'closeButton'
        }
        this.setBoxStyle_();
        if (typeof this.content_.nodeType === "undefined") {
            j.innerHTML = this.content_
        } else {
            j.appendChild(this.content_)
        }
        h.appendChild(k);
        h.appendChild(j);
        g.appendChild(h);
        this.div_.appendChild(g);
        this.getPanes()[this.pane_].appendChild(this.div_);
        this.addClickHandler_();
        if (this.div_.style.width) {
            this.fixedWidthSet_ = true
        } else {
            if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {
                this.div_.style.width = this.maxWidth_;
                this.div_.style.overflow = "auto";
                this.fixedWidthSet_ = true
            } else {
                b = this.getBoxWidths_();
                this.div_.style.width = (this.div_.offsetWidth - b.left - b.right) + "px";
                this.fixedWidthSet_ = false
            }
        }
        this.panBox_(this.disableAutoPan_);
        if (!this.enableEventPropagation_) {
            this.eventListeners_ = [];
            a = ["mousemove", "mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"];
            for (i = 0; i < a.length; i++) {
                this.eventListeners_.push(google.maps.event.addDomListener(this.div_, a[i], d))
            }
            this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function(e) {
                this.style.cursor = "default"
            }))
        }
        this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", f);
        google.maps.event.trigger(this, "domready")
    }
};
InfoBox.prototype.addClickHandler_ = function() {
    var a;
    this.addCancelHandler_(this.div_);
    if (this.closeBoxURL_ !== "") {
        a = this.div_.firstChild.firstChild.firstChild;
        this.closeListener_ = google.maps.event.addDomListener(a, "click", this.getCloseClickHandler_())
    } else {
        this.closeListener_ = null
    }
};
InfoBox.events = ['mousedown', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchend', 'touchmove', 'dblclick', 'contextmenu', 'click'];
InfoBox.prototype.addCancelHandler_ = function(a) {
    if (a.tagName.toLowerCase() == 'img' && a.className == 'closeButton') {
        return
    }
    var b = this;
    this.listeners_.push(google.maps.event.addDomListener(a, 'click', function(e) {
        if (e.type == 'click') {
            if (e.toElement && e.toElement.tagName.toLowerCase() == 'img') {
                if (b.avatarClickCallBack_ != null) {
                    b.avatarClickCallBack_(b.avatarClickContext_)
                }
            }
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation()
        }
    }));
    for (var i = 0; i < a.childElementCount; i++) {
        this.addCancelHandler_(a.children[i])
    }
};
InfoBox.prototype.avatarClickHandler = function(a, b) {
    this.avatarClickCallBack_ = b;
    this.avatarClickContext_ = a
};
InfoBox.prototype.getCloseClickHandler_ = function() {
    var a = this;
    return function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation()
        }
        a.close();
        google.maps.event.trigger(a, "closeclick");
        a.closeInfoCallBack()
    }
};
InfoBox.prototype.closeInfoCallBack = function() {};
InfoBox.prototype.getCancelHandler_ = function(a) {
    return function(e) {
        e.cancelBubble = true;
        e.stopPropagation()
    }
};
InfoBox.prototype.panBox_ = function(a) {
    var b;
    var c = 0,
        yOffset = 0;
    if (!a) {
        b = this.getMap();
        if (b instanceof google.maps.Map) {
            if (!b.getBounds().contains(this.position_)) {
                b.setCenter(this.position_)
            }
            var d = b.getDiv();
            var e = d.offsetWidth;
            var f = d.offsetHeight;
            var g = this.pixelOffset_.width;
            var h = this.pixelOffset_.height;
            var i = this.div_.offsetWidth;
            var j = this.div_.offsetHeight;
            var k = this.infoBoxClearance_.width;
            var l = this.infoBoxClearance_.height;
            var m = this.getProjection().fromLatLngToContainerPixel(this.position_);
            if (m.x < 226 && m.y < 276) {
                c = m.x - 226;
                yOffset = m.y - 276
            } else {
                if (m.x < 350 && m.y < 276) {
                    c = m.x - 350
                } else {
                    if (m.x < (-g + k)) {
                        c = m.x + g - k
                    } else if ((m.x + i + g + k) > e) {
                        c = m.x + i + g + k - e
                    }
                }
                if (this.alignBottom_) {
                    if (m.y < (h + l + j)) {
                        yOffset = m.y - h - l - j
                    } else if ((m.y + h + l) > f) {
                        yOffset = m.y + h + l - f
                    }
                } else {
                    if (m.y < (-h + l)) {
                        yOffset = m.y + h - l
                    } else if ((m.y + j + h + l) > f) {
                        yOffset = m.y + j + h + l - f
                    }
                }
            }
            if (!(c === 0 && yOffset === 0)) {
                b.panBy(c, yOffset)
            }
        }
    }
};
InfoBox.prototype.setBoxStyle_ = function() {
    var i, boxStyle;
    if (this.div_) {
        this.div_.className = this.boxClass_;
        this.div_.style.cssText = "";
        boxStyle = this.boxStyle_;
        for (i in boxStyle) {
            if (boxStyle.hasOwnProperty(i)) {
                this.div_.style[i] = boxStyle[i]
            }
        }
        if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
            this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")"
        }
        this.div_.style.position = "absolute";
        this.div_.style.visibility = 'hidden';
        if (this.zIndex_ !== null) {
            this.div_.style.zIndex = this.zIndex_
        }
    }
};
InfoBox.prototype.getBoxWidths_ = function() {
    var a;
    var b = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    var c = this.div_;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        a = c.ownerDocument.defaultView.getComputedStyle(c, "");
        if (a) {
            b.top = parseInt(a.borderTopWidth, 10) || 0;
            b.bottom = parseInt(a.borderBottomWidth, 10) || 0;
            b.left = parseInt(a.borderLeftWidth, 10) || 0;
            b.right = parseInt(a.borderRightWidth, 10) || 0
        }
    } else if (document.documentElement.currentStyle) {
        if (c.currentStyle) {
            b.top = parseInt(c.currentStyle.borderTopWidth, 10) || 0;
            b.bottom = parseInt(c.currentStyle.borderBottomWidth, 10) || 0;
            b.left = parseInt(c.currentStyle.borderLeftWidth, 10) || 0;
            b.right = parseInt(c.currentStyle.borderRightWidth, 10) || 0
        }
    }
    return b
};
InfoBox.prototype.onRemove = function() {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null
    }
};
InfoBox.prototype.draw = function() {
    this.createInfoBoxDiv_();
    var a = this.getProjection().fromLatLngToDivPixel(this.position_);
    this.div_.style.left = (a.x + this.pixelOffset_.width) + "px";
    if (this.alignBottom_) {
        this.div_.style.bottom = -(a.y - this.pixelOffset_.height) + "px"
    } else {
        this.div_.style.top = (a.y - this.pixelOffset_.height) + "px"
    }
    if (this.isHidden_) {
        this.div_.style.visibility = 'hidden'
    } else {
        this.div_.style.visibility = "visible"
    }
};
InfoBox.prototype.setOptions = function(a) {
    if (typeof a.boxClass !== "undefined") {
        this.boxClass_ = a.boxClass;
        this.setBoxStyle_()
    }
    if (typeof a.boxStyle !== "undefined") {
        this.boxStyle_ = a.boxStyle;
        this.setBoxStyle_()
    }
    if (typeof a.content !== "undefined") {
        this.setContent(a.content)
    }
    if (typeof a.disableAutoPan !== "undefined") {
        this.disableAutoPan_ = a.disableAutoPan
    }
    if (typeof a.maxWidth !== "undefined") {
        this.maxWidth_ = a.maxWidth
    }
    if (typeof a.pixelOffset !== "undefined") {
        this.pixelOffset_ = a.pixelOffset
    }
    if (typeof a.alignBottom !== "undefined") {
        this.alignBottom_ = a.alignBottom
    }
    if (typeof a.position !== "undefined") {
        this.setPosition(a.position)
    }
    if (typeof a.zIndex !== "undefined") {
        this.setZIndex(a.zIndex)
    }
    if (typeof a.closeBoxMargin !== "undefined") {
        this.closeBoxMargin_ = a.closeBoxMargin
    }
    if (typeof a.closeBoxURL !== "undefined") {
        this.closeBoxURL_ = a.closeBoxURL
    }
    if (typeof a.infoBoxClearance !== "undefined") {
        this.infoBoxClearance_ = a.infoBoxClearance
    }
    if (typeof a.isHidden !== "undefined") {
        this.isHidden_ = a.isHidden
    }
    if (typeof a.visible !== "undefined") {
        this.isHidden_ = !a.visible
    }
    if (typeof a.enableEventPropagation !== "undefined") {
        this.enableEventPropagation_ = a.enableEventPropagation
    }
    if (this.div_) {
        this.draw()
    }
};
InfoBox.prototype.setContent = function(a) {
    this.content_ = a;
    this.avatarClickCallBack_ = null;
    if (this.div_) {
        if (this.closeListener_) {
            google.maps.event.removeListener(this.closeListener_);
            this.closeListener_ = null
        }
        if (!this.fixedWidthSet_) {
            this.div_.style.width = ""
        }
        if (typeof a.nodeType === "undefined") {
            this.div_.firstChild.firstChild.children[1].innerHTML = a
        } else {
            this.div_.firstChild.firstChild.children[1].innerHTML = '';
            this.div_.firstChild.firstChild.children[1].appendChild(a)
        }
        if (!this.fixedWidthSet_) {
            this.div_.style.width = this.div_.offsetWidth + "px";
            if (typeof a.nodeType === "undefined") {
                this.div_.firstChild.firstChild.children[1].innerHTML = a
            } else {
                this.div_.firstChild.firstChild.children[1].innerHTML = '';
                this.div_.firstChild.firstChild.children[1].appendChild(a)
            }
        }
        this.addClickHandler_()
    }
    google.maps.event.trigger(this, "content_changed")
};
InfoBox.prototype.setPosition = function(a) {
    this.position_ = a;
    if (this.div_) {
        this.draw()
    }
    google.maps.event.trigger(this, "position_changed")
};
InfoBox.prototype.setZIndex = function(a) {
    this.zIndex_ = a;
    if (this.div_) {
        this.div_.style.zIndex = a
    }
    google.maps.event.trigger(this, "zindex_changed")
};
InfoBox.prototype.setVisible = function(a) {
    this.isHidden_ = !a;
    if (this.div_) {
        this.div_.style.visibility = (this.isHidden_ ? "hidden" : "visible")
    }
};
InfoBox.prototype.getContent = function() {
    return this.content_
};
InfoBox.prototype.getPosition = function() {
    return this.position_
};
InfoBox.prototype.getZIndex = function() {
    return this.zIndex_
};
InfoBox.prototype.getVisible = function() {
    var a;
    if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
        a = false
    } else {
        a = !this.isHidden_
    }
    return a
};
InfoBox.prototype.show = function() {
    this.isHidden_ = false;
    if (this.div_) {
        this.div_.style.visibility = "visible"
    }
};
InfoBox.prototype.hide = function() {
    this.isHidden_ = true;
    if (this.div_) {
        this.div_.style.visibility = "hidden"
    }
};
InfoBox.prototype.open = function(a, b, c, d) {
    var e = this;
    this.pixelOffset_.height = c;
    if (b) {
        this.position_ = b.getPosition();
        this.moveListener_ = google.maps.event.addListener(b, "position_changed", function() {
            e.setPosition(this.getPosition())
        })
    }
    if (typeof(d) == 'undefined') {
        this._infoBoxType = InfoBoxType.Product
    } else {
        this._infoBoxType = d
    }
    this.setMap(a);
    if (this.div_) {
        this.panBox_()
    }
};
InfoBox.prototype.close = function() {
    var i;
    if (this.closeListener_) {
        google.maps.event.removeListener(this.closeListener_);
        this.closeListener_ = null
    }
    if (this.eventListeners_) {
        for (i = 0; i < this.eventListeners_.length; i++) {
            google.maps.event.removeListener(this.eventListeners_[i])
        }
        this.eventListeners_ = null
    }
    if (this.moveListener_) {
        google.maps.event.removeListener(this.moveListener_);
        this.moveListener_ = null
    }
    if (this.contextListener_) {
        google.maps.event.removeListener(this.contextListener_);
        this.contextListener_ = null
    }
    this.setMap(null)
};
var MapTypeEnum = {
    Product: 0,
    Project: 1
};
var searchTypeEnum = {
    SearchForm: 0,
    SearchMap: 1
};
var loadingHtml = {
    message: '<img width="40" src="http://file4.batdongsan.com.vn/images/Product/Maps/map-loading.gif">',
    css: {
        border: '1px solid #ccc',
        padding: 'none',
        width: '40px',
        height: '40px'
    }
};
/*
$.ui.autocomplete.prototype._renderItem=function(a,b)
	{
	var c=this.term.split(' ');
	var t=b.label.split(' ');
	var d='';
	var e=new RegExp("(~|!|@|#|\\$|%|\\^|&|\\*|\\(|\\)|_|\\+|\\
		{
		|\\
	}
	|\\||\"|:|\\?|>|<|,|\\.|\\/|;
	|'|\\\|[|]|=|-)","gi");
	for(var j=0;
	j<t.length;
	j++)
		{
		if(d.length>0)d+=' ';
		var f=t[j];
		for(var i=0;
		i<c.length;
		i++)
			{
			if(UnicodeToKoDau(c[i].replace(e,"")).toLowerCase()==UnicodeToKoDau(f.replace(e,"")).toLowerCase())
				{
				f='<b>'+f+'</b>';
				break
			}
		}
		d+=f
	}
	return $("<li></li>").data("item.autocomplete",b).append("<a>"+d+"</a>").appendTo(a)
};
*/
var traceEventMap = function(a) {
    try {
        ga('send', 'event', a == MapTypeEnum.Product ? 'Bản đồ tin rao' : 'Bản đồ dự án', 'click', a == MapTypeEnum.Product ? 'Tìm kiếm tin rao trên bản đồ' : 'Tìm kiếm dự án trên bản đồ')
    } catch (e) {}
};
var browser = {
    isMobile: window.navigator.userAgent.indexOf('iPad') > 0
};
var minZoomAllowSearch = 10;
var minZoom = 5;
(function($) {
        function CoordMapType(a) {
            this.tileSize = a
        };
        CoordMapType.prototype.getTile = function(a, b, c) {
            var d = c.createElement('div');
            d.innerHTML = a;
            d.style.width = this.tileSize.width + 'px';
            d.style.height = this.tileSize.height + 'px';
            d.style.fontSize = '10';
            d.style.borderStyle = 'solid';
            d.style.borderWidth = '1px';
            d.style.borderColor = '#AAAAAA';
            return d
        };
        ProductMap = function(o, p, q, r, s) {
            var v = $(this).attr('id');
            $thismap = this;
            this.data = [];
            this.dataProject = [];
            this.map = null;
            this.mapType = s.mapType;
            this.mapPoly = null;
            this.polyline = null;
            this.listLatlgn = null;
            this.projectOverlay = new Array();
            this.markerCluster = null;
            this.geocoder = new google.maps.Geocoder();
            this.circle = null;
            this.currentPID = null;
            this.currentPjID = null;
            this.currentUID = null;
            this.BoxSearchPlace = null;
            this.tooltip = null;
            this.btnUpdateMapIdleResult = $('.btn-map-update-result');
            this.isDrawing = s.lstPoint != undefined && s.lstPoint != '';
            this.isMapIdle = false;
            this.isShowRefreshButton = false;
            this.isShowUtil = false;
            this.infoBoxOptions = {
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-188, 20),
                zIndex: 1000,
                boxClass: 'bdsInfoWindow',
                closeBoxURL: "http://file4.batdongsan.com.vn/images/Product/Maps/close.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                alignBottom: true,
                enableEventPropagation: false
            };
            this.infoWindow = null;
            this.initialize = function() {
                $thismap.currentPID = s.currentPID;
                if ($thismap.mapType == MapTypeEnum.Project) $thismap.currentPjID = s.projectid;
                var e = 10;
                if (s.zoom != '') e = parseInt(s.zoom);
                var f = 10.843928;
                var g = 106.717672;
                if (s.center != '') {
                    f = parseFloat(s.center.split(':')[0]);
                    g = parseFloat(s.center.split(':')[1])
                }
                if (s.lstPoint != '') {
                    this.isDrawing = true;
                    this.isMapIdle = false;
                    this.btnUpdateMapIdleResult.hide();
                    var h = s.lstPoint.split(',');
                    if (h.length >= 5) {
                        this.listLatlgn = new Array();
                        for (var i = 0; i < h.length; i++) {
                            var j = h[i].split(':');
                            this.listLatlgn.push(new google.maps.LatLng(parseFloat(j[0]), parseFloat(j[1])))
                        }
                    }
                }
                var k = {
                    center: new google.maps.LatLng(f, g),
                    zoom: e,
                    overviewMapControl: true,
                    overviewMapControlOptions: {
                        opened: false
                    },
                    panControl: false,
                    rotateControl: false,
                    scaleControl: false,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    },
                    draggable: true
                };
                this.map = new google.maps.Map(document.getElementById(v), k);
                this.tooltip = new Tooltip({
                    map: this.map
                });
                this.BoxSearchPlace = (document.getElementById('search-place'));
                this.KeywordSearch = (document.getElementById('txtKeyword'));
                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('controlArea'));
                this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('controlUtility'));
                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.BoxSearchPlace);
                var l = new google.maps.places.Autocomplete(this.BoxSearchPlace, {
                    types: ['geocode']
                });
                l.bindTo('bounds', this.map);
                google.maps.event.addListener(l, 'place_changed', function() {
                    var a = l.getPlace();
                    if (!a.geometry) {
                        return
                    }
                    if (a.geometry.viewport) {
                        $thismap.map.fitBounds(a.geometry.viewport)
                    } else {
                        $thismap.map.setCenter(a.geometry.location);
                        $thismap.map.setZoom(17)
                    }
                    $thismap.DeleteShape();
                    $thismap.callBackSearchPlace(a.geometry.location.lat(), a.geometry.location.lng(), a.address_components)
                });
                var m = new google.maps.ImageMapType({
                    getTileUrl: function(a, b) {
                        if (b >= 9 && b <= 18 && $thismap.map.getMapTypeId() == google.maps.MapTypeId.ROADMAP) {
                            return 'http://file1.batdongsan.com.vn/MapFile/full/' + b + '_' + a.x + '_' + a.y + '.png'
                        }
                        return null
                    },
                    tileSize: new google.maps.Size(256, 256)
                });
                this.map.overlayMapTypes.push(m);
                google.maps.event.addListener(this.map, 'click', function(a) {});
                google.maps.event.addListener(this.map, 'zoom_changed', function() {
                    if (this.getZoom() < minZoom) {
                        this.setZoom(minZoom);
                        return
                    }
                    $thismap.callBackMapChange()
                });
                if (this.listLatlgn != null) {
                    this.polyline = new google.maps.Polygon({
                        path: this.listLatlgn,
                        strokeColor: '#585858',
                        strokeWeight: 3,
                        editable: true,
                        fillColor: "#ccc",
                        fillOpacity: 0.5
                    });
                    this.polyline.setMap(this.map)
                }
                $thismap.btnUpdateMapIdleResult.bind('click', function() {
                    traceEventMap($thismap.mapType);
                    $thismap.ClearUtilitiesAroundPoint();
                    $thismap.clearPoint();
                    $thismap.callBackClearPointEvent();
                    if ($thismap.polyline != undefined) $thismap.polyline.setMap(undefined);
                    $thismap.btnUpdateMapIdleResult.hide();
                    var a = new Array();
                    var b = $thismap.map.getBounds();
                    var c = b.getNorthEast();
                    var d = b.getSouthWest();
                    a.push(new google.maps.LatLng(c.lat(), d.lng()));
                    a.push(new google.maps.LatLng(d.lat(), d.lng()));
                    a.push(new google.maps.LatLng(d.lat(), c.lng()));
                    a.push(new google.maps.LatLng(c.lat(), c.lng()));
                    $thismap.polyline = new google.maps.Polygon({
                        path: a
                    });
                    $thismap.findPoint($thismap.polyline, {
                        zoom: $thismap.getZoom(),
                        center: $thismap.getCenter()
                    })
                });
                google.maps.event.addListener(this.map, 'idle', function() {
                    var a = this;
                    if (a.getZoom() >= minZoomAllowSearch && !$thismap.isDrawing && !$thismap.isShowUtil && !$thismap.IsShowDetail && $thismap.isShowRefreshButton) {
                        $thismap.btnUpdateMapIdleResult.show("highlight", 1000)
                    } else {
                        $thismap.btnUpdateMapIdleResult.hide();
                        $thismap.isShowRefreshButton = true;
                        $thismap.isMapIdle = false
                    }
                    $thismap.callBackMapChange()
                });
                if (browser.isMobile) {
                    this.infoWindow = new google.maps.InfoWindow()
                } else {
                    this.infoWindow = new InfoBox(this.infoBoxOptions);
                    this.infoWindow.closeInfoCallBack = function() {
                        if (this._infoBoxType == InfoBoxType.Utility) return;
                        $thismap.IsShowDetail = false;
                        if (!$thismap.isDrawing) {
                            $thismap.btnUpdateMapIdleResult.show()
                        }
                        switch ($thismap.mapType) {
                            case MapTypeEnum.Product:
                                var a = $thismap.findMarker($thismap.currentPID);
                                if (a != null) {
                                    a.setIcon({
                                        url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker5.png",
                                        size: new google.maps.Size(23, 26)
                                    });
                                    a.setZIndex()
                                }
                                $thismap.currentPID = null;
                                break;
                            case MapTypeEnum.Project:
                                var b = $thismap.findProjectMarker($thismap.currentPjID);
                                if (b != null) {
                                    b.setIcon({
                                        url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p.png",
                                        size: new google.maps.Size(24, 29)
                                    });
                                    b.setZIndex()
                                }
                                $thismap.currentPjID = null;
                                break
                        }
                    }
                }
            };
            this.setContext = function(a, b, c) {
                if (a != undefined && a != '') {
                    this.showInfoWindow(a)
                }
                if (b != undefined && c != undefined) {
                    var d = parseFloat(c.split(':')[0]);
                    var e = parseFloat(c.split(':')[1]);
                    this.map.setCenter(new google.maps.LatLng(d, e));
                    this.map.setZoom(parseInt(b))
                }
            };
            this.getMapBounds = function() {
                var a = $thismap.map.getBounds();
                if (a == undefined) return "";
                var b = a.getNorthEast();
                var c = a.getSouthWest();
                return b.lat() + ":" + c.lng() + "," + c.lat() + ":" + c.lng() + "," + c.lat() + ":" + b.lng() + "," + b.lat() + ":" + b.lng()
            };
            this.getCornerBounds = function() {
                var a = $thismap.map.getBounds();
                if (a == undefined) return null;
                var b = a.getNorthEast();
                var c = a.getSouthWest();
                var d = {
                    minLat: c.lat(),
                    minLong: c.lng(),
                    maxLat: b.lat(),
                    maxLong: b.lng()
                };
                return d
            };
            this.getBoundOfPolygon = function(a) {
                var b = a.split(',');
                if (b < 2) return {};
                var c = 0,
                    minLat = 100000,
                    maxLng = 0,
                    minLng = 100000;
                for (var i = 0; i < b.length; i++) {
                    var d = b[i].split(':');
                    var e = parseFloat(d[0]);
                    var f = parseFloat(d[1]);
                    if (c < e) c = e;
                    if (minLat > e) minLat = e;
                    if (minLng > f) minLng = f;
                    if (maxLng < f) maxLng = f
                }
                var g = {
                    minLat: minLat,
                    minLong: minLng,
                    maxLat: c,
                    maxLong: maxLng
                };
                return g
            };
            this.callBackMapChange = function() {};
            this.getZoom = function() {
                return this.map.getZoom()
            };
            this.getCenter = function() {
                return this.map.getCenter().lat() + ':' + this.map.getCenter().lng()
            };
            this.callBackSearchPlace = function() {};
            this.beginDrawButton = $('.' + o);
            this.deleteShapeButton = $('.' + p);
            this.fullScreenButton = $('.' + q);
            this.exitFullScreenButton = $('.' + r);
            this.fullScreenButton.bind('click', this, function(a) {
                $('body').css('overflow', 'hidden');
                $('#wrap-comment').hide();
                $('.dropdown-navigative-menu').css('z-index', 0);
                a.data.BoxSearchPlace.style.display = 'block';
                $('.map-view').addClass('map-view-fullscreen');
                $('.main-view').css('position', 'fixed');
                $('.main-view').css('height', $(document).height());
                $('.main-view').addClass('main-view-fullscreen');
                if ($('.search-result-map').is(":not(:hidden)")) {
                    $('.search-result-map').css('position', 'fixed');
                    $('.search-result-map').css('bottom', '0');
                    $('.search-result-map').css('margin-left', '-300px')
                }
                $('.list-view').addClass('list-view-fullscreen');
                $('.item-view').css('height', '0px');
                $('.page-view').css('display', 'none');
                setTimeout(function() {
                    $(".page-view").css("display", "block");
                }, 500);
                $thismap.btnUpdateMapIdleResult.css('margin-left', '265px');
                a.data.exitFullScreenButton.css('display', 'block');
                a.data.fullScreenButton.hide();
                google.maps.event.trigger(a.data.map, "resize")
            });
            this.exitFullScreenButton.bind('click', this, function(a) {
                a.data.BoxSearchPlace.style.display = 'none';
                $('.map-view').removeClass('map-view-fullscreen');
                $('.main-view').css('position', 'relative');
                $('.main-view').css('height', 'auto');
                $('.main-view').removeClass('main-view-fullscreen');
                $('.list-view').removeClass('list-view-fullscreen');
                if ($('.search-result-map').is(":not(:hidden)")) {
                    $('.search-result-map').removeAttr('style')
                }
                a.data.exitFullScreenButton.hide();
                a.data.fullScreenButton.show();
                $('.item-view').css('height', '480px');
                $thismap.btnUpdateMapIdleResult.css('margin-left', '400px');
                google.maps.event.trigger(a.data.map, "resize");
                $('body').css('overflow', 'auto');
                $('#wrap-comment').show();
                $('.dropdown-navigative-menu').css('z-index', 1000)
            });
            this.beginDrawButton.bind('click', this, function(b) {
                if (b.data.map.getZoom() < minZoomAllowSearch) {
                    alert('Bạn cần phóng to bản đồ hơn nữa vào khu vực bạn cần vẽ');
                    return
                }
                $thismap.isDrawing = true;
                $thismap.btnUpdateMapIdleResult.hide();
                b.data.beginDrawButton.hide();
                b.data.deleteShapeButton.show();
                b.data.ClearUtilitiesAroundPoint();
                b.data.clearPoint();
                b.data.callBackClearPointEvent();
                if (b.data.polyline != undefined) b.data.polyline.setMap(undefined);
                b.data.mapPoly = new google.maps.Polyline({
                    strokeColor: '#585858',
                    strokeOpacity: 1,
                    map: b.data.map
                });
                b.data.map.setOptions({
                    draggableCursor: "crosshair",
                    draggable: false
                });
                var f = 10;
                var c = 0;

                function _beginDrawEvent(a) {
                    return function() {
                        a.listLatlgn = new Array();

                        function _mouseMoveEvent(j) {
                            a.mapPoly.getPath().push(j.latLng);
                            var i = new Date().valueOf();
                            if (i - c >= f) {
                                c = i;
                                a.listLatlgn.push(j.latLng)
                            }
                        }
                        google.maps.event.addListener(b.data.map, "mousemove", function(j) {
                            _mouseMoveEvent(j)
                        })
                    }
                };
                if (browser.isMobile) {
                    $('body').bind('touchmove', function(e) {
                        e.preventDefault();
                        e.stopPropagation()
                    })
                }
                google.maps.event.addListener(b.data.map, "mousedown", _beginDrawEvent(b.data));

                function _endDrawEvent(a) {
                    return function() {
                        if (browser.isMobile == false) {
                            $('body').unbind('mouseup')
                        } else {
                            $('body').unbind('touchend')
                        }
                        if (a.mapPoly != undefined) {
                            if (browser.isMobile) {
                                $('body').unbind('touchmove')
                            }
                            a.map.setOptions({
                                draggableCursor: "openhand",
                                draggable: true
                            });
                            google.maps.event.clearListeners(a.map, 'mousedown');
                            google.maps.event.clearListeners(a.map, 'mousemove');
                            a.mapPoly.setMap(undefined);
                            a.endDraw();
                            a.callBackMapChange()
                        }
                    }
                };
                if (browser.isMobile == false) {
                    $('body').bind('mouseup', this, _endDrawEvent(b.data))
                } else {
                    $('body').bind('touchend', this, _endDrawEvent(b.data))
                }
            });
            this.deleteShapeButton.bind('click', this, function(a) {
                a.data.DeleteShape()
            });
            this.DeleteShape = function(a) {
                this.beginDrawButton.show();
                this.deleteShapeButton.hide();
                if (this.polyline != undefined) {
                    this.polyline.setMap(undefined);
                    this.polyline = null
                }
                this.clearPoint();
                $thismap.isDrawing = false;
                $thismap.isMapIdle = false;
                this.callBackClearPointEvent(true);
                if (typeof(a) == 'undefined' || !a) {
                    $thismap.btnUpdateMapIdleResult.show()
                }
            };
            this.endDraw = function(a) {
                if ($thismap.listLatlgn != null) {
                    this.beginDrawButton.hide();
                    this.deleteShapeButton.show();
                    var b = new Array();
                    if (a == undefined) {
                        var c = 5;
                        var x;
                        x = Math.round($thismap.listLatlgn.length / 50);
                        if ($thismap.listLatlgn.length < 30) {
                            c = 1;
                            x = 2
                        }
                        for (var i = 0; i < $thismap.listLatlgn.length; i++) {
                            if (i % (c * x) == 0) {
                                b.push($thismap.listLatlgn[i])
                            }
                        }
                    } else {
                        b = $thismap.listLatlgn
                    }
                    $thismap.polyline = new google.maps.Polygon({
                        path: b,
                        strokeColor: '#585858',
                        strokeWeight: 3,
                        editable: true,
                        fillColor: "#ccc",
                        fillOpacity: 0.5
                    });
                    $thismap.polyline.setMap($thismap.map);
                    $thismap.findPoint($thismap.polyline, a);
                    $thismap.btnUpdateMapIdleResult.hide();
                    google.maps.event.addListener($thismap.polyline.getPath(), 'set_at', function() {
                        $thismap.findPoint($thismap.polyline)
                    });
                    google.maps.event.addListener($thismap.polyline.getPath(), 'insert_at', function() {
                        $thismap.findPoint($thismap.polyline)
                    })
                }
                $thismap.listLatlgn = null
            };
            this.markers = new Array();
            this.markersProject = new Array();
            this.callBackDrawEvent = function() {};
            this.findPoint = function(a, b) {
                this.clearPoint();
                var c = a.getPath().getArray();
                var d = 0,
                    minLat = 100000,
                    maxLng = 0,
                    minLng = 100000;
                var e = '';
                for (var i = 0; i < c.length; i++) {
                    var f = c[i].lat();
                    var g = c[i].lng();
                    if (e.length > 0) e += ',';
                    e += f + ':' + g;
                    if (d < f) d = f;
                    if (minLat > f) minLat = f;
                    if (minLng > g) minLng = g;
                    if (maxLng < g) maxLng = g
                }
                if (this.callBackDrawEvent) {
                    this.callBackDrawEvent(d, minLat, maxLng, minLng, e, b)
                }
            };
            this.isInPolyline = function(a, b) {
                if (this.polyline != undefined && this.polyline != null) {
                    return google.maps.geometry.poly.containsLocation(new google.maps.LatLng(a, b), this.polyline)
                }
                return true
            };
            this.clearPoint = function() {
                this.infoWindow.close();
                this.ClearUtilitiesAroundPoint();
                if ($thismap.markers != undefined) {
                    for (var t = 0; t < $thismap.markers.length; t++) {
                        $thismap.markers[t].setMap(null)
                    }
                    $thismap.markers = []
                }
                if ($thismap.markersProject != undefined) {
                    for (var t = 0; t < $thismap.markersProject.length; t++) {
                        $thismap.markersProject[t].setMap(null)
                    }
                    $thismap.markersProject = []
                }
                if (this.markerCluster != null) {
                    this.markerCluster.clearMarkers()
                }
            };
            this.callBackClearPointEvent = function() {};
            this.showPoint = function(a, b) {
                this.clearPoint();
                for (var j = 0; j < a.length; j++) {
                    var c = a[j];
                    var d = null;
                    if (!device.ipad() && !device.tablet() && !device.ipod() && !device.iphone() && !device.androidTablet() && !device.blackberryTablet() && !device.android()) {
                        if (c.vip == 0) d = google.maps.Animation.DROP;
                        var f = '<div class="infowindow-product-preview">';
                        f += '<div class="infowindow-product-preview-detail">';
                        f += '<span class="infowindow-product-preview-title infowindow-title-vip' + c.vip + '">' + c.title + '</span><br/>';
                        if (c.avatar.length > 0 && c.avatar.indexOf('no-photo.jpg') < 0) {
                            f += '<div class="infowindow-product-preview-avatar">';
                            f += '<img src="' + c.avatar + '" alt="" />';
                            f += '</div>'
                        }
                        f += '<strong>Giá: </strong>' + c.price + '<br/>';
                        f += '<strong>Diện tích: </strong>' + c.area;
                        f += '</div>';
                        f += '</div>'
                    }
                    $thismap.markers.push(new google.maps.Marker({
                        position: new google.maps.LatLng(c.lat, c.lon),
                        map: this.map,
                        tooltip: f,
                        icon: {
                            url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker5.png",
                            size: new google.maps.Size(23, 26)
                        },
                        animation: d,
                        zIndex: (6 - c.vip)
                    }));
                    $thismap.markers[$thismap.markers.length - 1].id = c.id
                }
                for (var i = 0; i < $thismap.markers.length; i++) {
                    $thismap.markers[i].addListener('click', function() {
                        $thismap.showInfoWindow(this.id)
                    });
                    $thismap.markers[i].addListener('mouseover', function() {
                        if (this.id != $thismap.currentPID) {
                            this.setIcon({
                                url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-hover.png",
                                size: new google.maps.Size(23, 26)
                            });
                            $thismap.tooltip.addTip(this);
                            $thismap.tooltip.getPos2(this.getPosition())
                        }
                    });
                    $thismap.markers[i].addListener('mouseout', function() {
                        if (this.id != $thismap.currentPID) {
                            this.setIcon({
                                url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker5.png",
                                size: new google.maps.Size(23, 26)
                            })
                        }
                        $thismap.tooltip.removeTip()
                    })
                }
                if (b !== undefined && b) {
                    if (this.polyline != undefined && this.polyline != null) {
                        var g = new google.maps.LatLngBounds();
                        this.polyline.getPath().forEach(function(e) {
                            g.extend(e)
                        });
                        this.map.fitBounds(g)
                    }
                }
            };
            this.showPointProject = function(a) {
                this.clearPoint();
                for (var j = 0; j < a.length; j++) {
                    var b = a[j];
                    var c = this._getProjectTooltipContentString(b);
                    $thismap.markersProject.push(new google.maps.Marker({
                        position: new google.maps.LatLng(b.lat, b.lon),
                        map: this.map,
                        tooltip: c,
                        icon: {
                            url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p.png",
                            size: new google.maps.Size(24, 29)
                        }
                    }));
                    $thismap.markersProject[$thismap.markersProject.length - 1].id = b.id
                }
                for (var i = 0; i < $thismap.markersProject.length; i++) {
                    $thismap.markersProject[i].addListener('click', function() {
                        if ($thismap.dataProject != null && $thismap.dataProject != undefined && $thismap.dataProject.length > 0) {
                            for (var i = 0; i < $thismap.dataProject.length; i++) {
                                if ($thismap.dataProject[i].id == this.id) {
                                    $thismap.ShowProject($thismap.dataProject[i]);
                                    break
                                }
                            }
                        }
                    });
                    $thismap.markersProject[i].addListener('mouseover', function() {
                        if (this.id != $thismap.currentPjID) {
                            this.setIcon({
                                url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p-hover.png",
                                size: new google.maps.Size(24, 29)
                            });
                            $thismap.tooltip.addTip(this);
                            $thismap.tooltip.getPos2(this.getPosition())
                        }
                    });
                    $thismap.markersProject[i].addListener('mouseout', function() {
                        if (this.id != $thismap.currentPjID) {
                            this.setIcon({
                                url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p.png",
                                size: new google.maps.Size(24, 29)
                            })
                        }
                        $thismap.tooltip.removeTip()
                    })
                }
            };
            this.callBackAfterInfowindowClose = function() {};
            this.callbackShowInfoWindow = function() {};
            this.IsShowDetail = false;
            this.showInfoWindow = function(d) {
                this.IsShowDetail = true;
                this.btnUpdateMapIdleResult.hide();
                if (device.ipad() || device.tablet() || device.ipod() || device.iphone() || device.androidTablet() || device.blackberryTablet() || device.android()) {
                    $('.controls-utility').css('width', '300px');
                    $('.controls-utility .utility-body').css('width', '300px');
                    $('.controls-utility .utility-body').css('height', '120px')
                }

                if (d == undefined || d == null) d = this.currentPID;
                else if (d != this.currentPID && this.currentPID != null) {
                    var e = this.findMarker(this.currentPID);
                    var f = this.findDataInfo(this.currentPID);
                    if (e != undefined && e != null) {
                        e.setIcon({
                            url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker5.png",
                            size: new google.maps.Size(23, 26)
                        });
                        if (f != undefined && f != null) {
                            e.setZIndex(6 - f.vip)
                        }
                    }
                } else if (d == this.currentPID) {}

                if (this.markers != undefined) {
                    for (var i = 0; i < this.markers.length; i++) {
                        if (this.markers[i].id == d) {
                            var g = this.findDataInfo(d);
                            if (g != null) {
                                this.currentPID = null;
                                this.CloseProject();
                                this.ClearUtilitiesAroundPoint();
                                var h = this.markers[i];
                                h.setIcon('http://file4.batdongsan.com.vn/images/Product/Maps/marker-hover.png');
                                h.setZIndex(300);
                                var k = '<div class="infowindow-product">';
                                k += '<div class="infowindow-product-detail">';
                                k += '<span class="infowindow-product-title infowindow-title-vip' + g.vip + '">' + g.title + '</span><br/>';
                                if (g.avatar.length > 0) {
                                    k += '<div class="infowindow-product-avatar">';
                                    if (g.avatar.indexOf('no-photo.jpg') > 0) {
                                        k += '<img src="' + g.avatar + '" alt="" />'
                                    } else {
                                        k += '<img class="hasimage" src="' + g.avatar + '" alt="" />';
                                        k += '<img title="click vào đây để xem ảnh lớn hơn" src="http://file4.batdongsan.com.vn/images/Product/Maps/icon-fullscreen.png" class="open-full-icon"/>'
                                    }
                                    k += '</div>'
                                }
                                k += '<strong>Giá: </strong>' + g.price + '<br/>';
                                k += '<strong>Diện tích: </strong>' + g.area + '<br/>';
                                k += '<strong>Địa chỉ: </strong>' + g.address + '<br/>';
                                if (g.project != null && g.project.length > 0) {
                                    k += '<strong>Dự án: </strong>';
                                    if (g.projectLink.length == 0) {
                                        k += g.project
                                    } else {
                                        k += '<a href="' + g.projectLink + '" target="_blank">' + g.project + '</a>'
                                    }
                                    k += '<br/>'
                                }
                                k += '</div>';
                                k += '<div class="infowindow-product-bottom">';
                                k += '<a href="javascript:productControlerObj.ShowMoreInfo(' + g.lat + ',' + g.lon + ');">Tiện ích xung quanh</a>';
                                k += '<a href="' + g.detailLink + '" target="_blank">Xem chi tiết</a>';
                                if (g.project != null && g.project.length > 0) {
                                    k += '<a href="javascript:productControlerObj.projectCtr.ShowProjectInfo(' + g.projectId + ');">Xem dự án</a>'
                                }
                                k += '</div>';
                                k += '<div class="infowindow-more-info"></div>';
                                k += '</div>';
                                this.infoWindow.setContent(k);
                                if (h.map == null) h.setMap(this.map);
                                this.infoWindow.open(this.map, h, 20, InfoBoxType.Product);
                                google.maps.event.clearListeners(this.infoWindow, 'closeclick');
                                this.currentPID = g.id;
                                this.infoWindow.avatarClickHandler(g.id, function(c) {
                                    $.get(mapHostUrl + '/api/p_sync', {
                                        type: 'images',
                                        id: c
                                    }, function(a) {
                                        if (a.length > 0) {
                                            var b = [];
                                            for (var j = 0; j < a.length; j++) {
                                                b.push({
                                                    href: a[j]
                                                })
                                            }
                                            $.fancybox(b)
                                        }
                                    }, 'json');
                                    return true
                                });
                                this.callbackShowInfoWindow(this.currentPID)
                            } else {}
                            break
                        }
                    }
                } else {}
            };
            this.showTipWindow = function(a) {
                var b = this.findMarker(a);
                if (b != null && b.id != $thismap.currentPjID) {
                    $thismap.tooltip.addTip(b);
                    $thismap.tooltip.getPos2(b.getPosition());
                    b.setIcon({
                        url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-hover.png",
                        size: new google.maps.Size(23, 26)
                    });
                    b.setZIndex(300)
                }
            };
            this.hideTipWindow = function(a, b) {
                $thismap.tooltip.removeTip();
                var c = this.findMarker(a);
                if (c != null) c.setIcon({
                    url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker5.png",
                    size: new google.maps.Size(23, 26)
                });
                c.setZIndex(b)
            };
            this.showMap = function(a, b) {
                this.data = [];
                for (var i = 0; i < a.length; i++) {
                    if (this.isInPolyline(a[i].lat, a[i].lon)) {
                        if (a[i].avatar == null || a[i].avatar == '') a[i].avatar = 'http://file1.batdongsan.com.vn/Images/no-photo.jpg';
                        this.data.push(a[i])
                    }
                }
                this.showPoint(this.data, b);
                return this.data
            };
            this.showMapProject = function(a) {
                this.dataProject = [];
                for (var i = 0; i < a.length; i++) {
                    if (this.isInPolyline(a[i].lat, a[i].lon)) {
                        this.dataProject.push(a[i])
                    }
                }
                this.showPointProject(this.dataProject);
                return this.dataProject
            };
            this.findDataInfo = function(a) {
                if (this.data != undefined && this.data.length > 0) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].id == a) {
                            return this.data[i]
                        }
                    }
                }
            };
            this.findProjectDataInfo = function(a) {
                if (this.dataProject != undefined && this.dataProject.length > 0) {
                    for (var i = 0; i < this.dataProject.length; i++) {
                        if (this.dataProject[i].id == a) {
                            return this.dataProject[i]
                        }
                    }
                }
            };
            this.findMarker = function(a) {
                if (this.markers != undefined) {
                    for (var i = 0; i < this.markers.length; i++) {
                        if (this.markers[i].id == a) {
                            return this.markers[i]
                        }
                    }
                }
                return null
            };
            this.findProjectMarker = function(a) {
                if (this.markersProject != undefined) {
                    for (var i = 0; i < this.markersProject.length; i++) {
                        if (this.markersProject[i].id == a) {
                            return this.markersProject[i]
                        }
                    }
                }
                return null
            };
            this.showProjectById = function(a) {
                var b = this.findProjectDataInfo(a);
                if (b != null) {
                    this.ShowProject(b)
                }
            };
            this.ShowProject = function(a) {
                this.btnUpdateMapIdleResult.hide();
                this.IsShowDetail = true;
                if (a.id != this.currentPjID && this.currentPjID != null) {
                    var b = this.findProjectMarker(this.currentPjID);
                    if (b != null) {
                        b.setIcon({
                            url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p.png",
                            size: new google.maps.Size(24, 29)
                        });
                        b.setZIndex()
                    }
                }
                var c = this.findProjectMarker(a.id);
                if (c == null) {
                    var d = null;
                    var e = this._getProjectTooltipContentString(a);
                    this.markersProject.push(new google.maps.Marker({
                        position: new google.maps.LatLng(a.lat, a.lon),
                        map: this.map,
                        tooltip: e,
                        icon: {
                            url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p.png",
                            size: new google.maps.Size(24, 29)
                        }
                    }));
                    var f = this.markersProject.length - 1;
                    c = this.markersProject[f];
                    c.id = a.id;
                    c.addListener('click', function() {
                        for (var i = 0; i < $thismap.markersProject.length; i++) {
                            if ($thismap.markersProject[i].id == this.id) {
                                $thismap.ShowProject($thismap.dataProject[i]);
                                break
                            }
                        }
                    });
                    c.addListener('mouseover', function() {
                        if (this.id != $thismap.currentPjID) {
                            $thismap.tooltip.addTip(this);
                            $thismap.tooltip.getPos2(this.getPosition())
                        }
                    });
                    c.addListener('mouseout', function() {
                        $thismap.tooltip.removeTip()
                    })
                }
                this.infoWindow.setContent(this._getProjectInfoWindowContentString(a));
                if (c.map == null) c.setMap(this.map);
                c.setIcon({
                    url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p-hover.png",
                    size: new google.maps.Size(24, 29)
                });
                c.setZIndex(300);
                c.setMap(this.map);
                this.infoWindow.open(this.map, c, 25, InfoBoxType.Project);
                google.maps.event.clearListeners(this.infoWindow, 'closeclick');
                this.currentPjID = c.id;
                this.callbackShowInfoWindow(this.currentPjID)
            };
            this._getProjectInfoWindowContentString = function(a) {
                var b = '<div class="infowindow-product infowindow-project">';
                b += '<div class="infowindow-product-detail">';
                b += '<span class="infowindow-product-title">' + a.title + '</span><br/>';
                b += '<div class="infowindow-product-avatar">';
                b += '<img src="' + a.avatar + '"/>';
                b += '</div>';
                b += '<strong>Địa chỉ: </strong>' + a.address + '<br/>';
                b += '<strong>Điện thoại: </strong>' + a.phone + '<br/>';
                b += '<strong>Website: </strong>' + a.website + '<br/>';
                b += '<strong>Email: </strong>' + a.email + '<br/>';
                b += '</div>';
                b += '<div class="infowindow-product-bottom">';
                b += '<a href="javascript:productControlerObj.ShowMoreInfo(' + a.lat + ',' + a.lon + ');">Tiện ích xung quanh</a>';
                b += '<a href="javascript:productControlerObj.ShowProductInProject(' + a.id + ', ' + a.distr + ', \'' + a.city + '\');">Tin rao thuộc dự án</a><a href="' + a.detailLink + '" target="_blank">Chi tiết dự án</a>';
                b += '</div>';
                b += '</div>';
                return b
            };
            this._getProjectTooltipContentString = function(a) {
                var b = '<div class="infowindow-product-preview">';
                b += '<div class="infowindow-product-preview-detail">';
                b += '<span class="infowindow-product-preview-title">' + a.title + '</span><br/>';
                b += '<div class="infowindow-product-preview-avatar">';
                b += '<img src="' + a.avatar + '"/>';
                b += '</div>';
                b += '<strong>Địa chỉ: </strong>' + a.address;
                b += '</div>';
                b += '</div>';
                return b
            };
            this.CloseProject = function() {
                if (this.infoWindow != null) this.infoWindow.close();
                for (var i = 0; i < this.markersProject.length; i++) {
                    this.markersProject[i].setMap(null)
                }
            };
            this.ShowImage = function(a, b, c, d, e, f, g, h) {
                for (var i = 0; i < this.projectOverlay.length; i++) {
                    if (this.projectOverlay[i].src == a) {
                        return
                    }
                }
                var j = new google.maps.LatLngBounds(new google.maps.LatLng(b, c), new google.maps.LatLng(d, e));
                this.map.setZoom(f);
                this.map.setCenter(new google.maps.LatLng(g, h));
                this.projectOverlay.push({
                    src: a,
                    ground: new google.maps.GroundOverlay(a, j, {
                        clickable: false
                    })
                });
                this.projectOverlay[this.projectOverlay.length - 1].ground.setMap(this.map)
            };
            this.ChangeMapByAddress = function(c, d) {
                if (typeof(c) == 'string') {
                    this.BoxSearchPlace.value = UnicodeToKoDau(c);
                    this.geocoder.geocode({
                        'address': c
                    }, function(a, b) {
                        if (b == google.maps.GeocoderStatus.OK) {
                            $thismap.map.setCenter(a[0].geometry.location);
                            $thismap.map.setZoom(d)
                        } else {}
                    })
                } else {
                    this.map.setCenter(new google.maps.LatLng(c.lat, c.lng));
                    this.map.setZoom(d)
                }
            };
            this.markerUtilities = new Array();
            this.dataUtilities = new Array();
            this.ShowUtilitiesAroundCallback = function() {};
            this.ShowUtilitiesAroundPoint = function(c, d, e, f, g) {
                $thismap.isShowUtil = true;
                $thismap.btnUpdateMapIdleResult.hide();
                if (this.mapType == MapTypeEnum.Product) {
                    var h = this.findMarker(this.currentPID)
                } else {
                    var h = this.findProjectMarker(this.currentPjID)
                }
                if (h == undefined || h == null) return;
                if (this.mapType == MapTypeEnum.Product) {
                    h.setIcon({
                        url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-hover.png",
                        size: new google.maps.Size(23, 26)
                    });
                    h.setZIndex(300)
                } else {
                    h.setIcon({
                        url: "http://file4.batdongsan.com.vn/images/Product/Maps/marker-p-hover.png",
                        size: new google.maps.Size(24, 29)
                    });
                    h.setZIndex(300)
                }
                e = parseInt(e);
                this.ClearUtilitiesAroundPoint();
                if (this.circle == null) this.circle = new google.maps.Circle({
                    center: new google.maps.LatLng(c, d),
                    radius: e,
                    fillOpacity: 0.4
                });
                else this.circle.setOptions({
                    center: new google.maps.LatLng(c, d),
                    radius: e
                });
                this.circle.setMap(this.map);
                if (this.infoWindow != null) this.infoWindow.setMap(null);
                this.dataUtilities = $thismap.formatUtilities(f, h.position, e);
                console.log(this.dataUtilities);
                $('label .uti-total', $(g)).remove();
                $.each($('input:checked', $(g)), function() {
                    var a = parseInt($(this).val());
                    var b = $thismap.getTotalUtility($thismap.dataUtilities, a);
                    if ($(this).parent().find('.uti-total').length > 0) {
                        $(this).parent().find('.uti-total').html('(' + b + ')')
                    } else {
                        $(this).parent().append(' <span class="uti-total">(' + b + ')</span>')
                    }
                });
                if (this.dataUtilities != null && this.dataUtilities.length > 0) {
                    for (var i = 0; i < this.dataUtilities.length; i++) {
                        var j = this.dataUtilities[i];
                        var k = '';
                        k += '<div class="infowindow-util-preview">';
                        k += '<b class="infowindow-util-preview-title">' + j.name + '</b>';
                        if (j.address != null && j.address.length > 0) k += '<span>' + j.address + '</span><br/>';
                        k += '<b>Khoảng cách: </b>' + j.distance + 'm';
                        k += '</div>';
                        this.markerUtilities.push(new google.maps.Marker({
                            position: new google.maps.LatLng(j.lat, j.lon),
                            map: this.map,
                            tooltip: k,
                            icon: {
                                url: 'http://file4.batdongsan.com.vn/images/Product/Maps/utility-' + this.dataUtilities[i].typeid + '.png',
                                size: new google.maps.Size(30, 49)
                            },
                            zIndex: 9
                        }));
                        this.markerUtilities[this.markerUtilities.length - 1].id = this.dataUtilities[i].id;
                        this.markerUtilities[this.markerUtilities.length - 1].addListener('click', function() {
                            $thismap.ShowUtilityWindow(this.id)
                        });
                        this.markerUtilities[this.markerUtilities.length - 1].addListener('mouseover', function(a) {
                            var b = a.latLng;
                            if (b == null) {
                                b = this.getPosition()
                            }
                            $thismap.tooltip.addTip(this);
                            $thismap.tooltip.getPos2(b)
                        });
                        this.markerUtilities[this.markerUtilities.length - 1].addListener('mouseout', function(a) {
                            $thismap.tooltip.removeTip()
                        })
                    }
                }
                this.ShowUtilitiesAroundCallback();
                if ($('#viewMap').hasClass('main-view-fullscreen')) {
                    this.BoxSearchPlace.style.display = 'none'
                }
            };
            this.ClearUtilitiesAroundCallback = function() {};
            this.ClearUtilitiesAroundPoint = function(a) {
                if (this.circle != null) this.circle.setMap(null);
                if (this.markerUtilities != null && this.markerUtilities.length > 0) {
                    for (var i = 0; i < this.markerUtilities.length; i++) {
                        this.markerUtilities[i].setMap(null)
                    }
                }
                this.markerUtilities = new Array();
                if (a == undefined || a == true) {
                    this.ClearUtilitiesAroundCallback()
                }
                if ($('#viewMap').hasClass('main-view-fullscreen')) {
                    this.BoxSearchPlace.style.display = 'block'
                }
            };
            this.ShowUtilityWindow = function(a) {
                for (var i = 0; i < this.dataUtilities.length; i++) {
                    if (this.dataUtilities[i].id == a) {
                        for (var j = 0; j < this.markerUtilities.length; j++) {
                            if (this.markerUtilities[j].id == a) {
                                var b = this.dataUtilities[i];
                                var c = '';
                                c += '<div class="infowindow-util">';
                                c += '<b class="infowindow-util-title">' + b.name + '</b>';
                                if (b.image != null && b.image.length > 0) {
                                    c += '<div class="infowindow-util-ava">';
                                    c += '<a class="fancybox" rel="gallery1" href="' + b.image[0] + '"><img src="' + b.image[0] + '" alt="" /></a>';
                                    for (var n = 1; n < b.image.length; n++) {
                                        c += '<a class="fancybox" rel="gallery1" href="' + b.image[n] + '"></a>'
                                    }
                                    c += '</div>'
                                }
                                if (b.address != null && b.address.length > 0) c += '<span>' + b.address + '</span><br/>';
                                if (b.website != null && b.website.length > 0) c += '<span>' + b.website + '</span><br/>';
                                if (b.email != null && b.email.length > 0) c += '<span>' + b.email + '</span><br/>';
                                if (b.phone != null && b.phone.length > 0) c += '<span>' + b.phone + '</span><br/>';
                                for (var u = 0; u < this.markers.length; u++) {
                                    if (this.markers[u].id == this.currentPID) {
                                        c += '<b>Khoảng cách:</b> ' + parseInt(google.maps.geometry.spherical.computeDistanceBetween(this.markerUtilities[j].position, this.markers[u].position)) + 'm';
                                        break
                                    }
                                }
                                c += '</div>';
                                this.currentUID = b.id;
                                this.infoWindow.setContent(c);
                                this.infoWindow.open(this.map, this.markerUtilities[j], 37, InfoBoxType.Utility);
                                google.maps.event.clearListeners(this.infoWindow, 'closeclick');
                                $(".fancybox").fancybox({
                                    openEffect: 'none',
                                    closeEffect: 'none'
                                })
                            }
                        }
                    }
                }
            };
            this.getTotalUtility = function(a, b) {
                var c = 0;
                for (var i = 0; i < a.length; i++) {
                    if (a[i].typeid == b) {
                        c++
                    }
                }
                return c
            };
            this.formatUtilities = function(a, b, c) {
                if (a == null || a.length == 0) return [];
                var d = [];
                for (var i = 0; i < a.length; i++) {
                    var e = parseInt(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a[i].lat, a[i].lon), b));
                    if (e <= c) {
                        a[i].distance = e;
                        d.push(a[i])
                    }
                }
                return d
            };
            return $thismap
        };
        $.fn.ProductMap = ProductMap
    }
    (jQuery));
ProjectControler = function(a, b) {
    this.data = [];
    this.searchVar = {};
    this.ProjectMap = a;
    this.lstPoint = ''
};
ProjectControler.prototype.Initialize = function(k) {
    var l = this;
    this.cityList = [];
    if (typeof k.cityListOTher1 != 'undefined') this.cityList = $.merge(this.cityList, k.cityListOTher1);
    if (typeof k.cityListOTher2 != 'undefined') this.cityList = $.merge(this.cityList, k.cityListOTher2);
    if (typeof k.cityListOTher3 != 'undefined') this.cityList = $.merge(this.cityList, k.cityListOTher3);
    if (typeof k.cityListOTher4 != 'undefined') this.cityList = $.merge(this.cityList, k.cityListOTher4);
    var m = [];
    for (var i = 0; i < k.projectType.length; i++) {
        m.push([k.projectType[i].id, k.projectType[i].name])
    }
    this.hdbProjectType = $('#cbbProjectType').HiddenDropbox({
        data: [m],
        value: k.context.catid,
        scope: this
    });
    var o = [];
    for (var i = 0; i < this.cityList.length; i++) {
        var p = [];
        for (var j = 0; j < 20 && i < this.cityList.length; j++) {
            p.push([this.cityList[i].code, this.cityList[i].name]);
            i++
        }
        o.push(p)
    }
    this.cityChangeCallback = function() {};
    this.districtChangeCallback = function() {};
    this.hdbDistrict = $('#cbbProjectDistrict').HiddenDropbox({});
    this.hdbCity = $('#cbbProjectCity').HiddenDropbox({
        data: o,
        value: k.context.city,
        scope: this,
        change: function(c, d) {
            var e = c.getValue();
            var f = null;
            var g = [];
            for (var i = 0; i < l.cityList.length; i++) {
                if (e == l.cityList[i].code) {
                    f = l.cityList[i];
                    for (var j = 0; j < l.cityList[i].district.length; j++) {
                        var h = [];
                        for (var n = 0; n < 20 && j < l.cityList[i].district.length; n++) {
                            h.push([l.cityList[i].district[j].id, l.cityList[i].district[j].pre + ' ' + l.cityList[i].district[j].name]);
                            j++
                        }
                        g.push(h)
                    }
                    break
                }
            }
            l.hdbDistrict = $('#cbbProjectDistrict').HiddenDropbox({
                data: g,
                value: k.context.district,
                scope: d,
                change: function(a, b) {}
            })
        }
    });
    this.viewList = $('#viewList');
    this.itemView = $('.item-view');
    this.pageView = $('.page-view');
    this.resultMessage = $('.projectTotalResult');
    this.viewMap = $('#viewMap');
    this.mapTitle = $('#projectMapTitle');
    this.btnSearch = $('#btnProjectSearch');
    this.btnSearch.bind('click', this, function(a) {
        traceEventMap(mapType);
        a.data.SearchSubmitForm(1)
    });
    $('.divfilterView, .sort-view', $('#viewList')).hide();
    $('.projectTotalResult', $('#viewList')).show();
    $('.map-view .search-result-map').hide();
    var q = this;
    $('#iconCtrHide').bind('click', this, function(a) {
        a.stopPropagation();
        a.data.ShowHideViewList()
    });
    this.currPageIndex = 0;
    this.itemView.on('scroll', this, function(b) {
        var c = 0;
        $('.detail-item').each(function(a) {
            c += $(this).outerHeight() + 5
        });
        if (c <= $(this).height() + $(this).scrollTop()) {
            b.data.ChagePageIndex(b.data.currPageIndex + 1)
        }
    });
    var r = {
        cate: k.context.catid,
        city: k.context.city,
        dist: k.context.district,
        projectid: k.context.projectid,
        zoom: k.context.zoom,
        center: k.context.center,
        lstPoint: k.context.lstPoint,
        searchType: k.context.searchType,
        isSearchForm: k.context.searchType == searchTypeEnum.SearchForm,
        isPageLoad: true
    };
    setTimeout(function() {
        if (k.context.searchType == searchTypeEnum.SearchForm) {
            r.type = 'searchproject';
            q.ChangeMapPostition(r);
            q.buildSearchCaption(r)
        } else {
            if (r.zoom != '' && r.center != '') {
                q.ProjectMap.setContext(r.projectid, r.zoom, r.center)
            }
            if (k.context.lstPoint != null && k.context.lstPoint != '') {
                var a = q.ProjectMap.getBoundOfPolygon(k.context.lstPoint);
                r.minlat = a.minLat;
                r.minlong = a.minLong;
                r.maxlat = a.maxLat;
                r.maxlong = a.maxLong;
                r.type = 'projectbyshape';
                q.ProjectMap.beginDrawButton.hide();
                q.ProjectMap.deleteShapeButton.show()
            } else {
                var b = q.ProjectMap.getCornerBounds();
                if (b != null) {
                    r.minlat = b.minLat;
                    r.minlong = b.minLong;
                    r.maxlat = b.maxLat;
                    r.maxlong = b.maxLong;
                    r.type = 'projectbybounds'
                }
            }
        }
        q._SearchAction(r)
    }, 500)
};
ProjectControler.prototype.ShowHideViewList = function(a) {
    if (this.viewList.hasClass('list-view-hidden') && (a == undefined || a == true)) {
        this.viewList.removeClass('list-view-hidden');
        this.viewList.unbind('click');
        google.maps.event.trigger(this.ProjectMap.map, "resize")
    } else if (a == undefined || a == false) {
        this.viewList.addClass('list-view-hidden');
        google.maps.event.trigger(this.ProjectMap.map, "resize")
    }
};
ProjectControler.prototype.SearchSubmitForm = function(a) {
    var b = {};
    b.city = this.hdbCity.getValue();
    b.dist = this.hdbDistrict.getValue();
    b.cate = this.hdbProjectType.getValue();
    b.isSearchForm = true;
    b.isPageLoad = false;
    b.type = 'searchproject';
    b.lstPoint = this.lstPoint;
    this.ChangeMapPostition(b);
    this.buildSearchCaption(b);
    this.ProjectMap.polyline = null;
    this.ProjectMap.IsShowDetail = false;
    this.ProjectMap.isShowUtil = false;
    this._SearchAction(b)
};
ProjectControler.prototype.SearchProjectByShape = function(a, b, c, d, e) {
    var f = {};
    if (a != undefined) {
        f.page = a
    } else {
        f.page = 0
    }
    f.cate = this.hdbProjectType.getValue();
    f.type = 'projectbyshape';
    f.minlat = b;
    f.minlong = c;
    f.maxlat = d;
    f.maxlong = e;
    f.lstPoint = this.lstPoint;
    f.isSearchForm = false;
    f.isPageLoad = false;
    this._SearchAction(f)
};
ProjectControler.prototype.SearchProjectByBounds = function(a, b, c, d, e) {
    var f = {};
    if (a != undefined) {
        f.page = a
    } else {
        f.page = 0
    }
    f.cate = this.hdbProjectType.getValue();
    f.type = 'projectbybounds';
    f.minlat = b;
    f.minlong = c;
    f.maxlat = d;
    f.maxlong = e;
    f.lstPoint = this.lstPoint;
    f.isSearchForm = false;
    f.isPageLoad = false;
    this._SearchAction(f)
};
ProjectControler.prototype._SearchAction = function(f) {
    this.searchVar = f;
    var g = this;
    this.viewMap.block(loadingHtml);
    f.v = new Date().getTime();
    $.ajax({
        url: mapHostUrl + '/api/p_sync',
        data: this.searchVar,
        dataType: 'json',
        type: getAjaxMethod(),
        success: function(a, b, c) {
            g.data = g.ProjectMap.showMapProject(a.data);
            var d = (a.page - 1) * 500;
            if (d <= 0) d = Math.min(1, a.total);
            var e = 'Có ' + a.total + ' dự án được tìm thấy';
            g.resultMessage.html(e);
            g.ChagePageIndex(0);
            if (f.isPageLoad || f.isSearchForm) {
                g.ProjectMap.isShowRefreshButton = false;
                g.ProjectMap.btnUpdateMapIdleResult.hide()
            }
            if (f.isPageLoad && f.projectid != '') {
                g.ProjectMap.showProjectById(f.projectid)
            }
            g.viewMap.unblock()
        },
        error: function(a, b, c) {
            g.viewMap.unblock()
        },
        complete: function() {}
    });
    if (f.isSearchForm) {
        $.ajax("/HandlerWeb/ProductMapRedirect.ashx", {
            data: {
                type: 'project',
                cateid: f.cate,
                citycode: f.city,
                districtid: this.searchVar.dist
            },
            dataType: 'text',
            type: 'POST',
            success: function(a, b, c) {
                $('#lnkProjectList').attr('href', a)
            },
            error: function(a, b, c) {}
        })
    }
};
ProjectControler.prototype.ChagePageIndex = function(c) {
    var d = 4;
    var e = this.data.length / d;
    e = Math.ceil(e);
    this.currPageIndex = c;
    if (c == 0) {
        this.itemView.html('')
    }
    if (e < 1) return;
    if (c + 1 > e) return;
    this.currPageIndex = c;
    var f = c * d;
    if (f <= 0) f = 0;
    var g = f + d;
    var h = this;
    for (var i = f; i < g && i < this.data.length; i++) {
        this.itemView.append(this.BuildProjectDetail(this.data[i], i, i == this.data.length - 1));
        var j = $('#projectitem_' + this.data[i].id);
        j.click(function(a) {
            h.itemView.children('.detail-item-current').removeClass('detail-item-current');
            $(this).addClass('detail-item-current');
            var b = $(this).attr('rel');
            h.ProjectMap.showProjectById(b)
        })
    }
    if (c == 1) {
        this.itemView.slimScroll({
            wheelStep: 10,
            height: '480px',
            railVisible: true,
            alwaysVisible: true
        })
    } else {
        this.itemView.slimScroll({
            scrollTop: 0,
            wheelStep: 10,
            height: '480px',
            railVisible: true,
            alwaysVisible: true
        })
    }
};
ProjectControler.prototype.ChangeMapPostition = function(a) {
    this.ProjectMap.DeleteShape();
    var b = 10;
    var c = 'Việt Nam';
    if (a.city != '') {
        b = 12;
        var d = this.hdbCity.getText();
        if (d.toLowerCase() == 'tp.hcm') d = 'Hồ Chí Minh';
        c = d + ", " + c;
        if (a.dist != '' && a.dist != '0') {
            b = 14;
            c = this.hdbDistrict.getText() + ", " + c
        }
    } else {
        var c = "Hà Nội, Việt Nam"
    }
    if (a.isPageLoad) a.zoom = b;
    this.ProjectMap.ChangeMapByAddress(c, b)
};
ProjectControler.prototype.BuildProjectDetail = function(a, b, c) {
    var d = 'row0';
    if (b % 2 != 0) d = 'row1';
    var e = '';
    e += '<li id="projectitem_' + a.id + '" class="detail-item" rel="' + a.id + '">';
    e += '<span class="detail-title">' + a.title + '</span>';
    e += '<img src="' + a.avatar + '"/>';
    e += '<p>' + a.address + '</p>';
    e += '<p><i>' + a.website + '</i></p>';
    e += '<span class="detail-price">' + a.phone + '</span>';
    e += '</li>';
    if (!c) {
        e += '<li class="detail-item-sep"></li>'
    }
    return e
};
ProjectControler.prototype.FindProjectInfoById = function(a) {
    for (var i = 0; i < this.data.length; i++) {
        if (this.data.id == a) return this.data[i]
    }
};
ProjectControler.prototype.ChangeUrlForNewContext = function() {
    var a = "cat=" + (this.searchVar.cate != undefined ? this.searchVar.cate : '');
    a += "&city=" + (this.searchVar.city != undefined ? this.searchVar.city : '');
    a += "&district=" + (this.searchVar.dist != undefined ? this.searchVar.dist : '');
    a += "&points=" + (this.ProjectMap.isDrawing ? (this.searchVar.lstPoint != undefined ? this.searchVar.lstPoint : '') : '');
    a += "&zoom=" + this.ProjectMap.getZoom();
    a += "&center=" + this.ProjectMap.getCenter();
    a += "&project=" + (this.ProjectMap.currentPjID != undefined ? this.ProjectMap.currentPjID : '');
    a += "&searchtype=" + (this.searchVar.isSearchForm ? 0 : 1);
    window.location.href = window.location.pathname + '#' + a
};
ProjectControler.prototype.ShowHideViewList = function(a, b) {
    if (this.viewList.hasClass('list-view-hidden') && (a == undefined || a == true)) {
        this.viewList.removeClass('list-view-hidden');
        this.viewList.unbind('click');
        google.maps.event.trigger(this.ProjectMap.map, "resize")
    } else if (a == undefined || a == false) {
        this.viewList.addClass('list-view-hidden');
        google.maps.event.trigger(this.ProjectMap.map, "resize")
    }
};
ProjectControler.prototype.buildSearchCaption = function(a) {
    var b;
    if (a.city != '') {
        b = this.hdbCity.getText();
        if (a.dist != '' && a.dist != '0') {
            b = this.hdbDistrict.getText() + ", " + b
        }
    } else {
        b = "Việt Nam"
    }
    var c;
    if (a.cate == '') {
        c = "Dự án"
    } else {
        var d = this.hdbProjectType.getText();
        if (d.toLowerCase().indexOf("dự án") != -1) {
            c = d
        } else {
            c = "Dự án " + d
        }
    }
    this.mapTitle.html(c + " tại " + b)
};
ProjectControler.prototype.ShowProjectInfo = function(d) {
    var e = this.FindProjectInfoById(d);
    if (e != null) {
        this.ProjectMap.ShowProject(e)
    } else {
        var f = this;
        $.ajax({
            url: mapHostUrl + '/api/p_sync',
            data: {
                type: 'projectInfo',
                projectId: d,
                v: new Date().getTime()
            },
            dataType: 'json',
            type: 'GET',
            success: function(a, b, c) {
                if (a != null && a != undefined) {
                    f.ProjectMap.ShowProject(a)
                }
            },
            error: function(a, b, c) {
                if (console) {
                    console.log(a+' ~ '+b+' ~ '+c)
                }
            },
            complete: function() {}
        })
    }
};
ProjectControler.prototype.callBackClearPointEvent = function(a) {
    this.hdbProjectType.setEnable();
    this.hdbCity.setEnable();
    this.hdbDistrict.setEnable();
    this.itemView.html('');
    this.pageView.html('');
    this.lstPoint = '';
    this.resultMessage.html('');
    if (a) {
        this.ProjectMap.isMapIdle = false
    } else {
        this.ProjectMap.isMapIdle = true
    }
};
ProjectControler.prototype.callBackDrawEvent = function(a, b, c, d, e, f) {
    var g = this.ProjectMap.isMapIdle;
    if (g != undefined && !g) {
        this.hdbProjectType.setDisable();
        this.hdbCity.setDisable();
        this.hdbDistrict.setDisable()
    }
    this.lstPoint = e;
    if (this.ProjectMap.isDrawing) {
        this.SearchProjectByShape(1, b, d, a, c)
    } else {
        this.SearchProjectByBounds(1, b, d, a, c)
    }
};
ProjectControler.prototype.callBackSearchPlace = function(b, c, d) {
    var e;
    var f = '';
    var g = false;
    for (var a = 0; a < d.length; a++) {
        for (var i = 0; i < d[a].types.length; i++) {
            if (d[a].types[i] == 'administrative_area_level_2' && f.length == 0) {
                f = 'administrative_area_level_2';
                e = d[a].short_name;
                g = true;
                break
            } else if (d[a].types[i] == 'administrative_area_level_1' && f.length == 0) {
                f = 'administrative_area_level_1';
                e = d[a].short_name;
                g = true;
                break
            }
        }
        if (g) break
    }
    if (!g) {
        e = d[0].short_name;
        f = 'unknow'
    }
    this._SearchAction({
        page: 1,
        lat: b,
        lon: c,
        level: f,
        address: e,
        cate: this.hdbProjectType.getValue(),
        type: 'projectbypoint'
    })
};
(function($) {
    UtilityAroundControler = function(l) {
        this.Map = l.map;
        this.Lat = 0;
        this.Lon = 0;
        $utilthis = this;
        $(this).find('.utility-close').bind('click', this, function(a) {
            a.data.hide();
            a.data.Map.isShowUtil = false;
            if (!a.data.Map.isDrawing) {
                a.data.Map.btnUpdateMapIdleResult.show()
            }
            a.data.Map.ClearUtilitiesAroundPoint(false);
            if (a.data.Map.mapType == MapTypeEnum.Product) {
                a.data.Map.showInfoWindow()
            } else {
                a.data.Map.showProjectById(a.data.Map.currentPjID)
            }
        });
        $(this).find('select, input').bind('change', this, function(a) {
            if ($(this).val().length > 0) {
                if ($(this).attr('checked') == undefined) {
                    $(this).parent().find('.uti-total').remove()
                }
                a.data.SearchAction()
            } else {
                $(this).parent().find('.uti-total').remove();
                var b = $(this).attr('checked');
                $(a.data).find('select, input').each(function() {
                    if ($(this).val().length > 0) {
                        $(this).attr('checked', b != undefined)
                    }
                });
                a.data.SearchAction()
            }
        });
        this.ResetRadius = function() {
            $('#cbbRadius').val(500)
        };
        this.SearchAction = function(d, e) {
            if (d != undefined) this.Lat = d;
            if (e != undefined) this.Lon = e;
            var f = $(this).find('select').val();
            var g = '';
            $(this).find('input:checked').each(function() {
                if ($(this).val().length > 0) {
                    if (g.length > 0) g += ',';
                    g += $(this).val()
                }
            });
            var h = $(this);
            var i = parseFloat(this.Lat);
            var j = parseFloat(this.Lon);
            this.Map.map.setCenter(new google.maps.LatLng(i, j));
            if (g.length == 0) {
                this.Map.ClearUtilitiesAroundPoint()
            } else {
                $('#viewMap').block(loadingHtml);
                var k = {};
                k.radius = f;
                k.types = g;
                k.lat = this.Lat;
                k.lon = this.Lon;
                k.m = 'pddetail';
                k.v = new Date().getTime();
                $.ajax({
                    url: mapHostUrl + '/api/u_sync',
                    data: k,
                    dataType: 'json',
                    type: getAjaxMethod(),
                    success: function(a, b, c) {
                        $('#viewMap').unblock();
                        $utilthis.Map.ShowUtilitiesAroundPoint($utilthis.Lat, $utilthis.Lon, f, eval($.dde(a.data)), h)
                    },
                    error: function(a, b, c) {
                        $('#viewMap').unblock()
                    },
                    complete: function() {}
                })
            }
        };
        this.Map.ClearUtilitiesAroundCallback = function() {
            $utilthis.hide()
        };
        this.Map.ShowUtilitiesAroundCallback = function() {
            $utilthis.show()
        };
        return this
    };
    $.fn.UtilityAroundToolbox = UtilityAroundControler
})(jQuery);

ProductSearchControler = function(h) {
    var i = this;
    this.searchVar = {
        page: 0
    };
    this.curCatType = h.context.ptype;
    this.CatTypeEnum = {
        SELL: 38,
        RENT: 49
    };
    var j = {
        zoom: h.context.zoom,
        center: h.context.center,
        lstPoint: h.context.lstPoint,
        mapType: mapType
    };
    this.ProductMap = $('#map').ProductMap('begindraw', 'delshape', 'fullscreen', 'exitfullscreen', j);
    this.ProductMap.initialize();
    this.ProductMap.callbackShowInfoWindow = function(a) {
        switch (mapType) {
            case MapTypeEnum.Product:
                i.ChangeUrlForNewContext();
                break;
            case MapTypeEnum.Project:
                i.projectCtr.ChangeUrlForNewContext();
                break
        }
    };
    this.ProductMap.callBackMapChange = function(a) {
        switch (mapType) {
            case MapTypeEnum.Product:
                i.ChangeUrlForNewContext();
                break;
            case MapTypeEnum.Project:
                i.projectCtr.ChangeUrlForNewContext();
                break
        }
    };
    this.utilityTool = $('.controls-utility').UtilityAroundToolbox({
        map: this.ProductMap
    });
    this.ProductMap.callBackDrawEvent = function(a, b, c, d, e, f, g) {
        switch (mapType) {
            case MapTypeEnum.Product:
                i.callBackDrawEvent(a, b, c, d, e, f, g);
                break;
            case MapTypeEnum.Project:
                i.projectCtr.callBackDrawEvent(a, b, c, d, e, f, g);
                break
        }
    };
    this.ProductMap.callBackClearPointEvent = function() {
        switch (mapType) {
            case MapTypeEnum.Product:
                i.callBackClearPointEvent();
                break;
            case MapTypeEnum.Project:
                i.projectCtr.callBackClearPointEvent();
                break
        }
    };
    this.ProductMap.callBackAfterInfowindowClose = function() {};
    this.ProductMap.callBackSearchPlace = function(a, b, c) {
        switch (mapType) {
            case MapTypeEnum.Product:
                i.callBackSearchPlace(a, b, c);
                break;
            case MapTypeEnum.Project:
                i.projectCtr.callBackSearchPlace(a, b, c);
                break
        }
    };
    this.projectCtr = new ProjectControler(this.ProductMap, h);
    switch (mapType) {
        case MapTypeEnum.Product:
            this.Initialize(h);
            break;
        case MapTypeEnum.Project:
            this.projectCtr.Initialize(h);
            break
    }
};
ProductSearchControler.prototype.Initialize = function(z) {
    $this = this;
    this.cityList = [];
    if (typeof z.cityListOTher1 != 'undefined') this.cityList = $.merge(this.cityList, z.cityListOTher1);
    if (typeof z.cityListOTher2 != 'undefined') this.cityList = $.merge(this.cityList, z.cityListOTher2);
    if (typeof z.cityListOTher3 != 'undefined') this.cityList = $.merge(this.cityList, z.cityListOTher3);
    if (typeof z.cityListOTher4 != 'undefined') this.cityList = $.merge(this.cityList, z.cityListOTher4);
    this.hdbDistrict = $('#cbbDistrict').HiddenDropbox({});
    this.hdbWard = $('#cbbWard').HiddenDropbox({});
    this.hdbStreet = $('#cbbStreet').HiddenDropbox({});
    this.hdbProject = $('#cbbProject').HiddenDropbox({});
    this.divSearchResultOnMap = $('.search-result-map');
    $('.product-form > .tab > div').removeClass('active');
    $('.product-form > .tab > div[cateid=' + z.context.ptype + ']').addClass('active');
    this.hdbPriceLevel = $('#cbbPriceLevel').HiddenDropbox({
        data: this.getCurrentPriceLevelData(z.context.ptype),
        scope: this,
        value: z.context.pricelevel,
        change: function(a, b) {}
    });
    this.getCurrentCateData = function() {
        if ($('.product-form > .tab > div.active').length > 0) {
            var a = $('.product-form > .tab > div.active').attr('cateid');
            if (a != undefined && a.length > 0 && isFinite(a)) {
                a = parseInt(a);
                for (var i = 0; i < z.cateList.length; i++) {
                    if (z.cateList[i].id == a) {
                        var b = [];
                        for (var j = 0; j < z.cateList[i].children.length; j++) {
                            b.push([z.cateList[i].children[j].id, z.cateList[i].children[j].name])
                        }
                        return [b]
                    }
                }
            }
        }
        return new Array()
    };
    var A = this.getCurrentCateData();
    this.hdbProductType = $('#cbbProductType').HiddenDropbox({
        data: A,
        value: z.context.catid,
        scope: this,
        change: function(a, b) {}
    });
    var B = [];
    for (var i = 0; i < this.cityList.length;) {
        var C = [];
        for (var j = 0; j < 20 && i < this.cityList.length; j++) {
            C.push([this.cityList[i].code, this.cityList[i].name]);
            i++
        }
        B.push(C)
    }
    this.hdbCity = $('#cbbCity').HiddenDropbox({
        optionClass: 'menu-city',
        data: B,
        value: z.context.city,
        scope: this,
        change: function(r, s, t) {
            var u = r.getText();
            var v = r.getValue();
            var w = null;
            var x = [];
            for (var i = 0; i < $this.cityList.length; i++) {
                if (v == $this.cityList[i].code) {
                    w = $this.cityList[i];
                    for (var j = 0; j < $this.cityList[i].district.length;) {
                        var y = [];
                        for (var n = 0; n < 20 && j < $this.cityList[i].district.length; n++) {
                            y.push([$this.cityList[i].district[j].id, $this.cityList[i].district[j].pre + ' ' + $this.cityList[i].district[j].name]);
                            j++
                        }
                        x.push(y)
                    }
                    break
                }
            }
            $this.hdbWard = $('#cbbWard').HiddenDropbox({});
            $this.hdbStreet = $('#cbbStreet').HiddenDropbox({});
            $this.hdbProject = $('#cbbProject').HiddenDropbox({});
            $this.hdbDistrict = $('#cbbDistrict').HiddenDropbox({
                data: x,
                value: z.context.district,
                scope: s,
                change: function(c, d, e) {
                    var f = '';
                    var g = c.getValue();
                    var h = 12;
                    if (g == '') {
                        f = ''
                    } else {
                        f = c.getText() + ',';
                        h = 14
                    }
                    var i = c.getValue();
                    var k = [];
                    var l = [];
                    var m = [];
                    for (var j = 0; j < w.district.length; j++) {
                        if (i == w.district[j].id) {
                            var o = w.district[j];
                            for (var n = 0; n < o.ward.length;) {
                                var p = [];
                                for (var q = 0; q < 20 && n < o.ward.length; q++) {
                                    p.push([o.ward[n].id, o.ward[n].name]);
                                    n++
                                }
                                k.push(p)
                            }
                            for (var n = 0; n < o.street.length;) {
                                var p = [];
                                for (var q = 0; q < 20 && n < o.street.length; q++) {
                                    p.push([o.street[n].id, o.street[n].name]);
                                    n++
                                }
                                l.push(p)
                            }
                            for (var n = 0; n < o.project.length;) {
                                var p = [];
                                for (var q = 0; q < 20 && n < o.project.length; q++) {
                                    p.push([o.project[n].id, o.project[n].name, o.project[n].lat, o.project[n].lng]);
                                    n++
                                }
                                m.push(p)
                            }
                            break
                        }
                    }
                    $this.hdbWard = $('#cbbWard').HiddenDropbox({
                        data: k,
                        scope: d,
                        value: z.context.wardid,
                        change: function(a, b) {}
                    });
                    $this.hdbStreet = $('#cbbStreet').HiddenDropbox({
                        data: l,
                        value: z.context.streetid,
                        scope: d,
                        change: function(a, b) {}
                    });
                    $this.hdbProject = $('#cbbProject').HiddenDropbox({
                        data: m,
                        value: z.context.projectid,
                        scope: d,
                        change: function(a, b) {}
                    })
                }
            })
        }
    });
    var D = [];
    for (var i = 0; i < z.areaLevel.length; i++) {
        D.push([z.areaLevel[i].id, z.areaLevel[i].name])
    }
    this.hdbAreaLevel = $('#cbbAreaLevel').HiddenDropbox({
        data: [D],
        value: z.context.area,
        scope: this,
        change: function(a, b) {}
    });
    var E = [];
    for (var i = 0; i < z.roomLevel.length; i++) {
        E.push([z.roomLevel[i].id, z.roomLevel[i].name])
    }
    this.hdbRoomLevel = $('#cbbRoom').HiddenDropbox({
        data: [E],
        value: z.context.room,
        scope: this,
        change: function(a, b) {}
    });
    var F = [];
    for (var i = 0; i < z.directionList.length; i++) {
        F.push([z.directionList[i].value, z.directionList[i].name])
    }
    this.hdbDirection = $('#cbbDirection').HiddenDropbox({
        data: [F],
        value: z.context.direction,
        scope: this,
        change: function(a, b) {}
    });
    this.projectCtr.cityChangeCallback = function(a) {
        $this.hdbCity.setValue(a, false)
    };
    this.projectCtr.districtChangeCallback = function(a) {
        $this.hdbDistrict.setValue(a, false)
    };
    this.btnFormatDateForm = $('.delete-date');
    this.txtFrom = $('#txtDateFrom');
    if (z.context.startdate != '') {
        this.txtFrom.val(z.context.startdate)
    }
    var G = new Date();
    G.setYear(G.getFullYear() - 1);
    this.txtFrom.datepicker({
        dateFormat: "dd/mm/yy",
        yearRange: "-1:+0",
        changeMonth: true,
        changeYear: true,
        maxDate: new Date(),
        minDate: G
    });
    this.txtFrom.bind('change', this, function(a) {
        a.data.CheckDateSearch(this);
        a.data.btnFormatDateForm.show();
        $this._FilterAction()
    });
    this.txtFrom.val('Từ ngày');
    this.txtTo = $('#txtDateTo');
    if (z.context.enddate != 'undefined' && z.context.enddate != '') this.txtTo.val(z.context.enddate);
    this.txtTo.datepicker({
        dateFormat: "dd/mm/yy",
        yearRange: "-1:+0",
        changeMonth: true,
        changeYear: true,
        maxDate: new Date(),
        minDate: G
    });
    this.txtTo.bind('change', this, function(a) {
        a.data.CheckDateSearch(this);
        a.data.btnFormatDateForm.show();
        $this._FilterAction()
    });
    this.txtTo.val('Đến ngày');
    this.btnFormatDateForm.bind('click', this, function(a) {
        $(this).parent().find('input[type=text]').each(function() {
            $(this).val($(this).attr('rel'));
            $(this).trigger('blur')
        });
        $(this).hide();
        $this._FilterAction()
    });
    this.CheckDateSearch = function(a) {
        if (this.txtFrom.val() != '' && this.txtTo.val() != '') {
            var b = this.convertToDate(this.txtFrom.val());
            var c = this.convertToDate(this.txtTo.val());
            if (b != null && c != null && b > c) {
                alert('Ngày kết thúc phải lớn hơn ngày bắt đầu !');
                $(a).val($(a).attr('rel'));
                return false
            }
        }
    };
    $('#iconCtrHide').bind('click', this, function(a) {
        a.stopPropagation();
        a.data.ShowHideViewList()
    });
    this.mapTitle = $('#productMapTitle');
    $('#btnProductSearch').bind('click', this, function(a) {
        traceEventMap(mapType);
        a.data.SearchSubmitForm(1)
    });
    this.viewList = $('#viewList');
    this.viewMap = $('#viewMap');
    this.filterView = $('.divfilterView');
    $('a[name=filter]').bind('click', this, function(a) {
        $('a[name=filter]').removeClass('filter-active');
        $(this).addClass('filter-active');
        $this._FilterAction()
    });
    this.sortView = $('.sort-view');
    this.itemView = $('.item-view');
    this.pageView = $('.page-view');
    this.resultMessage = $('#lblResultMessage');
    this.resultBtnPrev = $('.search-result-button-prev');
    this.resultBtnNext = $('.search-result-button-next');
    this.resultBtnNoticeArea = $('.map-top-notice');
    this.btnUpdateMapIdleResult = $('.btn-map-update-result');
    this.sortCtr = $('#ddlSort');
    if (z.context.sort != '') {
        this.sortCtr.val(z.context.sort)
    }
    this.sortCtr.bind('change', this, function(a) {
        $this._FilterAction()
    });
    this.mapTypeControl = new function() {};
    $('.product-form > .tab > div').bind('click', this, function(a) {
        if ($(this).hasClass('active')) return;
        $this.curCatType = parseInt($(this).attr('cateid'));
        a.data.ChangeProductType($this.curCatType)
    });
    $('#lnkSearchAdvance').bind('click', this, function(a) {
        a.data.ChangeFormMode()
    });
    this.mapTypeControl.GetCurrentMapType = function() {
        return 'product'
    };
    $('.vip-view > label > input').change(function() {
        $this.SearchSubmitForm(1)
    });
    this.productData = [];
    this.tempProductData = [];
    this.lstPoint = '';
    this.txtKeywordLocation = $('#txtKeyword');
    var H = null;
    this.txtKeywordLocation.autocomplete({
        source: function(d, e) {
            var f = UnicodeToKoDau(d.term);
            var g = null;
            if (JSON != undefined && localStorage != undefined) {
                g = JSON.parse(localStorage.getItem('suggestion-cache'))
            }
            if (g == null) {
                g = [{}]
            }
            var h = g[f];
            if (h != null) {
                e(h);
                return
            } else {
                if (H != null) H.abort();
                H = $.getJSON("http://suggestion" + ($this.curCatType == $this.CatTypeEnum.SELL ? 1 : 2) + ".batdongsan.com.vn/" + f, function(a, b, c) {
                    g[f] = a;
                    if (localStorage != undefined) {
                        localStorage.setItem('suggestion-cache', JSON.stringify(g))
                    }
                    e(a)
                })
            }
        },
        minLength: 2,
        select: function(a, b) {
            var c = b.item.id;
            $this.hdbCity.setValue(c.city);
            $this.hdbDistrict.setValue(c.distr);
            $this.hdbWard.setValue(c.wardid);
            $this.hdbStreet.setValue(c.streetid);
            $this.hdbProject.setValue(c.projid);
            if (c.wardid > 0 || c.streetid > 0 || c.projid > 0) $this.ChangeFormMode('advance');
            $this.SearchSubmitForm(1);
            $.post("http://file2.batdongsan.com.vn/" + c.id)
        }
    });
    this.currPageIndex = 0;
    this.itemView.on('scroll', this, function(b) {
        var c = 0;
        $('.detail-item').each(function(a) {
            c += $(this).outerHeight() + 5
        });
        if (c <= $(this).height() + $(this).scrollTop()) {
            b.data.ChagePageIndex(b.data.currPageIndex + 1)
        }
    });
    var I = {
        ptype: $('.product-form > .tab > .active').attr('cateid'),
        cate: z.context.catid,
        city: z.context.city,
        dist: z.context.district,
        area: z.context.area,
        price: z.context.pricelevel,
        ward: z.context.wardid,
        street: z.context.streetid,
        room: z.context.room,
        direct: z.context.direction,
        projectid: z.context.projectid,
        startdate: this.txtFrom.val().length > 0 ? VNDateTimeToUTCDateTime(this.txtFrom.val(), "/") : '',
        enddate: this.txtTo.val().length > 0 ? VNDateTimeToUTCDateTime(this.txtTo.val(), "/") : '',
        page: z.context.page != undefined ? z.context.page : 1,
        cpid: z.context.currentPID,
        zoom: z.context.zoom,
        center: z.context.center,
        lstPoint: z.context.lstPoint,
        searchType: z.context.searchType,
        isSearchForm: z.context.searchType == searchTypeEnum.SearchForm,
        isPageLoad: true
    };
    setTimeout(function() {
        if (z.context.searchType == searchTypeEnum.SearchForm) {
            I.m = 'submit';
            var a = $this.ChangeMapPostition(I);
            if (!a) {
                $this.itemView.html('<div class="notify-info">Bạn hãy lựa chọn địa điểm hay dự án cần tìm kiếm.</div>');
                $this.searchVar = I;
                return
            }
            $this.buildSearchCaption(I)
        } else {
            if (I.zoom != '' && I.center != '') {
                $this.ProductMap.setContext(I.cpid, I.zoom, I.center)
            }
            if (z.context.lstPoint != null && z.context.lstPoint != '') {
                var b = $this.ProductMap.getBoundOfPolygon(z.context.lstPoint);
                I.minlat = b.minLat;
                I.minlong = b.minLong;
                I.maxlat = b.maxLat;
                I.maxlong = b.maxLong;
                I.m = 'shape';
                $this.ProductMap.beginDrawButton.hide();
                $this.ProductMap.deleteShapeButton.show()
            } else {
                var c = $this.ProductMap.getCornerBounds();
                if (c != null) {
                    I.minlat = c.minLat;
                    I.minlong = c.minLong;
                    I.maxlat = c.maxLat;
                    I.maxlong = c.maxLong;
                    I.m = 'bounds'
                }
            }
        }
        $this._SearchAction(I)
    }, 500)
};
ProductSearchControler.prototype.ChangeProductType = function(c) {
    $('.product-form > .tab > div').removeClass('active');
    $('.product-form > .tab > div[cateid=' + c + ']').addClass('active');
    this.hdbProductType.ReLoadData(this.getCurrentCateData());
    this.hdbPriceLevel = $('#cbbPriceLevel').HiddenDropbox({
        data: this.getCurrentPriceLevelData(c),
        scope: this,
        value: '',
        change: function(a, b) {}
    })
};
ProductSearchControler.prototype.getCurrentPriceLevelData = function(a) {
    var b = [];
    for (var i = 0; i < priceLevelByType.length; i++) {
        if (priceLevelByType[i].code == a) {
            for (var j = 0; j < priceLevelByType[i].data.length; j++) {
                b.push([priceLevelByType[i].data[j].Name, priceLevelByType[i].data[j].Value])
            }
            break
        }
    }
    return [b]
};
ProductSearchControler.prototype.ChangeFormMode = function(a) {
    if ($('.product-form > .body').hasClass('advance-mode') == false || (a == 'advance')) {
        $('.product-form > .body').addClass('advance-mode');
        $('#lnkSearchAdvance').text('Bỏ tìm kiếm nâng cao')
    } else if ($('.product-form > .body').hasClass('advance-mode') || a == 'normal') {
        $('.product-form > .body').removeClass('advance-mode');
        $('#lnkSearchAdvance').text('Tìm kiếm nâng cao')
    }
};
ProductSearchControler.prototype.ShowHideViewList = function(a, b) {
    if (this.viewList.hasClass('list-view-hidden') && (a == undefined || a == true)) {
        this.viewList.removeClass('list-view-hidden');
        this.viewList.unbind('click');
        google.maps.event.trigger(this.ProductMap.map, "resize")
    } else if (a == undefined || a == false) {
        this.viewList.addClass('list-view-hidden');
        google.maps.event.trigger(this.ProductMap.map, "resize")
    }
};
ProductSearchControler.prototype.ChangeMapPostition = function(a) {
    var b = this.hdbProject.getValueData();
    var c = false;
    if (b != null && b.length == 4) {
        var d = 16;
        if (a.isPageLoad) a.zoom = d;
        this.ProductMap.ChangeMapByAddress({
            lat: b[2],
            lng: b[3]
        }, d);
        c = true
    } else {
        var d = 10;
        var e = "Việt Nam";
        if (a.city != '') {
            d = 12;
            var f = this.hdbCity.getText();
            if (f.toLowerCase() == 'tp.hcm') f = 'Hồ Chí Minh';
            e = f + ", " + e;
            if (a.dist != '' && a.dist != '0') {
                d = 14;
                e = this.hdbDistrict.getText() + ", " + e
            }
            if (a.street != '' && a.street != '0') {
                d = 16;
                e = this.hdbStreet.getText() + ", " + e
            } else if (a.ward != '' && a.ward != '0') {
                d = 16;
                e = this.hdbWard.getText() + ", " + e
            }
            c = true
        } else {
            e = "Hà Nội, Việt Nam"
        }
        if (a.isPageLoad) a.zoom = d;
        this.ProductMap.ChangeMapByAddress(e, d)
    }
    this.ProductMap.DeleteShape();
    return c
};
ProductSearchControler.prototype.SearchSubmitForm = function(a, b) {
    if (b == undefined || b == null) {
        b = {};
        b.ptype = $('.product-form > .tab > .active').attr('cateid');
        b.cate = this.hdbProductType.getValue();
        b.city = this.hdbCity.getValue();
        b.dist = this.hdbDistrict.getValue();
        b.area = this.hdbAreaLevel.getValue();
        b.price = this.hdbPriceLevel.getValue();
        b.ward = this.hdbWard.getValue();
        b.street = this.hdbStreet.getValue();
        b.room = this.hdbRoomLevel.getValue();
        b.direct = this.hdbDirection.getValue();
        b.projectid = this.hdbProject.getValue();
        b.isSearchForm = true;
        b.isPageLoad = false;
        b.startdate = '';
        b.enddate = '';
        b.m = "submit"
    }
    var c = this.ChangeMapPostition(b);
    if (!c) {
        alert('Bạn phải lựa chọn địa điểm hay dự án cần tìm kiếm');
        return
    }
    this.buildSearchCaption(b);
    if (a != undefined) {
        b.page = a
    } else {
        b.page = 1
    }
    this.ProductMap.polyline = null;
    this.ProductMap.IsShowDetail = false;
    this.ProductMap.isShowUtil = false;
    this._SearchAction(b)
};
ProductSearchControler.prototype.SearchSubmitFormByShape = function(a, b, c, d, e, f) {
    if (this.lstPoint != null && this.lstPoint.length > 0) {
        this.mapTitle.html('');
        var g = {};
        if (a != undefined) {
            g.page = a
        } else {
            g.page = 1
        }
        g.ptype = $('.product-form > .tab > .active').attr('cateid');
        g.cate = this.hdbProductType.getValue();
        g.area = this.hdbAreaLevel.getValue();
        g.price = this.hdbPriceLevel.getValue();
        g.room = this.hdbRoomLevel.getValue();
        g.direct = this.hdbDirection.getValue();
        g.startdate = '';
        g.enddate = '';
        g.lstPoint = this.lstPoint;
        g.isSearchForm = false;
        g.isPageLoad = false;
        g.minlat = b;
        g.minlong = c;
        g.maxlat = d;
        g.maxlong = e;
        g.m = "shape";
        if (f != undefined) {
            g.cpid = f.cpid;
            g.zoom = f.zoom;
            g.center = f.center
        } else {
            g.zoom = $thismap.getZoom();
            g.center = $thismap.getCenter()
        }
        this._SearchAction(g)
    }
};
ProductSearchControler.prototype.SearchSubmitFormByBounds = function(a, b, c, d, e, f) {
    if (this.lstPoint != null && this.lstPoint.length > 0) {
        this.mapTitle.html('');
        var g = {};
        if (a != undefined) {
            g.page = a
        } else {
            g.page = 1
        }
        g.ptype = $('.product-form > .tab > .active').attr('cateid');
        g.cate = this.hdbProductType.getValue();
        g.area = this.hdbAreaLevel.getValue();
        g.price = this.hdbPriceLevel.getValue();
        g.room = this.hdbRoomLevel.getValue();
        g.direct = this.hdbDirection.getValue();
        g.startdate = '';
        g.enddate = '';
        g.minlat = b;
        g.minlong = c;
        g.maxlat = d;
        g.maxlong = e;
        g.isSearchForm = false;
        g.isPageLoad = false;
        g.m = "bounds";
        if (f != undefined) {
            g.cpid = f.cpid;
            g.zoom = f.zoom;
            g.center = f.center
        } else {
            g.zoom = $thismap.getZoom();
            g.center = $thismap.getCenter()
        }
        this._SearchAction(g)
    }
};
ProductSearchControler.prototype._SearchAction = function(d) {
    if (d.zoom != '' && d.zoom < minZoomAllowSearch) {
        this.itemView.html('<div class="notify-info">Hãy phóng to bản đồ để tìm kiếm.</div>');
        return
    }
    this.viewMap.block(loadingHtml);
    if (this.viewMap.hasClass('main-view-fullscreen') == false) {
        $('html,body').animate({
            scrollTop: this.filterView.offset().top + 20
        }, 400)
    }
    var e = '';
    $('.vip-view > label > input:checked').each(function() {
        if (e.length > 0) e += ',';
        e += $(this).val()
    });
    d.vip = e;
    d.filter = 0;
    d.sort = 0;
    d.v = new Date().getTime();
    this.searchVar = d;
    var f = this;
    $.ajax({
        url: mapHostUrl + '/api/p_sync',
        data: this.searchVar,
        type: getAjaxMethod(),
        xhrFields: {
            withCredentials: true
        },
        success: function(a) {
            if (a == null) {
                f.viewMap.unblock();
                return
            }
            a = eval("(" + $.dde(a) + ")");
            if (device.ipad() || device.tablet() || device.ipod() || device.iphone() || device.androidTablet() || device.blackberryTablet() || device.android()) {
                $('.detail-item').live('hover', function() {
                    $(this).css('background', '#fff')
                });
                $('.detail-item').live('select', function() {
                    $(this).css('background', '#b1f2b1')
                })
            }
            f.resetFilter();
            f.tempProductData = f.productData = f.ProductMap.showMap(a.data, d.isSearchForm);
            var b = '';
            if (a.total <= 500) {
                b = 'Có <font color="red">' + a.total + '</font> bất động sản';
                f.resultBtnPrev.hide();
                f.resultBtnNext.hide();
                f.resultBtnNoticeArea.hide()
            } else {
                b = 'Có hơn <font color="red">500</font> bất động sản';
                b += '<div>';
                f.resultBtnNoticeArea.show();
                b += '</div>'
            }
            f.resultMessage.html(b);
            f.ChagePageIndex(0);
            if (a.total == 0) {
                f.itemView.html('<div class="notify-info">Không có bất động sản nào được tìm thấy.</div>')
            }
            f.viewMap.unblock();
            if (d.isPageLoad && d.cpid != '') {
                f.ProductMap.showInfoWindow(d.cpid)
            }
            if (d.isPageLoad || d.isSearchForm) {
                f.ProductMap.isShowRefreshButton = false;
                f.ProductMap.btnUpdateMapIdleResult.hide()
            }
        },
        error: function(a, b, c) {
            f.viewMap.unblock()
        },
        complete: function() {
            f.txtKeywordLocation.val('Nhập địa điểm bất động sản');
            f.txtKeywordLocation.trigger('blur')
        }
    });
    if (d.isSearchForm || d.isPageLoad) {
        $.ajax("/Modules/Product/Maps/BoxCountLinkPage.aspx", {
            data: {
                pType: this.searchVar.ptype,
                cateId: this.searchVar.cate,
                cityCode: this.searchVar.city,
                distId: this.searchVar.dist,
                projId: this.searchVar.projectid,
                streetId: this.searchVar.street,
                wardId: this.searchVar.ward
            },
            dataType: 'html',
            type: 'GET',
            success: function(a, b, c) {
                $('.tag-view').html(a)
            },
            error: function(a, b, c) {},
            complete: function() {}
        });
        $.ajax("/HandlerWeb/ProductMapRedirect.ashx", {
            data: {
                type: 'getlink',
                cboCategory: $('.product-form > .tab > div.active').attr('cateid'),
                cboTypeRe: this.searchVar.cate,
                cboCity: this.searchVar.city,
                cboDistrict: this.searchVar.dist,
                cboWard: this.searchVar.ward,
                cboListProj: this.searchVar.projectid,
                cboStreet: this.searchVar.street,
                cboArea: this.searchVar.area,
                cboPrice: d.price,
                cboBedRoom: d.room,
                cboHomeDirection: d.direct
            },
            dataType: 'text',
            type: 'POST',
            success: function(a, b, c) {
                $('#lnkBackToList').attr('href', a)
            },
            error: function(a, b, c) {},
            complete: function() {}
        })
    }
};
ProductSearchControler.prototype._FilterAction = function() {
    if (this.productData.length <= 1) return;
    var a = this.convertToDate(this.txtFrom.val());
    var b = this.convertToDate(this.txtTo.val());
    var c = parseInt($('.divfilterView a[class=filter-active]').attr('rel'));
    var d = [];
    if (a != null || b != null || c != 0) {
        for (var i = 0; i < this.productData.length; i++) {
            var e = this.convertToDate(this.productData[i].date);
            if ((a == null || e >= a) && (b == null || e <= b)) {
                switch (c) {
                    case 1:
                        if (this.productData[i].avatar != '' && this.productData[i].avatar.indexOf('no-photo.jpg') == -1) d.push(this.productData[i]);
                        break;
                    case 2:
                        if (this.productData[i].videoUrl != null && this.productData[i].videoUrl != '') d.push(this.productData[i]);
                        break;
                    default:
                        d.push(this.productData[i]);
                        break
                }
            }
        }
    } else {
        d = this.productData
    }
    var f = parseInt(this.sortCtr.val());
    switch (f) {
        case 1:
            this.sortByLastUpTime(d);
            break;
        case 2:
            this.sortByPrice(d, true);
            break;
        case 3:
            this.sortByPrice(d, false);
            break;
        case 4:
            this.sortByArea(d, true);
            break;
        case 5:
            this.sortByArea(d, false);
            break
    }
    this.tempProductData = d;
    this.ChagePageIndex(0)
};
ProductSearchControler.prototype.sortByLastUpTime = function(e) {
    var f = this;
    e.sort(function(a, b) {
        var c = f.convertToDate(a.date);
        var d = f.convertToDate(b.date);
        if (c > d) {
            return 1
        } else if (c < d) {
            return -1
        } else {
            return 0
        }
    })
};
ProductSearchControler.prototype.sortByPrice = function(c, d) {
    c.sort(function(a, b) {
        if (a.priceValue > b.priceValue) {
            return d ? -1 : 1
        } else if (a.priceValue < b.priceValue) {
            return d ? 1 : -1
        } else {
            if (a.vip > b.vip) {
                return 1
            } else if (a.vip < b.vip) {
                return -1
            } else {
                return 0
            }
        }
    })
};
ProductSearchControler.prototype.sortByArea = function(c, d) {
    c.sort(function(a, b) {
        if (a.areaValue > b.areaValue) {
            return d ? -1 : 1
        } else if (a.areaValue < b.areaValue) {
            return d ? 1 : -1
        } else {
            if (a.vip > b.vip) {
                return 1
            } else if (a.vip < b.vip) {
                return -1
            } else {
                return 0
            }
        }
    })
};
/*
ProductSearchControler.prototype.convertToDate=function(a)
	{
	var b=/([0-9]
		{
		2
	}
	)\/([0-9]
		{
		2
	}
	)\/([0-9]
		{
		4
	}
	)/;
	var c=b.exec(a);
	if(c!=null&&c.length==4)
		{
		return new Date(c[3],c[2],c[1])
	}
	return null
};
*/
ProductSearchControler.prototype.resetFilter = function() {
    $('.divfilterView a[class=filter-active]').removeClass('filter-active');
    $(".divfilterView a:eq(0)").addClass('filter-active');
    this.txtFrom.val(this.txtFrom.attr("rel"));
    this.txtTo.val(this.txtTo.attr("rel"));
    this.sortCtr.val(0);
    $(".divfilterView .delete-date").hide()
};
ProductSearchControler.prototype.ChangeUrlForNewContext = function() {
    var a = "ptype=" + (this.searchVar.ptype != undefined ? this.searchVar.ptype : '38');
    a += "&cat=" + (this.searchVar.cate != undefined ? this.searchVar.cate : '');
    a += "&city=" + (this.searchVar.city != undefined ? this.searchVar.city : '');
    a += "&district=" + (this.searchVar.dist != undefined ? this.searchVar.dist : '');
    a += "&area=" + (this.searchVar.area != undefined ? this.searchVar.area : '');
    a += "&price=" + (this.searchVar.price != undefined ? this.searchVar.price : '');
    a += "&ward=" + (this.searchVar.ward != undefined ? this.searchVar.ward : '');
    a += "&street=" + (this.searchVar.street != undefined ? this.searchVar.street : '');
    a += "&room=" + (this.searchVar.room != undefined ? this.searchVar.room : '');
    a += "&direction=" + (this.searchVar.direct != undefined ? this.searchVar.direct : '');
    a += "&project=" + (this.searchVar.projectid != undefined ? this.searchVar.projectid : '');
    a += "&points=" + (this.ProductMap.isDrawing ? (this.searchVar.lstPoint != undefined ? this.searchVar.lstPoint : '') : '');
    a += "&zoom=" + this.ProductMap.getZoom();
    a += "&center=" + this.ProductMap.getCenter();
    a += "&page=" + this.searchVar.page;
    a += "&product=" + (this.ProductMap.currentPID != undefined && this.ProductMap.currentPID != null ? this.ProductMap.currentPID : '');
    a += "&searchtype=" + (this.searchVar.isSearchForm ? 0 : 1);
    window.location.href = window.location.pathname + '#' + a
};
ProductSearchControler.prototype.ChagePageIndex = function(a) {
    if (this.tempProductData.length == 0) {
        this.itemView.html('');
        return
    }
    var b = 4;
    var c = this.tempProductData.length / b;
    c = Math.ceil(c);
    if (a == 0) {
        this.itemView.html('')
    }
    if (c < 1) return;
    if (a + 1 > c) return;
    this.currPageIndex = a;
    var d = a * b;
    if (d <= 0) d = 0;
    var e = d + b;
    var f = this;
    for (var i = d; i < e && i < this.tempProductData.length; i++) {
        var g = this.BuildProductDetail(this.tempProductData[i], i, i == this.tempProductData.length - 1);
        this.itemView.append(g);
        var h = $('#productitem_' + this.tempProductData[i].id);
        h.click(function() {
            f.ProductMap.hideTipWindow($(this).attr('rel'), parseInt($(this).attr('zindex')));
            f.ProductMap.showInfoWindow($(this).attr('rel'));
            $(this).parent().find('.detail-item-current').removeClass('detail-item-current');
            $(this).addClass('detail-item-current')
        });
        h.hover(function() {
            f.ProductMap.showTipWindow($(this).attr('rel'))
        }, function() {
            f.ProductMap.hideTipWindow($(this).attr('rel'), parseInt($(this).attr('zindex')))
        })
    }
    $('.item-view .detail-item').live('click', function() {
        f.ProductMap.showInfoWindow($(this).attr('rel'));
        $(this).parent().find('.detail-item-current').removeClass('detail-item-current');
        $(this).addClass('detail-item-current')
    });
    if (a == 1) {
        this.itemView.slimScroll({
            wheelStep: 10,
            height: '480px',
            railVisible: true,
            alwaysVisible: true
        })
    } else {
        this.itemView.slimScroll({
            scrollTop: 0,
            wheelStep: 10,
            height: '480px',
            railVisible: true,
            alwaysVisible: true
        })
    }
};
ProductSearchControler.prototype.ChagePageIndex2 = function(a) {
    var b = this;
    for (var i = 0; i < this.tempProductData.length; i++) {
        this.itemView.append(this.BuildProductDetail(this.tempProductData[i], i, i == this.tempProductData.length - 1));
        var c = $('#productitem_' + this.tempProductData[i].id);
        c.click(function() {
            b.ProductMap.hideTipWindow($(this).attr('rel'));
            b.ProductMap.showInfoWindow($(this).attr('rel'));
            $(this).parent().find('.detail-item-current').removeClass('detail-item-current');
            $(this).addClass('detail-item-current')
        });
        c.hover(function() {
            b.ProductMap.showTipWindow($(this).attr('rel'))
        }, function() {
            b.ProductMap.hideTipWindow($(this).attr('rel'))
        })
    }
    this.itemView.slimScroll({
        wheelStep: 1,
        height: '480px',
        railVisible: true,
        alwaysVisible: true
    })
};
ProductSearchControler.prototype.BuildPaging = function(a, b, c) {
    var d = a / b;
    d = Math.ceil(d);
    if (d <= 1) return '';
    if (c + 1 >= d) return '';
    return '<a class="current" href="javascript:productControlerObj.ChagePageIndex(' + (c + 1) + ');">Xem tiếp >></a>'
};
ProductSearchControler.prototype.BuildProductDetail = function(a, b, c) {
    var d = 'row0';
    if (b % 2 != 0) d = 'row1';
    var e = '';
    e += '<li id="productitem_' + a.id + '" class="detail-item item-vip' + a.vip + '" rel="' + a.id + '" zindex="' + (6 - a.vip) + '">';
    e += '<span class="detail-title">' + a.title + '</span>';
    e += '<img src="' + a.avatar + '"/>';
    e += '<p><b>Giá: </b>' + a.price + '</p>';
    e += '<p><b>Diện tích: </b>' + a.area + '</p>';
    e += '<p><b>Địa chỉ: </b>' + a.address + '</p>';
    e += '</li>';
    if (!c) {
        e += '<li class="detail-item-sep"></li>'
    }
    return e
};
ProductSearchControler.prototype.ChangeMapType = function() {
    this.ProductMap.clearPoint();
    this.ChangeTab(this.mapTypeControl.GetCurrentMapType());
    if (this.mapTypeControl.GetCurrentMapType() == 'project') {
        $('.product-form').hide();
        $('.project-form').show();
        $('.tag-view').hide();
        $('#map').css('height', '100%');
        this.viewList.addClass('list-view-project');
        this.projectCtr.SearchSubmitForm(1)
    } else {
        $('.project-form').hide();
        $('.product-form').show();
        $('#map').css('height', '525px');
        $('.tag-view').show();
        this.viewList.removeClass('list-view-project');
        this.SearchSubmitForm(1)
    }
};
ProductSearchControler.prototype.ChangeTab = function(a) {
    if ($('div.maptype-view .wrap1000 > div[rel=' + a + ']').hasClass('active') == false) {
        $('div.maptype-view .wrap1000 > div').removeClass('active');
        $('div.maptype-view .wrap1000 > div[rel=' + a + ']').addClass('active')
    }
    if (a == 'project') {
        $('.product-form').hide();
        $('.project-form').show();
        this.viewList.addClass('list-view-project')
    } else {
        $('.project-form').hide();
        $('.product-form').show();
        this.viewList.removeClass('list-view-project')
    }
};
ProductSearchControler.prototype.ShowMoreInfo = function(a, b) {
    if (this.ProductMap.map.getZoom() < 16) this.ProductMap.map.setZoom(16);
    this.utilityTool.ResetRadius();
    this.utilityTool.SearchAction(a, b)
};
ProductSearchControler.prototype.callBackDrawEvent = function(a, b, c, d, e, f) {
    var g = this.ProductMap.isMapIdle;
    if (g != undefined && !g) {
        this.hdbCity.setDisable();
        this.hdbDistrict.setDisable();
        this.hdbWard.setDisable();
        this.hdbStreet.setDisable();
        this.hdbProject.setDisable()
    }
    this.lstPoint = e;
    this.projectCtr.lstPoint = e;
    if (this.mapTypeControl.GetCurrentMapType() == 'product') {
        if (this.ProductMap.isDrawing) {
            this.SearchSubmitFormByShape(1, b, d, a, c, f)
        } else {
            this.SearchSubmitFormByBounds(1, b, d, a, c, f)
        }
    } else {
        this.projectCtr.SearchSubmitFormByShape(1)
    }
};
ProductSearchControler.prototype.callBackClearPointEvent = function(a) {
    this.hdbCity.setEnable();
    this.hdbDistrict.setEnable();
    this.hdbWard.setEnable();
    this.hdbStreet.setEnable();
    this.hdbProject.setEnable();
    this.itemView.html('');
    this.pageView.html('');
    this.lstPoint = '';
    this.projectCtr.lstPoint = '';
    this.resultMessage.html('');
    this.resultBtnPrev.hide();
    this.resultBtnNext.hide();
    if (a) {
        this.ProductMap.isMapIdle = false
    } else {
        this.ProductMap.isMapIdle = true
    }
};
ProductSearchControler.prototype.callBackSearchPlace = function(b, c, d) {
    var e = d[0].short_name;
    var f = '';
    for (var a = 0; a < d.length; a++) {
        for (var i = 0; i < d[a].types.length; i++) {
            if (d[a].types[i] == 'route' && f.length == 0) {
                f = 'route';
                break
            } else if (d[a].types[i] == 'sublocality' && f.length == 0) {
                f = 'sublocality';
                break
            } else if (d[a].types[i] == 'administrative_area_level_2' && f.length == 0) {
                f = 'administrative_area_level_2';
                break
            } else if (d[a].types[i] == 'administrative_area_level_1' && f.length == 0) {
                f = 'administrative_area_level_1';
                break
            } else if (d[a].types[i] == 'neighborhood' && f.length == 0) {
                f = 'neighborhood';
                break
            }
        }
        if (f.length > 0) break
    }
    if (f.length == 0) f = 'unknow';
    $this._SearchAction({
        page: 1,
        lat: b,
        lon: c,
        level: f,
        address: e,
        cate: $this.hdbProductType.getValue(),
        area: $this.hdbAreaLevel.getValue(),
        price: $this.hdbPriceLevel.getValue(),
        room: $this.hdbRoomLevel.getValue(),
        direct: $this.hdbDirection.getValue()
    })
};
ProductSearchControler.prototype.ShowProductInProject = function(a, b, c) {
    switch (mapType) {
        case MapTypeEnum.Product:
            this.ChangeTab('product');
            this.ChangeFormMode('advance');
            this.hdbCity.setValue(c);
            this.hdbDistrict.setValue(b);
            this.hdbProject.setValue(a);
            this.ProductMap.CloseProject();
            this.ProductMap.DeleteShape();
            this.SearchSubmitForm(1);
            break;
        case MapTypeEnum.Project:
            this.SearchByProject(a, b, c);
            break
    }
};
ProductSearchControler.prototype.SearchByProject = function(d, e, f) {
    var g = {};
    g.projectid = d;
    g.m = "inproject";
    var h = this;
    this.projectCtr.viewMap.block(loadingHtml);
    $.ajax({
        url: mapHostUrl + '/api/p_sync',
        data: g,
        type: getAjaxMethod(),
        xhrFields: {
            withCredentials: true
        },
        success: function(a) {
            if (a == null) {
                h.projectCtr.viewMap.unblock();
                return
            }
            h.projectCtr.viewMap.unblock();
            a = eval("(" + $.dde(a) + ")");
            if (device.ipad() || device.tablet() || device.ipod() || device.iphone() || device.androidTablet() || device.blackberryTablet() || device.android()) {
                $('.detail-item').live('hover', function() {
                    $(this).css('background', '#fff')
                });
                $('.detail-item').live('select', function() {
                    $(this).css('background', '#b1f2b1')
                })
            }
            if (a.data != null && a.data.length != 0) {
                h.projectCtr.ProjectMap.CloseProject();
                h.projectCtr.ProjectMap.DeleteShape();
                h.projectCtr.ProjectMap.showMap(a.data, g.isSearchForm);
                h.ProductMap.isShowRefreshButton = false;
                h.ProductMap.btnUpdateMapIdleResult.hide()
            } else {
                alert('Hiện tại không có tin rao nào thuộc dự án này.')
            }
        },
        error: function(a, b, c) {
            h.projectCtr.viewMap.unblock()
        }
    })
};
ProductSearchControler.prototype.buildSearchCaption = function(a) {
    var b;
    if (a.city != '') {
        b = this.hdbCity.getText();
        if (a.dist != '' && a.dist != '0') {
            b = this.hdbDistrict.getText() + ", " + b
        }
        if (a.street != '' && a.street != '0') {
            b = this.hdbStreet.getText() + ", " + b
        } else if (a.ward != '' && a.ward != '0') {
            b = this.hdbWard.getText() + ", " + b
        }
    } else {
        b = "Việt Nam"
    }
    var c;
    if (a.cate == '') {
        if (parseInt(a.ptype) == this.CatTypeEnum.RENT) {
            c = "Nhà đất cho thuê"
        } else {
            c = "Nhà đất bán"
        }
    } else {
        c = this.hdbProductType.getText()
    }
    this.mapTitle.html(c + " tại " + b)
};
