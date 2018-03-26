//code orginally from Udacity course by Emily Keller
//modified by Sherin Kuruvilla Mar 25 2018

//map object returned by google maps JS api
var map;

// initialize an empty array to hold
// the markers to plot on the map
var markers = [];

var infoWindow;


//Handles all the View Model functions for the map view
var mapViewModel = {
    //callback function from google maps JS api
    //this function will populate all the markers
    initMap: function(){
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 42.318542, lng: -83.534632},
            zoom: 12
        });

        this.loadMarkers();
        this.showListing();
    },
    loadMarkers: function(){
        infoWindow = new google.maps.InfoWindow();
        for (var i=0; i<locations.length; i++ ) {
            var marker = new google.maps.Marker({
                position: locations[i].location,
                animation: google.maps.Animation.DROP,
                title: locations[i].title,
                address: locations[i].address,
                type: locations[i].type,
                id: i
            });

            markers.push(marker);

            marker.addListener('click', function(){
                mapViewModel.showInfoWindow(this, infoWindow);
                mapViewModel.animate(this);
            });
        };
    },
    showInfoWindow:  function(thisMarker){
        infoWindow.marker = thisMarker;
        infoWindow.setContent('<div id="info-content">' + thisMarker.title
                    + '<br>' + thisMarker.address
                    + '<br>' + thisMarker.type
                    + '</div>');
        infoWindow.open(map, thisMarker);
        loadFourSquare(thisMarker.position, thisMarker.title);
    },
    showFourSquareInfo: function(htmlstr){
        divstr = '<div id="foursquare-content">' + htmlstr + '</div>';
        infoWindow.setContent(infoWindow.content+divstr);
        //infoWindow.open(map, currentMarker);
        //alert(htmlstr);
    },
    showWindow:  function(id){
        this.showMarker(id);
        mapViewModel.showInfoWindow(markers[id]);
    },
    animate: function(thisMarker){
        this.hideAnimation();
        thisMarker.setAnimation(google.maps.Animation.BOUNCE);
    },
    currentMarker: markers[0],
    showMarker: function(id){
        var bounds = new google.maps.LatLngBounds();
        this.hideListing();
        currentMarker = markers[id];
        markers[id].setMap(map);
        markers[id].setAnimation(google.maps.Animation.DROP);
        bounds.extend(markers[id].position);
    },
    showListing: function(){
        infoWindow.close();
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i<markers.length; i++ ) {
            markers[i].setMap(map);
            markers[i].setAnimation(google.maps.Animation.DROP);
            bounds.extend(markers[i].position);
        };
        map.fitBounds(bounds);
    },
    hideListing: function(){
        infoWindow.close();
        for (var i=0; i<markers.length; i++ ) {
            markers[i].setMap(null);
            markers[i].setAnimation(null);
        };
    },
    hideAnimation: function(){
        for (var i=0; i<markers.length; i++ ) {
            markers[i].setAnimation(null);
        };
    },
    filterListing: function(type){
        var bounds = new google.maps.LatLngBounds();
        this.hideListing();
        for (var i=0; i<markers.length; i++ ) {
            if (type === markers[i].type) {
            markers[i].setMap(map);
            markers[i].setAnimation(google.maps.Animation.DROP);
            };
        };
    }
};
