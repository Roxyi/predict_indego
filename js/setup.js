var indegodata = 'https://www.rideindego.com/stations/json/';
var usageStyle = function(feature){
  var bike = feature.properties.bikesAvailable;
  var dock = feature.properties.docksAvailable;
  var total = feature.properties.totalDocks;
  return dock === 0 ? {color: "red", fillColor:"red", fillOpacity:0.7, radius:8}:
         bike === 0 ? {color: "green", fillColor: "green", fillOpacity:0.7, radius:8}:
         {color:"blue", fillColor:"blue", fillOpacity:bike/total, radius:8};
};
$.getJSON(indegodata, function(data) {
  geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      // console.log(feature.properties);
      return L.circleMarker(latlng).bindPopup(
        '<h3>'+feature.properties.name+'</h3>'+
        feature.properties.addressStreet+
        '<h4>Bikes:' +feature.properties.bikesAvailable+'&nbsp&nbsp&nbsp&nbsp'+'Docks: '+feature.properties.docksAvailable+'</h4>');
    },
    style: usageStyle
  }).addTo(map);
});
var Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
});
var map = L.map('map').setView([39.96, -75.176],13);
map.addLayer(Stamen_Watercolor);
