import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.scss';

const NavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo on the left */}
        <div className={styles.logo}>
          <Link href="/">
            <Image src="" alt="RaterHood Logo" width={150} height={75} />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/review">Review</Link>
          <Link href="/cities">Cities</Link>
        </nav>

        {/* Login and Sign Up buttons */}
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
          <Link href="/signup" className={styles.signUpButton}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
