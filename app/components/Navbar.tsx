import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getUser } from '../../database/users';
import type { Session } from '../../migrations/00013-sessions';
import LogoutButton from './LogoutButton';
import styles from './Navbar.module.scss';

const NavBar: React.FC = async () => {
  // Check if the session token cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // Get the current logged-in user from the database using the session token
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo on the left */}
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/path/to/logo.png"
              alt="RaterHood Logo"
              width={150}
              height={75}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/#">About</Link>
          <Link href="/#">Contact</Link>
          <Link href="/#">Review</Link>
          <Link href="/#">Cities</Link>
        </nav>

        {/* Auth Links or User Info */}
        <div className={styles.authButtons}>
          {user ? (
            <>
              <Link
                href={`/profile/${user.username}`}
                className={styles.profileLink}
              >
                {user.username}
              </Link>
              <LogoutButton className={styles.logoutButton} />{' '}
              {/* Logout button */}
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/signup" className={styles.signUpButton}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
