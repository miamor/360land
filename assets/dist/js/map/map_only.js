var browser = {
    isMobile: window.navigator.userAgent.indexOf('iPad') > 0
};
var minZoomAllowSearch = 10;
var minZoom = 5;
var defaultCenter = '20.9947910308838:105.86784362793003'; // hanoi
var options = {city:'',district:'',ward:'',street:''};
//var c_city = c_district = null;
var city = district = ward = street = project = null;
var markerSize = new google.maps.Size(23, 26);
var labelOrigin = new google.maps.Point(0,0);
var iconMarker = {
    default: {
        url: MAIN_URL+'/assets/img/marker5.png',
        scaledSize: markerSize,
        size: markerSize,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    },
    hover: {
        url: MAIN_URL+'/assets/img/marker-hover.png',
        scaledSize: markerSize,
        size: markerSize,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    },
    select: {
        url: MAIN_URL+'/assets/img/marker.png',
        /*scaledSize: new google.maps.Size(30, 36),
        size: new google.maps.Size(30, 36),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)*/
        scaledSize: markerSize,
        size: markerSize,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }
};

var zoom_markerView = 13;
var zoom_moderate = 11;
var zoom_utilityView = 16;
var cityList = [];

(function($) {
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
        //this.btnUpdateMapIdleResult = $('.btn-map-update-result');
        $thismap.isDrawing = s.lstPoint != undefined && s.lstPoint != '';
        this.isMapIdle = false;
        this.isShowRefreshButton = false;
        this.isShowUtil = false;
        this.isDetails = false;
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
        this.infoWindow = new google.maps.InfoWindow();
        this.infoTipWindow = new google.maps.InfoWindow({
            maxWidth: 250,
            maxHeight: 120
        });

        this.beginDrawButton = $('.' + o);
        this.deleteShapeButton = $('.' + p);
        this.fullScreenButton = $('.' + q);
        this.exitFullScreenButton = $('.' + r);

        this.searchtype = 0;

        this.isMapResize = false;

        this.input = {};
        this.input.type = document.getElementById('type');
        this.input.city = document.getElementById('city');
        this.input.district = document.getElementById('district');
        this.input.ward = document.getElementById('ward');
        this.input.street = document.getElementById('street');
        this.input.room = document.getElementById('room');
        this.input.direction = document.getElementById('direction');
        this.input.price = document.getElementById('price');
        this.input.area = document.getElementById('area');
        this.input.zoom = document.getElementById('zoom');
        this.input.center = document.getElementById('center');
        this.input.points = document.getElementById('points');
        //this.input.searchtype = document.getElementById('searchtype');
        this.input.product = document.getElementById('product');
        this.input.isShowUtil = document.getElementById('isShowUtil');
        this.input.details = document.getElementById('details');

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

        google.maps.event.addListener(this.infoWindow, 'domready', function() {
            $('.gm-style-iw').each(function () {
                var iwOuter = $(this);
                iwOuter.parent().attr('class', '');
                if (iwOuter.find('#iw-container').length) {
                    iwOuter.parent().addClass('gw-style-parent');
                    //iwOuter.parent().css('height', 250);
                    var iwBackground = iwOuter.prev();
                    iwBackground.removeClass('gw-style-bg').addClass('gw-style-bg');
                    //iwBackground.children(':nth-child(2),:nth-child(4)').css('height','250px!important');
                } else {
                    iwOuter.parent().addClass('gw-tip-parent');
                    var iwBackground = iwOuter.prev();
                    iwBackground.removeClass('gw-style-bg').addClass('gw-tip-bg')
                }
            })
        });

        this.initialize = function() {
            // set input value based on the window hash
            if (s.type) this.input.type.value = s.ptype;
            if (s.city) this.input.city.value = s.city;
            if (s.district) this.input.district.value = s.district;
            if (s.ward) this.input.ward.value = s.ward;
            if (s.street) this.input.street.value = s.street;
            if (s.room) this.input.room.value = s.room;
            if (s.direction) this.input.direction.value = s.direction;
            if (s.price) this.input.price.value = s.price;
            if (s.area) this.input.area.value = s.area;
            if (s.details == 1) {
                this.input.details.value = 1;
                this.isDetails = true;
            }
            if (s.isShowUtil == 1) {
                this.input.isShowUtil.value = 1;
                this.isShowUtil = true;
            }
            if (s.searchtype == 1) {
                this.searchtype = 1;
                //this.input.searchtype.value = 1;
            }
            this.input.zoom.value = s.zoom;
            this.input.center.value = s.center;
            this.input.points.value = s.lstPoint;
            this.input.product.value = s.currentPID;

            this.currentPID = s.currentPID;

            var cc = this.input.center.value.split(':');
            this.centerPos = new google.maps.LatLng(cc[0], cc[1]);

            var e = zoom_moderate;
            if (s.zoom != '') e = parseInt(s.zoom);
            var f = 10.843928;
            var g = 106.717672;
            if (s.center != '') {
                f = parseFloat(s.center.split(':')[0]);
                g = parseFloat(s.center.split(':')[1])
            }

            this.input.points.value = s.lstPoint;

            if (s.lstPoint != '') {
                $thismap.isDrawing = true;
                this.isMapIdle = false;
                this.beginDrawButton.hide();
                this.deleteShapeButton.show();
                //this.btnUpdateMapIdleResult.hide();
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
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: true,

                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: false
                },
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_RIGHT
                },
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };
            this.map = new google.maps.Map(document.getElementById(v), k);
            //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('controlArea'));
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('controlUtility'));
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('mapSide'));

            var locationData = null;
            if (this.listLatlgn != null) {
                this.polyline = new google.maps.Polygon({
                    path: this.listLatlgn,
                    strokeColor: '#585858',
                    strokeWeight: 3,
                    editable: true,
                    fillColor: "#ccc",
                    fillOpacity: 0.5
                });
                this.polyline.setMap(this.map);
                this.findPoint(this.polyline);
            }
        };

        this.resize = function () {
            google.maps.event.trigger($thismap.map, 'resize');
            this.isMapResize = true;
            this.boundsChangeCallBack();
        }

        this.boundsChangeCallBack = function () {
            google.maps.event.addListener($thismap.map, 'bounds_changed', function () {
                if ($thismap.isMapResize) {
                    if ($thismap.currentPID) {
                        var key = $thismap.findMarkerKey($thismap.currentPID);
                        $thismap.map.setCenter($thismap.markers[key].position);
                    } else {
                        $thismap.map.setCenter($thismap.centerPos);
                    }
                }
                $thismap.isMapResize = false;
            })
        }

        this.beginDrawButton.bind('click', this, function(b) {
            if (b.data.map.getZoom() < minZoomAllowSearch) {
                alert('Bạn cần phóng to bản đồ hơn nữa vào khu vực bạn cần vẽ');
                return
            }
            $thismap.isDrawing = true;
            //this.btnUpdateMapIdleResult.hide();
            b.data.beginDrawButton.hide();
            b.data.deleteShapeButton.show();
            //b.data.ClearUtilitiesAroundPoint();
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

            this.input.points.value = '';

            $thismap.isDrawing = false;
            this.isMapIdle = false;
            this.callBackClearPointEvent(true);
        };
        this.endDraw = function(a) {
            $thismap.isDrawing = true;
            if (this.listLatlgn != null) {
                this.beginDrawButton.hide();
                this.deleteShapeButton.show();
                var b = new Array();
                var points = [];

                if (a == undefined) {
                    var c = 5;
                    var x;
                    x = Math.round(this.listLatlgn.length / 50);
                    if (this.listLatlgn.length < 30) {
                        c = 1;
                        x = 2
                    }
                    for (var i = 0; i < this.listLatlgn.length; i++) {
                        if (i % (c * x) == 0) {
                            b.push(this.listLatlgn[i])
                        }
                        points.push(this.listLatlgn[i].lat() + ':' + this.listLatlgn[i].lng());
                    }
                } else {
                    b = this.listLatlgn;
                    points = b.lat() + ':' + b.lng();
                }
                $thismap.input.points.value = points.join(',');

                $thismap.polyline = new google.maps.Polygon({
                    path: b,
                    strokeColor: '#585858',
                    strokeWeight: 3,
                    editable: true,
                    fillColor: "#ccc",
                    fillOpacity: 0.5
                });
                $thismap.polyline.setMap($thismap.map);
                $thismap.findPoint($thismap.polyline);

                //this.btnUpdateMapIdleResult.hide();

                google.maps.event.addListener($thismap.polyline.getPath(), 'set_at', function() {
                    console.log('set_at polyline');
                    $thismap.findPoint($thismap.polyline)
                });
                google.maps.event.addListener($thismap.polyline.getPath(), 'insert_at', function() {
                    console.log('insert_at polyline');
                    $thismap.findPoint($thismap.polyline)
                })
            }
            this.listLatlgn = null
        };

        this.getZoom = function() {
            return this.map.getZoom()
        };
        this.getCenter = function() {
            return this.map.getCenter().lat() + ':' + this.map.getCenter().lng()
        };

        this.markers = new Array();
        this.callBackDrawEvent = function() {};
        this.findPoint = function(a, b) {
            this.clearPoint();
            var c = a.getPath().getArray();
            var d = 0,
                minLat = 100000,
                maxLng = 0,
                maxLat = 0,
                minLng = 100000;
            var e = '';
            for (var i = 0; i < c.length; i++) {
                /*var adr = [];
                if (c[i].hem) adr.push(c[i].hem);
                if (c[i].ngach) adr.push(c[i].ngach);
                if (c[i].ngo) adr.push(c[i].ngo);
                if (c[i].duong) adr.push(c[i].duong);
                if (c[i].huyen) adr.push(c[i].huyen);
                if (c[i].diachi) adr.push(c[i].diachi);
                c[i].address = adr.join(', ');*/
                var f = c[i].lat();
                var g = c[i].lng();
                if (e.length > 0) e += ',';
                e += f + ':' + g;
                if (d < f) d = f;
                if (minLat > f) minLat = f;
                if (maxLat < f) maxLat = f;
                if (minLng > g) minLng = g;
                if (maxLng < g) maxLng = g
            }
            if (this.callBackDrawEvent) {
                this.callBackDrawEvent(d, minLat, minLng, maxLat, maxLng, e, b)
            }
        };
        this.isInPolyline = function(a, b) {
            if (this.polyline != undefined && this.polyline != null) {
                return google.maps.geometry.poly.containsLocation(new google.maps.LatLng(a, b), this.polyline)
            }
            return true
        };
        this.clearPoint = function() {
            if (this.infoWindow) this.infoWindow.close();
            this.ClearUtilitiesAroundPoint();

            if (this.markers != undefined) {
                for (var t = 0; t < this.markers.length; t++) {
                    this.markers[t].setMap(null)
                }
                this.markers = []
            }
            if (this.markerCluster != null) {
                this.markerCluster.clearMarkers()
            }
        };
        this.callBackClearPointEvent = function() {};

        this.showMap = function(a, b) {
            this.data = [];
            for (var i = 0; i < a.length; i++) {
                if (this.isInPolyline(a[i].latitude, a[i].longitude)) {
                    if (a[i].avatar == null || a[i].avatar == '') a[i].avatar = MAIN_URL+'/assets/img/noimage.png';
                    this.data.push(a[i])
                }
            }
            this.showPoint(this.data, b);
            return this.data
        };

        this.showPoint = function(a, b) {
            this.clearPoint();

            $thismap.markers = a.map(function(location, i) {
                /*return new google.maps.Marker({
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    icon: iconMarker.default
                });*/
                return new MarkerWithLabel({
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    icon: iconMarker.default,
                    labelContent: location.price,
                    labelAnchor: labelOrigin,
                    labelClass: "marker-label", // your desired CSS class
                    labelInBackground: true,
                });
            });

            $.each($thismap.markers, function (i, oneMarker) {
                //if ($thismap.map.getZoom() >= 12) oneMarker.setMap($thismap.map);
                oneMarker.id = a[i].id;
                oneMarker.addListener('click', function() {
                    $thismap.showInfoWindow(this.id);
                    $thismap.input.product.value = this.id;
                    productControlerObj.ChangeUrlForNewContext();
                });
                oneMarker.addListener('mouseover', function() {
                    if (this.id != $thismap.currentPID) {
                        this.setIcon(iconMarker.hover)
                    }
                });
                oneMarker.addListener('mouseout', function() {
                    if (this.id != $thismap.currentPID) {
                        this.setIcon(iconMarker.default)
                    }
                })
            })
            if (b !== undefined && b) {
                if (this.polyline != undefined && this.polyline != null) {
                    var g = new google.maps.LatLngBounds();
                    this.polyline.getPath().forEach(function(e) {
                        g.extend(e)
                    });
                    this.map.fitBounds(g)
                }
            }

            if (this.currentPID) {
                this.showInfoWindow(this.currentPID, true);
            }

            $thismap.markerCluster = new MarkerClusterer($thismap.map, $thismap.markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        };

        this.findDataInfo = function(i) {
            if (this.data != undefined && this.data.length > 0) {
                return this.data[i]
            }
        };
        this.findMarkerKey = function(a) {
            if (this.data != undefined && this.data.length > 0) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].id == a) {
                        return i
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

        this.markerUtilities = new Array();
        this.dataUtilities = new Array();
        this.ShowUtilitiesAroundCallback = function() {};
        this.ShowUtilitiesAroundPoint = function(c, d, e, f, g) {
            //$thismap.btnUpdateMapIdleResult.hide();
            var h = this.findMarker(this.currentPID);

            if (h == undefined || h == null) return;
            h.setIcon(iconMarker.select);
            h.setZIndex(300);
            e = parseInt(e);
            this.ClearUtilitiesAroundPoint();

            if (this.circle == null) this.circle = new google.maps.Circle({
                center: new google.maps.LatLng(c, d),
                radius: e,
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.15
                //fillOpacity: 0.4
            });
            else this.circle.setOptions({
                center: new google.maps.LatLng(c, d),
                radius: e
            });
            this.circle.setMap(this.map);

            if (this.infoWindow != null) this.infoWindow.setMap(null);
            this.dataUtilities = $thismap.formatUtilities(f, h.position, e);

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

            $thismap.input.isShowUtil.value = 1;
            $thismap.isShowUtil = true;
            productControlerObj.ChangeUrlForNewContext();

            if (this.dataUtilities != null && this.dataUtilities.length > 0) {
                this.markerUtilities = this.dataUtilities.map(function(utility, i) {
                    return new google.maps.Marker({
                        position: new google.maps.LatLng(utility.latitude, utility.longitude),
                        icon: {
                            url: 'http://file4.batdongsan.com.vn/images/Product/Maps/utility-' + utility.typeid + '.png',
                            size: new google.maps.Size(30, 49)
                        }
                    });
                });

                $.each(this.markerUtilities, function (i, oneMarkerUtility) {
                    //oneMarkerUtility.id = $thismap.dataUtilities[i].id;
                    oneMarkerUtility.setMap($thismap.map);
                    //this.markerUtilities.setTooltip(k);

                    oneMarkerUtility.addListener('click', function() {
                        var j = $thismap.dataUtilities[i];
                        var k = '';
                        k += '<div class="infowindow-util-preview iw-content">';
                        k += '<div class="bold infowindow-util-preview-title">' + j.title + '</div>';
                        if (j.address != null && j.address.length > 0) k += '<div class="infowindow-util-preview-adr"><i class="fa fa-map-marker"></i> <span>' + j.address + '</span></div>';
                        k += '<div class="infowindow-util-preview-type">Loại tiện ích: ' + j.type + '</div>';
                        k += '<div class="infowindow-util-preview-typeid">Typeid: ' + j.typeid + '</div>';
                        k += '<div class="infowindow-util-preview-distance">Khoảng cách: ' + j.distance + 'm</div>';
                        k += '</div>';

                        $thismap.infoWindow.setOptions({
                            position: oneMarkerUtility.position,
                            maxWidth: 250,
                            content: k
                        });
                        $thismap.infoWindow.open($thismap.map, oneMarkerUtility);
                        //$thismap.ShowUtilityWindow(this.id)
                    })
                })
            }
            this.ShowUtilitiesAroundCallback();
        };
        this.ClearUtilitiesAroundCallback = function() {};
        this.ClearUtilitiesAroundPoint = function(a) {
            if (this.circle != null) this.circle.setMap(null);
            if (this.markerUtilities != null && this.markerUtilities.length > 0) {
                for (var i = 0; i < this.markerUtilities.length; i++) {
                    this.markerUtilities[i].setMap(null)
                }
            }
            if (this.infoWindow != null) this.infoWindow.setMap(null);

            if (a == undefined || a == true) {
                this.ClearUtilitiesAroundCallback()
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
                /*var adr = [];
                if (a[i].hem) adr.push(a[i].hem);
                if (a[i].ngo) adr.push(a[i].ngo);
                if (a[i].ngach) adr.push(a[i].ngach);
                if (a[i].duong) adr.push(a[i].duong);
                if (a[i].huyen) adr.push(a[i].huyen);
                if (a[i].diachi) adr.push(a[i].diachi);
                a[i].address = adr.join(', ');*/
                var e = parseInt(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a[i].latitude, a[i].longitude), b));
                if (e <= c) {
                    a[i].distance = e;
                    d.push(a[i])
                }
            }
            return d
        };

        this.closeInfoWindowCallBack = function (h) {
            //if (!this.isShowUtil) {
                h.setIcon(iconMarker.default);
                this.input.product.value = this.currentPID = '';
                this.map.setZoom(zoom_moderate);
                this.map.setCenter(this.centerPos);

                this.input.isShowUtil.value = 0;
                this.isShowUtil = false;
                this.ClearUtilitiesAroundPoint();
                productControlerObj.ChangeUrlForNewContext();
            //}
        };

        this.showInfoTipWindow = function (h, k) {
            $thismap.infoTipWindow.close();
            if (!k) k = 'Empty info';
            $thismap.infoTipWindow.setOptions({
                position: h.position,
                //center: h.position,
                maxWidth: 220,
                content: k
            });
            $thismap.infoTipWindow.open($thismap.map.map_, h);
        }

        this.mouseHover = function (k) {
            if (this.markers) {
                var currentMarkerKey = null;
                if ($thismap.currentPID) {
                    currentMarkerKey = this.findMarkerKey($thismap.currentPID);
                }
                $.each(this.markers, function (i, v) {
                    if (i == k) {
                        v.setIcon(iconMarker.hover);
                        $thismap.showInfoTipWindow(v, $('.map-result-one[attr-marker-id="'+i+'"]').html());
                        $thismap.map.setCenter(v.position);
                        /*
                        if ($thismap.currentPID == i) $thismap.infoWindow.close();
                        if ($thismap.currentPID == i) $thismap.infoWindow.open($thismap.map, v); */
                    } else if (i != currentMarkerKey) {
                        v.setIcon(iconMarker.default);
                    }
                })
            }
        }
        this.mouseOut = function (k) {
            this.infoTipWindow.close();
            if (this.markers) {
                var currentMarkerKey = null;
                this.markers[k].setIcon(iconMarker.default);
                if ($thismap.currentPID) {
                    currentMarkerKey = this.findMarkerKey($thismap.currentPID);
                    $thismap.map.setCenter(this.markers[currentMarkerKey].position);
                    if (currentMarkerKey == k) {
                        this.markers[currentMarkerKey].setIcon(iconMarker.select);
                        if (!this.isShowUtil) {
                            this.infoWindow.close();
                            this.infoWindow.open(this.map, this.markers[currentMarkerKey]);
                        }
                    }
                }
            }
        }

        this.showInfoWindow = function(d, isInit = false) {
            if (!isInit) {
                this.ClearUtilitiesAroundPoint();
                this.isShowUtil = false;
                this.input.isShowUtil.value = 0;
                productControlerObj.ChangeUrlForNewContext();
            }
            var data = null;
            var key = null;

            var runSet = false;
            if (!isInit && d != this.currentPID) runSet = true;

            if (d == undefined || d == null) {
                d = this.currentPID;
            } else if (d != this.currentPID && this.currentPID != null) {
                var t = this.findMarkerKey(this.currentPID);
                var u = this.markers[t];

                this.input.product.value = this.currentPID = d;
                key = this.findMarkerKey(this.currentPID);
                var e = this.markers[key];
                var f = this.findDataInfo(key);
                data = f;
                if (u != undefined && u != null) {
                    u.setIcon(iconMarker.default);
                    if (f != undefined && f != null) {
                        u.setZIndex(6 - f.vip)
                    }
                }
            } else if (d == this.currentPID) {}
            this.input.product.value = d;

            if (this.markers != undefined) {
                if (!key) key = this.findMarkerKey(d);
                if (!data) data = this.findDataInfo(key);
            }

            if (this.infoTipWindow) this.infoTipWindow.close();
            if (this.infoWindow) this.infoWindow.close();

            if (key != null && data) {
                var h = this.markers[key];
                if (runSet) {
                    if (!this.isShowUtil && this.map.getZoom() < zoom_markerView) this.map.setZoom(zoom_markerView);
                    else {
                        this.input.zoom.value = this.map.getZoom();
                        productControlerObj.ChangeUrlForNewContext();
                    }
                    this.map.setCenter(h.position);
                }
                h.setIcon(iconMarker.select);
                //h.setZIndex(300);
                this.currentPID = data.id;

                if (isInit) {
                    if (this.isDetails) {
                        productControlerObj.ShowDetails(this.currentPID);
                    } else if (this.isShowUtil) {
                        productControlerObj.ShowMoreInfo(h.position.lat(), h.position.lng());
                    }
                }

                $('.map-item-info-title').html(data.title);
                $('.map-item-info-price span').html(data.price);
                $('.map-item-info-type').html(data.type);
                $('.map-item-info-contact_phone').html(data.contact_phone);
                $('.map-item-info-address').html(data.address);
                $('.map-item-info-des').html(data.details);
                $('.map-item-info-thumb').attr('src', data.avatar);
                $('.map-item-view-utilities').attr('href', 'javascript:productControlerObj.ShowMoreInfo(' + data.latitude + ',' + data.longitude + ')');
                //$('.map-item-gotoview').attr('href', MAIN_URL+'/map/'+data.id);
                $('.map-item-gotoview').attr('href', 'javascript:productControlerObj.ShowDetails("' + data.id + '")');

                if (!isInit || !this.isShowUtil) {
                    this.infoWindow.setOptions({
                        position: h.position,
                        maxWidth: 470,
                        content: $('.map-item-info-board').html()
                    });
                    this.infoWindow.open(this.map, h);
                }

                google.maps.event.addListener(this.infoWindow, 'closeclick', function () {
                    $thismap.closeInfoWindowCallBack(h);
                });
            }
        };

        return this
    }
    $.fn.ProductMap = ProductMap
}(jQuery));


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
                //a.data.Map.btnUpdateMapIdleResult.show()
            }
            a.data.Map.map.setZoom(zoom_markerView);

            a.data.Map.input.isShowUtil.value = 0;
            a.data.Map.isShowUtil = false;
            productControlerObj.ChangeUrlForNewContext();

            a.data.Map.ClearUtilitiesAroundPoint(false);
            a.data.Map.showInfoWindow()
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
            var l = [];
            $(this).find('input:checked').each(function() {
                if ($(this).val().length > 0) {
                    l.push($(this).val());
                }
            });
            l = l.map(Number);
            var g = l.join(',');
            var h = $(this);
            var i = parseFloat(this.Lat);
            var j = parseFloat(this.Lon);
            this.Map.map.setCenter(new google.maps.LatLng(i, j));

                var k = {};
                k.radius = f;
                k.types = g;
                k.lat = this.Lat;
                k.lon = this.Lon;
                k.m = 'pddetail';
                k.v = new Date().getTime();

                $.ajax({
                    url: MAIN_URL+'/api/node_service.php',
                    data: k,
                    dataType: 'json',
                    type: 'get',
                    success: function(a, b, c) {
                        // when get all data, then filter here (not recommended)
                        var data = [];
                        for (key = 0; key < a.length; key++) {
                            var vl = a[key];
                            if (l.indexOf(vl.typeid) !== -1) {
                                data.push(vl);
                            }
                        }
                        $utilthis.Map.ShowUtilitiesAroundPoint($utilthis.Lat, $utilthis.Lon, f, data, h)
                    },
                    error: function(a, b, c) {
                        console.log(a+' ~ '+b+' ~ '+c)
                    },
                    complete: function() {}
                })

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
    var j = {
        zoom: mapContext.zoom,
        center: mapContext.center,
        lstPoint: mapContext.lstPoint
    };
    this.searchVar = {
        page: 0
    };
    //this.searchtype = $('.map-side-search ul.nav .active').attr('attr-type');
    this.formSearch = $('#map-search-form');
    this.postData = null;
    this.mapResults = $('#map_results');

    this.ProductMap = $('#map').ProductMap('begindraw', 'delshape', 'fullscreen', 'exitfullscreen', mapContext);

    // Init utility for product detail in project map type
    this.utilityTool = $('.controls-utility').UtilityAroundToolbox({ map: this.ProductMap });

    this.ProductMap.callBackMapChange = function(a) {
        i.ChangeUrlForNewContext();
        //i._SearchAction(JSON.parse(JSON.stringify(i.formSearch.serializeArray())));
    };
    this.ProductMap.callBackClearPointEvent = function(a) {
        i.ChangeUrlForNewContext();
        if (!i.ProductMap.isDrawing) {
            i._SearchAction();
        }
    };
    this.ProductMap.callBackDrawEvent = function(a, b, c, d, e, f, g) {
        i.callBackDrawEvent(a, b, c, d, e, f, g);
    };

    this.ProductMap.initialize();

    var context = h.context;
    //if (!context.city && !context.currentPID) this.showCitySearch();

    if (!this.ProductMap.isDrawing) {
        this._SearchAction();
    }
    this.formSearch.submit(function () {
        i.ProductMap.currentPID = i.ProductMap.input.product.value = "";
        i.ChangeUrlForNewContext();
        i._SearchAction();
        return false
    });
    this.catchInputChange();
};

ProductSearchControler.prototype.changeCityCallback = function (c_city) {
    var f = this.formSearch;
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            district = cityList[i].district;
            for (var u = 0; u < district.length; u++) {
                district[u].order = district[u].id;
                if (city == 'HN') {
                    if (district[u].id == 718)
                        district[u].order = 15;
                    else if(district[u].id > 15)
                        district[u].order = district[u].id + 1;
                }
            }
            //district = district.sort(SortByOrder);
            break;
        }
    }
    console.log(district);
    options.district = '';
    f.find('#district').html('<option value="CN">--Chọn Quận/Huyện--</option>');
    f.find('#ward').html('<option value="CN">--Chọn Phường/Xã--</option>');
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>');
    if (district != null && district) {
        for (var i = 0; i < district.length; i++) {
            options.district += "<option value='" + district[i].id + "'>" + district[i].name + "</option>";
            street = district[i].street;
        }
    }
    f.find('#district').append(options.district);
}

ProductSearchControler.prototype.changeDistrictCallback = function (c_district) {
    var f = this.formSearch;
    ward = {};
    street = {};
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            for (var j = 0; j < cityList[i].district.length; j++) {
                if (cityList[i].district[j].id == c_district) {
                    project = cityList[i].district[j].project;
                    ward = cityList[i].district[j].ward;
                    street = cityList[i].district[j].street;
                    break;
                }

            }
        }
    }

    options.ward = '';
    f.find('#ward').html('<option value="CN">--Chọn Phường/Xã--</option>'+options.ward);
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>');
    if (ward != null && ward) {
        for (var j = 0; j < ward.length; j++) {
            options.ward += "<option value='" + ward[j].id + "'>" + ward[j].name + "</option>";
        }
    }
    f.find('#ward').append(options.ward);
}

ProductSearchControler.prototype.changeWardCallback = function (c_ward) {
    var f = this.formSearch;
    options.street = '';
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>'+options.street);
    if (street != null && street) {
        for (var j = 0; j < street.length; j++) {
            options.street += "<option value='" + street[j].id + "'>" + street[j].name + "</option>";
        }
    }
    f.find('#street').append(options.street);
}

ProductSearchControler.prototype.catchInputChange = function () {
    var i = this;
    var f = i.formSearch;
    f.find('#city').on('change', function () {
        i.changeCityCallback($(this).val());
    });
    f.find('#district').on('change', function () {
        i.changeDistrictCallback($(this).val());
    });
    f.find('#ward').on('change', function () {
        i.changeWardCallback($(this).val());
    })
}

ProductSearchControler.prototype.closePopup = function () {
    this.ProductMap.input.details.value = 0;
    this.ProductMap.isDetails = false;
    this.ChangeUrlForNewContext();
}

ProductSearchControler.prototype.ShowMoreInfoAndHidePopup = function (id, lat, lon) {
    this.ProductMap.showInfoWindow(id);
    this.ShowMoreInfo(lat,lon);
}

ProductSearchControler.prototype.ShowMoreInfo = function (lat, lon) {
    if (this.ProductMap.map.getZoom() < zoom_utilityView)
        this.ProductMap.map.setZoom(zoom_utilityView);

    this.utilityTool.ResetRadius();
    this.utilityTool.SearchAction(lat, lon);
};

ProductSearchControler.prototype.ShowDetails = function (id) {
    var i = this;
    if (!i.ProductMap.isDetails) {
        i.ProductMap.input.details.value = 1;
        i.ProductMap.isDetails = true;
        i.ChangeUrlForNewContext();
    }
};


ProductSearchControler.prototype._SearchAction = function(g) {
    var f = this;
    e = this.formSearch.serialize().split('&');
    var d = {};
    d.filter = 0;
    d.sort = 0;
    d.v = new Date().getTime();

    if (this.ProductMap.isDrawing) {
        for (var key in g) d[key] = g[key];
        //d = Object.assign({}, e, g);
    } else {
        //d = JSON.parse(JSON.stringify(this.formSearch.serializeArray()), true);
        $.each(e, function (i, v) {
            vk = v.split('=')[0];
            vl = v.split('=')[1];
            d[vk] = vl;
        })
        /*var lat = parseFloat(d.lat);
        var lng = parseFloat(d.lng);
        var radius = parseFloat(d.location_radius);*/
    }

    this.searchVar = d;
    console.log(d);
    console.log(f.ProductMap);
    var type = (f.ProductMap.searchtype == 1 ? 'project' : 'node');
    console.log(MAIN_URL+'/api/'+type+'.php');

    //f.ChangeUrlForNewContext();

    $.ajax({
        url: MAIN_URL+'/api/'+type+'.php',
        type: 'get',
        success: function(data) {
            // show on map
            f.tempProductData = f.productData = f.ProductMap.showMap(data, d.isSearchForm);
            f.showList(data);
        },
        error: function(a, b, c) {
            console.log(a+' ~ '+b+' ~ '+c)
        }
    });
};


ProductSearchControler.prototype.showList = function (d) {
    var f = this;
    f.mapResults.html('');
    $.each(d, function (i, v) {
        /*var adr = [];
        if (v.hem) adr.push(v.hem);
        if (v.ngach) adr.push(v.ngach);
        if (v.ngo) adr.push(v.ngo);
        if (v.duong) adr.push(v.duong);
        if (v.huyen) adr.push(v.huyen);
        if (v.diachi) adr.push(v.diachi);
        v.address = adr.join(', ');*/
        k = '<div attr-id="'+v.id+'" attr-marker-id="'+i+'" class="map-result-one">';
        k += '<div class="map-result-one-left">';
        k += '<img class="map-result-one-thumb" src="'+v.avatar+'">';
        k += '<div class="map-result-one-price"><i class="fa fa-dollar"></i> <span>'+v.price+'</span></div>';
        k += '</div>';
        k += '<div class="map-result-one-info">'
        k += '<h3 class="map-result-one-title">'+v.title+'</h3>';
        //k += '<div class="map-result-one-des">'+v.details+'</div>';
        k += '<div class="map-result-one-adr"><i class="fa fa-map-marker"></i> '+v.address+'</div>';
        //k += '<div class="map-result-one-type">'+v.type+'</div>';
        //k += '<div class="map-result-one-phone">'+v.phone+'</div>';
        k += '</div>';
        k += '<div class="clearfix"></div>';
        k += '</div>';
        f.mapResults.append(k);
    });
    $('.map-result-one').each(function () {
        $(this).mouseenter(function () {
            f.ProductMap.mouseHover($(this).attr('attr-marker-id'));
        });
        $(this).mouseleave(function () {
            f.ProductMap.mouseOut($(this).attr('attr-marker-id'));
        });
        $(this).click(function () {
            f.ProductMap.showInfoWindow($(this).attr('attr-id'));
            if (f.ProductMap.searchtype) {
                f.getProjectNodes();
            }
            f.ChangeUrlForNewContext();
        })
    })
};

ProductSearchControler.prototype.getProjectNodes = function () {

}

ProductSearchControler.prototype.callBackDrawEvent = function(a, b, c, d, e, f) {
    this.lstPoint = this.ProductMap.input.points.value;
    if (this.lstPoint != null && this.lstPoint.length > 0) {
        var g = JSON.parse(JSON.stringify(this.formSearch.serializeArray()));
        /*
        g.ptype = $('.product-form > .tab > .active').attr('cateid');
        g.cate = this.hdbProductType.getValue();
        g.area = this.hdbAreaLevel.getValue();
        g.price = this.hdbPriceLevel.getValue();
        g.room = this.hdbRoomLevel.getValue();
        g.direct = this.hdbDirection.getValue();
        g.startdate = '';
        g.enddate = '';
        */
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
            g.zoom = this.getZoom();
            g.center = this.getCenter()
        }
        this._SearchAction(g)
    }
};
ProductSearchControler.prototype.ChangeUrlForNewContext = function(e) {
    $input = this.ProductMap.input;
    var a = "ptype=" + ($input.type.value != undefined ? $input.type.value : '');
    a += "&cat=";
    a += "&city=" + ($input.city.value != undefined ? $input.city.value : '');
    a += "&district=" + ($input.district.value != undefined ? $input.district.value : '');
    a += "&area=" + ($input.area.value != undefined ? $input.area.value : '');
    a += "&price=" + ($input.price.value != undefined ? $input.price.value : '');
    a += "&ward=" + ($input.ward.value != undefined ? $input.ward.value : '');
    a += "&street=" + ($input.street.value != undefined ? $input.street.value : '');
    a += "&room=" + ($input.room.value != undefined ? $input.room.value : '');
    a += "&direction=" + ($input.direction.value != undefined ? $input.direction.value : '');
    //a += "&project=" + ($input.project.value != undefined ? $input.project.value : '');
    a += "&project=";
    a += "&points=" + (this.ProductMap.isDrawing ? ($input.points.value != undefined ? $input.points.value : '') : '');
    a += "&zoom=" + this.ProductMap.getZoom();
    a += "&center=" + this.ProductMap.getCenter();
    a += "&page=0";
    a += "&product=" + (this.ProductMap.currentPID != undefined && this.ProductMap.currentPID != null ? this.ProductMap.currentPID : '');
    a += "&isShowUtil=" + (this.ProductMap.isShowUtil && this.ProductMap.currentPID != undefined && this.ProductMap.currentPID != null ? 1 : 0);
    a += "&searchtype=" + (this.ProductMap.searchtype ? 1 : 0);
    a += "&details=" + (this.ProductMap.isDetails ? 1 : 0);
    window.location.href = window.location.pathname + '#' + a;
    //console.log('ChangeUrlForNewContext: '+window.location.pathname + '#' + a);
};
