import type { Metadata } from 'next';
import React from 'react';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to write a Review.',
};

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
