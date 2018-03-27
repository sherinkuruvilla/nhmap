//Original code from Udacity JS course by Ben Jaffe
//Modified by Sherin Kuruvilla Mar 25 2018

/**
* @description Represents a location on the google map
* @constructor
* @param {string} data - The location object literal
* @param {string} index - The index of the location in the locations array
*/
let Location = function(data, index){
    this.location = ko.observable(data.location);
    this.address = ko.observable(data.address);
    this.title = ko.observable(data.title);
    this.types = ko.observableArray(data.types);
    this.type = ko.observable(data.type);
    this.id = ko.observable(index);
};

// initialize an empty array to hold
// the markers to plot on the map

let viewLocationModel = function(){
    const self = this;
    this.initialList = ko.observableArray([]);
    this.locationTypes = ko.observableArray([]);  //available types for dropdown
    this.selectedType = ko.observable();  //selected value from the filter drop down
    //alert(markers.length);

    let i=0;
    locations.forEach(function(locationItem){
        self.initialList.push(new Location(locationItem, i));
        i++;
       // alert(marker.title);
    });
    const uniqueTypes = [...new Set(locations.map(item => item.type))];
    uniqueTypes.forEach(function(locationType){
          self.locationTypes.push(locationType);
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
        let type=this.selectedType();
        mapViewModel.filterListing(type);
    };
    showWindow = function(clickedLocation){
        self.currentLocation(clickedLocation);
        //alert(self.currentLocation().id());
        mapViewModel.showWindow(self.currentLocation().id());
        //alert(self.currentLocation.id);
    };
};


ko.applyBindings(new viewLocationModel());

