import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductRating = ({ 
  currentRating = 0, 
  totalRatings = 0, 
  onRatingSubmit, 
  productId,
  readonly = false 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = async (rating) => {
    if (readonly) return;
    
    setSelectedRating(rating);
    
    if (onRatingSubmit) {
      setIsSubmitting(true);
      try {
        await onRatingSubmit(rating, productId);
      } catch (error) {
        console.error('Error submitting rating:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleMouseEnter = (rating) => {
    if (readonly) return;
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const displayRating = readonly ? currentRating : (hoverRating || selectedRating || currentRating);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            style={{
              color: star <= displayRating ? '#f39c12' : '#ddd',
              fontSize: readonly ? '14px' : '16px',
              cursor: readonly ? 'default' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      
      {totalRatings > 0 && (
        <span style={{
          fontSize: readonly ? '12px' : '14px',
          color: '#666',
          marginLeft: '4px'
        }}>
          ({totalRatings} {totalRatings === 1 ? 'review' : 'reviews'})
        </span>
      )}
      
      {!readonly && selectedRating > 0 && (
        <span style={{
          fontSize: '12px',
          color: '#27ae60',
          fontWeight: '500'
        }}>
          {isSubmitting ? 'Submitting...' : 'Rating submitted!'}
        </span>
      )}
    </div>
  );
};

export default ProductRating;
