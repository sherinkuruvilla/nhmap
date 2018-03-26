//Original code from Udacity JS course by Ben Jaffe
//Modified by Sherin Kuruvilla Mar 25 2018

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

// initialize an empty array to hold
// the markers to plot on the map

var viewLocationModel = function(){
    var self = this;
    this.initialList = ko.observableArray([]);
    this.locationTypes = ko.observableArray([]);  //available types for dropdown
    this.selectedType = ko.observable();  //selected value from the filter drop down
    locations.forEach(function(locationItem){
        self.initialList.push( new Location(locationItem));
    });
    var uniqueTypes = [...new Set(locations.map(item => item.type))];
    uniqueTypes.forEach(function(locationItem){
          self.locationTypes.push(locationItem);
    });

    this.currentLocation = ko.observable(this.initialList()[0]);
    setLocation = function(clickedLocation){
        self.currentLocation(clickedLocation);
    };
    showListing = function(){
        mapViewModel.showListing();
    };
    hideListing = function(){
        mapViewModel.hideListing();
    };
    filterListing = function(){
        var type=this.selectedType();
        mapViewModel.filterListing(type);
    };
    showInfoWindow = function(clickedLocation){
        mapViewModel.hideListing();
    };
};

////

ko.applyBindings(new viewLocationModel());

