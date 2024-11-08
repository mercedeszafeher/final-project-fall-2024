'use client';

import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import WelcomeBackSection from './WelcomeBackSection';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
  const { returnTo } = (await props.searchParams) || {};

  return (
    <div className={styles.pageContainer}>
      <WelcomeBackSection />
      <AuthForm initialMode="login" returnTo={returnTo} />
    </div>
  );
}
