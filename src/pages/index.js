import { useState, useEffect } from 'react';
import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [52.2297, 21.0122];

const DEFAULT_CENTER_OTHER = [51.2297, 21.0122];
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
                        https://maps.google.com/?ll=52.2297,21.0122<br />
                      </Popup>
                    </Marker>
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
