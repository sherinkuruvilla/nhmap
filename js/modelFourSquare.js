//Based on code from Intro to AJAX course.
function loadFourSquare(location, query) {
    // load fourSquare data
    const fourUrl = 'https://api.foursquare.com/v2/venues/explore';
    const ll=location.lat() + ',' + location.lng();
    const rightNow = new Date();
    const yyyymmdd = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    $.ajax({
        url: fourUrl,
        method: 'GET',
        dataType: "json",
        data: {
            client_id: 'URCHE3HWST1G02CPO1MXNGOCRVBG4YJJRY4ISKBPSGW2OBKN',
            client_secret: 'PDCHYPCBDX0U5GI5L1I3W5FM5V2DPJNRTOZEFSSGHKUCQYKR',
            ll: ll, //'40.7243,-74.0018',
            query: query, //'Skating Station',
            v: yyyymmdd,  //'20180326'
            limit: 1
        },
        success: function( data ) {
            let htmlstr = '';
            const venue = data.response.groups[0].items[0].venue;
            $.each( venue, function( key, val ) {
                if (key=='contact' && val.formattedPhone) {
                    htmlstr += '<br>Contact Phone: ' + val.formattedPhone;
                };
                if (key=='hours' && val.status) {
                    htmlstr += '<br>Hours: ' + val.status;
                };
                if (key=='url') {
                    htmlstr += '<br>Url: <a href="' + val + '">' + val + '</a>';
                };
             });
            if (htmlstr == '') {
                htmlstr = '<br>Data not available.';
            };

            mapViewModel.showFourSquareInfo(htmlstr);
        },
        error: function (e) {
                const htmlstr = '<br>Data not available.';
                mapViewModel.showFourSquareInfo(htmlstr);
        }
    });

    return false;
}
