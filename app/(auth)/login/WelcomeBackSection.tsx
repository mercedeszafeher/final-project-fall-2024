'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './WelcomeBackSection.module.scss';

interface City {
  city_id: number;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  mapUrl: string | null;
}

export default function WelcomeBackSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    if (cities.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, cities]);

  const handlePrev = () => {
    const index = (currentIndex - 1 + cities.length) % cities.length;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const index = (currentIndex + 1) % cities.length;
    setCurrentIndex(index);
  };

  const currentCity = cities[currentIndex];

  if (isLoading) {
    return (
      <section className={styles.welcomeBackSection}>
        <p className={styles.loadingMessage}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.welcomeBackSection}>
        <p className={styles.errorMessage}>{error}</p>
      </section>
    );
  }

  if (cities.length === 0) {
    return (
      <section className={styles.welcomeBackSection}>
        <p className={styles.errorMessage}>
          No cities available at the moment.
        </p>
      </section>
    );
  }

  if (!currentCity) {
    return (
      <section className={styles.welcomeBackSection}>
        <p className={styles.errorMessage}>City data is unavailable.</p>
      </section>
    );
  }

  return (
    <section className={styles.welcomeBackSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.subtitle}>
          Check out the new cities that have just received their first ratings:
        </p>
      </div>
      <div className={styles.mainContent}>
        {/* Left Arrow */}
        <button
          className={styles.arrow}
          onClick={handlePrev}
          aria-label="Previous City"
        >
          &#8592;
        </button>

        {/* City Card */}
        <div className={styles.cityBox}>
          <div className={styles.imageContainer}>
            <Image
              src={currentCity.imageUrl}
              alt={`${currentCity.name}, ${currentCity.country}`}
              layout="fill"
              className={styles.image}
              priority
            />
          </div>
          <h3 className={styles.cityName}>{currentCity.name}</h3>
          <p className={styles.country}>{currentCity.country}</p>
          <p className={styles.description}>{currentCity.description}</p>
          {currentCity.mapUrl && (
            <a
              href={currentCity.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              View on Map
            </a>
          )}
        </div>

        {/* Right Arrow */}
        <button
          className={styles.arrow}
          onClick={handleNext}
          aria-label="Next City"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
