//code orginally from Udacity course by Emily Keller
//modified by Sherin Kuruvilla Mar 25 2018

//map object returned by google maps JS api
var map;

// initialize an empty array to hold
// the markers to plot on the map
var markers = [];



//Handles all the View Model functions for the map view
var mapViewModel = {
    //callback function from google maps JS api
    //this function will populate all the markers
    initMap: function(){
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 42.318542, lng: -83.534632},
            zoom: 12
        });

        var infoWindow = new google.maps.InfoWindow();

        //var bounds = new google.maps.LatLngBounds();

        for (var i=0; i<locations.length; i++ ) {
            var marker = new google.maps.Marker({
                position: locations[i].location,
                animation: google.maps.Animation.DROP,
                //map: map,
                title: locations[i].title,
                address: locations[i].address,
                type: locations[i].type,
                id: i
            });

            markers.push(marker);

            //bounds.extend(marker.position);

            marker.addListener('click', function(){
                mapViewModel.notify(this, infoWindow);
            });
        }

        //map.fitBounds(bounds);

    },
    notify:  function(thisMarker, thisInfoWindow){
        thisInfoWindow.marker = thisMarker;
        thisInfoWindow.setContent(thisMarker.title + '<br>' + thisMarker.address +
                    '<br>' + thisMarker.type);
        thisInfoWindow.open(map, thisMarker);
    },
    showListing: function(){
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i<markers.length; i++ ) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        };
        map.fitBounds(bounds);
        //alert('show listing map.js');
    },
    hideListing: function(){
        for (var i=0; i<markers.length; i++ ) {
            markers[i].setMap(null);
        };
        //alert('hide listing map.js');
    }
};
