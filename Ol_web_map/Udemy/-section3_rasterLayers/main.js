window.onload = init;
// attribution
const attributionControl = new ol.control.Attribution({
  collapsible: true
})

function init(){
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      //extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516]
    }),
    target: 'js-map',
    controls: ol.control.defaults({attribution: false}).extend([attributionControl])
  })

  // Base Layers
  // OSM Standard
  const openstreetmapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: 'OSMStandard'
  })
  // OSM Humanitarian
  const openstreetmapHumanitarian =new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OSMHumanitarian'
  })

  // Bing Maps Basemap Layer
  const bingMaps =  new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "AvJbpXFLe-jHDLjWJ5Gq0GKdvUu1yyrktieUh8cQRKSd3i-OOWxdiLXyhcroe8Xo",
      imagerySet: 'CanvasGray'  // Road, CanvasDark, CanvasGray
    }),
    visible: false,
    title: 'BingMaps'
  })

  // CartoDb BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{scale}.png',
      attributions: '© CARTO'
    }),
    visible: false,
    title: 'CartoDarkAll'
  })
  //map.addLayer(cartoDBBaseLayer);

  // StamenTerrain Base Layer
  const stamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrain'
})

  // Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetmapStandard,
      openstreetmapHumanitarian,
      bingMaps,
      cartoDBBaseLayer,
      stamenTerrain
    ]
  })
  map.addLayer(baseLayerGroup);

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
  for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, arry){
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
      url:"http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer", //"http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
      attributions: 'Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government'
    }),
    visible: false,
    title: 'TileArcGISLayer'
  })
  map.addLayer(tileArcGISLayer);

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:"https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailyminairtemp_offsets/MapServer/WMSServer",
      params:{
        LAYERS: 2,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: '<a herf=https://nowcoast.noaa.gov/>© NOAA<a/>'
    }),
    visible: false,
    title: 'NOAAWMSLayer'
  })
  // map.addLayer(NOAAWMSLayer);
  // NOAAWMSLayer.getSource().setAttributions('<a herf=https://nowcoast.noaa.gov/>c NOAA<a/>');
  // NOAAWMSLayer.set('maxZoom',5);

  // Static Image Bing
  const BingMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: './data/static_image/static_image_Bing.PNG',
      imageExtent: [-8760430.82575777, 5028944.964938318, -7508086.554333443, 6247045.447690887],
      attributions: '© 2020 Microsoft Corporation'
    }),
    title: 'BingMapFragmentStatic'
  })
  // Raster  Layer Group
  const rasterLayerGroup = new ol.layer.Group({
    layers:[
      tileDebugLayer,
      NOAAWMSLayer,
      tileArcGISLayer,
      BingMapFragmentStatic
    ]
  })
  map.addLayer(rasterLayerGroup);

  // Layer Switcher Logic for Taster Tile Layers
  const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
  for(let tileRasterLayerElement of tileRasterLayerElements){
    tileRasterLayerElement.addEventListener('change', function(){
     let tileRasterLayerElementValue = this.value;
     let tileRasterLayer;

     rasterTileLayerGroup.getLayers().forEach(function(element, index, array){
       if(tileRasterLayerElementValue === element.get('title')){
         tileRasterLayer = element;
       }
     })
     this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false)
    })
  }

  
  // map.on('click', function(e){
  //   console.log(e.coordinate);
  // })
}


