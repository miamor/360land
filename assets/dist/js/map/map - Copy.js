var browser = {
    isMobile: window.navigator.userAgent.indexOf('iPad') > 0
};
var minZoomAllowSearch = 10;
var minZoom = 5;
var defaultCenter = '20.9947910308838:105.86784362793003'; // hanoi
var options = {city:'',district:'',ward:'',street:''};
//var c_city = c_district = null;
var city = district = ward = street = project = null;
var labelOrigin = new google.maps.Point(0,0);

var zoom_markerView = 13;
var zoom_moderate = 11;
var zoom_utilityView = 16;
var cityList = [];

(function($){
	$.fn.extend({
		donetyping: function (callback,timeout) {
//			timeout = timeout || 1e3; // 1 second default timeout
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
        this.currentMarkerKey = null;
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

        //this.sv = new google.maps.StreetViewService();
        this.panorama = null;

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
            this.currentMarkerKey = this.findMarkerKey(this.currentPID);

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
            var latlng = new google.maps.LatLng(f, g);
            var k = {
                center: latlng,
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
            var styles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
            this.map.mapTypes.set('styled_map', styledMap);
            this.map.setMapTypeId('styled_map');

            //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('controlArea'));
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('controlUtility'));
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('mapSide'));

            var locationData = null;
            if (this.listLatlgn != null) {
                this.polyline = new google.maps.Polygon({
                    path: this.listLatlgn,
                    strokeColor: '#00a65a',
                    strokeWeight: 2,
                    editable: true,
                    fillColor: "#5de0a4",
                    fillOpacity: 0.25
                });
                this.polyline.setMap(this.map);
                this.findPoint(this.polyline);
                this.catchChangePolyline();
            }

        };

        /*this.processSVData = function (data, status) {
            if (status === 'OK') {
                var marker = new google.maps.Marker({
                    position: data.location.latLng,
                    map: map,
                    title: data.location.description
                });

                this.panorama.setPano(data.location.pano);
                this.panorama.setPov({
                    heading: 270,
                    pitch: 0
                });
                this.panorama.setVisible(true);

                marker.addListener('click', function() {
                    var markerPanoID = data.location.pano;
                    // Set the Pano to use the passed panoID.
                    this.panorama.setPano(markerPanoID);
                    this.panorama.setPov({
                        heading: 270,
                        pitch: 0
                    });
                    this.panorama.setVisible(true);
                });
            } else {
                console.error('Street View data not found for this location.');
            }
        }*/


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
                    strokeColor: '#00a65a',
                    strokeWeight: 2,
                    editable: true,
                    fillColor: "#5de0a4",
                    fillOpacity: 0.25
                });
                $thismap.polyline.setMap($thismap.map);
                $thismap.findPoint($thismap.polyline);
                this.catchChangePolyline();

                //this.btnUpdateMapIdleResult.hide();
            }
            this.listLatlgn = null
        };

        this.catchChangePolyline = function () {
            google.maps.event.addListener($thismap.polyline.getPath(), 'set_at', function() {
                $thismap.findPoint($thismap.polyline);

                $thismap.listLatlgn = $thismap.polyline.getPath().getArray();
                var points = [];
                for (var i = 0; i < $thismap.listLatlgn.length; i++) {
                    points.push($thismap.listLatlgn[i].lat() + ':' + $thismap.listLatlgn[i].lng());
                }
                $thismap.input.points.value = $thismap.lstPoint = points.join(',');
                productControlerObj.ChangeUrlForNewContext();
            });
            google.maps.event.addListener($thismap.polyline.getPath(), 'insert_at', function() {
                $thismap.findPoint($thismap.polyline);

                $thismap.listLatlgn = $thismap.polyline.getPath().getArray();
                var points = [];
                for (var i = 0; i < $thismap.listLatlgn.length; i++) {
                    points.push($thismap.listLatlgn[i].lat() + ':' + $thismap.listLatlgn[i].lng());
                }
                $thismap.input.points.value = $thismap.lstPoint = points.join(',');
                productControlerObj.ChangeUrlForNewContext();
            })
        }

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
            this.map.setZoom(zoom_moderate);
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
                    icon: nodeMarker[location.type].default,
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
                        this.setIcon(nodeMarker[a[i].type].hover)
                    }
                });
                oneMarker.addListener('mouseout', function() {
                    if (this.id != $thismap.currentPID) {
                        this.setIcon(nodeMarker[a[i].type].default)
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
            var key = this.findMarkerKey(this.currentPID);
            h.setIcon(nodeMarker[$thismap.data[key].type].select);
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
                if ($(this).closest('label').find('.uti-total').length > 0) {
                    $(this).closest('label').find('.uti-total').html('(' + b + ')')
                } else {
                    $(this).closest('label').append(' <span class="uti-total">(' + b + ')</span>')
                }
            });

            $thismap.input.isShowUtil.value = 1;
            $thismap.isShowUtil = true;
            productControlerObj.ChangeUrlForNewContext();

            if (this.dataUtilities != null && this.dataUtilities.length > 0) {
                this.markerUtilities = this.dataUtilities.map(function(utility, i) {
                    return new google.maps.Marker({
                        position: new google.maps.LatLng(utility.latitude, utility.longitude),
                        icon: ultiMarker[utility.type]
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
            var key = this.findMarkerKey(this.currentPID);
                h.setIcon(nodeMarker[$thismap.data[key].type].default);
                this.input.product.value = this.currentPID = '';
                this.currentMarkerKey = null;

                //this.map.setZoom(zoom_moderate);
                //this.map.setCenter(this.centerPos);

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
                /*var currentMarkerKey = null;
                if ($thismap.currentPID) {
                    currentMarkerKey = this.findMarkerKey($thismap.currentPID);
                }*/
                $.each(this.markers, function (i, v) {
                    if (i == k) {
                        v.setIcon(nodeMarker[$thismap.data[$thismap.currentMarkerKey].type].hover);
                        $thismap.showInfoTipWindow(v, $('.map-result-one[attr-marker-id="'+i+'"]').html());
                        $thismap.map.setCenter(v.position);
                        /*
                        if ($thismap.currentPID == i) $thismap.infoWindow.close();
                        if ($thismap.currentPID == i) $thismap.infoWindow.open($thismap.map, v); */
                    } else if (i != currentMarkerKey) {
                        v.setIcon(nodeMarker[$thismap.data[$thismap.currentMarkerKey].type].default);
                    }
                })
            }
        }
        this.mouseOut = function (k) {
            this.infoTipWindow.close();
            if (this.markers) {
                this.markers[k].setIcon(nodeMarker[$thismap.data[k].type].default);
                if ($thismap.currentPID) {
                    //currentMarkerKey = this.findMarkerKey($thismap.currentPID);
                    $thismap.map.setCenter(this.markers[$thismap.currentMarkerKey].position);
                    if ($thismap.currentMarkerKey == k) {
                        this.markers[$thismap.currentMarkerKey].setIcon(nodeMarker[$thismap.data[$thismap.currentMarkerKey].type].select);
                        if (!this.isShowUtil) {
                            this.infoWindow.close();
                            this.infoWindow.open(this.map, this.markers[$thismap.currentMarkerKey]);
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
                this.currentMarkerKey = key = this.findMarkerKey(this.currentPID);
                var e = this.markers[key];
                var f = this.findDataInfo(key);
                data = f;
                if (u != undefined && u != null) {
                    u.setIcon(nodeMarker[$thismap.data[key].type].default);
                    if (f != undefined && f != null) {
                        u.setZIndex(6 - f.vip)
                    }
                }
            } else if (d == this.currentPID) {}
            this.input.product.value = d;

            if (this.markers != undefined) {
                if (!key) this.currentMarkerKey = key = this.findMarkerKey(d);
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
                h.setIcon(nodeMarker[$thismap.data[key].type].select);
                //h.setZIndex(300);
                this.currentPID = data.id;
                this.currentMarkerKey = this.findMarkerKey(this.currentPID);

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
                $('.map-item-info-contact_phone').html(data.dienthoai);
                $('.map-item-info-address').html(data.address);
                $('.map-item-info-des').html(data.details);
                $('.map-item-info-thumb').attr('src', data.avatar);
                $('.map-item-info-bed').html(data.sophongngu);
                $('.map-item-info-huong').html(data.huong);
                $('.map-item-view-utilities').attr('href', 'javascript:productControlerObj.ShowMoreInfo(' + data.latitude + ',' + data.longitude + ')');
                //$('.map-item-gotoview').attr('href', MAIN_URL+'/map/'+data.id);
                $('.map-item-gotoview').attr('href', 'javascript:productControlerObj.ShowDetails("' + data.id + '")');

                if (!isInit || !this.isShowUtil) {
                    this.infoWindow.setOptions({
                        position: h.position,
                        maxWidth: 300,
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
    //this.searchtype = $('#map-side-search ul.nav .active').attr('attr-type');
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

    this.SearchProjectName();

    var context = h.context;
    if (!context.city && !context.currentPID) this.showCitySearch();

    if (!this.ProductMap.isDrawing) {
        this._SearchAction();
    }
    this.formSearch.submit(function () {
        i.ProductMap.currentPID = i.ProductMap.input.product.value = "";
        i.ProductMap.currentMarkerKey = i.ProductMap.findMarkerKey(i.ProductMap.currentPID);
        i.ChangeUrlForNewContext();
        i._SearchAction();
        return false
    });
    this.catchInputChange();
};

ProductSearchControler.prototype.SearchProjectName = function () {
    $('#project_name').keydown(function () {
		k = $(this).attr('name').split('town')[1];
		$dr = $('#project_name').next('.ville-dropdown');
		loading = '<div class="spinner loading-sending"><div></div><div></div><div></div></div>';
		if (!$dr.length) $('#project_name').after('<div class="ville-dropdown">'+loading+'</div>');
		else $dr.show().html(loading);
	}).donetyping(function () {
		val = $(this).val();
		$.ajax({
			url: MAIN_URL+'/api/search_name.php?n='+val.length,
			type: 'get',
			data: 'city='+val,
			success: function (data) {
                $dr = $('#project_name').next('.ville-dropdown');
                $dr.show().html('');
                $.each(data, function (i, d) {
    				var vO = '<div class="sthumb"><img src="'+d.thumb+'"/></div> <div class="stit"><b>'+d.title+'</b> <div class="sadr"><i class="fa fa-map-marker"></i> '+d.address+'</div></div><div class="clearfix"></div>';
    				$dr.append('<div class="ville-one" id="v'+i+'">'+vO+'</div>');
    				$('.ville-one#v'+i).click(function () {
                        console.log(vO);
    					$dr.remove()
    				})
                })
			}
		})
	});
}

ProductSearchControler.prototype.showCitySearch = function () {
    var i = this;
    cityOptions = $('select#city').html();
    html = '<div class="popup-select-city popup-section section-light"><div class="callout callout-info">Blah blah~~~ Some messages here~</div><div class="select-city-board"><div class="col-lg-3 no-padding"><h4>Chọn thành phố</h4></div><div class="col-lg-9 no-padding-right"><select id="city_first">'+cityOptions+'</select></div><div class="clearfix"></div></div>  <div class="center"><a href="#" class="btn btn-danger select-city-done">Tìm kiếm</a></div> </div>';
    $('.popup-content').css({
        left: '25%',
        right: '25%',
        height: 200
    });
    popup(html);
    $('.popup-content [role="close"]').hide();
    $('.select-city-done').click(function () {
        var cityy = $('select#city_first').val();
        if (cityy == 'HN') i.ProductMap.input.center.value = '21.0277644:105.83415979999995';
        $('select#city').val(cityy);
        i.changeCityCallback(cityy);
        remove_popup();
        i.ChangeUrlForNewContext();
        i._SearchAction();
        return false
    })
}

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
    remove_popup();
    this.closePopup();
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
    $.get(MAIN_URL+'/api/node_one.php', function (place) {
        console.log(place);
        /*var adr = [];
        if (place.hem) adr.push(place.hem);
        if (place.ngach) adr.push(place.ngach);
        if (place.ngo) adr.push(place.ngo);
        if (place.duong) adr.push(place.duong);
        if (place.huyen) adr.push(place.huyen);
        if (place.diachi) adr.push(place.diachi);
        place.address = adr.join(', ');*/
        html = '<div class="v-place-view">';
        html += '<div class="col-lg-8 v-place-imgs no-padding">';
        html += '<div class="v-place-board v-place-v-thumbs">';
        html +=     '<div class="v-place-bg" style="background-image:url('+place.thumbs[0]+')"></div>';
        html +=     '<div class="v-place-thumbs">';
        html +=         '<img class="v-place-thumb active" src="'+place.thumbs[0]+'"/>';
        html +=         '<img class="v-place-thumb" src="'+place.thumbs[1]+'"/>';
        html +=         '<img class="v-place-thumb" src="'+place.thumbs[2]+'"/>';
        html +=         '<img class="v-place-thumb" src="'+place.thumbs[3]+'"/>';
        html +=     '</div>';
        html += '</div>';
        html += '<div class="v-place-board v-place-v-360">';
        html += '  	  <div class="panorama"><img src="http://www.thepetedesign.com/demos/panorama_viewer/demo_photo3.jpg"></div>';
        html += '</div>';
        html += '<div class="v-place-board v-place-v-streetview hide">';
        html += '<div id="pano"></div>';
        html += '</div>';
        html += '<div class="v-place-board v-place-v-video hide">';
        html += '</div>';
        html += '<div class="v-place-switch-buttons">';
        html +=     '<div class="v-place-mode active" id="v-thumbs" title="Xem ảnh thường"><i class="fa fa-picture-o"></i></div>';
        html +=     '<div class="v-place-mode" id="v-360" title="Ảnh 360"><i class="fa fa-map"></i></div>';
        html +=     '<div class="v-place-mode" id="v-streetview" title="Ảnh đường phố"><i class="fa fa-map-signs"></i></div>';
        html +=     '<div class="v-place-mode" id="v-video" title="Xem video"><i class="fa fa-play-circle"></i></div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="col-lg-4 popup-section section-light v-place-info">';
        html += '<img class="v-place-avt left" src="'+place.avatar+'"/>';
        html += '<h4 class="v-place-title">'+place.title+'</h4>';
        html += '<div class="v-place-type">'+place.type+'</div>';
        html += '<div class="clearfix"></div>';
        html += '<div class="v-place-address"><i class="fa fa-map-marker"></i> '+place.address+'</div>';
        html += '<div class="v-place-price"><i class="fa fa-dollar"></i> Giá bán: <span class="v-place-pricenum">'+place.price+'</span></div>';
        html += '<div class="place-contact-info"><h3>'+place.tenlienhe+'</h3><a href="tel:'+place.dienthoai+'" class="place-contact-info-phone btn btn-danger">'+place.dienthoai+'</a></div>';
        html += '<div class="txt-with-line"><span class="txt generate-new-button">Thông tin chi tiết <span class="fa fa-caret-down"></span></span></div><div class="v-place-details">'+place.details+'</div>';
        html += '</div>';
        html += '<div class="clearfix"></div>';
        html += '</div>';
        html += '<div class="v-place-related popup-section section-light">';
        html +=     '<h4>Dự án tương tự</h4><div class="v-place-related-list"></div>';
        html += '</div>';
        popup(html);

        $(".panorama").panorama_viewer({
            animationTime: 300,         // This allows you to set the easing time when the image is being dragged. Set this to 0 to make it instant. The default value is 700.
        });

        var interval = null;
        var check = function() {
            if ($('.panorama .pv-inner').length) {
                clearInterval(interval);
                $('.v-place-v-360').hide();
            }
        };
        interval = setInterval(check, 1200);

        //var latlng = new google.maps.LatLng(place.latitude, place.longitude);
        //i.ProductMap.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        //i.ProductMap.sv.getPanorama({location: latlng, radius: 50}, i.ProductMap.processSVData);

        //setWidth();
        $('.popup-content [role="close"]').show();
        $.get(MAIN_URL+'/api/node.php', function (similar) {
            //console.log(similar);
            for (si = 0; si < 4; si++) {
                sv = similar[si];
                $('.v-place-related-list').append('<a href="javascript:productControlerObj.ShowMoreInfoAndHidePopup(\''+sv.id+'\','+sv.latitude+','+sv.longitude+')" class="v-place-related-one"><img class="v-place-related-one-thumb" src="'+sv.avatar+'"/><div class="v-place-related-one-title">'+sv.title+'<br/><span class="v-place-related-one-address"><i class="fa fa-map-marker"></i> '+sv.address+'</span></div></a>');
            }
        })
        $('.v-place-mode').click(function () {
            vid = $(this).attr('id');
            $('.v-place-board').hide();
            $('.v-place-'+vid).show();
            $('.v-place-mode').removeClass('active');
            $(this).addClass('active');
            if (vid == 'v-360') {
                console.log('panorama');
            }
        });
        $('.v-place-thumb').click(function () {
            img = $(this).attr('src');
            $('.v-place-bg').css('background-image', 'url('+img+')');
            $('.v-place-thumb').removeClass('active');
            $(this).addClass('active');
        });
        $('.popup-content [role="close"]').click(function () {
            i.closePopup();
        })
    });
};

ProductSearchControler.prototype._SearchAction = function(g) {
    var f = this;
    e = this.formSearch.serialize().split('&');
    var d = {};
    d.filter = 0;
    d.sort = 0;
    d.v = new Date().getTime();

    //d = JSON.parse(JSON.stringify(this.formSearch.serializeArray()), true);
    $.each(e, function (i, v) {
        vk = v.split('=')[0];
        vl = v.split('=')[1];
        d[vk] = vl;
    })
    /*var lat = parseFloat(d.lat);
    var lng = parseFloat(d.lng);
    var radius = parseFloat(d.location_radius);*/

    if (this.ProductMap.isDrawing) {
        for (var key in g) d[key] = g[key];
        //d = Object.assign({}, e, g);
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


var oldWidth = $(window).width();
var oldHeight = $(window).height();

function render (isResizeSmaller = false, searchVisible = false, resultVisible = false) {
    var w = $(window).width();
    var h = $(window).height();

    //$('.map-side .tab-content').height($(window).height() - $('nav.navbar').height() - $('.map-side>ul.nav').height());

    oldWidth = w;
    oldHeight = h;

    if (isResizeSmaller) {
        w = w + 12;
        h = h + 12;
    }
    $('.container').css({
        height: h,
        width: w
    })

    //while ($('.v-place-imgs').width() <= 10 || $('.v-place-info').width() <= 10) {
        setWidth(w);
    //}

    if (resultVisible) {
        $('.map-tabs-toggle[attr-tab="result"]').html('<i class="fa fa-angle-double-up"></i>');
        $('.map-result-tabs').slideDown(100).closest('.nav-tabs-custom').addClass('open');
    } else {
        $('.map-tabs-toggle[attr-tab="result"]').html('<i class="fa fa-angle-double-down"></i>');
        $('.map-result-tabs').slideUp(100).closest('.nav-tabs-custom').removeClass('open');
    }

    if (searchVisible) { // show search
        $('.map-tabs-toggle[attr-tab="search"]').html('<i class="fa fa-angle-double-up"></i>');
        $('.map-search-tabs').slideDown(100, function () {
            $(this).closest('.nav-tabs-custom').addClass('open');
            $('.map-side-result').animate({
                top: $('#map-side-search').height() - 9,
            },100).closest('.nav-tabs-custom').removeClass('open');
            //$('#map_search_project').height($('#map_search_node').height());
        });
    } else {
        $('.map-tabs-toggle[attr-tab="search"]').html('<i class="fa fa-angle-double-down"></i>');
        $('.map-search-tabs').slideUp(100, function () {
            $(this).closest('.nav-tabs-custom').removeClass('open');
            $('.map-side-result').animate({
                top: 30
            },100);
        });
    }

    $('#map-side-search ul.nav>li>a').click(function (e) {
        var type = $(this).parent('li').attr('attr-type');
        $('#map-search-form .form-group[attr-type]').hide();
        $('#map-search-form .form-group[attr-type="'+type+'"]').show();
        $('#map-search-form input#searchtype').val(type == 'node' ? 0 : 1);
        setTimeout(function () {
            $('.map-side-result').css({
                top: $('#map-side-search').height() - 9
            })
        },100);
        e.preventDefault();
    })

    if (w <= 500) {
        $('#mapSide').width(w-20).css('right','10px!important')
    }
}

function setWidth(w) {
    if (w <= 900) {
        var vheight = $('.v-place-imgs').height();
        if ($('.v-place-imgs').width() == $('.v-place-info').width()+40) {
            $('.v-place-view').height($('.v-place-imgs').height() + $('.v-place-info').height() + 80);
            $('.v-place-imgs').height(vheight);
            $('.v-place-info').css('height','auto');
        }
    } else {
        $('.v-place-view').css('height', '90%');
        $('.v-place-imgs,.v-place-info').css('height', '100%');
    }
}

var markContext = "";
var mapContext = {};
var productControlerObj = null;

$(window).ready(function() {
    if (typeof cityListOther1 != 'undefined')
        cityList = $.merge(cityList, cityListOther1);
    if (typeof cityListOTher2 != 'undefined')
        cityList = $.merge(cityList, cityListOther2);
    if (typeof cityListOTher3 != 'undefined')
        cityList = $.merge(cityList, cityListOther3);
    if (typeof cityListOTher4 != 'undefined')
        cityList = $.merge(cityList, cityListOther4);

    if (window.location.hash != '') {
        markContext = window.location.hash;
        mapContext = {
            ptype: parseInt(markContext.getQueryHash('ptype', '38')),
            catid: markContext.getQueryHash('cat'),
            city: markContext.getQueryHash('city'),
            district: markContext.getQueryHash('district'),
            area: markContext.getQueryHash('area'),
            price: markContext.getQueryHash('price'),
            ward: markContext.getQueryHash('ward'),
            street: markContext.getQueryHash('street'),
            room: markContext.getQueryHash('room'),
            direction: markContext.getQueryHash('direction'),
            projectid: markContext.getQueryHash('project'),
            lstPoint: markContext.getQueryHash('points'),
            zoom: markContext.getQueryHash('zoom', zoom_moderate),
            center: markContext.getQueryHash('center'),
            page: markContext.getQueryHash('page', '1'),
            currentPID: markContext.getQueryHash('product'),
            isShowUtil: markContext.getQueryHash('isShowUtil'),
            details: markContext.getQueryHash('details'),
            searchtype: parseInt(markContext.getQueryHash('searchtype', '0'))
        };
    }
    // Fix content from product list linking
    if (mapContext.area == "-1")
        mapContext.area = "";
    if (mapContext.pricelevel == "-1")
        mapContext.pricelevel = "";
    if (mapContext.room == "-1")
        mapContext.room = "";
    if (mapContext.direction == "-1")
        mapContext.direction = "";
    if (!mapContext.center)
        mapContext.center = defaultCenter;
    if (!mapContext.zoom)
        mapContext.zoom = zoom_moderate;
    if (!mapContext.lstPoint)
        mapContext.lstPoint = "";

    $('nav.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');

    render(false, true, false);

    productControlerObj = new ProductSearchControler({
        context: mapContext
    });

    $(window).on('resize', function () {
        var b = false;
        if (oldWidth > $(window).width() || oldHeight > $(window).height()) b = true;
        var searchVisible = $('.map-search-tabs').is(':visible'),
            resultVisible = $('.map-result-tabs').is(':visible');
        render(b, searchVisible, resultVisible);
        productControlerObj.ProductMap.resize();
    });
    $('.toggle-search-advanced').click(function () {
        if ($('.map-search-advanced').is(':visible')) {
            $('.map-search-advanced').slideUp(200, function () {
                $('.map-side-result').animate({
                    top: $('#map-side-search').height() - 9
                },100)
            });
        } else {
            $('.map-search-advanced').slideDown(200, function () {
                $('.map-side-result').animate({
                    top: $('#map-side-search').height() - 9
                },100)
            });
        }
    });
    $('.map-tabs-toggle').click(function () {
        var currentlyHide = true;
        var tabs = $(this).attr('attr-tab');
        var $this = $(this);
        var searchVisible, resultVisible;
        if (tabs == 'search') {
            searchVisible = !$('.map-search-tabs').is(':visible');
            resultVisible = false;
        }
        else {
            resultVisible = !$('.map-result-tabs').is(':visible');
            searchVisible = false;
        }
        render(false, searchVisible, resultVisible);
    });
    $('#mapSide .nav-tabs>li>a').click(function () {
        var $div = $(this).closest('.nav-tabs-custom');
        if ($div.is('#map-side-search')) {
            console.log($div);
            render(false, true, false)
        } else if ($div.is('.map-side-result')) {
            render(false, false, true)
        }
    });

})
