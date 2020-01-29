<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
 	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css" type="text/css">
    <link rel="stylesheet" href="./styles.css">
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>
    <!-- <script src="http://map.vworld.kr/js/vworldMapInit.js.do?apiKey=AEA97758-6E01-36AF-9F91-8A712F2BEB49"></script> -->
    <script src="https://cdn.maptiler.com/ol-mapbox-style/v4.3.1/olms.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> -->
 	<script src='./map.js'></script>

 	
    <title>Map</title>

</head>
<body>
   <div class="grid-container">
    <div class="grid-1">
      <div class="sidebar">
      
    
        <h2>Base Layers</h2>
        <input type="radio" name='baseLayerRadioButton' value='OSMStandard' >OSM Standard<br>
        <input type="radio" name='baseLayerRadioButton' value='VectorTileLayerOpenstreetMap'>VectorTile Layer OpenstreetMap<br>
        <input type="radio" name='baseLayerRadioButton' value='StamenTerrain'>Stamen Terrain<br>
        <input type="radio" name='baseLayerRadioButton' value='CartoDarkAll'>Carto Dark All<br>
        <input type="radio" name='baseLayerRadioButton' value='Vworld' checked>브이월드<br>
        <!-- <input type="radio" name='baseLayerRadioButton' value='BingMaps'>Bing Maps<br>
        <input type="radio" name='baseLayerRadioButton' value='OSMHumanitarian'>OSM Humanitarian<br>
        <input type="radio" name='baseLayerRadioButton' value='StamenTerrainWithLabels'>Stamen Terrain With Labels<br>-->        
        
        <h2>Layers</h2>
        <input type="checkbox" name='rasterLayerCheckbox' value='TileArcGISLayer'>Tile ArcGIS Layer<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='NOAAWMSLayer'>NOAA WMS Layer<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='TileDebugLayer'>Tile Debug Layer<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='SeoulAreaGeoJSON' checked>Seoul GeoJSON<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='GeoserverWMSSource' checked>Geoserver WMS Layer<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='openstreetMapFragmentStatic'>OpenstreetMap Humanitarian Fragment Static<br>
        <input type="checkbox" name='rasterLayerCheckbox' value='CentralEUCountriesGeoJSON'>Central EU Countries GeoJSON<br>
        <!-- <input type="checkbox" name='rasterLayerCheckbox' value='CentralEUCountriesKML'>Central EU Countries KML<br> -->
        <input type="checkbox" name='rasterLayerCheckbox' value='OnlineFBUsers'>HeatMap Online FB Users<br>
  	  <h2>Info</h2>
  	  <div id="info">&nbsp;</div>
  	  </div>
    </div>
    <div class="grid-2">
      <div id="map" class="map"></div>
    </div>
  </div>
  <div class="overlay-container">
    <span class='overlay-text' id='feature-name'></span><br>
    <span class='overlay-text' id='feature-additional-info'></span><br>
    <span class='overlay-text' id='coordinate'></span><br>
    
  </div>
</body>
</html>