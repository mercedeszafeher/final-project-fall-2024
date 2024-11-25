'use client';

import Image from 'next/image';
import styles from './AboutComponent.module.scss';

const AboutComponent: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>About RaterHood</h2>
        <p className={styles.description}>
          RaterHood is your go-to platform for discovering and reviewing
          neighborhoods and cities. Whether you're planning a move, a trip, or
          just curious about a specific location, RaterHood provides authentic
          reviews, ratings, and insights shared by real people.
        </p>
        <p className={styles.description}>
          Explore, share, and connect with others to uncover the hidden gems and
          learn more about your favorite places.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/mariaberget-stockholm.jpg"
          alt="About RaterHood"
          width={400}
          height={300}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default AboutComponent;
