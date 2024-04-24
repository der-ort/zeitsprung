import { FC , useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer, LayersControl, useMap} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
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

    // Function that gets called everytime the map refreshes to set the bounds of the map to show all assets of the day on the map
    const MapBoundsAdjuster = ({ assets }) => {
      const map = useMap();
    
      useEffect(() => {
        if (assets.length > 0) {
          const bounds = new L.LatLngBounds(assets.map(asset => asset.coordinates));
          map.fitBounds(bounds,{ maxZoom: 13, minZoom: 3, padding: [100,100]} );
        }
      }, [assets, map, currentAssets]);
    
      return null;
    };

    return (
    <>
        <MapContainer
          className="map"
          center={startCoords} // center the map around the start coords
          zoom={6}
          minZoom={3}
          maxZoom={18}
          maxBounds={[[-85.06, -180], [85.06, 180]]} // TO DO: make the map center dynamic to the center of the actual trip
          scrollWheelZoom={true}
        >

        
        {/* ITERATE THROUGH MAP SOURCES AND CREATE LAYER SELECTOR*/}
        <LayersControl>
          {mapLayers.map((mapLayer) => (
            <LayersControl.BaseLayer 
              {...(mapLayer.name === 'Stadia Outdoor' ? { checked: true } : {})} // Put the name of the default map here... move up with variable and ultimately put it in .env 
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
                {
                currentAssets.map(asset => {
                  // compose the link for the asset placed on the map file:
                  const assetURL = 'http://localhost:3000/' + asset.fileLocation;
                  const assetExifData = JSON.parse(asset.exifData);
                  isNaN(asset.coordinates[0]) || isNaN(asset.coordinates[0]) ? asset.coordinates =  [0,0] : null;

                  // create a new Instance of Marker that displays the actual photo, will get reused down below
                    const imageIcon = new L.Icon({
                        iconUrl: assetURL,
                        iconSize: [64, 64],  
                        iconAnchor: [25, 25],  
                        popupAnchor: [0, -25]
                    });

                    // TO DO: Add a switch for markers depending on asset type (photo, note, document etc...)
                    // then render accordingly
                    return <>
                        <Marker
                            key={asset.id}
                            position={asset.coordinates}
                            icon={imageIcon}
                        >
                            <Popup>
                                <h3>{asset.description}</h3>
                                <img src={assetURL} 
                                     alt={asset.description}  
                                     style={{ width: '100%' }} 
                                />
                                {/* // Rendering EXIF Data in a table */}
                                <div className='exif-table-wrapper'>
                                  <KeyValueTable data={assetExifData} 
                                                 head={false} 
                                  /> 
                                </div>

                                <br />
                            </Popup>
                        </Marker>
                    </>
                })}
            </MarkerClusterGroup>

            {/* ADJUST MAP BOUNDS ON EACH RERENDER TO SHOW ALL ASSETS ON MAP */}
            <MapBoundsAdjuster assets={currentAssets} />

        </MapContainer>
    </>
  );
};

export default Map;