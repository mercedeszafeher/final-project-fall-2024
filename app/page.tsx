'use client';
import AboutComponent from './landingpage/AbouComponent';
import IntroComponent from './landingpage/IntroComponent';
import SignupRedirectComponent from './landingpage/SignupRedirectComponent';
import TestimonialsComponent from './landingpage/TestimonialComponent';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <IntroComponent />
      <AboutComponent />
      <TestimonialsComponent />
      <SignupRedirectComponent />
    </div>
  );
}
