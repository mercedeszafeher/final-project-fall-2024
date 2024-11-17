import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import ContentContainer from '../components/ContentContainer';
import styles from './About.module.scss';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Raterhood, our mission, and how we help you make informed decisions when moving to a new city.',
};

export default function AboutPage() {
  return (
    <>
      <ContentContainer className={styles.aboutContainer}>
        <section className={styles.aboutSection}>
          <h1 className={styles.title}>The Idea behind Raterhood</h1>
          <p className={styles.description}>
            Raterhood is a web application designed to help individuals who are
            planning to move to a new city by providing comprehensive insights
            into neighborhoods and rental properties. Whether you're searching
            for the perfect place to live or assessing the suitability of
            various areas, Raterhood offers the tools and community-driven
            feedback you need to make informed decisions.
          </p>

          <h2 className={styles.subtitle}>Our Mission</h2>
          <p className={styles.description}>
            Our mission is to streamline the discovery process for individuals
            relocating to new cities. By aggregating essential information and
            facilitating community-generated reviews, Raterhood empowers users
            to evaluate neighborhoods based on key factors such as building
            conditions, neighborhood busyness, infrastructure quality, parking
            availability, and public transportation options.
          </p>

          <h2 className={styles.subtitle}>What We Offer</h2>
          <div className={styles.featuresGrid}>
            {/* Feature Card 1 */}
            <div className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/icons/building.jpg"
                  alt="Building Icon"
                  width={80}
                  height={80}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.featureTitle}>Comprehensive Insights</h3>
              <p className={styles.featureDescription}>
                Access detailed information about neighborhoods, including
                building conditions, local amenities, and overall livability.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/icons/community.jpg"
                  alt="Community Icon"
                  width={80}
                  height={80}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.featureTitle}>Community Reviews</h3>
              <p className={styles.featureDescription}>
                Read and contribute reviews from fellow users to gain firsthand
                perspectives on different areas.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/icons/filter.jpg"
                  alt="Filter Icon"
                  width={80}
                  height={80}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.featureTitle}>Advanced Filtering</h3>
              <p className={styles.featureDescription}>
                Tailor your search based on specific features like parking ease,
                proximity to public transportation, and local services.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/icons/rental.jpg"
                  alt="Rental Icon"
                  width={80}
                  height={80}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.featureTitle}>Rental Information</h3>
              <p className={styles.featureDescription}>
                Explore available rental properties with insights into pricing,
                amenities, and neighborhood compatibility.
              </p>
            </div>
          </div>

          <h2 className={styles.subtitle}>Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={`${styles.teamMember} ${styles.founder}`}>
              <Image
                src="/images/team/emily-clark.jpg"
                alt="John Doe, Founder & CEO of Raterhood"
                width={150}
                height={150}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>Emily Clark</h3>
              <p className={styles.memberRole}>Founder & CEO</p>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.memberLink}
                aria-label={`LinkedIn profile of Emily Clark`}
              >
                LinkedIn
              </a>
            </div>

            <div className={`${styles.teamMember} ${styles.cto}`}>
              <Image
                src="/images/team/sean-smith.jpg"
                alt="Jane Smith, Chief Technology Officer of Raterhood"
                width={150}
                height={150}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>Sean Smith</h3>
              <p className={styles.memberRole}>Chief Technology Officer</p>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.memberLink}
                aria-label={`LinkedIn profile of Sean Smith`}
              >
                LinkedIn
              </a>
            </div>

            <div className={`${styles.teamMember} ${styles.programmer}`}>
              <Image
                src="/images/team/sophia-martinez.jpg"
                alt="Sophia Martinez, Lead Programmer of Raterhood"
                width={150}
                height={150}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>Sophia Martinez</h3>
              <p className={styles.memberRole}>Lead Programmer</p>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.memberLink}
                aria-label={`LinkedIn profile of Sophia Martinez`}
              >
                LinkedIn
              </a>
            </div>

            <div className={`${styles.teamMember} ${styles.designer}`}>
              <Image
                src="/images/team/liam-johnson.jpg"
                alt="Liam Johnson, UI/UX Designer of Raterhood"
                width={150}
                height={150}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>Liam Johnson</h3>
              <p className={styles.memberRole}>UI/UX Designer</p>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.memberLink}
                aria-label={`LinkedIn profile of Liam Johnson`}
              >
                LinkedIn
              </a>
            </div>

            <div className={`${styles.teamMember} ${styles.communications}`}>
              <Image
                src="/images/team/olivia-davis.jpg"
                alt="Olivia Davis, Communications Manager of Raterhood"
                width={150}
                height={150}
                className={styles.memberImage}
              />
              <h3 className={styles.memberName}>Olivia Davis</h3>
              <p className={styles.memberRole}>Communications Manager</p>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.memberLink}
                aria-label={`LinkedIn profile of Olivia Davis`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </ContentContainer>
    </>
  );
}
