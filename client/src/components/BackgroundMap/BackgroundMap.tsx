import { MapContainer, TileLayer } from 'react-leaflet';


// selection of beautiful tileLayers to select from randomly
const tileLayers = [
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
  },
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  },
  {
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
  },
  {
    name: 'Esri Ocean Basemap',
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'
  }
];

const BackgroundMap = () => {

  // select a random tile layer on each page reload

  const randomIndex = Math.floor(Math.random() * (tileLayers.length - 1));
  const currentLayerIndex = randomIndex; 

  return (
    // a map container with all controls disabled
    <MapContainer
      center={[Math.random() * 140 - 70, Math.random() * 320 - 160]} // random center on each refresh, avoiding polar regions by 20° 
      zoom={7}
      className="triplist-background-map"
      style={{ height: '100vh', width: '100vw' }}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      dragging={true}
      touchZoom={false}
      keyboard={false}
      attributionControl={false}>

      
      <TileLayer
        attribution={tileLayers[currentLayerIndex].attribution}
        url={tileLayers[currentLayerIndex].url}
      />

    </MapContainer>
  );
};

export default BackgroundMap;