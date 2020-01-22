window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center : [ 14135652.514834214, 4520180.104672182 ],
            zoom: 18
           // ,rotation: 0.5
        }),
        // layers: [
        //     new ol.layer.Tile({
        //         source: new ol.source.OSM()
        //     })
        // ],
        target: 'js-map'
    })

    //Basemaps Layers
    const osmStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'OSMStandard'
    })

    const vWorld = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png'
        }),
        visible: true,
        title: 'vWorld'
    })

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'StamenTerrain'
    })
    //map.addLayer(stamenTerrain);

    //Layer Broup
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            osmStandard, vWorld, stamenTerrain
        ]
    })
    map.addLayer(baseLayerGroup);

    // Layer Switcher Logic for Basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
   
    for(let baseLayerElement of baseLayerElements){
       baseLayerElement.addEventListener('change', function(){
           let baseLayerElementValue = this.value;
           baseLayerGroup.getLayers().forEach(function(element, index, array){
               let baseLayerTitle = element.get('title');
               element.setVisible(baseLayerTitle === baseLayerElementValue);
               console.log(element.get('title'), element.get('visible'));
           })
       })
    }

    // Vector Layers
    const fillStyle = new ol.style.Fill({
        color: [84, 118, 255, 1]
    })

    const strokeStyle = new ol.style.Stroke({
        color: [45, 46, 45, 1],
        width: 1.2
    })
    const circleStyle = new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [255, 24, 5, 1]
        }),
        radius: 7,
        stroke: strokeStyle
    })


    const SeoulAreaGeoJSON = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/vector_data/area.geojson',
            format: new ol.format.GeoJSON()
        }),
        visibile: true,
        title: 'SeoulAreaGeoJSON',
        style: new ol.style.Style({
            fill: fillStyle,
            stroke: strokeStyle,
            image: circleStyle
        })
    })
    map.addLayer(SeoulAreaGeoJSON);

    // Vector Feature Popup Logic
    map.on('click', function(e){
      //  console.log(e);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
            let clickedFeatureName = feature.get('name');
            let clickedFeatureAdditionInfo = feature.get('additionalInfo');
            console.log(clickedFeatureName,clickedFeatureAdditionInfo);
        })
    })
}