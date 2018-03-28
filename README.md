# Neighbourhood Map
Neighbourbood is a single page application featuring a map of my neighborhood including a few of my favourite locations, third-party data about those locations and various ways to browse the content.

[Please check out a live github link here!](https://sherinkuruvilla.github.io/nhmap/)

## Local Installation
From https://github.com/sherinkuruvilla/nhmap, download the code to the PC.
From the downloaded folder, run index.html.   


## Features
### Filter Locations
Includes a dropdown menu that filters the map markers and list items to locations matching the selection. 

### Location Listing
A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied. 

### Information Window
Clicking a location on the list displays unique information about the location, and animates its associated map marker and makes it bouce. 

### Additional Location Data
The information is supplemented with Four Square recommendation API data to lookup URL, contact phone and hours of operation.
All errors with data api is handled graciously.

### Map and Markers
Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.

## App Architecture
Mobile friendly web design
The application will render properly on mobile and desktop devices using Boot strap, CSS and media queries.

### Frameworks
Application uses Knockout frameworks leveraging an MVVM pattern for data-bindings, and JQuery for MAP related DOM manipulations.  Model and Views have been created for separation of concerns. View Map and View Locations have the code to render the view each time the underlying Model data for locations, and maps changes.

### Asynchronous Data and MAP Apis
Google Map Api was used to draw a map of the neighbour hood to drop markers for the locations.
There are at least 5 locations in the model. These are hard coded as an object array.
Four Square Api is used to display recommendations related to each marker.  
All data requests are retrieved in an asynchronous manner leveraging JQuery AJAX calls.

### Error Handling
Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods).



