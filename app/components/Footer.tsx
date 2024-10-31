import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} RaterHood. All rights reserved.</p>
      <p> Near or far. | Your trusted guide for discovering neighborhoods.</p>
      <p>
        Contact Us:{' '}
        <a href="mailto:support@raterhood.com">support@raterhood.com</a>
      </p>
      <p>Follow Us: @RaterHood</p>
      <div className={styles.socialIcons}>
        {/* Optional: Add social media icons here */}
      </div>
      <p>
        <Link href="/#">Terms & Conditions</Link> |{' '}
        <Link href="/#">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
