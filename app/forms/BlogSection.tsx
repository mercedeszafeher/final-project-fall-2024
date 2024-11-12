'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './BlogSection.module.scss';

export default function BlogSection() {
  const blogPosts = [
    {
      title: 'Discovering Hidden Gems in New York City',
      content:
        "New York City is full of surprises. Last weekend, I stumbled upon a quaint little bookstore in Brooklyn that had the most amazing collection of vintage books. If you're ever in the area, it's a must-visit!",
      author: 'Alex Johnson',
      date: 'September 2023',
      image: '/images/blog-posts/nyc.jpg',
    },
    {
      title: 'A Foodie’s Guide to Paris',
      content:
        "Paris isn't just about the Eiffel Tower. It's a paradise for food lovers! From freshly baked croissants to exquisite fine dining, here's my list of must-try places when you're in the city of love.",
      author: 'Samantha Lee',
      date: 'August 2023',
      image: '/images/blog-posts/paris.jpg',
    },
    {
      title: 'Exploring the Nightlife in Tokyo',
      content:
        "Tokyo comes alive at night. The neon lights, bustling streets, and vibrant clubs make it a city that never sleeps. Join me as I share my experiences exploring Tokyo's nightlife.",
      author: 'Michael Rodriguez',
      date: 'July 2023',
      image: '/images/blog-posts/tokyo.jpg',
    },
    {
      title: 'The Beauty of Sydney’s Beaches',
      content:
        "Sydney's coastline is dotted with some of the most beautiful beaches in the world. Whether you're into surfing or just lounging by the sea, Sydney has something for everyone.",
      author: 'Emily Chen',
      date: 'June 2023',
      image: '/images/blog-posts/sydney.jpg',
    },
    {
      title: 'Cultural Experiences in Marrakech',
      content:
        "Marrakech is a city rich in culture and history. From the bustling souks to the serene gardens, it's a destination that offers a unique blend of experiences.",
      author: 'David Smith',
      date: 'May 2023',
      image: '/images/blog-posts/marrakech.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance blog post every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const handleSelectPost = (index: number) => {
    setCurrentIndex(index);
  };

  // Ensure currentIndex is within bounds and blogPost exists
  const currentPost = blogPosts[currentIndex];

  if (!currentPost) {
    return null; // Or render a fallback UI
  }

  return (
    <div className={styles.blogSection}>
      <div className={styles.blogBox}>
        <div className={styles.imageContainer}>
          <Image
            src={currentPost.image}
            alt={currentPost.title}
            width={400}
            height={250}
            className={styles.image}
          />
        </div>
        <h3 className={styles.blogTitle}>{currentPost.title}</h3>
        <p className={styles.blogContent}>{currentPost.content}</p>
        <p className={styles.blogAuthor}>
          - {currentPost.author}, {currentPost.date}
        </p>
      </div>
      <div className={styles.pagination}>
        {blogPosts.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => handleSelectPost(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
