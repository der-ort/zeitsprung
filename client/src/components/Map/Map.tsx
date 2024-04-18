import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer, LayersControl, LayerGroup} from 'react-leaflet';
import L from 'leaflet';
import { waypoints } from '../../App'; // import Mock Data
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

interface MapProps {

}

const Map: FC<MapProps> = () => {
    const startCoords = [51.505, -0.09];
    //const mapRef = useRef(null); // create a handler that can later be used to manipulate the map data...

  return (
    <>
        <MapContainer
        // {className="full-map"}
        className="map"
        center={startCoords} // center the map around the start coords
        zoom={6}
        minZoom={1}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}>
        
         {/* <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />  */}
        
        {/* <TileLayer
          attribution="Google Maps"
          url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        /> */}

        <LayersControl>
        <LayersControl.BaseLayer checked name="Stadia Outdoor">
        <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
        /> 
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer  name="Stadia Alidade Satellite">
        <TileLayer
            attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png'
        /> 
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Stanford's Library Map of London 1886">
        <TileLayer
            attribution='&copy; <a href="https://mapwarper.net/maps/55847" target="_blank">Mapwarper</a>'
            url='https://mapwarper.net/maps/tile/55847/{z}/{x}/{y}.png'
        /> 
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Historical Americas">
        <TileLayer
            attribution='&copy; <a href="https://mapwarper.net/maps/32196" target="_blank">Mapwarper</a>'
            url='https://mapwarper.net/maps/tile/32196/{z}/{x}/{y}.png '
        /> 
        </LayersControl.BaseLayer>
        
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Maps">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Map Satellite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <TileLayer url="https://www.google.com/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
        
        <MarkerClusterGroup>
                {waypoints.map(waypoint => {
                    // create a custom Marker that displays the actual photo
                    
                    const imageIcon = new L.Icon({
                        iconUrl: waypoint.imageURL,
                        iconSize: [50, 50],  
                        iconAnchor: [25, 25],  
                        popupAnchor: [0, -25],
                        className: 'leafletMarkerIcon'
                    });

                    return (
                        <Marker
                            key={waypoint.id}
                            position={waypoint.coordinates}
                            icon={imageIcon}
                        >
                            <Popup>
                                {waypoint.description}
                                <br />
                                {new Date(waypoint.captureDate).toLocaleString()}
                                <img src={waypoint.imageURL} alt="Waypoint view" style={{ width: '100%' }} />
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
    </>
  );
};

export default Map;