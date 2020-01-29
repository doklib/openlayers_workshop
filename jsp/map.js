window.onload = init;
// Attribution Control
const attributionControl = new ol.control.Attribution({
  collapsible: true
})

function init(){
  const map = new ol.Map({
	  view: new ol.View({
          center : [ 14135652.514834214, 4520180.104672182 ],
         // center: [0, 0],
          zoom: 15,
        //  minZoom: 10,
          maxZoom: 19
      }),   
    target: 'map',
    controls: ol.control.defaults({attribution: false}).extend([attributionControl])
  })

  // Base Layers
 // 브이월드
  const vworldMap = new ol.layer.Tile({
	  source: new ol.source.XYZ({
		  url: 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png'
	  }),
    visible: true,
    title: 'Vworld'        
  })
  // Openstreet Map Standard
  const openstreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),    
    visible: false,
    title: 'OSMStandard'        
  })

  // Openstreet Map Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OSMHumanitarian'
  })

  // Bing Maps Basemap Layer
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "Your Bingmaps API Key Here",
      imagerySet: 'CanvasGray'  // Road, CanvasDark, CanvasGray
    }),
    visible: false,
    title: 'BingMaps'
  })

  // CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      attributions: '© CARTO'
    }),
    visible: false,
    title: 'CartoDarkAll'
  })

  // Stamen basemap layer
  const StamenTerrainWithLabels = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: 'terrain-labels',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrainWithLabels'
  })
  
  const StamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrain'
  })

  // Base Vector Layers
  // Vector Tile Layer OpenstreetMap
  const openstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
        url:'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=Cw0pA7B7B54FjKGg2cc4',
      format: new ol.format.MVT(),
      attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }),
    visible: false,
    title: 'VectorTileLayerOpenstreetMap'
  })
 
  const openstreetMapVectorTileStyles = 'https://api.maptiler.com/maps/9bb062f5-fb4f-4025-9031-db9e2e8b6ecd/style.json?key=Cw0pA7B7B54FjKGg2cc4';
  fetch(openstreetMapVectorTileStyles).then(function(response) {    
    response.json().then(function(glStyle) {       
        olms.applyStyle(openstreetMapVectorTile, glStyle, 'c8d958ad-ff6d-4678-9730-893520ecf11a');
    });
  });


  // Base Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandard, openstreetMapHumanitarian, bingMaps, cartoDBBaseLayer,
      StamenTerrainWithLabels, StamenTerrain, openstreetMapVectorTile, vworldMap
    ]
  })
  map.addLayer(baseLayerGroup);

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
  for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, array){
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName === baseLayerElementValue)
      })
    })
  }
  

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
    title: 'TileDebugLayer'
  })

  // tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer",
      attributions: 'Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government'
    }),
    visible: false,
    title: 'TileArcGISLayer'
  })  

  // GEOSERVER Vector WFS Layer
//  var GeoserverWFSSource = new ol.layer.Vector({
//	  source: new ol.source.Vector({
//		  
//		 format : new ol.format.GeoJSON(),
//	     url: function(extent){
//	    return 'http://localhost:8080/geoserver/tutorial/wfs?service=WFS&'+
//	    'version=1.1.0&'+
//         'request=GetFeature&'+
//         'typename=tutorial:AF01_BeaconOut&' +
//         'outputFormat=application/json&'+
//         'srsname=EPSG:5186&'+
//         'bbox=' + extent.join(',') + ',EPSG:5186';
//         },
//         strategy: ol.loadingstrategy.bboxStrategy,
////	     params: {
////	    	 	//service : 'WFS',
////				VERSION : '1.1.0',
////				request : 'GetFeature',
////				typeNames : 'tutorial:AF01_BeaconOut',
////				outputFormat: 'application/json',
////				//LAYERS : 'tutorial:AF01_BeaconOut',
////				//WIDTH : 478,
////				//HEIGHT : 768,
////				//STYLES : 'population_density',
////				SRS : 'EPSG:5186'
////				//,ILED : true
////				//,cql_filter : 'major>=21110;BEYOND(geom,point(37.576503 126.980450),587580,meters);include'
////					//'major=21110 OR major>21111 OR major=1;type>15;type=1'   //'major>21110'//  'type=1''major>21110''type=4'
////				
////			},
//         
////			serverType : 'geoserver',
////			crossOrigin: 'anonymous'
//	  	}),
//		    visible: true,
//		    title: 'GeoserverWFSSource'
//	})
  
//  var GeoserverWFSSource = new ol.layer.Vector({
//    source: GeoserverWFSSource,
//    style: new ol.style.Style({
//      stroke: new ol.style.Stroke({
//        color: 'rgba(0, 0, 255, 1.0)',
//        width: 2
//      })
//    })
//  });
////generate a GetFeature request
//  var featureRequest = new ol.format.WFS().writeGetFeature({
//    srsName: 'EPSG:5186',
//    featureNS: 'http://localhost:8088/tutorial/main.jsp',
//    featurePrefix: 'tutorial',
//    featureTypes: ['AF01_BeaconOut'],
//    outputFormat: 'application/json'
//   // filter: ol.format.filter.and(
//    //  like('major', '21110*'),
//    //	equalToFilter('major', '21110')
//    //)
//  });
//
//  // then post the request and add the received features to a layer
//  fetch('http://localhost:8080/geoserver/tutorial/wfs', {
//    method: 'POST',
//    body: new XMLSerializer().serializeToString(featureRequest)
//  }).then(function(response) {
//    return response.json();
//  }).then(function(json) {
//    var features = new GeoJSON().readFeatures(json);
//    GeoserverWFSSource.addFeatures(features);
//    map.getView().fit(vectorSource.getExtent());
//  });
  var wmsSource = new ol.source.TileWMS({
		     url: 'http://localhost:8080/geoserver/tutorial/wms',
		     params: {
					VERSION : '1.1.1',
					LAYERS : 'tutorial:AF01_BeaconOut,tutorial:AF01_Path,tutorial:AF01_Base',
					//FORMAT: 'application/json;type=utfgrid',
					//LAYERS : 'tutorial:AF01_BeaconOut',
					//WIDTH : 478,
					//HEIGHT : 768,
					//STYLES : 'population_density',
					SRS : 'EPSG:5186',
					TILED : true
					,cql_filter : 'major>=21110;BEYOND(geom,point(37.576503 126.980450),587580,meters);include'
						//'major=21110 OR major>21111 OR major=1;type>15;type=1'   //'major>21110'//  'type=1''major>21110''type=4'
					
				},
				serverType : 'geoserver',
				crossOrigin: 'anonymous'
		  	});
  //GEOSERVER WMS Layer
  var GeoserverWMSSource = new ol.layer.Tile({
	  source: wmsSource
//		  new ol.source.TileWMS({
//	     url: 'http://localhost:8080/geoserver/tutorial/wms',
//	     params: {
//				VERSION : '1.1.1',
//				LAYERS : 'tutorial:AF01_BeaconOut,tutorial:AF01_Path,tutorial:AF01_Base',
//				//FORMAT: 'application/json;type=utfgrid',
//				//LAYERS : 'tutorial:AF01_BeaconOut',
//				//WIDTH : 478,
//				//HEIGHT : 768,
//				//STYLES : 'population_density',
//				SRS : 'EPSG:5186',
//				TILED : true
//				,cql_filter : 'major>=21110;BEYOND(geom,point(37.576503 126.980450),587580,meters);include'
//					//'major=21110 OR major>21111 OR major=1;type>15;type=1'   //'major>21110'//  'type=1''major>21110''type=4'
//				
//			},
//			serverType : 'geoserver',
//			crossOrigin: 'anonymous'
//	  	})
  ,
		    visible: true,
		    title: 'GeoserverWMSSource'
	});
  
  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?',
      params:{
        LAYERS: 5,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: '<a href=https://nowcoast.noaa.gov/>© NOAA<a/>'
    }),
    visible: false,
    title: 'NOAAWMSLayer'
  })

  // Static Image OpenstreetMap
  const openstreetMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: './data/static_images/openlayers_static_humanitarian.PNG',
      imageExtent: [4991698.9328313675, 5050292.393744084, 10008191.828130603, 10013417.911357462],
      attributions: '<a href=https://www.openstreetmap.org/copyright/>© OpenStreetMap contributors<a/>',
    }),
    title: 'openstreetMapFragmentStatic'
  })

  
  // Vector Layers
  // Styling
  const fillStyle = new ol.style.Fill({
    color: [40, 119, 243, 1]
  })
  

  // Style for lines
  const stokeStyle = new ol.style.Stroke({
    color: [30, 30, 30, 1],
    width: 2,
    //lineCap: 'square',
   // lineJoin: 'bevel',
   // lineDash: [3,6]
  })

  // 
  const reqularShape = new ol.style.RegularShape({
    fill: new ol.style.Fill({
      color: [245, 12, 5, 1]
    }),
    stroke: stokeStyle,
    points: 5,
    radius1: 10,
    radius2: 5,
    rotation: 0.5

  })
  const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [245, 12, 5, 1]
    }),
    stroke: stokeStyle,
    radius: 10,
  })

  // Icon Marker Style
  const iconMarkerStyle = new ol.style.Icon({
    src: './data/static_images/marker.png',
    size: [100, 100],
    offset:[0, 0],
    opacity: 1,
    scale: 0.5,
    color:[40, 119, 243, 1]
  })

  //seoul
  const SeoulAreaGeoJSON = new ol.layer.VectorImage({
      source: new ol.source.Vector({
          url: './data/vector_data/area.geojson',
          format: new ol.format.GeoJSON()
      }),
      visibile: true,
      title: 'SeoulAreaGeoJSON',
      style: new ol.style.Style({
          fill: fillStyle,
          stroke: stokeStyle,
          image: iconMarkerStyle
      })
  })
  // Central EU Countries GeoJSON VectorImage Layer
  const EUCountriesGeoJSONVectorImage = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/vector_data/Central_EU_countries_GEOJSON.geojson',
      format: new ol.format.GeoJSON()
    }),
    visible: false,
    title: 'CentralEUCountriesGeoJSON',
    style: new ol.style.Style({
      fill: fillStyle,
      stroke: stokeStyle,
      image: iconMarkerStyle
    }) 
  })
  
  // Central EU Countries KML
  const EUCountriesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: './data/vector_data/Central_EU_countries_KML.kml',
      format: new ol.format.KML()
    }),
    visible: false,
    title: 'CentralEUCountriesKML'
  })
  
  // HeatMap
  const heatMapOnlineFBUsers = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      url: './data/vector_data/onlineFBUsers.geojson',
      format: new ol.format.GeoJSON()
    }),
    radius: 20,
    blur: 12,
    gradient: ['#DC143C', '#DC143C', '#000000', '#000000', '#000000'],
    title: 'OnlineFBUsers',
    visible: false
  })
  
  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers:[
      tileArcGISLayer, NOAAWMSLayer, tileDebugLayer, openstreetMapFragmentStatic,
      EUCountriesGeoJSONVectorImage, EUCountriesKML, heatMapOnlineFBUsers,
      SeoulAreaGeoJSON
      , GeoserverWMSSource
     // , GeoserverWFSSource
    ]
  })
  map.addLayer(layerGroup);

  // Layer Switcher Logic for Raster Tile Layers
  const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
  for(let tileRasterLayerElement of tileRasterLayerElements){
    tileRasterLayerElement.addEventListener('change', function(){
      let tileRasterLayerElementValue = this.value;
      let tileRasterLayer;

      layerGroup.getLayers().forEach(function(element, index, array){
        if(tileRasterLayerElementValue === element.get('title')){
          tileRasterLayer = element;
        }
      })
      this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false)
    })
  }

  // Vector Feature Popup Information
  const overlayContainerElement = document.querySelector('.overlay-container')
  const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
  })
  map.addOverlay(overlayLayer);
  const overlayFeatureName = document.getElementById('feature-name');
  const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');
  const overlayCoordinate = document.getElementById('coordinate');
  const overlayInfo = document.getElementById('info');


  //ev
  map.on('singleclick', function(evt) {
	  document.getElementById('info').innerHTML = '';
	  var viewResolution = /** @type {number} */ 3;
	  var url = wmsSource.getFeatureInfoUrl(
	    evt.coordinate, viewResolution, 'EPSG:3857',
	    {'INFO_FORMAT': 'text/html'});
	  if (url) {
	    fetch(url)
	      .then(function (response) { return response.text(); })
	      .then(function (html) {
	    	  overlayInfo.innerHTML = html;
	      });
	  }
	});
  // Vector Feature Popup Logic
  map.on('click', function(e){
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedFeatureName = feature.get('name');
      let clickedFeatureAdditionInfo = feature.get('additionalinfo');
      //if(clickedFeatureName && clickedFeatureAdditionInfo != undefined){
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionInfo;
        overlayCoordinate.innerHTML = clickedCoordinate;
        overlayInfo.innerHTML = clickedFeatureName + clickedFeatureAdditionInfo + clickedCoordinate;
        
      //}
    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title')  === 'SeoulAreaGeoJSON' 
      }
    })
  })
}


