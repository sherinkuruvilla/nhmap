//code orginally from Udacity course by Emily Keller
//modified by Sherin Kuruvilla Mar 25 2018

//map object returned by google maps JS api
let map;

// initialize an empty array to hold
// the markers to plot on the map
let markers = [];

let infoWindow;


//Handles all the View Model functions for the map view
let mapViewModel = {
    //callback function from google maps JS api
    //this function will populate all the markers
    initMap: function(){
        try {
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 42.318542, lng: -83.534632},
            zoom: 12
        });
        this.loadMarkers();
        this.showListing();
        }
        catch(err) {
            this.MAPApiError();
        }
    },
    MAPApiError: function(){
        $('#map').text('Maps could not be loaded.');
    },
    loadMarkers: function(){
        try {
            infoWindow = new google.maps.InfoWindow();
            for (let i=0; i<locations.length; i++ ) {
                let marker = new google.maps.Marker({
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
        }
        catch(err) {
            this.MAPApiError();
        }
    },
    showInfoWindow:  function(thisMarker){
        try {
        infoWindow.marker = thisMarker;
        infoWindow.setContent('<div id="info-content">' + thisMarker.title
                    + '<br>' + thisMarker.address
                    + '<br>' + thisMarker.type
                    + '</div>');
        infoWindow.open(map, thisMarker);
        }
        catch(err) {
            this.MAPApiError();
        }
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
        try {
        this.hideAnimation();
        thisMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
        catch(err) {
            this.MAPApiError();
        }
    },
    currentMarker: markers[0],
    showMarker: function(id){
        let bounds = new google.maps.LatLngBounds();
        this.hideListing();
        currentMarker = markers[id];
        markers[id].setMap(map);
        markers[id].setAnimation(google.maps.Animation.DROP);
        bounds.extend(markers[id].position);
    },
    showListing: function(){
        try {
            infoWindow.close();
            let bounds = new google.maps.LatLngBounds();
            for (let i=0; i<markers.length; i++ ) {
                markers[i].setMap(map);
                markers[i].setAnimation(google.maps.Animation.DROP);
                bounds.extend(markers[i].position);
            };
            map.fitBounds(bounds);
        }
        catch(err) {
            this.MAPApiError();
        }
    },
    hideListing: function(){
        infoWindow.close();
        for (let i=0; i<markers.length; i++ ) {
            markers[i].setMap(null);
            markers[i].setAnimation(null);
        };
    },
    hideAnimation: function(){
        for (let i=0; i<markers.length; i++ ) {
            markers[i].setAnimation(null);
        };
    },
    filterListing: function(type){
        let bounds = new google.maps.LatLngBounds();
        this.hideListing();
        for (let i=0; i<markers.length; i++ ) {
            if (type === markers[i].type) {
            markers[i].setMap(map);
            markers[i].setAnimation(google.maps.Animation.DROP);
            };
        };
    }
};
