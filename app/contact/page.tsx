'use client';
import type { Metadata } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import ContentContainer from '../components/ContentContainer';
import styles from './Contact.module.scss';

/* export const metadata: Metadata = {
  title: 'Contact Us | Raterhood',
  description:
    'Get in touch with Raterhood. We are here to help you make informed decisions when moving to a new city.',
}; */

export default function ContactPage() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State to handle form submission status
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Replace the URL below with your form handling endpoint or service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Form submission failed.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <ContentContainer className={styles.contactContainer}>
      <section className={styles.contactSection}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>
          We'd love to hear from you! Whether you have a question about our
          services, need support, or just want to say hello, feel free to reach
          out.
        </p>

        <div className={styles.contactContent}>
          {/* Contact Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={styles.successMessage}>
                Your message has been sent successfully!
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMessage}>
                There was an error sending your message. Please try again later.
              </p>
            )}
          </form>

          <div className={styles.contactInfo}>
            <h2 className={styles.infoTitle}>Get in Touch</h2>
            <div className={styles.infoItem}>
              <Image
                src="/images/social-icon/address.png"
                alt="Address Icon"
                width={40}
                height={40}
                className={styles.infoIcon}
              />
              <p>
                123 Raterhood Street,
                <br />
                Vienna, Austria, 1230
              </p>
            </div>
            <div className={styles.infoItem}>
              <Image
                src="/images/social-icon/phone.png"
                alt="Phone Icon"
                width={40}
                height={40}
                className={styles.infoIcon}
              />
              <p>+43 (234) 567-890</p>
            </div>
            <div className={styles.infoItem}>
              <Image
                src="/images/social-icon/email.png"
                alt="Email Icon"
                width={40}
                height={40}
                className={styles.infoIcon}
              />
              <p>support@raterhood.com</p>
            </div>
            <div className={styles.socialMedia}>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social-icon/facebook.png"
                  alt="Facebook"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social-icon/twitter.png"
                  alt="Twitter"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social-icon/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </ContentContainer>
  );
}
