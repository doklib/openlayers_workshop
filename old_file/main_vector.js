import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import {Style, Fill, Stroke} from 'ol/style';
import {getArea} from 'ol/sphere';
import colormap from 'colormap';



const source = new VectorSource();

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//sync(map);

const style1 = new Style({
    fill: new Fill({
      color: 'red'
    }),
    stroke: new Stroke({
      color: 'white'
    })
});
const style2 = new Style({
    fill: new Fill({
      color: 'blue'
    }),
    stroke: new Stroke({
      color: 'white'
    })
});

//## Making it look nice
const layer = new VectorLayer({
    source: source,
    // style: function(feature, resolution) {
    //     const name = feature.get('name').toUpperCase();
    //     return name < "N" ? style1 : style2; // assuming these are created elsewhere
    // }
    style: function(feature) {
        return new Style({
          fill: new Fill({
            color: getColor(feature)
          }),
          stroke: new Stroke({
            color: 'rgba(255,255,255,0.8)'
          })
        });
      }
  });
map.addLayer(layer);

map.addInteraction(new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON]
  }));

map.addInteraction(new Modify({
    source: source
  }));

map.addInteraction(new Draw({
    type: 'Polygon',
    source: source
  }));

map.addInteraction(new Snap({
    source: source
  }));

//## Downloading features  
const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
    source.clear();
});
const format = new GeoJSON({FeatureProjection: 'EPGS:3857'});
const download = document.getElementById('download');
source.on('change', function() {
    const features = source.getFeatures();
    const json = format.writeFeatures(features);
    download.href = 'data:text/json;charset=utf-8,' + json;
});

//## Styling based on geometry area

const min = 1e8; // the smallest area
const max = 2e13; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'blackbody',
  nshades: steps
});

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function getColor(feature) {
  const area = getArea(feature.getGeometry());
  const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}

  
