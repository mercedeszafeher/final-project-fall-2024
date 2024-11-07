'use client';

import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import WelcomeSection from './WelcomeSection';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function RegisterPage(props: Props) {
  const { returnTo } = await props.searchParams;

  return (
    <div className={styles.pageContainer}>
      <WelcomeSection />
      <AuthForm initialMode="register" returnTo={returnTo} />
    </div>
  );
}
