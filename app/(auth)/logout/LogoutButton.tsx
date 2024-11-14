'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from './actions';
import styles from './LogoutButton.module.scss';

export default async function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </form>
  );
}
