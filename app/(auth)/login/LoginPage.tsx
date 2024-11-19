'use client';

import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
  const { returnTo } = await props.searchParams;

  return (
    <div className={styles.pageContainer}>
      <AuthForm initialMode="login" returnTo={returnTo} />
    </div>
  );
}
