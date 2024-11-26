import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up to share your experience',
};

export default async function RegisterPage(props: any) {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
