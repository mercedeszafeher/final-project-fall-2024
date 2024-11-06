'use client';

import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import WelcomeSection from './WelcomeSection';

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}>
      <WelcomeSection />
      <AuthForm initialMode="register" />
    </div>
  );
}
