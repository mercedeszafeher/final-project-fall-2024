import AuthForm from '../../forms/AuthForm';
import styles from '../../forms/AuthForm.module.scss';
import TestimonialsSection from '../../forms/TestimonialsSection';
import WelcomeSection from '../../forms/WelcomeSection';

type Props = {
  searchParams?: {
    returnTo?: string | string[];
  };
};

export default async function RegisterForm({ searchParams }: Props) {
  const { returnTo } = searchParams || {};

  return (
    <div className={styles.pageContainer}>
      <WelcomeSection />
      <AuthForm initialMode="register" returnTo={returnTo} />
      <TestimonialsSection />
    </div>
  );
}
