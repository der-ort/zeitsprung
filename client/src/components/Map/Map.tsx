import React, { FC , useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer, LayersControl, LayerGroup, useMap} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { DateTime } from "luxon";
import { Asset } from '../../models/types';
import { mapLayers } from './MapSources';


interface MapProps {
  currentAssets: Asset[];
}

const Map: FC<MapProps> = ({currentAssets}) => {
    const startCoords = [51.505, -0.09];
    //const mapRef = useRef(null); // create a handler that can later be used to manipulate the map data... seems deprecated

    const MapBoundsAdjuster = ({ assets }) => {
      const map = useMap();
    
      useEffect(() => {
        if (assets.length > 0) {
          const bounds = new L.LatLngBounds(assets.map(asset => asset.coordinates));
          map.fitBounds(bounds,{ minZoom: 1, padding: [50,50]} ); //maxZoom: map.getZoom()
        }
      }, [assets, map]);
    
      return null;
    };

    return (
    <>
        <MapContainer
        // {className="full-map"}
        className="map"
        center={startCoords} // center the map around the start coords
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}>

        
        {/* ITERATE THROUGH MAP SOURCES AND CREATE LAYER SELECTOR*/}
        <LayersControl>
          {mapLayers.map((mapLayer) => (
            <LayersControl.BaseLayer 
              {...(mapLayer.name === 'Stadia Outdoor' ? { checked: true } : {})}
              key={mapLayer.name} 
              name={mapLayer.name}>
              <TileLayer
                attribution={mapLayer.attribution}
                url={mapLayer.url}
              />
            </LayersControl.BaseLayer>
          ))}
      </LayersControl>

        {/* POPULATE THE MAP WITH MARKERS AUTOMATICALLY */}

        <MarkerClusterGroup>
                {currentAssets.map(asset => {
                    // create a custom Marker that displays the actual photo
                    const assetURL = 'http://localhost:3000/' + asset.fileLocation; //hardcoded for now
            
                    const imageIcon = new L.Icon({
                        iconUrl: assetURL,
                        iconSize: [64, 64],  
                        iconAnchor: [25, 25],  
                        popupAnchor: [0, -25]
                    });

                    return (
                        <Marker
                            key={asset.id}
                            position={asset.coordinates}
                            icon={imageIcon}
                        >
                            <Popup>
                                {asset.description}
                                <br />
                                {DateTime.fromMillis(Number(asset.captureDate)).toLocaleString()} 
                                <img src={assetURL} alt="Waypoint view" style={{ width: '100%' }} />
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>

            {/* ADJUST MAP BOUNDS TO CURRENT MARKERS INSIDE THE MAP */}
            <MapBoundsAdjuster assets={currentAssets} />
        </MapContainer>
    </>
  );
};

export default Map;