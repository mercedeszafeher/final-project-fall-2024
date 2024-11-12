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

  return (
    <div className={styles.pageContainer}>
      <WelcomeBackSection />
      <AuthForm initialMode="login" returnTo={returnTo} />
      <BlogSection />
    </div>
  );
}
