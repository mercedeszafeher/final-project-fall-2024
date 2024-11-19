import React, { useState } from 'react';

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
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '500px' }}>
      <h3>Write a Review</h3>
      <div>
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Review:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
        />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={tags.join(',')}
          onChange={(e) => setTags(e.target.value.split(','))}
          placeholder="e.g., safe, green, noisy"
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
