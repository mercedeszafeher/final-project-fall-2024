import Image from 'next/image';
import React from 'react';
import styles from './WelcomeSection.module.scss';

export default function WelcomeSection() {
  return (
    <div className={styles.welcomeSection}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/high-buildings.jpg"
          alt="Neighborhood view"
          width={400}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>Discover Your Next Neighborhood</h2>
        <p>
          Welcome to RaterHood, your trusted guide to finding the perfect place
          to call home. Explore detailed insights on neighborhoods, check out
          reviews from others, and make informed decisions as you plan your
          move. Whether you’re looking for a quiet corner or a bustling
          community, we’re here to help you find the best fit.
        </p>
      </div>
    </div>
  );
}
