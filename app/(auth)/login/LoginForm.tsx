import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import BlogSection from './BlogSection';
import WelcomeBackSection from './WelcomeBackSection';

type Props = {
  searchParams?: {
    returnTo?: string | string[];
  };
};

export default async function LoginForm({ searchParams }: Props) {
  const { returnTo } = searchParams || {};

  // Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // Check if the sessionToken is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  // If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect('/');
  }

  // If the sessionToken cookie is invalid or doesn´t exist, show the register form
  return (
    <div className={styles.pageContainer}>
      <WelcomeBackSection />
      <AuthForm initialMode="login" returnTo={returnTo} />
      <BlogSection />
    </div>
  );
}
