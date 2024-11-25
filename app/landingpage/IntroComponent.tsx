'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './IntroComponent.module.scss';

const IntroComponent: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/about');
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/raterhood.jpg"
          alt="RaterHood"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className={styles.overlay}>
        <button className={styles.button} onClick={handleButtonClick}>
          More About Us &rarr;
        </button>
      </div>
    </div>
  );
};

export default IntroComponent;
