'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSafeReturnPath } from '../../util/validation';
import ErrorMessage from '../ErrorMessage';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  initialMode: 'login' | 'register';
  returnTo?: string | string[];
}

export default function AuthForm({ initialMode, returnTo }: AuthFormProps) {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [isMobileView, setIsMobileView] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setErrors([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint = isRegister ? '/api/register' : '/api/login';
    const body = isRegister
      ? { username, email, password }
      : { email, password };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    // router.push(`/profile/${data.user.username}`);

    router.push(
      getSafeReturnPath(returnTo) || `/profile/${data.user.username}`,
    );
  };

  return (
    <div
      className={`${styles.authContainer} ${isRegister && !isMobileView ? styles.rightPanelActive : ''}`}
    >
      {isMobileView ? (
        // Mobile View: Only show the active form with a toggle button
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <h1>{isRegister ? 'Create Account' : 'Sign In'}</h1>
            {isRegister && (
              <input
                className={styles.authInput}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            )}
            <input
              className={styles.authInput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <input
              className={styles.authInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <button className={styles.authButton} type="submit">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
            <br />
            <button
              type="button"
              className={styles.switchButton}
              onClick={toggleAuthMode}
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : 'New here? Sign Up'}
            </button>

            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
          </form>
        </div>
      ) : (
        // Desktop View: Both forms with overlay
        <>
          <div
            className={`${styles.formContainer} ${styles.signUpContainer}`}
            style={{ display: isRegister ? 'block' : 'none' }}
          >
            <form onSubmit={handleSubmit}>
              <h1>Create an Account</h1>
              <div className={styles.socialContainer}>
                <a href="#" className={styles.socialIconLink}>
                  <i className="facebook"></i>
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <i className="google"></i>
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <i className="instagram"></i>
                </a>
              </div>
              <input
                className={styles.authInput}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
              <input
                className={styles.authInput}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <input
                className={styles.authInput}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <button className={styles.authButton} type="submit">
                Sign Up
              </button>
              {errors.map((error) => (
                <div key={`error-${error.message}`}>
                  <ErrorMessage>{error.message}</ErrorMessage>
                </div>
              ))}
            </form>
          </div>

          <div
            className={`${styles.formContainer} ${styles.signInContainer}`}
            style={{ display: !isRegister ? 'block' : 'none' }}
          >
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              <div className={styles.socialContainer}>
                <a href="#" className={styles.socialIconLink}>
                  <i className="facebook"></i>
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <i className="google"></i>
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <i className="instagram"></i>
                </a>
              </div>
              <input
                className={styles.authInput}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <input
                className={styles.authInput}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <button className={styles.authButton} type="submit">
                Login
              </button>
              {errors.map((error) => (
                <div key={`error-${error.message}`}>
                  <ErrorMessage>{error.message}</ErrorMessage>
                </div>
              ))}
            </form>
          </div>

          {/* Overlay Section for Desktop */}
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                <h1>Welcome Back, Neighbour!</h1>
                <br />
                <p>
                  Sign in to pick up where you left off in your neighborhood
                  search
                </p>
                <br />
                <button
                  className={`${styles.ghostButton}`}
                  onClick={toggleAuthMode}
                >
                  Sign In
                </button>
              </div>
              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Hi there, Future Neighbour!</h1>
                <br />
                <p>
                  Join us to start uncovering the neighborhoods that fit your
                  lifestyle
                </p>
                <br />
                <button
                  className={`${styles.ghostButton}`}
                  onClick={toggleAuthMode}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
