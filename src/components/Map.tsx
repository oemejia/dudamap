import React, { useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 30.2672, // Example coordinates for Austin, TX
  lng: -97.7431
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
};

interface Property {
  id: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
  price: string;
}

const properties: Property[] = [
  {
    id: 1,
    lat: 30.2672,
    lng: -97.7431,
    title: 'Beautiful Home 1',
    imageUrl: 'https://via.placeholder.com/100',
    price: '$500,000'
  },
  {
    id: 2,
    lat: 30.2675,
    lng: -97.7451,
    title: 'Luxurious Condo 2',
    imageUrl: 'https://via.placeholder.com/100',
    price: '$750,000'
  }
];

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' //API Key here
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{ lat: property.lat, lng: property.lng }}
          onMouseOver={() => setSelectedProperty(property)}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div>
            <h3>{selectedProperty.title}</h3>
            <p>{selectedProperty.price}</p>
            <img src={selectedProperty.imageUrl} alt={selectedProperty.title} width="100" />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};


