'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SignupRedirectComponent.module.scss';

const SignupRedirectComponent: React.FC = () => {
  const router = useRouter();

  const handleSignupRedirect = () => {
    router.push('/register');
  };

  return (
    <section className={styles.signupRedirectSection}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/signup.jpg"
          alt="Join RaterHood"
          width={400}
          height={300}
        />
      </div>

      <div className={styles.content}>
        <h2>Join the RaterHood Community</h2>
        <p>
          Discover, explore, and rate neighborhoods like never before. Become a
          part of our growing community and share your insights with the world.
          Your voice matters!
        </p>
        <button className={styles.signupButton} onClick={handleSignupRedirect}>
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default SignupRedirectComponent;
