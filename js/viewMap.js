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
            });
        };
    },
    showInfoWindow:  function(thisMarker, thisInfoWindow){
        thisInfoWindow.marker = thisMarker;
        thisInfoWindow.setContent(thisMarker.title + '<br>' + thisMarker.address +
                    '<br>' + thisMarker.type);
        thisInfoWindow.open(map, thisMarker);
    },
    showWindow:  function(id){
        this.showMarker(id);
        mapViewModel.showInfoWindow(markers[id], infoWindow);
    },
    showMarker: function(id){
        var bounds = new google.maps.LatLngBounds();
        this.hideListing();
        markers[id].setMap(map);
        markers[id].setAnimation(google.maps.Animation.DROP);
        bounds.extend(markers[id].position);
        map.fitBounds(bounds);
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
    filterListing: function(type){
        var bounds = new google.maps.LatLngBounds();
        this.hideListing();
        for (var i=0; i<markers.length; i++ ) {
            if (type === markers[i].type) {
            markers[i].setMap(map);
            markers[i].setAnimation(google.maps.Animation.DROP);
            bounds.extend(markers[i].position);
            };
        };
        map.fitBounds(bounds);
    }
};
