'use client';

import React, { useEffect, useState } from 'react';
import styles from './TestimonialComponent.module.scss';

type Testimonial = {
  id: number;
  name: string;
  title: string;
  feedback: string;
  avatar: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ava Bennett',
    title: 'Urban Planner at CityVision',
    feedback:
      "RaterHood has completely transformed the way I research neighborhoods. It's intuitive, reliable, and packed with insights. Whether it's safety, community, or amenities, I can find everything I need at my fingertips!",
    avatar: '/images/testimonials/ava.jpg',
    date: '2023. November 15.',
  },
  {
    id: 2,
    name: 'Liam Hayes',
    title: 'Real Estate Agent at UrbanNest',
    feedback:
      'RaterHood is a must-have tool for my profession. The reviews are honest, and the ratings help my clients make informed decisions when buying homes. I highly recommend it to anyone in real estate!',
    avatar: '/images/testimonials/liam.jpg',
    date: '2024. October 5.',
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    title: 'Freelance Digital Nomad',
    feedback:
      'As someone who travels often, RaterHood has been my go-to app for finding safe and vibrant neighborhoods. I love how user-friendly it is and how it highlights local gems in each city!',
    avatar: '/images/testimonials/sophia.jpg',
    date: '2019. September 20.',
  },
  {
    id: 4,
    name: 'Oliver Chen',
    title: 'Tech Innovator',
    feedback:
      'Moving to a new city with my family was daunting until I found RaterHood. Its reviews and ratings helped me choose a neighborhood where my kids can grow up safely and happily. A lifesaver!',
    avatar: '/images/testimonials/oliver.jpg',
    date: '2023. August 28.',
  },
  {
    id: 5,
    name: 'Isabella Carter',
    title: 'Graduate Student at UrbanAcademy',
    feedback:
      'RaterHood is a game-changer for students! It made finding an affordable and student-friendly area so much easier. I love the detailed reviews from real people like me!',
    avatar: '/images/testimonials/isabella.jpg',
    date: '2021. Juni 09.',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleSelectTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const getCardClass = (index: number) => {
    if (index === currentIndex) return styles.active;
    if ((index + 1) % testimonials.length === currentIndex)
      return styles.behind;
    return styles.farBehind;
  };

  return (
    <div className={styles.testimonialSection}>
      <h2 className={styles.title}>What Our Users Say</h2>
      <div className={styles.testimonialContainer}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`${styles.testimonialCard} ${getCardClass(index)}`}
          >
            <div className={styles.cardHeader}>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className={styles.avatar}
              />
              <div>
                <h3 className={styles.name}>{testimonial.name}</h3>
                <p className={styles.title}>{testimonial.title}</p>
              </div>
            </div>
            <p className={styles.feedback}>{testimonial.feedback}</p>
            <p className={styles.date}>{testimonial.date}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => handleSelectTestimonial(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
