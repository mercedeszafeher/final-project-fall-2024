import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import TestimonialsSection from './TestimonialsSection';
import WelcomeSection from './WelcomeSection';

type Props = {
  searchParams?: {
    returnTo?: string | string[];
  };
};

export default async function RegisterForm({ searchParams }: Props) {
  const { returnTo } = searchParams || {};

  // Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToke');

  // Check if the sessionToken is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  // If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.pageContainer}>
      <WelcomeSection />
      <AuthForm initialMode="register" returnTo={returnTo} />
      <TestimonialsSection />
    </div>
  );
}
