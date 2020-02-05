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
 	<!-- jQuery -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
 	<!-- ol-ext -->
	<link rel="stylesheet" href="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.css" />
	<script type="text/javascript" src="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.js"></script>

 	
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
        <input type="checkbox" name='LayerCheckbox' value='TileArcGISLayer'>Tile ArcGIS Layer<br>
        <input type="checkbox" name='LayerCheckbox' value='NOAAWMSLayer'>NOAA WMS Layer<br>
        <input type="checkbox" name='LayerCheckbox' value='TileDebugLayer'>Tile Debug Layer<br>
        <input type="checkbox" name='LayerCheckbox' value='SeoulAreaGeoJSON' checked>Seoul GeoJSON<br>
        <input type="checkbox" name='LayerCheckbox' value='GeoserverWMSSource' checked>Geoserver WMS Layer<br>
        <input type="checkbox" name='LayerCheckbox' value='openstreetMapFragmentStatic'>OpenstreetMap Humanitarian Fragment Static<br>
        <input type="checkbox" name='LayerCheckbox' value='CentralEUCountriesGeoJSON'>Central EU Countries GeoJSON<br>
        <!-- <input type="checkbox" name='LayerCheckbox' value='CentralEUCountriesKML'>Central EU Countries KML<br> -->
        <input type="checkbox" name='LayerCheckbox' value='OnlineFBUsers'>HeatMap Online FB Users
  	  <form class="form-inline">
      <h2>거리측정 &nbsp;</h2>
      <select id="type">
        <option value="LineString">Length (LineString)</option>
        <option value="Polygon">Area (Polygon)</option>
        <option value="None">None</option>
      </select>
    </form>
  	  <h2>Info</h2>
  	  <div id="info">지도레이어클릭</div>
  	  <div class="options" >
		<ul><li>
			Screen ppi: <input id="ppi" type="number" onchange="ctrl.set('ppi',this.value); ctrl.setScale()" value='96' />
		</li><li>
      or your screen diagonal:
      <select onchange="setDiagonal(this.value);">
        <option value=0>Diagonal</option>
        <option value=7>7"</option>
        <option value=11.6>11.6"</option>
        <option value=13.3>13.3"</option>
        <option value=14>14"</option>
        <option value=15.6>15.6"</option>
        <option value=17.3>17.3"</option>
        <option value=21>21"</option>
        <option value=24>24"</option>
        <option value=27>27"</option>
      </select>
    </li></ul>
	</div>
  	  
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