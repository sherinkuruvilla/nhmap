// AJAX call to load google map asynchronously and handle errors gracefully.
function loadGoogleMap() {
    // load google map objects
    const mapUrl = 'https://maps.googleapis.com/maps/api/js';
    $.ajax({
        url: mapUrl,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            key: 'AIzaSyBaJFKlfcqNJBXhUqBC6QsHI8cm5Y2zdBU',
            v: '3'
        },
        success: function( data ) {
            mapViewModel.initMap();
        },
        error: function (e) {
            mapViewModel.MAPApiError();
        }
    });

    return false;
}

//this is the last function that gets loaded after document ready.
loadGoogleMap();
