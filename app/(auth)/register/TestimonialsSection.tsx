import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './TestimonialsSection.module.scss';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Alex Johnson',
      image: '/images/profile-pictures/profile1.jpg',
      testimonial:
        "RaterHood was a game-changer for me. Moving to a new city was daunting, but with the detailed neighborhood insights, I felt like I already knew the area before I arrived. The community reviews were spot-on and helped me avoid areas that didn't fit my lifestyle. Highly recommend to anyone relocating!",
    },
    {
      name: 'Samantha Lee',
      image: '/images/profile-pictures/profile2.jpg',
      testimonial:
        "I can't express how helpful RaterHood has been in finding the perfect neighborhood for my family. The school ratings and safety scores gave me peace of mind, and the user testimonials provided real-life experiences that were invaluable. It's like having a local friend guide you through the city!",
    },
    {
      name: 'Michael Rodriguez',
      image: '/images/profile-pictures/profile3.jpg',
      testimonial:
        "As a young professional, I was looking for a vibrant community with lots of amenities. RaterHood's comprehensive reviews and ratings helped me zero in on the best neighborhoods. The platform is user-friendly, and the information is up-to-date. It made my apartment hunt so much easier!",
    },
    {
      name: 'Emily Chen',
      image: '/images/profile-pictures/profile4.jpg',
      testimonial:
        "Finding a neighborhood that fits my needs was challenging until I discovered RaterHood. The detailed maps and honest user feedback allowed me to make an informed decision. I particularly loved the feature that compares neighborhoods side by side. It's an essential tool for anyone moving!",
    },
    {
      name: 'David Smith',
      image: '/images/profile-pictures/profile5.jpg',
      testimonial:
        'RaterHood exceeded my expectations. The depth of information on each neighborhood is impressive. From crime rates to local events, it covers everything. The community feel is also great, with users sharing their experiences. It made me feel confident in choosing my new home.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    const index =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const index = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) {
    return null;
  }

  return (
    <div className={styles.testimonialsSection}>
      <div className={styles.arrow} onClick={handlePrev}>
        &#8592; {/* Left Arrow */}
      </div>
      <div className={styles.testimonialBox}>
        <div className={styles.imageContainer}>
          <Image
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            width={100}
            height={100}
            className={styles.image}
          />
        </div>
        <p className={styles.testimonialText}>
          "{currentTestimonial.testimonial}"
        </p>
        <p className={styles.userName}>- {currentTestimonial.name}</p>
      </div>
      <div className={styles.arrow} onClick={handleNext}>
        &#8594; {/* Right Arrow */}
      </div>
    </div>
  );
}
