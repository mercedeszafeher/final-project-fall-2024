'use client';

import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <AuthForm initialMode="login" />
    </div>
  );
}
