//Original code from Udacity JS course by Ben Jaffe
//Modified by Sherin Kuruvilla Mar 25 2018

/**
* @description Represents a location on the google map
* @constructor
* @param {string} data - The location object literal
* @param {string} index - The index of the location in the locations array
*/


const Location = function(data, index){
    this.location = data.location;
    this.address = data.address;
    this.title = data.title;
    this.types = data.types;
    this.type = data.type;
    this.id = index;
};

// initialize an empty array to hold
// the markers to plot on the map

let viewLocationModel = function(){
    const self = this;
    this.initialList = ko.observableArray([]);
    this.locationTypes = ko.observableArray([]);  //available types for dropdown
    this.selectedType = ko.observable();  //selected value from the filter drop down

    let i=0;
    locations.forEach(function(locationItem){
        self.initialList.push(new Location(locationItem, i));
        i++;
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
        let i=0;
        self.initialList([]);
        locations.forEach(function(locationItem){
            self.initialList.push(new Location(locationItem, i));
            i++;
        });
        mapViewModel.showListing();
    };
    hideListing = function(){
        mapViewModel.hideListing();
    };
    filterListing = function(){
        let type=this.selectedType();
        let i=0;
        self.initialList([]);
        locations.forEach(function(locationItem){
            if (locationItem.type == type) {
                self.initialList.push(new Location(locationItem, i));
            };
            i++;
        });
        mapViewModel.filterListing(type);
    };
    showWindow = function(clickedLocation){
        self.currentLocation(clickedLocation);
        mapViewModel.showWindow(self.currentLocation().id);
    };
};


ko.applyBindings(new viewLocationModel());

