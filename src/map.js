
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import './map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Delete previous icon URL settings
delete L.Icon.Default.prototype._getIconUrl;

// Set marker icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const sellerLocation = [26.509962683183357, 80.23217216901267];   //hall 1 coordinates

const RoutingMachine = ({ userLocation, sellerLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(sellerLocation[0], sellerLocation[1])
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, sellerLocation]);

  return null;
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  // Get user location using the Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location: ", error);
      }
    );
  }, []);

  // Render map only when userLocation is available
  return userLocation ? (
    <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} className='MapContainer'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userLocation}>
        <Popup>
          Your Location 
        </Popup>
      </Marker>
      <Marker position={sellerLocation}>
        <Popup>
          Seller Location
        </Popup>
      </Marker>
      <RoutingMachine userLocation={userLocation} sellerLocation={sellerLocation} />
    </MapContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
