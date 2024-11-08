'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './WelcomeBackSection.module.scss';

interface City {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  mapUrl: string | null;
}

export default function WelcomeBackSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch('/api/cities');
        const data = await response.json();

        if (response.ok) {
          setCities(data.cities);
        } else {
          throw new Error(data.error || 'Failed to fetch cities');
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        setError('Unable to load cities at this time.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <section className={styles.welcomeBackSection}>
      <div className={styles.container}>
        <div className={styles.arrow}>&#8592;</div>

        <div>
          <h2 className={styles.title}>Welcome Back!</h2>
          <p className={styles.subtitle}>
            Check out the new cities that have just received their first
            ratings:
          </p>
        </div>

        {isLoading ? (
          <p className={styles.loadingMessage}>Loading...</p>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : (
          <div className={styles.citiesGrid}>
            {cities.map((city) => (
              <div
                key={`${city.name}-${city.country}`}
                className={styles.cityCard}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={city.imageUrl}
                    alt={`${city.name}, ${city.country}`}
                    layout="fill"
                    className={styles.image}
                  />
                </div>
                <div className={styles.cityInfo}>
                  <h3 className={styles.cityName}>{city.name}</h3>
                  <p className={styles.country}>{city.country}</p>
                  <p className={styles.description}>{city.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.arrow}>&#8594;</div>
      </div>
    </section>
  );
}
