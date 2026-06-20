'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Provider } from '@/lib/api';
import Link from 'next/link';

// Fix for default marker icons in React-Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ bounds, center }: { bounds?: L.LatLngBounds, center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, 13);
    }
  }, [map, bounds, center]);
  return null;
}

export default function MapComponent({ providers }: { providers: Provider[] }) {

  // Default to Ranchi if no providers
  const defaultCenter: [number, number] = [23.3441, 85.3096];

  let bounds;
  if (providers.length > 0) {
    bounds = L.latLngBounds(providers.map(p => [p.lat, p.lng]));
  }

  return (
    <MapContainer 
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      <MapUpdater bounds={bounds} center={defaultCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {providers.map((provider) => (
        <Marker key={provider.id} position={[provider.lat, provider.lng]}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-brand-navy">{provider.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{provider.type} • {provider.city}</p>
              <Link 
                href={`/providers/${provider.city}/${provider.slug}`}
                className="bg-brand-navy text-white text-xs px-3 py-1.5 rounded-md inline-block w-full text-center"
              >
                View Details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
