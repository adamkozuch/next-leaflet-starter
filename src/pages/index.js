import { useState, useEffect } from 'react';
import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';

import styles from '@styles/Home.module.scss';


const DEFAULT_CENTER = [50.7919438, 19.1380544];

const DEFAULT_CENTER_OTHER = [51.2297, 21.0122];


const markers = [
  { position: [50.7805391, 19.1547722], info: 'Marker 1' },
  { position: [50.789592, 19.1360607], info: 'Marker 2' },
  { position: [50.8007049, 19.1183537], info: 'Marker 3' },
];
export default function Home() {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => console.error('Error getting current position'),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
      <Layout>
        <Head>
          <title>Kontenery PCK</title>
          <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Section>
          <Container>
            <h1 className={styles.title}>Mapa kontenerów PCK</h1>

            <Map
                className={styles.homeMap}
                width="800"
                height="400"
                center={userPosition ?? DEFAULT_CENTER}
                zoom={12}
            >
              {({ TileLayer, Marker, Popup }) => (
                  <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={DEFAULT_CENTER}>
                        <Popup>
                          <a href={`https://maps.google.com/?q=loc:${DEFAULT_CENTER[0]},${DEFAULT_CENTER[1]}`} target="_blank" rel="noopener noreferrer">
                            Open in Google Maps
                          </a>
                        </Popup>
                    </Marker>
                   {markers.map((marker, index) => (
                <Marker key={index} position={marker.position}>
                      <Popup>
                          <a href={`https://maps.google.com/?q=loc:${marker[1]},${marker[0]}`} target="_blank" rel="noopener noreferrer">
                              Open in Google Maps
                          </a>
                      </Popup>
                </Marker>
                  ))}
                    {userPosition && (
                        <Marker position={userPosition}>
                          <Popup>
                            Your current location<br />
                          </Popup>
                        </Marker>
                    )}
                  </>
              )}
            </Map>
          </Container>
        </Section>
      </Layout>
  );
}
