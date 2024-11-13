import { cookies } from 'next/headers';
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
  const sessionTokenCookie = (await cookies()).get('sessionToke');

  // Check if the sessionToken is still valid

  return (
    <div className={styles.pageContainer}>
      <WelcomeBackSection />
      <AuthForm initialMode="login" returnTo={returnTo} />
      <BlogSection />
    </div>
  );
}
