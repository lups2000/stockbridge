import React, { FC, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import markerIcon from '../../assets/marker.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PopulatedAdvert } from '../../api/collections/advert';
import deleteIcon from '../../assets/deleteX.svg';
import { Image } from 'react-bootstrap';
import { AdvertCard } from '../Adverts/AdvertCard';

interface CustomMapProps {
  adverts: PopulatedAdvert[] | undefined;
  onChangeModality: () => void;
}

export const CustomMap: FC<CustomMapProps> = (props) => {
  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [38, 38],
  });

  const [userLocation, setUserLocation] = useState({
    lat: 48.137154,
    lng: 11.576124,
  }); //munich coordinates

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLoading(false);
      } catch (error) {
        console.error('Error getting user location:', error);
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    //custom goBack function
    const handleCustomBack = () => {
      props.onChangeModality()
    };

    window.onpopstate = handleCustomBack;

    return () => {
      window.onpopstate = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {!isLoading ? (
        <>
          <MapContainer
            style={{ height: '100vh', position: 'relative' }}
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
              {props.adverts &&
                props.adverts.map((advert, index) => {
                  const lng = advert.store?.location?.coordinates[0];
                  const lat = advert.store?.location?.coordinates[1];
                  if (!lng || !lat) {
                    return undefined;
                  }
                  return (
                    <Marker
                      key={index}
                      position={[lat, lng] as LatLngExpression}
                      icon={customIcon}
                    >
                      <Popup>
                        <AdvertCard
                          key={index + "advert_card"}
                          id={advert._id}
                          name={advert.productname}
                          price={advert.price}
                          quantity={advert.quantity}
                          icon={advert.imageurl}
                          description={advert.description}
                          prioritized={advert.prioritized}
                          creationDate={advert.createdAt}
                          fancyEffect={false}
                        />
                      </Popup>
                    </Marker>
                  );
                })}
            </MarkerClusterGroup>
          </MapContainer>
          <Image
            src={deleteIcon}
            alt="deleteIcon"
            width={40}
            height={40}
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
              zIndex: 9999,
              cursor: 'pointer',
            }}
            onClick={() => props.onChangeModality()}
          />
        </>
      ) : undefined}
    </div>
  );
};
