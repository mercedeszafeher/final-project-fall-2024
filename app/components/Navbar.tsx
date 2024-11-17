import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import styles from './Navbar.module.scss';

const NavBar: React.FC = async () => {
  // Check if the session token cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // Get the current logged-in user from the database using the session token
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo on the left */}
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="RaterHood Logo"
              width={200}
              height={100}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
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
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/register" className={styles.signUpButton}>
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
