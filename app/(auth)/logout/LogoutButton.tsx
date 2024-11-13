'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from './actions';
import styles from './LogoutButton.module.scss';

export default async function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.logoutButton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
