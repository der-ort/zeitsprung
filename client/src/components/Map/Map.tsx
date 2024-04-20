import { FC , useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer, LayersControl, useMap} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { DateTime } from "luxon";
import { Asset } from '../../models/types';
import { mapLayers } from './MapSources';
import KeyValueTable from './KeyValueTable';

interface MapProps {
  currentAssets: Asset[];
}

// THE MAIN MAP

const Map: FC<MapProps> = ({currentAssets}) => {

    // define the coordinates where to center the map. should later be taken from the trip.locationCenter-property
    const startCoords = [51.505, -0.09];

    //const mapRef = useRef(null); // create a handler that can later be used to manipulate the map data... seems deprecated


    // Function that gets called everytime the map refreshes to set the bounds of the map to show all assets of the day on the map
    const MapBoundsAdjuster = ({ assets }) => {
      const map = useMap();
    
      useEffect(() => {
        if (assets.length > 0) {
          const bounds = new L.LatLngBounds(assets.map(asset => asset.coordinates));
          map.fitBounds(bounds,{ minZoom: 1, padding: [50,50]} );
        }
      }, [assets, map]);
    
      return null;
    };

    return (
    <>
        <MapContainer
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
                  // compose the link for the asset placed on the map file:
                  const assetURL = 'http://localhost:3000/' + asset.fileLocation; //hardcoded for now
                  const assetExifData = JSON.parse(asset.exifData);

                  // create a custom Marker that displays the actual photo
                    const imageIcon = new L.Icon({
                        iconUrl: assetURL,
                        iconSize: [64, 64],  
                        iconAnchor: [25, 25],  
                        popupAnchor: [0, -25]
                    });

                    // TO DO: Add a switch for markers depending on asset type (photo, note, document etc...)
                    
                    return <>
                        <Marker
                            key={asset.id}
                            position={asset.coordinates}
                            icon={imageIcon}
                        >
                            <Popup>
                                <h3>{asset.description}</h3>
                                <img src={assetURL} alt="Waypoint view" style={{ width: '100%' }} />
                                <div className='exif-table-wrapper'>
                                <KeyValueTable data={assetExifData} head={false} /> 
                                </div>
                                <br />
                                {DateTime.fromMillis(Number(asset.captureDate)).toLocaleString()} 
                            </Popup>
                        </Marker>
                    </>
                })}
            </MarkerClusterGroup>

            {/* ADJUST MAP BOUNDS TO CURRENT MARKERS INSIDE THE MAP */}
            <MapBoundsAdjuster assets={currentAssets} />
        </MapContainer>
    </>
  );
};

export default Map;