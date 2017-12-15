var browser = {
    isMobile: window.navigator.userAgent.indexOf('iPad') > 0
};
var minZoomAllowSearch = 10;
var minZoom = 8;
var defaultCenter = '20.9947910308838:105.86784362793003'; // hanoi
var options = {city:'',district:'',ward:'',street:''};
var c_city = c_district = c_ward = null;
var city = district = ward = street = project = null;
var labelOrigin = new google.maps.Point(20,20);

var zoom_markerView = 13;
var zoom_moderate = 11;
var zoom_utilityView = 16;
var cityList = [];

/*var iconMarker = {
    default: {
        url: MAIN_URL+'/assets/img/marker.svg',
    },
    hover: {
        url: MAIN_URL+'/assets/img/marker-hightlight.svg',
    },
    select: {
        url: MAIN_URL+'/assets/img/marker.png',
    },
    group: {
        url: MAIN_URL+'/assets/img/marker-plus.svg',
    }
};*/

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
};

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
        this.infoWindow = new google.maps.InfoWindow({
            disableAutoPan: true
        });
        this.infoUtiWindow = new google.maps.InfoWindow({
            disableAutoPan: true
        });
        this.infoTipWindow = new google.maps.InfoWindow({
            disableAutoPan: true,
            maxWidth: 250,
            maxHeight: 120
        });
        this.currentPosMarker = null;
        this.utilArea = null;
        this.isProject = 0;
        if (s.isProject) this.isProject = s.isProject;
        //console.log('s.isProject = '+s.isProject);

        this.zoom = null;
        this.isTrigger = false;

        this.currentProduct = null;

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
        this.input.place_search = document.getElementById('place_search');

        this.isDirection = false;

        this.myPos = null;

        this.bounds = null;
        this.place_search = null;

        this.enableSetCenter = true;
        if (s.utilArea && s.utilArea != undefined && s.utilArea != NaN && s.utilArea != "NaN") {
            this.utilArea = parseInt(s.utilArea);
        } else {
            this.utilArea = 500;
        }
        $('#cbbRadius').val(this.utilArea);

        /*
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
        };*/

        google.maps.event.addListener(this.infoWindow, 'domready', function() {
            $thismap.styleInfoWindow();
        });
        google.maps.event.addListener(this.infoTipWindow, 'domready', function() {
            $thismap.styleInfoWindow();
        });

        this.styleInfoWindow = function () {
            $('.gm-style-iw').each(function () {
                var iwOuter = $(this);
                iwOuter.parent().attr('class', 'gw-window');
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
        }

        this.initialize = function() {
            // set input value based on the window hash
            if (s.type) this.input.type.value = s.ptype;
            if (s.city) this.input.city.value = c_city = s.city;
            if (s.district) this.input.district.value = c_district = s.district;
            if (s.ward) this.input.ward.value = c_ward = s.ward;
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
            /*if (s.searchtype == 1) {
                this.searchtype = 1;
                //this.input.searchtype.value = 1;
            }*/
            if (s.searchtype != undefined) this.searchtype = s.searchtype;

            if (s.searchtype == 2) {
                $('.map_search_select > [attr-type="project"] > a[href="#map_search_project"]').click();
            } else {
                $('.map_search_select > [attr-type="node"] > a[href="#map_search_node"]').click();
            }


            //console.log(s);
            this.input.zoom.value = s.zoom;
            this.input.center.value = s.center;
            this.input.points.value = s.lstPoint;
            this.input.product.value = s.currentPID;

            if (s.place_search && s.place_search != undefined && s.place_search != 'undefined') this.input.place_search.value = this.place_search = s.place_search;

            this.currentPID = s.currentPID;
            this.currentMarkerKey = this.findMarkerKey(this.currentPID);

            var cc = this.input.center.value.split(':');
            this.centerPos = new google.maps.LatLng(cc[0], cc[1]);

            var e = this.zoom = zoom_moderate;
            if (s.zoom != '') e = this.zoom = parseInt(s.zoom);
            var f = 10.843928;
            var g = 106.717672;
            if (s.center != '') {
                f = parseFloat(s.center.split(':')[0]);
                g = parseFloat(s.center.split(':')[1])
            }

            this.input.points.value = s.lstPoint;

            if (!f || !g) {
                f = 21.02;
                g = 105.8;
            }
            var latlng = new google.maps.LatLng(f, g);
            var k = {
                center: latlng,
                zoom: e,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: true,

                overviewMapControl: false,
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                mapTypeControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                fullscreenControl: false,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                streetViewControl: false,
            };
            this.map = new google.maps.Map(document.getElementById(v), k);

            /*$thismap.currentPosMarker = new google.maps.Marker({
                map: $thismap.map
            });*/

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $thismap.myPos = pos;
                    $thismap.currentPosMarker = new MarkerWithLabel({
                        map: $thismap.map,
                        position: pos,
                        icon: nodeMarker.empty,
                        labelContent: '<div></div>',
                        labelClass: "marker-mypos", // your desired CSS class
                        labelInBackground: true,
                    });
                }, function(a) {
                    console.log(a);
                });
            } else {
                // Browser doesn't support Geolocation
                console.log("Browser doesn't support Geolocation");
            }


            if ($thismap.currentPID) {
                // get data of this node to get latitude and longitude to set center, to get bounds, to get other nodes around it.
                console.log($thismap.currentPID);
                if ($thismap.isProject && $thismap.isProject == 1) {
                    $.ajax({
                        //url: MAIN_URL+'/api/node_one.php',
                        url: API_URL+'/user/chitietduan/',
                        type: 'post',
                        data: {id: $thismap.currentPID},
                        success: function (data) {
                            data = handle(data);
                            $thismap.currentProduct = data;
                            //console.log($thismap.currentProduct);
                            $thismap.map.setCenter(new google.maps.LatLng(data.latitude, data.longitude));
                            if ($thismap.isDetails == 1) productControlerObj.setProjectDetails();
                        },
                        error: function (a, b, c) {
                            console.log(a);
                        }
                    })
                } else {
                    $.ajax({
                        //url: MAIN_URL+'/api/node_one.php',
                        url: API_URL+'/user/chitietnode/',
                        type: 'post',
                        data: {id: $thismap.currentPID},
                        success: function (data) {
                            data = handle(data);
                            $thismap.currentProduct = data;
                            //console.log($thismap.currentProduct);
                            $thismap.map.setCenter(new google.maps.LatLng(data.latitude, data.longitude));
                            if ($thismap.isDetails == 1) productControlerObj.setNodeDetails();
                        },
                        error: function (a, b, c) {
                            console.log(a);
                        }
                    })
                }
            } else if (!$('#place_search').val() && (!c_city || c_city == 'CN') ) {
                if ($thismap.myPos) {
                    $thismap.map.setCenter($thismap.myPos);
                }
            }

            if (s.lstPoint != '' || s.place_search) {
                $thismap.isDrawing = true;
                this.isMapIdle = false;
                this.beginDrawButton.hide();
                this.deleteShapeButton.show();
                //this.btnUpdateMapIdleResult.hide();
                if (s.lstPoint != '') {
                    var h = s.lstPoint.split(',');
                    if (h.length >= 5) {
                        this.listLatlgn = new Array();
                        for (var i = 0; i < h.length; i++) {
                            var j = h[i].split(':');
                            this.listLatlgn.push(new google.maps.LatLng(parseFloat(j[0]), parseFloat(j[1])))
                        }
                    }
                }
            }


            var styles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
            this.map.mapTypes.set('styled_map', styledMap);
            this.map.setMapTypeId('styled_map');

            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('controlArea'));
            this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(document.getElementById('socialArea'));
            this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('controlUtility'));
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('mapSide'));
            this.map.controls[google.maps.ControlPosition.BOTTOM].push(document.getElementById('mapInfoBoard'));
            this.map.controls[google.maps.ControlPosition.RIGHT].push(document.getElementById('overlapNodes'));
            //this.map.controls[google.maps.ControlPosition.TOP].push(document.getElementById('map_search'));

            if (isMobile) {
                $('#controlUtility').addClass('small').css('bottom',($('.map-item-info-board').height()+40).toString()+'px!important');
            }

            var input = document.getElementById('place_search');
            var options = {
                //types: ['(cities)'],
                componentRestrictions: {country: 'vn'}
            };
            $thismap.autocomplete = new google.maps.places.Autocomplete(input, options);
            $thismap.autocomplete.bindTo('bounds', $thismap.map);
            google.maps.event.addDomListener(input, 'keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });

            var input_start = document.getElementById('start');
            $thismap.autocomplete_start = new google.maps.places.Autocomplete(input_start, options);
            $thismap.autocomplete_start.bindTo('bounds', $thismap.map);
            google.maps.event.addDomListener(input_start, 'keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });
            var input_end = document.getElementById('end');
            $thismap.autocomplete_end = new google.maps.places.Autocomplete(input_end, options);
            $thismap.autocomplete_end.bindTo('bounds', $thismap.map);
            google.maps.event.addDomListener(input_end, 'keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });


            $thismap.autocomplete.addListener('place_changed', function() {
                $thismap.isDirection = false;
                var place = $thismap.autocomplete.getPlace();
                $thismap.searchByLocation(place);
                toggleFilterBoard('close');
                //return false;
            });

            /*this.oms = new OverlappingMarkerSpiderfier($thismap.map, {
                            markersWontMove: true,
                            markersWontHide: true,
                            basicFormatEvents: true
                        });*/

            google.maps.event.addListener($thismap.map, 'dragend', function() {
                if (!$thismap.isDirection) {
                    $thismap.isTrigger = true;
                    $thismap.enableSetCenter = false;
                    $thismap.boundsChangeCallBack();
                    //$thismap.enableSetCenter = true;
                }
            });
            google.maps.event.addListener($thismap.map, 'zoom_changed', function() {
                if (!$thismap.isDirection) {
                    $thismap.isTrigger = true;
                    $thismap.enableSetCenter = false;
                    var oldzoom = $thismap.zoom;
                    $thismap.zoom = $thismap.map.getZoom();
                    if (!oldzoom || oldzoom > $thismap.zoom) $thismap.boundsChangeCallBack();
                    productControlerObj.ChangeUrlForNewContext();
                }
            });

            var locationData = null;

            var loaded = false;
            google.maps.event.addListenerOnce($thismap.map, 'idle', function () {
                if ($thismap.isDetails) {
                    if (!$thismap.isDirection) {
                        $thismap.enableSetCenter = true;
                        $thismap.boundsChangeCallBack();
                    }
                } else if ($thismap.listLatlgn != null) {
                    if (!$thismap.isDirection) {
                        $thismap.enableSetCenter = false;
                        $thismap.polyline = new google.maps.Polygon({
                            path: $thismap.listLatlgn,
                            strokeColor: '#00a65a',
                            strokeWeight: 2,
                            editable: (s.place_search ? false : true),
                            fillColor: "#5de0a4",
                            fillOpacity: 0.25
                        });
                        $thismap.polyline.setMap($thismap.map);
                        $thismap.findPoint($thismap.polyline);
                        $thismap.catchChangePolyline();
                    }
                } else if (c_city && c_city != 'CN') {
                    if (!$thismap.isDirection) {
                        s.place_search = null;
                        $thismap.input.place_search.value = '';
                        $thismap.setCenterByAddress();
                    }
                } else if (s.place_search) {
                    if (!$thismap.isDirection) {
                        //console.log('place_search');
                        $thismap.enableSetCenter = false;
                        var place = $thismap.geocodeaddress(s.place_search);
                    }
                } else {
                    if (!$thismap.isDirection) {
                        $thismap.enableSetCenter = true;
                        $thismap.boundsChangeCallBack();
                    }
                }
                loaded = true;
            });

            $thismap.enableSetCenter = true;

            return loaded;
        };

        this.geocodeaddress = function (address) {
            //var address = this.input.place_search.value;
            $thismap.geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    //$thismap.map.setCenter(results[0].geometry.location);
                    $thismap.searchByLocation(results[0]);
                    return results[0]
                } else {
                    return false;
                }
            });
        }

        this.setCenterByAddress = function (address) {
            //var address = this.input.place_search.value;
            if (!address) {
                var adrAr = []
                if (c_ward != null && c_ward != undefined && c_ward != "CN") {
                    adrAr.push($('#ward option:selected').text())
                } else adrAr.push('CN');
                if (c_district != null && c_district != undefined && c_district != "CN") {
                    adrAr.push($("#district option:selected").text())
                } else adrAr.push('CN');
                if (c_city != null && c_city != undefined && c_city != "CN") {
                    adrAr.push($('#city option:selected').text())
                } else adrAr.push('CN');
                adrAr.push('Vietnam');
                address = adrAr.join(', ');
            }
            console.log(address);
            $thismap.geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    if (c_city && c_city != 'CN') {
                        $thismap.map.setCenter(results[0].geometry.location);
                        $thismap.drawBoundary(
                            adrAr[2],
                            adrAr[1],
                            adrAr[0]
                        );
                        return results[0]
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
        }

        this.findPointByBounds = function () {
            if (this.callBackFindBound) {
                this.callBackFindBound()
                //this.clearPoint();
            }
        }

        this.callBackFindBound = function () {}

        this.drawBoundary = function (c, d, w) {
            if (d) d = locdau(d);
            else d = 'CN';
            c = locdau(c);
            if (c == 'Hà Nọi' || c == 'Hanoi') c = 'Ha Noi';

            var pData = {
                distric: d,
                province: c
            };
            console.log(pData);
            /*var formData = new FormData($('#place_search_form')[0]);
            formData.append('distric', d);
            formData.append('province', c);
            $thismap.input.district.value = d;*/
            //$thismap.input.city.value = c;
            $.ajax({
                url: API_URL+'/user/distric/',
                type: 'post',
                data: pData,
                /*data: formData,
                processData: false,
                contentType: false,*/
                success: function (response) {
                    console.log(response);
                    data = response.message[0].outerBoundaryIs;
                    if (data) {
                        list = data.split("\n");
                        console.log(list);
                        var latlnglist = [];
                        var points = [];
                        $.each(list, function (i, v) {
                            if (v.indexOf(',') > -1) {
                                v = v.split(',');
                                latlnglist.push(new google.maps.LatLng(v[1], v[0]));
                                points.push(v[1] + ':' + v[0]);
                            }
                        });
                        $thismap.listLatlgn = latlnglist;
                        $thismap.input.points.value = points.join(',');
                        $thismap.drawPolyline(latlnglist, false);
                        $thismap.beginDrawButton.hide();
                        $thismap.deleteShapeButton.show();
                        $thismap.findPoint($thismap.polyline);
                        productControlerObj.ChangeUrlForNewContext();
                    } else { // find by bounds
                        $thismap.boundsChangeCallBack();
                    }
                },
                error: function(a, b, c) {
                    console.log(a)
                }
            })
        }

        this.searchByLocation = function (place) {
            if (place) {
                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }
                if (place.geometry.viewport) {
                    $thismap.map.fitBounds(place.geometry.viewport);
                } else {
                    $thismap.map.setCenter(place.geometry.location);
                    //$thismap.map.setZoom(zoom_moderate);
                }
                //$thismap.currentPosMarker.setPosition(place.geometry.location);
                var lv = place.address_components.length;
                var s_city = s_district = s_ward = null;

                console.log(place.address_components);

                s_city = place.address_components[lv-2].long_name;
                if (place.address_components[lv-3]) s_district = place.address_components[lv-3].long_name;
                if (place.address_components[lv-4]) s_ward = place.address_components[lv-4].long_name;
                console.log(place);
                this.drawBoundary(s_city, s_district, s_ward);
                this.searchtype = 0;
                //if ($thismap.listLatlgn) productControlerObj._SearchAction();
                //else $thismap.boundsChangeCallBack();
                //$thismap.markerPoint.setPosition(place.geometry.location);
                //$thismap.markerPoint.setVisible(true);
                //console.log(place);
            }
        }

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
            //google.maps.event.addListener($thismap.map, 'bounds_changed', function () {
                var oldbounds = $thismap.bounds;
                $thismap.bounds = $thismap.map.getBounds();
                if (!$thismap.listLatlgn && (
                      oldbounds == null ||
                      (
                          $thismap.bounds.f.f != oldbounds.f.f &&
                          $thismap.bounds.f.b != oldbounds.f.b &&
                          $thismap.bounds.b.b != oldbounds.b.b &&
                          $thismap.bounds.b.f != oldbounds.b.f
                      )
                  ) ) {
                    $thismap.findPointByBounds();
                }
                /*
                if ($thismap.isMapResize) {
                    if ($thismap.currentPID) {
                        var key = $thismap.findMarkerKey($thismap.currentPID);
                        console.log(key);
                        if (key) $thismap.map.setCenter($thismap.markers[key].position);
                    } else {
                        $thismap.map.setCenter($thismap.centerPos);
                    }
                    $thismap.isMapResize = false;
                }*/
            //})
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
            if (isMobile) $('.map-item-info-board-close').click();
            else productControlerObj.closePopup();
            b.data.clearPoints();
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

            this.input.points.value = '';
            this.input.place_search.value = '';
            this.input.city.value = 'CN';
            this.input.district.value = 'CN';
            this.input.ward.value = 'CN';
            this.input.street.value = 'CN';

            $thismap.isDrawing = false;
            this.isMapIdle = false;

            this.callBackClearPointEvent(true);

            //this.clearPoint();
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

                this.drawPolyline(b);
                $thismap.findPoint($thismap.polyline);
                this.catchChangePolyline();

                //this.btnUpdateMapIdleResult.hide();
            }
            this.listLatlgn = null
        };

        this.drawPolyline = function (b, isEditable = true) {
            if ($thismap.polyline) $thismap.polyline.setMap(null);
            $thismap.polyline = new google.maps.Polygon({
                path: b,
                strokeColor: '#00a65a',
                strokeWeight: 2,
                editable: isEditable,
                fillColor: "#5de0a4",
                fillOpacity: 0.25
            });
            $thismap.polyline.setMap($thismap.map);
            //console.log($thismap.polyline);
        }

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
            //this.clearPoint();
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
        this.clearPoint = function(isInit = false) {
            if (this.infoWindow) this.infoWindow.close();
            $('.map-item-info-board').hide();

            this.ClearUtilitiesAroundPoint();

            /*if (this.markers != undefined) {
                for (var t = 0; t < this.markers.length; t++) {
                    this.markers[t].setMap(null);
                }
                this.markers = []
            }*/
            //console.log('cleared!');
            if (this.markerCluster != null) {
                this.markerCluster.clearMarkers()
            }
            if (this.oms != null) {
                this.oms.clearMarkers();
            }
            //if (!isInit) this.currentPID = null;
        };

        this.clearPoints = function(isInit = false) {
            if (this.infoWindow) this.infoWindow.close();
            $('.map-item-info-board').hide();

            this.ClearUtilitiesAroundPoint();

            if (this.markers != undefined) {
                for (var t = 0; t < this.markers.length; t++) {
                    this.markers[t].setMap(null);
                }
                this.markers = []
            }
        };

        this.callBackClearPointEvent = function() {};

        this.showMap = function(a, b) {
            this.data = [];
            //if (!this.isDrawing) this.map.setZoom(zoom_moderate);
            for (var i = 0; i < a.node.length; i++) {
                if (a.node[i] && this.isInPolyline(a.node[i].latitude, a.node[i].longitude)) {
                    if (a.node[i].avatar == null || a.node[i].avatar == '') a.node[i].avatar = MAIN_URL+'/assets/img/noimage.png';
                    a.node[i].isProject = false;

                    a.node[i].typeid = parseInt(a.node[i].type.split('typereal')[1]);
                    if (a.node[i].typeid < 11) a.node[i].sellLabel = ' sell';
                    else a.node[i].sellLabel = ' rent';

                    a.node[i].exCls = a.node[i].sellLabel +
                    (a.node[i].typeid > 6 ? ' big' : '');

                    this.data.push(a.node[i])
                }
            }
            for (var i = 0; i < a.project.length; i++) {
                if (a.project[i] && this.isInPolyline(a.project[i].latitude, a.project[i].longitude)) {
                    if (a.project[i].avatar == null || a.project[i].avatar == '') a.project[i].avatar = MAIN_URL+'/assets/img/noimage.png';

                    a.project[i].typeid = null;
                    a.project[i].sellLabel = '';

                    a.project[i].exCls = " project" +
                    (a.project[i].typeid > 6 ? ' big' : '');

                    a.project[i].title = a.project[i].name;
                    a.project[i].isProject = true;

                    this.data.push(a.project[i])
                }
            }

            //this.mergeData(this.data, b);

            this.showPoint(this.data, b);
            this.showList(this.data);
            return this.data
        };

        this.showList = function (d) {
            var f = productControlerObj;
            f.mapResults.html('');
            f.mapResultsProject.html('');
            $.each(d, function (i, v) {
                /*var adr = [];
                if (v.hem) adr.push(v.hem);
                if (v.ngach) adr.push(v.ngach);
                if (v.ngo) adr.push(v.ngo);
                if (v.duong) adr.push(v.duong);
                if (v.huyen) adr.push(v.huyen);
                if (v.diachi) adr.push(v.diachi);
                v.address = adr.join(', ');*/
                if (v.isProject) v.price = v.pricefrom;
                if (v.price < 1) { // trăm triệu
                    v.priceTxt = v.price*100+'tr';
                } else v.priceTxt = v.price+' tỷ';
                k = '<div attr-id="'+v.id+'" attr-marker-id="'+i+'" class="map-result-one">';
                k += '<div class="map-result-one-left">';
                k += '<img class="map-result-one-thumb" src="'+v.avatar+'">';
                k += '<div class="map-result-one-price"><i class="fa fa-dollar"></i> <span>'+v.priceTxt+'</span></div>';
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
                if (v.isProject) f.mapResultsProject.append(k);
                else f.mapResults.append(k);
            });
            if (!f.mapResults.find('.map-result-one').length) {
                f.mapResults.html('<div class="empty_results">Không có kết quả.</div>')
            }
            if (!f.mapResultsProject.find('.map-result-one').length) {
                f.mapResultsProject.html('<div class="empty_results">Không có kết quả.</div>')
            }
            $('.map-result-one').each(function () {
                if (!isMobile) {
                    $(this).mouseenter(function () {
                        $thismap.mouseHover($(this).attr('attr-marker-id'));
                    });
                    $(this).mouseleave(function () {
                        $thismap.mouseOut($(this).attr('attr-marker-id'));
                    });
                }
                $(this).click(function () {
                    $thismap.showInfoWindow($(this).attr('attr-id'));
                    if (isMobile) {
                        toggleFilterBoard('close')
                    }
                    f.ChangeUrlForNewContext();
                })
            });
        };

        this.showPoint = function(a, b) {
            console.log('showPoint called');
            //console.log(a);
            this.clearPoint();

            var newData = a;

            for (var j = 0; j < $thismap.markers.length; j++) {
                var found = false;
                // check if this marker id is in data
                var oneMarker = $thismap.markers[j];
                for (var k = 0; k < a.length; k++) {
                    if (oneMarker.id == a[k].id) {
                        // if found
                        found = true;
                    }
                }
                if (!found) {
                    // if not in data array, then remove it from markers list and unset from map
                    oneMarker.setVisible(false);
                    //$thismap.markers[j] = null;
                }
            }

            var i = 0;
            while (i < a.length) {
                var place = a[i];
                place.typeTxt = typeRealEstate[place.type];
                if (place.isProject) place.price = place.pricefrom;
                if (place.price < 1) { // trăm triệu
                    place.priceTxt = place.price*100+'tr';
                } else place.priceTxt = place.price+' tỷ';

                //console.log(place.id+' ~ '+$thismap.findMarker(place.id));

                //console.log(place.id+' ~~ '+$thismap.findMarkerKey(place.id));
                var markerkey = $thismap.findMarkerKey(place.id);
                if (markerkey == null) {
                    var oneMarker = new MarkerWithLabel({
                        map: $thismap.map,
                        position: new google.maps.LatLng(place.latitude, place.longitude),
                        //icon: nodeMarker[place.type].default,
                        icon: nodeMarker.empty,
                        labelContent: '<a href="javascript:productControlerObj.ProductMap.showInfoWindow(\''+place.id+'\')" attr-marker-id="'+place.id+'"><span class="marker-type type-'+typeIcon[place.type]+'"><i class="icoo-'+typeIcon[place.type]+'"></i></span><span class="marker-label-content">'+place.priceTxt+'</span></a>',
                        labelAnchor: labelOrigin,
                        labelClass: "marker-label"+($thismap.currentPID == place.id ? " active" : "") + place.exCls, // your desired CSS class
                        labelInBackground: true,
                    });
                    oneMarker.id = place.id;
                    //oneMarker.setMap($thismap.map);

                    oneMarker.isProject = place.isProject;

                    $thismap.markers.push(oneMarker);

                    oneMarker.addListener('click', function() {
                        $thismap.showInfoWindow(this.id);
                        $thismap.input.product.value = this.id;
                        productControlerObj.ChangeUrlForNewContext();
                    });
                    oneMarker.addListener('mouseover', function() {
                        var key = $thismap.findMarkerKey(this.id);
                        $thismap.mouseHover(key, false);
                    });
                    oneMarker.addListener('mouseout', function() {
                        var key = $thismap.findMarkerKey(this.id);
                        $thismap.mouseOut(key);
                    });

                } else {
                    $thismap.markers[markerkey].setVisible(true);
                }

                i++;
            }

            /*$thismap.markers = a.map(function(location, i) {
                place.typeTxt = typeRealEstate[place.type];
                if (place.isProject) place.price = place.pricefrom;
                if (place.price < 1) { // trăm triệu
                    place.priceTxt = place.price*100+'tr';
                } else place.priceTxt = place.price+' tỷ';
                return new MarkerWithLabel({
                    position: new google.maps.LatLng(place.latitude, place.longitude),
                    //icon: nodeMarker[place.type].default,
                    icon: nodeMarker.empty,
                    labelContent: '<a href="javascript:productControlerObj.ProductMap.showInfoWindow(\''+place.id+'\')" attr-marker-id="'+place.id+'"><span class="marker-type type-'+typeIcon[place.type]+'"><i class="icoo-'+typeIcon[place.type]+'"></i></span><span class="marker-label-content">'+place.priceTxt+'</span></a>',
                    labelAnchor: labelOrigin,
                    labelClass: "marker-label"+($thismap.currentPID == place.id ? " active" : "") + (place.isProject ? " marker-label-project" : ""), // your desired CSS class
                    labelInBackground: true,
                });
            });*/

            /*$.each($thismap.markers, function (i, oneMarker) {
                //oneMarker.setMap($thismap.map);
                //$thismap.oms.addMarker(oneMarker);
                //console.log(oneMarker.id);
                theData = $thismap.findDataInfo(oneMarker.id);
                if (theData) {
                    oneMarker.isProject = theData.isProject;
                    oneMarker.addListener('click', function() {
                        $thismap.showInfoWindow(this.id);
                        $thismap.input.product.value = this.id;
                        productControlerObj.ChangeUrlForNewContext();
                    });
                    oneMarker.addListener('mouseover', function() {
                        $thismap.mouseHover(i, false);
                    });
                    oneMarker.addListener('mouseout', function() {
                        $thismap.mouseOut(i);
                    });
                }
            });*/
            //console.log($thismap.oms);

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
                this.showInfoWindow(this.currentPID, false, true);
            }

            //console.log('hide loading-layout');
            $('.loading-layout').hide();

            if (!this.currentPID || !this.isDetails) {
                $('.popup-map').hide();
            }

            /*$thismap.markerCluster = new MarkerClusterer($thismap.map, $thismap.markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                maxZoom: 13
            });*/

        };

        this.findDataInfo = function(a) {
            if (this.data != undefined && this.data.length > 0) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i] && this.data[i].id == a) {
                        //console.log(this.data[i]);
                        return this.data[i];
                    }
                }
            }
            return null;
        };
        this.findMarkerKey = function(a) {
            if (this.markers != undefined && this.markers.length > 0) {
                for (var i = 0; i < this.markers.length; i++) {
                    if (this.markers[i] && this.markers[i].id == a) {
                        return i;
                    }
                }
            }
            return null;
        };
        this.findMarker = function(a) {
            if (this.markers != undefined) {
                for (var i = 0; i < this.markers.length; i++) {
                    if (this.markers[i].id == a) {
                        return this.markers[i];
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
            //var key = this.findMarkerKey(this.currentPID);
            var key = this.currentMarkerKey;

            //h.setIcon(nodeMarker[$thismap.data[key].type].select);
            //h.labelClass = 'marker-label active';
            //h.label.setStyles();
            //this.activeMarker(key);

            //h.setZIndex(300);

            e = parseInt(e);
            this.utilArea = e;
            this.ClearUtilitiesAroundPoint();

            if (this.circle == null) this.circle = new google.maps.Circle({
                center: new google.maps.LatLng(c, d),
                radius: e,
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1
                //fillOpacity: 0.4
            });
            else this.circle.setOptions({
                center: new google.maps.LatLng(c, d),
                radius: e
            });
            this.circle.setMap(this.map);

            if (this.infoUtiWindow != null) this.infoUtiWindow.setMap(null);

            this.dataUtilities = $thismap.formatUtilities(f, h.position, e);

            $('label .uti-total', $(g)).remove();
            $('#uti_selected').html();
            var ut = [];
            $.each($('input:checked', $(g)), function() {
                var a = parseInt($(this).val());
                var b = $thismap.getTotalUtility($thismap.dataUtilities, a);
                if ($(this).closest('label').find('.uti-total').length > 0) {
                    $(this).closest('label').find('.uti-total').html('(' + b + ')')
                } else {
                    ut.push($(this).closest('label').text());
                    $(this).closest('label').append(' <span class="uti-total">(' + b + ')</span>');
                }
                $('#uti_selected').html(ut.join(', '))
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

                        $thismap.infoUtiWindow.setOptions({
                            position: oneMarkerUtility.position,
                            maxWidth: 250,
                            content: k
                        });
                        $thismap.infoUtiWindow.open($thismap.map, oneMarkerUtility);
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
            if (this.infoUtiWindow != null) this.infoUtiWindow.setMap(null);

            //if (!$thismap.infoWindow) $thismap.closeInfoWindowCallBack(a);
            /*if (isMobile && $('.map-item-info-board').is(':hidden')) $thismap.closeInfoWindowCallBack(a);
            if (!isMobile && $('.popup-map').is(':hidden')) $thismap.closeInfoWindowCallBack(a);*/

            /*if (a == undefined || a == true) {
                this.ClearUtilitiesAroundCallback()
            }*/

            this.ClearUtilitiesAroundCallback()
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
            if (this.currentPID) {
                $('#overlapNodes').hide();
                var key = this.findMarkerKey(this.currentPID);
                //console.log(this.currentPID+'~'+key+'~'+$thismap.data[key]);
                //h.setIcon(nodeMarker[$thismap.data[key].type].default);
                //h.labelClass = 'marker-label';
                //h.label.setStyles();
                var theData = $thismap.findDataInfo(key);
                this.deactiveMarker(key, theData);

                this.input.product.value = this.currentPID = '';
                this.currentMarkerKey = null;

                //this.map.setZoom(zoom_moderate);
                //this.map.setCenter(this.centerPos);

                this.input.isShowUtil.value = 0;
                this.isShowUtil = false;
                this.ClearUtilitiesAroundPoint();
                productControlerObj.ChangeUrlForNewContext();
            }
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

        this.mouseHover = function (k, setCenter = true) {
            //console.log(this.markers);
            //console.log(k);
            var v = this.markers[k];
            if (v) {
                nodeID = v.id;
                theData = $thismap.findDataInfo(nodeID);
                //v.setIcon(nodeMarker[$thismap.data[$thismap.currentMarkerKey].type].hover);
                //$thismap.showInfoTipWindow(v, $('.map-result-one[attr-marker-id="'+i+'"]').html());
                var txt = (theData.isProject ? 'Dự án' : typeRealEstate[theData.type]);
                //$thismap.infoWindow.close();
                //$thismap.showInfoTipWindow(v,txt);
                $thismap.showInfoTipWindow(v, $('.map-result-one[attr-id="'+nodeID+'"]').html());
                if (nodeID != $thismap.currentPID) {
                    v.labelClass = 'marker-label hover'+theData.exCls;
                    v.label.setStyles();
                }
                //$thismap.activeMarker(k, theData);
                //if (setCenter) $thismap.map.setCenter(v.position);
                /*
                if ($thismap.currentPID == i) $thismap.infoWindow.close();
                if ($thismap.currentPID == i) $thismap.infoWindow.open($thismap.map, v); */
            }
        }
        this.mouseOut = function (k) {
            this.infoTipWindow.close();
            if (this.markers) {
                nodeID = $thismap.markers[k].id;
                theData = $thismap.findDataInfo(nodeID);

                //$thismap.markers[k].setIcon(nodeMarker[theData.type].default);
                if (k && (!$thismap.currentPID || $thismap.currentMarkerKey != k) ) {
                    //console.log(theData);
                    //$thismap.markers[k].labelClass = 'marker-label'+theData.exCls;
                    //$thismap.markers[k].label.setStyles();
                    $thismap.deactiveMarker(k, theData);
                }

                if ($thismap.currentPID && $thismap.currentMarkerKey) {
                    //$thismap.currentMarkerKey = this.findMarkerKey($thismap.currentPID);
                    //$thismap.map.setCenter($thismap.markers[$thismap.currentMarkerKey].position);
                    if ($thismap.currentMarkerKey == k) {
                        //$thismap.markers[$thismap.currentMarkerKey].setIcon(nodeMarker[$thismap.data[$thismap.currentMarkerKey].type].select);
                        $thismap.markers[$thismap.currentMarkerKey].labelClass = 'marker-label active'+theData.exCls;
                        $thismap.markers[$thismap.currentMarkerKey].label.setStyles();

                        /*if (!$thismap.isShowUtil) {
                            if (!$thismap.infoWindow) {
                                $thismap.infoWindow.open($thismap.map, $thismap.markers[$thismap.currentMarkerKey]);
                            }
                        }*/
                    }
                }
            }
        }

        this.showOverlapNodes = function (lat, lng) {
            $('#overlapNodes').html('');
            var k = '';
            var count = 0;
            $.each($thismap.data, function (i, v) {
                if (v.latitude == lat && v.longitude == lng) {
                    if (v.isProject) v.price = v.pricefrom;
                    if (v.price < 1) { // trăm triệu
                        v.priceTxt = v.price*100+'tr';
                    } else v.priceTxt = v.price+' tỷ';
                    if (!isMobile || v.id != $thismap.currentPID) {
                        count++;
                        k += '<div attr-id="'+v.id+'" attr-marker-id="'+i+'" class="map-result-one">';
                        k += '<div class="map-result-one-left">';
                        k += '<img class="map-result-one-thumb" src="'+v.avatar+'">';
                        k += '<div class="map-result-one-price"><i class="fa fa-dollar"></i> <span>'+v.priceTxt+'</span></div>';
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
                    }
                }
            });
            if (isMobile) $('#overlapNodes').remove();
            if ( (isMobile && count > 0) || (!isMobile && count > 1) ) {
                if (isMobile && count > 0) {
                    $('#mapInfoBoard').append('<div id="overlapNodes" style="display:block">'+k+'</div>');
                } else {
                    $('#overlapNodes').show().append(k);
                }
                console.log('showOverlapNodes');
                $('#overlapNodes .map-result-one').click(function () {
                    $thismap.showInfoWindow($(this).attr('attr-id'));
                    $('#mapInfoBoard').animate({
                        scrollTop: 0
                    });
                    productControlerObj.ChangeUrlForNewContext();
                })
            }
        }

        this.showInfoWindow = function(d, setCenter = true, isInit = false) {
            /*if (!isInit) {
                this.ClearUtilitiesAroundPoint();
                this.isShowUtil = false;
                this.input.isShowUtil.value = 0;
                productControlerObj.ChangeUrlForNewContext();
            }*/
            var data = this.currentProduct;
            var key = null;

            var runSet = false;
            if (!isInit && d != this.currentPID) runSet = true;

            if (this.currentPID != null && this.currentPID != undefined && d != this.currentPID) {
                var oldMarker = this.findMarker(this.currentPID);
                var oldMarkerKey = this.findMarkerKey(this.currentPID);
                var oldData = this.findDataInfo(this.currentPID);
                if (oldData && oldMarkerKey != null && oldMarkerKey != undefined) {
                    //oldMarker.labelClass = 'marker-label'+oldData.exCls;
                    //oldMarker.label.setStyles();
                    this.deactiveMarker(oldMarkerKey, oldData);
                }
            }


            if (d == this.currentPID && data) {
                key = this.findMarkerKey(this.currentPID);
            }
            else if (d != this.currentPID || !data) {

                this.currentPID = d;
                key = this.findMarkerKey(this.currentPID);
                this.currentProduct = null;
                //console.log(this.currentPID+' ~~ '+key);
                data = this.findDataInfo(this.currentPID);
                //this.isProject = data.isProject;
            }

            /*console.log(this.currentPID);
            console.log(this.markers);
            console.log(key);
            console.log(data);*/

            this.currentMarkerKey = key;
            data.isProject = (data.pricefrom > 0 ? 1 : 0);
            this.isProject = data.isProject;
            //console.log('this.isProject: '+this.isProject);

            this.input.product.value = this.currentPID;

            if (this.infoTipWindow) this.infoTipWindow.close();
            if (this.infoWindow) this.infoWindow.close();

            if (key != null && data) {
                var h = this.markers[key];
                if (runSet) {
                    if (!this.isShowUtil && this.map.getZoom() < zoom_markerView) {
                        this.map.setZoom(zoom_markerView);
                    }
                    else {
                        this.input.zoom.value = this.map.getZoom();
                    }
                }

                console.log(this.currentMarkerKey);
                if (isInit) {
                    google.maps.event.addListenerOnce($thismap.map, "projection_changed", function() {
                        this.activeMarker(this.currentMarkerKey, data);
                    })
                } else {
                    this.activeMarker(this.currentMarkerKey, data);
                }

                //console.log(this.isProject);
                productControlerObj.ChangeUrlForNewContext();

                if (setCenter) $thismap.map.setCenter(h.position);

                //if (isInit) {
                    /*if (this.isDetails && !isInit) {
                        productControlerObj.ShowDetails(this.currentPID, this.isProject);
                    } else */
                    if (this.isShowUtil) {
                        productControlerObj.ShowMoreInfo(h.position.lat(), h.position.lng());
                    }
                //}

                //console.log(data);

                //if (this.isProject) this.contentInfoWindowProject(h, key, data, isInit);
                //else this.contentInfoWindowNode(h, key, data, isInit);
                //this.showInfoWindowNode(h, key, data, isInit);


                /*$('.map-item-view-utilities').attr('href', 'javascript:productControlerObj.ShowMoreInfo(' + data.latitude + ',' + data.longitude + ')');
                /*$('.map-item-gotoview').attr('href', 'javascript:productControlerObj.ShowDetails("'+data.id+'", '+(data.isProject ? 1 : 0)+')');
                if (data.isProject) {
                    $('.map-item-info-title').wrapInner('<a href="javascript:productControlerObj.ShowDetails("'+data.id+'",1)"></a>')
                } else {
                    $('.map-item-info-address').wrapInner('<a href="javascript:productControlerObj.ShowDetails("'+data.id+'",0)"></a>')
                }*/
                $('.map-item-gotoview').hide()

                if (isMobile) {
                    $('.map-item-info-board').show().addClass('mobile');
                    $('.map-item-info-board-close').show().click(function () {
                        $('.map-item-info-board').hide();
                        $thismap.closeInfoWindowCallBack(h);
                    })
                } else {
                    $('.map-item-info-board-close').hide();
                    //console.log(isInit);
                    //if (!isInit || !$thismap.isShowUtil) {
                    /*if (!$thismap.isShowUtil) {
                        $thismap.infoWindow.setOptions({
                            position: h.position,
                            maxWidth: 280,
                            content: $('.map-item-info-board').html()
                        });
                        $thismap.infoWindow.open($thismap.map, h);
                    }

                    google.maps.event.addListener($thismap.infoWindow, 'closeclick', function () {
                        if (!$thismap.isShowUtil) $thismap.closeInfoWindowCallBack(h);
                    });*/

                    $thismap.isDetails = 1;

                    productControlerObj.ShowDetails(this.currentPID, this.isProject);
                }

                this.showOverlapNodes(data.latitude, data.longitude);

                /*google.maps.event.addListenerOnce($thismap.map, "projection_changed", function() {
                    h.labelClass = 'marker-label active';
                    h.label.setStyles();
                })*/

                if ($thismap.enableSetCenter) {
                    //this.map.setCenter(h.position);
                }
            }
        }

        this.activeMarker = function (key, data) {
            //$('#map .gm-style > div:first-child > div:nth-child(4) > div:first-child').children('div').removeClass('active');
            //$('#map .gm-style > div:first-child > div:nth-child(4) > div:first-child').children('div:nth('+key+')').addClass('active');
            //console.log(data);
            if (key != null && key != undefined) {
                console.log("projection:"+$thismap.map.getProjection());
                this.markers[key].labelClass = 'marker-label active'+data.exCls;
                this.markers[key].label.setStyles();
            }
        }

        this.deactiveMarker = function (key, data) {
            if (key != null && key != undefined) {
                //google.maps.event.addListenerOnce($thismap.map, "projection_changed", function() {
                    //console.log("projection:"+$thismap.map.getProjection());
                    this.markers[key].labelClass = 'marker-label'+data.exCls.replace(' active', '');
                    this.markers[key].label.setStyles();
                //});
            } else {
                $('#map .gm-style > div:first-child > div:nth-child(4) > div:first-child').children('div').removeClass('active');
            }
        }

        this.contentInfoWindowProject = function (h, key, data, isInit = false) {
            $('.map-item-info-title').html(data.title).show();
            $('.map-item-info-price span').html(data.priceTxt);
            $('.map-item-info-type').html(typeRealEstate[data.type]);
            $('.map-item-info-address').html(data.address);
            //$('.map-item-info-des').html(data.details);
            $('.map-item-info-thumb').attr('src', data.avatar);
            $('.map-item-info-more > div:not(:first-child)').hide();
        }

        this.contentInfoWindowNode = function (h, key, data, isInit = false) {
            $('.map-item-info-title').html(data.title).hide();
            $('.map-item-info-more > div').show();
            $('.map-item-info-price span').html(data.priceTxt);
            $('.map-item-info-type').html(typeRealEstate[data.type]);
            $('.map-item-info-contact_phone').html(data.dienthoai);
            $('.map-item-info-contact_name').html(data.tenlienhe);
            $('.map-item-info-address').html(data.address);
            $('.map-item-info-des').html(data.details);
            $('.map-item-info-thumb').attr('src', data.avatar);
            $('.map-item-info-bed').html(data.sophongngu);
            $('.map-item-info-huong').html(data.huong);
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
            //a.data.Map.map.setZoom(zoom_markerView);

            a.data.Map.input.isShowUtil.value = 0;
            a.data.Map.isShowUtil = false;
            productControlerObj.ChangeUrlForNewContext();

            a.data.Map.ClearUtilitiesAroundPoint(false);
            //a.data.Map.showInfoWindow()
        });
        $(this).find('select, input').bind('change', this, function(a) {
            if ($(this).val().length > 0) {
                if ($(this).attr('checked') == undefined) {
                    $(this).closest('label').find('.uti-total').remove()
                }
                a.data.SearchAction()
            } else {
                $(this).closest('label').find('.uti-total').remove();
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
            if (!this.utilArea) this.utilArea = 500;
            console.log('ResetRadius '+this.utilArea);
            $('#cbbRadius').val(this.utilArea)
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
            //this.Map.map.setCenter(new google.maps.LatLng(i, j));

            var k = {};
            k.radius = f;
            k.types = g;
            k.lat = this.Lat;
            k.lon = this.Lon;
            k.m = 'pddetail';
            k.v = new Date().getTime();
            k.latadd = 0.009*k.radius/1000;

            var postData = {
                minLat: k.lat - k.latadd,
                maxLat: k.lat + k.latadd,
                minLng: k.lon - (k.latadd / Math.cos(k.lat*Math.PI/180)),
                maxLng: k.lon + (k.latadd / Math.cos(k.lat*Math.PI/180))
            };
            $.ajax({
                //url: API_URL+'/user/servicenodes/',
                url: API_URL+'/search/searchservicebound/',
                type: 'post',
                data: postData,
                success: function(a, b, c) {
                    //console.log(a);
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
                    console.log(JSON.stringify(postData));
                    console.log(a)
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
    this.mapResults = $('#map_results_node');
    this.mapResultsProject = $('#map_results_project');

    this.ProductMap = $('#map').ProductMap('begindraw', 'delshape', 'fullscreen', 'exitfullscreen', mapContext);

    // Init utility for product detail in project map type
    this.utilityTool = $('.controls-utility').UtilityAroundToolbox({ map: this.ProductMap });

    this.ProductMap.callBackMapChange = function(a) {
        i.ChangeUrlForNewContext();
        //i._SearchAction(JSON.parse(JSON.stringify(i.formSearch.serializeArray())));
    };
    this.ProductMap.callBackClearPointEvent = function(a) {
        if (!i.ProductMap.isDrawing) {
            i._SearchAction();
        }
        i.ChangeUrlForNewContext();
    };
    this.ProductMap.callBackDrawEvent = function(a, b, c, d, e, f, g) {
        i.callBackDrawEvent(a, b, c, d, e, f, g);
    };

    this.ProductMap.callBackFindBound = function () {
        i.callBackFindBound();
    }

    this.ProductMap.initialize();

    $('#uti_selected').click(function () {
        $('.utility-body').toggle();
    })

    $('.close-direction-board').click(function () {
        i.closeDirectionBoard(true)
    })

    this.SearchProjectName();

    var context = h.context;
    if (!context.city && !context.currentPID) this.showCitySearch();

    $('[name="type_action"]').change(function () {
        var a = $(this).val();
        $('.type_bds').hide();
        $('.type_bds#type'+a).show();
        $('#type').val('');
        $('#type'+a).val('CN');
    });

    $('.cancel-filter').click(function () {
        $(this).hide();
        $('.btn-filter').removeClass('active').html('<i class="fa fa-filter"></i> Lọc');
        console.log('cancel-filter');
        i._SearchAction(-1);
        return false;
    });

    this.formSearch.submit(function () {
        var a = $('[name="type_action"]').val();
        $('#type').val($('#type'+a).val());
        i.ProductMap.currentPID = i.ProductMap.input.product.value = "";
        i.ProductMap.currentMarkerKey = i.ProductMap.findMarkerKey(i.ProductMap.currentPID);
        i.ProductMap.searchtype = ($('.map_search_select li.active').attr('attr-type') == 'node' ? 1 : 2);
        i.ProductMap.setCenterByAddress();
        i._SearchAction(1);
        i.ChangeUrlForNewContext();
        return false
    });
    this.catchInputChange();
};


ProductSearchControler.prototype.closeDirectionBoard = function (search = false) {
    $('.v-place-v-direction').hide();
    this.directionsDisplay.setMap(null);
    if (search) this._SearchAction(-2);
}

ProductSearchControler.prototype.genPopup = function () {
    var i = f = this;
    var currentProduct = i.ProductMap.currentProduct;

    /*var k = {
        overviewMapControl: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl: false,
        zoom: 15
    };
    i.map = new google.maps.Map(document.getElementById('map_direction'), k);
    var styles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    i.map.mapTypes.set('styled_map', styledMap);
    i.map.setMapTypeId('styled_map');

    i.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('travelMode'));*/

    i.map = i.ProductMap.map;

    //console.log('genPopup called');

    i.productLatLng = new google.maps.LatLng(currentProduct.latitude, currentProduct.longitude);

    /*
    f.infoWindow = new google.maps.InfoWindow();
	//var service = new google.maps.places.PlacesService(map);

    var marker = new google.maps.Marker({
        map: i.map,
        position: i.productLatLng
    });
    i.map.setCenter(i.productLatLng);
    google.maps.event.addListener(marker, 'click', function() {
        f.infoWindow.setContent('<div><strong>' + currentProduct.address + '</div>');
        f.infoWindow.open(i.map, this);
    });*/

    /*$('.v-place-details-more, .v-place-details').click(function () {
        if ($('.v-place-details').is('.all')) {
            $('.v-place-details-more').html('Xem thêm');
            $('.v-place-details').removeClass('all');
        }
        else {
            $('.v-place-details-more').html('Rút gọn');
            $('.v-place-details').addClass('all');
        }
        return false
    })*/
}

ProductSearchControler.prototype.getDirection = function () {
    var f = this;
    var map = f.map;
	var markerArray = [];
	// Instantiate a directions service.

    f.map.setZoom(15);

    /*f.marker = new google.maps.Marker({
        map: map
    });*/
    // Instantiate an info window to hold step text.
    f.stepDisplay = new google.maps.InfoWindow;

    $('#end').val(f.productLatLng);
    $('#end_fake').val(f.ProductMap.currentProduct.title+' - '+f.ProductMap.currentProduct.address);
	f.directionsService = new google.maps.DirectionsService;
	var geocoder = new google.maps.Geocoder();

    $('#directions-guide').height($('.v-place-v-direction').height()-$('.travelMode_select').height()-30-$('.start_end_points').height()-30);
    f.directionsDisplay = new google.maps.DirectionsRenderer({map: map});
    f.directionsDisplay.setPanel(document.getElementById('directions-guide'));

    var pos = f.ProductMap.myPos;
    if (pos) {
        map.setCenter(pos);
        //f.marker.setPosition(pos);

        geocoder.geocode({
            'location': pos
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#start').val(results[0].formatted_address);

                    var onChangeHandler = function () {
                        f.calculateAndDisplayRoute(markerArray, map);
                    };
                    //document.getElementById('travelMode').addEventListener('change', onChangeHandler);
                    $('.travelMode_select>div').click(function () {
                        $('#travelMode').val($(this).attr('id'));
                        $('.travelMode_one').removeClass('active');
                        $(this).addClass('active');
                        onChangeHandler();
                    });
                    $('#start').change(function () {
                        onChangeHandler();
                    });
                    f.calculateAndDisplayRoute(markerArray, map);
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
	/*if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map.setCenter(pos);
			f.marker.setPosition(pos);

			geocoder.geocode({
				'location': pos
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						$('#start').val(results[0].formatted_address);

            			var onChangeHandler = function () {
            				f.calculateAndDisplayRoute(markerArray, map);
            			};
            			//document.getElementById('travelMode').addEventListener('change', onChangeHandler);
                        $('.travelMode_select>div').click(function () {
                            $('#travelMode').val($(this).attr('id'));
                            $('.travelMode_one').removeClass('active');
                            $(this).addClass('active');
                            onChangeHandler();
                        })
						f.calculateAndDisplayRoute(markerArray, map);
					} else {
						alert('No results found');
					}
				} else {
					alert('Geocoder failed due to: ' + status);
				}
			});

		}, function() {
			f.handleLocationError(true, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		f.handleLocationError(false, map.getCenter());
	}*/
}

ProductSearchControler.prototype.calculateAndDisplayRoute = function (markerArray, map) {
    var f = this;
	// First, remove any existing markers from the map.
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setMap(null);
	}

	// Retrieve the start and end locations and create a DirectionsRequest using
	// {travelMode} directions.
    //console.log(document.getElementById('start').value);
    //console.log(document.getElementById('end').value);
	f.directionsService.route({
		origin: document.getElementById('start').value.replace(/^\((.+)\)$/,"$1"),
		destination: document.getElementById('end').value.replace(/^\((.+)\)$/,"$1"),
		travelMode: document.getElementById('travelMode').value // DRIVING | BICYCLING | TRANSIT | WALKING
	}, function(response, status) {
		// Route the directions and pass the response to a function to create
		// markers for each step.
		if (status === 'OK') {
			document.getElementById('warnings-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
			f.directionsDisplay.setDirections(response);
			f.showSteps(response, markerArray, map);
			var distance = response.routes[0].legs[0].distance.text;
			var time = response.routes[0].legs[0].duration.text;
			$('.box-search-one-distance').text(distance);
			$('.box-search-one-time').text(time);
			$('.box-search-one-route').show();
            //f.map.setZoom(15);
		} else {
			console.log('Directions request failed due to ' + status);
		}
	});
}

ProductSearchControler.prototype.showSteps = function (directionResult, markerArray, map) {
    var f = this;
	// For each step, place a marker, and add the text to the marker's infowindow.
	// Also attach the marker to an array so we can keep track of it and remove it
	// when calculating new routes.
	var myRoute = directionResult.routes[0].legs[0];
	for (var i = 0; i < myRoute.steps.length; i++) {
		f.marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
		//marker.setMap(f.map);
		//marker.setPosition(myRoute.steps[i].start_location);
		f.attachInstructionText(myRoute.steps[i].instructions, map);
	}
}

ProductSearchControler.prototype.attachInstructionText = function (text, map) {
    var f = this;
	google.maps.event.addListener(f.marker, 'click', function() {
		// Open an info window when the marker is clicked on, containing the text
		// of the step.
		f.stepDisplay.setContent(text);
		f.stepDisplay.open(map, marker);
	});
}

ProductSearchControler.prototype.handleLocationError = function (browserHasGeolocation, pos) {
    var f = this;
	f.infoWindow.setPosition(pos);
	f.infoWindow.setContent(browserHasGeolocation ?
				'Error: The Geolocation service failed.' :
				'Error: Your browser doesn\'t support geolocation.'
		);
	f.infoWindow.open(map);
}


ProductSearchControler.prototype.SearchProjectName = function () {
    $('#tenduan').keydown(function () {
		k = $(this).attr('name').split('town')[1];
		$dr = $('#tenduan').next('.ville-dropdown');
		loading = '<div class="spinner loading-sending"><div></div><div></div><div></div></div>';
		if (!$dr.length) $('#tenduan').after('<div class="ville-dropdown">'+loading+'</div>');
		else $dr.show().html(loading);
	}).donetyping(function () {
        $dr = $('#tenduan').next('.ville-dropdown');
		val = $(this).val();
        if (!val.length) {
            $dr.hide().html('');
        } else {
    		$.ajax({
    			url: API_URL+'/search/duanbasic/',
    			type: 'post',
    			data: {input: val},
    			success: function (data) {
                    $dr.show().html('');
                    if (data.message && data.message.indexOf('No duan') > -1) {
                        $dr.html('<div class="ville-empty">Không có kết quả cho <b>'+val+'</b></div>');
                    } else {
                        $.each(data, function (i, d) {
            				var vO = '<div class="sthumb"><img src="'+d.thumb+'"/></div> <div class="stit"><b>'+d.name+'</b> <div class="sadr"><i class="fa fa-map-marker"></i> '+d.address+'</div></div><div class="clearfix"></div>';
            				$dr.append('<div class="ville-one" id="v'+i+'">'+vO+'</div>');
            				$('.ville-one#v'+i).click(function () {
                                console.log(vO);
                                $('#tenduan').val(d.name);
                                $('#duanid').val(d.id);
            					$dr.remove()
            				})
                        })
                    }
    			}
    		})
        }
	});
}

ProductSearchControler.prototype.showCitySearch = function () {
    var i = this;
}

ProductSearchControler.prototype.changeCityCallback = function (ct) {
    c_city = ct;
    var f = this.formSearch;
    district = {};
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
    //console.log(district);
    options.district = '';
    f.find('#district').html('<option value="CN">--Chọn Quận/Huyện--</option>');
    f.find('#ward').html('<option value="CN">--Chọn Phường/Xã--</option>');
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>');
    if (district != null && district) {
        for (var i = 0; i < district.length; i++) {
            var selected = '';
            if (c_district == district[i].id) selected = 'selected';
            options.district += "<option "+selected+" value='" + district[i].id + "'>" + district[i].name + "</option>";
            street = district[i].street;
        }
    }
    f.find('#district').append(options.district);
}

ProductSearchControler.prototype.changeDistrictCallback = function (dt) {
    c_district = dt;
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
            var selected = '';
            if (c_ward == ward[i].id) selected = 'selected';
            options.ward += "<option "+selected+" value='" + ward[j].id + "'>" + ward[j].name + "</option>";
        }
    }
    f.find('#ward').append(options.ward);
}

ProductSearchControler.prototype.changeWardCallback = function (wd) {
    c_ward = wd;
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
    if (f.find('#city').val() != "CN") {
        i.changeCityCallback(f.find('#city').val());
    }
    if (f.find('#district').val() != "CN") {
        i.changeDistrictCallback(f.find('#district').val());
    }
    if (f.find('#ward').val() != "CN") {
        i.changeWardCallback(f.find('#ward').val());
    }

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

ProductSearchControler.prototype.closePopup = function (search = false) {
    $('.popup-map').hide();
    this.ProductMap.input.details.value = 0;
    this.ProductMap.input.isShowUtil.value = 0;
    this.ProductMap.isDetails = false;
    this.ProductMap.isShowUtil = false;
    $thismap.closeInfoWindowCallBack(new google.maps.LatLng(this.ProductMap.currentProduct.latitude, this.ProductMap.currentProduct.longitude));
    this.closeDirectionBoard(search);
    this.ChangeUrlForNewContext();
}

ProductSearchControler.prototype.ShowMoreInfoAndHidePopup = function (id, lat, lon) {
    remove_popup_info();
    this.closePopup();
    this.ProductMap.showInfoWindow(id);
    this.ShowMoreInfo(lat,lon);
}

ProductSearchControler.prototype.ShowMoreInfo = function (lat, lon) {
    if (this.ProductMap.map.getZoom() < zoom_utilityView) {
        //this.ProductMap.map.setZoom(zoom_utilityView);
    }
    //this.utilityTool.ResetRadius();
    //console.log(this.ProductMap.utilArea);
    this.utilityTool.SearchAction(lat, lon);
};

ProductSearchControler.prototype.ShowDirection = function () {
    var i = this;

    i.ProductMap.isDirection = true;
    // clear all points
    i.ProductMap.clearPoints();

    i.getDirection();
}

function popup_info (f, lat, lng) {
    var topp = $('nav.navbar').height() + 20;
	$('.popup-map .popup-content').slideDown(400, function () {
        $('body').addClass('fixed');
        $('.popup-map').show();
		$(this).css({
			'overflow': 'visible'
		});
        if ($('.map-item-info-board').length) {
            setWidth($(window).width());
        }

        //$('#map_direction').width($('.v-place-imgs').width()).height($('.v-place-imgs').height());
        //$('#map_direction').attr('style','width: '+$('.v-place-imgs').width()+'px!important; height: '+$('.v-place-imgs').height()+'px!important; position:absolute;top:0;left:0;right:0;bottom:0 ')
        /*google.maps.event.trigger(f.map, 'resize');
        f.map.setCenter(new google.maps.LatLng(lat, lng));
        f.ShowDirection(lat, lng);*/

	}).css('top', topp);
	/*$('.popup-map .popup-content [role="close"]').click(function () {
		remove_popup_info()
	});*/
}

function remove_popup_info () {
    $('.popup-map .popup-content, .popup-map').attr('style', '').hide();
    $('body').removeClass('fixed');
}


ProductSearchControler.prototype.showDetailsCallback = function () {
    this.genPopup();
};


ProductSearchControler.prototype.ShowDetails = function (id, isProject = false) {
    var i = this;

    if (!i.ProductMap.isDetails) {
        i.ProductMap.input.details.value = 1;
        i.ProductMap.isDetails = true;
        i.ChangeUrlForNewContext();
    }
    if (!isProject) {
        i.ShowDetailsNode(id);
    } else {
        i.ShowDetailsProject(id);
    }
}

ProductSearchControler.prototype.ShowDetailsNode = function (id) {
    var i = this;
    i.ProductMap.isProject = false;
    if (!i.ProductMap.currentProduct) {
        $.post(API_URL+'/user/chitietnode/', {id: i.ProductMap.currentPID}, function (place) {
            place = handle(place);
            i.ProductMap.currentProduct = place;
            i.setNodeDetails();
        })
    } else {
        i.setNodeDetails();
    }
};
ProductSearchControler.prototype.setNodeDetails = function () {
    var i = this;

    i.showDetailsCallback();

    var place = i.ProductMap.currentProduct;
    //console.log(place);
    if (place.isProject) place.price = place.pricefrom;
    if (place.price < 1) place.priceTxt = place.price*100+' triệu';
    else place.priceTxt = place.price+' tỷ';
    $('.v-place-tiendo, .introduan, .v-place-tiendo').hide();
    $('.v-place-address, .v-place-area, .v-place-direction, .v-place-room').show();
    $('.v-place-pricenum').html(place.priceTxt);
    $('.v-place-address span').html(place.address);
    $('.v-place-area span').html(place.area);
    $('.v-place-direction span').html(place.huong);
    $('.v-place-room span').html(place.sophongngu);
    $('.v-place-type span').html(typeRealEstate[place.type]);
    $('.v-place-details').html(place.details);
    $('.v-place-title').attr('title', place.title).children('div').html(place.title);
    $('.v-place-ten').html(place.tenlienhe);
    $('.v-place-phone').html(place.dienthoai);
    $('.v-place-email').html(place.email);

    $('.v-place-thumbs').html('');
    if (place.thumbs) {
        $.each(place.thumbs, function (ti, tv) {
            $('.v-place-thumbs').append('<img class="v-place-thumb" src="'+tv+'"/>')
        });
        $('.v-place-thumb:first').addClass('active');
        $('.v-place-bg').css('background-image', 'url('+place.thumbs[0]+')');
    }

    if (place.panorama_image) {
        $('.panorama').html('<img src="'+place.panorama_image+'">').panorama_viewer({
            animationTime: 300
        });

        var interval = null;
        var check = function() {
            if ($('.panorama .pv-inner').length) {
                clearInterval(interval);
                if (!$('#v-360').is('.active')) $('.v-place-v-360').hide();
            }
        };
        interval = setInterval(check, 1200);
    } else {
        $('.v-place-v-360').hide();
    }

    popup_info(i, place.latitude, place.longitude);

    //var latlng = new google.maps.LatLng(place.latitude, place.longitude);
    //i.ProductMap.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
    //i.ProductMap.sv.getPanorama({location: latlng, radius: 50}, i.ProductMap.processSVData);

    //setWidth();
    $('.popup-map .popup-content [role="close"]').show();

    $('.v-place-related-list').html('');
    $.post(API_URL+'/search/nodenangcao/', {nodeid: i.ProductMap.currentPID}, function (similar) {
        //console.log(similar);
        for (si = 0; si < 4; si++) {
            sv = similar[si];
            if (sv) {
                //$('.v-place-related-list').append('<a href="javascript:productControlerObj.ShowMoreInfoAndHidePopup(\''+sv.id+'\','+sv.latitude+','+sv.longitude+')" class="v-place-related-one"><img class="v-place-related-one-thumb" src="'+sv.avatar+'"/><div class="v-place-related-one-title"><span class="v-place-related-one-address"><i class="fa fa-map-marker"></i> '+sv.address+'</span></div></a>');
                $('.v-place-related-list').append('<a href="javascript:productControlerObj.ShowDetails(\''+sv.id+'\')" class="v-place-related-one"><img class="v-place-related-one-thumb" src="'+sv.avatar+'"/><div class="v-place-related-one-title"><span class="v-place-related-one-address"><i class="fa fa-map-marker"></i> '+sv.address+'</span></div></a>');
            }
        }
    });

    i.setDetailsAll(place);
}

ProductSearchControler.prototype.setDetailsAll = function (place) {
    var i = this;
    $('.v-place-mode').click(function () {
        vid = $(this).attr('id');
        if (vid != 'v-direction' && vid != 'v-util') {
            $('.v-place-board').hide();
        }
        $('.v-place-'+vid).show();
        $('.v-place-mode').removeClass('active');
        $(this).addClass('active');
        if (vid == 'v-direction') {
            i.ShowDirection();
        }
        if (vid == 'v-util') {
            i.ShowMoreInfo(place.latitude, place.longitude);
        }
    });
    $('.v-place-thumb').click(function () {
        img = $(this).attr('src');
        $('.v-place-bg').css('background-image', 'url('+img+')');
        $('.v-place-thumb').removeClass('active');
        $(this).addClass('active');
    });
    $('.popup-map .popup-content [role="close"]').click(function () {
        i.closePopup(true);
    })
}

function handle (place) {
    if (place.avatar == null || place.avatar == '') place.avatar = MAIN_URL+'/assets/img/noimage.png';
    place.isProject = (place.pricefrom > 0 ? true : false);

    if (place.isProject) place.title = place.name;

    place.typeid = parseInt(place.type.split('typereal')[1]);

    place.exCls = (place.isProject ? ' project' : '') +
    (place.typeid > 3 ? ' big' : '');

    return place;
}

ProductSearchControler.prototype.ShowDetailsProject = function (id) {
    var i = this;
    i.ProductMap.isProject = true;
    if (!i.ProductMap.currentProduct) {
        $.post(API_URL+'/user/chitietduan/', {id: i.ProductMap.currentPID}, function (place) {
            place = handle(place);
            i.ProductMap.currentProduct = place;
            i.setProjectDetails();
        })
    } else {
        i.setProjectDetails();
    }
};
ProductSearchControler.prototype.setProjectDetails = function () {
    var i = this;

    i.showDetailsCallback();

    var place = i.ProductMap.currentProduct
    //console.log(place);
    place.price = place.pricefrom;
    if (place.price < 1) place.priceTxt = place.price*100+' triệu';
    else place.priceTxt = place.price+' tỷ';
    $('.v-place-pricenum').html(place.priceTxt);
    $('.v-place-address, .v-place-area, .v-place-direction, .v-place-room, v-place-ten,.v-place-phone,.v-place-email').hide();
    $('.v-place-tiendo, .v-place-intro, .v-place-infoduan').show();
    $('.v-place-type span').html(typeRealEstate[place.type]);
    $('.v-place-tiendo span').html(place.tiendo);
    $('.v-place-details').html(place.infoduan);
    $('.v-place-title').attr('title', place.title).children('div').html(place.title);
    //$('.v-place-ten,.v-place-phone,.v-place-email').hide();
    $('.v-place-intro').html(place.intro);

    $('.v-place-thumbs').html('');
    if (place.thumbs) {
        $.each(place.thumbs, function (ti, tv) {
            $('.v-place-thumbs').append('<img class="v-place-thumb" src="'+tv+'"/>')
        });
        $('.v-place-thumb:first').addClass('active');
        $('.v-place-bg').css('background-image', 'url('+place.thumbs[0]+')');
    }

    if (place.panorama_image) {
        $('.panorama').html('<img src="'+place.panorama_image+'">').panorama_viewer({
            animationTime: 300
        });

        var interval = null;
        var check = function() {
            if ($('.panorama .pv-inner').length) {
                clearInterval(interval);
                if (!$('#v-360').is('.active')) $('.v-place-v-360').hide();
            }
        };
        interval = setInterval(check, 1200);
    } else {
        $('.v-place-v-360').hide()
    }

    popup_info(i, place.latitude, place.longitude);

    //setWidth();
    $('.popup-content [role="close"]').show();

    $('.v-place-related-list').html('');
    $.post(API_URL+'/search/duannangcao/', {duanid: i.ProductMap.currentPID}, function (similar) {
        //console.log(similar);
        for (si = 0; si < 4; si++) {
            sv = similar[si];
            if (sv) {
                //$('.v-place-related-list').append('<a href="javascript:productControlerObj.ShowMoreInfoAndHidePopup(\''+sv.id+'\','+sv.latitude+','+sv.longitude+')" class="v-place-related-one"><img class="v-place-related-one-thumb" src="'+sv.avatar+'"/><div class="v-place-related-one-title"><span class="v-place-related-one-address"><i class="fa fa-map-marker"></i> '+sv.address+'</span></div></a>');
                $('.v-place-related-list').append('<a href="javascript:productControlerObj.ShowDetails(\''+sv.id+'\')" class="v-place-related-one"><img class="v-place-related-one-thumb" src="'+sv.avatar+'"/><div class="v-place-related-one-title"><span class="v-place-related-one-address"><i class="fa fa-map-marker"></i> '+sv.address+'</span></div></a>');
            }
        }
    })

    i.setDetailsAll(place);
}

ProductSearchControler.prototype._SearchAction = function(g) {
    //console.log('_SearchAction called');
    //console.log(g);
    var f = this;
    //e = f.formSearch.serialize().split('&');
    var d = {};
    /*d.filter = 0;
    d.sort = 0;
    d.v = new Date().getTime();*/

    //d = JSON.parse(JSON.stringify(this.formSearch.serializeArray()), true);
    /*var lat = parseFloat(d.lat);
    var lng = parseFloat(d.lng);
    var radius = parseFloat(d.location_radius);*/

    /*if (this.ProductMap.isDrawing) {
        for (var key in g) d[key] = g[key];
        //d = Object.assign({}, e, g);
    }*/

    if (g == -2) { // use hash url
        g = {
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
            isProject: markContext.getQueryHash('isProject'),
            place_search: markContext.getQueryHash('place_search'),
            lstPoint: markContext.getQueryHash('points'),
            zoom: markContext.getQueryHash('zoom', zoom_moderate),
            center: markContext.getQueryHash('center'),
            page: markContext.getQueryHash('page', '1'),
            currentPID: markContext.getQueryHash('product'),
            isShowUtil: markContext.getQueryHash('isShowUtil'),
            utilArea: markContext.getQueryHash('utilArea'),
            details: markContext.getQueryHash('details'),
            searchtype: markContext.getQueryHash('searchtype', '0')
        }
    }

    d.city = d.district = d.ward = d.street = d.room = d.direction = d.pricefrom = d.area = d.type = "CN";
    d.price = "-1";
    d.type_search = d.type_action = "0";

    d.type_search = f.ProductMap.searchtype.toString();
    //d.type_search = (f.ProductMap.isProject == 1 ? 2 : f.ProductMap.isProject == 0 ? 1 : 0);

    if (g != null && g != undefined) {
        if (g == 1) {
            e = f.formSearch.serialize().split('&');
            $.each(e, function (i, v) {
                vk = v.split('=')[0];
                vl = v.split('=')[1];
                d[vk] = vl;
            });
        } else if (g == -1) {
            d.type_search = f.ProductMap.searchtype = 0;
            d.minLat = d.minLng = d.maxLat = d.maxLng = null;
        } else {
            for (var key in g) d[key] = g[key];
        }
    }


    if (!f.ProductMap.isDrawing && (!d.minLat || !d.minLng || !d.maxLat || !d.maxLng) ) {
        //f.ProductMap.boundsChangeCallBack();
        if (!f.ProductMap.bounds) {
            f.ProductMap.bounds = f.ProductMap.map.getBounds();
        }
        d.minLat = f.ProductMap.bounds.f.b;
        d.minLng = f.ProductMap.bounds.b.b;
        d.maxLat = f.ProductMap.bounds.f.f;
        d.maxLng = f.ProductMap.bounds.b.f;
    }

    d.input = (d.tenduan && d.tenduan != undefined ? d.tenduan : "");

    if (!d.room) d.room = "CN";

    d.pricefrom = d.pricefrom_giatri;
    if (d.pricefrom_donvi == 'm') {
        d.pricefrom = d.pricefrom_giatri/1000;
    }
    if (!d.pricefrom) d.pricefrom = "CN";

    delete d.lstPoint;
    delete d.points;
    delete d.center;
    delete d.cpid;
    delete d.zoom;
    delete d.isPageLoad;
    delete d.isSearchForm;
    delete d.m;
    //delete d.searchtype;

    this.searchVar = d;

    console.log(d);
    console.log(JSON.stringify(d));
    $.ajax({
        url: API_URL+'/search/searchall/',
        //url: MAIN_URL+'/api/node.php',
        type: 'post',
        //data: $('#map-search-form').serialize(),
        data: d,
        success: function(data) {
            console.log(data);
            //console.log('isProject === '+f.ProductMap.isProject);
            // show on map
            f.tempProductData = f.productData = f.ProductMap.showMap(data, d.isSearchForm);
            //console.log(f.ProductMap.data);
            //f.showList(data);

            if (!f.ProductMap.isTrigger) {
                $('.li-list>a').click();
            }
            $thismap.isTrigger = false;

            if (d.type_search == 2) {
                $('a[href="#map_results_project"]').click()
            } else {
                $('a[href="#map_results_node"]').click()
            }

            /*if (g == 1 ||
                    ($('#type').val() && $('#type').val() != 'CN') ||
                    ($('#city').val() && $('#city').val() != 'CN') ||
                    ($('#district').val() && $('#district').val() != 'CN') ||
                    ($('#area').val() && $('#area').val() != 'CN') ||
                    ($('#price').val() && $('#price').val() != 'CN')
                ) {*/
            if (g == 1 ||
                  ( g != -1 && (d.type_search && d.type_search > 0) )
             ) {
                $('.btn-filter').html('<i class="fa fa-check"></i> Lọc');
                $('.cancel-filter').show();
            } else {
                $('.btn-filter').html('<i class="fa fa-filter"></i> Lọc');
                $('.cancel-filter').hide()
            }
            //console.log('isProject (new) === '+f.ProductMap.isProject);
            f.ChangeUrlForNewContext();
        },
        error: function(a, b, c) {
            $('.loading-layout').hide();
            $('.popup-map').hide();
            console.log(a)
        }
    });

    //f.ChangeUrlForNewContext();

    /*$.get(API_URL+'/user/node-buy/', function (data) {
        console.log(data);
    });*/
};

function toggleFilterBoard (s) {
    if (s == 'close') {
        $('.map-filter-board').slideUp(100, function () {
            $(this).removeClass('open');
            if (isMobile) {
                $('.map-tabs-toggle').html('<i class="fa fa-angle-double-down"></i>');
            }
        })
    } else {
        $('.map-filter-board').slideDown(100, function () {
            $(this).addClass('open');
            if (isMobile) {
                $('.map-tabs-toggle').html('<i class="fa fa-angle-double-down"></i>');
                $('.map-list-tabs').slideUp(100, function () {
                    $(this).closest('#mapSide').removeClass('open');
                });
            }
        })
    }
}

ProductSearchControler.prototype.getProjectNodes = function () {

}

ProductSearchControler.prototype.callBackFindBound = function () {
    //var g = JSON.parse(JSON.stringify(this.formSearch.serializeArray()));
    //console.log(this.ProductMap.bounds);
    //console.log('callBackFindBound called');
    this._SearchAction()
}

ProductSearchControler.prototype.callBackDrawEvent = function(a, b, c, d, e, f) {
    this.lstPoint = this.ProductMap.input.points.value;
    if (this.lstPoint != null && this.lstPoint.length > 0) {
        //var g = JSON.parse(JSON.stringify(this.formSearch.serializeArray()));
        var g = {};
        //console.log(g);
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
        //g.lstPoint = this.lstPoint;
        //g.isSearchForm = false;
        //g.isPageLoad = false;
        g.minLat = b;
        g.minLng = c;
        g.maxLat = d;
        g.maxLng = e;
        //g.m = "shape";
        if (f != undefined) {
            //g.cpid = f.cpid;
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
    a += "&isProject=" + (this.ProductMap.isProject ? 1 : 0);
    //a += "&points=" + ( (this.ProductMap.isDrawing || $input.district.value) ? ($input.points.value != undefined ? $input.points.value : '') : '');
    a += "&place_search="+$input.place_search.value;
    a += "&points=" + (!$input.place_search && $input.points.value != undefined ? $input.points.value : '');
    a += "&zoom=" + this.ProductMap.getZoom();
    a += "&center=" + this.ProductMap.getCenter();
    a += "&page=0";
    a += "&product=" + (this.ProductMap.currentPID != undefined && this.ProductMap.currentPID != null ? this.ProductMap.currentPID : '');
    a += "&isShowUtil=" + (this.ProductMap.isShowUtil && this.ProductMap.currentPID != undefined && this.ProductMap.currentPID != null ? 1 : 0);
    a += "&utilArea="+(this.ProductMap.isShowUtil ? this.ProductMap.utilArea : '');
    a += "&searchtype=" + this.ProductMap.searchtype;
    a += "&details=" + (this.ProductMap.isDetails ? 1 : 0);
    window.location.href = window.location.pathname + '#' + a;
    //console.log('ChangeUrlForNewContext: '+window.location.pathname + '#' + a);
};


var oldWidth = $(window).width();
var oldHeight = $(window).height();

function render (isResizeSmaller = false, searchVisible = false) {
    var w = $(window).width();
    var h = $(window).height();

    //$('.map-side .tab-content').height($(window).height() - $('nav.navbar').height() - $('.map-side>ul.nav').height());

    if (isResizeSmaller) {
        w = w + 12;
        h = h + 12;
    }
    $('.container').css({
        height: h,
        width: w
    })

    //while ($('.v-place-imgs').width() <= 10 || $('.v-place-info').width() <= 10) {
        //setWidth(w);
    //}

    $('ul.map_search_select>li>a').click(function (e) {
        var type = $(this).parent('li').attr('attr-type');
        $('#map-search-form .form-group[attr-type]').hide();
        $('#map-search-form .form-group[attr-type="'+type+'"]').show();
        $('#map-search-form input#searchtype').val(type == 'node' ? 1 : type == 'project' ? 2 : 0);
        //productControlerObj.ProductMap.isProject = (type == 'node' ? 0 : type == 'project' ? 1);
        //productControlerObj.ChangeUrlForNewContext();
    });

    if (searchVisible) { // show search
        $('.map-tabs-toggle').html('<i class="fa fa-angle-double-up"></i>');
        $('.map-search-tabs').slideDown(100, function () {
            $(this).closest('#mapSide').addClass('open');
        });
    } else {
        $('.map-tabs-toggle').html('<i class="fa fa-angle-double-down"></i>');
        $('.map-search-tabs').slideUp(100, function () {
            $(this).closest('#mapSide').removeClass('open');
        });
    }

    if (w <= 500) {
        //$('#mapSide').width(w-20).css('right','10px!important');
        isMobile = true;
        $('body').addClass('mobile');
        $('nav').removeClass('navbar-fixed-top');
        $('.v-place-related').removeClass('popup-section section-light');

        var sidePaneHeight = h-$('.map-side ul.nav').height()-$('nav.navbar').height()-40;
        if (!$('.map-search-tabs').is(':visible')) {
            sidePaneHeight -= 20;
            console.log('sidePaneHeight -= 20;');
        }
        $('#map-search-form,.map-results-tabs').attr('style', 'height:'+sidePaneHeight+'px!important');

        var inputW = w-$('.li-filter').width()-$('.li-list').width()-$('.map-tabs-toggle').width()-60;
        console.log(w+' ~ '+$('.li-filter').width()+' ~ '+$('.li-list').width()+' ~ '+$('.map-tabs-toggle').width()+' ~ '+inputW);
        $('.li-input').attr('style', 'width:'+inputW+'px!important');
    } else {
        $('body').removeClass('mobile');
    }

}

function setWidth(w) {
}

var markContext = "";
var mapContext = {};
var productControlerObj = null;

$(document).ready(function () {
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
            isProject: markContext.getQueryHash('isProject'),
            place_search: markContext.getQueryHash('place_search'),
            lstPoint: markContext.getQueryHash('points'),
            zoom: markContext.getQueryHash('zoom', zoom_moderate),
            center: markContext.getQueryHash('center'),
            page: markContext.getQueryHash('page', '1'),
            currentPID: markContext.getQueryHash('product'),
            isShowUtil: markContext.getQueryHash('isShowUtil'),
            utilArea: markContext.getQueryHash('utilArea'),
            details: markContext.getQueryHash('details'),
            searchtype: markContext.getQueryHash('searchtype', '0')
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

    if (!isMobile) $('nav.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');

    render(false, (isMobile ? false : true));

    if (isMobile) {
        //$('.li-list').after('<li class="li-input"><input type="text" id="place_search" placeholder="Search place"/></li>');
        $('#mapSide .li-list').after('<li class="li-input"><input type="text" id="place_search" placeholder="Search place"/> </li>');
    } else {
        //$('.nav-search').html('<li class="li-input"><input type="text" id="place_search" placeholder="Search place"/></li>');
        $('.nav-search').html('<li class="li-input"><input type="text" id="place_search" placeholder="Search place"/></li>');
    }

    productControlerObj = new ProductSearchControler({
        context: mapContext
    });

    $(window).on('resize', function () {
        var b = false;
        if (oldWidth > $(window).width() || oldHeight > $(window).height()) b = true;
        var searchVisible = $('.map-search-tabs').is(':visible')
        render(b, searchVisible);
        productControlerObj.ProductMap.resize();
    });
    $('.toggle-search-advanced').click(function () {
        if ($('.map-search-advanced').is(':visible')) {
            $('.map-search-advanced').slideUp(200)
        } else {
            $('.map-search-advanced').slideDown(200)
        }
    });
    $('.map-tabs-toggle').click(function () {
        var currentlyHide = true;
        var $this = $(this);
        var searchVisible = !$('.map-search-tabs').is(':visible');
        render(false, searchVisible);
    });
    $('#mapSide .nav-tabs>li>a').click(function () {
        var $div = $(this).closest('.nav-tabs-custom');
        render(false, true)
    });

})
