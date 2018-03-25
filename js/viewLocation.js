//Original code from Udacity JS course by Ben Jaffe
//Modified by Sherin Kuruvilla Mar 25 2018

var locations = [
        {location: {lat: 42.468795, lng: -83.259709},
        address: '24518 Lahser Rd, Southfield, MI 48033, USA',
        title: 'Detroit Marthoma Church', type: 'Establishment',
        types: [{type:'Establishment'}, {type:'Church'}]},
        {location: {lat: 42.319178, lng: -83.491861},
        address: '1905 N Canton Center Rd, Canton, MI 48187, USA',
        title: 'Kroger', type: 'Shopping',
        types: [{type:'Shopping'}, {type:'Establishment'}]},
        {location: {lat: 42.350457, lng: -83.452881},
        address: '8611 Ronda Dr, Canton, MI 48187, USA',
        title: 'Skatin Station', type: 'Kids Fun',
        types: [{type:'Kids Fun'}, {type:'Skating'}]},
        {location: {lat: 42.421413, lng: -83.431422},
        address: '18600 Haggerty Rd, Livonia, MI 48152, USA',
        title: 'Schoolcraft College', type: 'Establishment',
        types: [{type:'Establishment'}, {type:'School'}]},
        {location: {lat: 42.232485, lng: -83.739701},
        address: '3776 S State St, Ann Arbor, MI 48108',
        title: 'Black Rock Grill Ann Arbor', type: 'Restaurant',
        types: [{type:'Establishment'}, {type:'Restaurant'}]},
        {location: {lat: 42.476822, lng: -83.149995},
        address: '8450 W 10 Mile Rd, Royal Oak, MI 48067',
        title: 'Detroit Zoo', type: 'Kids Fun',
        types: [{type:'Kids Fun'}, {type:'Zoo'}]},
        {location: {lat: 42.318542, lng: -83.534632},
        address: '50722 Tahoe Way, Canton, MI 48187',
        title: 'Sherin Abode', type: 'Residence',
        types: [{type:'Residence'}, {type:'Home'}]}
];


var Location = function(data){
    this.location = ko.observable(data.location);
    this.address = ko.observable(data.address);
    this.title = ko.observable(data.title);
    this.types = ko.observableArray(data.types);
    this.type = ko.observable(data.type);

    this.locationString = ko.computed(function(){
        //return JSON.stringify(this.location());
    }, this);
};


var viewLocationModel = function(){
    var self = this;
    this.initialList = ko.observableArray([]);
    locations.forEach(function(locationItem){
        self.initialList.push( new Location(locationItem))
        });
    this.currentLocation = ko.observable(this.initialList()[0]);
    setLocation = function(clickedMarker){
        self.currentLocation(clickedMarker);
    };
    showListing = function(){
        mapViewModel.showListing();
    };
    hideListing = function(){
        mapViewModel.hideListing();
    };
};

////

ko.applyBindings(new viewLocationModel());

