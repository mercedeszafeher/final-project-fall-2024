import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';

type ReviewFormProps = {
  cityId: number;
  neighborhoodId: number | null;
  onSubmit: (review: {
    rating: number;
    text: string;
    tags: string[];
  }) => Promise<void>;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  cityId,
  neighborhoodId,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (rating === 0 || text.trim() === '') {
      alert('Please provide a rating and text review.');
      return;
    }
    await onSubmit({ rating, text, tags });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.reviewForm}>
      <h3>Write a Review</h3>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Review:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          className={styles.formTextarea}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Filters (comma-separated):</label>
        <input
          type="text"
          value={tags.join(',')}
          onChange={(e) => setTags(e.target.value.split(','))}
          placeholder="e.g., safe, green, noisy"
          className={styles.formInput}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
